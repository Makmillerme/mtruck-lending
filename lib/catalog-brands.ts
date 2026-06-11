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
};

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
      en: "Mercedes-Benz is one of the leaders in European commercial transport. We procure and supply Mercedes-Benz equipment across configurations — from line-haul tractors to specialized chassis, box bodies, and container carriers. All units are sourced from official EU leasing platforms and delivered with full service history.",
      uk: "Mercedes-Benz — один із лідерів європейського комерційного транспорту. Ми забезпечуємо прямий викуп та постачання техніки Mercedes-Benz у різних конфігураціях: від магістральних тягачів до спеціалізованих шасі, фургонів та контейнеровозів. Уся техніка викуповується з офіційних лізингових майданчиків ЄС та постачається з повною сервісною історією.",
      sk: "Mercedes-Benz patrí medzi lídrov európskej nákladnej dopravy. Zabezpečujeme priamy výkup a dodávky techniky Mercedes-Benz v rôznych konfiguráciách — od diaľkových ťahačov po špecializované podvozky, skriňové nadstavby a kontajnerové vozidlá. Všetka technika pochádza z oficiálnych lízingových platforiem EÚ s kompletnou servisnou históriou.",
      de: "Mercedes-Benz zählt zu den führenden Marken im europäischen Nutzfahrzeugverkehr. Wir beschaffen und liefern Mercedes-Benz-Fahrzeuge in vielfältigen Konfigurationen — von Fernverkehrszugmaschinen bis zu Spezialfahrgestellen, Kofferaufbauten und Containerfahrzeugen. Alle Einheiten stammen von offiziellen EU-Leasingplattformen mit vollständiger Servicehistorie.",
    },
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
      en: ["Engine power from 420 to 530 hp", "EURO 6 emission class", "Full air suspension and disc brakes", "Verified service history and pre-delivery inspection"],
      uk: ["Потужність двигуна від 420 до 530 к.с.", "Екологічний клас EURO 6", "Повна пневмопідвіска та дискові гальма", "Підтверджена сервісна історія та перевірка перед передачею"],
      sk: ["Výkon motora od 420 do 530 hp", "Emisná trieda EURO 6", "Plné pneumatické odpruženie a kotúčové brzdy", "Overená servisná história a kontrola pred odovzdaním"],
      de: ["Motorleistung von 420 bis 530 PS", "Abgasnorm EURO 6", "Vollluftfederung und Scheibenbremsen", "Verifizierte Servicehistorie und Abnahmeprüfung"],
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
      en: ["TGX", "TGS", "EURO 6"],
      uk: ["TGX", "TGS", "EURO 6"],
      sk: ["TGX", "TGS", "EURO 6"],
      de: ["TGX", "TGS", "EURO 6"],
    },
    overview: {
      en: "MAN is one of the leaders in European commercial transport. We procure and supply MAN equipment across configurations — from line-haul tractors to specialized chassis, box bodies, and container carriers. All units are sourced from official EU leasing platforms and delivered with full service history.",
      uk: "MAN — один із лідерів європейського комерційного транспорту. Ми забезпечуємо прямий викуп та постачання техніки MAN у різних конфігураціях: від магістральних тягачів до спеціалізованих шасі, фургонів та контейнеровозів. Уся техніка викуповується з офіційних лізингових майданчиків ЄС та постачається з повною сервісною історією.",
      sk: "MAN patrí medzi lídrov európskej nákladnej dopravy. Zabezpečujeme priamy výkup a dodávky techniky MAN v rôznych konfiguráciách — od diaľkových ťahačov po špecializované podvozky, skriňové nadstavby a kontajnerové vozidlá. Všetka technika pochádza z oficiálnych lízingových platforiem EÚ s kompletnou servisnou históriou.",
      de: "MAN zählt zu den führenden Marken im europäischen Nutzfahrzeugverkehr. Wir beschaffen und liefern MAN-Fahrzeuge in vielfältigen Konfigurationen — von Fernverkehrszugmaschinen bis zu Spezialfahrgestellen, Kofferaufbauten und Containerfahrzeugen. Alle Einheiten stammen von offiziellen EU-Leasingplattformen mit vollständiger Servicehistorie.",
    },
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
      en: ["Engine power from 400 to 510 hp", "EURO 6 emission class", "Air suspension and disc brakes", "Verified mileage and maintenance records"],
      uk: ["Потужність двигуна від 400 до 510 к.с.", "Екологічний клас EURO 6", "Пневмопідвіска та дискові гальма", "Підтверджений пробіг і сервісна документація"],
      sk: ["Výkon motora od 400 do 510 hp", "Emisná trieda EURO 6", "Pneumatické odpruženie a kotúčové brzdy", "Overený najazdený km a servisná dokumentácia"],
      de: ["Motorleistung von 400 bis 510 PS", "Abgasnorm EURO 6", "Luftfederung und Scheibenbremsen", "Verifizierter Kilometerstand und Wartungsnachweise"],
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
      en: "Scania is one of the leaders in European commercial transport. We procure and supply Scania equipment across configurations — from line-haul tractors to specialized chassis, box bodies, and container carriers. All units are sourced from official EU leasing platforms and delivered with full service history.",
      uk: "Scania — один із лідерів європейського комерційного транспорту. Ми забезпечуємо прямий викуп та постачання техніки Scania у різних конфігураціях: від магістральних тягачів до спеціалізованих шасі, фургонів та контейнеровозів. Уся техніка викуповується з офіційних лізингових майданчиків ЄС та постачається з повною сервісною історією.",
      sk: "Scania patrí medzi lídrov európskej nákladnej dopravy. Zabezpečujeme priamy výkup a dodávky techniky Scania v rôznych konfiguráciách — od diaľkových ťahačov po špecializované podvozky, skriňové nadstavby a kontajnerové vozidlá. Všetka technika pochádza z oficiálnych lízingových platforiem EÚ s kompletnou servisnou históriou.",
      de: "Scania zählt zu den führenden Marken im europäischen Nutzfahrzeugverkehr. Wir beschaffen und liefern Scania-Fahrzeuge in vielfältigen Konfigurationen — von Fernverkehrszugmaschinen bis zu Spezialfahrgestellen, Kofferaufbauten und Containerfahrzeugen. Alle Einheiten stammen von offiziellen EU-Leasingplattformen mit vollständiger Servicehistorie.",
    },
    bodyTypes: {
      en: ["High-roof and normal-roof tractors", "6x2 and 4x2 axle layouts"],
      uk: ["Тягачі з високою та стандартною кабіною", "Конфігурації осей 6x2 та 4x2"],
      sk: ["Ťahače s vysokou a štandardnou strechou kabíny", "Nápravové konfigurácie 6x2 a 4x2"],
      de: ["Zugmaschinen mit Hochdach- und Standardkabine", "Achskonfigurationen 6x2 und 4x2"],
    },
    configurations: {
      en: ["Opticruise gearbox", "Retarder and adaptive cruise options", "P-disc and air-suspended cabs"],
      uk: ["КПП Opticruise", "Retarder і адаптивний круїз-контроль", "P-disc і кабіни з пневмопідвіскою"],
      sk: ["Prevodovka Opticruise", "Retarder a adaptívny tempomat", "P-disc a kabíny s pneumatickým odpružením"],
      de: ["Opticruise-Getriebe", "Retarder und adaptiver Tempomat", "P-disc und luftgefederte Kabinen"],
    },
    typicalSpecs: {
      en: ["450–500 hp engine range", "EURO 6", "Low-deck and standard fifth wheel height", "Full import documentation package"],
      uk: ["Діапазон потужності 450–500 к.с.", "EURO 6", "Низька та стандартна висота сідла", "Повний пакет імпортної документації"],
      sk: ["Výkonový rozsah 450–500 hp", "EURO 6", "Nízky a štandardný odstup s sedla", "Kompletný balík importnej dokumentácie"],
      de: ["Leistungsspanne 450–500 PS", "EURO 6", "Niedrig- und Standard-Sattelhöhe", "Vollständiges Import-Dokumentationspaket"],
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
      en: ["XF", "CF", "EURO 6"],
      uk: ["XF", "CF", "EURO 6"],
      sk: ["XF", "CF", "EURO 6"],
      de: ["XF", "CF", "EURO 6"],
    },
    overview: {
      en: "DAF is one of the leaders in European commercial transport. We procure and supply DAF equipment across configurations — from line-haul tractors to specialized chassis, box bodies, and container carriers. All units are sourced from official EU leasing platforms and delivered with full service history.",
      uk: "DAF — один із лідерів європейського комерційного транспорту. Ми забезпечуємо прямий викуп та постачання техніки DAF у різних конфігураціях: від магістральних тягачів до спеціалізованих шасі, фургонів та контейнеровозів. Уся техніка викуповується з офіційних лізингових майданчиків ЄС та постачається з повною сервісною історією.",
      sk: "DAF patrí medzi lídrov európskej nákladnej dopravy. Zabezpečujeme priamy výkup a dodávky techniky DAF v rôznych konfiguráciách — od diaľkových ťahačov po špecializované podvozky, skriňové nadstavby a kontajnerové vozidlá. Všetka technika pochádza z oficiálnych lízingových platforiem EÚ s kompletnou servisnou históriou.",
      de: "DAF zählt zu den führenden Marken im europäischen Nutzfahrzeugverkehr. Wir beschaffen und liefern DAF-Fahrzeuge in vielfältigen Konfigurationen — von Fernverkehrszugmaschinen bis zu Spezialfahrgestellen, Kofferaufbauten und Containerfahrzeugen. Alle Einheiten stammen von offiziellen EU-Leasingplattformen mit vollständiger Servicehistorie.",
    },
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
      en: ["430–530 hp typical range", "EURO 6", "Air suspension", "Full import documentation"],
      uk: ["Типовий діапазон 430–530 к.с.", "EURO 6", "Пневмопідвіска", "Повний пакет імпортної документації"],
      sk: ["Typický rozsah 430–530 hp", "EURO 6", "Pneumatické odpruženie", "Kompletná importná dokumentácia"],
      de: ["Typischer Bereich 430–530 PS", "EURO 6", "Luftfederung", "Vollständige Importdokumentation"],
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
      en: "Volvo is one of the leaders in European commercial transport. We procure and supply Volvo equipment across configurations — from line-haul tractors to specialized chassis, box bodies, and container carriers. All units are sourced from official EU leasing platforms and delivered with full service history.",
      uk: "Volvo — один із лідерів європейського комерційного транспорту. Ми забезпечуємо прямий викуп та постачання техніки Volvo у різних конфігураціях: від магістральних тягачів до спеціалізованих шасі, фургонів та контейнеровозів. Уся техніка викуповується з офіційних лізингових майданчиків ЄС та постачається з повною сервісною історією.",
      sk: "Volvo patrí medzi lídrov európskej nákladnej dopravy. Zabezpečujeme priamy výkup a dodávky techniky Volvo v rôznych konfiguráciách — od diaľkových ťahačov po špecializované podvozky, skriňové nadstavby a kontajnerové vozidlá. Všetka technika pochádza z oficiálnych lízingových platforiem EÚ s kompletnou servisnou históriou.",
      de: "Volvo zählt zu den führenden Marken im europäischen Nutzfahrzeugverkehr. Wir beschaffen und liefern Volvo-Fahrzeuge in vielfältigen Konfigurationen — von Fernverkehrszugmaschinen bis zu Spezialfahrgestellen, Kofferaufbauten und Containerfahrzeugen. Alle Einheiten stammen von offiziellen EU-Leasingplattformen mit vollständiger Servicehistorie.",
    },
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
      en: ["420–500 hp typical range", "EURO 6", "Air suspension on all axles", "Service history and inspection before handover"],
      uk: ["Типовий діапазон 420–500 к.с.", "EURO 6", "Пневмопідвіска всіх осей", "Сервісна історія та перевірка перед передачею"],
      sk: ["Typický rozsah 420–500 hp", "EURO 6", "Pneumatické odpruženie všetkých náprav", "Servisná história a kontrola pred odovzdaním"],
      de: ["Typischer Bereich 420–500 PS", "EURO 6", "Luftfederung an allen Achsen", "Servicehistorie und Abnahmeprüfung vor Übergabe"],
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
      en: "Renault Trucks is one of the leaders in European commercial transport. We procure and supply Renault equipment across configurations — from line-haul tractors to specialized chassis, box bodies, and container carriers. All units are sourced from official EU leasing platforms and delivered with full service history.",
      uk: "Renault Trucks — один із лідерів європейського комерційного транспорту. Ми забезпечуємо прямий викуп та постачання техніки Renault у різних конфігураціях: від магістральних тягачів до спеціалізованих шасі, фургонів та контейнеровозів. Уся техніка викуповується з офіційних лізингових майданчиків ЄС та постачається з повною сервісною історією.",
      sk: "Renault Trucks patrí medzi lídrov európskej nákladnej dopravy. Zabezpečujeme priamy výkup a dodávky techniky Renault v rôznych konfiguráciách — od diaľkových ťahačov po špecializované podvozky, skriňové nadstavby a kontajnerové vozidlá. Všetka technika pochádza z oficiálnych lízingových platforiem EÚ s kompletnou servisnou históriou.",
      de: "Renault Trucks zählt zu den führenden Marken im europäischen Nutzfahrzeugverkehr. Wir beschaffen und liefern Renault-Fahrzeuge in vielfältigen Konfigurationen — von Fernverkehrszugmaschinen bis zu Spezialfahrgestellen, Kofferaufbauten und Containerfahrzeugen. Alle Einheiten stammen von offiziellen EU-Leasingplattformen mit vollständiger Servicehistorie.",
    },
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
      en: ["440–520 hp typical range", "EURO 6", "Air suspension on drive axles", "Pre-delivery inspection report"],
      uk: ["Типовий діапазон 440–520 к.с.", "EURO 6", "Пневмопідвіска ведучих осей", "Звіт перевірки перед передачею"],
      sk: ["Typický rozsah 440–520 hp", "EURO 6", "Pneumatické odpruženie hnacích náprav", "Správa z kontroly pred odovzdaním"],
      de: ["Typischer Bereich 440–520 PS", "EURO 6", "Luftfederung an Antriebsachsen", "Abnahmeprüfbericht vor Übergabe"],
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
      en: "Schmitz Cargobull is a leading European trailer manufacturer. We import semi-trailers configured for general cargo, temperature-controlled goods, and fleet-standard logistics.",
      uk: "Schmitz Cargobull — провідний європейський виробник напівпричепів. Імпортуємо напівпричепи для загальних, температурних і флотських перевезень.",
      sk: "Schmitz Cargobull je popredný európsky výrobca návesov. Dovážame návesy pre všeobecnú nákladnú dopravu, teplotne riadený tovar a logistiku firemných flotíl.",
      de: "Schmitz Cargobull ist ein führender europäischer Aufliegerhersteller. Wir importieren Sattelauflieger für Generalcargo, temperaturgeführte Güter und Flottenlogistik.",
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
      en: ["3-axle standard layout", "Payload-oriented floor and wall build", "BPW or SAF running gear", "Documented maintenance and axle inspection"],
      uk: ["Стандартна 3-осьова схема", "Підлога та стінки під профіль вантажу", "Ходова BPW або SAF", "Документоване ТО та перевірка осей"],
      sk: ["Štandardná 3-nápravová konfigurácia", "Podlaha a steny optimalizované pre náklad", "Nápravy BPW alebo SAF", "Dokumentovaná údržba a kontrola náprav"],
      de: ["Standard-3-Achsen-Layout", "Nutzlasterorientierter Boden- und Wandaufbau", "BPW- oder SAF-Fahrwerke", "Dokumentierte Wartung und Achsinspektion"],
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
      en: ["Standard and Mega height options", "Lift axle configurations", "Multi-lock and XL certificate setups"],
      uk: ["Стандартна та Mega висота", "Підйомні осі", "Multi-lock і XL сертифікація"],
      sk: ["Štandardná a Mega výška", "Konfigurácie so zdvíhacou nápravou", "Multi-lock a XL certifikácia"],
      de: ["Standard- und Mega-Höhe", "Liftachs-Konfigurationen", "Multi-lock- und XL-Zertifizierung"],
    },
    typicalSpecs: {
      en: ["Typical 3-axle semi-trailer", "Aluminium or steel wall options", "Disc brake systems", "Import-ready technical file"],
      uk: ["Типовий 3-осьовий напівпричіп", "Алюмінієві або сталеві стінки", "Дискові гальма", "Технічний пакет для реєстрації"],
      sk: ["Typický 3-nápravový náves", "Hliníkové alebo oceľové steny", "Kotúčové brzdy", "Technický balík pripravený na registráciu"],
      de: ["Typischer 3-Achsen-Sattelauflieger", "Aluminium- oder Stahlwände", "Scheibenbremsen", "Importfertige Technikakte"],
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
      en: "Kögel offers practical trailer solutions with a focus on payload and operating economy. We import curtainsider, box, and platform configurations from European fleets.",
      uk: "Kögel пропонує практичні рішення з акцентом на корисне навантаження та економіку експлуатації. Імпортуємо бортові, фургонні та платформні конфігурації з європейських автопарків.",
      sk: "Kögel ponúka praktické riešenia s dôrazom na užitočné zaťaženie a prevádzkovú ekonomiku. Dovážame plachtové, skriňové a platformové konfigurácie z európskych flotíl.",
      de: "Kögel bietet praxisnahe Aufliegerlösungen mit Fokus auf Nutzlast und Wirtschaftlichkeit. Wir importieren Planen-, Koffer- und Plattformkonfigurationen aus europäischen Fuhrparks.",
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
      en: ["Optimized tare weight", "Standard European coupling height", "BPW / SAF axles", "Condition report before delivery"],
      uk: ["Оптимізована власна вага", "Стандартна європейська висота сідла", "Осі BPW / SAF", "Звіт про стан перед передачею"],
      sk: ["Optimalizovaná vlastná hmotnosť", "Štandardná európska výška spojky", "Nápravy BPW / SAF", "Správa o stave pred odovzdaním"],
      de: ["Optimiertes Leergewicht", "Standard-Europäische Kupplungshöhe", "BPW- / SAF-Achsen", "Zustandsbericht vor Auslieferung"],
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
      en: "Wielton is one of Europe's largest trailer manufacturers. We import curtainsider, tipper, and platform models configured for general cargo and construction logistics.",
      uk: "Wielton — один із найбільших виробників причепів у Європі. Імпортуємо бортові, самоскидні та платформні моделі для загальних і будівельних вантажів.",
      sk: "Wielton je jeden z najväčších výrobcov návesov v Európe. Dovážame plachtové, sklápacie a platformové modely pre všeobecnú nákladnú a stavebnú logistiku.",
      de: "Wielton ist einer der größten Aufliegerhersteller Europas. Wir importieren Planen-, Kipper- und Plattformmodelle für General- und Baustellenlogistik.",
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
      en: ["3-axle standard layout", "Disc brake systems", "BPW or SAF running gear", "Import-ready technical documentation"],
      uk: ["Стандартна 3-осьова схема", "Дискові гальма", "Ходова BPW або SAF", "Технічна документація для імпорту"],
      sk: ["Štandardná 3-nápravová konfigurácia", "Kotúčové brzdy", "Nápravy BPW alebo SAF", "Technická dokumentácia pripravená na import"],
      de: ["Standard-3-Achsen-Layout", "Scheibenbremsen", "BPW- oder SAF-Fahrwerke", "Importfertige Technikdokumentation"],
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
      en: "Lamberet specializes in refrigerated transport solutions. We import multi-temperature and single-compartment reefers suited to food, pharma, and cold-chain logistics.",
      uk: "Lamberet спеціалізується на рефрижераторних рішеннях. Імпортуємо одно- та багатотемпературні рефи для харчових, фармацевтичних і cold-chain перевезень.",
      sk: "Lamberet sa špecializuje na chladiarenské riešenia. Dovážame jedno- a viacteplotné chladiarenské návesy pre potravinársku, farmaceutickú a cold-chain logistiku.",
      de: "Lamberet ist auf Kühltransport spezialisiert. Wir importieren Ein- und Mehrtemperatur-Kühlauflieger für Lebensmittel-, Pharma- und Cold-Chain-Logistik.",
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
      en: ["3-axle refrigerated layout", "ATP certification where applicable", "Insulated floor and wall build", "Pre-delivery cold-unit check"],
      uk: ["3-осьова рефрижераторна схема", "Сертифікація ATP за потреби", "Ізольована підлога та стінки", "Перевірка холодильного агрегату перед передачею"],
      sk: ["3-nápravová chladiarenská konfigurácia", "Certifikácia ATP podľa potreby", "Izolovaná podlaha a steny", "Kontrola chladiacej jednotky pred odovzdaním"],
      de: ["3-Achsen-Kühllayout", "ATP-Zertifizierung wo zutreffend", "Isolierter Boden- und Wandaufbau", "Kühlaggregat-Check vor Übergabe"],
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
