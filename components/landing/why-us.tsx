"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingGlassCard } from "@/components/landing/landing-glass-card";
import type { Locale } from "@/lib/locale";

import { cn } from "@/lib/utils";

import { parseWhyUsContent, pickMetaString, pickText } from "@/lib/landing-section-parsers";
import { SubmitReviewModal } from "@/components/landing/submit-review-modal";
import type { SiteReviewPublic, SiteReviewsSettings } from "@/lib/site-reviews";

const defaultContent = {
  en: {
    badge: "Why Choose Us",
    title: "The Expert Travel",
    titleHighlight: "Advantage",
    description:
      "A clear business process for companies, sellers, dealers, and partners in commercial transport.",
    carouselTitle: "Client Reviews",
    emptyReviews: "No reviews yet.",
    prevTestimonial: "Previous testimonial",
    nextTestimonial: "Next testimonial",
    reasons: [
      { title: "European market presence", description: "We work in the European commercial transport market and help parties align their cooperation format." },
      { title: "Transparent cooperation", description: "We keep the process clear from the first request through agreed terms and vehicle handover." },
      { title: "Business-focused approach", description: "We prepare cooperation options around the company request, vehicle type, and practical deal conditions." },
      { title: "Partner network", description: "We work with buyers, sellers, dealers, and owners of commercial transport across different markets." },
      { title: "Clear communication", description: "We help the parties align expectations, key terms, and next steps without unnecessary complexity." },
      { title: "Handover coordination", description: "We coordinate the final stage so the vehicle moves from agreement to partner or client handover." },
    ],
  },
  uk: {
    badge: "Чому ми",
    title: "Переваги",
    titleHighlight: "Expert Travel",
    description: "Зрозумілий бізнес-процес для компаній, продавців, дилерів і партнерів у сфері комерційного транспорту.",
    carouselTitle: "Відгуки клієнтів",
    emptyReviews: "Поки немає відгуків.",
    prevTestimonial: "Попередній відгук",
    nextTestimonial: "Наступний відгук",
    reasons: [
      { title: "Робота на ринку ЄС", description: "Працюємо на європейському ринку комерційного транспорту та допомагаємо сторонам узгодити формат співпраці." },
      { title: "Прозора співпраця", description: "Тримаємо процес зрозумілим від першого запиту до погоджених умов і передачі транспорту." },
      { title: "Бізнес-підхід", description: "Формуємо варіанти співпраці під запит компанії, тип транспорту та практичні умови угоди." },
      { title: "Партнерська мережа", description: "Працюємо з покупцями, продавцями, дилерами та власниками комерційного транспорту на різних ринках." },
      { title: "Чітка комунікація", description: "Допомагаємо сторонам узгодити очікування, ключові умови та наступні кроки без зайвої складності." },
      { title: "Координація передачі", description: "Координуємо фінальний етап, щоб транспорт перейшов від домовленості до партнера або клієнта." },
    ],
  },
  sk: {
    badge: "Prečo si vybrať nás",
    title: "Výhoda",
    titleHighlight: "Expert Travel",
    description: "Jasný obchodný proces pre firmy, predajcov, dílerov a partnerov v oblasti komerčnej dopravy.",
    carouselTitle: "Hodnotenia klientov",
    emptyReviews: "Zatiaľ žiadne hodnotenia.",
    prevTestimonial: "Predchádzajúce hodnotenie",
    nextTestimonial: "Ďalšie hodnotenie",
    reasons: [
      { title: "Pôsobenie na trhu EÚ", description: "Pracujeme na európskom trhu komerčnej dopravy a pomáhame stranám dohodnúť formát spolupráce." },
      { title: "Transparentná spolupráca", description: "Proces držíme jasný od prvého dopytu cez dohodnuté podmienky až po odovzdanie vozidla." },
      { title: "Obchodný prístup", description: "Pripravujeme možnosti spolupráce podľa dopytu firmy, typu vozidla a praktických podmienok obchodu." },
      { title: "Partnerská sieť", description: "Pracujeme s kupujúcimi, predávajúcimi, dílermi a vlastníkmi komerčnej dopravy na rôznych trhoch." },
      { title: "Jasná komunikácia", description: "Pomáhame stranám zladiť očakávania, hlavné podmienky a ďalšie kroky bez zbytočnej zložitosti." },
      { title: "Koordinácia odovzdania", description: "Koordinujeme záverečnú fázu, aby vozidlo prešlo od dohody k partnerovi alebo klientovi." },
    ],
  },
  de: {
    badge: "Warum wir",
    title: "Der Expert Travel",
    titleHighlight: "Vorteil",
    description: "Ein klarer Geschäftsprozess für Unternehmen, Verkäufer, Händler und Partner im gewerblichen Transport.",
    carouselTitle: "Kundenbewertungen",
    emptyReviews: "Noch keine Bewertungen.",
    prevTestimonial: "Vorherige Bewertung",
    nextTestimonial: "Nächste Bewertung",
    reasons: [
      { title: "Präsenz im EU-Markt", description: "Wir arbeiten auf dem europäischen Markt für gewerblichen Transport und helfen den Parteien, das Format der Zusammenarbeit abzustimmen." },
      { title: "Transparente Zusammenarbeit", description: "Wir halten den Prozess von der ersten Anfrage über abgestimmte Bedingungen bis zur Fahrzeugübergabe klar." },
      { title: "Geschäftlicher Ansatz", description: "Wir entwickeln Kooperationsoptionen nach Unternehmensanfrage, Fahrzeugtyp und praktischen Geschäftsbedingungen." },
      { title: "Partnernetzwerk", description: "Wir arbeiten mit Käufern, Verkäufern, Händlern und Eigentümern von gewerblichem Transport in verschiedenen Märkten." },
      { title: "Klare Kommunikation", description: "Wir helfen den Parteien, Erwartungen, Hauptbedingungen und nächste Schritte ohne unnötige Komplexität abzustimmen." },
      { title: "Koordination der Übergabe", description: "Wir koordinieren die finale Phase, damit das Fahrzeug von der Vereinbarung an Partner oder Kunden übergeben wird." },
    ],
  },
  pl: {
    badge: "Dlaczego my",
    title: "Przewaga",
    titleHighlight: "Expert Travel",
    description: "Jasny proces biznesowy dla firm, sprzedających, dealerów i partnerów w transporcie komercyjnym.",
    carouselTitle: "Opinie klientów",
    emptyReviews: "Brak opinii.",
    prevTestimonial: "Poprzednia opinia",
    nextTestimonial: "Następna opinia",
    reasons: [
      { title: "Obecność na rynku UE", description: "Działamy na europejskim rynku transportu komercyjnego i pomagamy stronom uzgodnić format współpracy." },
      { title: "Transparentna współpraca", description: "Utrzymujemy jasny proces od pierwszego zapytania przez uzgodnione warunki po przekazanie pojazdu." },
      { title: "Podejście biznesowe", description: "Przygotowujemy opcje współpracy pod zapytanie firmy, typ pojazdu i praktyczne warunki transakcji." },
      { title: "Sieć partnerska", description: "Współpracujemy z kupującymi, sprzedającymi, dealerami i właścicielami transportu komercyjnego na różnych rynkach." },
      { title: "Jasna komunikacja", description: "Pomagamy stronom uzgodnić oczekiwania, kluczowe warunki i kolejne kroki bez zbędnej złożoności." },
      { title: "Koordynacja przekazania", description: "Koordynujemy etap końcowy, aby pojazd przeszedł od umowy do partnera lub klienta." },
    ],
  },
} as const;

interface WhyUsProps {
  locale: Locale;
  metaContent?: Record<string, unknown>;
}

export function WhyUs({ locale, metaContent }: WhyUsProps) {
  const cms = parseWhyUsContent(metaContent);
  const base = defaultContent[locale];
  const section = {
    badge: pickText(cms.badge, base.badge),
    title: pickText(cms.title, base.title),
    titleHighlight: pickText(cms.titleHighlight, base.titleHighlight),
    description: pickText(cms.description, base.description),
    carouselTitle: pickText(cms.carouselTitle, base.carouselTitle),
    emptyReviews: pickText(pickMetaString(metaContent, "emptyReviews"), base.emptyReviews),
    prevTestimonial: pickText(pickMetaString(metaContent, "prevTestimonial"), base.prevTestimonial),
    nextTestimonial: pickText(pickMetaString(metaContent, "nextTestimonial"), base.nextTestimonial),
  };
  const reasons = cms.reasons.length > 0 ? cms.reasons : [...base.reasons];
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [showControls, setShowControls] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [userReviews, setUserReviews] = useState<SiteReviewPublic[]>([]);
  const [reviewSettings, setReviewSettings] = useState<SiteReviewsSettings | null>(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/reviews", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { reviews?: SiteReviewPublic[]; settings?: SiteReviewsSettings } | null) => {
        if (cancelled) return;
        setReviewSettings(data?.settings ?? { showReviews: false, allowSubmit: false });
        setUserReviews(data?.reviews ?? []);
      })
      .catch(() => {
        if (!cancelled) setUserReviews([]);
      })
      .finally(() => {
        if (!cancelled) setReviewsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const carousel = useMemo(
    () =>
      userReviews.map((item) => ({
        id: item.id,
        quote: item.quote,
        author: item.author,
        company: item.company,
        rating: item.rating,
      })),
    [userReviews],
  );

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
    <section id="why-us" className="section-y-balanced section-blend section-seam-accent landing-section-contained relative">
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

        {reviewSettings?.showReviews ? (
        <div className="mx-auto w-full">
          <div className="why-us-reviews-head mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="why-us-reviews-title text-xl font-bold text-foreground">{section.carouselTitle}</h3>
            {reviewSettings.allowSubmit ? (
              <SubmitReviewModal
                locale={locale}
                onPublished={(review) => setUserReviews((prev) => [review, ...prev])}
              />
            ) : null}
          </div>

          {reviewsLoading ? (
            <div className="reviews-carousel-skeleton" aria-hidden="true">
              <div className="reviews-carousel-skeleton-card" />
              <div className="reviews-carousel-skeleton-card hidden sm:block" />
              <div className="reviews-carousel-skeleton-card hidden lg:block" />
            </div>
          ) : carousel.length === 0 ? (
            <p className="reviews-carousel-empty rounded-xl border border-dashed border-cyan-100/25 bg-[oklch(0.14_0.02_252/0.35)] px-6 py-10 text-center text-sm text-muted-foreground">
              {section.emptyReviews}
            </p>
          ) : (
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
                onClick={() => scrollTestimonials("next")}
                className="catalog-carousel-btn landing-btn landing-btn-control"
                aria-label={section.nextTestimonial}
                disabled={!showControls || !canScrollNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          )}
        </div>
        ) : null}
      </div>
    </section>
  );
}
