import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import pool from "./db";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (err) {
      console.error("Failed to initialize GoogleGenAI:", err);
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Authentication - Signup
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password || !role) {
        return res.status(400).json({
          success: false,
          message: "Name, email, password and role are required",
        });
      }

      if (!["teacher", "student"].includes(role)) {
        return res.status(400).json({
          success: false,
          message: "Role must be teacher or student",
        });
      }

      const normalizedEmail = String(email).trim().toLowerCase();

      const [existingUsers] = await pool.execute(
        "SELECT id FROM users WHERE email = ?",
        [normalizedEmail]
      );

      if ((existingUsers as any[]).length > 0) {
        return res.status(409).json({
          success: false,
          message: "An account with this email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(String(password), 10);

      const [result] = await pool.execute(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [String(name).trim(), normalizedEmail, hashedPassword, role]
      );

      const insertResult = result as any;

      return res.status(201).json({
        success: true,
        message: "Account created successfully",
        user: {
          id: insertResult.insertId,
          name: String(name).trim(),
          email: normalizedEmail,
          role,
        },
      });
    } catch (error) {
      console.error("Signup error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to create account",
      });
    }
  });

  // Authentication - Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      const normalizedEmail = String(email).trim().toLowerCase();

      const [rows] = await pool.execute(
        "SELECT id, name, email, password, role FROM users WHERE email = ?",
        [normalizedEmail]
      );

      const users = rows as any[];

      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const user = users[0];

      const passwordMatches = await bcrypt.compare(
        String(password),
        user.password
      );

      if (!passwordMatches) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      return res.json({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to login",
      });
    }
  });

  // REAL handwritten-answer evaluation endpoint.
  // The frontend sends the image as multipart/form-data.
  app.post("/api/evaluate", async (req, res) => {
    try {
      // This project intentionally avoids multer so we can keep the dependency surface small.
      // The browser sends JSON with a data:image/... URL in `handwrittenImage` when using the
      // older flow, but the current live CreateEvaluationView sends multipart/form-data.
      // Express cannot parse multipart by itself, so accept both paths and give a clear error
      // if the multipart parser is unavailable.
      const contentType = String(req.headers["content-type"] || "");
      let questionPrompt = "";
      let rubric = "";
      let maxMarks = 5;
      let teacherId: number | null = null;
      let imageData = "";
      let imageMime = "image/jpeg";

      if (contentType.includes("multipart/form-data")) {
        // Minimal multipart parser for the single image + text fields used by this demo.
        // It is intentionally limited and validates the uploaded file before sending it to Gemini.
        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        const body = Buffer.concat(chunks);
        const match = contentType.match(/boundary=([^;]+)/i);
        if (!match) return res.status(400).json({ error: "Missing multipart boundary" });
        const boundary = Buffer.from(`--${match[1].replace(/^"|"$/g, "")}`);
        const parts: Buffer[] = [];
        let pos = 0;
        while (true) {
          const a = body.indexOf(boundary, pos);
          if (a < 0) break;
          const b = body.indexOf(boundary, a + boundary.length);
          if (b < 0) break;
          parts.push(body.subarray(a + boundary.length, b));
          pos = b;
        }
        for (let part of parts) {
          part = part.subarray(part.indexOf(Buffer.from("\r\n")) + 2);
          const headerEnd = part.indexOf(Buffer.from("\r\n\r\n"));
          if (headerEnd < 0) continue;
          const headers = part.subarray(0, headerEnd).toString("utf8");
          let value = part.subarray(headerEnd + 4);
          if (value.subarray(-2).toString() === "\r\n") value = value.subarray(0, -2);
          const nameMatch = headers.match(/name="([^"]+)"/i);
          if (!nameMatch) continue;
          const name = nameMatch[1];
          if (name === "image") {
            const typeMatch = headers.match(/Content-Type:\s*([^\r\n]+)/i);
            imageMime = typeMatch?.[1]?.trim() || "image/jpeg";
            if (!imageMime.startsWith("image/")) return res.status(400).json({ error: "Only image files are supported" });
            if (value.length > 15 * 1024 * 1024) return res.status(400).json({ error: "Image is too large (maximum 15 MB)" });
            imageData = value.toString("base64");
          } else {
            const text = value.toString("utf8");
            if (name === "questionPrompt") questionPrompt = text;
            if (name === "rubric") rubric = text;
            if (name === "maxMarks") maxMarks = Number(text) || 5;
            if (name === "teacherId") teacherId = Number(text) || null;
          }
        }
      } else {
        questionPrompt = String(req.body?.questionPrompt || "");
        rubric = String(req.body?.rubric || "");
        maxMarks = Number(req.body?.maxMarks) || 5;
        teacherId = Number(req.body?.teacherId) || null;
        const dataUrl = String(req.body?.handwrittenImage || "");
        if (dataUrl.startsWith("data:image/")) {
          const comma = dataUrl.indexOf(",");
          imageData = comma >= 0 ? dataUrl.slice(comma + 1) : "";
          imageMime = dataUrl.slice(5, dataUrl.indexOf(";"));
        }
      }

      if (!questionPrompt.trim()) return res.status(400).json({ error: "Question is required" });
      if (!imageData) return res.status(400).json({ error: "Handwritten answer image is required" });
      if (!Number.isFinite(maxMarks) || maxMarks <= 0) return res.status(400).json({ error: "Maximum marks must be greater than zero" });

      // Parse the teacher's rubric so the backend knows the authoritative maximum
      // marks for every criterion.
      const teacherRubric = rubric
        .split(";")
        .map(item => {
          const match = item.trim().match(/^(.*?):\\s*(\\d+(?:\\.\\d+)?)\\s*mark\\$begin:math:text$s\\\$end:math:text$$/i);
          if (!match) return null;
          return {
            criterion: match[1].trim(),
            maximumMarks: Number(match[2]),
          };
        })
        .filter(Boolean);

      const ai = getAIClient();
      if (!ai) return res.status(500).json({ error: "Gemini is not configured. Add GEMINI_API_KEY to .env and restart the server." });

      const prompt = `You are EduEval AI, a careful and fair academic examiner.

Your task is to evaluate ONLY the student's response visible in the attached image.

IMPORTANT ROLE SEPARATION:
- QUESTION = what the student was asked.
- TEACHER MARKING RUBRIC = how marks should be awarded.
- ATTACHED IMAGE = the student's submitted response.
- Never treat the attached image as a teacher answer, model answer, reference solution, or marking scheme.
- The image may contain handwriting, typed text, screenshots, photographs, diagrams, equations, tables, or a mixture of these.
- Evaluate the actual visible content regardless of whether it is handwritten or typed.

QUESTION:
${questionPrompt}

MAXIMUM MARKS:
${maxMarks}

TEACHER MARKING RUBRIC:
${rubric || "Award marks for correctness, relevant concepts, reasoning, working, and the final answer."}

CORE EVALUATION PROCESS:

1. READ THE IMAGE
- Carefully inspect the entire image before scoring.
- Extract only text, equations, diagrams, and reasoning that are actually visible.
- Create studentSolutionExtracted as a faithful concise transcription of the student's visible response.
- Do not rewrite, improve, correct, paraphrase, or complete the student's answer.
- Preserve important numbers, formulas, symbols, units, and mathematical notation accurately.
- If a word, number, formula, or symbol cannot be read reliably, use [unclear] instead of guessing.
- Do not add information that is not visible in the image.
- If handwriting is unclear, do not invent missing words.
- If the image is blank, unrelated, only a cover page, question paper, reference material, or contains no meaningful student response to the question, award 0.
- If the image appears to contain a question, model answer, textbook content, teacher notes, or reference material instead of the student's own response, do not treat that content as student evidence.
- A few matching words or formulas are not enough to establish that the student answered the question.
- Only award marks when the visible content can reasonably be identified as the student's submitted response to the given question.

2. IMAGE QUALITY CHECK
- Check whether the student's response is readable before assigning marks.
- If text is blurry, cut off, too small, obscured, or otherwise unreadable, do NOT guess the missing content.
- If only part of the answer is visible, evaluate only the visible part and clearly mention that limitation.
- If the image contains multiple pages, inspect all visible pages before scoring.
- If the image is rotated or photographed at an angle but the content is readable, still evaluate it normally.
- If the image quality prevents reliable evaluation, lower confidenceScore and award marks only for clearly visible evidence.

3. UNDERSTAND THE QUESTION
- Identify exactly what the question asks.
- Identify all parts of the question that require marks.
- Do not award marks for information that is unrelated to what was asked.

3. IDENTIFY THE QUESTION TYPE
Before scoring, determine the main type of question:
- THEORY / EXPLANATION: evaluate concepts, explanation, reasoning, and relevant details.
- NUMERICAL / PROBLEM: evaluate formula, method, substitutions, calculations, units, and final answer.
- DEFINITION: evaluate whether the meaning and essential characteristics are correctly stated.
- DIAGRAM / LABELLED FIGURE: evaluate required components, labels, relationships, and correctness.
- APPLICATION / REAL-LIFE: evaluate whether the student correctly applies the concept to the requested situation.
- COMPARISON: evaluate whether the required points of comparison are correctly addressed.
- MULTI-PART: evaluate each requested part separately and award only the marks supported by the response.
- If a question combines multiple types, apply the appropriate rules to each part.

Do not force a question into a type when the wording clearly indicates another type.

4. INTERPRET THE RUBRIC
- Treat each rubric criterion as an independent marking requirement.
- Determine how many marks each criterion is worth.
- Do not award the same mark twice for the same piece of evidence.
- The total awarded marks must never exceed ${maxMarks}.

4. EVALUATE CONCEPTS
- Give credit when the student demonstrates the correct concept even if the wording differs from an expected answer.
- Use the teacher-provided rubric as the primary source for deciding what earns marks.
- Preserve every teacher rubric criterion and its assigned maximum marks in rubricAnalysis.
- Do not silently add new marking criteria that are not present in the teacher rubric.
- Do not change the maximum marks assigned to a teacher criterion.
- If a rubric criterion is ambiguous, interpret it conservatively from the wording provided rather than inventing additional requirements.
- Give credit only when visible student evidence supports the criterion.
- Do not require exact keywords when the meaning is clearly correct.
- Give partial credit when only part of a concept is correct.
- Penalize genuine conceptual errors.
- Do not penalize minor spelling, grammar, handwriting, or formatting issues when the intended academic meaning is clear.

5. MATHEMATICS AND NUMERICAL PROBLEMS
- Check formulas, substitutions, calculations, units, and final answers separately.
- If the method is correct but there is a minor arithmetic error, award appropriate method/working marks.
- If the final answer is correct by an incorrect method, do not automatically award full marks.
- If a required calculation is completely absent, do not assume it was performed.

6. EXAMPLES AND APPLICATIONS
- A numerical example is NOT automatically a real-life example.
- If the question specifically asks for a real-life/practical application, require an actual real-world situation.
- Award marks for a real-life example only when the example demonstrates how the concept applies in the real world.
- Do not penalize a student for using a different valid real-life example from the teacher's expected example.

7. ANSWER RELEVANCE
- A correct statement that does not answer the question should not receive full credit.
- If the student answers only part of a multi-part question, award only the marks supported by the visible response.
- Never fill in missing information using your own knowledge.

8. MARK ALLOCATION
For every rubric criterion:
- Identify whether it is satisfied, partially satisfied, or not satisfied.
- Award marks proportional to the evidence.
- For criteria worth multiple marks, use partial marks when the student demonstrates only part of the required knowledge.
- Do not give full marks when an important part of a multi-mark criterion is missing or incorrect.
- Do not give partial marks when the criterion is completely absent and there is no supporting evidence.
- Use the smallest reasonable mark increment supported by the rubric and evidence.
- Never award more than the maximum marks assigned to a criterion.
- Explain the reason briefly.
- Sum the criterion marks to produce the final score.

9. CONSISTENCY CHECK
Before returning the result:
- Verify that every awarded mark is supported by visible student evidence.
- Verify that no rubric criterion was counted twice.
- Verify that the score is between 0 and ${maxMarks}.
- Verify that the percentage matches the score.
- Verify that the feedback matches the actual score.
- Verify that strengths and weaknesses are supported by the student's response.

10. CONFIDENCE
Return confidenceScore as a NUMBER between 0 and 100.
For example:
- 95 = image is clear and the answer is easy to evaluate.
- 75 = mostly clear but some content is difficult to read.
- 50 = significant uncertainty.
- 25 = very poor image or highly uncertain interpretation.

Do NOT return confidence as a decimal such as 0.95. Return 95 for 95% confidence.

11. IMPORTANT
- Never claim that a student answer is missing when readable answer content is actually visible.
- Never invent an answer.
- Never compare against a hidden/reference answer.
- Use the teacher rubric as the primary marking guide.
- If the rubric and your general academic knowledge conflict, follow the teacher rubric unless doing so would produce an obviously impossible evaluation.
- Return ONLY valid JSON. No markdown. No explanation outside the JSON.

JSON schema:
{
  "overallScore": number,
  "maxScore": ${maxMarks},
  "percentage": number,
  "grade": "A+|A|B+|B|C|D|F",
  "confidenceScore": number,
  "summaryFeedback": "clear overall explanation of the result",
  "strengths": ["specific strengths supported by the image"],
  "weaknesses": ["specific missing points or errors supported by the image"],
  "rubricAnalysis": [
    {
      "criterion": "exact or concise rubric criterion",
      "maximumMarks": number,
      "awardedMarks": number,
      "status": "satisfied|partially_satisfied|not_satisfied",
      "evidence": "what visible student content supports this score",
      "feedback": "why these marks were awarded"
    }
  ],
  "questions": [{
    "questionNumber": 1,
    "maxMarks": ${maxMarks},
    "awardedMarks": number,
    "studentSolutionExtracted": "faithful concise transcription of visible student response",
    "conceptAssessed": "main concept or rubric area",
    "isConceptCorrect": true,
    "feedback": "specific reason for the marks",
    "stepBreakdown": [
      {
        "step": "visible student step",
        "correct": true,
        "notes": "brief explanation"
      }
    ]
  }]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: [{
          parts: [
            { inlineData: { data: imageData, mimeType: imageMime } },
            { text: prompt },
          ],
        }],
      });

      let raw = String(response.text || "").trim();
      raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
      let evaluation: any;
      try {
        evaluation = JSON.parse(raw);
      } catch (parseError) {
        console.error("Gemini returned non-JSON:", raw);
        return res.status(502).json({ error: "Gemini returned an invalid evaluation. Please try the image again.", details: String(parseError) });
      }

      const safeMax = Number(evaluation.maxScore) || maxMarks;

      // Normalize and validate rubric-level marks.
      if (Array.isArray(evaluation.rubricAnalysis) && evaluation.rubricAnalysis.length > 0) {
        evaluation.rubricAnalysis = evaluation.rubricAnalysis.map((item: any) => {
          const maximum = Math.max(0, Number(item.maximumMarks) || 0);
          let awarded = Number(item.awardedMarks);
          if (!Number.isFinite(awarded)) awarded = 0;
          awarded = Math.max(0, Math.min(maximum, awarded));

          const teacherCriterion = teacherRubric.find(
            (r: any) =>
              String(r.criterion).trim().toLowerCase() ===
              String(item.criterion || "").trim().toLowerCase()
          );

          const authoritativeMaximum = teacherCriterion
            ? teacherCriterion.maximumMarks
            : maximum;

          return {
            ...item,
            maximumMarks: authoritativeMaximum,
            awardedMarks: Math.max(
              0,
              Math.min(authoritativeMaximum, awarded)
            ),
          };
        });

        const rubricTotal = evaluation.rubricAnalysis.reduce(
          (sum: number, item: any) => sum + Number(item.awardedMarks || 0),
          0
        );

        // Rubric analysis is the source of truth for the final score.
        evaluation.overallScore = Math.max(0, Math.min(safeMax, rubricTotal));
      } else {
        let safeScore = Number(evaluation.overallScore);
        if (!Number.isFinite(safeScore)) safeScore = 0;
        evaluation.overallScore = Math.max(0, Math.min(safeMax, safeScore));
      }

      evaluation.maxScore = safeMax;
      evaluation.percentage = safeMax > 0
        ? Math.round((evaluation.overallScore / safeMax) * 100)
        : 0;

      // Normalize AI confidence to a safe 0-100 range.
      let confidence = Number(evaluation.confidenceScore);
      if (!Number.isFinite(confidence)) {
        confidence = 0;
      } else if (confidence <= 1) {
        confidence *= 100;
      }
      evaluation.confidenceScore = Math.max(0, Math.min(100, Math.round(confidence)));

      evaluation.questions = Array.isArray(evaluation.questions)
        ? evaluation.questions
        : [];

      // Keep the question-level score consistent with the validated final score.
      if (evaluation.questions.length > 0) {
        const firstQuestion = evaluation.questions[0];
        firstQuestion.awardedMarks = evaluation.overallScore;
        firstQuestion.maxMarks = safeMax;
      }

      // Save the completed evaluation to MySQL when a logged-in teacher ID is available.
      if (teacherId) {
        try {
          await pool.execute(
            `INSERT INTO evaluations
              (
                teacher_id,
                question,
                rubric,
                max_marks,
                score,
                percentage,
                confidence,
                summary_feedback,
                strengths,
                weaknesses,
                student_answer
              )
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              teacherId,
              questionPrompt,
              rubric || null,
              safeMax,
              evaluation.overallScore,
              evaluation.percentage,
              evaluation.confidenceScore,
              evaluation.summaryFeedback || evaluation.feedback || null,
              Array.isArray(evaluation.strengths)
                ? evaluation.strengths.join("\\n")
                : evaluation.strengths || null,
              Array.isArray(evaluation.weaknesses)
                ? evaluation.weaknesses.join("\\n")
                : evaluation.weaknesses || null,
              evaluation.studentAnswer || null,
            ]
          );

          console.log(`Evaluation saved to MySQL for teacher ${teacherId}`);
        } catch (dbError) {
          // Do not fail the AI evaluation just because database storage failed.
          console.error("Failed to save evaluation to MySQL:", dbError);
        }
      }

      return res.json({ success: true, evaluation, source: "gemini-3.5-flash-lite" });
    } catch (err: any) {
      console.error("Evaluation server error:", err);
      return res.status(500).json({ error: "Failed to evaluate the handwritten answer", details: err?.message || String(err) });
    }
  });

  // Check MySQL database connection
app.get("/api/db-health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    return res.json({
      success: true,
      database: "MySQL",
      status: "connected"
    });
  } catch (error) {
    console.error("Database health check failed:", error);
    return res.status(500).json({
      success: false,
      database: "MySQL",
      status: "disconnected"
    });
  }
});

// Get a single evaluation by ID
app.get("/api/evaluations/:id", async (req, res) => {
  try {
    const evaluationId = Number(req.params.id);

    if (!evaluationId) {
      return res.status(400).json({
        success: false,
        error: "Valid evaluation ID is required"
      });
    }

    const [rows] = await pool.execute(
      `SELECT
        id,
        teacher_id,
        question,
        rubric,
        max_marks,
        score,
        percentage,
        confidence,
        summary_feedback,
        strengths,
        weaknesses,
        student_answer,
        created_at
      FROM evaluations
      WHERE id = ?`,
      [evaluationId]
    );

    const evaluations = rows as any[];

    if (evaluations.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Evaluation not found"
      });
    }

    return res.json({
      success: true,
      evaluation: evaluations[0]
    });
  } catch (error) {
    console.error("Failed to fetch evaluation:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to fetch evaluation"
    });
  }
});

// Get evaluations for a specific teacher
  app.get("/api/evaluations", async (req, res) => {
    try {
      const teacherId = Number(req.query.teacherId);

      if (!teacherId) {
        return res.status(400).json({
          success: false,
          error: "teacherId is required"
        });
      }

      const [rows] = await pool.execute(
        `SELECT
          id,
          question,
          max_marks,
          score,
          percentage,
          confidence,
          summary_feedback,
          created_at
        FROM evaluations
        WHERE teacher_id = ?
        ORDER BY created_at DESC`,
        [teacherId]
      );

      const [statsRows] = await pool.execute(
        `SELECT
          COUNT(*) AS totalEvaluations,
          COALESCE(AVG(percentage), 0) AS averagePercentage,
          SUM(CASE WHEN score IS NOT NULL THEN 1 ELSE 0 END) AS evaluated
        FROM evaluations
        WHERE teacher_id = ?`,
        [teacherId]
      );

      const stats = (statsRows as any[])[0];

      return res.json({
        success: true,
        stats: {
          totalEvaluations: Number(stats.totalEvaluations) || 0,
          evaluated: Number(stats.evaluated) || 0,
          pending: 0,
          averagePercentage: Number(stats.averagePercentage) || 0
        },
        evaluations: rows
      });
    } catch (error) {
      console.error("Failed to fetch evaluations:", error);

      return res.status(500).json({
        success: false,
        error: "Failed to fetch evaluations"
      });
    }
  });

  // Targeted practice generator endpoint
  app.post("/api/generate-practice", async (req, res) => {
    try {
      const { topic = "Quadratic Equations", weakConcepts = ["Discriminant signs"], difficulty = "Medium", count = 3 } = req.body;
      const ai = getAIClient();

      if (ai) {
        try {
          const conceptsStr = Array.isArray(weakConcepts) ? weakConcepts.join(", ") : String(weakConcepts);
          const prompt = "Generate " + count + " high quality targeted practice problems for a student who needs reinforcement in:\n" +
            "Topic: " + topic + "\n" +
            "Weak Concepts: " + conceptsStr + "\n" +
            "Difficulty Level: " + difficulty + "\n\n" +
            "Return ONLY valid JSON matching this schema:\n" +
            "{\n" +
            '  "topic": "' + topic + '",\n' +
            '  "problems": [\n' +
            "    {\n" +
            '      "id": "p1",\n' +
            '      "question": "Clear problem statement with formulas formatted in standard math notation",\n' +
            '      "conceptFocus": "Specific targeted concept",\n' +
            '      "hint": "Guiding pedagogical hint without giving away the full answer",\n' +
            '      "stepByStepSolution": [\n' +
            '        "Step 1: ...",\n' +
            '        "Step 2: ...",\n' +
            '        "Final Answer: ..."\n' +
            "      ],\n" +
            '      "correctAnswer": "Short final answer key"\n' +
            "    }\n" +
            "  ]\n" +
            "}";

          const response = await ai.models.generateContent({
            model: "gemini-3.7-flash",
            contents: [{ text: prompt }],
          });
          const rawText = response.text || "";
          let cleanJson = rawText.trim();
          if (cleanJson.startsWith("```json")) {
            cleanJson = cleanJson.replace(/^```json\s*/, "").replace(/\s*```$/, "");
          } else if (cleanJson.startsWith("```")) {
            cleanJson = cleanJson.replace(/^```\s*/, "").replace(/\s*```$/, "");
          }
          const parsed = JSON.parse(cleanJson);
          return res.json({ success: true, data: parsed, source: "gemini" });
        } catch (err) {
          console.warn("Error generating practice with Gemini:", err);
        }
      }

      // Fallback practice set
      const practiceSet = generateFallbackPractice(topic, weakConcepts);
      return res.json({ success: true, data: practiceSet, source: "local-engine" });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to generate practice", details: err.message });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EduEval AI Server running on http://0.0.0.0:${PORT}`);
  });
}

function generateFallbackEvaluation(
  studentName: string,
  subject: string,
  topic: string,
  _questionPrompt?: string
) {
  const isMath = subject.toLowerCase().includes("math");
  return {
    studentName: studentName || "A. Khan",
    subject: subject || (isMath ? "Mathematics" : "Physics"),
    topic: topic || "Quadratic Equations & Polynomials",
    overallScore: 28,
    maxScore: 30,
    percentage: 93,
    grade: "A",
    confidenceScore: 98,
    summaryFeedback:
      "Excellent conceptual clarity throughout. The student demonstrates robust deductive reasoning, clean intermediate working, and proper algebraic structure with a minor arithmetic slip in the final step of Question 3.",
    strengths: [
      "Precise understanding of factoring principles without relying on memorized shortcuts",
      "Correct identification of parabola axis of symmetry and vertex coordinates",
      "Well-organized step-by-step presentation of working",
    ],
    weaknesses: [
      "Minor sign error when isolating terms across the equal sign in Question 3",
      "Could benefit from explicitly stating domain restrictions for rational equations",
    ],
    conceptMastery: [
      { concept: "Factoring & Grouping", score: 96, status: "Mastered" },
      { concept: "Quadratic Formula & Discriminant", score: 92, status: "Mastered" },
      { concept: "Completing the Square", score: 85, status: "Proficient" },
      { concept: "Graph & Vertex Interpretation", score: 94, status: "Mastered" },
      { concept: "Arithmetic Execution", score: 88, status: "Proficient" },
    ],
    questions: [
      {
        questionNumber: 1,
        questionText: "Solve the quadratic equation: 2x² + 5x - 3 = 0 using factoring.",
        maxMarks: 10,
        awardedMarks: 10,
        studentSolutionExtracted:
          "2x² + 6x - x - 3 = 0\n2x(x + 3) - 1(x + 3) = 0\n(2x - 1)(x + 3) = 0\nx = 1/2 or x = -3",
        conceptAssessed: "Factoring quadratic polynomials by grouping",
        isConceptCorrect: true,
        feedback: "Perfect step decomposition and exact solution set.",
        stepBreakdown: [
          { step: "Identified ac = -6, factors +6 and -1", correct: true, notes: "Correct factor pair" },
          { step: "Grouped as 2x(x+3) - 1(x+3)", correct: true, notes: "Binomial factorization accurate" },
          { step: "Zero product property applied: x = 1/2, x = -3", correct: true, notes: "Both roots verified" },
        ],
      },
      {
        questionNumber: 2,
        questionText: "Determine the discriminant and nature of roots for 3x² - 4x + 2 = 0.",
        maxMarks: 10,
        awardedMarks: 10,
        studentSolutionExtracted:
          "a = 3, b = -4, c = 2\nΔ = b² - 4ac = (-4)² - 4(3)(2)\nΔ = 16 - 24 = -8\nSince Δ < 0, equation has two distinct complex/non-real roots.",
        conceptAssessed: "Discriminant analysis and root behavior",
        isConceptCorrect: true,
        feedback: "Flawless calculation of discriminant and sound mathematical interpretation.",
        stepBreakdown: [
          { step: "Identified coefficients correctly", correct: true, notes: "a=3, b=-4, c=2" },
          { step: "Evaluated Δ = -8", correct: true, notes: "Correct substitution and order of ops" },
          { step: "Conclusion on non-real roots", correct: true, notes: "Exact terminology used" },
        ],
      },
      {
        questionNumber: 3,
        questionText: "Find the vertex and axis of symmetry of y = x² - 6x + 5 by completing the square.",
        maxMarks: 10,
        awardedMarks: 8,
        studentSolutionExtracted:
          "y = (x - 3)² - 9 + 5\ny = (x - 3)² - 4\nVertex = (3, -4)\nAxis of symmetry = x = 3",
        conceptAssessed: "Completing the square & vertex form",
        isConceptCorrect: true,
        feedback: "Good conceptual execution. Student correctly derived vertex form.",
        stepBreakdown: [
          { step: "Half linear coefficient squared (6/2)² = 9", correct: true, notes: "Accurate method" },
          { step: "Balancing constant (-9 + 5 = -4)", correct: true, notes: "Correct simplification" },
          { step: "Extracted vertex (3, -4) and axis x = 3", correct: true, notes: "Clear geometrical link" },
        ],
      },
    ],
    targetedPracticeRecommendations: [
      {
        topic: "Quadratic Inequalities & Parameter Bounds",
        description: "Determine bounds for constant k where roots remain real and non-negative",
        difficulty: "Medium",
        sampleQuestion: "For what values of k does kx² + 4x + 1 = 0 have exactly one repeated real root?",
      },
      {
        topic: "Parabola Word Problem Modeling",
        description: "Converting physical trajectory data into standard vertex form",
        difficulty: "Medium-Hard",
        sampleQuestion: "A ball thrown from a 2m platform reaches maximum altitude of 18m at t = 2s. Formulate the quadratic height equation.",
      },
    ],
    teacherNotes: "Strong overall performance. Student demonstrates deep concept retention. Ready for advanced polynomial roots & calculus derivatives.",
  };
}

function generateFallbackPractice(topic: string, weakConcepts: any) {
  return {
    topic: topic || "Quadratic Equations",
    problems: [
      {
        id: "p1",
        question: "Solve for x by completing the square: x² - 8x + 12 = 0. Show all intermediate steps and state the vertex form.",
        conceptFocus: "Completing the square & vertex form",
        hint: "Take half of -8, square it to get 16, then write (x - 4)² - 16 + 12 = 0.",
        stepByStepSolution: [
          "Step 1: Rewrite as (x - 4)² - 16 + 12 = 0",
          "Step 2: Simplify to (x - 4)² - 4 = 0",
          "Step 3: (x - 4)² = 4 => x - 4 = ±2",
          "Final Answer: x = 6 or x = 2",
        ],
        correctAnswer: "x = 6, x = 2",
      },
      {
        id: "p2",
        question: "Find all values of k for which the quadratic equation 2x² - kx + 18 = 0 has two distinct real roots.",
        conceptFocus: "Discriminant inequalities (Δ > 0)",
        hint: "Calculate Δ = b² - 4ac = (-k)² - 4(2)(18). Set Δ > 0 and solve the inequality k² - 144 > 0.",
        stepByStepSolution: [
          "Step 1: Δ = k² - 4(2)(18) = k² - 144",
          "Step 2: Distinct real roots require Δ > 0 => k² - 144 > 0",
          "Step 3: (k - 12)(k + 12) > 0",
          "Final Answer: k > 12 or k < -12 (i.e. |k| > 12)",
        ],
        correctAnswer: "k > 12 or k < -12",
      },
      {
        id: "p3",
        question: "A rectangular garden has a perimeter of 40m and an area of 96m². Formulate a quadratic equation in terms of width w and determine the garden dimensions.",
        conceptFocus: "Modeling geometric optimization with quadratics",
        hint: "If perimeter is 40, length + width = 20 => length = 20 - w. Then Area = w(20 - w) = 96.",
        stepByStepSolution: [
          "Step 1: 2(L + w) = 40 => L = 20 - w",
          "Step 2: w(20 - w) = 96 => 20w - w² = 96 => w² - 20w + 96 = 0",
          "Step 3: Factor: (w - 12)(w - 8) = 0",
          "Final Answer: Dimensions are 12m by 8m",
        ],
        correctAnswer: "12m by 8m",
      },
    ],
  };
}

startServer();
