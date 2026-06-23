import type { Locale } from "@/lib/locale";

const MODEL_DESCRIPTION_TEMPLATE: Record<Locale, (modelName: string) => string> = {
  uk: (modelName) =>
    `Працюємо з ${modelName} у різних конфігураціях для бізнес-задач компаній: магістральні тягачі, фургони, шасі, причепи та спеціальні рішення для автопарку. Допомагаємо узгодити запит, варіанти співпраці та передачу комерційного транспорту.`,
  en: (modelName) =>
    `We work with ${modelName} in different configurations for company fleet needs: tractor units, box bodies, chassis, trailers, and specialist transport solutions. We help align the request, cooperation options, and commercial vehicle handover.`,
  sk: (modelName) =>
    `Pracujeme s ${modelName} v rôznych konfiguráciách pre potreby firemných flotíl: ťahače, skriňové vozidlá, podvozky, prívesy a špeciálne riešenia. Pomáhame zladiť dopyt, možnosti spolupráce a odovzdanie komerčného vozidla.`,
  de: (modelName) =>
    `Wir arbeiten mit ${modelName} in verschiedenen Konfigurationen für Fuhrparkbedarf von Unternehmen: Sattelzugmaschinen, Kofferaufbauten, Fahrgestelle, Auflieger und Speziallösungen. Wir helfen, Anfrage, Kooperationsoptionen und Fahrzeugübergabe abzustimmen.`,
};

export function buildCatalogModelDescription(modelName: string, locale: Locale): string {
  const template = MODEL_DESCRIPTION_TEMPLATE[locale] ?? MODEL_DESCRIPTION_TEMPLATE.en;
  return template(modelName);
}
