"use client";

import BottomNav from "@/components/bottom-nav";
import BrandMark from "@/components/brand-mark";
import LanguageSwitcher, { useSiteLanguage } from "@/components/language-switcher";
import MediaGallery from "@/components/media-gallery";
import {
  IconMail,
  IconOpenInNew,
  IconPhone,
  IconCamera,
} from "@/components/icons";
import type { SiteLanguage } from "@/lib/site-language";
import { useEffect } from "react";

type MediaItem = {
  id: string;
  viewUrl: string;
  downloadUrl: string;
};

type ArtPageClientProps = {
  initialLanguage: SiteLanguage;
  items: MediaItem[];
  hasConfig: boolean;
  missingConfigLabel: string;
  noMediaLabel: string;
};

export default function ArtPageClient({
  initialLanguage,
  items,
  hasConfig,
  missingConfigLabel,
  noMediaLabel,
}: ArtPageClientProps) {
  const { language } = useSiteLanguage(initialLanguage);

  const labels = language === "hu"
    ? {
        header: "Képzőművészet",
        title: "Képzőművészet",
        contacts: "Elérhetőségek",
        form: "Kapcsolat",
        email: "E-mail",
        phone: "Telefon",
        instagram: "Instagram",
        name: "Név",
        emailAddress: "E-mail-cím",
        message: "Üzenet",
        placeholderName: "Az Ön neve",
        placeholderEmail: "Az Ön e-mail-címe",
        placeholderMessage: "Miben segíthetek?",
        send: "Üzenet küldése",
        subject: "Új megkeresés az andrasdenes.com oldalról",
        intro1: "A művészet mindig is szerves részét képezte az életemnek. A zene mellett a vizuális művészetek is meghatározó szerepet játszanak alkotói utamon. Fotóimban a városi tájak, az utcai jelenetek és a fények játéka ragadnak meg – gyakran egy pillanatnyi benyomás, egy hangulat megörökítése.",
        intro2: "Ez a galéria a legutóbbi vizuális munkáimat mutatja be, ahol a zenei érzékenység találkozik a vizuális kifejezésmóddal. Minden kép egy történet, egy érzés, egy megosztott pillanat.",
      }
    : {
        header: "Visual Art",
        title: "Visual Art",
        contacts: "Contacts",
        form: "Form",
        email: "Email",
        phone: "Phone",
        instagram: "Instagram",
        name: "Name",
        emailAddress: "Email Address",
        message: "Message",
        placeholderName: "Your name",
        placeholderEmail: "Your email",
        placeholderMessage: "How can I help you?",
        send: "Send Message",
        subject: "New inquiry from andrasdenes.com",
        intro1: "Art has always been an integral part of my life. Beyond music, visual arts play a defining role in my creative journey. My photographs capture urban landscapes, street scenes, and the interplay of light – often freezing a fleeting impression, a mood, a moment.",
        intro2: "This gallery presents my recent visual work, where musical sensibility meets visual expression. Each image is a story, an emotion, a shared moment.",
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
  }, [language]);

  return (
    <div className="flex min-h-screen flex-col bg-background-dark text-neutral-100">
      <header className="sticky top-0 z-50 border-b border-neutral-border bg-background-dark/80 backdrop-blur-md">
        <div className="relative flex h-16 w-full items-center justify-center px-6">
          <div className="flex items-center gap-2">
            <BrandMark />
            <h1 className="font-display text-lg font-bold tracking-tight uppercase">{labels.header}</h1>
          </div>
          <div className="absolute top-1/2 right-6 -translate-y-1/2">
            <LanguageSwitcher initialLanguage={initialLanguage} light />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-8 pb-24">
        <section className="relative pt-10">
          <h2 className="pointer-events-none absolute top-10 left-1 z-0 max-w-[92%] font-display text-5xl leading-[0.85] font-bold tracking-tight text-white uppercase md:text-6xl lg:text-7xl">
            {labels.title}
          </h2>

          <div className="relative z-10 mt-20 md:mt-24" data-reveal>
            <div className="space-y-4 text-neutral-200 leading-relaxed">
              <p>{labels.intro1}</p>
              <p>{labels.intro2}</p>
            </div>
          </div>

          {!hasConfig ? (
            <div className="relative z-10 mt-10 rounded-xl border border-neutral-border bg-neutral-dark/40 p-5 text-sm text-neutral-300">
              {missingConfigLabel}
            </div>
          ) : items.length === 0 ? (
            <div className="relative z-10 mt-10 rounded-xl border border-neutral-border bg-neutral-dark/40 p-5 text-sm text-neutral-300">
              {noMediaLabel}
            </div>
          ) : (
            <div className="mt-10">
              <MediaGallery items={items} showDownload={false} />
            </div>
          )}
        </section>

        <section className="mt-16">
          <div className="relative grid gap-6 border-b border-neutral-border/70 py-10 md:grid-cols-12 md:gap-8" data-reveal>
            <h3 className="pointer-events-none absolute top-11 left-1 z-0 hidden max-w-[92%] font-display text-6xl leading-[0.85] font-bold tracking-tight text-white/60 uppercase md:block lg:text-7xl">
              {labels.contacts}
            </h3>

            <div className="md:col-span-4 md:order-1 md:text-left">
              <h3 className="font-display text-4xl leading-[0.88] font-bold tracking-tight text-white uppercase md:hidden">
                {labels.contacts}
              </h3>
            </div>

            <div className="relative md:col-span-8 md:order-2">
              <div className="relative z-10 space-y-3 md:pt-10">
                <div data-reveal style={{ "--reveal-delay": "120ms" }}>
                  <a
                    href="mailto:contact@andrasdenes.com"
                    className="interactive-surface group flex items-center justify-between rounded-xl border border-neutral-border bg-neutral-dark/40 p-5 transition-all hover:border-primary/30 hover:bg-neutral-dark"
                    data-proximity
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex size-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                        <IconMail className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold tracking-widest text-primary uppercase">{labels.email}</p>
                        <p className="font-display font-semibold">contact@andrasdenes.com</p>
                      </div>
                    </div>
                    <IconOpenInNew className="size-5 text-neutral-300 transition-colors group-hover:text-primary" />
                  </a>
                </div>

                <div data-reveal style={{ "--reveal-delay": "180ms" }}>
                  <a
                    href="tel:+36302328848"
                    className="interactive-surface group flex items-center justify-between rounded-xl border border-neutral-border bg-neutral-dark/40 p-5 transition-all hover:border-primary/30 hover:bg-neutral-dark"
                    data-proximity
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex size-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                        <IconPhone className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold tracking-widest text-primary uppercase">{labels.phone}</p>
                        <p className="font-display font-semibold">+36 30 232 8848</p>
                      </div>
                    </div>
                    <IconOpenInNew className="size-5 text-neutral-300 transition-colors group-hover:text-primary" />
                  </a>
                </div>

                <div data-reveal style={{ "--reveal-delay": "240ms" }}>
                  <a
                    href="https://instagram.com/abstract.sketcher"
                    target="_blank"
                    rel="noreferrer"
                    className="interactive-surface group flex items-center justify-between rounded-xl border border-neutral-border bg-neutral-dark/40 p-5 transition-all hover:border-primary/30 hover:bg-neutral-dark"
                    data-proximity
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex size-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                        <IconCamera className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold tracking-widest text-primary uppercase">{labels.instagram}</p>
                        <p className="font-display font-semibold">@abstract.sketcher</p>
                      </div>
                    </div>
                    <IconOpenInNew className="size-5 text-neutral-300 transition-colors group-hover:text-primary" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="relative grid gap-6 border-b border-neutral-border/70 py-10 md:grid-cols-12 md:gap-8" data-reveal>
            <h3 className="pointer-events-none absolute top-11 right-1 z-0 hidden max-w-[92%] font-display text-6xl leading-[0.85] font-bold tracking-tight text-white/60 uppercase md:block lg:text-7xl">
              {labels.form}
            </h3>

            <div className="md:col-span-4 md:order-2 md:text-right">
              <h3 className="font-display text-4xl leading-[0.88] font-bold tracking-tight text-white uppercase md:hidden">
                {labels.form}
              </h3>
            </div>

            <div className="relative md:col-span-8 md:order-1">
              <div className="relative z-10 space-y-3 md:pt-10">
                <div data-reveal style={{ "--reveal-delay": "120ms" }}>
                  <section className="rounded-2xl border border-neutral-border bg-neutral-dark/40 p-6">
                    <form action="https://formsubmit.co/contact@andrasdenes.com" method="POST" className="space-y-4" noValidate>
                      <input type="hidden" name="_subject" value={labels.subject} />
                      <input type="hidden" name="_template" value="table" />
                      <input type="hidden" name="_captcha" value="false" />
                      <input type="hidden" name="_next" value="https://andrasdenes.com/art?sent=1" />
                      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-neutral-300" htmlFor="art-contact-name">{labels.name}</label>
                          <input
                            id="art-contact-name"
                            name="name"
                            type="text"
                            placeholder={labels.placeholderName}
                            required
                            title=""
                            className="w-full rounded-lg border border-primary/20 bg-background-dark px-4 py-3 text-neutral-100 placeholder:text-neutral-500 transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-neutral-300" htmlFor="art-contact-email">{labels.emailAddress}</label>
                          <input
                            id="art-contact-email"
                            name="email"
                            type="email"
                            placeholder={labels.placeholderEmail}
                            required
                            title=""
                            className="w-full rounded-lg border border-primary/20 bg-background-dark px-4 py-3 text-neutral-100 placeholder:text-neutral-500 transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300" htmlFor="art-contact-message">{labels.message}</label>
                        <textarea
                          id="art-contact-message"
                          name="message"
                          rows={4}
                          placeholder={labels.placeholderMessage}
                          required
                          title=""
                          className="w-full resize-none rounded-lg border border-primary/20 bg-background-dark px-4 py-3 text-neutral-100 placeholder:text-neutral-500 transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="interactive-surface w-full cursor-pointer rounded-xl border border-primary/10 bg-primary/5 py-4 font-display font-bold text-neutral-100 transition-colors hover:bg-primary/10"
                        data-proximity
                      >
                        {labels.send}
                      </button>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BottomNav active="none" />
    </div>
  );
}
