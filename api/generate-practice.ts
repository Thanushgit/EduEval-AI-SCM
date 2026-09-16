import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

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
    const { topic, weakConcepts, difficulty, count } = req.body || {};

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "Gemini API key is not configured",
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
You are an educational practice-question generator.

Generate ${count || 3} practice questions based on:

Topic: ${topic || "General Mathematics"}

Weak concepts:
${Array.isArray(weakConcepts)
  ? weakConcepts.join(", ")
  : weakConcepts || "None specified"}

Difficulty:
${difficulty || "medium"}

Return ONLY valid JSON.

Use this structure:

{
  "topic": "string",
  "problems": [
    {
      "id": "string",
      "question": "string",
      "conceptFocus": "string",
      "hint": "string",
      "stepByStepSolution": ["string"],
      "correctAnswer": "string"
    }
  ]
}

Rules:
- Questions must be educational and relevant to the topic.
- Focus especially on the weak concepts.
- Do not include markdown.
- Do not include explanations outside the JSON.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
    });

    const text = response.text || "";

    const cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return res.status(200).json({
      success: true,
      data: parsed,
      source: "gemini",
    });
  } catch (error) {
    console.error("Practice generation error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to generate practice questions",
    });
  }
}
