"use client";

import Image from "next/image";
import Link from "next/link";
import BottomNav from "@/components/bottom-nav";
import BrandMark from "@/components/brand-mark";
import LanguageSwitcher, { useSiteLanguage } from "@/components/language-switcher";
import {
  IconGroups,
} from "@/components/icons";
import { useEffect, useRef, useState } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function Home() {
  const currentYear = new Date().getFullYear();
  const heroRef = useRef<HTMLElement | null>(null);
  const [headerProgress, setHeaderProgress] = useState(0);
  const { language } = useSiteLanguage();

  const labels = language === "hu"
    ? {
        titleName: "Dénes András",
        subtitle: "Harsonaművész",
        orchestras: "Zenekarok",
        ensembles: "Együttesek",
        cv: "Életrajz",
        media: "Média",
        contact: "Kapcsolat",
        rolePrincipal: "Szólamvezető",
        roleSecond: "Második harsona",
        descArso: "Évadkoncertek és kortárs műsorok",
        descObudai: "Út a zenéhez",
        member: "Tag",
        foundingMember: "Alapító tag",
        brassBoulevardName: "Réz körút",
        footerTagline: "Harsonaművész portfólió • Budapest, Magyarország",
        bioParagraphs: [
          "Dénes András harsonaművész, Magyarországon született, jelenleg Budapesten él. A Liszt Ferenc Zeneművészeti Egyetem mesterképzésének hallgatója, ahol korábban harsonaművész alapképzését is elvégezte. Művészi profilját a zenekari előadóművészet, a kamarazene és a kortárs alkotói együttműködések egysége határozza meg, kiemelt fókuszban a nemzetközi szakmai integrációval és láthatósággal.",
          "Számos jelentős elismerésben részesült, többek között a Cziffra György Ifjú Tehetség Díjban, a MOL Tehetségtámogató Díjban, a Bank of China Ösztöndíjban és a Nemzeti Felsőoktatási Ösztöndíjban. Nemzetközi szakmai fejlődésének meghatározó állomása volt az International Trombone Association Festival (USA) Frank Smith versenyén elért sikere, amely mérföldkő volt abban, hogy szakmai jelenlétét Európán túl is megalapozza.",
          "Rendszeresen lép fel szólistaként és zenekari művészként Európában és Ázsiában, többek között a Magyar Rádió Szimfonikus Zenekarával, a Liszt Ferenc Kamarazenekarral, valamint római és kunmingi koncerthelyszíneken. 2025 decembere óta az Óbudai Danubia Zenekar második harsonása, emellett az Alba Regia Szimfonikus Zenekar szólamvezető harsonása, mindkét együttesnél sikeres próbajátékot követően.",
          "Aktív tagja több kamarazenei és projektalapú formációnak, köztük a SzegEd TRombone ENsemble-nek, a Réz körút rézfúvós szeptettnek és a Budapest Orchestra Project Bigbandnek. Kortárs zenei munkájában együttműködött Eötvös Péterrel, az UMZE Együttessel és kortárs zeneszerzőkkel; tevékenységéhez stúdiófelvételek és zeneszerző-központú koncertformátumok is kapcsolódnak. Hosszú távú művészi célja, hogy magas színvonalú előadóművészeti munkával, kortárs együttműködésekkel és tartós nemzetközi szakmai kapcsolatokkal járuljon hozzá a klasszikus zenei élet megújulásához.",
        ],
      }
    : {
        titleName: "András Dénes",
        subtitle: "Trombone",
        orchestras: "Orchestras",
        ensembles: "Ensembles",
        cv: "CV",
        media: "Media",
        contact: "Contact",
        rolePrincipal: "Principal Trombone",
        roleSecond: "Second Trombone",
        descArso: "Regular Season & Contemporary Programs",
        descObudai: "Way to Music",
        member: "Member",
        foundingMember: "Founding member",
        brassBoulevardName: "Brass Boulevard",
        footerTagline: "Trombonist Portfolio • Budapest, Hungary",
        bioParagraphs: [
          "András Dénes is a Hungarian trombonist, born in Hungary and currently based in Budapest. He is a Master's student at the Franz Liszt Academy of Music, where he previously completed his Bachelor's degree in trombone performance. His artistic profile combines orchestral performance, chamber music, and contemporary creation, with a strong focus on international professional integration and visibility.",
          "He is the recipient of several major awards, including the György Cziffra Young Talent Award, the MOL Young Talent Award, the Bank of China Scholarship, and the Hungarian National Higher Education Scholarship. A decisive milestone in his international development was his success at the Frank Smith Competition of the International Trombone Association Festival (USA), one of the most prominent global platforms for trombonists.",
          "Dénes performs regularly as a soloist and orchestral musician across Europe and Asia, including appearances with the Hungarian Radio Symphony Orchestra, the Franz Liszt Chamber Orchestra, and concerts in Rome and Kunming. Since December 2025, he has been a member of the Óbudai Danubia Orchestra, performing as second trombone, while simultaneously serving as principal trombonist of the Alba Regia Symphony Orchestra, following successful auditions for both ensembles.",
          "He is an active member of several chamber and project-based formations, including SzegEd TRombone ENsemble, Brass Boulevard brass septet, and Budapest Orchestra Project Bigband. His contemporary work includes collaborations with Péter Eötvös, UMZE Ensemble, and living composers, as well as studio recordings and composer-focused concert formats. His long-term artistic aim is to contribute to the renewal of classical music through high-level performance, contemporary collaboration, and sustained international professional exchange.",
        ],
      };

  useEffect(() => {
    const update = () => {
      const heroHeight = heroRef.current?.offsetHeight ?? Math.round(window.innerHeight * 0.8);
      const start = Math.max(24, heroHeight - 220);
      const end = Math.max(start + 1, heroHeight - 120);
      const progress = clamp((window.scrollY - start) / (end - start), 0, 1);
      setHeaderProgress(progress);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

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
      <header
        className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-neutral-border bg-background-dark/80 px-4 py-3 backdrop-blur-md"
        style={{
          opacity: headerProgress,
          transform: `translateY(${Math.round((1 - headerProgress) * -14)}px)`,
          pointerEvents: headerProgress > 0.08 ? "auto" : "none",
        }}
      >
        <div className="flex items-center gap-2">
          <BrandMark />
          <span className="font-display text-lg font-bold tracking-tight uppercase">
            {labels.titleName}
          </span>
        </div>
        <LanguageSwitcher light={headerProgress > 0.08} />
      </header>

      <main className="flex-1 pb-24">
        <section ref={heroRef} className="relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden md:aspect-[16/8]">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />
          <div className="absolute inset-0">
            <Image
              alt="Portrait of András Dénes"
              className="h-full w-full scale-[1.04] object-cover object-[49%_21%]"
              src="/profile.jpeg"
              fill
              priority
              sizes="100vw"
              style={{
                WebkitMaskImage:
                  "radial-gradient(130% 95% at 50% 38%, #000 62%, transparent 100%), linear-gradient(to bottom, #000 0%, #000 72%, transparent 100%)",
                maskImage:
                  "radial-gradient(130% 95% at 50% 38%, #000 62%, transparent 100%), linear-gradient(to bottom, #000 0%, #000 72%, transparent 100%)",
              }}
            />
          </div>
          <div className="relative z-20 px-6 pb-12" data-reveal>
            <h1
              className="relative font-display mb-2 text-4xl font-bold leading-none tracking-tighter text-white md:text-7xl"
              data-reveal
              style={{
                "--reveal-delay": "120ms",
                top: `${Math.round(headerProgress * -22)}px`,
                opacity: 1 - headerProgress * 0.35,
              }}
            >
              {labels.titleName}
            </h1>
            <div
              className="relative flex items-center gap-3"
              data-reveal
              style={{
                "--reveal-delay": "220ms",
                top: `${Math.round(headerProgress * -14)}px`,
                opacity: 1 - headerProgress * 0.75,
              }}
            >
              <div className="h-px w-12 bg-primary" />
              <p className="font-display text-sm font-semibold tracking-[0.2em] text-primary uppercase">
                {labels.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="mb-8" data-reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight">{labels.orchestras}</h2>
          </div>

          <div className="space-y-4">
            <div data-reveal style={{ "--reveal-delay": "100ms" }}>
              <a
                href={language === "en" ? "https://www.arso.hu/en" : "https://www.arso.hu"}
                target="_blank"
                rel="noreferrer"
                className="interactive-surface group block rounded-xl border border-neutral-border bg-neutral-dark/40 p-5 transition-all hover:border-primary/30 hover:bg-neutral-dark"
                data-proximity
                data-proximity-strength="2.1"
              >
                <p className="mb-1 text-xs font-bold tracking-widest text-primary uppercase">
                  {labels.rolePrincipal}
                </p>
                <h3 className="font-display mb-1 text-xl font-semibold">
                  Alba Regia Symphony Orchestra
                </h3>
                <p className="text-sm text-neutral-300">{labels.descArso}</p>
              </a>
            </div>

            <div data-reveal style={{ "--reveal-delay": "180ms" }}>
              <a
                href={language === "en" ? "https://utazenehez.hu/en/" : "https://utazenehez.hu"}
                target="_blank"
                rel="noreferrer"
                className="interactive-surface group block rounded-xl border border-neutral-border bg-neutral-dark/40 p-5 transition-all hover:border-primary/30 hover:bg-neutral-dark"
                data-proximity
                data-proximity-strength="2.1"
              >
                <p className="mb-1 text-xs font-bold tracking-widest text-primary uppercase">
                  {labels.roleSecond}
                </p>
                <h3 className="font-display mb-1 text-xl font-semibold">Óbudai Danubia Zenekar</h3>
                <p className="text-sm text-neutral-300">{labels.descObudai}</p>
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 py-12">
          <h2 className="font-display mb-8 text-2xl font-bold tracking-tight" data-reveal>{labels.ensembles}</h2>
          <div className="grid grid-cols-1 gap-4">
            <div data-reveal style={{ "--reveal-delay": "100ms" }}>
              <a
                href={language === "hu" ? "https://www.szegedtrombones.com/hu" : "https://www.szegedtrombones.com"}
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
                  <p className="text-sm italic text-neutral-300">{labels.member}</p>
                </div>
              </a>
            </div>

            <div data-reveal style={{ "--reveal-delay": "180ms" }}>
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
                  <h4 className="font-display font-bold">{labels.brassBoulevardName}</h4>
                  <p className="text-sm italic text-neutral-300">{labels.foundingMember}</p>
                </div>
              </a>
            </div>

            <div data-reveal style={{ "--reveal-delay": "260ms" }}>
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
                  <p className="text-sm italic text-neutral-300">{labels.member}</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 pt-6 pb-16" data-reveal>
          <div className="mt-0 grid gap-4 sm:grid-cols-3" data-reveal style={{ "--reveal-delay": "120ms" }}>
            <div data-reveal style={{ "--reveal-delay": "180ms" }}>
              <Link
                href="/cv"
                className="interactive-surface group flex w-full items-center justify-center gap-2 rounded-xl border border-primary/10 bg-primary/5 p-4 font-display font-bold text-neutral-100 transition-colors hover:bg-primary/10"
                data-proximity
              >
                {labels.cv}
              </Link>
            </div>
            <div data-reveal style={{ "--reveal-delay": "240ms" }}>
              <Link
                href="/media"
                className="interactive-surface group flex w-full items-center justify-center gap-2 rounded-xl border border-primary/10 bg-primary/5 p-4 font-display font-bold text-neutral-100 transition-colors hover:bg-primary/10"
                data-proximity
              >
                {labels.media}
              </Link>
            </div>
            <div data-reveal style={{ "--reveal-delay": "300ms" }}>
              <Link
                href="/contact"
                className="interactive-surface group flex w-full items-center justify-center gap-2 rounded-xl border border-primary/10 bg-primary/5 p-4 font-display font-bold text-neutral-100 transition-colors hover:bg-primary/10"
                data-proximity
              >
                {labels.contact}
              </Link>
            </div>
          </div>

          <div className="mt-16 flex w-full flex-col gap-6" data-reveal style={{ "--reveal-delay": "360ms" }}>
            {labels.bioParagraphs.map((paragraph, idx) => (
              <p
                key={`bio-${idx}`}
                className={`w-full text-justify text-base leading-relaxed italic text-neutral-300 md:w-[86%] md:text-lg md:leading-8 lg:w-[82%] ${idx % 2 === 0 ? "md:self-start md:text-left" : "md:self-end md:text-right"}`}
                data-reveal
                style={{ "--reveal-delay": `${380 + idx * 55}ms` }}
              >
                {paragraph}
              </p>
            ))}
          </div>

        </section>

      </main>

      <BottomNav active="home" />

      <footer className="bg-background-dark py-12 pb-32 text-center">
        <div className="mb-9 flex justify-center">
          <Image
            src="/logo_tight.svg"
            alt="Dénes András logo"
            width={180}
            height={53}
            className="h-[53px] w-auto opacity-90"
          />
        </div>
        <p className="mb-2 text-xs font-medium tracking-widest text-neutral-500 uppercase">
          © {currentYear} {labels.titleName}
        </p>
        <p className="text-[10px] text-neutral-600">{labels.footerTagline}</p>
      </footer>
    </div>
  );
}
