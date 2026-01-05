import OpenAI from "openai";
const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY||''});
export async function POST(req:Request){
  const {text}=await req.json();
  const res=await openai.chat.completions.create({model:"gpt-4o-mini",messages:[{role:"system",content:"You are a GCSE tutor."},{role:"user",content:text}]});
  return new Response(JSON.stringify({summary:res.choices[0].message.content}),{headers:{"Content-Type":"application/json"}});
}