"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingGlassCard } from "@/components/landing/landing-glass-card";
import type { Locale } from "@/lib/locale";
import { pickEntityLocale, pickLocalizedRecord } from "@/lib/pick-locale";
import { cn } from "@/lib/utils";

import { parseWhyUsContent, pickMetaString, pickText } from "@/lib/landing-section-parsers";

const defaultContent = {
  en: {
    badge: "Why Choose Us",
    title: "The Expert Travel",
    titleHighlight: "Advantage",
    description:
      "We stand out from the competition with our commitment to quality, transparency, and customer satisfaction.",
    carouselTitle: "Client Reviews",
    prevTestimonial: "Previous testimonial",
    nextTestimonial: "Next testimonial",
    reasons: [
      { title: "Direct European Imports", description: "No middlemen - we source vehicles directly from European suppliers ensuring best prices." },
      { title: "Full Documentation", description: "Complete vehicle history, service records, and all necessary import documents included." },
      { title: "Quality Guarantee", description: "Every vehicle undergoes rigorous inspection before delivery with warranty coverage." },
      { title: "Competitive Pricing", description: "Direct import model allows us to offer premium vehicles at competitive market prices." },
      { title: "Expert Consultation", description: "Our team helps you find the perfect vehicle for your specific business needs." },
      { title: "After-Sales Support", description: "Dedicated support team for any questions or issues after your purchase." },
    ],
  },
  uk: {
    badge: "Чому ми",
    title: "Переваги",
    titleHighlight: "Expert Travel",
    description: "Ми виділяємося серед конкурентів завдяки нашій відданості якості, прозорості та задоволеності клієнтів.",
    carouselTitle: "Відгуки клієнтів",
    prevTestimonial: "Попередній відгук",
    nextTestimonial: "Наступний відгук",
    reasons: [
      { title: "Прямий імпорт з Європи", description: "Без посередників — ми закуповуємо техніку безпосередньо у європейських постачальників за найкращими цінами." },
      { title: "Повна документація", description: "Повна історія авто, сервісні записи та всі необхідні імпортні документи включені." },
      { title: "Гарантія якості", description: "Кожен транспортний засіб проходить ретельну перевірку перед доставкою з гарантійним покриттям." },
      { title: "Конкурентні ціни", description: "Модель прямого імпорту дозволяє нам пропонувати преміальну техніку за конкурентними цінами." },
      { title: "Експертна консультація", description: "Наша команда допоможе знайти ідеальний транспорт для ваших конкретних бізнес-потреб." },
      { title: "Післяпродажна підтримка", description: "Спеціалізована команда підтримки для будь-яких питань після покупки." },
    ],
  },
  sk: {
    badge: "Prečo si vybrať nás",
    title: "Výhoda",
    titleHighlight: "Expert Travel",
    description: "Medzi konkurenciou vynikáme záväzkom ku kvalite, transparentnosti a spokojnosti zákazníkov.",
    carouselTitle: "Hodnotenia klientov",
    prevTestimonial: "Predchádzajúce hodnotenie",
    nextTestimonial: "Ďalšie hodnotenie",
    reasons: [
      { title: "Priamy dovoz z Európy", description: "Bez sprostredkovateľov — vozidlá získavame priamo od európskych dodávateľov za najlepšie ceny." },
      { title: "Kompletná dokumentácia", description: "Úplná história vozidla, servisné záznamy a všetky potrebné dovozné dokumenty sú súčasťou dodávky." },
      { title: "Záruka kvality", description: "Každé vozidlo prechádza dôkladnou kontrolou pred dodaním so záručným krytím." },
      { title: "Konkurenčné ceny", description: "Model priameho dovozu nám umožňuje ponúkať prémiovú techniku za konkurenčné trhové ceny." },
      { title: "Odborné poradenstvo", description: "Náš tím vám pomôže nájsť ideálne vozidlo pre vaše konkrétne obchodné potreby." },
      { title: "Popredajná podpora", description: "Vyhradený tím podpory pre akékoľvek otázky alebo problémy po nákupe." },
    ],
  },
  de: {
    badge: "Warum wir",
    title: "Der Expert Travel",
    titleHighlight: "Vorteil",
    description: "Wir heben uns durch unser Engagement für Qualität, Transparenz und Kundenzufriedenheit von der Konkurrenz ab.",
    carouselTitle: "Kundenbewertungen",
    prevTestimonial: "Vorherige Bewertung",
    nextTestimonial: "Nächste Bewertung",
    reasons: [
      { title: "Direktimport aus Europa", description: "Ohne Zwischenhändler — wir beziehen Fahrzeuge direkt von europäischen Lieferanten zu besten Preisen." },
      { title: "Vollständige Dokumentation", description: "Komplette Fahrzeughistorie, Serviceunterlagen und alle erforderlichen Importdokumente inklusive." },
      { title: "Qualitätsgarantie", description: "Jedes Fahrzeug durchläuft vor der Auslieferung eine gründliche Prüfung mit Garantieabdeckung." },
      { title: "Wettbewerbsfähige Preise", description: "Das Direktimportmodell ermöglicht uns Premium-Fahrzeuge zu wettbewerbsfähigen Marktpreisen anzubieten." },
      { title: "Fachberatung", description: "Unser Team hilft Ihnen, das passende Fahrzeug für Ihre spezifischen Geschäftsanforderungen zu finden." },
      { title: "After-Sales-Support", description: "Dediziertes Support-Team für alle Fragen oder Anliegen nach Ihrem Kauf." },
    ],
  },
} as const;

interface WhyUsProps {
  locale: Locale;
  metaContent?: Record<string, unknown>;
  testimonials?: Array<{
    id: number;
    quoteEn: string;
    quoteUk: string | null;
    quoteSk?: string | null;
    quoteDe?: string | null;
    authorEn: string;
    authorUk: string | null;
    authorSk?: string | null;
    authorDe?: string | null;
    companyEn: string | null;
    companyUk: string | null;
    companySk?: string | null;
    companyDe?: string | null;
    rating: number;
    orderIndex: number;
    isActive: boolean;
  }>;
}

export function WhyUs({ locale, metaContent, testimonials = [] }: WhyUsProps) {
  const cms = parseWhyUsContent(metaContent);
  const base = defaultContent[locale];
  const section = {
    badge: pickText(cms.badge, base.badge),
    title: pickText(cms.title, base.title),
    titleHighlight: pickText(cms.titleHighlight, base.titleHighlight),
    description: pickText(cms.description, base.description),
    carouselTitle: pickText(cms.carouselTitle, base.carouselTitle),
    prevTestimonial: pickText(pickMetaString(metaContent, "prevTestimonial"), base.prevTestimonial),
    nextTestimonial: pickText(pickMetaString(metaContent, "nextTestimonial"), base.nextTestimonial),
  };
  const reasons = cms.reasons.length > 0 ? cms.reasons : [...base.reasons];
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [showControls, setShowControls] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const carousel = useMemo(() => {
    if (testimonials.length === 0) {
      const fallbackQuote = pickLocalizedRecord(
        {
          en: "Expert Travel helped us expand our fleet with quality vehicles at excellent prices. Their service and support have been exceptional.",
          uk: "Expert Travel допоміг нам розширити автопарк якісною технікою за відмінними цінами. Їхній сервіс та підтримка були винятковими.",
          sk: "Expert Travel nám pomohol rozšíriť vozový park kvalitnými vozidlami za výborné ceny. Ich servis a podpora boli výnimočné.",
          de: "Expert Travel hat uns geholfen, unsere Flotte mit hochwertigen Fahrzeugen zu erweitern. Service und Betreuung waren hervorragend.",
        },
        locale,
        "Expert Travel helped us expand our fleet with quality vehicles at excellent prices. Their service and support have been exceptional.",
      );
      const fallbackAuthor = pickLocalizedRecord(
        { en: "Martin Novak", uk: "Мартін Новак", sk: "Martin Novák", de: "Martin Novak" },
        locale,
        "Martin Novak",
      );

      return [
        {
          id: 0,
          quote: fallbackQuote,
          author: fallbackAuthor,
          company: "TransCargo s.r.o.",
          rating: 5,
        },
      ];
    }

    return testimonials.map((item) => ({
      id: item.id,
      quote: pickEntityLocale(locale, {
        en: item.quoteEn,
        uk: item.quoteUk,
        sk: item.quoteSk,
        de: item.quoteDe,
      }),
      author: pickEntityLocale(locale, {
        en: item.authorEn,
        uk: item.authorUk,
        sk: item.authorSk,
        de: item.authorDe,
      }),
      company: pickEntityLocale(locale, {
        en: item.companyEn,
        uk: item.companyUk,
        sk: item.companySk,
        de: item.companyDe,
      }),
      rating: item.rating,
    }));
  }, [testimonials, locale]);

  const carouselKey = useMemo(() => carousel.map((item) => item.id).join(","), [carousel]);
  const isMultiCarousel = carousel.length > 1;

  const scrollTestimonials = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.querySelectorAll("[data-testimonial-card]")) as HTMLElement[];
    if (!cards.length) return;

    const currentLeft = track.scrollLeft;
    let currentIndex = cards.findIndex((card) => card.offsetLeft >= currentLeft - 8);
    if (currentIndex < 0) currentIndex = cards.length - 1;

    const targetIndex =
      direction === "next"
        ? Math.min(cards.length - 1, currentIndex + 1)
        : Math.max(0, currentIndex - 1);

    track.scrollTo({
      left: cards[targetIndex]?.offsetLeft ?? 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const maxScrollLeft = Math.max(0, track.scrollWidth - wrapper.clientWidth);
      const scrollLeft = track.scrollLeft;
      const epsilon = 2;

      const nextShowControls =
        carousel.length > 1 || track.scrollWidth > wrapper.clientWidth + 1;
      setShowControls((prev) => (prev === nextShowControls ? prev : nextShowControls));
      setCanScrollPrev((prev) => {
        const next = scrollLeft > epsilon;
        return prev === next ? prev : next;
      });
      setCanScrollNext((prev) => {
        const next = scrollLeft < maxScrollLeft - epsilon;
        return prev === next ? prev : next;
      });
    };

    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    schedule();

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(wrapper);
    resizeObserver.observe(track);

    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [carouselKey, carousel.length, locale]);

  return (
    <section id="why-us" className="section-y-balanced section-blend section-seam-accent landing-section-deferred relative">
      <div className="landing-page-container relative z-10">
        <div className="landing-section-head items-center text-center mx-auto mb-12">
          <span className="landing-section-badge">{section.badge}</span>
          <h2 className="landing-section-title">
            {section.title} <span className="chrome-gradient">{section.titleHighlight}</span>
          </h2>
          <p className="landing-section-description max-w-xl">{section.description}</p>
        </div>

        <div className="landing-card-grid grid gap-4 sm:grid-cols-2 xl:grid-cols-3 mb-16">
          {reasons.map((reason, index) => (
            <LandingGlassCard
              key={index}
              index={index}
              icon={Check}
              title={reason.title}
              description={reason.description}
            />
          ))}
        </div>

        <div className="mx-auto w-full">
          <h3 className="text-xl font-bold text-foreground mb-6">{section.carouselTitle}</h3>

          <div className="relative -mx-1 px-1 sm:mx-0 sm:px-0" ref={wrapperRef}>
            <div
              ref={trackRef}
              className={cn(
                "testimonials-cards-track w-full scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                isMultiCarousel || showControls
                  ? "testimonials-cards-track--scroll snap-x snap-mandatory overflow-x-auto"
                  : "testimonials-cards-track--fit overflow-x-hidden justify-center",
              )}
            >
              {carousel.map((item) => (
                <article
                  key={item.id}
                  data-testimonial-card
                  className={cn(
                    "landing-glass-card landing-card-equal group snap-start",
                    isMultiCarousel ? "testimonial-card--scroll" : "testimonial-card--fit",
                  )}
                >
                  <div className="flex shrink-0 gap-1 mb-4 relative z-10">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={`${item.id}-${i}`} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                    ))}
                  </div>
                  <blockquote className="landing-card-equal__body text-sm sm:text-[15px] text-foreground leading-relaxed mb-6 relative z-10">
                    {`"${item.quote}"`}
                  </blockquote>
                  <div className="landing-card-equal__footer relative z-10">
                    <p className="font-semibold text-cyan-50">{item.author}</p>
                    {item.company ? <p className="text-[13px] text-muted-foreground mt-0.5">{item.company}</p> : null}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => scrollTestimonials("prev")}
                className="catalog-carousel-btn landing-btn landing-btn-control"
                aria-label={section.prevTestimonial}
                disabled={!showControls || !canScrollPrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => scrollTestimonials("next")}
                className="catalog-carousel-btn landing-btn landing-btn-control"
                aria-label={section.nextTestimonial}
                disabled={!showControls || !canScrollNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
