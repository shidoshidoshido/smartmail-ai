import { NextResponse } from "next/server";

interface GenerateEmailRequest {
  situation?: string;
  tone?: string;
}

interface OpenAIResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
}

interface GeneratedEmail {
  subject?: string;
  email?: string;
  body?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as GenerateEmailRequest;

    const situation = body.situation?.trim();
    const tone = body.tone?.trim() || "Professional";

    if (!situation) {
      return NextResponse.json(
        { error: "Please describe the email situation." },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.4,
          response_format: {
            type: "json_object",
          },
          messages: [
            {
              role: "system",
              content: `
You are SmartMail AI, a professional email-writing assistant.

Always return valid JSON using exactly these two keys:

{
  "subject": "Suggested subject line",
  "email": "Complete email body"
}

Do not use keys such as body, content, text, or message.
Do not include markdown code fences.
Do not invent names, dates, facts, promises, or commitments.
              `.trim(),
            },
            {
              role: "user",
              content: `
Situation:
${situation}

Tone:
${tone}

Generate a clear, complete, professional email.
              `.trim(),
            },
          ],
        }),
      }
    );

    const result = (await response.json()) as OpenAIResponse;

    if (!response.ok) {
      console.error("OpenAI API error:", result);

      return NextResponse.json(
        {
          error:
            result.error?.message ||
            "The AI service could not generate the email.",
        },
        { status: response.status }
      );
    }

    const content = result.choices?.[0]?.message?.content;

    if (!content) {
      console.error("OpenAI returned no content:", result);

      return NextResponse.json(
        { error: "The AI returned an empty response." },
        { status: 502 }
      );
    }

    console.log("Raw OpenAI content:", content);

    let generated: GeneratedEmail;

    try {
      generated = JSON.parse(content) as GeneratedEmail;
    } catch {
      console.error("Could not parse OpenAI JSON:", content);

      return NextResponse.json(
        { error: "The AI returned an invalid response format." },
        { status: 502 }
      );
    }

    const subject = generated.subject?.trim() || "Suggested Email";

    const email =
      generated.email?.trim() ||
      generated.body?.trim() ||
      generated.message?.trim();

    if (!email) {
      console.error("Parsed response missing email:", generated);

      return NextResponse.json(
        { error: "The AI returned an incomplete response." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      subject,
      email,
    });
  } catch (error) {
    console.error("Generate email error:", error);

    return NextResponse.json(
      { error: "Something went wrong while generating the email." },
      { status: 500 }
    );
  }
}
