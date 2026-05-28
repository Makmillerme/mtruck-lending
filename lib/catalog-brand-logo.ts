const brandLogos: Record<string, string> = {
  man: "/brands/man.svg",
  scania: "/brands/scania.svg",
  volvo: "/brands/volvo.svg",
  renault: "/brands/renault.svg",
  daf: "/brands/daf.svg",
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

export function getCatalogBrandLogo(brand: string): string | null {
  const key = getCatalogBrandLogoKey(brand);
  return key ? brandLogos[key] : null;
}
