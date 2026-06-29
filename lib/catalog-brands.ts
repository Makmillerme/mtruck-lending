import type { Locale } from "@/lib/locale";
import { buildCatalogModelDescription } from "@/lib/catalog-model-description";
import {
  catalogBodyTypeItemsByBrandId,
  type CatalogBodyTypeItem,
} from "@/lib/catalog-body-type-items";

export type { CatalogBodyTypeItem } from "@/lib/catalog-body-type-items";

export type CatalogCategory = "truck" | "trailer";

type LocalizedText = Record<Locale, string>;
type LocalizedList = Record<Locale, string[]>;

export type CatalogBodyTypeOffering = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
};

export type CatalogBrandGalleryImage = {
  id: string;
  imageSrc: string;
  imageAlt: LocalizedText;
};

export type CatalogBrandGalleryItem = {
  id: string;
  imageSrc: string;
  imageAlt: string;
};

export type CatalogBrand = {
  id: string;
  category: CatalogCategory;
  name: string;
  tagline: LocalizedText;
  highlights: LocalizedList;
  overview: LocalizedText;
  bodyTypes: LocalizedList;
  configurations: LocalizedList;
  typicalSpecs: LocalizedList;
  bodyTypeItems?: CatalogBodyTypeItem[];
  galleryImages?: CatalogBrandGalleryImage[];
};

function galleryImage(brandId: string, id: string, filename: string, imageAlt: LocalizedText): CatalogBrandGalleryImage {
  return {
    id,
    imageSrc: `/brands_img/${brandId}/${filename}`,
    imageAlt,
  };
}

function galleryAlt(brandName: string): LocalizedText {
  return {
    en: `${brandName} commercial vehicle`,
    uk: `Комерційний автомобіль ${brandName}`,
    sk: `Komerčné vozidlo ${brandName}`,
    de: `${brandName} Nutzfahrzeug`,
  };
}

function brandGalleryImages(brandId: string, brandName: string, filenames: string[]): CatalogBrandGalleryImage[] {
  return filenames.map((filename, index) =>
    galleryImage(brandId, `${brandId}-${index + 1}`, filename, galleryAlt(brandName)),
  );
}

const rawCatalogBrands: CatalogBrand[] = [
  {
    id: "mercedes",
    category: "truck",
    name: "Mercedes-Benz",
    tagline: {
      en: "Actros, Atego, and Arocs for long-haul, regional, and construction fleets.",
      uk: "Actros, Atego та Arocs — для магістралі, регіону та будівельної логістики.",
      sk: "Actros, Atego a Arocs pre diaľkovú, regionálnu a stavebnú logistiku.",
      de: "Actros, Atego und Arocs für Fernverkehr, Regional- und Baustellenflotten.",
    },
    highlights: {
      en: ["Actros", "Atego", "Arocs"],
      uk: ["Actros", "Atego", "Arocs"],
      sk: ["Actros", "Atego", "Arocs"],
      de: ["Actros", "Atego", "Arocs"],
    },
    overview: {
      en: "Mercedes-Benz is one of the leaders in European commercial transport. We work with Mercedes-Benz equipment across configurations — from line-haul tractors to specialized chassis, box bodies, and container carriers.",
      uk: "Mercedes-Benz — один із лідерів європейського комерційного транспорту. Працюємо з технікою Mercedes-Benz у різних конфігураціях: від магістральних тягачів до спеціалізованих шасі, фургонів та контейнеровозів.",
      sk: "Mercedes-Benz patrí medzi lídrov európskej nákladnej dopravy. Pracujeme s technikou Mercedes-Benz v rôznych konfiguráciách — od diaľkových ťahačov po špecializované podvozky, skriňové nadstavby a kontajnerové vozidlá.",
      de: "Mercedes-Benz zählt zu den führenden Marken im europäischen Nutzfahrzeugverkehr. Wir arbeiten mit Mercedes-Benz-Fahrzeugen in vielfältigen Konfigurationen — von Fernverkehrszugmaschinen bis zu Spezialfahrgestellen, Kofferaufbauten und Containerfahrzeugen.",
    },
    galleryImages: brandGalleryImages("mercedes", "Mercedes-Benz", [
      "photo_2025-10-15_16-46-51.jpg",
      "photo_2025-12-01_17-34-03.jpg",
      "photo_2025-12-17_11-55-02.jpg",
      "photo_2026-01-27_13-28-21.jpg",
      "photo_2026-03-13_11-53-47.jpg",
      "photo_2026-03-13_11-55-27.jpg",
    ]),
    bodyTypes: {
      en: ["Actros long-haul tractors (4x2, 6x2)", "Arocs distribution and construction chassis"],
      uk: ["Магістральні Actros (4x2, 6x2)", "Розподільні та будівельні шасі Arocs"],
      sk: ["Diaľkové Actros (4x2, 6x2)", "Distribučné a stavebné podvozky Arocs"],
      de: ["Actros-Fernverkehrszugmaschinen (4x2, 6x2)", "Arocs-Verteilungs- und Baufahrgestelle"],
    },
    configurations: {
      en: ["GigaSpace and StreamSpace sleeper cabs", "PowerShift and manual transmissions", "Predictive Powertrain Control and fleet telematics"],
      uk: ["Спальні кабіни GigaSpace і StreamSpace", "КПП PowerShift і механічні", "Predictive Powertrain Control і телематика"],
      sk: ["Spacie kabíny GigaSpace a StreamSpace", "Prevodovky PowerShift a manuálne", "Predictive Powertrain Control a telematika"],
      de: ["GigaSpace- und StreamSpace-Schlafkabinen", "PowerShift- und Schaltgetriebe", "Predictive Powertrain Control und Flotten-Telematik"],
    },
    typicalSpecs: {
      en: ["Engine power from 420 to 530 hp", "Fleet-oriented configuration", "Full air suspension and disc brakes", "Pre-handover condition overview"],
      uk: ["Потужність двигуна від 420 до 530 к.с.", "Конфігурація під автопарк", "Повна пневмопідвіска та дискові гальма", "Огляд стану перед передачею"],
      sk: ["Výkon motora od 420 do 530 hp", "Konfigurácia pre flotilu", "Plné pneumatické odpruženie a kotúčové brzdy", "Prehľad stavu pred odovzdaním"],
      de: ["Motorleistung von 420 bis 530 PS", "Fuhrparkorientierte Konfiguration", "Vollluftfederung und Scheibenbremsen", "Zustandsübersicht vor Übergabe"],
    },
  },
  {
    id: "man",
    category: "truck",
    name: "MAN",
    tagline: {
      en: "Long-haul and distribution tractors from the TGX and TGS lines.",
      uk: "Магістральні та розподільні тягачі ліній TGX і TGS.",
      sk: "Magistrálne a distribučné ťahače radov TGX a TGS.",
      de: "Fernverkehrs- und Verteilungszugmaschinen der Baureihen TGX und TGS.",
    },
    highlights: {
      en: ["TGX", "TGS", "Fleet"],
      uk: ["TGX", "TGS", "Автопарк"],
      sk: ["TGX", "TGS", "Flotila"],
      de: ["TGX", "TGS", "Fuhrpark"],
    },
    overview: {
      en: "MAN is one of the leaders in European commercial transport. We work with MAN equipment across configurations — from line-haul tractors to specialized chassis, box bodies, and container carriers.",
      uk: "MAN — один із лідерів європейського комерційного транспорту. Працюємо з технікою MAN у різних конфігураціях: від магістральних тягачів до спеціалізованих шасі, фургонів та контейнеровозів.",
      sk: "MAN patrí medzi lídrov európskej nákladnej dopravy. Pracujeme s technikou MAN v rôznych konfiguráciách — od diaľkových ťahačov po špecializované podvozky, skriňové nadstavby a kontajnerové vozidlá.",
      de: "MAN zählt zu den führenden Marken im europäischen Nutzfahrzeugverkehr. Wir arbeiten mit MAN-Fahrzeugen in vielfältigen Konfigurationen — von Fernverkehrszugmaschinen bis zu Spezialfahrgestellen, Kofferaufbauten und Containerfahrzeugen.",
    },
    galleryImages: brandGalleryImages("man", "MAN", [
      "photo_2025-11-14_10-22-39.jpg",
      "photo_2025-12-02_12-23-24.jpg",
      "photo_2025-12-02_13-02-26.jpg",
      "photo_2025-12-04_14-43-06.jpg",
      "photo_2025-12-23_15-29-46.jpg",
      "photo_2026-02-17_12-06-33.jpg",
      "photo_2026-02-17_12-08-27.jpg",
      "photo_2026-02-17_12-09-33.jpg",
      "photo_2026-02-17_12-10-42.jpg",
      "photo_2026-03-13_12-00-08.jpg",
      "photo_2026-03-24_15-06-43.jpg",
      "photo_2026-03-24_15-57-09.jpg",
      "photo_2026-06-04_12-33-27.jpg",
      "photo_2026-06-04_12-37-48.jpg",
      "photo_2026-06-09_12-09-32.jpg",
    ]),
    bodyTypes: {
      en: ["Tractor units (4x2, 6x2)", "Chassis for special superstructures"],
      uk: ["Тягачі (4x2, 6x2)", "Шасі під спеціальні надбудови"],
      sk: ["Ťahače (4x2, 6x2)", "Podvozky pre špeciálne nadstavby"],
      de: ["Zugmaschinen (4x2, 6x2)", "Fahrgestelle für Spezialaufbauten"],
    },
    configurations: {
      en: ["XLX / GX sleeper cabs", "Automatic and manual transmissions", "Retarder and fleet telematics options"],
      uk: ["Спальні кабіни XLX / GX", "Автоматичні та механічні КПП", "Retarder і телематика для автопарків"],
      sk: ["Spacie kabíny XLX / GX", "Automatické a manuálne prevodovky", "Retarder a telematika pre vozové parky"],
      de: ["XLX- / GX-Schlafkabinen", "Automatik- und Schaltgetriebe", "Retarder und Flotten-Telematik"],
    },
    typicalSpecs: {
      en: ["Engine power from 400 to 510 hp", "Fleet-oriented configuration", "Air suspension and disc brakes", "Key condition information"],
      uk: ["Потужність двигуна від 400 до 510 к.с.", "Конфігурація під автопарк", "Пневмопідвіска та дискові гальма", "Ключова інформація про стан"],
      sk: ["Výkon motora od 400 do 510 hp", "Konfigurácia pre flotilu", "Pneumatické odpruženie a kotúčové brzdy", "Kľúčové informácie o stave"],
      de: ["Motorleistung von 400 bis 510 PS", "Fuhrparkorientierte Konfiguration", "Luftfederung und Scheibenbremsen", "Wichtige Zustandsinformationen"],
    },
  },
  {
    id: "scania",
    category: "truck",
    name: "Scania",
    tagline: {
      en: "R-series and S-series tractors for efficient long-distance transport.",
      uk: "Тягачі серій R і S для ефективних дальніх перевезень.",
      sk: "Ťahače radov R a S pre efektívnu diaľkovú dopravu.",
      de: "R- und S-Serie Zugmaschinen für effizienten Fernverkehr.",
    },
    highlights: {
      en: ["R-series", "S-series", "Opticruise"],
      uk: ["R-series", "S-series", "Opticruise"],
      sk: ["R-series", "S-series", "Opticruise"],
      de: ["R-series", "S-series", "Opticruise"],
    },
    overview: {
      en: "Scania is one of the leaders in European commercial transport. We work with Scania equipment across configurations — from line-haul tractors to specialized chassis, box bodies, and container carriers — for company fleet needs.",
      uk: "Scania — один із лідерів європейського комерційного транспорту. Працюємо з технікою Scania у різних конфігураціях: від магістральних тягачів до спеціалізованих шасі, фургонів та контейнеровозів для потреб автопарків.",
      sk: "Scania patrí medzi lídrov európskej nákladnej dopravy. Pracujeme s technikou Scania v rôznych konfiguráciách — od diaľkových ťahačov po špecializované podvozky, skriňové nadstavby a kontajnerové vozidlá pre potreby flotíl.",
      de: "Scania zählt zu den führenden Marken im europäischen Nutzfahrzeugverkehr. Wir arbeiten mit Scania-Fahrzeugen in vielfältigen Konfigurationen — von Fernverkehrszugmaschinen bis zu Spezialfahrgestellen, Kofferaufbauten und Containerfahrzeugen für Fuhrparkbedarf.",
    },
    galleryImages: brandGalleryImages("scania", "Scania", [
      "photo_2025-09-10_10-23-20.jpg",
    ]),
    bodyTypes: {
      en: ["High-roof and normal-roof tractors", "6x2 and 4x2 axle layouts"],
      uk: ["Тягачі з високою та звичайною кабіною", "Конфігурації осей 6x2 та 4x2"],
      sk: ["Ťahače s vysokou a bežnou strechou kabíny", "Nápravové konfigurácie 6x2 a 4x2"],
      de: ["Zugmaschinen mit Hochdach- und Normalkabine", "Achskonfigurationen 6x2 und 4x2"],
    },
    configurations: {
      en: ["Opticruise gearbox", "Retarder and adaptive cruise options", "P-disc and air-suspended cabs"],
      uk: ["КПП Opticruise", "Retarder і адаптивний круїз-контроль", "P-disc і кабіни з пневмопідвіскою"],
      sk: ["Prevodovka Opticruise", "Retarder a adaptívny tempomat", "P-disc a kabíny s pneumatickým odpružením"],
      de: ["Opticruise-Getriebe", "Retarder und adaptiver Tempomat", "P-disc und luftgefederte Kabinen"],
    },
    typicalSpecs: {
      en: ["450–500 hp engine range", "Low-deck or regular fifth wheel height", "Fleet-oriented configurations", "Business-ready cooperation options"],
      uk: ["Діапазон потужності 450–500 к.с.", "Низька або звичайна висота сідла", "Конфігурації під автопарк", "Варіанти співпраці для бізнесу"],
      sk: ["Výkonový rozsah 450–500 hp", "Nízka alebo bežná výška sedla", "Konfigurácie pre flotilu", "Možnosti spolupráce pre biznis"],
      de: ["Leistungsspanne 450–500 PS", "Niedrige oder reguläre Sattelhöhe", "Fuhrparkorientierte Konfigurationen", "Kooperationsoptionen für Unternehmen"],
    },
  },
  {
    id: "daf",
    category: "truck",
    name: "DAF",
    tagline: {
      en: "XF and CF tractors built for fuel efficiency and driver comfort.",
      uk: "Тягачі XF і CF з акцентом на економію палива та комфорт водія.",
      sk: "Ťahače XF a CF s dôrazom na úsporu paliva a komfort vodiča.",
      de: "XF- und CF-Zugmaschinen mit Fokus auf Kraftstoffeffizienz und Fahrerkomfort.",
    },
    highlights: {
      en: ["XF", "CF", "Fleet"],
      uk: ["XF", "CF", "Автопарк"],
      sk: ["XF", "CF", "Flotila"],
      de: ["XF", "CF", "Fuhrpark"],
    },
    overview: {
      en: "DAF is one of the leaders in European commercial transport. We work with DAF equipment across configurations — from line-haul tractors to specialized chassis, box bodies, and container carriers.",
      uk: "DAF — один із лідерів європейського комерційного транспорту. Працюємо з технікою DAF у різних конфігураціях: від магістральних тягачів до спеціалізованих шасі, фургонів та контейнеровозів.",
      sk: "DAF patrí medzi lídrov európskej nákladnej dopravy. Pracujeme s technikou DAF v rôznych konfiguráciách — od diaľkových ťahačov po špecializované podvozky, skriňové nadstavby a kontajnerové vozidlá.",
      de: "DAF zählt zu den führenden Marken im europäischen Nutzfahrzeugverkehr. Wir arbeiten mit DAF-Fahrzeugen in vielfältigen Konfigurationen — von Fernverkehrszugmaschinen bis zu Spezialfahrgestellen, Kofferaufbauten und Containerfahrzeugen.",
    },
    galleryImages: brandGalleryImages("daf", "DAF", [
      "photo_2026-06-04_12-32-19.jpg",
      "photo_2026-06-04_12-32-48.jpg",
    ]),
    bodyTypes: {
      en: ["XF long-haul tractors", "CF distribution and regional chassis"],
      uk: ["Магістральні XF", "Розподільні та регіональні шасі CF"],
      sk: ["Magistrálne XF", "Distribučné a regionálne podvozky CF"],
      de: ["XF-Fernverkehrszugmaschinen", "CF-Verteilungs- und Regionalfahrgestelle"],
    },
    configurations: {
      en: ["Super Space Cab and sleeper options", "PACCAR MX engine range", "Adaptive cruise and lane assist packages"],
      uk: ["Кабіни Super Space Cab і зі спальним місцем", "Двигуни PACCAR MX", "Adaptive cruise і lane assist"],
      sk: ["Kabíny Super Space Cab a so spacím miestom", "Motory PACCAR MX", "Adaptive cruise a lane assist"],
      de: ["Super Space Cab- und Schlafkabinen", "PACCAR-MX-Motorenpalette", "Adaptive Cruise Control und Spurhalteassistent"],
    },
    typicalSpecs: {
      en: ["430–530 hp typical range", "Fleet-oriented configuration", "Air suspension", "Key technical parameters"],
      uk: ["Типовий діапазон 430–530 к.с.", "Конфігурація під автопарк", "Пневмопідвіска", "Основні технічні параметри"],
      sk: ["Typický rozsah 430–530 hp", "Konfigurácia pre flotilu", "Pneumatické odpruženie", "Hlavné technické parametre"],
      de: ["Typischer Bereich 430–530 PS", "Fuhrparkorientierte Konfiguration", "Luftfederung", "Wichtige technische Parameter"],
    },
  },
  {
    id: "volvo",
    category: "truck",
    name: "Volvo",
    tagline: {
      en: "FH and FM tractors with I-Shift for modern European fleets.",
      uk: "Тягачі FH і FM з I-Shift для сучасних європейських автопарків.",
      sk: "Ťahače FH a FM s I-Shift pre moderné európske vozové parky.",
      de: "FH- und FM-Zugmaschinen mit I-Shift für moderne europäische Fuhrparks.",
    },
    highlights: {
      en: ["FH", "FM", "I-Shift"],
      uk: ["FH", "FM", "I-Shift"],
      sk: ["FH", "FM", "I-Shift"],
      de: ["FH", "FM", "I-Shift"],
    },
    overview: {
      en: "Volvo is one of the leaders in European commercial transport. We work with Volvo equipment across configurations — from line-haul tractors to specialized chassis, box bodies, and container carriers.",
      uk: "Volvo — один із лідерів європейського комерційного транспорту. Працюємо з технікою Volvo у різних конфігураціях: від магістральних тягачів до спеціалізованих шасі, фургонів та контейнеровозів.",
      sk: "Volvo patrí medzi lídrov európskej nákladnej dopravy. Pracujeme s technikou Volvo v rôznych konfiguráciách — od diaľkových ťahačov po špecializované podvozky, skriňové nadstavby a kontajnerové vozidlá.",
      de: "Volvo zählt zu den führenden Marken im europäischen Nutzfahrzeugverkehr. Wir arbeiten mit Volvo-Fahrzeugen in vielfältigen Konfigurationen — von Fernverkehrszugmaschinen bis zu Spezialfahrgestellen, Kofferaufbauten und Containerfahrzeugen.",
    },
    galleryImages: brandGalleryImages("volvo", "Volvo", [
      "photo_2025-12-16_15-13-37.jpg",
    ]),
    bodyTypes: {
      en: ["FH long-haul tractors", "FM regional and construction chassis"],
      uk: ["Магістральні FH", "Регіональні та будівельні шасі FM"],
      sk: ["Magistrálne FH", "Regionálne a stavebné podvozky FM"],
      de: ["FH-Fernverkehrszugmaschinen", "FM-Regional- und Baustellenfahrgestelle"],
    },
    configurations: {
      en: ["Globetrotter and sleeper cabs", "I-Shift automated transmission", "Volvo Dynamic Steering options"],
      uk: ["Кабіни Globetrotter і зі спальним місцем", "Автоматична КПП I-Shift", "Volvo Dynamic Steering"],
      sk: ["Kabíny Globetrotter a so spacím miestom", "Automatická prevodovka I-Shift", "Volvo Dynamic Steering"],
      de: ["Globetrotter- und Schlafkabinen", "I-Shift-Automatikgetriebe", "Volvo Dynamic Steering"],
    },
    typicalSpecs: {
      en: ["420–500 hp typical range", "Fleet-oriented configuration", "Air suspension on all axles", "Condition overview before handover"],
      uk: ["Типовий діапазон 420–500 к.с.", "Конфігурація під автопарк", "Пневмопідвіска всіх осей", "Огляд стану перед передачею"],
      sk: ["Typický rozsah 420–500 hp", "Konfigurácia pre flotilu", "Pneumatické odpruženie všetkých náprav", "Prehľad stavu pred odovzdaním"],
      de: ["Typischer Bereich 420–500 PS", "Fuhrparkorientierte Konfiguration", "Luftfederung an allen Achsen", "Zustandsübersicht vor Übergabe"],
    },
  },
  {
    id: "renault",
    category: "truck",
    name: "Renault",
    tagline: {
      en: "T and C range tractors for versatile European transport operations.",
      uk: "Тягачі ліній T і C для різноманітних європейських перевезень.",
      sk: "Ťahače radov T a C pre rôznorodú európsku prepravu.",
      de: "T- und C-Serie Zugmaschinen für vielseitigen europäischen Transport.",
    },
    highlights: {
      en: ["T High", "T", "C"],
      uk: ["T High", "T", "C"],
      sk: ["T High", "T", "C"],
      de: ["T High", "T", "C"],
    },
    overview: {
      en: "Renault Trucks is one of the leaders in European commercial transport. We work with Renault equipment across configurations — from line-haul tractors to specialized chassis, box bodies, and container carriers.",
      uk: "Renault Trucks — один із лідерів європейського комерційного транспорту. Працюємо з технікою Renault у різних конфігураціях: від магістральних тягачів до спеціалізованих шасі, фургонів та контейнеровозів.",
      sk: "Renault Trucks patrí medzi lídrov európskej nákladnej dopravy. Pracujeme s technikou Renault v rôznych konfiguráciách — od diaľkových ťahačov po špecializované podvozky, skriňové nadstavby a kontajnerové vozidlá.",
      de: "Renault Trucks zählt zu den führenden Marken im europäischen Nutzfahrzeugverkehr. Wir arbeiten mit Renault-Fahrzeugen in vielfältigen Konfigurationen — von Fernverkehrszugmaschinen bis zu Spezialfahrgestellen, Kofferaufbauten und Containerfahrzeugen.",
    },
    galleryImages: brandGalleryImages("renault", "Renault Trucks", [
      "IMG-20260625-WA0010.jpg",
      "IMG-20260625-WA0012(1).jpg",
      "IMG-20260625-WA0029.jpg",
      "IMG-20260625-WA0030.jpg",
      "IMG-20260625-WA0053.jpg",
      "IMG-20260625-WA0084.jpg",
      "IMG_20260625_151518.jpg",
    ]),
    bodyTypes: {
      en: ["T High long-haul tractors", "T distribution tractors", "C construction chassis"],
      uk: ["Магістральні T High", "Розподільні T", "Будівельні шасі C"],
      sk: ["Magistrálne T High", "Distribučné T", "Stavebné podvozky C"],
      de: ["T High-Fernverkehrszugmaschinen", "T-Verteilungszugmaschinen", "C-Baufahrgestelle"],
    },
    configurations: {
      en: ["Optidriver automated transmission", "Sleeper and day cab variants", "Fleet telematics packages"],
      uk: ["Автоматична КПП Optidriver", "Кабіни sleeper і day cab", "Телематика для автопарків"],
      sk: ["Automatická prevodovka Optidriver", "Varianty kabín sleeper a day cab", "Telematické balíky pre vozové parky"],
      de: ["Optidriver-Automatikgetriebe", "Sleeper- und Day-Cab-Varianten", "Flotten-Telematikpakete"],
    },
    typicalSpecs: {
      en: ["440–520 hp typical range", "Fleet-oriented configuration", "Air suspension on drive axles", "Condition overview before handover"],
      uk: ["Типовий діапазон 440–520 к.с.", "Конфігурація під автопарк", "Пневмопідвіска ведучих осей", "Огляд стану перед передачею"],
      sk: ["Typický rozsah 440–520 hp", "Konfigurácia pre flotilu", "Pneumatické odpruženie hnacích náprav", "Prehľad stavu pred odovzdaním"],
      de: ["Typischer Bereich 440–520 PS", "Fuhrparkorientierte Konfiguration", "Luftfederung an Antriebsachsen", "Zustandsübersicht vor Übergabe"],
    },
  },
  {
    id: "schmitz",
    category: "trailer",
    name: "Schmitz",
    tagline: {
      en: "Cargobull semi-trailers for curtainsider, box, and refrigerated transport.",
      uk: "Напівпричепи Cargobull для бортових, фургонних і рефрижераторних перевезень.",
      sk: "Návesy Cargobull pre plachtové, skriňové a chladiarenské prepravy.",
      de: "Cargobull-Sattelauflieger für Plane, Koffer und Kühltransport.",
    },
    highlights: {
      en: ["Curtainsider", "Box", "Reefer"],
      uk: ["Борт", "Фургон", "Реф"],
      sk: ["Plachtový", "Skriňový", "Chladiarenský"],
      de: ["Plane", "Koffer", "Kühlauflieger"],
    },
    overview: {
      en: "Schmitz Cargobull is a leading European trailer manufacturer. We work with semi-trailers configured for general cargo, temperature-controlled goods, and fleet logistics.",
      uk: "Schmitz Cargobull — провідний європейський виробник напівпричепів. Працюємо з напівпричепами для загальних, температурних і флотських перевезень.",
      sk: "Schmitz Cargobull je popredný európsky výrobca návesov. Pracujeme s návesmi pre všeobecnú nákladnú dopravu, teplotne riadený tovar a logistiku firemných flotíl.",
      de: "Schmitz Cargobull ist ein führender europäischer Aufliegerhersteller. Wir arbeiten mit Sattelaufliegern für Generalcargo, temperaturgeführte Güter und Flottenlogistik.",
    },
    bodyTypes: {
      en: ["Curtainsider (S.KO)", "Box semi-trailers", "Refrigerated S.KO COOL"],
      uk: ["Бортові (S.KO)", "Фургонні напівпричепи", "Рефрижераторні S.KO COOL"],
      sk: ["Plachtové (S.KO)", "Skriňové návesy", "Chladiarenské S.KO COOL"],
      de: ["Planenauflieger (S.KO)", "Kofferauflieger", "Kühlauflieger S.KO COOL"],
    },
    configurations: {
      en: ["Lift axle and steering axle options", "XL code and pallet capacity variants", "Disc brakes and telematics-ready"],
      uk: ["Підйомна та керована вісь", "Варіанти XL code і палетомісткості", "Дискові гальма та телематика"],
      sk: ["Zdvíhacia a riadená náprava", "Varianty XL code a paletová kapacita", "Kotúčové brzdy a pripravenosť na telematiku"],
      de: ["Liftachse und Lenkachse", "XL-Code- und Palettenkapazitätsvarianten", "Scheibenbremsen und telematikfähig"],
    },
    typicalSpecs: {
      en: ["3-axle layout", "Payload-oriented floor and wall build", "BPW or SAF running gear", "Axle and brake options"],
      uk: ["3-осьова схема", "Підлога та стінки під профіль вантажу", "Ходова BPW або SAF", "Варіанти осей і гальм"],
      sk: ["3-nápravová konfigurácia", "Podlaha a steny optimalizované pre náklad", "Nápravy BPW alebo SAF", "Možnosti náprav a bŕzd"],
      de: ["3-Achsen-Layout", "Nutzlasterorientierter Boden- und Wandaufbau", "BPW- oder SAF-Fahrwerke", "Achsen- und Bremsoptionen"],
    },
  },
  {
    id: "krone",
    category: "trailer",
    name: "Krone",
    tagline: {
      en: "Dry freight, curtainsider, and box trailers for European logistics.",
      uk: "Напівпричепи для сухих, бортових і фургонних перевезень.",
      sk: "Návesy pre suchú, plachtovú a skriňovú prepravu v európskej logistike.",
      de: "Auflieger für Trocken-, Planen- und Koffertransport in der europäischen Logistik.",
    },
    highlights: {
      en: ["Profi Liner", "Dry Liner", "Box Liner"],
      uk: ["Profi Liner", "Dry Liner", "Box Liner"],
      sk: ["Profi Liner", "Dry Liner", "Box Liner"],
      de: ["Profi Liner", "Dry Liner", "Box Liner"],
    },
    overview: {
      en: "Krone trailers are widely used across European transport networks. We work with models suited to dry cargo, curtainsider operations, and mixed fleet requirements.",
      uk: "Krone широко використовують у європейській логістиці. Працюємо з моделями для сухих вантажів, бортових перевезень і змішаних автопарків.",
      sk: "Návesy Krone sa široko používajú v európskej dopravnej sieti. Pracujeme s modelmi vhodnými pre suchý náklad, plachtovú prevádzku a zmiešané požiadavky flotíl.",
      de: "Krone-Auflieger sind in europäischen Transportnetzen weit verbreitet. Wir arbeiten mit Modellen für Trockenfracht, Planenverkehr und gemischte Flottenanforderungen.",
    },
    bodyTypes: {
      en: ["Curtainsider Profi Liner", "Dry freight Dry Liner", "Box Liner with reinforced floor"],
      uk: ["Бортовий Profi Liner", "Сухий вантаж Dry Liner", "Box Liner із посиленою підлогою"],
      sk: ["Plachtový Profi Liner", "Suchý náklad Dry Liner", "Box Liner so zosilnenou podlahou"],
      de: ["Planenauflieger Profi Liner", "Trockenfracht Dry Liner", "Box Liner mit verstärktem Boden"],
    },
    configurations: {
      en: ["Regular and Mega height options", "Lift axle configurations", "Multi-lock and XL body setups"],
      uk: ["Звичайна та Mega висота", "Підйомні осі", "Multi-lock і XL компонування кузова"],
      sk: ["Bežná a Mega výška", "Konfigurácie so zdvíhacou nápravou", "Multi-lock a XL riešenia nadstavby"],
      de: ["Reguläre und Mega-Höhe", "Liftachs-Konfigurationen", "Multi-lock- und XL-Aufbaulösungen"],
    },
    typicalSpecs: {
      en: ["Typical 3-axle semi-trailer", "Aluminium or steel wall options", "Disc brake systems", "Key technical parameters"],
      uk: ["Типовий 3-осьовий напівпричіп", "Алюмінієві або сталеві стінки", "Дискові гальма", "Основні технічні параметри"],
      sk: ["Typický 3-nápravový náves", "Hliníkové alebo oceľové steny", "Kotúčové brzdy", "Hlavné technické parametre"],
      de: ["Typischer 3-Achsen-Sattelauflieger", "Aluminium- oder Stahlwände", "Scheibenbremsen", "Wichtige technische Parameter"],
    },
  },
  {
    id: "koegel",
    category: "trailer",
    name: "Kögel",
    tagline: {
      en: "Lightweight semi-trailers and full trailers for versatile cargo profiles.",
      uk: "Легкі напівпричепи та причепи для різних типів вантажів.",
      sk: "Ľahké návesy a prívesy pre rôzne typy nákladov.",
      de: "Leichte Sattel- und Vollauflieger für vielseitige Frachtprofile.",
    },
    highlights: {
      en: ["Cargo", "Port", "Lightweight"],
      uk: ["Cargo", "Port", "Легка конструкція"],
      sk: ["Cargo", "Port", "Ľahká konštrukcia"],
      de: ["Cargo", "Port", "Leichtbau"],
    },
    overview: {
      en: "Kögel offers practical trailer solutions with a focus on payload and operating economy. We work with curtainsider, box, and platform configurations for European fleets.",
      uk: "Kögel пропонує практичні рішення з акцентом на корисне навантаження та економіку експлуатації. Працюємо з бортовими, фургонними та платформними конфігураціями для європейських автопарків.",
      sk: "Kögel ponúka praktické riešenia s dôrazom na užitočné zaťaženie a prevádzkovú ekonomiku. Pracujeme s plachtovými, skriňovými a platformovými konfiguráciami pre európske flotily.",
      de: "Kögel bietet praxisnahe Aufliegerlösungen mit Fokus auf Nutzlast und Wirtschaftlichkeit. Wir arbeiten mit Planen-, Koffer- und Plattformkonfigurationen für europäische Fuhrparks.",
    },
    bodyTypes: {
      en: ["Curtainsider Cargo", "Box and port semi-trailers", "Platform and low-loader trailers"],
      uk: ["Бортовий Cargo", "Фургонні та port напівпричепи", "Платформи та низькорамні причепи"],
      sk: ["Plachtový Cargo", "Skriňové a port návesy", "Platformy a nízkoplošné prívesy"],
      de: ["Planenauflieger Cargo", "Koffer- und Port-Sattelauflieger", "Plattform- und Tiefladerauflieger"],
    },
    configurations: {
      en: ["Lightweight chassis options", "Multi-chamber reefer where applicable", "Custom axle and brake packages"],
      uk: ["Легкі шасі", "Багатокамерні рефрижератори за потреби", "Конфігурації осей і гальм"],
      sk: ["Ľahké podvozky", "Viac-komorové chladničky podľa potreby", "Vlastné konfigurácie náprav a bŕzd"],
      de: ["Leichtbau-Fahrgestelle", "Mehrkammer-Kühlung wo zutreffend", "Individuelle Achs- und Bremspakete"],
    },
    typicalSpecs: {
      en: ["Optimized tare weight", "Common European coupling height", "BPW / SAF axles", "Condition summary before handover"],
      uk: ["Оптимізована власна вага", "Поширена європейська висота сідла", "Осі BPW / SAF", "Опис стану перед передачею"],
      sk: ["Optimalizovaná vlastná hmotnosť", "Bežná európska výška spojky", "Nápravy BPW / SAF", "Zhrnutie stavu pred odovzdaním"],
      de: ["Optimiertes Leergewicht", "Gängige europäische Kupplungshöhe", "BPW- / SAF-Achsen", "Zustandsübersicht vor Übergabe"],
    },
  },
  {
    id: "wielton",
    category: "trailer",
    name: "Wielton",
    tagline: {
      en: "Polish-built semi-trailers for curtainsider, tipper, and platform operations.",
      uk: "Польські напівпричепи для бортових, самоскидних і платформних перевезень.",
      sk: "Poľské návesy pre plachtovú, sklápaciu a platformovú prevádzku.",
      de: "Polnische Auflieger für Planen-, Kipper- und Plattformbetrieb.",
    },
    highlights: {
      en: ["NS3", "NW3", "Tipper"],
      uk: ["NS3", "NW3", "Самоскид"],
      sk: ["NS3", "NW3", "Sklápač"],
      de: ["NS3", "NW3", "Kipper"],
    },
    overview: {
      en: "Wielton is one of Europe's largest trailer manufacturers. We work with curtainsider, tipper, and platform models configured for general cargo and construction logistics.",
      uk: "Wielton — один із найбільших виробників причепів у Європі. Працюємо з бортовими, самоскидними та платформними моделями для загальних і будівельних вантажів.",
      sk: "Wielton je jeden z najväčších výrobcov návesov v Európe. Pracujeme s plachtovými, sklápacími a platformovými modelmi pre všeobecnú nákladnú a stavebnú logistiku.",
      de: "Wielton ist einer der größten Aufliegerhersteller Europas. Wir arbeiten mit Planen-, Kipper- und Plattformmodellen für General- und Baustellenlogistik.",
    },
    bodyTypes: {
      en: ["Curtainsider NS3/NW3", "Tipper semi-trailers", "Platform and low-bed trailers"],
      uk: ["Бортові NS3/NW3", "Самоскидні напівпричепи", "Платформи та низькорамники"],
      sk: ["Plachtové NS3/NW3", "Sklápacie návesy", "Platformy a nízkoplošné prívesy"],
      de: ["Planenauflieger NS3/NW3", "Kippsattelauflieger", "Plattform- und Tiefladerauflieger"],
    },
    configurations: {
      en: ["Lift axle and steering axle options", "XL code and reinforced floor variants", "Steel and aluminium wall builds"],
      uk: ["Підйомна та керована вісь", "XL code і посилена підлога", "Сталеві та алюмінієві стінки"],
      sk: ["Zdvíhacia a riadená náprava", "XL code a varianty so zosilnenou podlahou", "Oceľové a hliníkové steny"],
      de: ["Liftachse und Lenkachse", "XL-Code- und verstärkter-Boden-Varianten", "Stahl- und Aluminiumwände"],
    },
    typicalSpecs: {
      en: ["3-axle layout", "Disc brake systems", "BPW or SAF running gear", "Key technical parameters"],
      uk: ["3-осьова схема", "Дискові гальма", "Ходова BPW або SAF", "Основні технічні параметри"],
      sk: ["3-nápravová konfigurácia", "Kotúčové brzdy", "Nápravy BPW alebo SAF", "Hlavné technické parametre"],
      de: ["3-Achsen-Layout", "Scheibenbremsen", "BPW- oder SAF-Fahrwerke", "Wichtige technische Parameter"],
    },
  },
  {
    id: "lamberet",
    category: "trailer",
    name: "Lamberet",
    tagline: {
      en: "Refrigerated and insulated semi-trailers for temperature-controlled logistics.",
      uk: "Рефрижераторні та ізотермічні напівпричепи для температурних перевезень.",
      sk: "Chladiarenské a izotermické návesy pre teplotne riadenú logistiku.",
      de: "Kühl- und Isoliersattelauflieger für temperaturgeführte Logistik.",
    },
    highlights: {
      en: ["Reefer", "Multi-temp", "Insulated"],
      uk: ["Реф", "Multi-temp", "Ізотерм"],
      sk: ["Chladiarenský", "Multi-temp", "Izotermický"],
      de: ["Kühl", "Multi-temp", "Isoliert"],
    },
    overview: {
      en: "Lamberet specializes in refrigerated transport solutions. We work with multi-temperature and single-compartment reefers suited to food, pharma, and cold-chain logistics.",
      uk: "Lamberet спеціалізується на рефрижераторних рішеннях. Працюємо з одно- та багатотемпературними рефами для харчових, фармацевтичних і cold-chain перевезень.",
      sk: "Lamberet sa špecializuje na chladiarenské riešenia. Pracujeme s jedno- a viacteplotnými chladiarenskými návesmi pre potravinársku, farmaceutickú a cold-chain logistiku.",
      de: "Lamberet ist auf Kühltransport spezialisiert. Wir arbeiten mit Ein- und Mehrtemperatur-Kühlaufliegern für Lebensmittel-, Pharma- und Cold-Chain-Logistik.",
    },
    bodyTypes: {
      en: ["Single-compartment reefers", "Multi-temperature semi-trailers", "Insulated dry freight liners"],
      uk: ["Однокамерні рефи", "Багатотемпературні напівпричепи", "Ізотермічні фургони"],
      sk: ["Jednokomorové chladiarenské", "Viacteplotné návesy", "Izotermické vozidlá pre suchý náklad"],
      de: ["Einkammer-Kühlauflieger", "Mehrtemperatur-Sattelauflieger", "Isolierte Trockenfracht-Liner"],
    },
    configurations: {
      en: ["Carrier, Thermo King, or Daikin units", "Lift axle and tail-lift options", "Telematics and temperature monitoring"],
      uk: ["Агрегати Carrier, Thermo King або Daikin", "Підйомна вісь і гідроборт", "Телематика та моніторинг температури"],
      sk: ["Agregáty Carrier, Thermo King alebo Daikin", "Zdvíhacia náprava a hydraulická čelo", "Telematika a monitorovanie teploty"],
      de: ["Carrier-, Thermo King- oder Daikin-Aggregate", "Liftachse und Ladebordwand", "Telematik und Temperaturüberwachung"],
    },
    typicalSpecs: {
      en: ["3-axle refrigerated layout", "Temperature-focused configuration", "Insulated floor and wall build", "Cold-unit options before handover"],
      uk: ["3-осьова рефрижераторна схема", "Конфігурація під температурні перевезення", "Ізольована підлога та стінки", "Варіанти холодильного агрегату перед передачею"],
      sk: ["3-nápravová chladiarenská konfigurácia", "Konfigurácia pre teplotnú prepravu", "Izolovaná podlaha a steny", "Možnosti chladiacej jednotky pred odovzdaním"],
      de: ["3-Achsen-Kühllayout", "Konfiguration für temperaturgeführten Transport", "Isolierter Boden- und Wandaufbau", "Kühlaggregat-Optionen vor Übergabe"],
    },
  },
];

export const catalogBrands: CatalogBrand[] = rawCatalogBrands.map((brand) => {
  if (brand.bodyTypeItems?.length) return brand;
  const items = catalogBodyTypeItemsByBrandId[brand.id];
  return items ? { ...brand, bodyTypeItems: items } : brand;
});

function normalizeCatalogBrandName(brand: string) {
  return brand
    .toLowerCase()
    .normalize("NFKD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .replaceAll(/[^a-z0-9]+/g, " ")
    .trim();
}

export function getCatalogBrandByName(name: string): CatalogBrand | undefined {
  const normalized = normalizeCatalogBrandName(name);
  if (!normalized) return undefined;

  return catalogBrands.find((brand) => {
    const brandNormalized = normalizeCatalogBrandName(brand.name);
    return brand.id === normalized || brandNormalized === normalized || brandNormalized.startsWith(`${normalized} `);
  });
}

export function getCatalogBrandsByCategory(category: CatalogCategory): CatalogBrand[] {
  return catalogBrands.filter((brand) => brand.category === category);
}

export function pickLocalized<T extends LocalizedText | LocalizedList>(field: T, locale: Locale): T[Locale] {
  return field[locale] ?? field.en;
}

export function pickBodyTypeOfferings(
  items: CatalogBodyTypeItem[] | undefined,
  locale: Locale,
): CatalogBodyTypeOffering[] {
  if (!items?.length) return [];

  return items.map((item) => {
    const title = pickLocalized(item.title, locale);
    return {
      id: item.id,
      imageSrc: item.imageSrc,
      imageAlt: pickLocalized(item.imageAlt, locale),
      title,
      description: buildCatalogModelDescription(title, locale),
    };
  });
}

export function pickBrandGalleryImages(
  items: CatalogBrandGalleryImage[] | undefined,
  locale: Locale,
): CatalogBrandGalleryItem[] {
  if (!items?.length) return [];

  return items.map((item) => ({
    id: item.id,
    imageSrc: item.imageSrc,
    imageAlt: pickLocalized(item.imageAlt, locale),
  }));
}
