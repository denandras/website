import type { Metadata } from "next";
import { cookies } from "next/headers";
import ContactPageClient from "@/components/contact-page-client";
import { normalizeSiteLanguage, SITE_LANGUAGE_COOKIE } from "@/lib/site-language";

export const metadata: Metadata = {
  title: "Contact – András Dénes | Trombonist",
  description: "Get in touch with András Dénes — Hungarian trombonist based in Budapest. Booking inquiries, concert engagements, and collaborations welcome.",
  openGraph: {
    title: "Contact – András Dénes | Trombonist",
    description: "Get in touch with András Dénes — booking inquiries and concert engagements welcome.",
    url: "https://andrasdenes.com/contact",
  },
};

export default async function ContactPage() {
  const cookieStore = await cookies();
  const initialLanguage = normalizeSiteLanguage(
    cookieStore.get(SITE_LANGUAGE_COOKIE)?.value,
  );

  return <ContactPageClient initialLanguage={initialLanguage} />;
}
