import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { message, lang } = await request.json();

  // Azure OpenAI config (replace with your values)
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;

  if (!endpoint || !apiKey || !deployment) {
    return NextResponse.json({ error: "Azure OpenAI not configured." }, { status: 500 });
  }

  const prompt = lang === 'es'
    ? `Eres BeeBot, un experto en abejas. Responde en español para niños: ${message}`
    : `You are BeeBot, a bee expert. Answer in English for kids: ${message}`;

  try {
    const aiRes = await fetch(`${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=2024-02-15-preview`, {
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
