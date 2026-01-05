import { TextGenerationClient } from "@google-ai/generativeai";
const client = new TextGenerationClient({ apiKey: process.env.GOOGLE_API_KEY });

export async function POST(req: Request) {
  const { text } = await req.json();
  const [response] = await client.generateText({
    model: "text-bison-001",
    prompt: `You are a GCSE tutor. Summarise this text:\n${text}`,
    maxOutputTokens: 500
  });

  return new Response(
    JSON.stringify({ summary: response.candidates[0].output }),
    { headers: { "Content-Type": "application/json" } }
  );
}
