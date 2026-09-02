import { notFound } from "next/navigation";
import { HomeClient } from "@/components/landing/home-client";
import { getLandingBundle, LANDING_SECTION_ORDER } from "@/lib/landing-data";
import { isPublicLocaleSegment } from "@/lib/locale-path";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isPublicLocaleSegment(locale)) notFound();

  const landingData = getLandingBundle();

  return (
    <>
      <HomeClient initialData={landingData} sectionOrder={[...LANDING_SECTION_ORDER]} />
      {children}
    </>
  );
}
