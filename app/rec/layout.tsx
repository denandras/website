import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recording – András Dénes | Trombonist",
  description: "Professional recording sessions for musicians. András Dénes offers high-quality audio recording services for auditions, competitions, and portfolios.",
  openGraph: {
    title: "Recording – András Dénes | Trombonist",
    description: "Professional recording sessions for musicians.",
    url: "https://andrasdenes.com/rec",
  },
};

export default function RecLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}