export type SiteLanguage = "hu" | "en";

export const SITE_LANGUAGE_COOKIE = "site-lang";
export const DEFAULT_SITE_LANGUAGE: SiteLanguage = "hu";

export function normalizeSiteLanguage(value: string | null | undefined): SiteLanguage {
  return value === "en" ? "en" : "hu";
}
