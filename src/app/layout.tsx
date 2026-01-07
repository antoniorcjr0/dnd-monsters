import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Monsters of Dungeons & Dragons",
    template: "%s | Monsters of Dungeons & Dragons",
  },
  description: "Explore every creature from D&D 5e, from common foes to legendary threats.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-text-primary`}
      >
        <div className="min-h-screen bg-gradient-to-b from-background via-surface/60 to-background">
          <header className="border-b border-border/60 bg-surface/80 backdrop-blur-sm">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <div className="flex flex-col leading-tight">
                <span className="text-sm uppercase tracking-wider text-text-muted">
                  D&D 5E
                </span>
                <span className="text-xl font-semibold text-text-primary">
                  Monsters of Dungeons & Dragons
                </span>
                <span className="text-sm text-text-secondary">
                  Explore every creature from D&D 5e, from common foes to legendary threats.
                </span>
              </div>
            </div>
          </header>
          <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
