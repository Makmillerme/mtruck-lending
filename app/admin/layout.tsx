import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Керування відгуками",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="landing-bg min-h-screen text-foreground">{children}</div>;
}
