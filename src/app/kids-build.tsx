"use client";
import { useState } from "react";

export default function KidsBuild() {
  const [prompt, setPrompt] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;
    // Save to localStorage for demo (could be backend in future)
    const prompts = JSON.parse(localStorage.getItem("bee_kid_prompts") || "[]");
    prompts.push(prompt);
    localStorage.setItem("bee_kid_prompts", JSON.stringify(prompts));
    setPrompt("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
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
        {submitted && <div className="mt-3 text-green-600">Thank you for your idea!</div>}
      </div>
    </div>
  );
}