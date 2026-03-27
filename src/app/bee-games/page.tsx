
"use client";
import React, { useState } from "react";

const games = [
  {
    key: "matching-pairs",
    name: "Matching Pairs",
    url: "https://wordwall.net/embed/play/110196/457/428",
    icon: "🟨"
  },
  {
    key: "bees-quiz",
    name: "Bee's Quiz",
    url: "https://wordwall.net/embed/play/110197/605/435",
    icon: "🐝"
  }
];

export default function BeeGames() {
  const [selected, setSelected] = useState(games[0].key);
  const currentGame = games.find(g => g.key === selected);
  return (
    <div className="min-h-screen flex flex-col items-center bee-gradient px-2">
      {/* Top Bar with QueenBee Chat link */}
      <div className="w-full flex justify-center items-center gap-4 py-3 px-4" style={{ background: 'linear-gradient(90deg, #fef08a 0%, #facc15 100%)', borderBottom: '2px solid #fde047', minHeight: 56 }}>
        <a href="/bee-chat" className="font-bold text-yellow-900 hover:underline text-lg px-4 py-2 rounded transition-all" style={{ background: 'rgba(255,255,255,0.2)' }}>
          🐝 QueenBee Chat
        </a>
      </div>
      <div className="w-full max-w-3xl flex flex-col items-center justify-center rounded-2xl shadow-lg bg-white/80 p-6 mt-10 mb-8 border border-yellow-100">
        <h1 className="bee-header text-3xl mb-6">BeeGames</h1>
        {/* Game Selector */}
        <div className="flex gap-4 mb-8">
          {games.map(game => (
            <button
              key={game.key}
              className={`px-6 py-2 rounded-full font-bold text-lg border-2 transition-all ${selected === game.key ? 'bg-yellow-300 border-yellow-500 text-yellow-900 shadow' : 'bg-white border-yellow-200 text-yellow-500 hover:bg-yellow-100'}`}
              onClick={() => setSelected(game.key)}
            >
              <span className="mr-2">{game.icon}</span>{game.name}
            </button>
          ))}
        </div>
        {/* Only show selected game if found */}
        {currentGame && (
          <div className="w-full flex flex-col items-center mb-6">
            <h2 className="text-xl font-bold mb-2 text-yellow-900">{currentGame.name}</h2>
            <iframe style={{ maxWidth: '100%' }} src={currentGame.url} width="800" height="600" frameBorder="0" allowFullScreen></iframe>
          </div>
        )}
      </div>
    </div>
  );
}
