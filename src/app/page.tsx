// Redirect landing page to QueenBee Chat
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/bee-chat');
  return null;
}
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
