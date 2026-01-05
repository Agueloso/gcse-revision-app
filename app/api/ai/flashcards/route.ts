import { TextGenerationClient } from "@google-ai/generativeai";
const client = new TextGenerationClient({ apiKey: process.env.GOOGLE_API_KEY });

export async function POST(req: Request) {
  const { text } = await req.json();

  const [response] = await client.generateText({
    model: "text-bison-001",
    prompt: `Create GCSE flashcards (Q: ... A: ...) from this text:\n${text}`,
    maxOutputTokens: 1000
  });

  const cards = response.candidates[0].output
    .split("\n")
    .filter(Boolean)
    .map(line => {
      const [q, ...a] = line.split(":");
      return { q: q?.trim(), a: a.join(":").trim() };
    });

  return new Response(JSON.stringify({ cards }), { headers: { "Content-Type": "application/json" } });
}
