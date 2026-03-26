import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* NAVBAR (DaisyUI) */}
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-30">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={-1} className="menu menu-sm dropdown-content mt-3 z-40 p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link href="/bee-chat">QueenBee Chat</Link></li>
              {/* Add more mobile links here */}
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl gap-2"><span className="inline-block text-2xl">🔬</span> Belen's LAB</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/bee-chat">QueenBee Chat</Link></li>
            {/* Add more desktop links here */}
          </ul>
        </div>
        <div className="navbar-end">
          {/* Example icon button, can be replaced/extended */}
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
      </div>

      <main className="flex flex-col gap-20 flex-1">
        {/* HERO SECTION */}
        <section className="flex flex-col items-center justify-center flex-1 py-24">
          <div className="max-w-3xl w-full text-center">
            <div className="flex flex-col items-center gap-6">
              <span className="inline-block text-7xl mb-2">🧬</span>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">Faster, fun, and easier science learning<br /><span className="text-accent">with Belen's LAB</span></h1>
              <p className="text-xl md:text-2xl font-medium mb-8 text-primary-content/80">The playful science platform for curious kids! Explore, experiment, and earn badges while having fun.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/bee-chat" className="btn btn-accent btn-lg">Start Chatting</Link>
                <button className="btn btn-secondary btn-lg">For Teachers</button>
              </div>
            </div>
            {/* Floating card/graphic for showcase effect */}
            <div className="relative mt-16 flex justify-center">
              <div className="rounded-2xl shadow-2xl p-8 w-full max-w-xl border-4 border-accent/30" style={{transform: 'rotate(-3deg)'}}>
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-4xl mb-2">🧪</span>
                    <span className="font-bold text-lg">Fun Experiments</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-4xl mb-2">🏅</span>
                    <span className="font-bold text-lg">Science Badges</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-4xl mb-2">👩‍🏫</span>
                    <span className="font-bold text-lg">Teacher Tools</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE GRID */}
        <section className="py-12 px-4">
          <h2 className="text-2xl font-bold text-center mb-10 text-primary-content">Why Kids Love Belen's LAB</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card shadow-md">
              <div className="card-body items-center text-center">
                <span className="text-4xl mb-2">🧪</span>
                <h3 className="card-title">Fun Experiments</h3>
                <p>Hands-on activities that make science exciting.</p>
              </div>
            </div>
            <div className="card shadow-md">
              <div className="card-body items-center text-center">
                <span className="text-4xl mb-2">🏅</span>
                <h3 className="card-title">Science Badges</h3>
                <p>Earn badges for completing challenges.</p>
              </div>
            </div>
            <div className="card shadow-md">
              <div className="card-body items-center text-center">
                <span className="text-4xl mb-2">👩‍🏫</span>
                <h3 className="card-title">Teacher Tools</h3>
                <p>Schedule lessons and track progress.</p>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIMENT PREVIEW */}
        <section className="py-12 px-4">
          <h2 className="text-2xl font-bold mb-6 text-primary-content">Try These Experiments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card shadow-lg">
              <figure className="bg-primary/10 h-32 flex items-center justify-center"><span className="text-5xl">🧪</span></figure>
              <div className="card-body">
                <h3 className="card-title">Volcano Eruption</h3>
                <div className="badge badge-success">Easy</div>
              </div>
            </div>
            <div className="card shadow-lg">
              <figure className="bg-primary/10 h-32 flex items-center justify-center"><span className="text-5xl">🔌</span></figure>
              <div className="card-body">
                <h3 className="card-title">Build a Circuit</h3>
                <div className="badge badge-warning">Medium</div>
              </div>
            </div>
            <div className="card shadow-lg">
              <figure className="bg-primary/10 h-32 flex items-center justify-center"><span className="text-5xl">🌱</span></figure>
              <div className="card-body">
                <h3 className="card-title">Plant Growth Lab</h3>
                <div className="badge badge-success">Easy</div>
              </div>
            </div>
          </div>
        </section>

        {/* TEACHER TOOLS PREVIEW */}
        <section className="py-12 px-4">
          <h2 className="text-2xl font-bold mb-6 text-primary-content">Tools for Teachers</h2>
          <div className="overflow-x-auto">
            <div className="rounded-box shadow p-6 w-full max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-lg">March 2026</span>
                <span className="text-gray-400">⋯</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day => (
                  <div key={day} className="text-xs font-bold text-gray-500 text-center py-1">{day}</div>
                ))}
                {Array.from({length: 42}, (_, i) => {
                  const day = i - 6 + 1;
                  return i < 7
                    ? null
                    : (
                      <div
                        key={i}
                        className={
                          "rounded-lg flex items-center justify-center min-h-[2.2rem] " +
                          (day > 0 && day <= 31 ? "text-primary font-semibold shadow" : "bg-transparent text-base-content/30")
                        }
                      >
                        {day > 0 && day <= 31 ? day : ''}
                      </div>
                    );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="py-16 px-4 text-center rounded-box shadow-xl">
          <h2 className="text-2xl font-bold text-primary">Ready to Explore?</h2>
          <Link href="/bee-chat" className="btn btn-accent btn-lg mt-4">Join Belen's LAB / QueenBee Chat</Link>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-8 text-center text-sm text-primary-content/80 mt-8">
        © {new Date().getFullYear()} Belen's LAB — Learning Through Curiosity
      </footer>
    </div>
  );
}
