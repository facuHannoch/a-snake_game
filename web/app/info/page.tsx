import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Snake Game - How to Play & Game Info",
  description: "Learn how to play the classic Snake arcade game. Master the controls, understand the rules, and discover tips to achieve your highest score.",
  openGraph: {
    title: "About Snake Game - How to Play & Game Info",
    description: "Learn how to play the classic Snake arcade game. Master the controls, understand the rules, and discover tips to achieve your highest score.",
    type: "website",
    locale: "en_US",
    siteName: "Snake Game",
    url: "https://snakegame.pages.dev/info",
  },
  twitter: {
    card: "summary",
    title: "About Snake Game - How to Play",
    description: "Learn how to play the classic Snake arcade game. Master the controls and discover tips to achieve your highest score.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white font-sans">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Back to Game Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors mb-8"
        >
          <span className="text-xl">←</span>
          <span>Back to Game</span>
        </Link>

        <h1 className="text-4xl font-bold mb-8">Snake Game</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">How to Play</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Control your snake using the keyboard and guide it to eat the food. 
            Each time the snake eats, it grows longer and your score increases. 
            The game ends when the snake hits a wall or collides with itself.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Controls</h2>
          <div className="bg-zinc-800 rounded-lg p-6">
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-center gap-3">
                <span className="bg-zinc-700 px-3 py-1 rounded font-mono text-sm">↑ ↓ ← →</span>
                <span>Arrow keys to move</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-zinc-700 px-3 py-1 rounded font-mono text-sm">W A S D</span>
                <span>Alternative movement keys</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-zinc-700 px-3 py-1 rounded font-mono text-sm">Space</span>
                <span>Start or restart the game</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Game Rules</h2>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li>The snake moves continuously in the current direction</li>
            <li>Eat the red food to grow longer and earn points</li>
            <li>Avoid hitting the walls of the 15×15 grid</li>
            <li>Don&apos;t run into your own tail</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Tips</h2>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li>Plan your moves ahead to avoid trapping yourself</li>
            <li>Use the edges strategically but carefully</li>
            <li>The longer you survive, the harder it gets!</li>
          </ul>
        </section>

        <section className="border-t border-zinc-700 pt-8">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">About</h2>
          <p className="text-zinc-300 leading-relaxed">
            This is a modern recreation of the classic Snake arcade game. 
            Built with Next.js and designed for a smooth, responsive gaming experience.
            Play directly in your browser with no downloads required.
          </p>
        </section>

        {/* Play Button */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors text-lg"
          >
            Play Now
          </Link>
        </div>
      </div>
    </div>
  );
}
