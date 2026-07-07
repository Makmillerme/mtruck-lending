import { NextResponse } from "next/server";
import { getSiteReviewsSettings, listAllSiteReviews } from "@/lib/site-reviews";
import { requireReviewsAdmin } from "@/lib/reviews-admin-api";

export const runtime = "nodejs";

export async function GET() {
  const unauthorized = await requireReviewsAdmin();
  if (unauthorized) return unauthorized;

  try {
    const [reviews, settings] = await Promise.all([listAllSiteReviews(), getSiteReviewsSettings()]);
    return NextResponse.json({ reviews, settings });
  } catch (error) {
    console.error("Admin reviews GET failed", error);
    return NextResponse.json({ error: "Unable to load reviews" }, { status: 500 });
  }
}
