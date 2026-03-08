"use client";

import BottomNav from "@/components/bottom-nav";
import { IconDownload, IconLocation, IconMusicNote } from "@/components/icons";
import { useEffect } from "react";

type CvPageClientProps = {
  cvDownloadUrl: string | null;
};

const cvSections = [
  {
    title: "Competitions",
    items: [
      { era: "2024", title: "Davison Young Musicians Foundation National Brass Competition", detail: "3rd prize" },
      { era: "2023", title: "International Trombone Association (Frank Smith Competition)", detail: "1st prize" },
      { era: "2022", title: "43rd Brass and Percussion Meeting and Competition", detail: "1st prize" },
      { era: "2022", title: "XIII. International Trombone Competition in Brno", detail: "3rd prize" },
      { era: "2021", title: "Hungarian National Trombone Competition (Hungarian Trombone Camp)", detail: "1st prize" },
      { era: "2021", title: "International Varaždin Woodwind & Brass Competition", detail: "1st prize and 2nd prize in the overall category (wind instruments)" },
      { era: "2020", title: "Online Trombone Competition, Trombone Category C", detail: "3rd prize" },
      { era: "2019", title: "XIII. International Trombone Competition in Brno", detail: "1st prize" },
      { era: "2018", title: "XIII. National Vocational High School Trombone and Tuba Competition", detail: "2nd prize" },
    ],
  },
  {
    title: "Auditions",
    items: [
      { era: "2025", title: "Óbudai Danubia Orchestra audition", detail: "Winner" },
      { era: "2024", title: "Alba Regia Symphony Orchestra audition", detail: "Winner" },
      { era: "2024", title: "Hungarian State Opera audition", detail: "Qualified" },
    ],
  },
  {
    title: "Solo performances",
    items: [
      { era: "2025", title: "Solo performance on the Hungarian Radio Symphony Orchestra's New Year's concert", detail: "Solo performance" },
      { era: "2025", title: "Concert of Accademia Ungheria Rome's 'I Giovedi in via Giulia' series", detail: "Solo performance" },
      { era: "2025", title: "Held a masterclass in Kunming as part of the China Orchestra Network Festival", detail: "Masterclass" },
      { era: "2025", title: "Held a masterclass in Poznan as part of the Tromboholizm Festival", detail: "Masterclass" },
      { era: "2024", title: "Talent Day concert accompanied by the Franz Liszt Chamber Orchestra", detail: "Solo performance" },
    ],
  },
];

export default function CvPageClient({ cvDownloadUrl }: CvPageClientProps) {
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

  const sectionsNewestFirst = cvSections.map((section) => ({
    ...section,
    items: [...section.items].sort((a, b) => Number.parseInt(b.era, 10) - Number.parseInt(a.era, 10)),
  }));

  return (
    <div className="flex min-h-screen flex-col bg-background-dark text-neutral-100">
      <header className="sticky top-0 z-50 border-b border-neutral-border bg-background-dark/80 backdrop-blur-md">
        <div className="flex h-16 w-full items-center justify-center px-6">
          <div className="flex items-center gap-2">
            <IconMusicNote className="size-5 text-primary" />
            <h1 className="font-display text-lg font-bold tracking-tight uppercase">CV</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 pb-24">
        <div className="w-full px-6 py-8">
          <section className="flex flex-col items-center p-2 pb-8 text-center" data-reveal>
            <div className="group relative">
              <div className="absolute -inset-1 rounded-full bg-primary/20 blur transition duration-1000 group-hover:duration-200" />
              <div className="relative rounded-full border-2 border-primary/20 bg-charcoal p-1">
                <img
                  src="/profile.jpeg"
                  alt="Portrait of a professional musician with a trombone"
                  className="h-32 w-32 rounded-full object-cover shadow-2xl"
                />
              </div>
            </div>

            <div className="mt-6 space-y-1">
              <h2 className="text-2xl font-bold tracking-tight" data-reveal style={{ ["--reveal-delay" as any]: "100ms" }}>András Dénes</h2>
              <p className="font-medium text-primary" data-reveal style={{ ["--reveal-delay" as any]: "170ms" }}>Professional Trombonist</p>
              <div className="flex items-center justify-center gap-1 text-sm text-neutral-300" data-reveal style={{ ["--reveal-delay" as any]: "240ms" }}>
                <IconLocation className="size-3" />
                <span>Budapest, Hungary</span>
              </div>
            </div>
          </section>

          <section className="mt-6 border-t border-neutral-border/80">
            {sectionsNewestFirst.map((section, index) => {
              const isMirrored = index % 2 === 1;
              const isLastSection = index === sectionsNewestFirst.length - 1;
              const shouldShowBottomDivider = !isLastSection || !!cvDownloadUrl;
              const heading = section.title.replace(/\.$/, "");
              const headingColClass = isMirrored
                ? "md:order-2 md:text-right"
                : "md:order-1 md:text-left";
              const listColClass = isMirrored ? "md:order-1" : "md:order-2";

              return (
                <div
                  key={section.title}
                  className={`relative grid gap-6 py-10 md:grid-cols-12 md:gap-8 ${
                    shouldShowBottomDivider ? "border-b border-neutral-border/70" : ""
                  }`}
                  data-reveal
                  style={{ ["--reveal-delay" as any]: `${80 + index * 80}ms` }}
                >
                  <h3
                    className={`pointer-events-none absolute top-11 z-0 hidden max-w-[92%] font-display text-6xl leading-[0.85] font-bold tracking-tight text-white/60 uppercase [overflow-wrap:anywhere] md:block lg:text-7xl ${
                      isMirrored ? "right-1 text-right" : "left-1 text-left"
                    }`}
                  >
                    {heading}
                  </h3>

                  <div className={`md:col-span-4 ${headingColClass}`}>
                    <h3 className="font-display text-4xl leading-[0.88] font-bold tracking-tight text-white uppercase [overflow-wrap:anywhere] md:hidden">
                      {heading}
                    </h3>
                  </div>

                  <div className={`relative md:col-span-8 ${listColClass}`}>
                    <div className="relative z-10 space-y-3 md:pt-10">
                      {section.items.map((item, itemIndex) => (
                        <div
                          key={`${section.title}-${item.era}-${item.title}`}
                          data-reveal
                          style={{ ["--reveal-delay" as any]: `${130 + index * 80 + itemIndex * 55}ms` }}
                        >
                          <article
                            className="interactive-surface group rounded-xl border border-neutral-border bg-neutral-dark/40 p-5 transition-all hover:border-primary/30 hover:bg-neutral-dark"
                            data-proximity
                          >
                            <div className="mb-2 flex items-center gap-3">
                              <span className="rounded-full bg-primary/10 px-2 py-1 text-[11px] font-semibold tracking-wider text-primary uppercase">
                                {item.era}
                              </span>
                            </div>
                            <h4 className="font-display text-lg font-semibold leading-tight">{item.title}</h4>
                            <p className="mt-2 text-sm text-neutral-300">{item.detail}</p>
                          </article>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          {cvDownloadUrl ? (
            <div className="pt-8" data-reveal style={{ ["--reveal-delay" as any]: "120ms" }}>
              <a
                href={cvDownloadUrl}
                className="interactive-surface group flex w-full items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-5 py-3 font-display font-semibold text-neutral-100 transition-all hover:border-primary/35 hover:bg-primary/10"
                data-proximity
                data-proximity-strength="2.1"
              >
                <IconDownload className="size-4 text-primary" />
                Download CV
              </a>
            </div>
          ) : null}
        </div>
      </main>

      <BottomNav active="cv" />
    </div>
  );
}
