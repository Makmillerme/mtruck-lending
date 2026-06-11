"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingGlassCard } from "@/components/landing/landing-glass-card";
import type { Locale } from "@/lib/locale";

import { cn } from "@/lib/utils";

import { SubmitReviewModal } from "@/components/landing/submit-review-modal";
import { parseWhyUsContent, pickMetaString, pickText } from "@/lib/landing-section-parsers";
import type { SiteReviewPublic } from "@/lib/site-reviews";

const defaultContent = {
  en: {
    badge: "Why Choose Us",
    title: "The Expert Travel",
    titleHighlight: "Advantage",
    description:
      "We stand out from the competition with our commitment to quality, transparency, and customer satisfaction.",
    carouselTitle: "Client Reviews",
    emptyReviews: "No reviews yet. Be the first to share your experience.",
    prevTestimonial: "Previous testimonial",
    nextTestimonial: "Next testimonial",
    reasons: [
      { title: "Direct access to the EU market", description: "We operate within the European market. We acquire vehicles directly from leasing companies and corporate fleets without unnecessary middlemen." },
      { title: "Transparent history and documents", description: "Each vehicle has verified European service history. We prepare a full document package for local registration or further export." },
      { title: "Quality Guarantee", description: "Before sale, every vehicle undergoes a detailed technical audit and cosmetic preparation at our base to meet high operational standards." },
      { title: "Net sales (VAT-free)", description: "We structure export deals at zero VAT (VAT 0% / Netto) for foreign buyers, ensuring full financial and legal transparency." },
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
    emptyReviews: "Поки немає відгуків. Станьте першим — залиште свій досвід.",
    prevTestimonial: "Попередній відгук",
    nextTestimonial: "Наступний відгук",
    reasons: [
      { title: "Власний доступ до ринку ЄС", description: "Ми працюємо всередині європейського ринку. Викуповуємо техніку напряму з лізингових компаній та корпоративних автопарків без зайвих посередників." },
      { title: "Прозора історія та документи", description: "Кожен транспортний засіб має підтверджену європейську сервісну історію. Ми готуємо повний пакет документів для локальної реєстрації або подальшого експорту." },
      { title: "Гарантія якості", description: "Перед продажем техніка проходить детальний технічний аудит та косметичну підготовку на нашій базі, щоб відповідати високим стандартам експлуатації." },
      { title: "Продаж без ПДВ (Netto)", description: "Оформлюємо експортні угоди за нульовою ставкою ПДВ (VAT 0% / Netto) для іноземних покупців, забезпечуючи повну фінансову та юридичну прозорість." },
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
    emptyReviews: "Zatiaľ žiadne hodnotenia. Buďte prvý — podeľte sa o skúsenosť.",
    prevTestimonial: "Predchádzajúce hodnotenie",
    nextTestimonial: "Ďalšie hodnotenie",
    reasons: [
      { title: "Vlastný prístup na trh EÚ", description: "Pôsobíme na európskom trhu. Vozidlá vykupujeme priamo od lízingových spoločností a firemných flotíl bez zbytočných sprostredkovateľov." },
      { title: "Transparentná história a dokumenty", description: "Každé vozidlo má overenú európsku servisnú históriu. Pripravíme kompletný balík dokumentov na lokálnu registráciu alebo ďalší export." },
      { title: "Záruka kvality", description: "Pred predajom vozidlo prechádza detailným technickým auditom a kozmetickou prípravou v našej základni, aby spĺňalo vysoké prevádzkové štandardy." },
      { title: "Predaj bez DPH (Netto)", description: "Exportné obchody vybavujeme s nulovou sadzbou DPH (VAT 0% / Netto) pre zahraničných kupujúcich s plnou finančnou a právnou transparentnosťou." },
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
    emptyReviews: "Noch keine Bewertungen. Seien Sie der Erste.",
    prevTestimonial: "Vorherige Bewertung",
    nextTestimonial: "Nächste Bewertung",
    reasons: [
      { title: "Eigener Zugang zum EU-Markt", description: "Wir arbeiten innerhalb des europäischen Marktes. Wir erwerben Fahrzeuge direkt von Leasinggesellschaften und Firmenflotten ohne unnötige Zwischenhändler." },
      { title: "Transparente Historie und Dokumente", description: "Jedes Fahrzeug hat eine nachgewiesene europäische Servicehistorie. Wir bereiten ein vollständiges Dokumentenpaket für die lokale Zulassung oder den weiteren Export vor." },
      { title: "Qualitätsgarantie", description: "Vor dem Verkauf durchläuft jedes Fahrzeug ein detailliertes technisches Audit und eine kosmetische Aufbereitung in unserer Basis, um hohe Betriebsstandards zu erfüllen." },
      { title: "Netto-Verkauf (ohne MwSt.)", description: "Exportgeschäfte führen wir mit Null-Mehrwertsteuer (VAT 0% / Netto) für ausländische Käufer — mit vollständiger finanzieller und rechtlicher Transparenz." },
      { title: "Fachberatung", description: "Unser Team hilft Ihnen, das passende Fahrzeug für Ihre spezifischen Geschäftsanforderungen zu finden." },
      { title: "After-Sales-Support", description: "Dediziertes Support-Team für alle Fragen oder Anliegen nach Ihrem Kauf." },
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
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const handleReviewPublished = useCallback((review: SiteReviewPublic) => {
    setUserReviews((prev) => {
      if (prev.some((item) => item.id === review.id)) return prev;
      return [review, ...prev];
    });
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/reviews")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { reviews?: SiteReviewPublic[] } | null) => {
        if (cancelled) return;
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

        <div className="mx-auto w-full">
          <div className="why-us-reviews-head mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="why-us-reviews-title text-xl font-bold text-foreground">{section.carouselTitle}</h3>
            <SubmitReviewModal locale={locale} onPublished={handleReviewPublished} />
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
      </div>
    </section>
  );
}
