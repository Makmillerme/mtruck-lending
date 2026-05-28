Replaced old text/icon logo with provided M-TRUCK image across key UI areas.

Asset:
- Copied provided image into public/m-truck-logo.png

Updated files:
- components/landing/header.tsx: replaced Truck icon + EUROTRUCK text with Next Image (/m-truck-logo.png)
- components/landing/footer.tsx: replaced footer brand block logo with Next Image; removed unused Truck import
- components/admin/admin-dashboard.tsx: replaced desktop and mobile sidebar brand area with Next Image
- components/admin/admin-login.tsx: replaced login brand header with Next Image; removed unused Truck import

Technical notes:
- Used next/image with object-contain and fixed wrapper sizes to avoid layout shift.
- TypeScript and ESLint checks pass clean after changes.