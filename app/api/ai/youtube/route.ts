import getTranscript from "youtube-transcript";
import { TextGenerationClient } from "@google-ai/generativeai";

const client = new TextGenerationClient({ apiKey: process.env.GOOGLE_API_KEY });

export async function POST(req: Request) {
  const { url } = await req.json();
  const transcriptData = await getTranscript(url);
  const text = transcriptData.map(t => t.text).join(" ");

  // Optional: summarize via Gemini
  const [response] = await client.generateText({
    model: "text-bison-001",
    prompt: `Summarise this YouTube transcript for GCSE notes:\n${text}`,
    maxOutputTokens: 500
  });

  return new Response(JSON.stringify({ notes: response.candidates[0].output }), { headers: { "Content-Type": "application/json" } });
}
