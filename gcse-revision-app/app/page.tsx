"use client";
import { useState } from "react";

export default function Page() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");

  async function getSummary() {
    const res = await fetch("/api/ai/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: notes }),
    });
    const data = await res.json();
    setSummary(data.summary);
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>GCSE AI Revision App</h1>
      <textarea value={notes} onChange={e => setNotes(e.target.value)} />
      <br />
      <button onClick={getSummary}>Summarise</button>
      <p>{summary}</p>
    </main>
  );
}