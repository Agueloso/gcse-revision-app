import { TextGenerationClient } from "@google-ai/generativeai";
const client = new TextGenerationClient({ apiKey: process.env.GOOGLE_API_KEY });

export async function POST(req: Request) {
  const { text } = await req.json();

  const [response] = await client.generateText({
    model: "text-bison-001",
    prompt: `Create GCSE exam questions with mark schemes from this text:\n${text}`,
    maxOutputTokens: 1000
  });

  return new Response(
    JSON.stringify({ questions: [{ question: "Explain key idea", answer: response.candidates[0].output }] }),
    { headers: { "Content-Type": "application/json" } }
  );
}
