import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Staffing Tracker",
  description: "Internal staffing tracker prototype with mocked project data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="topbar">
            <div>
              <p className="eyebrow">Internal Staffing Tracker</p>
              <h1 className="brand">Delivery Resourcing</h1>
            </div>
            <nav className="topnav" aria-label="Primary">
              <Link href="/">My Projects</Link>
              <Link href="/admin">Admin</Link>
            </nav>
          </header>
          <main className="main-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
