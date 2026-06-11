import type { Locale } from "@/lib/locale";

const MODEL_DESCRIPTION_TEMPLATE: Record<Locale, (modelName: string) => string> = {
  uk: (modelName) =>
    `Постачаємо ${modelName} у будь-яких конфігураціях під ваші бізнес-задачі: від магістральних сідельних тягачів до контейнеровозів (системи BDF), фургонів та спецшасі. Уся техніка має 100% верифікований оригінальний пробіг, підтверджену європейську сервісну історію та актуальний стандарт EURO 6. Забезпечуємо можливість продажу без ПДВ (Netto / VAT 0%) та повний юридичний супровід експорту з відкриттям EX-1.`,
  en: (modelName) =>
    `We supply ${modelName} in any configuration for your business needs — from line-haul tractor units to container carriers (BDF systems), box bodies, and special chassis. Every unit has 100% verified original mileage, confirmed European service history, and current EURO 6 compliance. Netto sales without VAT (VAT 0%) and full export legal support including EX-1 issuance are available.`,
  sk: (modelName) =>
    `Dodávame ${modelName} v akýchkoľvek konfiguráciách podľa vašich obchodných potrieb — od diaľkových ťahačov po kontajnerové vozidlá (BDF systémy), skriňové nadstavby a špeciálne podvozky. Všetka technika má 100 % overený originálny nájazd, potvrdenú európsku servisnú históriu a aktuálny štandard EURO 6. Zabezpečujeme predaj bez DPH (Netto / VAT 0 %) a plnú právnu podporu exportu vrátane vystavenia EX-1.`,
  de: (modelName) =>
    `Wir liefern ${modelName} in jeder Konfiguration für Ihre Geschäftsanforderungen — von Fernverkehrszugmaschinen über Containerfahrzeuge (BDF-Systeme) und Kofferaufbauten bis zu Spezialfahrgestellen. Alle Fahrzeuge haben 100 % verifizierten Original-Kilometerstand, bestätigte europäische Servicehistorie und EURO 6. Netto-Verkauf ohne MwSt. (MwSt. 0 %) sowie vollständige Exportbegleitung inkl. EX-1-Ausstellung sind möglich.`,
};

export function buildCatalogModelDescription(modelName: string, locale: Locale): string {
  const template = MODEL_DESCRIPTION_TEMPLATE[locale] ?? MODEL_DESCRIPTION_TEMPLATE.en;
  return template(modelName);
}
