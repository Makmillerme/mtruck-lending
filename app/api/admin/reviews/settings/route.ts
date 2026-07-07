import { NextResponse } from "next/server";
import { z } from "zod";
import { requireReviewsAdmin } from "@/lib/reviews-admin-api";
import { getSiteReviewsSettings, updateSiteReviewsSettings } from "@/lib/site-reviews";

export const runtime = "nodejs";

const patchSchema = z.object({
  showReviews: z.boolean().optional(),
  allowSubmit: z.boolean().optional(),
});

export async function PATCH(request: Request) {
  const unauthorized = await requireReviewsAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const parsed = patchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    if (parsed.data.showReviews === undefined && parsed.data.allowSubmit === undefined) {
      return NextResponse.json({ error: "No settings to update" }, { status: 400 });
    }

    const current = await getSiteReviewsSettings();
    const nextShowReviews = parsed.data.showReviews ?? current.showReviews;

    if (parsed.data.allowSubmit === true && !nextShowReviews) {
      return NextResponse.json(
        { error: "Cannot enable review submissions while reviews are hidden" },
        { status: 400 },
      );
    }

    const settings = await updateSiteReviewsSettings(parsed.data);
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Admin reviews settings PATCH failed", error);
    return NextResponse.json({ error: "Unable to update settings" }, { status: 500 });
  }
}
