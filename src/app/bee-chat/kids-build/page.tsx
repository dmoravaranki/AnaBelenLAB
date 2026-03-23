"use client";
import { useState, useEffect } from "react";

export default function KidsBuild() {
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [allPrompts, setAllPrompts] = useState<any[]>([]);

  // Fetch all prompts from backend on mount
  useEffect(() => {
    fetch("/api/bee-chat/kids-build")
      .then(res => res.json())
      .then(data => Array.isArray(data.prompts) ? setAllPrompts(data.prompts) : setAllPrompts([]));
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setShowNamePopup(true);
  }

  async function handleNameSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const newEntry = { prompt, name };
    // Send to backend
    const res = await fetch("/api/bee-chat/kids-build", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry)
    });
    if (res.ok) {
      // Fetch updated list
      const updated = await fetch("/api/bee-chat/kids-build").then(r => r.json());
      setAllPrompts(updated.prompts || []);
      setPrompt("");
      setName("");
      setShowNamePopup(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bee-gradient px-2">
      <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-lg p-8 mt-10 mb-8 border border-yellow-100 flex flex-col items-center">
        <h2 className="bee-header mb-2">Kids Build: Suggest a BeeBot Prompt!</h2>
        <p className="mb-4 text-center text-[var(--color-muted)]">Write a question or prompt you want BeeBot to answer. Your idea could help other kids!</p>
        <form className="w-full flex flex-col gap-3 items-center" onSubmit={handleSubmit}>
          <input
            className="bee-input w-full"
            type="text"
            placeholder="Type your prompt idea..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            maxLength={120}
            required
          />
          <button className="bee-btn w-fit" type="submit">Submit Prompt</button>
        </form>
        {showNamePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-3 min-w-[280px]">
              <h3 className="bee-header text-lg mb-2">What's your name?</h3>
              <form className="flex flex-col gap-2 w-full" onSubmit={handleNameSubmit}>
                <input
                  className="bee-input w-full"
                  type="text"
                  placeholder="Your first name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  maxLength={32}
                  required
                  autoFocus
                />
                <button className="bee-btn w-fit" type="submit">Save Suggestion</button>
                <button className="bee-btn w-fit bg-gray-200 text-gray-700 mt-1" type="button" onClick={() => setShowNamePopup(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
        {submitted && <div className="mt-3 text-green-600">Thank you for your idea!</div>}
      </div>
      <div className="w-full max-w-xl bg-white/80 rounded-2xl shadow p-6 mb-8 border border-yellow-100 flex flex-col items-center">
        <h3 className="bee-header text-lg mb-3">All Kids' Suggestions</h3>
        {Array.isArray(allPrompts) && allPrompts.length === 0 ? (
          <div className="text-[var(--color-muted)]">No suggestions yet. Be the first!</div>
        ) : Array.isArray(allPrompts) ? (
          <ul className="w-full flex flex-col gap-2">
            {allPrompts.map((entry, idx) => (
              <li key={idx} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 bg-yellow-50 rounded-lg px-3 py-2 border border-yellow-100">
                <span className="font-semibold text-yellow-900">{entry.prompt}</span>
                <span className="text-xs text-yellow-700">— {entry.name}</span>
                {/* Future: Add voting button here */}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-[var(--color-muted)]">Error loading suggestions.</div>
        )}
      </div>
    </div>
  );
}
