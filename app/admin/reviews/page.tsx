import { ReviewsAdminPanel } from "@/components/admin/reviews-admin-panel";
import { isReviewsAdminAuthenticated } from "@/lib/reviews-admin-auth";
import { getSiteReviewsSettings, listAllSiteReviews } from "@/lib/site-reviews";

export default async function AdminReviewsPage() {
  const authenticated = await isReviewsAdminAuthenticated();
  const [initialReviews, initialSettings] = await Promise.all([
    authenticated ? listAllSiteReviews() : Promise.resolve([]),
    getSiteReviewsSettings(),
  ]);
  return (
    <ReviewsAdminPanel
      initialAuthenticated={authenticated}
      initialReviews={initialReviews}
      initialSettings={initialSettings}
    />
  );
}
