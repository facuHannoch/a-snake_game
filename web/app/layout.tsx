import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://snakegame.pages.dev"),
  title: "Snake Game",
  description: "Play the classic Snake game online for free. Control your snake with arrow keys or WASD, eat food to grow, and try to beat your high score in this addictive arcade game.",
  openGraph: {
    title: "Snake Game - Classic Arcade Game Online",
    description: "Play the classic Snake game online for free. Control your snake with arrow keys or WASD, eat food to grow, and try to beat your high score.",
    type: "website",
    locale: "en_US",
    siteName: "Snake Game",
    url: "https://snakegame.pages.dev",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Snake Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Snake Game - Classic Arcade Game Online",
    description: "Play the classic Snake game online for free. Control your snake with arrow keys or WASD, eat food to grow, and try to beat your high score.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="81fda5e1-124e-4884-a4a5-0c705ed0a0aa"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
