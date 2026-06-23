import type { Locale } from "@/lib/locale";

type LocalizedText = Record<Locale, string>;

export type CatalogBodyTypeItem = {
  id: string;
  imageSrc: string;
  imageAlt: LocalizedText;
  title: LocalizedText;
};

const PLACEHOLDER = "/catalog/body-types/placeholder.svg";

function modelItem(
  brandId: string,
  id: string,
  title: LocalizedText,
  imageAlt: LocalizedText,
): CatalogBodyTypeItem {
  return {
    id: `${brandId}-${id}`,
    imageSrc: PLACEHOLDER,
    imageAlt,
    title,
  };
}

export const catalogBodyTypeItemsByBrandId: Record<string, CatalogBodyTypeItem[]> = {
  mercedes: [
    modelItem(
      "mercedes",
      "actros",
      { en: "Actros", uk: "Actros", sk: "Actros", de: "Actros" },
      {
        en: "Mercedes-Benz Actros",
        uk: "Mercedes-Benz Actros",
        sk: "Mercedes-Benz Actros",
        de: "Mercedes-Benz Actros",
      },
    ),
    modelItem(
      "mercedes",
      "atego",
      { en: "Atego", uk: "Atego", sk: "Atego", de: "Atego" },
      {
        en: "Mercedes-Benz Atego",
        uk: "Mercedes-Benz Atego",
        sk: "Mercedes-Benz Atego",
        de: "Mercedes-Benz Atego",
      },
    ),
    modelItem(
      "mercedes",
      "arocs",
      { en: "Arocs", uk: "Arocs", sk: "Arocs", de: "Arocs" },
      {
        en: "Mercedes-Benz Arocs",
        uk: "Mercedes-Benz Arocs",
        sk: "Mercedes-Benz Arocs",
        de: "Mercedes-Benz Arocs",
      },
    ),
  ],
  man: [
    modelItem(
      "man",
      "tgx",
      { en: "TGX", uk: "TGX", sk: "TGX", de: "TGX" },
      {
        en: "MAN TGX long-haul tractor",
        uk: "Магістральний тягач MAN TGX",
        sk: "Diaľkový ťahač MAN TGX",
        de: "MAN TGX Fernverkehrszugmaschine",
      },
    ),
    modelItem(
      "man",
      "tgs",
      { en: "TGS", uk: "TGS", sk: "TGS", de: "TGS" },
      {
        en: "MAN TGS distribution and construction truck",
        uk: "Розподільний та будівельний MAN TGS",
        sk: "Distribučný a stavebný MAN TGS",
        de: "MAN TGS Verteilungs- und Baufahrzeug",
      },
    ),
    modelItem(
      "man",
      "tgm",
      { en: "TGM", uk: "TGM", sk: "TGM", de: "TGM" },
      {
        en: "MAN TGM medium-duty truck",
        uk: "MAN TGM середньої вантажопідйомності",
        sk: "MAN TGM stredne ťažký nákladný automobil",
        de: "MAN TGM Mittelklasse-Lkw",
      },
    ),
    modelItem(
      "man",
      "tgl",
      { en: "TGL", uk: "TGL", sk: "TGL", de: "TGL" },
      {
        en: "MAN TGL light-duty truck",
        uk: "MAN TGL легкої вантажопідйомності",
        sk: "MAN TGL ľahký nákladný automobil",
        de: "MAN TGL Leicht-Lkw",
      },
    ),
  ],
  scania: [
    modelItem(
      "scania",
      "r-series",
      { en: "R-series", uk: "R-series", sk: "R-series", de: "R-series" },
      {
        en: "Scania R-series long-haul tractor",
        uk: "Магістральний тягач Scania R-series",
        sk: "Diaľkový ťahač Scania R-series",
        de: "Scania R-Serie Fernverkehrszugmaschine",
      },
    ),
    modelItem(
      "scania",
      "s-series",
      { en: "S-series", uk: "S-series", sk: "S-series", de: "S-series" },
      {
        en: "Scania S-series long-haul tractor",
        uk: "Магістральний тягач Scania S-series",
        sk: "Diaľkový ťahač Scania S-series",
        de: "Scania S-Serie Fernverkehrszugmaschine",
      },
    ),
    modelItem(
      "scania",
      "p-series",
      { en: "P-series", uk: "P-series", sk: "P-series", de: "P-series" },
      {
        en: "Scania P-series distribution truck",
        uk: "Розподільний Scania P-series",
        sk: "Distribučný Scania P-series",
        de: "Scania P-Serie Verteilungsfahrzeug",
      },
    ),
  ],
  daf: [
    modelItem(
      "daf",
      "xf",
      { en: "XF", uk: "XF", sk: "XF", de: "XF" },
      {
        en: "DAF XF long-haul tractor",
        uk: "Магістральний тягач DAF XF",
        sk: "Diaľkový ťahač DAF XF",
        de: "DAF XF Fernverkehrszugmaschine",
      },
    ),
    modelItem(
      "daf",
      "cf",
      { en: "CF", uk: "CF", sk: "CF", de: "CF" },
      {
        en: "DAF CF distribution and regional truck",
        uk: "Розподільний та регіональний DAF CF",
        sk: "Distribučný a regionálny DAF CF",
        de: "DAF CF Verteilungs- und Regionalfahrzeug",
      },
    ),
    modelItem(
      "daf",
      "lf",
      { en: "LF", uk: "LF", sk: "LF", de: "LF" },
      {
        en: "DAF LF urban distribution truck",
        uk: "Міський розподільний DAF LF",
        sk: "Mestský distribučný DAF LF",
        de: "DAF LF Stadtverteilungsfahrzeug",
      },
    ),
  ],
  volvo: [
    modelItem(
      "volvo",
      "fh",
      { en: "FH", uk: "FH", sk: "FH", de: "FH" },
      {
        en: "Volvo FH long-haul tractor",
        uk: "Магістральний тягач Volvo FH",
        sk: "Diaľkový ťahač Volvo FH",
        de: "Volvo FH Fernverkehrszugmaschine",
      },
    ),
    modelItem(
      "volvo",
      "fm",
      { en: "FM", uk: "FM", sk: "FM", de: "FM" },
      {
        en: "Volvo FM regional and construction truck",
        uk: "Регіональний та будівельний Volvo FM",
        sk: "Regionálny a stavebný Volvo FM",
        de: "Volvo FM Regional- und Baufahrzeug",
      },
    ),
    modelItem(
      "volvo",
      "fl",
      { en: "FL", uk: "FL", sk: "FL", de: "FL" },
      {
        en: "Volvo FL urban distribution truck",
        uk: "Міський розподільний Volvo FL",
        sk: "Mestský distribučný Volvo FL",
        de: "Volvo FL Stadtverteilungsfahrzeug",
      },
    ),
  ],
  renault: [
    modelItem(
      "renault",
      "t-high",
      { en: "T High", uk: "T High", sk: "T High", de: "T High" },
      {
        en: "Renault T High long-haul tractor",
        uk: "Магістральний тягач Renault T High",
        sk: "Diaľkový ťahač Renault T High",
        de: "Renault T High Fernverkehrszugmaschine",
      },
    ),
    modelItem(
      "renault",
      "t",
      { en: "T", uk: "T", sk: "T", de: "T" },
      {
        en: "Renault T distribution tractor",
        uk: "Розподільний тягач Renault T",
        sk: "Distribučný ťahač Renault T",
        de: "Renault T Verteilungszugmaschine",
      },
    ),
    modelItem(
      "renault",
      "c",
      { en: "C", uk: "C", sk: "C", de: "C" },
      {
        en: "Renault C construction truck",
        uk: "Будівельний Renault C",
        sk: "Stavebný Renault C",
        de: "Renault C Baufahrzeug",
      },
    ),
  ],
  schmitz: [
    modelItem(
      "schmitz",
      "sko",
      { en: "S.KO", uk: "S.KO", sk: "S.KO", de: "S.KO" },
      {
        en: "Schmitz Cargobull S.KO curtainsider",
        uk: "Бортовий Schmitz Cargobull S.KO",
        sk: "Plachtový Schmitz Cargobull S.KO",
        de: "Schmitz Cargobull S.KO Planenauflieger",
      },
    ),
    modelItem(
      "schmitz",
      "scs",
      { en: "S.CS", uk: "S.CS", sk: "S.CS", de: "S.CS" },
      {
        en: "Schmitz S.CS box semi-trailer",
        uk: "Фургонний Schmitz S.CS",
        sk: "Skriňový Schmitz S.CS",
        de: "Schmitz S.CS Kofferauflieger",
      },
    ),
    modelItem(
      "schmitz",
      "sko-cool",
      { en: "S.KO COOL", uk: "S.KO COOL", sk: "S.KO COOL", de: "S.KO COOL" },
      {
        en: "Schmitz S.KO COOL refrigerated trailer",
        uk: "Рефрижератор Schmitz S.KO COOL",
        sk: "Chladiarenský Schmitz S.KO COOL",
        de: "Schmitz S.KO COOL Kühlauflieger",
      },
    ),
  ],
  krone: [
    modelItem(
      "krone",
      "profi-liner",
      { en: "Profi Liner", uk: "Profi Liner", sk: "Profi Liner", de: "Profi Liner" },
      {
        en: "Krone Profi Liner curtainsider",
        uk: "Бортовий Krone Profi Liner",
        sk: "Plachtový Krone Profi Liner",
        de: "Krone Profi Liner Planenauflieger",
      },
    ),
    modelItem(
      "krone",
      "dry-liner",
      { en: "Dry Liner", uk: "Dry Liner", sk: "Dry Liner", de: "Dry Liner" },
      {
        en: "Krone Dry Liner box trailer",
        uk: "Фургонний Krone Dry Liner",
        sk: "Skriňový Krone Dry Liner",
        de: "Krone Dry Liner Kofferauflieger",
      },
    ),
    modelItem(
      "krone",
      "box-liner",
      { en: "Box Liner", uk: "Box Liner", sk: "Box Liner", de: "Box Liner" },
      {
        en: "Krone Box Liner reinforced box trailer",
        uk: "Krone Box Liner із посиленою підлогою",
        sk: "Krone Box Liner so zosilnenou podlahou",
        de: "Krone Box Liner mit verstärktem Boden",
      },
    ),
  ],
  koegel: [
    modelItem(
      "koegel",
      "cargo",
      { en: "Cargo", uk: "Cargo", sk: "Cargo", de: "Cargo" },
      {
        en: "Kögel Cargo curtainsider",
        uk: "Бортовий Kögel Cargo",
        sk: "Plachtový Kögel Cargo",
        de: "Kögel Cargo Planenauflieger",
      },
    ),
    modelItem(
      "koegel",
      "box",
      { en: "Box / Port", uk: "Box / Port", sk: "Box / Port", de: "Box / Port" },
      {
        en: "Kögel box and port semi-trailer",
        uk: "Фургонний та port Kögel",
        sk: "Skriňový a port Kögel",
        de: "Kögel Koffer- und Port-Auflieger",
      },
    ),
    modelItem(
      "koegel",
      "platform",
      { en: "Platform", uk: "Platform", sk: "Platform", de: "Platform" },
      {
        en: "Kögel platform and low-loader trailer",
        uk: "Платформа та низькорамник Kögel",
        sk: "Platforma a nízkoplošník Kögel",
        de: "Kögel Plattform- und Tiefladerauflieger",
      },
    ),
  ],
  wielton: [
    modelItem(
      "wielton",
      "ns3",
      { en: "NS3 / NW3", uk: "NS3 / NW3", sk: "NS3 / NW3", de: "NS3 / NW3" },
      {
        en: "Wielton NS3/NW3 curtainsider",
        uk: "Бортовий Wielton NS3/NW3",
        sk: "Plachtový Wielton NS3/NW3",
        de: "Wielton NS3/NW3 Planenauflieger",
      },
    ),
    modelItem(
      "wielton",
      "tipper",
      { en: "Tipper", uk: "Самоскид", sk: "Sklápač", de: "Kipper" },
      {
        en: "Wielton tipper semi-trailer",
        uk: "Самоскидний напівпричіп Wielton",
        sk: "Sklápací náves Wielton",
        de: "Wielton Kippsattelauflieger",
      },
    ),
    modelItem(
      "wielton",
      "platform",
      { en: "Platform", uk: "Platform", sk: "Platform", de: "Platform" },
      {
        en: "Wielton platform and low-bed trailer",
        uk: "Платформа та низькорамник Wielton",
        sk: "Platforma a nízkoplošník Wielton",
        de: "Wielton Plattform- und Tiefladerauflieger",
      },
    ),
  ],
  lamberet: [
    modelItem(
      "lamberet",
      "sr",
      { en: "SR", uk: "SR", sk: "SR", de: "SR" },
      {
        en: "Lamberet SR refrigerated semi-trailer",
        uk: "Рефрижератор Lamberet SR",
        sk: "Chladiarenský náves Lamberet SR",
        de: "Lamberet SR Kühlauflieger",
      },
    ),
    modelItem(
      "lamberet",
      "multi-temp",
      { en: "Multi-temp", uk: "Multi-temp", sk: "Multi-temp", de: "Multi-temp" },
      {
        en: "Lamberet multi-temperature refrigerated trailer",
        uk: "Багатотемпературний рефрижератор Lamberet",
        sk: "Viacteplotný chladiarenský náves Lamberet",
        de: "Lamberet Mehrtemperatur-Kühlauflieger",
      },
    ),
    modelItem(
      "lamberet",
      "insulated",
      { en: "Insulated liner", uk: "Ізотерм", sk: "Izotermický", de: "Isolierter Liner" },
      {
        en: "Lamberet insulated dry freight liner",
        uk: "Ізотермічний фургон Lamberet",
        sk: "Izotermický náves Lamberet",
        de: "Lamberet isolierter Trockenfracht-Liner",
      },
    ),
  ],
};
