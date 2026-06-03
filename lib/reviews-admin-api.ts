import { NextResponse } from "next/server";
import { isReviewsAdminAuthenticated } from "@/lib/reviews-admin-auth";

export async function requireReviewsAdmin(): Promise<NextResponse | null> {
  const ok = await isReviewsAdminAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
