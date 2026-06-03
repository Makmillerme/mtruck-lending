import { NextResponse } from "next/server";
import { listAllSiteReviews } from "@/lib/site-reviews";
import { requireReviewsAdmin } from "@/lib/reviews-admin-api";

export const runtime = "nodejs";

export async function GET() {
  const unauthorized = await requireReviewsAdmin();
  if (unauthorized) return unauthorized;

  try {
    const reviews = await listAllSiteReviews();
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Admin reviews GET failed", error);
    return NextResponse.json({ error: "Unable to load reviews" }, { status: 500 });
  }
}
