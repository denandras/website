"use client";

import BottomNav from "@/components/bottom-nav";
import LanguageSwitcher, { useSiteLanguage } from "@/components/language-switcher";
import {
  IconCamera,
  IconMail,
  IconMusicNote,
  IconOpenInNew,
  IconPhone,
} from "@/components/icons";
import { useEffect } from "react";

export default function ContactPage() {
  const { language } = useSiteLanguage();

  const labels = language === "hu"
    ? {
        header: "Kapcsolat",
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
      }
    : {
        header: "Get in Touch",
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
        subject: "New booking inquiry from andrasdenes.com",
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
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background-dark text-neutral-100">
      <header className="sticky top-0 z-50 border-b border-neutral-border bg-background-dark/80 backdrop-blur-md">
        <div className="relative flex h-16 w-full items-center justify-center px-6">
          <div className="flex items-center gap-2">
            <IconMusicNote className="size-5 text-primary" />
            <h1 className="font-display text-lg font-bold tracking-tight uppercase">{labels.header}</h1>
          </div>
          <div className="absolute top-1/2 right-6 -translate-y-1/2">
            <LanguageSwitcher light />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-8 pb-24">
        <section className="mt-6">
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
                <div data-reveal style={{ ["--reveal-delay" as any]: "120ms" }}>
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

                <div data-reveal style={{ ["--reveal-delay" as any]: "180ms" }}>
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

                <div data-reveal style={{ ["--reveal-delay" as any]: "240ms" }}>
                  <a
                    href="https://instagram.com/andras.trombone"
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
                        <p className="font-display font-semibold">@andras.trombone</p>
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
                <div data-reveal style={{ ["--reveal-delay" as any]: "120ms" }}>
                  <section className="rounded-2xl border border-neutral-border bg-neutral-dark/40 p-6">
                    <form action="https://formsubmit.co/contact@andrasdenes.com" method="POST" className="space-y-4" noValidate>
                      <input type="hidden" name="_subject" value={labels.subject} />
                      <input type="hidden" name="_template" value="table" />
                      <input type="hidden" name="_captcha" value="false" />
                      <input type="hidden" name="_next" value="https://andrasdenes.com/contact?sent=1" />
                      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-neutral-300" htmlFor="contact-name">{labels.name}</label>
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            placeholder={labels.placeholderName}
                            required
                            title=""
                            className="w-full rounded-lg border border-primary/20 bg-background-dark px-4 py-3 text-neutral-100 placeholder:text-neutral-500 transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-neutral-300" htmlFor="contact-email">{labels.emailAddress}</label>
                          <input
                            id="contact-email"
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
                        <label className="text-sm font-medium text-neutral-300" htmlFor="contact-message">{labels.message}</label>
                        <textarea
                          id="contact-message"
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

      <BottomNav active="contact" />
    </div>
  );
}