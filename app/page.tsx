import { HomeClient } from "@/components/landing/home-client";
import { getLandingBundle, LANDING_SECTION_ORDER } from "@/lib/landing-data";

export default function Home() {
  const landingData = getLandingBundle();

  return <HomeClient initialData={landingData} sectionOrder={[...LANDING_SECTION_ORDER]} />;
}
