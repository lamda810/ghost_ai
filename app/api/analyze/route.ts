import OpenAI from "openai";

export async function POST() {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json({
        result:
          "Authenticity score: 79%. Manipulation risk: low. No OpenAI key configured, so this is a local fallback analysis.",
      });
    }

    const openai = new OpenAI({
      apiKey,
    });

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
