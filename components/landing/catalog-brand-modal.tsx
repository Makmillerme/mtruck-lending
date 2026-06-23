"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CtaFormModal } from "@/components/landing/cta-form-modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { CatalogBodyTypeOffering } from "@/lib/catalog-brands";
import { getCatalogBrandLogoFull } from "@/lib/catalog-brand-logo";
import type { Locale } from "@/lib/locale";

export type CatalogBrandCard = {
  id: string;
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

type BrandGalleryImage = {
  id: string;
  imageSrc: string;
  imageAlt: string;
};

function BrandPhotoCarousel({ images, labels: t }: { images: BrandGalleryImage[]; labels: ModalLabels }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const showControls = images.length > 1;

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    setCanScrollPrev(track.scrollLeft > 1);
    setCanScrollNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
  }, []);

  const scrollPhotos = useCallback((direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    const firstSlide = track.querySelector<HTMLElement>("[data-brand-photo-slide]");
    const distance = firstSlide?.offsetWidth ? firstSlide.offsetWidth + 16 : track.clientWidth * 0.85;
    track.scrollBy({ left: direction === "next" ? distance : -distance, behavior: "smooth" });
  }, []);

  useEffect(() => {
    updateScrollState();
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [images.length, updateScrollState]);

  if (!images.length) return null;

  return (
    <div className="catalog-brand-photo-gallery">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.06em] text-cyan-100/85">{t.galleryTitle}</h3>

        {showControls ? (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="catalog-carousel-btn landing-btn landing-btn-control"
              aria-label={t.prevPhoto}
              disabled={!canScrollPrev}
              onClick={() => scrollPhotos("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="catalog-carousel-btn landing-btn landing-btn-control"
              aria-label={t.nextPhoto}
              disabled={!canScrollNext}
              onClick={() => scrollPhotos("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        ) : null}
      </div>

      <div ref={trackRef} className="catalog-brand-photo-track" onScroll={updateScrollState}>
        {images.map((image) => (
          <figure key={image.id} data-brand-photo-slide className="catalog-brand-photo-slide">
            <Image
              src={image.imageSrc}
              alt={image.imageAlt}
              width={720}
              height={405}
              className="catalog-brand-photo-image"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

export function CatalogBrandModal({ brand, locale, onClose }: CatalogBrandModalProps) {
  const t = labels[locale];
  const modalLogoSrc = getCatalogBrandLogoFull(brand.name) ?? brand.logoSrc;
  const hasOverview = Boolean(brand.overview?.trim());
  const galleryImages = useMemo<BrandGalleryImage[]>(() => {
    const seen = new Set<string>();
    return (brand.bodyTypeOfferings ?? [])
      .filter((offering) => {
        if (!offering.imageSrc || seen.has(offering.imageSrc)) return false;
        seen.add(offering.imageSrc);
        return true;
      })
      .map((offering) => ({
        id: offering.id,
        imageSrc: offering.imageSrc,
        imageAlt: offering.imageAlt,
      }));
  }, [brand.bodyTypeOfferings]);

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90dvh] gap-0 overflow-y-auto border border-cyan-200/15 bg-background/95 p-0 sm:max-w-2xl lg:max-w-3xl">
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
                className="catalog-brand-modal-logo-mark h-12 w-auto max-w-[10rem] object-contain object-left sm:h-14 sm:max-w-[12rem]"
              />
            ) : (
              <h2 className="catalog-brand-modal-title">{brand.name}</h2>
            )}

          </div>
        </div>

        <div className="space-y-8 p-6 lg:p-8">
          {hasOverview ? (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.06em] text-cyan-100/85">{t.overview}</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{brand.overview}</p>
            </div>
          ) : null}

          <BrandPhotoCarousel images={galleryImages} labels={t} />

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
