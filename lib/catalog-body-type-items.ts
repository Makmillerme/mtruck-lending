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
      { en: "Actros", uk: "Actros", sk: "Actros", de: "Actros", pl: "Actros" },
      {
        en: "Mercedes-Benz Actros",
        uk: "Mercedes-Benz Actros",
        sk: "Mercedes-Benz Actros",
        de: "Mercedes-Benz Actros",
        pl: "Mercedes-Benz Actros",
      },
    ),
    modelItem(
      "mercedes",
      "atego",
      { en: "Atego", uk: "Atego", sk: "Atego", de: "Atego", pl: "Atego" },
      {
        en: "Mercedes-Benz Atego",
        uk: "Mercedes-Benz Atego",
        sk: "Mercedes-Benz Atego",
        de: "Mercedes-Benz Atego",
        pl: "Mercedes-Benz Atego",
      },
    ),
    modelItem(
      "mercedes",
      "arocs",
      { en: "Arocs", uk: "Arocs", sk: "Arocs", de: "Arocs", pl: "Arocs" },
      {
        en: "Mercedes-Benz Arocs",
        uk: "Mercedes-Benz Arocs",
        sk: "Mercedes-Benz Arocs",
        de: "Mercedes-Benz Arocs",
        pl: "Mercedes-Benz Arocs",
      },
    ),
  ],
  man: [
    modelItem(
      "man",
      "tgx",
      { en: "TGX", uk: "TGX", sk: "TGX", de: "TGX", pl: "TGX" },
      {
        en: "MAN TGX long-haul tractor",
        uk: "MAN TGX long-haul tractor",
        sk: "MAN TGX long-haul tractor",
        de: "MAN TGX Fernverkehrszugmaschine",
        pl: "MAN TGX long-haul tractor",
      },
    ),
    modelItem(
      "man",
      "tgs",
      { en: "TGS", uk: "TGS", sk: "TGS", de: "TGS", pl: "TGS" },
      {
        en: "MAN TGS distribution and construction truck",
        uk: "MAN TGS distribution and construction truck",
        sk: "MAN TGS distribution and construction truck",
        de: "MAN TGS Verteilungs- und Baufahrzeug",
        pl: "MAN TGS distribution and construction truck",
      },
    ),
    modelItem(
      "man",
      "tgm",
      { en: "TGM", uk: "TGM", sk: "TGM", de: "TGM", pl: "TGM" },
      {
        en: "MAN TGM medium-duty truck",
        uk: "MAN TGM medium-duty truck",
        sk: "MAN TGM medium-duty truck",
        de: "MAN TGM Mittelklasse-Lkw",
        pl: "MAN TGM medium-duty truck",
      },
    ),
    modelItem(
      "man",
      "tgl",
      { en: "TGL", uk: "TGL", sk: "TGL", de: "TGL", pl: "TGL" },
      {
        en: "MAN TGL light-duty truck",
        uk: "MAN TGL light-duty truck",
        sk: "MAN TGL light-duty truck",
        de: "MAN TGL Leicht-Lkw",
        pl: "MAN TGL light-duty truck",
      },
    ),
  ],
  scania: [
    modelItem(
      "scania",
      "r-series",
      { en: "R-series", uk: "R-series", sk: "R-series", de: "R-series", pl: "R-series" },
      {
        en: "Scania R-series long-haul tractor",
        uk: "Scania R-series long-haul tractor",
        sk: "Scania R-series long-haul tractor",
        de: "Scania R-Serie Fernverkehrszugmaschine",
        pl: "Scania R-series long-haul tractor",
      },
    ),
    modelItem(
      "scania",
      "s-series",
      { en: "S-series", uk: "S-series", sk: "S-series", de: "S-series", pl: "S-series" },
      {
        en: "Scania S-series long-haul tractor",
        uk: "Scania S-series long-haul tractor",
        sk: "Scania S-series long-haul tractor",
        de: "Scania S-Serie Fernverkehrszugmaschine",
        pl: "Scania S-series long-haul tractor",
      },
    ),
    modelItem(
      "scania",
      "p-series",
      { en: "P-series", uk: "P-series", sk: "P-series", de: "P-series", pl: "P-series" },
      {
        en: "Scania P-series distribution truck",
        uk: "Scania P-series distribution truck",
        sk: "Scania P-series distribution truck",
        de: "Scania P-Serie Verteilungsfahrzeug",
        pl: "Scania P-series distribution truck",
      },
    ),
  ],
  daf: [
    modelItem(
      "daf",
      "xf",
      { en: "XF", uk: "XF", sk: "XF", de: "XF", pl: "XF" },
      {
        en: "DAF XF long-haul tractor",
        uk: "DAF XF long-haul tractor",
        sk: "DAF XF long-haul tractor",
        de: "DAF XF Fernverkehrszugmaschine",
        pl: "DAF XF long-haul tractor",
      },
    ),
    modelItem(
      "daf",
      "cf",
      { en: "CF", uk: "CF", sk: "CF", de: "CF", pl: "CF" },
      {
        en: "DAF CF distribution and regional truck",
        uk: "DAF CF distribution and regional truck",
        sk: "DAF CF distribution and regional truck",
        de: "DAF CF Verteilungs- und Regionalfahrzeug",
        pl: "DAF CF distribution and regional truck",
      },
    ),
    modelItem(
      "daf",
      "lf",
      { en: "LF", uk: "LF", sk: "LF", de: "LF", pl: "LF" },
      {
        en: "DAF LF urban distribution truck",
        uk: "DAF LF urban distribution truck",
        sk: "DAF LF urban distribution truck",
        de: "DAF LF Stadtverteilungsfahrzeug",
        pl: "DAF LF urban distribution truck",
      },
    ),
  ],
  volvo: [
    modelItem(
      "volvo",
      "fh",
      { en: "FH", uk: "FH", sk: "FH", de: "FH", pl: "FH" },
      {
        en: "Volvo FH long-haul tractor",
        uk: "Volvo FH long-haul tractor",
        sk: "Volvo FH long-haul tractor",
        de: "Volvo FH Fernverkehrszugmaschine",
        pl: "Volvo FH long-haul tractor",
      },
    ),
    modelItem(
      "volvo",
      "fm",
      { en: "FM", uk: "FM", sk: "FM", de: "FM", pl: "FM" },
      {
        en: "Volvo FM regional and construction truck",
        uk: "Volvo FM regional and construction truck",
        sk: "Volvo FM regional and construction truck",
        de: "Volvo FM Regional- und Baufahrzeug",
        pl: "Volvo FM regional and construction truck",
      },
    ),
    modelItem(
      "volvo",
      "fl",
      { en: "FL", uk: "FL", sk: "FL", de: "FL", pl: "FL" },
      {
        en: "Volvo FL urban distribution truck",
        uk: "Volvo FL urban distribution truck",
        sk: "Volvo FL urban distribution truck",
        de: "Volvo FL Stadtverteilungsfahrzeug",
        pl: "Volvo FL urban distribution truck",
      },
    ),
  ],
  renault: [
    modelItem(
      "renault",
      "t-high",
      { en: "T High", uk: "T High", sk: "T High", de: "T High", pl: "T High" },
      {
        en: "Renault T High long-haul tractor",
        uk: "Renault T High long-haul tractor",
        sk: "Renault T High long-haul tractor",
        de: "Renault T High Fernverkehrszugmaschine",
        pl: "Renault T High long-haul tractor",
      },
    ),
    modelItem(
      "renault",
      "t",
      { en: "T", uk: "T", sk: "T", de: "T", pl: "T" },
      {
        en: "Renault T distribution tractor",
        uk: "Renault T distribution tractor",
        sk: "Renault T distribution tractor",
        de: "Renault T Verteilungszugmaschine",
        pl: "Renault T distribution tractor",
      },
    ),
    modelItem(
      "renault",
      "c",
      { en: "C", uk: "C", sk: "C", de: "C", pl: "C" },
      {
        en: "Renault C construction truck",
        uk: "Renault C construction truck",
        sk: "Renault C construction truck",
        de: "Renault C Baufahrzeug",
        pl: "Renault C construction truck",
      },
    ),
  ],
  schmitz: [
    modelItem(
      "schmitz",
      "sko",
      { en: "S.KO", uk: "S.KO", sk: "S.KO", de: "S.KO", pl: "S.KO" },
      {
        en: "Schmitz Cargobull S.KO curtainsider",
        uk: "Schmitz Cargobull S.KO curtainsider",
        sk: "Schmitz Cargobull S.KO curtainsider",
        de: "Schmitz Cargobull S.KO Planenauflieger",
        pl: "Schmitz Cargobull S.KO curtainsider",
      },
    ),
    modelItem(
      "schmitz",
      "scs",
      { en: "S.CS", uk: "S.CS", sk: "S.CS", de: "S.CS", pl: "S.CS" },
      {
        en: "Schmitz S.CS box semi-trailer",
        uk: "Schmitz S.CS box semi-trailer",
        sk: "Schmitz S.CS box semi-trailer",
        de: "Schmitz S.CS Kofferauflieger",
        pl: "Schmitz S.CS box semi-trailer",
      },
    ),
    modelItem(
      "schmitz",
      "sko-cool",
      { en: "S.KO COOL", uk: "S.KO COOL", sk: "S.KO COOL", de: "S.KO COOL", pl: "S.KO COOL" },
      {
        en: "Schmitz S.KO COOL refrigerated trailer",
        uk: "Schmitz S.KO COOL refrigerated trailer",
        sk: "Schmitz S.KO COOL refrigerated trailer",
        de: "Schmitz S.KO COOL Kühlauflieger",
        pl: "Schmitz S.KO COOL refrigerated trailer",
      },
    ),
  ],
  krone: [
    modelItem(
      "krone",
      "profi-liner",
      { en: "Profi Liner", uk: "Profi Liner", sk: "Profi Liner", de: "Profi Liner", pl: "Profi Liner" },
      {
        en: "Krone Profi Liner curtainsider",
        uk: "Krone Profi Liner curtainsider",
        sk: "Krone Profi Liner curtainsider",
        de: "Krone Profi Liner Planenauflieger",
        pl: "Krone Profi Liner curtainsider",
      },
    ),
    modelItem(
      "krone",
      "dry-liner",
      { en: "Dry Liner", uk: "Dry Liner", sk: "Dry Liner", de: "Dry Liner", pl: "Dry Liner" },
      {
        en: "Krone Dry Liner box trailer",
        uk: "Krone Dry Liner box trailer",
        sk: "Krone Dry Liner box trailer",
        de: "Krone Dry Liner Kofferauflieger",
        pl: "Krone Dry Liner box trailer",
      },
    ),
    modelItem(
      "krone",
      "box-liner",
      { en: "Box Liner", uk: "Box Liner", sk: "Box Liner", de: "Box Liner", pl: "Box Liner" },
      {
        en: "Krone Box Liner reinforced box trailer",
        uk: "Krone Box Liner reinforced box trailer",
        sk: "Krone Box Liner reinforced box trailer",
        de: "Krone Box Liner mit verstärktem Boden",
        pl: "Krone Box Liner reinforced box trailer",
      },
    ),
  ],
  koegel: [
    modelItem(
      "koegel",
      "cargo",
      { en: "Cargo", uk: "Cargo", sk: "Cargo", de: "Cargo", pl: "Cargo" },
      {
        en: "Kögel Cargo curtainsider",
        uk: "Kögel Cargo curtainsider",
        sk: "Kögel Cargo curtainsider",
        de: "Kögel Cargo Planenauflieger",
        pl: "Kögel Cargo curtainsider",
      },
    ),
    modelItem(
      "koegel",
      "box",
      { en: "Box / Port", uk: "Box / Port", sk: "Box / Port", de: "Box / Port", pl: "Box / Port" },
      {
        en: "Kögel box and port semi-trailer",
        uk: "Kögel box and port semi-trailer",
        sk: "Kögel box and port semi-trailer",
        de: "Kögel Koffer- und Port-Auflieger",
        pl: "Kögel box and port semi-trailer",
      },
    ),
    modelItem(
      "koegel",
      "platform",
      { en: "Platform", uk: "Platform", sk: "Platform", de: "Platform", pl: "Platform" },
      {
        en: "Kögel platform and low-loader trailer",
        uk: "Kögel platform and low-loader trailer",
        sk: "Kögel platform and low-loader trailer",
        de: "Kögel Plattform- und Tiefladerauflieger",
        pl: "Kögel platform and low-loader trailer",
      },
    ),
  ],
  wielton: [
    modelItem(
      "wielton",
      "ns3",
      { en: "NS3 / NW3", uk: "NS3 / NW3", sk: "NS3 / NW3", de: "NS3 / NW3", pl: "NS3 / NW3" },
      {
        en: "Wielton NS3/NW3 curtainsider",
        uk: "Wielton NS3/NW3 curtainsider",
        sk: "Wielton NS3/NW3 curtainsider",
        de: "Wielton NS3/NW3 Planenauflieger",
        pl: "Wielton NS3/NW3 curtainsider",
      },
    ),
    modelItem(
      "wielton",
      "tipper",
      { en: "Tipper", uk: "Самоскид", sk: "Sklápač", de: "Kipper", pl: "Tipper" },
      {
        en: "Wielton tipper semi-trailer",
        uk: "Wielton tipper semi-trailer",
        sk: "Wielton tipper semi-trailer",
        de: "Wielton Kippsattelauflieger",
        pl: "Wielton tipper semi-trailer",
      },
    ),
    modelItem(
      "wielton",
      "platform",
      { en: "Platform", uk: "Platform", sk: "Platform", de: "Platform", pl: "Platform" },
      {
        en: "Wielton platform and low-bed trailer",
        uk: "Wielton platform and low-bed trailer",
        sk: "Wielton platform and low-bed trailer",
        de: "Wielton Plattform- und Tiefladerauflieger",
        pl: "Wielton platform and low-bed trailer",
      },
    ),
  ],
  lamberet: [
    modelItem(
      "lamberet",
      "sr",
      { en: "SR", uk: "SR", sk: "SR", de: "SR", pl: "SR" },
      {
        en: "Lamberet SR refrigerated semi-trailer",
        uk: "Lamberet SR refrigerated semi-trailer",
        sk: "Lamberet SR refrigerated semi-trailer",
        de: "Lamberet SR Kühlauflieger",
        pl: "Lamberet SR refrigerated semi-trailer",
      },
    ),
    modelItem(
      "lamberet",
      "multi-temp",
      { en: "Multi-temp", uk: "Multi-temp", sk: "Multi-temp", de: "Multi-temp", pl: "Multi-temp" },
      {
        en: "Lamberet multi-temperature refrigerated trailer",
        uk: "Lamberet multi-temperature refrigerated trailer",
        sk: "Lamberet multi-temperature refrigerated trailer",
        de: "Lamberet Mehrtemperatur-Kühlauflieger",
        pl: "Lamberet multi-temperature refrigerated trailer",
      },
    ),
    modelItem(
      "lamberet",
      "insulated",
      { en: "Insulated liner", uk: "Ізотерм", sk: "Izotermický", de: "Isolierter Liner", pl: "Insulated liner" },
      {
        en: "Lamberet insulated dry freight liner",
        uk: "Lamberet insulated dry freight liner",
        sk: "Lamberet insulated dry freight liner",
        de: "Lamberet isolierter Trockenfracht-Liner",
        pl: "Lamberet insulated dry freight liner",
      },
    ),
  ],
};
