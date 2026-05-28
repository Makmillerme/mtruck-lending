import type { Locale } from "@/lib/locale";

export type CatalogCategory = "truck" | "trailer";

type LocalizedText = Record<Locale, string>;
type LocalizedList = Record<Locale, string[]>;

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
};

export const catalogBrands: CatalogBrand[] = [
  {
    id: "man",
    category: "truck",
    name: "MAN",
    tagline: {
      en: "Long-haul and distribution tractors from the TGX and TGS lines.",
      uk: "Магістральні та розподільні тягачі ліній TGX і TGS.",
    },
    highlights: {
      en: ["TGX", "TGS", "EURO 6"],
      uk: ["TGX", "TGS", "EURO 6"],
    },
    overview: {
      en: "MAN is one of the core brands in European commercial transport. We focus on tractors configured for international routes, regional logistics, and fleet renewal with transparent service history.",
      uk: "MAN — один із ключових брендів європейської комерційної логістики. Працюємо з тягачами для міжнародних маршрутів, регіональної доставки та оновлення автопарку з прозорою сервісною історією.",
    },
    bodyTypes: {
      en: ["Tractor units (4x2, 6x2)", "Chassis for special superstructures"],
      uk: ["Тягачі (4x2, 6x2)", "Шасі під спеціальні надбудови"],
    },
    configurations: {
      en: ["XLX / GX sleeper cabs", "Automatic and manual transmissions", "Retarder and fleet telematics options"],
      uk: ["Спальні кабіни XLX / GX", "Автоматичні та механічні КПП", "Retarder і телематика для автопарків"],
    },
    typicalSpecs: {
      en: ["Engine power from 400 to 510 hp", "EURO 6 emission class", "Air suspension and disc brakes", "Verified mileage and maintenance records"],
      uk: ["Потужність двигуна від 400 до 510 к.с.", "Екологічний клас EURO 6", "Пневмопідвіска та дискові гальма", "Підтверджений пробіг і сервісна документація"],
    },
  },
  {
    id: "scania",
    category: "truck",
    name: "Scania",
    tagline: {
      en: "R-series and S-series tractors for efficient long-distance transport.",
      uk: "Тягачі серій R і S для ефективних дальніх перевезень.",
    },
    highlights: {
      en: ["R-series", "S-series", "Opticruise"],
      uk: ["R-series", "S-series", "Opticruise"],
    },
    overview: {
      en: "Scania is valued for fuel efficiency, driver comfort, and predictable operating costs. We source tractors suited to line-haul, temperature-controlled logistics, and premium fleet standards.",
      uk: "Scania цінують за економічність, комфорт водія та передбачувані експлуатаційні витрати. Імпортуємо тягачі для лінійних маршрутів, температурної логістики та преміальних автопарків.",
    },
    bodyTypes: {
      en: ["High-roof and normal-roof tractors", "6x2 and 4x2 axle layouts"],
      uk: ["Тягачі з високою та стандартною кабіною", "Конфігурації осей 6x2 та 4x2"],
    },
    configurations: {
      en: ["Opticruise gearbox", "Retarder and adaptive cruise options", "P-disc and air-suspended cabs"],
      uk: ["КПП Opticruise", "Retarder і адаптивний круїз-контроль", "P-disc і кабіни з пневмопідвіскою"],
    },
    typicalSpecs: {
      en: ["450–500 hp engine range", "EURO 6", "Low-deck and standard fifth wheel height", "Full import documentation package"],
      uk: ["Діапазон потужності 450–500 к.с.", "EURO 6", "Низька та стандартна висота сідла", "Повний пакет імпортної документації"],
    },
  },
  {
    id: "volvo",
    category: "truck",
    name: "Volvo",
    tagline: {
      en: "FH and FM tractors with I-Shift for modern European fleets.",
      uk: "Тягачі FH і FM з I-Shift для сучасних європейських автопарків.",
    },
    highlights: {
      en: ["FH", "FM", "I-Shift"],
      uk: ["FH", "FM", "I-Shift"],
    },
    overview: {
      en: "Volvo trucks combine safety systems, ergonomic cabs, and strong resale value. Our focus is on tractors prepared for international forwarding and mixed cargo operations.",
      uk: "Volvo поєднує системи безпеки, ергономічні кабіни та високу ліквідність. Працюємо з тягачами для міжнародних перевезень і змішаних вантажів.",
    },
    bodyTypes: {
      en: ["FH long-haul tractors", "FM regional and construction chassis"],
      uk: ["Магістральні FH", "Регіональні та будівельні шасі FM"],
    },
    configurations: {
      en: ["Globetrotter and sleeper cabs", "I-Shift automated transmission", "Volvo Dynamic Steering options"],
      uk: ["Кабіни Globetrotter і зі спальним місцем", "Автоматична КПП I-Shift", "Volvo Dynamic Steering"],
    },
    typicalSpecs: {
      en: ["420–500 hp typical range", "EURO 6", "Air suspension on all axles", "Service history and inspection before handover"],
      uk: ["Типовий діапазон 420–500 к.с.", "EURO 6", "Пневмопідвіска всіх осей", "Сервісна історія та перевірка перед передачею"],
    },
  },
  {
    id: "daf",
    category: "truck",
    name: "DAF",
    tagline: {
      en: "XF and CF tractors built for fuel efficiency and driver comfort.",
      uk: "Тягачі XF і CF з акцентом на економію палива та комфорт водія.",
    },
    highlights: {
      en: ["XF", "CF", "EURO 6"],
      uk: ["XF", "CF", "EURO 6"],
    },
    overview: {
      en: "DAF is a strong choice for operators seeking reliable long-haul tractors with competitive running costs. We import XF and CF models with documented service history.",
      uk: "DAF — надійний вибір для операторів, яким потрібні магістральні тягачі з конкурентною економікою. Імпортуємо XF і CF із задокументованою сервісною історією.",
    },
    bodyTypes: {
      en: ["XF long-haul tractors", "CF distribution and regional chassis"],
      uk: ["Магістральні XF", "Розподільні та регіональні шасі CF"],
    },
    configurations: {
      en: ["Super Space Cab and sleeper options", "PACCAR MX engine range", "Adaptive cruise and lane assist packages"],
      uk: ["Кабіни Super Space Cab і зі спальним місцем", "Двигуни PACCAR MX", "Adaptive cruise і lane assist"],
    },
    typicalSpecs: {
      en: ["430–530 hp typical range", "EURO 6", "Air suspension", "Full import documentation"],
      uk: ["Типовий діапазон 430–530 к.с.", "EURO 6", "Пневмопідвіска", "Повний пакет імпортної документації"],
    },
  },
  {
    id: "renault",
    category: "truck",
    name: "Renault",
    tagline: {
      en: "T and C range tractors for versatile European transport operations.",
      uk: "Тягачі ліній T і C для різноманітних європейських перевезень.",
    },
    highlights: {
      en: ["T High", "T", "C"],
      uk: ["T High", "T", "C"],
    },
    overview: {
      en: "Renault Trucks offers practical tractors with strong dealer support across Europe. We focus on T High and T models suited to international forwarding and regional distribution.",
      uk: "Renault Trucks пропонує практичні тягачі з розвиненою мережею сервісу в Європі. Працюємо з T High і T для міжнародних та регіональних перевезень.",
    },
    bodyTypes: {
      en: ["T High long-haul tractors", "T distribution tractors", "C construction chassis"],
      uk: ["Магістральні T High", "Розподільні T", "Будівельні шасі C"],
    },
    configurations: {
      en: ["Optidriver automated transmission", "Sleeper and day cab variants", "Fleet telematics packages"],
      uk: ["Автоматична КПП Optidriver", "Кабіни sleeper і day cab", "Телематика для автопарків"],
    },
    typicalSpecs: {
      en: ["440–520 hp typical range", "EURO 6", "Air suspension on drive axles", "Pre-delivery inspection report"],
      uk: ["Типовий діапазон 440–520 к.с.", "EURO 6", "Пневмопідвіска ведучих осей", "Звіт перевірки перед передачею"],
    },
  },
  {
    id: "schmitz",
    category: "trailer",
    name: "Schmitz",
    tagline: {
      en: "Cargobull semi-trailers for curtainsider, box, and refrigerated transport.",
      uk: "Напівпричепи Cargobull для бортових, фургонних і рефрижераторних перевезень.",
    },
    highlights: {
      en: ["Curtainsider", "Box", "Reefer"],
      uk: ["Борт", "Фургон", "Реф"],
    },
    overview: {
      en: "Schmitz Cargobull is a leading European trailer manufacturer. We import semi-trailers configured for general cargo, temperature-controlled goods, and fleet-standard logistics.",
      uk: "Schmitz Cargobull — провідний європейський виробник напівпричепів. Імпортуємо напівпричепи для загальних, температурних і флотських перевезень.",
    },
    bodyTypes: {
      en: ["Curtainsider (S.KO)", "Box semi-trailers", "Refrigerated S.KO COOL"],
      uk: ["Бортові (S.KO)", "Фургонні напівпричепи", "Рефрижераторні S.KO COOL"],
    },
    configurations: {
      en: ["Lift axle and steering axle options", "XL code and pallet capacity variants", "Disc brakes and telematics-ready"],
      uk: ["Підйомна та керована вісь", "Варіанти XL code і палетомісткості", "Дискові гальма та телематика"],
    },
    typicalSpecs: {
      en: ["3-axle standard layout", "Payload-oriented floor and wall build", "BPW or SAF running gear", "Documented maintenance and axle inspection"],
      uk: ["Стандартна 3-осьова схема", "Підлога та стінки під профіль вантажу", "Ходова BPW або SAF", "Документоване ТО та перевірка осей"],
    },
  },
  {
    id: "krone",
    category: "trailer",
    name: "Krone",
    tagline: {
      en: "Dry freight, curtainsider, and box trailers for European logistics.",
      uk: "Напівпричепи для сухих, бортових і фургонних перевезень.",
    },
    highlights: {
      en: ["Profi Liner", "Dry Liner", "Box Liner"],
      uk: ["Profi Liner", "Dry Liner", "Box Liner"],
    },
    overview: {
      en: "Krone trailers are widely used across European transport networks. We work with models suited to dry cargo, curtainsider operations, and mixed fleet requirements.",
      uk: "Krone широко використовують у європейській логістиці. Працюємо з моделями для сухих вантажів, бортових перевезень і змішаних автопарків.",
    },
    bodyTypes: {
      en: ["Curtainsider Profi Liner", "Dry freight Dry Liner", "Box Liner with reinforced floor"],
      uk: ["Бортовий Profi Liner", "Сухий вантаж Dry Liner", "Box Liner із посиленою підлогою"],
    },
    configurations: {
      en: ["Standard and Mega height options", "Lift axle configurations", "Multi-lock and XL certificate setups"],
      uk: ["Стандартна та Mega висота", "Підйомні осі", "Multi-lock і XL сертифікація"],
    },
    typicalSpecs: {
      en: ["Typical 3-axle semi-trailer", "Aluminium or steel wall options", "Disc brake systems", "Import-ready technical file"],
      uk: ["Типовий 3-осьовий напівпричіп", "Алюмінієві або сталеві стінки", "Дискові гальма", "Технічний пакет для реєстрації"],
    },
  },
  {
    id: "koegel",
    category: "trailer",
    name: "Kögel",
    tagline: {
      en: "Lightweight semi-trailers and full trailers for versatile cargo profiles.",
      uk: "Легкі напівпричепи та причепи для різних типів вантажів.",
    },
    highlights: {
      en: ["Cargo", "Port", "Lightweight"],
      uk: ["Cargo", "Port", "Легка конструкція"],
    },
    overview: {
      en: "Kögel offers practical trailer solutions with a focus on payload and operating economy. We import curtainsider, box, and platform configurations from European fleets.",
      uk: "Kögel пропонує практичні рішення з акцентом на корисне навантаження та економіку експлуатації. Імпортуємо бортові, фургонні та платформні конфігурації з європейських автопарків.",
    },
    bodyTypes: {
      en: ["Curtainsider Cargo", "Box and port semi-trailers", "Platform and low-loader trailers"],
      uk: ["Бортовий Cargo", "Фургонні та port напівпричепи", "Платформи та низькорамні причепи"],
    },
    configurations: {
      en: ["Lightweight chassis options", "Multi-chamber reefer where applicable", "Custom axle and brake packages"],
      uk: ["Легкі шасі", "Багатокамерні рефрижератори за потреби", "Конфігурації осей і гальм"],
    },
    typicalSpecs: {
      en: ["Optimized tare weight", "Standard European coupling height", "BPW / SAF axles", "Condition report before delivery"],
      uk: ["Оптимізована власна вага", "Стандартна європейська висота сідла", "Осі BPW / SAF", "Звіт про стан перед передачею"],
    },
  },
  {
    id: "wielton",
    category: "trailer",
    name: "Wielton",
    tagline: {
      en: "Polish-built semi-trailers for curtainsider, tipper, and platform operations.",
      uk: "Польські напівпричепи для бортових, самоскидних і платформних перевезень.",
    },
    highlights: {
      en: ["NS3", "NW3", "Tipper"],
      uk: ["NS3", "NW3", "Самоскид"],
    },
    overview: {
      en: "Wielton is one of Europe's largest trailer manufacturers. We import curtainsider, tipper, and platform models configured for general cargo and construction logistics.",
      uk: "Wielton — один із найбільших виробників причепів у Європі. Імпортуємо бортові, самоскидні та платформні моделі для загальних і будівельних вантажів.",
    },
    bodyTypes: {
      en: ["Curtainsider NS3/NW3", "Tipper semi-trailers", "Platform and low-bed trailers"],
      uk: ["Бортові NS3/NW3", "Самоскидні напівпричепи", "Платформи та низькорамники"],
    },
    configurations: {
      en: ["Lift axle and steering axle options", "XL code and reinforced floor variants", "Steel and aluminium wall builds"],
      uk: ["Підйомна та керована вісь", "XL code і посилена підлога", "Сталеві та алюмінієві стінки"],
    },
    typicalSpecs: {
      en: ["3-axle standard layout", "Disc brake systems", "BPW or SAF running gear", "Import-ready technical documentation"],
      uk: ["Стандартна 3-осьова схема", "Дискові гальма", "Ходова BPW або SAF", "Технічна документація для імпорту"],
    },
  },
  {
    id: "lamberet",
    category: "trailer",
    name: "Lamberet",
    tagline: {
      en: "Refrigerated and insulated semi-trailers for temperature-controlled logistics.",
      uk: "Рефрижераторні та ізотермічні напівпричепи для температурних перевезень.",
    },
    highlights: {
      en: ["Reefer", "Multi-temp", "Insulated"],
      uk: ["Реф", "Multi-temp", "Ізотерм"],
    },
    overview: {
      en: "Lamberet specializes in refrigerated transport solutions. We import multi-temperature and single-compartment reefers suited to food, pharma, and cold-chain logistics.",
      uk: "Lamberet спеціалізується на рефрижераторних рішеннях. Імпортуємо одно- та багатотемпературні рефи для харчових, фармацевтичних і cold-chain перевезень.",
    },
    bodyTypes: {
      en: ["Single-compartment reefers", "Multi-temperature semi-trailers", "Insulated dry freight liners"],
      uk: ["Однокамерні рефи", "Багатотемпературні напівпричепи", "Ізотермічні фургони"],
    },
    configurations: {
      en: ["Carrier, Thermo King, or Daikin units", "Lift axle and tail-lift options", "Telematics and temperature monitoring"],
      uk: ["Агрегати Carrier, Thermo King або Daikin", "Підйомна вісь і гідроборт", "Телематика та моніторинг температури"],
    },
    typicalSpecs: {
      en: ["3-axle refrigerated layout", "ATP certification where applicable", "Insulated floor and wall build", "Pre-delivery cold-unit check"],
      uk: ["3-осьова рефрижераторна схема", "Сертифікація ATP за потреби", "Ізольована підлога та стінки", "Перевірка холодильного агрегату перед передачею"],
    },
  },
];

export function getCatalogBrandsByCategory(category: CatalogCategory): CatalogBrand[] {
  return catalogBrands.filter((brand) => brand.category === category);
}

export function pickLocalized<T extends LocalizedText | LocalizedList>(field: T, locale: Locale): T[Locale] {
  return field[locale] ?? field.en;
}
