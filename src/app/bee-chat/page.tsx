"use client";
import '../bee-ui.css';
import { useState, useRef, useEffect } from 'react';

function BeeMascot() {
	return (
		<div className="bee-mascot" aria-label="QueenBee mascot" title="QueenBee">
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
		// Suggested prompts (Spanish and English)
		const suggestedPrompts = [
			{
				es: { text: "¿Qué es la polinización?", kid: "Team" },
				en: { text: "What is pollination?", kid: "Team" }
			},
			{
				es: { text: "¿Cuánta distancia puede volar una abeja al polinizar?", kid: "Mercedes" },
				en: { text: "How far can a bee fly when pollinating?", kid: "Mercedes" }
			},
			{
				es: { text: "¿Cómo ayuda la polinización a las flores?", kid: "Aaron" },
				en: { text: "How does pollination help flowers?", kid: "Aaron" }
			},
			{
				es: { text: "¿De qué tamaño es la cabeza de las abejas?", kid: "Alia" },
				en: { text: "How big is a bee's head?", kid: "Alia" }
			},
			{
				es: { text: "¿Qué pasa si las abejas toman más néctar de lo que deben?", kid: "Ariana" },
				en: { text: "What happens if bees take more nectar than they should?", kid: "Ariana" }
			},
			{
				es: { text: "¿Por qué las abejas en ocasiones pelean con las avispas?", kid: "Emma" },
				en: { text: "Why do bees sometimes fight with wasps?", kid: "Emma" }
			}
		];

	const [lang, setLang] = useState<'en' | 'es'>('en');
	const greeting = lang === 'en'
		? "Hi! I'm QueenBee. Ask me anything about bees!"
		: "¡Hola! Soy QueenBee. ¡Pregúntame lo que quieras sobre abejas!";
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
			{ sender: 'ai', message: lang === 'en' ? '(QueenBee is thinking...)' : '(QueenBee está pensando...)' }
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

	// Main render block
	return (
		<div className="min-h-screen flex flex-col justify-center items-center bee-gradient px-2">
			{/* Top Bar with BeeGames and Kids Build links */}
			<div className="w-full flex justify-center items-center gap-4 py-3 px-4" style={{ background: 'linear-gradient(90deg, #fef08a 0%, #facc15 100%)', borderBottom: '2px solid #fde047', minHeight: 56 }}>
				<a href="/bee-games" className="font-bold text-yellow-900 hover:underline text-lg px-4 py-2 rounded transition-all" style={{ background: 'rgba(255,255,255,0.2)' }}>
					🕹️ BeeGames
				</a>
				<a href="/bee-chat/kids-build" className="font-bold text-yellow-900 hover:underline text-lg px-4 py-2 rounded transition-all" style={{ background: 'rgba(255,255,255,0.2)' }}>
					🧒 Kids Build
				</a>
			</div>
			<div className="w-full max-w-2xl flex flex-col items-center justify-center rounded-2xl shadow-lg bg-white/80 p-6 mt-10 mb-8 border border-yellow-100 relative">
				<img
					src="/bee-queen-logo.png"
					alt="Bee Queen Logo"
					style={{ position: 'absolute', top: -40, right: 12, height: 220, width: 'auto', zIndex: 10, background: 'none', border: 'none', boxShadow: 'none' }}
				/>
				<header className="mb-4 text-center">
					<h1 className="bee-header">QueenBee Chat</h1>
					<div className="flex flex-col items-center gap-1 mb-2">
						<span className="text-xs font-semibold text-yellow-900 mb-1">Language</span>
						<div className="flex justify-center gap-2">
							<button
								className={`bee-btn px-4 py-1 text-base border-2 ${lang === 'en' ? 'bg-yellow-200 border-yellow-400 text-yellow-900' : 'bg-white border-yellow-200 text-yellow-500'}`}
								onClick={() => setLang('en')}
								disabled={lang === 'en'}
								aria-current={lang === 'en' ? 'page' : undefined}
							>EN</button>
							<button
								className={`bee-btn px-4 py-1 text-base border-2 ${lang === 'es' ? 'bg-yellow-200 border-yellow-400 text-yellow-900' : 'bg-white border-yellow-200 text-yellow-500'}`}
								onClick={() => setLang('es')}
								disabled={lang === 'es'}
								aria-current={lang === 'es' ? 'page' : undefined}
							>ES</button>
						</div>
					</div>
				</header>



				{/* Suggested Prompts */}
				<div className="w-full flex flex-wrap gap-3 justify-center mb-6">
					{suggestedPrompts.map((p, idx) => (
						<button
							key={idx}
							className="bee-btn bg-yellow-100 hover:bg-yellow-200 text-yellow-900 border border-yellow-200 px-4 py-2 rounded-lg flex flex-col items-center min-w-[180px] shadow-sm"
							style={{ fontSize: '1rem', lineHeight: 1.2 }}
							onClick={() => setInput(lang === 'en' ? p.en.text : p.es.text)}
							type="button"
						>
							<span>{lang === 'en' ? p.en.text : p.es.text}</span>
							<span style={{ fontSize: '0.85em', color: '#555', marginTop: 2 }}>{lang === 'en' ? p.en.kid : p.es.kid}</span>
						</button>
					))}
				</div>

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
				<span>QueenBee &copy; 2026</span>
				<span className="flex items-center gap-2 mt-1">
					<span>Powered by Azure OpenAI</span>
				</span>
			</footer>
		</div>
	);
}