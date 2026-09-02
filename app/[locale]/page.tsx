import type { Metadata } from "next";
import { PUBLIC_LOCALES } from "@/lib/locale";
import { isPublicLocaleSegment } from "@/lib/locale-path";
import { metadataAlternatesForLocale, metadataForLocale } from "@/lib/site-metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return PUBLIC_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isPublicLocaleSegment(locale)) return {};
  return {
    ...metadataForLocale(locale),
    alternates: metadataAlternatesForLocale(locale),
  };
}

export default function LocaleHomePage() {
  return null;
}
