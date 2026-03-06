"use client";
import './bee-ui.css';
import { useState, useRef, useEffect } from 'react';

function BeeMascot() {
  return (
    <div className="bee-mascot" aria-label="Bee mascot" title="BeeBot">
      🐝
    </div>
  );
}

function MessageBubble({ message, sender }: { message: string; sender: 'user' | 'ai' }) {
  return (
    <div className={`bee-bubble ${sender}`}>
      {message}
    </div>
  );
}


export default function ChatUI() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const greeting = lang === 'en'
    ? "Hi! I'm BeeBot. Ask me anything about bees!"
    : "¡Hola! Soy BeeBot. ¡Pregúntame lo que quieras sobre abejas!";
  const placeholder = lang === 'en' ? 'Type your question...' : 'Escribe tu pregunta...';
  const sendLabel = lang === 'en' ? 'Send' : 'Enviar';
  const [messages, setMessages] = useState([
    { sender: 'ai', message: greeting }
  ]);
  const [input, setInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  // Update greeting if language changes and first message is the old greeting
  useEffect(() => {
    setMessages(msgs => {
      if (msgs.length === 1 && msgs[0].sender === 'ai') {
        return [{ sender: 'ai', message: greeting }];
      }
      return msgs;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  async function handleSend() {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', message: input };
    setMessages((msgs) => [
      ...msgs,
      userMsg
    ]);
    setInput('');
    // Show thinking message
    setMessages((msgs) => [
      ...msgs,
      { sender: 'ai', message: lang === 'en' ? '(BeeBot is thinking...)' : '(BeeBot está pensando...)' }
    ]);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, lang })
      });
      const data = await res.json();
      setMessages((msgs) => {
        // Remove the last "thinking" message and add the AI response
        const msgsNoThinking = msgs.slice(0, -1);
        return [
          ...msgsNoThinking,
          { sender: 'ai', message: data.message || (lang === 'en' ? 'Sorry, no response.' : 'Lo siento, no hay respuesta.') }
        ];
      });
    } catch (err) {
      setMessages((msgs) => {
        const msgsNoThinking = msgs.slice(0, -1);
        return [
          ...msgsNoThinking,
          { sender: 'ai', message: lang === 'en' ? 'Error: AI request failed.' : 'Error: Falló la solicitud de IA.' }
        ];
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bee-gradient px-2">
      <div className="w-full max-w-2xl flex flex-col items-center justify-center rounded-2xl shadow-lg bg-white/80 p-6 mt-10 mb-8 border border-yellow-100 relative">
        <img
          src="/azure-ai-foundry-logo.jpg"
          alt="Azure AI Foundry Logo"
          style={{ position: 'absolute', top: 18, right: 18, height: 54, width: 'auto', zIndex: 10, borderRadius: 8, boxShadow: '0 2px 8px #fbbf24aa' }}
        />
        <header className="mb-4 text-center">
          <BeeMascot />
          <h1 className="bee-header">Bee AI Chat</h1>
          <div className="flex justify-center gap-2 mb-2">
            <button
              className={`bee-btn px-4 py-1 text-base ${lang === 'en' ? 'bg-[var(--color-accent)]' : ''}`}
              onClick={() => setLang('en')}
              disabled={lang === 'en'}
              aria-current={lang === 'en' ? 'page' : undefined}
            >EN</button>
            <button
              className={`bee-btn px-4 py-1 text-base ${lang === 'es' ? 'bg-[var(--color-accent)]' : ''}`}
              onClick={() => setLang('es')}
              disabled={lang === 'es'}
              aria-current={lang === 'es' ? 'page' : undefined}
            >ES</button>
          </div>
          <p className="text-lg text-[var(--color-muted)]">{greeting}</p>
        </header>
        <main className="bee-chat w-full flex-1 overflow-y-auto" ref={chatRef} style={{minHeight: '40vh', maxHeight: '50vh'}}>
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg.message} sender={msg.sender as 'user' | 'ai'} />
          ))}
        </main>
        <form className="w-full flex gap-2 mt-2" onSubmit={e => { e.preventDefault(); handleSend(); }}>
          <input
            className="bee-input flex-1"
            type="text"
            placeholder={placeholder}
            value={input}
            onChange={e => setInput(e.target.value)}
            aria-label={placeholder}
          />
          <button className="bee-btn" type="submit">{sendLabel}</button>
        </form>
      </div>
      <footer className="text-xs text-[var(--color-muted)] mb-2 flex flex-col items-center gap-1">
        <span>Bee AI &copy; 2026</span>
        <span className="flex items-center gap-2 mt-1">
          <span>Powered by Azure OpenAI</span>
        </span>
      </footer>
    </div>
  );
}
