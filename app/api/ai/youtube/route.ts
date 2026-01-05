import getTranscript from "youtube-transcript";

export async function POST(req: Request) {
  const { url } = await req.json();

  // getTranscript returns an array of objects with { text, start }
  const transcriptData = await getTranscript(url);
  const text = transcriptData.map(t => t.text).join(" ");

  return new Response(
    JSON.stringify({ notes: text.slice(0, 5000) }),
    { headers: { "Content-Type": "application/json" } }
  );
}
