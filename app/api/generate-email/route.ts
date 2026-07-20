import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { situation, tone } = await req.json();

    if (!situation || situation.trim() === "") {
      return NextResponse.json(
        { error: "Situation is required." },
        { status: 400 }
      );
    }

    const prompt = `
You are a professional email writing assistant.

Write a complete email based on:

Situation:
${situation}

Tone:
${tone}

Requirements:
- Include a subject line.
- Be professional and grammatically correct.
- Keep it concise.
- Return only the email.
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    return NextResponse.json({
      email: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate email." },
      { status: 500 }
    );
  }
}