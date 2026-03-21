import Link from "next/link";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bee-gradient px-2">
      <div className="w-full max-w-2xl flex flex-col items-center justify-center rounded-2xl shadow-lg bg-white/80 p-10 mt-10 mb-8 border border-yellow-100">
        <h1 className="bee-header mb-4 text-3xl">Welcome to the Kids Learning Platform!</h1>
        <p className="mb-6 text-lg text-[var(--color-muted)] text-center">
          A safe, fun, and interactive place for kids to learn, explore, and create. New features coming soon!
        </p>
        <Link href="/bee-chat" className="bee-btn text-lg px-6 py-3 mb-2">Go to Bee AI Chat</Link>
        <Link href="/kids-build" className="bee-btn text-lg px-6 py-3 bg-yellow-100 border border-yellow-200 hover:bg-yellow-200">Kids Build</Link>
      </div>
    </div>
  );
}
