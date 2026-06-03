import { ReviewsAdminPanel } from "@/components/admin/reviews-admin-panel";
import { isReviewsAdminAuthenticated } from "@/lib/reviews-admin-auth";
import { listAllSiteReviews } from "@/lib/site-reviews";

export default async function AdminReviewsPage() {
  const authenticated = await isReviewsAdminAuthenticated();
  const initialReviews = authenticated ? await listAllSiteReviews() : [];
  return (
    <ReviewsAdminPanel initialAuthenticated={authenticated} initialReviews={initialReviews} />
  );
}
