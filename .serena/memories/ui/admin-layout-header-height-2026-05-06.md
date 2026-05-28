Adjusted admin layout header heights in components/admin/admin-dashboard.tsx:
- Sidebar logo/header block changed from `p-4 border-b` to fixed-height row `h-[73px] px-4 border-b flex items-center`.
- Main content header changed from `px-6 py-4` to fixed-height row `h-[73px] px-6 flex items-center`.
Result: sidebar top block and main header now have identical vertical height and alignment.