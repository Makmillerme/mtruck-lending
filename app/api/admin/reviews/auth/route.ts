import { NextResponse } from "next/server";
import { z } from "zod";
import {
  REVIEWS_ADMIN_COOKIE,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
  isReviewsAdminConfigured,
  verifyAdminPassword,
} from "@/lib/reviews-admin-auth";

export const runtime = "nodejs";

const loginSchema = z.object({
  password: z.string().min(1).max(256),
});

export async function POST(request: Request) {
  if (!isReviewsAdminConfigured()) {
    return NextResponse.json(
      {
        error:
          "REVIEWS_ADMIN_PASSWORD is missing or shorter than 8 characters in server .env. Restart the container after updating .env.",
      },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (!verifyAdminPassword(parsed.data.password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(REVIEWS_ADMIN_COOKIE, createAdminSessionToken(), getAdminSessionCookieOptions());
    return response;
  } catch (error) {
    console.error("Reviews admin login failed", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(REVIEWS_ADMIN_COOKIE, "", { ...getAdminSessionCookieOptions(), maxAge: 0 });
  return response;
}
