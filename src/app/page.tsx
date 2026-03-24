import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-20">

      {/* HERO SECTION */}
      <section className="bee-section text-center">
        <h1 className="bee-title">Discover Science Through Play</h1>
        <p className="bee-text max-w-xl mx-auto mt-4">
          BeeAI helps kids explore science with fun experiments, badges, and safe learning tools.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <Link href="/bee-chat" className="btn btn-primary">Go to QueenBee Chat</Link>
          <button className="btn">For Teachers</button>
        </div>

        {/* Illustration placeholder */}
        <div className="mt-10 w-full h-64 bg-blue-100 rounded-xl shadow-inner"></div>
      </section>

      {/* FEATURE GRID */}
      <section className="bee-section">
        <h2 className="bee-subtitle text-center mb-10">Why Kids Love BeeAI</h2>

        <div className="bee-grid bee-grid-3">
          <div className="card">
            <h3 className="bee-subtitle">Fun Experiments</h3>
            <p className="bee-text">Hands-on activities that make science exciting.</p>
          </div>

          <div className="card">
            <h3 className="bee-subtitle">Science Badges</h3>
            <p className="bee-text">Earn badges for completing challenges.</p>
          </div>

          <div className="card">
            <h3 className="bee-subtitle">Teacher Tools</h3>
            <p className="bee-text">Schedule lessons and track progress.</p>
          </div>
        </div>
      </section>

      {/* EXPERIMENT PREVIEW */}
      <section className="bee-section">
        <h2 className="bee-subtitle mb-6">Try These Experiments</h2>

        <div className="bee-grid bee-grid-3">
          <div className="bee-experiment-card">
            <div className="bee-experiment-image"></div>
            <div className="bee-experiment-body">
              <h3 className="bee-experiment-title">Volcano Eruption</h3>
              <span className="bee-experiment-difficulty">Easy</span>
            </div>
          </div>

          <div className="bee-experiment-card">
            <div className="bee-experiment-image"></div>
            <div className="bee-experiment-body">
              <h3 className="bee-experiment-title">Build a Circuit</h3>
              <span className="bee-experiment-difficulty">Medium</span>
            </div>
          </div>

          <div className="bee-experiment-card">
            <div className="bee-experiment-image"></div>
            <div className="bee-experiment-body">
              <h3 className="bee-experiment-title">Plant Growth Lab</h3>
              <span className="bee-experiment-difficulty">Easy</span>
            </div>
          </div>
        </div>
      </section>

      {/* TEACHER TOOLS PREVIEW */}
      <section className="bee-section">
        <h2 className="bee-subtitle mb-6">Tools for Teachers</h2>

        <div className="bee-calendar">
          <div className="bee-calendar-header flex items-center justify-between mb-2">
            <span className="font-semibold">March 2026</span>
            <span className="text-gray-400">⋯</span>
          </div>
          <div className="bee-calendar-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '0.5rem',
            background: 'var(--bee-surface-alt)',
            borderRadius: 'var(--bee-radius)',
            padding: '1rem',
            boxShadow: 'var(--bee-shadow-xs)'
          }}>
            {/* Weekday headers */}
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day => (
              <div key={day} className="bee-calendar-day font-bold text-xs text-gray-500 bg-transparent shadow-none cursor-default" style={{textAlign:'center',padding:'0.25rem 0'}}>{day}</div>
            ))}
            {/* March 2026: 1st is Sunday, 31 days, 6 rows */}
            {/* 0 padding days before 1st (since 1st is Sunday) */}
            {Array.from({length: 42}, (_, i) => {
              const day = i - 6 + 1; // 6 weekday headers
              return i < 7
                ? null // skip, already rendered weekday headers
                : (
                  <div
                    key={i}
                    className={
                      "bee-calendar-day" +
                      (day > 0 && day <= 31 ? " bg-white shadow-sm" : " bg-transparent cursor-default")
                    }
                    style={{
                      minHeight: '2.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'var(--bee-radius-sm)',
                      color: day > 0 && day <= 31 ? 'var(--bee-primary-dark)' : '#cbd5e1',
                      fontWeight: day > 0 && day <= 31 ? 500 : 400,
                      fontSize: '1rem',
                      boxShadow: day > 0 && day <= 31 ? 'var(--bee-shadow-xs)' : 'none',
                    }}
                  >
                    {day > 0 && day <= 31 ? day : ''}
                  </div>
                );
            })}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bee-section text-center">
        <h2 className="bee-subtitle">Ready to Explore?</h2>
        <Link href="/bee-chat" className="btn btn-primary mt-4">Join BeeAI / QueenBee Chat</Link>
      </section>

      {/* FOOTER */}
      <footer className="bee-section text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BeeAI — Learning Through Curiosity
      </footer>
    </main>
  );
}
