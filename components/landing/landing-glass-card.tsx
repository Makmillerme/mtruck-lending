import type { LucideIcon } from "lucide-react";

interface LandingGlassCardProps {
  index: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

/** Shared premium-glass card for About features and Services grid. */
export function LandingGlassCard({ index, icon: Icon, title, description }: LandingGlassCardProps) {
  return (
    <article className="landing-glass-card group">
      <span className="landing-glass-card-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="landing-glass-card-icon">
        <Icon className="h-5 w-5 text-cyan-100" />
      </div>

      <h3 className="landing-glass-card-title">{title}</h3>
      <p className="landing-glass-card-desc">{description}</p>
    </article>
  );
}
