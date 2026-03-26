
import "./global.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="min-h-screen" data-theme="aqua">
      <body>
        {/* Navbar moved to page.tsx for DaisyUI integration */}
        {children}
      </body>
    </html>
  );
}
