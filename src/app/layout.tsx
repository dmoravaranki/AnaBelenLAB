
import "./global.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="w-full flex justify-center gap-6 py-4 bg-white/80 border-b border-yellow-100 shadow-sm z-20 sticky top-0">
          <Link href="/bee-chat" className="font-bold text-yellow-700 hover:underline">QueenBee Chat</Link>
          <Link href="/bee-chat/kids-build" className="font-bold text-yellow-700 hover:underline">Kids Build</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
