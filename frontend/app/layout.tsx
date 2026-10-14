import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono-custom" });

export const metadata: Metadata = {
  metadataBase: new URL("https://kamrul-hasan-faysal.yummy-plum-3463.chatgpt.site"),
  title: "Kamrul Hasan Faysal — Software Engineer & Creative Developer",
  description: "Software engineering student building thoughtful web products at the intersection of code, interaction, and visual design.",
  openGraph: { title: "Kamrul Hasan Faysal — Software Engineer & Creative Developer", description: "Engineering digital experiences with structure and character.", type: "website" },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${display.variable} ${mono.variable}`}><body>{children}</body></html>;
}
