import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import { GameProvider } from "@/context/GameContext";
import { GameShell } from "@/components/GameShell";
import "./globals.css";

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Rishit Luthra | AI Engineer Portfolio",
  description:
    "Explore the interactive career world of Rishit Luthra — AI Engineer, Researcher, and Enterprise Technologist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <GameProvider>
          <GameShell>{children}</GameShell>
        </GameProvider>
      </body>
    </html>
  );
}
