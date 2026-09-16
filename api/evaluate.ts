import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";
import Busboy from "busboy";

export const config = {
  api: {
    bodyParser: false,
  },
};

type FormData = {
  image?: {
    buffer: Buffer;
    mimeType: string;
  };
  questionPrompt?: string;
  rubric?: string;
  maxMarks?: string;
};

function parseMultipart(
  req: VercelRequest
): Promise<FormData> {
  return new Promise((resolve, reject) => {
    const result: FormData = {};

    const contentType = req.headers["content-type"];

    if (!contentType) {
      reject(new Error("Missing Content-Type"));
      return;
    }

    const busboy = Busboy({
      headers: {
        "content-type": contentType,
      },
      limits: {
        fileSize: 15 * 1024 * 1024,
      },
    });

    busboy.on("file", (_fieldname, file, info) => {
      const chunks: Buffer[] = [];

      file.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });

      file.on("end", () => {
        result.image = {
          buffer: Buffer.concat(chunks),
          mimeType: info.mimeType,
        };
      });

      file.on("limit", () => {
        reject(new Error("Image is larger than 15MB"));
      });
    });

    busboy.on("field", (name, value) => {
      if (name === "questionPrompt") {
        result.questionPrompt = value;
      }

      if (name === "rubric") {
        result.rubric = value;
      }

      if (name === "maxMarks") {
        result.maxMarks = value;
      }
    });

    busboy.on("finish", () => {
      resolve(result);
    });

    busboy.on("error", reject);

    req.pipe(busboy);
  });
}

function parseRubric(rubricText: string) {
  const rubric: {
    criterion: string;
    marks: number;
  }[] = [];

  const parts = rubricText
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);

  for (const part of parts) {
    const match = part.match(
      /^(.*?):\s*(\d+(?:\.\d+)?)\s*marks?$/i
    );

    if (match) {
      rubric.push({
        criterion: match[1].trim(),
        marks: Number(match[2]),
      });
    }
  }

  return rubric;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "Gemini API key is not configured",
      });
    }

    const form = await parseMultipart(req);

    if (!form.image) {
      return res.status(400).json({
        success: false,
        error: "No answer-sheet image was uploaded",
      });
    }

    if (!form.image.mimeType.startsWith("image/")) {
      return res.status(400).json({
        success: false,
        error: "Only image files are supported",
      });
    }

    const questionPrompt =
      form.questionPrompt?.trim() || "";

    const rubricText =
      form.rubric?.trim() || "";

    const maxMarks =
      Number(form.maxMarks) || 5;

    if (!questionPrompt) {
      return res.status(400).json({
        success: false,
        error: "Question is required",
      });
    }

    const rubric = parseRubric(rubricText);

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const imageBase64 = form.image.buffer.toString("base64");

    const prompt = `
You are EduEval AI, an AI system that evaluates handwritten student exam answers.

Your task is to evaluate ONLY the student's answer visible in the uploaded image.

QUESTION:
${questionPrompt}

MAXIMUM MARKS:
${maxMarks}

TEACHER MARKING RUBRIC:
${rubric.length > 0
  ? rubric
      .map((item) => `${item.criterion}: ${item.marks} marks`)
      .join("\n")
  : "No detailed rubric provided. Evaluate based on correctness, concepts, reasoning and relevance."}

IMPORTANT INSTRUCTIONS:

1. Read the handwritten answer carefully.
2. Evaluate the student's actual response shown in the image.
3. Do NOT assume an answer that is not visible.
4. Do NOT give marks simply because the expected answer sounds correct.
5. Understand the student's concepts even if the wording is different from the model answer.
6. Follow the teacher's rubric when one is provided.
7. For mathematical answers, check calculations and reasoning.
8. Give partial marks when the student demonstrates partial understanding.
9. Identify missing concepts or incorrect reasoning.
10. Ignore handwriting quality unless it prevents understanding the answer.
11. If the image is unclear, mention that in the feedback.
12. Do not invent student work.

Return ONLY valid JSON.

Use exactly this structure:

{
  "overallScore": 0,
  "maxScore": ${maxMarks},
  "percentage": 0,
  "confidenceScore": 0,
  "feedback": "string",
  "strengths": ["string"],
  "weaknesses": ["string"],
  "rubricAnalysis": [
    {
      "criterion": "string",
      "marksAwarded": 0,
      "maxMarks": 0,
      "reason": "string"
    }
  ],
  "questions": [
    {
      "question": "${questionPrompt.replace(/"/g, '\\"')}",
      "score": 0,
      "maxScore": ${maxMarks},
      "feedback": "string"
    }
  ]
}

Scoring rules:

- overallScore must never exceed ${maxMarks}.
- Use the teacher rubric as the main basis for scoring.
- marksAwarded must never exceed the criterion's maxMarks.
- overallScore should equal the sum of the marks awarded in rubricAnalysis when a rubric is provided.
- percentage = overallScore / maxScore * 100.
- confidenceScore should be between 0 and 100.
- Keep feedback specific to the student's visible answer.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: [
        {
          inlineData: {
            mimeType: form.image.mimeType,
            data: imageBase64,
          },
        },
        {
          text: prompt,
        },
      ],
    });

    let text = response.text || "";

    text = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const evaluation = JSON.parse(text);

    const finalScore = Math.max(
      0,
      Math.min(
        Number(evaluation.overallScore) || 0,
        maxMarks
      )
    );

    const percentage = Math.round(
      (finalScore / maxMarks) * 100
    );

    evaluation.overallScore = finalScore;
    evaluation.maxScore = maxMarks;
    evaluation.percentage = percentage;

    if (
      !Array.isArray(evaluation.strengths)
    ) {
      evaluation.strengths = [];
    }

    if (
      !Array.isArray(evaluation.weaknesses)
    ) {
      evaluation.weaknesses = [];
    }

    if (
      !Array.isArray(evaluation.rubricAnalysis)
    ) {
      evaluation.rubricAnalysis = [];
    }

    if (
      !Array.isArray(evaluation.questions)
    ) {
      evaluation.questions = [];
    }

    if (evaluation.questions.length === 0) {
      evaluation.questions.push({
        question: questionPrompt,
        score: finalScore,
        maxScore: maxMarks,
        feedback:
          evaluation.feedback ||
          "Evaluation completed.",
      });
    } else {
      evaluation.questions[0].score = finalScore;
      evaluation.questions[0].maxScore = maxMarks;
    }

    return res.status(200).json({
      success: true,
      evaluation,
      source: "gemini-3.5-flash-lite",
    });
  } catch (error) {
    console.error("Evaluation error:", error);

    return res.status(500).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Evaluation failed",
    });
  }
}
