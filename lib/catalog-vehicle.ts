import type { Locale } from "@/lib/locale";
import { pickEntityLocale } from "@/lib/pick-locale";
import type { CatalogBrandCard } from "@/components/landing/catalog-brand-modal";
import { getCatalogBrandLogo, getCatalogBrandLogoKey } from "@/lib/catalog-brand-logo";
import type { CatalogBrand, CatalogCategory } from "@/lib/catalog-brands";
import { getCatalogBrandByName, pickBodyTypeOfferings, pickBrandGalleryImages, pickLocalized } from "@/lib/catalog-brands";

export type { CatalogCategory } from "@/lib/catalog-brands";

export type VehicleCatalogMeta = {
  bodyTypes?: Partial<Record<Locale, string[]>>;
  configurations?: Partial<Record<Locale, string[]>>;
  typicalSpecs?: Partial<Record<Locale, string[]>>;
};

export type CatalogVehicleRecord = {
  id: number;
  brand: string;
  category: string;
  specs: string[];
  tagEn: string | null;
  tagUk: string | null;
  tagSk?: string | null;
  tagDe?: string | null;
  tagPl?: string | null;
  descriptionEn: string | null;
  descriptionUk: string | null;
  descriptionSk?: string | null;
  descriptionDe?: string | null;
  descriptionPl?: string | null;
  catalogMeta: unknown;
  orderIndex?: number;
};

function listForLocale(meta: VehicleCatalogMeta | null, key: keyof VehicleCatalogMeta, locale: Locale): string[] {
  const list = meta?.[key]?.[locale];
  return Array.isArray(list) ? list.filter((item) => typeof item === "string" && item.trim()) : [];
}

export function parseVehicleCatalogMeta(value: unknown): VehicleCatalogMeta | null {
  if (!value || typeof value !== "object") return null;
  return value as VehicleCatalogMeta;
}

export function matchesCatalogCategory(vehicleCategory: string, tabKey: CatalogCategory) {
  if (tabKey === "truck") return vehicleCategory === "truck";
  return vehicleCategory === "trailer" || vehicleCategory === "van";
}

function vehicleCategoryToCatalogCategory(vehicleCategory: string): CatalogCategory {
  return vehicleCategory === "truck" ? "truck" : "trailer";
}

export function vehicleToCatalogBrandCard(vehicle: CatalogVehicleRecord, locale: Locale): CatalogBrandCard {
  const meta = parseVehicleCatalogMeta(vehicle.catalogMeta);

  const tagline = pickEntityLocale(locale, {
    en: vehicle.tagEn,
    uk: vehicle.tagUk,
    sk: vehicle.tagSk,
    de: vehicle.tagDe,
    pl: vehicle.tagPl,
  });

  const overview = pickEntityLocale(locale, {
    en: vehicle.descriptionEn,
    uk: vehicle.descriptionUk,
    sk: vehicle.descriptionSk,
    de: vehicle.descriptionDe,
    pl: vehicle.descriptionPl,
  });

  const staticBrand = getCatalogBrandByName(vehicle.brand);

  return {
    id: String(vehicle.id),
    category: vehicleCategoryToCatalogCategory(vehicle.category),
    name: vehicle.brand,
    logoKey: getCatalogBrandLogoKey(vehicle.brand),
    logoSrc: getCatalogBrandLogo(vehicle.brand),
    tagline,
    highlights: vehicle.specs?.length ? vehicle.specs : [],
    overview,
    bodyTypes: listForLocale(meta, "bodyTypes", locale),
    configurations: listForLocale(meta, "configurations", locale),
    typicalSpecs: listForLocale(meta, "typicalSpecs", locale),
    bodyTypeOfferings: pickBodyTypeOfferings(staticBrand?.bodyTypeItems, locale),
    galleryImages: pickBrandGalleryImages(staticBrand?.galleryImages, locale),
  };
}

export function catalogBrandToCard(brand: CatalogBrand, locale: Locale): CatalogBrandCard {
  return {
    id: brand.id,
    category: brand.category,
    name: brand.name,
    logoKey: getCatalogBrandLogoKey(brand.name),
    logoSrc: getCatalogBrandLogo(brand.name),
    tagline: pickLocalized(brand.tagline, locale),
    highlights: pickLocalized(brand.highlights, locale),
    overview: pickLocalized(brand.overview, locale),
    bodyTypes: pickLocalized(brand.bodyTypes, locale),
    configurations: pickLocalized(brand.configurations, locale),
    typicalSpecs: pickLocalized(brand.typicalSpecs, locale),
    bodyTypeOfferings: pickBodyTypeOfferings(brand.bodyTypeItems, locale),
    galleryImages: pickBrandGalleryImages(brand.galleryImages, locale),
  };
}
