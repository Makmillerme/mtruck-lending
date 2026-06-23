/** Full-size logos (modal, detail). Mercedes SVG is ~1.5MB — use card raster in carousel. */
const brandLogos: Record<string, string> = {
  mercedes: "/brands/mercedes.svg",
  man: "/brands/man.svg",
  scania: "/brands/scania.svg",
  volvo: "/brands/volvo.svg",
  renault: "/brands/renault.svg",
  daf: "/brands/daf.svg",
  schmitz: "/brands/schmitz.svg",
  krone: "/brands/krone.svg",
  koegel: "/brands/koegel.svg",
  kogel: "/brands/koegel.svg",
  wielton: "/brands/wielton.svg",
  lamberet: "/brands/lamberet.svg",
};

/** Lightweight assets for catalog carousel cards. */
const cardBrandLogos: Record<string, string> = {
  mercedes: "/brands/mercedes-card.webp",
  man: "/brands/man.svg",
  scania: "/brands/scania.svg",
  volvo: "/brands/volvo.svg",
  renault: "/brands/renault.svg",
  daf: "/brands/daf.svg",
  schmitz: "/brands/schmitz.svg",
  krone: "/brands/krone.svg",
  koegel: "/brands/koegel.svg",
  kogel: "/brands/koegel.svg",
  wielton: "/brands/wielton.svg",
  lamberet: "/brands/lamberet.svg",
};

function normalizeBrandName(brand: string) {
  return brand
    .toLowerCase()
    .normalize("NFKD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .replaceAll(/[^a-z0-9]+/g, " ")
    .trim();
}

export function getCatalogBrandLogoKey(brand: string): string | null {
  const normalized = normalizeBrandName(brand);
  if (!normalized) return null;

  if (brandLogos[normalized]) return normalized;

  const firstWord = normalized.split(" ")[0];
  return firstWord && brandLogos[firstWord] ? firstWord : null;
}

/** Logo for catalog carousel cards — uses optimized raster for heavy SVGs. */
export function getCatalogBrandLogo(brand: string): string | null {
  const key = getCatalogBrandLogoKey(brand);
  if (!key) return null;
  return cardBrandLogos[key] ?? brandLogos[key] ?? null;
}

/** Full logo (e.g. brand modal) — may include large SVGs. */
export function getCatalogBrandLogoFull(brand: string): string | null {
  const key = getCatalogBrandLogoKey(brand);
  return key ? brandLogos[key] : null;
}
