import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://andrasdenes.com"),
  title: "Dénes András",
  description: "Trombonist portfolio and performances",
  icons: {
    icon: [
      { url: "/music-note.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/music-note.svg",
    apple: "/logo_tight.svg",
  },
  openGraph: {
    title: "Dénes András",
    description: "Trombonist portfolio and performances",
    url: "https://andrasdenes.com",
    siteName: "Dénes András",
    images: [
      {
        url: "/profile.jpeg",
        width: 1200,
        height: 1200,
        alt: "Dénes András - Trombonist",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dénes András",
    description: "Trombonist portfolio and performances",
    images: ["/profile.jpeg"],
  },
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
        <Analytics />
      </body>
    </html>
  );
}
