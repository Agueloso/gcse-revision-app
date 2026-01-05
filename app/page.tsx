'use client';
import { useState } from 'react';

export default function Page() {
  const [notes,setNotes] = useState('');
  const [summary,setSummary] = useState('');
  const [flashcards,setFlashcards] = useState<any[]>([]);
  const [examQs,setExamQs] = useState<any[]>([]);
  const [youtubeUrl,setYoutubeUrl] = useState('');

  const callAI = async (url:string, body:any) => {
    const res = await fetch(url,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(body)
    });
    return res.json();
  };

  return (
    <main style={{padding:20,maxWidth:700,margin:'auto'}}>
      <h1>📘 GCSE AI Revision App (Gemini)</h1>
      
      <textarea placeholder="Paste notes..." value={notes} onChange={e=>setNotes(e.target.value)} style={{width:'100%',height:120}} />
      <br/><br/>

      <button onClick={async()=>{const d=await callAI('/api/ai/summary',{text:notes}); setSummary(d.summary)}}>AI Summary</button>
      <button onClick={async()=>{const d=await callAI('/api/ai/flashcards',{text:notes}); setFlashcards(d.cards)}}>Flashcards</button>
      <button onClick={async()=>{const d=await callAI('/api/ai/exam',{text:notes}); setExamQs(d.questions)}}>Exam Questions</button>
      
      <br/><br/>
      <input placeholder="YouTube link" value={youtubeUrl} onChange={e=>setYoutubeUrl(e.target.value)} style={{width:'100%'}} />
      <button onClick={async()=>{const d=await callAI('/api/ai/youtube',{url:youtubeUrl}); setNotes(d.notes)}}>Analyse YouTube</button>
      
      <hr/>

      {summary && <p><strong>Summary:</strong> {summary}</p>}
      {flashcards.map((c,i)=><div key={i}><strong>Q:</strong>{c.q}<br/><strong>A:</strong>{c.a}</div>)}
      {examQs.map((q,i)=><div key={i}><p><strong>{q.question}</strong></p><p>{q.answer}</p></div>)}
    </main>
  );
}
