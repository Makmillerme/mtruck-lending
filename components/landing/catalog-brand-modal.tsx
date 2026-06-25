"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CtaFormModal } from "@/components/landing/cta-form-modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { CatalogBodyTypeOffering, CatalogBrandGalleryItem, CatalogCategory } from "@/lib/catalog-brands";
import { getCatalogBrandLogoFull } from "@/lib/catalog-brand-logo";
import type { Locale } from "@/lib/locale";

export type CatalogBrandCard = {
  id: string;
  category: CatalogCategory;
  name: string;
  logoSrc?: string | null;
  logoKey?: string | null;
  tagline: string;
  highlights: string[];
  overview: string;
  bodyTypes: string[];
  configurations: string[];
  typicalSpecs: string[];
  bodyTypeOfferings?: CatalogBodyTypeOffering[];
  galleryImages?: CatalogBrandGalleryItem[];
};

interface CatalogBrandModalProps {
  brand: CatalogBrandCard;
  locale: Locale;
  onClose: () => void;
}

type ModalLabels = {
  overview: string;
  galleryTitle: string;
  prevPhoto: string;
  nextPhoto: string;
  note: string;
  quoteCta: string;
};

const labels: Record<Locale, ModalLabels> = {
  en: {
    overview: "About the brand",
    galleryTitle: "Vehicle photos",
    prevPhoto: "Previous photo",
    nextPhoto: "Next photo",
    note: "We help shortlist equipment for your routes, cargo profile, and fleet needs — then prepare a clear commercial option for cooperation.",
    quoteCta: "Send a request",
  },
  uk: {
    overview: "Про бренд",
    galleryTitle: "Фото техніки",
    prevPhoto: "Попереднє фото",
    nextPhoto: "Наступне фото",
    note: "Допомагаємо підібрати варіанти техніки під ваші маршрути, вантаж і потреби автопарку — далі формуємо зрозумілий варіант співпраці.",
    quoteCta: "Надіслати запит",
  },
  sk: {
    overview: "O značke",
    galleryTitle: "Fotografie techniky",
    prevPhoto: "Predchádzajúca fotografia",
    nextPhoto: "Ďalšia fotografia",
    note: "Pomáhame vybrať varianty techniky podľa vašich trás, nákladu a potrieb flotily — potom pripravíme jasnú možnosť spolupráce.",
    quoteCta: "Odoslať dopyt",
  },
  de: {
    overview: "Über die Marke",
    galleryTitle: "Fahrzeugfotos",
    prevPhoto: "Vorheriges Foto",
    nextPhoto: "Nächstes Foto",
    note: "Wir helfen bei der Auswahl passender Fahrzeuge für Routen, Frachtprofil und Fuhrparkbedarf — danach erstellen wir eine klare Kooperationsoption.",
    quoteCta: "Anfrage senden",
  },
};

function BrandPhotoCarousel({ images, labels: t }: { images: CatalogBrandGalleryItem[]; labels: ModalLabels }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [showControls, setShowControls] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const carouselKey = useMemo(() => images.map((image) => image.id).join(","), [images]);

  const scrollPhotos = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.querySelectorAll("[data-brand-photo-slide]")) as HTMLElement[];
    if (!slides.length) return;

    const currentLeft = track.scrollLeft;
    let currentIndex = slides.findIndex((slide) => slide.offsetLeft >= currentLeft - 8);
    if (currentIndex < 0) currentIndex = slides.length - 1;

    const targetIndex =
      direction === "next"
        ? Math.min(slides.length - 1, currentIndex + 1)
        : Math.max(0, currentIndex - 1);

    track.scrollTo({
      left: slides[targetIndex]?.offsetLeft ?? 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    let rafId = 0;
    let remeasureTimer: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      rafId = 0;
      const maxScrollLeft = Math.max(0, track.scrollWidth - wrapper.clientWidth);
      const scrollLeft = track.scrollLeft;
      const epsilon = 2;
      const nextShowControls = images.length > 1 || track.scrollWidth > wrapper.clientWidth + 1;

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

    const scheduleWithFallback = () => {
      schedule();
      if (remeasureTimer) clearTimeout(remeasureTimer);
      remeasureTimer = setTimeout(schedule, 200);
    };

    scheduleWithFallback();

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
  }, [carouselKey, images.length]);

  if (!images.length) return null;

  return (
    <div className="catalog-brand-photo-gallery">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.06em] text-cyan-100/85">{t.galleryTitle}</h3>

      <div className="relative w-full" ref={wrapperRef}>
        <div
          ref={trackRef}
          className="catalog-brand-photo-track catalog-brand-photo-track--scroll w-full scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory overflow-x-auto"
        >
          {images.map((image) => (
            <figure key={image.id} data-brand-photo-slide className="catalog-brand-photo-slide snap-start">
              <Image
                src={image.imageSrc}
                alt={image.imageAlt}
                width={960}
                height={720}
                className="catalog-brand-photo-image"
              />
            </figure>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => scrollPhotos("prev")}
            className="catalog-carousel-btn landing-btn landing-btn-control"
            aria-label={t.prevPhoto}
            disabled={!showControls || !canScrollPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => scrollPhotos("next")}
            className="catalog-carousel-btn landing-btn landing-btn-control"
            aria-label={t.nextPhoto}
            disabled={!showControls || !canScrollNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CatalogBrandModal({ brand, locale, onClose }: CatalogBrandModalProps) {
  const t = labels[locale];
  const modalLogoSrc = getCatalogBrandLogoFull(brand.name) ?? brand.logoSrc;
  const hasOverview = Boolean(brand.overview?.trim());
  const shouldShowGallery = brand.category === "truck";
  const galleryImages = useMemo<CatalogBrandGalleryItem[]>(() => {
    if (!shouldShowGallery) return [];

    const seen = new Set<string>();
    return (brand.galleryImages ?? []).filter((image) => {
      if (!image.imageSrc || seen.has(image.imageSrc)) return false;
      seen.add(image.imageSrc);
      return true;
    });
  }, [brand.galleryImages, shouldShowGallery]);

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90dvh] gap-0 overflow-hidden border border-cyan-200/15 bg-background/95 p-0 sm:max-w-2xl lg:max-w-[52rem]">
        <DialogTitle className="sr-only">{brand.name}</DialogTitle>
        <DialogDescription className="sr-only">
          {hasOverview ? brand.overview : brand.tagline || brand.name}
        </DialogDescription>

        <div className="catalog-brand-modal-header relative overflow-hidden px-6 py-6 lg:px-8 lg:py-7">
          <div className="catalog-brand-card-media-glow absolute inset-0" aria-hidden="true" />

          <div className="relative z-10 space-y-3">
            {modalLogoSrc ? (
              <Image
                src={modalLogoSrc}
                alt={brand.name}
                width={160}
                height={56}
                style={{ width: "auto" }}
                className="catalog-brand-modal-logo-mark h-12 max-w-[10rem] object-contain object-left sm:h-14 sm:max-w-[12rem]"
                unoptimized={modalLogoSrc.endsWith(".svg")}
              />
            ) : (
              <h2 className="catalog-brand-modal-title">{brand.name}</h2>
            )}

          </div>
        </div>

        <div className="max-h-[calc(90dvh-5.75rem)] space-y-6 overflow-y-auto p-5 sm:p-6 lg:p-7">
          {hasOverview ? (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.06em] text-cyan-100/85">{t.overview}</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{brand.overview}</p>
            </div>
          ) : null}

          {shouldShowGallery ? <BrandPhotoCarousel images={galleryImages} labels={t} /> : null}

          <p className="rounded-xl border border-cyan-200/12 bg-cyan-200/5 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
            {t.note}
          </p>

          <div className="border-t border-cyan-200/12 pt-6">
            <CtaFormModal locale={locale} entryPoint="catalog" brandName={brand.name}>
              <Button type="button" className="landing-btn landing-btn-primary w-full">
                {t.quoteCta}
              </Button>
            </CtaFormModal>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
