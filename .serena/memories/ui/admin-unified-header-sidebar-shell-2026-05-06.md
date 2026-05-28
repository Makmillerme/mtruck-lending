Refactored components/admin/admin-dashboard.tsx to make header and sidebar a unified layout shell.
- Added fixed top shell (`h-[73px]`) containing desktop brand block (left) + main header breadcrumbs (right).
- Sidebar now starts under header (`top-[73px] bottom-0`) and behaves as one piece with fixed header.
- Main content offset adjusted: `pt-[73px] lg:pl-64`.
- Mobile overlay now starts below header (`top-[73px]`) and mobile sidebar includes local top row with close button.
Outcome: header is non-scrollable fixed layout part, visually unified with sidebar.