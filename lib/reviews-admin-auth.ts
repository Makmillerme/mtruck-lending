import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const REVIEWS_ADMIN_COOKIE = "reviews_admin_session";

function stripEnvQuotes(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function getAdminPassword(): string | null {
  const raw = process.env.REVIEWS_ADMIN_PASSWORD;
  if (!raw) return null;
  const value = stripEnvQuotes(raw);
  return value.length >= 8 ? value : null;
}

function useSecureCookies(): boolean {
  const explicit = process.env.COOKIE_SECURE?.trim().toLowerCase();
  if (explicit === "1" || explicit === "true" || explicit === "yes") return true;
  if (explicit === "0" || explicit === "false" || explicit === "no") return false;
  // Default off: production may be reached via http://IP:3002 until HTTPS/nginx is ready.
  return false;
}

export function isReviewsAdminConfigured(): boolean {
  return Boolean(getAdminPassword());
}

export function createAdminSessionToken(): string {
  const password = getAdminPassword();
  if (!password) {
    throw new Error("REVIEWS_ADMIN_PASSWORD is not configured");
  }
  return createHmac("sha256", password).update("reviews-admin-v1").digest("hex");
}

export function verifyAdminSessionToken(token: string | undefined | null): boolean {
  if (!token || !isReviewsAdminConfigured()) return false;
  let expected: string;
  try {
    expected = createAdminSessionToken();
  } catch {
    return false;
  }
  try {
    const a = Buffer.from(token, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password: string): boolean {
  const configured = getAdminPassword();
  if (!configured) return false;
  try {
    const a = Buffer.from(password.trim(), "utf8");
    const b = Buffer.from(configured, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function isReviewsAdminAuthenticated(): Promise<boolean> {
  if (!isReviewsAdminConfigured()) return false;
  const cookieStore = await cookies();
  const token = cookieStore.get(REVIEWS_ADMIN_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: useSecureCookies(),
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}
