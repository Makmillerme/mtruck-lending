"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { CatalogBrandModal, type CatalogBrandCard } from "./catalog-brand-modal";
import { getCatalogBrandsByCategory } from "@/lib/catalog-brands";
import {
  catalogBrandToCard,
  matchesCatalogCategory,
  vehicleToCatalogBrandCard,
  type CatalogCategory,
  type CatalogVehicleRecord,
} from "@/lib/catalog-vehicle";
import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";

import { parseCatalogTabs, pickMetaString, pickText } from "@/lib/landing-section-parsers";

const content = {
  en: {
    badge: "Supply focus",
    title: "Brands we",
    titleHighlight: "work with",
    description:
      "We work with leading European commercial transport brands and help companies find suitable cooperation options for their fleet needs.",
    learnMore: "Send a request",
    prevBrands: "Previous brands",
    nextBrands: "Next brands",
  },
  uk: {
    badge: "Напрями роботи",
    title: "Бренди, з",
    titleHighlight: "якими працюємо",
    description:
      "Працюємо з провідними європейськими брендами комерційного транспорту та допомагаємо компаніям знайти відповідні варіанти співпраці для автопарку.",
    learnMore: "Надіслати запит",
    prevBrands: "Попередні бренди",
    nextBrands: "Наступні бренди",
  },
  sk: {
    badge: "Smery práce",
    title: "Značky, s",
    titleHighlight: "ktorými pracujeme",
    description:
      "Pracujeme s poprednými európskymi značkami komerčnej dopravy a pomáhame firmám nájsť vhodné možnosti spolupráce pre ich flotilu.",
    learnMore: "Odoslať dopyt",
    prevBrands: "Predchádzajúce značky",
    nextBrands: "Ďalšie značky",
  },
  de: {
    badge: "Arbeitsbereiche",
    title: "Marken, mit",
    titleHighlight: "denen wir arbeiten",
    description:
      "Wir arbeiten mit führenden europäischen Marken im gewerblichen Transport und helfen Unternehmen, passende Kooperationsoptionen für ihren Fuhrpark zu finden.",
    learnMore: "Anfrage senden",
    prevBrands: "Vorherige Marken",
    nextBrands: "Nächste Marken",
  },
};

const defaultMarqueeBrands = [
  "Mercedes-Benz",
  "MAN",
  "Scania",
  "DAF",
  "Volvo",
  "Renault",
  "Schmitz",
  "Krone",
  "Kögel",
  "Wielton",
  "Lamberet",
];

interface CatalogProps {
  locale: Locale;
  vehiclesData?: CatalogVehicleRecord[];
  metaContent?: Record<string, unknown>;
}

type CatalogTabKey = CatalogCategory;

export function Catalog({ locale, vehiclesData = [], metaContent }: CatalogProps) {
  const base = content[locale];
  const badge = pickText(pickMetaString(metaContent, "badge"), base.badge);
  const title = pickText(pickMetaString(metaContent, "title"), base.title);
  const titleHighlight = pickText(pickMetaString(metaContent, "titleHighlight"), base.titleHighlight);
  const description = pickText(pickMetaString(metaContent, "description"), base.description);
  const learnMore = pickText(
    pickMetaString(metaContent, "viewDetails") || pickMetaString(metaContent, "learnMore"),
    base.learnMore,
  );
  const prevBrands = pickText(pickMetaString(metaContent, "prevBrands"), base.prevBrands);
  const nextBrands = pickText(pickMetaString(metaContent, "nextBrands"), base.nextBrands);
  const categoryTabs = parseCatalogTabs(metaContent, locale);
  const [activeCategory, setActiveCategory] = useState<CatalogTabKey>("truck");
  const [selectedBrand, setSelectedBrand] = useState<CatalogBrandCard | null>(null);
  const [showCardControls, setShowCardControls] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const marqueeBrands = useMemo(() => {
    const unique = [...new Set(vehiclesData.map((item) => item.brand).filter(Boolean))];
    return unique.length ? unique : defaultMarqueeBrands;
  }, [vehiclesData]);

  const marqueeLoop = useMemo(
    () => [...marqueeBrands, ...marqueeBrands],
    [marqueeBrands],
  );

  const categoryBrands = useMemo<CatalogBrandCard[]>(() => {
    const fromDb = vehiclesData
      .filter((vehicle) => matchesCatalogCategory(vehicle.category, activeCategory))
      .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
      .map((vehicle) => vehicleToCatalogBrandCard(vehicle, locale));

    if (fromDb.length > 0) return fromDb;

    return getCatalogBrandsByCategory(activeCategory).map((brand) => catalogBrandToCard(brand, locale));
  }, [vehiclesData, locale, activeCategory]);

  const categoryBrandsKey = useMemo(
    () => categoryBrands.map((brand) => brand.id).join(","),
    [categoryBrands],
  );

  const scrollCards = (direction: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll("[data-catalog-card]")) as HTMLElement[];
    if (!cards.length) return;

    const currentLeft = el.scrollLeft;
    let currentIndex = cards.findIndex((card) => card.offsetLeft >= currentLeft - 8);
    if (currentIndex < 0) currentIndex = cards.length - 1;

    const targetIndex =
      direction === "next"
        ? Math.min(cards.length - 1, currentIndex + 1)
        : Math.max(0, currentIndex - 1);

    const target = cards[targetIndex];
    if (!target) return;

    el.scrollTo({
      left: target.offsetLeft,
      behavior: "smooth",
    });
  };

  const hasMultipleCards = categoryBrands.length > 1;
  const useScrollTrack = hasMultipleCards;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    let rafId = 0;
    let remeasureTimer: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      rafId = 0;
      const viewport = track.clientWidth;
      const maxScrollLeft = Math.max(0, track.scrollWidth - viewport);
      const scrollLeft = track.scrollLeft;
      const epsilon = 2;
      const scrollable = useScrollTrack && track.scrollWidth > viewport + epsilon;

      setShowCardControls((prev) => (prev === scrollable ? prev : scrollable));
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

    const scheduleWithFallback = () => {
      schedule();
      if (remeasureTimer) clearTimeout(remeasureTimer);
      remeasureTimer = setTimeout(schedule, 200);
    };

    schedule();

    const resizeObserver = new ResizeObserver(scheduleWithFallback);
    resizeObserver.observe(wrapper);
    resizeObserver.observe(track);

    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", scheduleWithFallback);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (remeasureTimer) clearTimeout(remeasureTimer);
      resizeObserver.disconnect();
      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", scheduleWithFallback);
    };
  }, [activeCategory, categoryBrandsKey, useScrollTrack]);

  useEffect(() => {
    let scrollEndTimer: ReturnType<typeof setTimeout> | undefined;
    const root = document.documentElement;

    const onScroll = () => {
      root.dataset.landingScrolling = "true";
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        delete root.dataset.landingScrolling;
      }, 280);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      delete root.dataset.landingScrolling;
    };
  }, []);

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
  }, [activeCategory]);

  return (
    <>
      <section ref={sectionRef} id="catalog" className="section-y-balanced section-catalog-bg section-seam-accent landing-section-contained">
        <div className="catalog-section-ambient" aria-hidden="true" />

        <div className="relative landing-page-container">
          <div className="catalog-header-block section-head-balanced">
            <div className="catalog-section-head landing-section-head">
              <span className="landing-section-badge">{badge}</span>
              <h2 className="landing-section-title">
                {title} <span className="chrome-gradient">{titleHighlight}</span>
              </h2>
              <p className="landing-section-description">{description}</p>
            </div>

            <div className="catalog-brand-marquee" aria-hidden="true">
            <div className="catalog-brand-marquee-track">
              {marqueeLoop.map((brand, index) => (
                <span
                  key={`${brand}-${index}`}
                  className="landing-pipeline-pill catalog-brand-marquee-pill"
                >
                  {brand}
                </span>
              ))}
            </div>
            </div>
          </div>

          <div className="catalog-stage mt-8 lg:mt-10">
            <div className="catalog-stage-shine" aria-hidden="true" />

            <div className="catalog-stage-inner">
              <div className="catalog-category-tabs">
                {categoryTabs.map((tab) => {
                  const isActive = activeCategory === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      data-active={isActive}
                      onClick={() => setActiveCategory(tab.key)}
                      className="catalog-category-tab"
                    >
                      <tab.icon className="catalog-category-tab-icon h-4 w-4 shrink-0" />
                      <span className="truncate text-sm font-medium text-foreground">{tab.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="relative w-full" ref={wrapperRef}>
                <div
                  ref={trackRef}
                  className={cn(
                    "catalog-cards-track w-full scroll-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                    useScrollTrack
                      ? "catalog-cards-track--scroll snap-x snap-proximity sm:snap-mandatory overflow-x-auto"
                      : "catalog-cards-track--fit overflow-x-hidden justify-center",
                  )}
                >
                  {categoryBrands.map((brand) => (
                    <article
                      key={brand.id}
                      data-catalog-card
                      className="catalog-brand-card catalog-brand-card--scroll group snap-start"
                      onClick={() => setSelectedBrand(brand)}
                    >
                      <div className="catalog-brand-card-media">
                        {!brand.logoSrc ? <div className="catalog-brand-card-media-glow" aria-hidden="true" /> : null}
                        {brand.logoSrc ? (
                          <div className="catalog-brand-card-logo-wrap">
                            <Image
                              src={brand.logoSrc}
                              alt={`${brand.name} logo`}
                              width={160}
                              height={120}
                              loading="lazy"
                              decoding="async"
                              sizes="160px"
                              className="catalog-brand-card-logo h-full w-full object-contain"
                            />
                          </div>
                        ) : null}
                        {!brand.logoSrc ? <h3 className="catalog-brand-card-name">{brand.name}</h3> : null}
                        <div className="catalog-brand-card-overlay">
                          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.06em] text-cyan-50">
                            <Eye className="h-5 w-5" />
                            {learnMore}
                          </div>
                        </div>
                      </div>

                      <div className="catalog-brand-card-body">
                        <p className="catalog-brand-card-tagline">{brand.tagline}</p>
                      </div>
                    </article>
                  ))}
                </div>

                {showCardControls ? (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => scrollCards("prev")}
                      className="catalog-carousel-btn landing-btn landing-btn-control"
                      aria-label={prevBrands}
                      disabled={!showCardControls || !canScrollPrev}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => scrollCards("next")}
                      className="catalog-carousel-btn landing-btn landing-btn-control"
                      aria-label={nextBrands}
                      disabled={!showCardControls || !canScrollNext}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                ) : (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      className="catalog-carousel-btn landing-btn landing-btn-control"
                      aria-label={prevBrands}
                      disabled
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="catalog-carousel-btn landing-btn landing-btn-control"
                      aria-label={nextBrands}
                      disabled
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedBrand ? (
        <CatalogBrandModal brand={selectedBrand} locale={locale} onClose={() => setSelectedBrand(null)} />
      ) : null}
    </>
  );
}
