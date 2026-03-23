"use client";
import { useState, useEffect } from "react";

export default function KidsBuild() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [allPrompts, setAllPrompts] = useState<any[]>([]);
  const [kids, setKids] = useState<any[]>([]);
  const [newName, setNewName] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [voting, setVoting] = useState<{ [id: string]: boolean }>({});

  // Fetch all prompts from backend on mount
  useEffect(() => {
    fetch("/api/bee-chat/kids-build")
      .then(res => res.json())
      .then(data => Array.isArray(data.prompts) ? setAllPrompts(data.prompts) : setAllPrompts([]));
    // Fetch kids registry
    fetch("/api/bee-chat/kids-build/kids")
      .then(res => res.json())
      .then(data => Array.isArray(data.kids) ? setKids(data.kids) : setKids([]));
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setShowNamePopup(true);
  }

  async function handleNameSubmit(e: React.FormEvent) {
    e.preventDefault();
    let finalName = name;
    if (isAddingNew) {
      if (!newName.trim()) return;
      // Add new kid to registry
      const res = await fetch("/api/bee-chat/kids-build/kids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim() })
      });
      if (res.ok) {
        const data = await res.json();
        finalName = data.kid.name;
        setKids(kids => [...kids, { name: finalName }]);
      } else {
        return;
      }
    }
    if (!finalName.trim()) return;
    const newEntry = { prompt, name: finalName };
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
      setNewName("");
      setIsAddingNew(false);
      setShowNamePopup(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    }
  }

  // Voting handler
  async function handleVote(id: string) {
    setVoting(v => ({ ...v, [id]: true }));
    await fetch("/api/bee-chat/kids-build", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    // Refresh prompts
    const updated = await fetch("/api/bee-chat/kids-build").then(r => r.json());
    setAllPrompts(updated.prompts || []);
    setVoting(v => ({ ...v, [id]: false }));
  }

  // Simple translations
  const t = {
    en: {
      suggest: "Kids Build: Suggest a BeeBot Prompt!",
      desc: "Write a question or prompt you want BeeBot to answer. Your idea could help other kids!",
      promptPlaceholder: "Type your prompt idea...",
      submit: "Submit Prompt",
      nameTitle: "What's your name?",
      selectName: "Select your name",
      addNew: "Add new...",
      enterNew: "Enter new name",
      save: "Save Suggestion",
      cancel: "Cancel",
      thankYou: "Thank you for your idea!",
      allSuggestions: "All Kids' Suggestions",
      none: "No suggestions yet. Be the first!",
      error: "Error loading suggestions.",
      voting: "Voting",
      byKid: "Suggestions by Kid",
      voteTitle: "Vote for Your Favorite Prompt!"
    },
    es: {
      suggest: "¡Kids Build: Sugiere una pregunta para BeeBot!",
      desc: "Escribe una pregunta o idea que quieras que BeeBot responda. ¡Tu idea puede ayudar a otros niños!",
      promptPlaceholder: "Escribe tu idea de pregunta...",
      submit: "Enviar sugerencia",
      nameTitle: "¿Cómo te llamas?",
      selectName: "Selecciona tu nombre",
      addNew: "Agregar nuevo...",
      enterNew: "Ingresa un nombre nuevo",
      save: "Guardar sugerencia",
      cancel: "Cancelar",
      thankYou: "¡Gracias por tu idea!",
      allSuggestions: "Sugerencias de todos los niños",
      none: "Aún no hay sugerencias. ¡Sé el primero!",
      error: "Error al cargar sugerencias.",
      voting: "Votación",
      byKid: "Por niño",
      voteTitle: "¡Vota por tu sugerencia favorita!"
    }
  };
  const tr = t[lang];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bee-gradient px-2">
      <div className="w-full flex flex-row justify-end max-w-5xl mt-4">
        <button
          className={`px-3 py-1 rounded-l bg-${lang === 'en' ? 'yellow-400' : 'yellow-100'} font-bold`}
          onClick={() => setLang('en')}
        >EN</button>
        <button
          className={`px-3 py-1 rounded-r bg-${lang === 'es' ? 'yellow-400' : 'yellow-100'} font-bold`}
          onClick={() => setLang('es')}
        >ES</button>
      </div>
      <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-lg p-8 mt-10 mb-8 border border-yellow-100 flex flex-col items-center">
        <h2 className="bee-header mb-2">{tr.suggest}</h2>
        <p className="mb-4 text-center text-[var(--color-muted)]">{tr.desc}</p>
        <form className="w-full flex flex-col gap-3 items-center" onSubmit={handleSubmit}>
          <input
            className="bee-input w-full"
            type="text"
            placeholder={tr.promptPlaceholder}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            maxLength={120}
            required
          />
          <button className="bee-btn w-fit" type="submit">{tr.submit}</button>
        </form>
        {showNamePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-3 min-w-[280px]">
              <h3 className="bee-header text-lg mb-2">{tr.nameTitle}</h3>
              <form className="flex flex-col gap-2 w-full" onSubmit={handleNameSubmit}>
                {!isAddingNew ? (
                  <>
                    <select
                      className="bee-input w-full"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      autoFocus
                    >
                      <option value="" disabled>{tr.selectName}</option>
                      {kids.map((kid: any) => (
                        <option key={kid._id || kid.name} value={kid.name}>{kid.name}</option>
                      ))}
                      <option value="__add_new__">{tr.addNew}</option>
                    </select>
                    {name === "__add_new__" && setIsAddingNew(true)}
                  </>
                ) : (
                  <>
                    <input
                      className="bee-input w-full"
                      type="text"
                      placeholder={tr.enterNew}
                      value={newName}
                      onChange={e => setNewName(e.target.value)}
                      maxLength={32}
                      required
                      autoFocus
                    />
                    <button
                      className="bee-btn w-fit bg-gray-200 text-gray-700 mt-1"
                      type="button"
                      onClick={() => { setIsAddingNew(false); setName(""); setNewName(""); }}
                    >{tr.cancel}</button>
                  </>
                )}
                <button className="bee-btn w-fit" type="submit">{tr.save}</button>
                <button className="bee-btn w-fit bg-gray-200 text-gray-700 mt-1" type="button" onClick={() => { setShowNamePopup(false); setIsAddingNew(false); setName(""); setNewName(""); }}>{tr.cancel}</button>
              </form>
            </div>
          </div>
        )}
        {submitted && <div className="mt-3 text-green-600">{tr.thankYou}</div>}
      </div>
      <div className="w-full max-w-5xl bg-white/80 rounded-2xl shadow p-6 mb-8 border border-yellow-100 flex flex-col items-center">
        <h3 className="bee-header text-lg mb-3">{tr.allSuggestions}</h3>
        {Array.isArray(allPrompts) && allPrompts.length === 0 ? (
          <div className="text-[var(--color-muted)]">{tr.none}</div>
        ) : Array.isArray(allPrompts) ? (
          (() => {
            // Group prompts by kid's name
            const grouped: { [name: string]: any[] } = {};
            allPrompts.forEach(entry => {
              if (!grouped[entry.name]) grouped[entry.name] = [];
              grouped[entry.name].push(entry);
            });
            const kidNames = Object.keys(grouped);
            return (
              <div className="w-full flex flex-col sm:flex-row gap-6 justify-center">
                {kidNames.map((kid, colIdx) => (
                  <div key={kid} className="flex-1 min-w-[180px]">
                    <div className="font-bold text-yellow-800 text-center mb-2">{kid}</div>
                    <ul className="flex flex-col gap-2">
                      {grouped[kid].map((entry, idx) => (
                        <li key={idx} className="bg-yellow-50 rounded-lg px-3 py-2 border border-yellow-100">
                          <span className="font-semibold text-yellow-900">{entry.prompt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          })()
        ) : (
          <div className="text-[var(--color-muted)]">{tr.error}</div>
        )}
      </div>
    </div>
  );
}
