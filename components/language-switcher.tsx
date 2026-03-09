"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_SITE_LANGUAGE,
  normalizeSiteLanguage,
  SITE_LANGUAGE_COOKIE,
  type SiteLanguage,
} from "@/lib/site-language";

const SITE_LANGUAGE_STORAGE_KEY = "site-language";
const SITE_LANGUAGE_EVENT = "site-language-change";

function readCookieLanguage(): SiteLanguage | null {
  if (typeof document === "undefined") return null;
  const entries = document.cookie.split(";").map((part) => part.trim());
  const hit = entries.find((entry) => entry.startsWith(`${SITE_LANGUAGE_COOKIE}=`));
  if (!hit) return null;
  const value = decodeURIComponent(hit.split("=").slice(1).join("="));
  return normalizeSiteLanguage(value);
}

function persistLanguage(next: SiteLanguage) {
  localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, next);
  document.cookie = `${SITE_LANGUAGE_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent(SITE_LANGUAGE_EVENT, { detail: next }));
}

export function useSiteLanguage() {
  const [language, setLanguage] = useState<SiteLanguage>(DEFAULT_SITE_LANGUAGE);

  useEffect(() => {
    const fromStorage = localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY);
    const fromCookie = readCookieLanguage();
    const initial = normalizeSiteLanguage(fromStorage ?? fromCookie ?? DEFAULT_SITE_LANGUAGE);
    setLanguage(initial);
    persistLanguage(initial);
  }, []);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== SITE_LANGUAGE_STORAGE_KEY) return;
      setLanguage(normalizeSiteLanguage(event.newValue));
    };

    const onCustom = (event: Event) => {
      const detail = (event as CustomEvent<SiteLanguage>).detail;
      setLanguage(normalizeSiteLanguage(detail));
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(SITE_LANGUAGE_EVENT, onCustom as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(SITE_LANGUAGE_EVENT, onCustom as EventListener);
    };
  }, []);

  const api = useMemo(() => ({
    language,
    setLanguage: (next: SiteLanguage) => {
      const normalized = normalizeSiteLanguage(next);
      setLanguage(normalized);
      persistLanguage(normalized);
    },
  }), [language]);

  return api;
}

export default function LanguageSwitcher({
  initialLanguage,
  light,
}: {
  initialLanguage?: SiteLanguage;
  light?: boolean;
}) {
  const router = useRouter();
  const { language, setLanguage } = useSiteLanguage();
  const activeLanguage = initialLanguage ? normalizeSiteLanguage(initialLanguage) : language;

  const baseClass = light
    ? "bg-white/95 text-background-dark border-white/70"
    : "bg-primary/90 text-background-dark border-primary/70";

  const setAndRefresh = (next: SiteLanguage) => {
    if (next === activeLanguage) return;
    setLanguage(next);
    router.refresh();
  };

  return (
    <div className={`inline-flex items-center rounded-full border px-1 py-1 text-xs font-bold tracking-wider shadow-sm ${baseClass}`}>
      <button
        type="button"
        disabled={activeLanguage === "hu"}
        onClick={() => setAndRefresh("hu")}
        className={`rounded-full px-2.5 py-1 transition-colors ${activeLanguage === "hu" ? "cursor-default bg-background-dark text-neutral-100" : "cursor-pointer text-background-dark/80"}`}
      >
        HU
      </button>
      <span className="px-1 text-background-dark/70">|</span>
      <button
        type="button"
        disabled={activeLanguage === "en"}
        onClick={() => setAndRefresh("en")}
        className={`rounded-full px-2.5 py-1 transition-colors ${activeLanguage === "en" ? "cursor-default bg-background-dark text-neutral-100" : "cursor-pointer text-background-dark/80"}`}
      >
        EN
      </button>
    </div>
  );
}
