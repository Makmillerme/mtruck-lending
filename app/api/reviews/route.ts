import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import {
  createSiteReview,
  getSiteReviewsSettings,
  listApprovedSiteReviews,
} from "@/lib/site-reviews";
import { consumeRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const postSchema = z.object({
  locale: z.enum(["en", "uk", "sk", "de", "pl"]),
  quote: z.string().trim().min(20).max(2000),
  author: z.string().trim().min(1).max(120),
  company: z.string().trim().max(160).optional().default(""),
  rating: z.number().int().min(1).max(5),
  website: z.string().max(0).optional().default(""),
});

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60 * 60 * 1000;
const BLOCK_MS = 2 * 60 * 60 * 1000;

function getClientIp(forwardedFor: string | null, realIp: string | null): string {
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  if (realIp?.trim()) return realIp.trim();
  return "unknown";
}

export async function GET() {
  try {
    const settings = await getSiteReviewsSettings();
    const reviews = settings.showReviews ? await listApprovedSiteReviews() : [];
    return NextResponse.json(
      { settings, reviews },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Reviews GET failed", error);
    return NextResponse.json({ error: "Unable to load reviews" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = postSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    if (parsed.data.website) {
      return NextResponse.json({ success: true });
    }

    const settings = await getSiteReviewsSettings();
    if (!settings.showReviews || !settings.allowSubmit) {
      return NextResponse.json({ error: "Review submissions are disabled" }, { status: 403 });
    }

    const reqHeaders = await headers();
    const ip = getClientIp(reqHeaders.get("x-forwarded-for"), reqHeaders.get("x-real-ip"));

    const ipLimit = consumeRateLimit({
      key: `reviews:ip:${ip}`,
      maxAttempts: MAX_ATTEMPTS,
      windowMs: WINDOW_MS,
      blockMs: BLOCK_MS,
    });

    if (!ipLimit.allowed) {
      return NextResponse.json(
        { error: "Too many reviews from this address. Please try again later." },
        { status: 429, headers: { "Retry-After": String(Math.max(ipLimit.retryAfterSeconds, 60)) } },
      );
    }

    const { record, publicReview } = await createSiteReview({
      locale: parsed.data.locale,
      quote: parsed.data.quote,
      author: parsed.data.author,
      company: parsed.data.company,
      rating: parsed.data.rating,
    });

    return NextResponse.json({
      success: true,
      status: record.status,
      review: publicReview,
    });
  } catch (error) {
    console.error("Reviews POST failed", error);
    return NextResponse.json({ error: "Unable to save review" }, { status: 500 });
  }
}
