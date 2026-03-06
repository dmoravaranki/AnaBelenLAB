import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { message, lang } = await request.json();

  // Foundry endpoint and key from environment variables
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;

  if (!endpoint || !apiKey) {
    return NextResponse.json({ error: "Azure Foundry endpoint or key not configured." }, { status: 500 });
  }

  const prompt = lang === 'es'
    ? `Eres BeeBot, un experto en abejas. Responde en español para niños: ${message}`
    : `You are BeeBot, a bee expert. Answer in English for kids: ${message}`;

  try {
    const aiRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: lang === 'es' ? "Eres BeeBot, un experto en abejas para niños." : "You are BeeBot, a bee expert for kids." },
          { role: "user", content: prompt }
        ],
        max_tokens: 256,
        temperature: 0.7
      })
    });
    const data = await aiRes.json();
    const aiMessage = data.choices?.[0]?.message?.content || "Sorry, no response.";
    return NextResponse.json({ message: aiMessage });
  } catch (err) {
    return NextResponse.json({ error: "AI request failed." }, { status: 500 });
  }
}
