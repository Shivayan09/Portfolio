import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shivayan Chakravarty - Full-Stack Engineer",
  description:
    "Full-stack engineer building distributed systems, real-time services and AI pipelines in Node.js, TypeScript and Next.js. B.Tech student at Assam Engineering College, Guwahati.",
  openGraph: {
    title: "Shivayan Chakravarty - Full-Stack Engineer",
    description:
      "Full-stack engineer building distributed systems, real-time services and AI pipelines in Node.js, TypeScript and Next.js.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#060607",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
