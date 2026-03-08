import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import ProximityEffects from "@/components/proximity-effects";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "András Dénes",
  description: "Trombonist portfolio and performances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head />
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <ProximityEffects />
        {children}
      </body>
    </html>
  );
}
