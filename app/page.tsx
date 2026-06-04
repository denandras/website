import { cookies } from "next/headers";
import HomePageClient from "@/components/home-page-client";
import { normalizeSiteLanguage, SITE_LANGUAGE_COOKIE } from "@/lib/site-language";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const cookieStore = await cookies();
  const { lang } = await searchParams;
  
  // URL param takes precedence, then cookie, then default
  const initialLanguage = normalizeSiteLanguage(
    lang ?? cookieStore.get(SITE_LANGUAGE_COOKIE)?.value,
  );

  return <HomePageClient initialLanguage={initialLanguage} />;
}
