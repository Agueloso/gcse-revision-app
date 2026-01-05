import OpenAI from "openai";
const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY||''});
export async function POST(req:Request){
  const {text}=await req.json();
  const res=await openai.chat.completions.create({model:"gpt-4o-mini",messages:[{role:"system",content:"Create GCSE flashcards."},{role:"user",content:text}]});
  const cards=res.choices[0].message.content?.split('\n').filter(Boolean).map(line=>({q:line.split(':')[0],a:line.split(':').slice(1).join(':')}));
  return new Response(JSON.stringify({cards}),{headers:{"Content-Type":"application/json"}});
}