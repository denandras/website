"use client";

import Link from "next/link";
import BottomNav from "@/components/bottom-nav";
import {
  IconArrowForward,
  IconGroups,
  IconMusicNote,
} from "@/components/icons";
import { useEffect } from "react";

export default function Home() {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    const raf = window.requestAnimationFrame(() => {
      nodes.forEach((node) => observer.observe(node));
    });

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background-dark text-neutral-100">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-neutral-border bg-background-dark/80 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <IconMusicNote className="size-5 text-primary" />
          <span className="font-display text-lg font-bold tracking-tight uppercase">
            András Dénes
          </span>
        </div>
        <div className="w-6" />
      </header>

      <main className="flex-1 pb-24">
        <section className="relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden md:aspect-[16/8]">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />
          <div className="absolute inset-0">
            <img
              alt="Portrait of András Dénes"
              className="h-full w-full scale-[1.04] object-cover object-[49%_21%]"
              src="/profile.jpeg"
              style={{
                WebkitMaskImage:
                  "radial-gradient(130% 95% at 50% 38%, #000 62%, transparent 100%), linear-gradient(to bottom, #000 0%, #000 72%, transparent 100%)",
                maskImage:
                  "radial-gradient(130% 95% at 50% 38%, #000 62%, transparent 100%), linear-gradient(to bottom, #000 0%, #000 72%, transparent 100%)",
              }}
            />
          </div>
          <div className="relative z-20 px-6 pb-12" data-reveal>
            <h1 className="font-display mb-2 text-4xl font-bold leading-none tracking-tighter text-white md:text-7xl" data-reveal style={{ ["--reveal-delay" as any]: "120ms" }}>
              András Dénes
            </h1>
            <div className="flex items-center gap-3" data-reveal style={{ ["--reveal-delay" as any]: "220ms" }}>
              <div className="h-px w-12 bg-primary" />
              <p className="font-display text-sm font-semibold tracking-[0.2em] text-primary uppercase">
                Trombone
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="mb-8" data-reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight">Orchestras</h2>
          </div>

          <div className="space-y-4">
            <div data-reveal style={{ ["--reveal-delay" as any]: "100ms" }}>
              <a
                href="https://www.arso.hu/en"
                target="_blank"
                rel="noreferrer"
                className="interactive-surface group block rounded-xl border border-neutral-border bg-neutral-dark/40 p-5 transition-all hover:border-primary/30 hover:bg-neutral-dark"
                data-proximity
                data-proximity-strength="2.1"
              >
                <p className="mb-1 text-xs font-bold tracking-widest text-primary uppercase">
                  Principal Trombone
                </p>
                <h3 className="font-display mb-1 text-xl font-semibold">
                  Alba Regia Symphony Orchestra
                </h3>
                <p className="text-sm text-neutral-300">Regular Season &amp; Special Galas</p>
              </a>
            </div>

            <div data-reveal style={{ ["--reveal-delay" as any]: "180ms" }}>
              <a
                href="https://utazenehez.hu/en/"
                target="_blank"
                rel="noreferrer"
                className="interactive-surface group block rounded-xl border border-neutral-border bg-neutral-dark/40 p-5 transition-all hover:border-primary/30 hover:bg-neutral-dark"
                data-proximity
                data-proximity-strength="2.1"
              >
                <p className="mb-1 text-xs font-bold tracking-widest text-primary uppercase">
                  Second Trombone
                </p>
                <h3 className="font-display mb-1 text-xl font-semibold">Óbudai Danubia Zenekar</h3>
                <p className="text-sm text-neutral-300">Symphonic &amp; Contemporary Programs</p>
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 py-8">
          <h2 className="font-display mb-8 text-2xl font-bold tracking-tight" data-reveal>Ensembles</h2>
          <div className="grid grid-cols-1 gap-4">
            <div data-reveal style={{ ["--reveal-delay" as any]: "100ms" }}>
              <a
                href="https://szegedtrombones.com"
                target="_blank"
                rel="noreferrer"
                className="interactive-surface group flex items-center gap-4 rounded-xl border border-neutral-border bg-background-dark p-4 transition-colors hover:bg-primary/5"
                data-proximity
                data-proximity-strength="2.1"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-background-dark">
                  <IconGroups className="size-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold">Szeged Trombone Ensemble</h4>
                  <p className="text-sm italic text-neutral-300">Member</p>
                </div>
              </a>
            </div>

            <div data-reveal style={{ ["--reveal-delay" as any]: "180ms" }}>
              <a
                href="https://rezkorut.hu"
                target="_blank"
                rel="noreferrer"
                className="interactive-surface group flex items-center gap-4 rounded-xl border border-neutral-border bg-background-dark p-4 transition-colors hover:bg-primary/5"
                data-proximity
                data-proximity-strength="2.1"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-background-dark">
                  <IconGroups className="size-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold">Brass Boulevard</h4>
                  <p className="text-sm italic text-neutral-300">Founding member</p>
                </div>
              </a>
            </div>

            <div data-reveal style={{ ["--reveal-delay" as any]: "260ms" }}>
              <a
                href="https://budapestorchestraproject.com"
                target="_blank"
                rel="noreferrer"
                className="interactive-surface group flex items-center gap-4 rounded-xl border border-neutral-border bg-background-dark p-4 transition-colors hover:bg-primary/5"
                data-proximity
                data-proximity-strength="2.1"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-background-dark">
                  <IconGroups className="size-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold">Budapest Orchestra Project</h4>
                  <p className="text-sm italic text-neutral-300">Member</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 pb-16" data-reveal>
          <div className="mt-4 grid gap-3 sm:grid-cols-3" data-reveal style={{ ["--reveal-delay" as any]: "120ms" }}>
            <div data-reveal style={{ ["--reveal-delay" as any]: "180ms" }}>
              <Link
                href="/cv"
                className="interactive-surface group flex w-full items-center justify-center gap-2 rounded-xl border border-primary/10 bg-primary/5 p-4 font-display font-bold text-neutral-100 transition-colors hover:bg-primary/10"
                data-proximity
              >
                <IconArrowForward className="size-4 rotate-180 text-primary/80 transition-colors group-hover:text-primary" />
                CV
              </Link>
            </div>
            <div data-reveal style={{ ["--reveal-delay" as any]: "240ms" }}>
              <Link
                href="/media"
                className="interactive-surface group flex w-full items-center justify-center gap-2 rounded-xl border border-primary/10 bg-primary/5 p-4 font-display font-bold text-neutral-100 transition-colors hover:bg-primary/10"
                data-proximity
              >
                Media
              </Link>
            </div>
            <div data-reveal style={{ ["--reveal-delay" as any]: "300ms" }}>
              <Link
                href="/contact"
                className="interactive-surface group flex w-full items-center justify-center gap-2 rounded-xl border border-primary/10 bg-primary/5 p-4 font-display font-bold text-neutral-100 transition-colors hover:bg-primary/10"
                data-proximity
              >
                Contact
                <IconArrowForward className="size-4 text-primary/80 transition-colors group-hover:text-primary" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <BottomNav active="home" />

      <footer className="bg-background-dark py-12 pb-32 text-center">
        <p className="mb-2 text-xs font-medium tracking-widest text-neutral-500 uppercase">
          © {currentYear} András Dénes
        </p>
        <p className="text-[10px] text-neutral-600">Trombonist Portfolio • Budapest, Hungary</p>
      </footer>
    </div>
  );
}
