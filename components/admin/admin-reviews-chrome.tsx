import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BRAND_LOGO_SRC } from "@/lib/branding";

interface AdminReviewsChromeProps {
  children: ReactNode;
  headerActions?: ReactNode;
}

export function AdminReviewsChrome({ children, headerActions }: AdminReviewsChromeProps) {
  return (
    <div className="admin-reviews-shell relative z-[1] flex min-h-screen flex-col">
      <header className="admin-reviews-header">
        <div className="landing-page-container admin-reviews-header-inner">
          <Link href="/" className="admin-reviews-brand">
            <Image
              src={BRAND_LOGO_SRC}
              alt="Expert Travel"
              width={32}
              height={32}
              className="admin-reviews-brand-logo"
            />
            <span className="admin-reviews-brand-text">Expert Travel</span>
          </Link>
          <div className="admin-reviews-header-end">
            <span className="admin-reviews-header-badge">Адмін · Відгуки</span>
            {headerActions}
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
