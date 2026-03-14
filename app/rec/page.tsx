"use client";

import BottomNav from "@/components/bottom-nav";
import BrandMark from "@/components/brand-mark";
import FitText from "@/components/fit-text";
import LanguageSwitcher, { useSiteLanguage } from "@/components/language-switcher";
import { IconCamera, IconGroups, IconOpenInNew, IconSchedule } from "@/components/icons";
import { useEffect, useState } from "react";

type VideoItem = {
  title: string;
  youtubeId: string;
};

type GearRow = {
  name: string;
  detailHu: string;
  detailEn: string;
  href?: string;
};

const videosLeft: VideoItem[] = [
  { title: "Máté Szirtes plays Liszt Mephisto Waltz 1", youtubeId: "IRBojYisvl8" },
  { title: "Roland Szentpáli - Allegro Fuoco", youtubeId: "Us7s50k9q8A" },
  { title: "Ferdinand David - Concertino", youtubeId: "3S0VJmD-YrM" },
  { title: "Sancan - Sonatine", youtubeId: "IR7nyboLEww" },
];

const videosRight: VideoItem[] = [
  { title: "Kocsár - Mégis mondom Damion!", youtubeId: "MQaiWXv9rn4" },
  { title: "Promo mashup", youtubeId: "02HPAJBEJcc" },
  { title: "Alexander Lebedev: Concerto in one movement", youtubeId: "aatvt6EoXFI" },
  { title: "Szirtes Máté - Liszt h-moll szonáta", youtubeId: "RJrhGUVjEMo" },
  { title: "Schütz - Das Wort ward Fleisch", youtubeId: "i8ur8h0gxfg" },
];

const hardwareRows: GearRow[] = [
  { name: "Zoom F8n Pro", detailHu: "8 csatornás hangkártya", detailEn: "8-channel audio interface", href: "https://www.thomann.de/hu/zoom_f8n_pro.htm" },
  { name: "Line Audio CM4 × 4", detailHu: "hangszer mikrofon", detailEn: "instrument microphones", href: "https://www.lineaudio.se/CM4.html" },
  { name: "Line Audio Omni1 × 2", detailHu: "kiegészítő mikrofon", detailEn: "additional microphones", href: "https://www.lineaudio.se/Omni1.html" },
  { name: "AKG P170 × 3", detailHu: "hangszer mikrofon", detailEn: "instrument microphones", href: "https://www.akg.com/microphones/condenser-microphones/P170.html" },
  { name: "AKG P420", detailHu: "hangszer mikrofon", detailEn: "instrument microphone", href: "https://www.hangszeraruhaz.hu/akg-p420-studio-mikrofon/P52341" },
  { name: "Zoom Q8n-4k", detailHu: "tér hang, center", detailEn: "room audio, center" },
  { name: "Focusrite Scarlett 2i2 Gen 3", detailHu: "audió interfész", detailEn: "audio interface", href: "https://focusrite.com/products/scarlett-2i2-3rd-gen" },
  { name: "iFi audio GO link Max (USB-C DAC)", detailHu: "USB-C DAC", detailEn: "USB-C DAC", href: "https://ifi-audio.com/products/go-link-max/" },
  { name: "MSI Gaming Thin GF63 12UC", detailHu: "laptop", detailEn: "laptop", href: "https://www.msi.com/Laptop/Thin-GF63-12UX/Specification" },
  { name: "Beyerdynamic DT990 Pro", detailHu: "fejhallgató", detailEn: "headphones", href: "https://www.thomann.de/hu/beyerdynamic_dt990pro.htm" },
  { name: "Beyerdynamic DT700 Pro X", detailHu: "fejhallgató", detailEn: "headphones", href: "https://www.thomann.de/hu/beyerdynamic_dt_700_pro_x.htm" },
  { name: "Yamaha HS5 × 2", detailHu: "stúdió monitor", detailEn: "studio monitors", href: "https://hangszerplaza.hu/yamaha-hs5-aktiv-ketutas-studio-monitor-hangfal/" },
  { name: "Fujifilm X100V", detailHu: "fényképezőgép", detailEn: "camera", href: "https://fujifilm-x.com/global/products/cameras/x100v/" },
  { name: "iPhone 15 Pro", detailHu: "HD 60 fps (ProRes log)", detailEn: "HD 60 fps (ProRes log)" },
  { name: "Xiaomi Note 13 Pro", detailHu: "4K 30 fps", detailEn: "4K 30 fps" },
  { name: "Xiaomi Note 10 Pro", detailHu: "4K 30 fps", detailEn: "4K 30 fps" },
];

const accessoryRows: GearRow[] = [
  { name: "Hama Star 63", detailHu: "tripod kamerának", detailEn: "camera tripod", href: "https://hama.hu/termekek/55-foto-video/62-allvany/a77-star-63-foto-video-allvany-taskaval" },
  { name: "Hama Star 700", detailHu: "tripod kamerának", detailEn: "camera tripod", href: "https://hama.hu/termekek/55-foto-video/62-allvany/a463-star-700-ef-digital-foto-video-allvany" },
  { name: "Kaline MS101 × 2", detailHu: "tripod telefontartóval", detailEn: "tripod with phone holder", href: "https://www.hangszerdiszkont.hu/microphone/microphone-stands-and-accessories/kaline-ms101-gemes-mikrofonallvany-telefontartoval" },
  { name: "Millenium MS 2003", detailHu: "tripod", detailEn: "tripod", href: "https://www.thomann.de/hu/millenium_ms2003.htm" },
  { name: "Alpha 2200", detailHu: "tripod kamerának", detailEn: "camera tripod" },
  { name: "Roli XLR kábelek × 8", detailHu: "15 m", detailEn: "15 m", href: "https://www.thomann.de/hu/search_dir.html?sw=roli%2015m%20xlr" },
];

const softwareRows: GearRow[] = [
  { name: "Reaper", detailHu: "recording-mastering", detailEn: "recording-mastering", href: "https://www.reaper.fm/" },
  { name: "DaVinci Resolve", detailHu: "videóvágás és grading", detailEn: "video editing and grading", href: "https://www.blackmagicdesign.com/products/davinciresolve" },
  { name: "LX480 Essentials", detailHu: "reverb", detailEn: "reverb", href: "https://relabdevelopment.com/lx480-essentials/" },
  { name: "Voicemeeter Potato", detailHu: "virtuális mixer", detailEn: "virtual mixer", href: "https://voicemeeter.com" },
];

function GearTable({ rows, language }: { rows: GearRow[]; language: "hu" | "en" }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-border bg-neutral-dark/40">
      <table className="w-full border-collapse text-left text-sm">
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.name}-${row.detailHu}`} className="border-b border-neutral-border/70 last:border-b-0">
              <td className="px-4 py-3 font-medium text-white">
                {row.href ? (
                  <a href={row.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white transition-colors hover:text-primary">
                    <span>{row.name}</span>
                    <IconOpenInNew className="size-3.5 text-neutral-400" />
                  </a>
                ) : row.name}
              </td>
              <td className="px-4 py-3 text-neutral-300">{language === "hu" ? row.detailHu : row.detailEn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function VideoCard({ item }: { item: VideoItem }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-border bg-neutral-dark/40">
      <div className="aspect-video w-full">
        <iframe
          title={item.title}
          src={`https://www.youtube.com/embed/${item.youtubeId}`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default function RecPage() {
  const { language } = useSiteLanguage();
  const [activePanel, setActivePanel] = useState<"videos" | "booking" | "gear">("videos");

  const labels = language === "hu"
    ? {
        header: "Felvétel",
        title: "Felvételkészítés",
        intro1: "Mikor a Zeneakadémiára kerültem, kezdett el érdekelni ez az oldala a zenének: hogyan lehet a valósághoz leginkább hű, mégsem unalmas módon rögzíteni azt, amit szeretnénk? Mitől lesz megnyerő egy felvétel a többi beérkező versenyzőhöz képest?",
        intro2: "Az évek során technikai tudásomat saját és külső tapasztalatok alapján bővítettem. Több mint 80 felvételt készítettem főként zeneakadémisták számára; az alábbi példák és az eszközlista ezt a munkát mutatják be.",
        videos: "Válogatott felvételek",
        gearTitle: "Eszközök",
        hardware: "Hardware",
        accessories: "Egyéb kellékek",
        software: "Software",
        cta: "Szükséged van egy felvételre?",
        pricing: "Ha megtetszett a munkám, és te is hasonló minőségre vágysz, foglalj időpontot felvételkészítésre. Óradíjam 12.000 Ft, amelyet az érkezéstől a távozásig számolok; az utómunkáért nem kérek külön díjat. A kész anyagokat megbeszélés szerint, de legkésőbb egy héten belül küldöm, módosítás kérhető.",
        calendarTitle: "Időpontfoglalás",
        calendarNote: "A naptár közvetlenül ezen az oldalon tölthető ki.",
      }
    : {
        header: "Recording",
        title: "Recording Sessions",
        intro1: "When I enrolled at the Liszt Academy, I became increasingly interested in this side of music: how to capture a performance as truthfully as possible without making it feel flat or dull. What makes one recording stand out from the many others submitted for the same opportunity?",
        intro2: "Over the years I expanded my technical practice through both personal and external experience. I have created more than 50 recordings, mainly for students of the Academy, and the examples and equipment list below reflect that work.",
        videos: "Selected Recordings",
        gearTitle: "Equipment",
        hardware: "Hardware",
        accessories: "Accessories",
        software: "Software",
        cta: "Need a recording?",
        pricing: "If you like this work and want a similar result, you can book a recording session. My rate is 12,000 HUF per hour, counted from arrival to departure, and I do not charge extra for post-production. Final materials are delivered as agreed, but no later than within one week, with revisions available.",
        calendarTitle: "Booking",
        calendarNote: "The booking calendar is embedded directly on this page.",
      };

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
  }, [activePanel, language]);

  return (
    <div className="flex min-h-screen flex-col bg-background-dark text-neutral-100">
      <header className="sticky top-0 z-50 border-b border-neutral-border bg-background-dark/80 backdrop-blur-md">
        <div className="relative flex h-16 w-full items-center justify-center px-6">
          <div className="flex items-center gap-2">
            <BrandMark />
            <h1 className="font-display text-lg font-bold tracking-tight uppercase">REC</h1>
          </div>
          <div className="absolute top-1/2 right-6 -translate-y-1/2">
            <LanguageSwitcher light />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-8 pb-24">
        <section className="relative pt-10 pb-6" data-reveal>
          <FitText
            as="h2"
            minFontPx={26}
            maxFontPx={84}
            className="pointer-events-none absolute top-10 left-1 z-0 w-[92%] max-w-[92%] font-display leading-[0.85] font-bold tracking-tight text-white uppercase"
          >
            {labels.title}
          </FitText>

          <div className="relative z-10 mt-20 grid gap-8 md:mt-24 md:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] md:items-stretch">
            <div className="space-y-4 rounded-2xl border border-neutral-border bg-neutral-dark/40 p-6" data-reveal style={{ ["--reveal-delay" as const]: "120ms" }}>
              <p className="text-sm leading-7 text-neutral-300 md:text-base">{labels.intro1}</p>
              <p className="text-sm leading-7 text-neutral-300 md:text-base">{labels.intro2}</p>
            </div>

            <div className="flex flex-col gap-3 md:h-full" data-reveal style={{ ["--reveal-delay" as const]: "180ms" }}>
              <button
                type="button"
                onClick={() => setActivePanel("videos")}
                className={`interactive-surface rounded-xl border px-4 py-3 text-left transition-colors ${
                  activePanel === "videos"
                    ? "border-primary/40 bg-primary/15"
                    : "border-neutral-border bg-neutral-dark/40 hover:border-primary/25 hover:bg-neutral-dark"
                } cursor-pointer md:flex-1`}
                data-proximity
                data-proximity-strength="2.1"
              >
                <span className="inline-flex w-full items-center gap-2">
                  <IconCamera className="size-4 text-primary" />
                  <FitText as="span" minFontPx={13} maxFontPx={20} className="block min-w-0 flex-1 font-display font-bold tracking-tight text-white">
                    {labels.videos}
                  </FitText>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActivePanel("gear")}
                className={`interactive-surface rounded-xl border px-4 py-3 text-left transition-colors ${
                  activePanel === "gear"
                    ? "border-primary/40 bg-primary/15"
                    : "border-neutral-border bg-neutral-dark/40 hover:border-primary/25 hover:bg-neutral-dark"
                } cursor-pointer md:flex-1`}
                data-proximity
                data-proximity-strength="2.1"
              >
                <span className="inline-flex w-full items-center gap-2">
                  <IconGroups className="size-4 text-primary" />
                  <FitText as="span" minFontPx={13} maxFontPx={20} className="block min-w-0 flex-1 font-display font-bold tracking-tight text-white">
                    {labels.gearTitle}
                  </FitText>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActivePanel("booking")}
                className={`interactive-surface rounded-xl border px-4 py-3 text-left transition-colors ${
                  activePanel === "booking"
                    ? "border-primary/40 bg-primary/15"
                    : "border-neutral-border bg-neutral-dark/40 hover:border-primary/25 hover:bg-neutral-dark"
                } cursor-pointer md:flex-1`}
                data-proximity
                data-proximity-strength="2.1"
              >
                <span className="inline-flex w-full items-center gap-2">
                  <IconSchedule className="size-4 text-primary" />
                  <FitText as="span" minFontPx={13} maxFontPx={20} className="block min-w-0 flex-1 font-display font-bold tracking-tight text-white">
                    {labels.calendarTitle}
                  </FitText>
                </span>
              </button>
            </div>
          </div>
        </section>

        <section className="pt-3 pb-10">
          <div className="overflow-hidden rounded-2xl border border-neutral-border bg-neutral-dark/40 p-5 md:p-6" data-reveal style={{ ["--reveal-delay" as const]: "120ms" }}>
            {activePanel === "videos" ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  {videosLeft.map((item, index) => (
                    <div key={item.youtubeId} data-reveal style={{ ["--reveal-delay" as const]: `${100 + index * 60}ms` }}>
                      <VideoCard item={item} />
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {videosRight.map((item, index) => (
                    <div key={item.youtubeId} data-reveal style={{ ["--reveal-delay" as const]: `${140 + index * 60}ms` }}>
                      <VideoCard item={item} />
                    </div>
                  ))}
                </div>
              </div>
            ) : activePanel === "gear" ? (
              <div className="grid gap-6 lg:grid-cols-3">
                <div data-reveal>
                  <p className="mb-4 font-display text-2xl font-bold tracking-tight text-primary">{labels.hardware}</p>
                  <GearTable rows={hardwareRows} language={language} />
                </div>

                <div data-reveal style={{ ["--reveal-delay" as const]: "100ms" }}>
                  <p className="mb-4 font-display text-2xl font-bold tracking-tight text-primary">{labels.accessories}</p>
                  <GearTable rows={accessoryRows} language={language} />
                </div>

                <div data-reveal style={{ ["--reveal-delay" as const]: "180ms" }}>
                  <p className="mb-4 font-display text-2xl font-bold tracking-tight text-primary">{labels.software}</p>
                  <GearTable rows={softwareRows} language={language} />
                </div>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
                <div className="space-y-4">
                  <p className="font-display text-3xl font-bold tracking-tight text-white">{labels.cta}</p>
                  <p className="text-sm leading-7 text-neutral-300 md:text-base">{labels.pricing}</p>
                  <div className="interactive-surface rounded-2xl border border-primary/20 bg-primary/5 p-5" data-proximity>
                    <div className="mb-3 flex items-center gap-3 text-primary">
                      <IconSchedule className="size-5" />
                      <p className="text-xs font-bold tracking-[0.24em] uppercase">{labels.calendarTitle}</p>
                    </div>
                    <p className="text-sm text-neutral-300">{labels.calendarNote}</p>
                  </div>
                </div>

                <div>
                  <div className="overflow-hidden rounded-2xl border border-neutral-border bg-background-dark/35">
                    <iframe
                      src="https://app.cal.eu/denandras/rec?embed=true&theme=dark&lang=en"
                      title="Idopontfoglalas"
                      className="min-h-[720px] w-full border-0"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <BottomNav active="none" />
    </div>
  );
}