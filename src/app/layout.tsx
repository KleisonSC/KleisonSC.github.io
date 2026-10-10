import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";

// Body copy.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Headings / display.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

// Code, data and technical labels.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// Logo / wordmark.
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kleison Silva — Civil Engineer",
  description:
    "Civil engineer specialized in pavement mechanics, materials science and computational modeling.",
};

// The single <html>/<body> for the whole app. The [locale] layout keeps
// <html lang> in sync with the active locale on the client.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${orbitron.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
