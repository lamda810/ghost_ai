import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
  try {
    const prompt = `
    Analyze whether a digital file description appears AI manipulated.
    Generate:
    - authenticity score
    - manipulation risk
    - short explanation
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return Response.json({
      result: response.choices[0].message.content,
    });
  } catch {
    return Response.json({
      error: "AI analysis failed",
    });
  }
}
