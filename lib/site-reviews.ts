import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { Locale } from "@/lib/locale";

export type SiteReviewStatus = "approved" | "pending";

export type SiteReviewRecord = {
  id: string;
  locale: Locale;
  quote: string;
  author: string;
  company: string;
  rating: number;
  createdAt: string;
  status: SiteReviewStatus;
};

export type SiteReviewPublic = Omit<SiteReviewRecord, "status">;

type ReviewsFile = {
  reviews: SiteReviewRecord[];
};

const REVIEWS_FILE = path.join(process.cwd(), "data", "site-reviews.json");

function isReviewsFile(value: unknown): value is ReviewsFile {
  if (!value || typeof value !== "object") return false;
  const reviews = (value as ReviewsFile).reviews;
  return Array.isArray(reviews);
}

async function readReviewsFile(): Promise<ReviewsFile> {
  try {
    const raw = await fs.readFile(REVIEWS_FILE, "utf8");
    const parsed: unknown = JSON.parse(raw);
    if (!isReviewsFile(parsed)) return { reviews: [] };
    return parsed;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return { reviews: [] };
    throw error;
  }
}

async function writeReviewsFile(data: ReviewsFile): Promise<void> {
  await fs.mkdir(path.dirname(REVIEWS_FILE), { recursive: true });
  const tmp = `${REVIEWS_FILE}.${process.pid}.tmp`;
  const payload = `${JSON.stringify(data, null, 2)}\n`;
  await fs.writeFile(tmp, payload, "utf8");
  await fs.rename(tmp, REVIEWS_FILE);
}

export function toPublicReview(review: SiteReviewRecord): SiteReviewPublic {
  return {
    id: review.id,
    locale: review.locale,
    quote: review.quote,
    author: review.author,
    company: review.company,
    rating: review.rating,
    createdAt: review.createdAt,
  };
}

export async function listApprovedSiteReviews(): Promise<SiteReviewPublic[]> {
  const file = await readReviewsFile();
  return file.reviews
    .filter((item) => item.status === "approved")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map(toPublicReview);
}

export type CreateSiteReviewInput = {
  locale: Locale;
  quote: string;
  author: string;
  company: string;
  rating: number;
};

function reviewsAutoApprove(): boolean {
  const raw = process.env.REVIEWS_AUTO_APPROVE?.trim().toLowerCase();
  if (!raw) return true;
  return raw === "1" || raw === "true" || raw === "yes";
}

export async function listAllSiteReviews(): Promise<SiteReviewRecord[]> {
  const file = await readReviewsFile();
  return [...file.reviews].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getSiteReviewById(id: string): Promise<SiteReviewRecord | null> {
  const file = await readReviewsFile();
  return file.reviews.find((item) => item.id === id) ?? null;
}

export type UpdateSiteReviewInput = Partial<{
  locale: Locale;
  quote: string;
  author: string;
  company: string;
  rating: number;
  status: SiteReviewStatus;
}>;

export async function updateSiteReview(
  id: string,
  input: UpdateSiteReviewInput,
): Promise<SiteReviewRecord | null> {
  const file = await readReviewsFile();
  const index = file.reviews.findIndex((item) => item.id === id);
  if (index < 0) return null;

  const current = file.reviews[index];
  const next: SiteReviewRecord = {
    ...current,
    ...input,
    id: current.id,
    createdAt: current.createdAt,
  };

  file.reviews[index] = next;
  await writeReviewsFile(file);
  return next;
}

export async function deleteSiteReview(id: string): Promise<boolean> {
  const file = await readReviewsFile();
  const before = file.reviews.length;
  file.reviews = file.reviews.filter((item) => item.id !== id);
  if (file.reviews.length === before) return false;
  await writeReviewsFile(file);
  return true;
}

export async function createSiteReview(
  input: CreateSiteReviewInput,
): Promise<{ record: SiteReviewRecord; publicReview: SiteReviewPublic | null }> {
  const file = await readReviewsFile();
  const status: SiteReviewStatus = reviewsAutoApprove() ? "approved" : "pending";
  const record: SiteReviewRecord = {
    id: randomUUID(),
    locale: input.locale,
    quote: input.quote,
    author: input.author,
    company: input.company,
    rating: input.rating,
    createdAt: new Date().toISOString(),
    status,
  };

  file.reviews.push(record);
  await writeReviewsFile(file);

  return {
    record,
    publicReview: status === "approved" ? toPublicReview(record) : null,
  };
}
