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
    badge: "Our Catalog",
    title: "Brands We",
    titleHighlight: "Work With",
    description:
      "An overview of the commercial brands we import — body types, configurations, and typical specifications for your fleet planning.",
    learnMore: "Learn more",
    prevBrands: "Previous brands",
    nextBrands: "Next brands",
  },
  uk: {
    badge: "Наш каталог",
    title: "Бренди, з",
    titleHighlight: "якими працюємо",
    description:
      "Огляд комерційних брендів, які ми імпортуємо — типи кузовів, комплектації та типові характеристики для планування автопарку.",
    learnMore: "Дізнатися більше",
    prevBrands: "Попередні бренди",
    nextBrands: "Наступні бренди",
  },
};

const defaultMarqueeBrands = [
  "MAN",
  "Scania",
  "Volvo",
  "DAF",
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
  const [showCardControls, setShowCardControls] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isSectionInView, setIsSectionInView] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const marqueeBrands = useMemo(() => {
    const unique = [...new Set(vehiclesData.map((item) => item.brand).filter(Boolean))];
    return unique.length ? unique : defaultMarqueeBrands;
  }, [vehiclesData]);

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

    cards[targetIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
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

      const nextShowControls = track.scrollWidth > wrapper.clientWidth + 1;
      setShowCardControls((prev) => (prev === nextShowControls ? prev : nextShowControls));
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

    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [activeCategory, categoryBrandsKey]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsSectionInView(Boolean(entry?.isIntersecting));
      },
      {
        threshold: 0.05,
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
  }, [activeCategory]);

  return (
    <>
      <section ref={sectionRef} id="catalog" className="section-y-balanced section-catalog-bg section-seam-accent">
        <div className="catalog-section-ambient" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="catalog-header-row section-head-balanced">
            <div className="flex max-w-2xl flex-col items-center gap-4 lg:items-start">
              <span className="inline-flex items-center rounded-full border border-cyan-200/30 bg-background/35 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-cyan-50/90">
                {badge}
              </span>
              <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl text-balance">
                {title} <span className="chrome-gradient">{titleHighlight}</span>
              </h2>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{description}</p>
            </div>

            <div className="catalog-brand-marquee" aria-hidden="true">
              <div className={cn("catalog-brand-marquee-track", !isSectionInView && "catalog-brand-marquee-track--paused")}>
                {[...marqueeBrands, ...marqueeBrands].map((brand, index) => (
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

              <div className="relative -mx-1 px-1 sm:mx-0 sm:px-0" ref={wrapperRef}>
                <div
                  ref={trackRef}
                  className={cn(
                    "catalog-cards-track w-full scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                    showCardControls
                      ? "catalog-cards-track--scroll snap-x snap-mandatory overflow-x-auto"
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
                              fill
                              className="catalog-brand-card-logo"
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
                        <div className="mt-auto flex flex-wrap gap-2 pt-4">
                          {brand.highlights.map((item) => (
                            <span key={`${brand.id}-${item}`} className="catalog-spec-pill">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {showCardControls ? (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
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
                      size="icon"
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
                      size="icon"
                      className="catalog-carousel-btn landing-btn landing-btn-control"
                      aria-label={prevBrands}
                      disabled
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
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
