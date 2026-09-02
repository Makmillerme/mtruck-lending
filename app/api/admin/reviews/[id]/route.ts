import { NextResponse } from "next/server";
import { z } from "zod";
import { deleteSiteReview, getSiteReviewById, updateSiteReview } from "@/lib/site-reviews";
import { requireReviewsAdmin } from "@/lib/reviews-admin-api";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const patchSchema = z.object({
  locale: z.enum(["en", "uk", "sk", "de", "pl"]).optional(),
  quote: z.string().trim().min(20).max(2000).optional(),
  author: z.string().trim().min(1).max(120).optional(),
  company: z.string().trim().max(160).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  status: z.enum(["approved", "pending"]).optional(),
});

export async function PATCH(request: Request, context: RouteContext) {
  const unauthorized = await requireReviewsAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await context.params;
    const existing = await getSiteReviewById(id);
    if (!existing) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    const body = await request.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const updated = await updateSiteReview(id, parsed.data);
    return NextResponse.json({ review: updated });
  } catch (error) {
    console.error("Admin review PATCH failed", error);
    return NextResponse.json({ error: "Unable to update review" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const unauthorized = await requireReviewsAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await context.params;
    const deleted = await deleteSiteReview(id);
    if (!deleted) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin review DELETE failed", error);
    return NextResponse.json({ error: "Unable to delete review" }, { status: 500 });
  }
}
