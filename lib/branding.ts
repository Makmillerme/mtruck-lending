export const BRAND_NAME = "Expert Travel";
export const BRAND_NAME_UPPER = "EXPERT TRAVEL";
export const BRAND_LOGO_SRC = "/expert-travel.png";
export const BRAND_LOGO_ALT = "Expert Travel logo";
export const BRAND_CONTACT_EMAIL = "sales@m-truck.cz";

const LEGACY_LOGO_SRC: Record<string, string> = {
  "/m-truck-logo.png": BRAND_LOGO_SRC,
  "/M-TRUCK logo iron (1).png": BRAND_LOGO_SRC,
};

export function normalizeBrandLogoSrc(src?: string | null): string {
  const trimmed = typeof src === "string" ? src.trim() : "";
  if (!trimmed) return BRAND_LOGO_SRC;
  return LEGACY_LOGO_SRC[trimmed] ?? trimmed;
}
