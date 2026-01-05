import { Transcript } from "youtube-transcript";
export async function POST(req:Request){
  const {url}=await req.json();
  const transcript = await Transcript.from(url);
  const text = transcript.map(t=>t.text).join(' ');
  return new Response(JSON.stringify({notes:text.slice(0,5000)}),{headers:{"Content-Type":"application/json"}});
}