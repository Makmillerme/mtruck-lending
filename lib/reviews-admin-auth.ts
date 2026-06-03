import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const REVIEWS_ADMIN_COOKIE = "reviews_admin_session";

function getAdminPassword(): string | null {
  const value = process.env.REVIEWS_ADMIN_PASSWORD?.trim();
  return value && value.length >= 8 ? value : null;
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
    const a = Buffer.from(password, "utf8");
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
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}
