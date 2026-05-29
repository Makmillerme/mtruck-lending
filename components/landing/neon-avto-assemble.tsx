"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const FINAL_SVG = "/images/neon_avto_assemble.svg";

/** Static neon truck visual (no canvas animation). */
export function NeonAvtoAssemble({
  alt,
  className,
  play = true,
}: {
  alt: string;
  className?: string;
  /** When true, the truck visual is shown (scroll-gated from About). */
  play?: boolean;
  /** @deprecated Animation removed; kept for API compatibility. */
  onMorphComplete?: () => void;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full overflow-hidden",
        !play && "invisible",
        className,
      )}
      aria-hidden={!play}
    >
      <Image
        src={FINAL_SVG}
        alt={alt}
        fill
        unoptimized
        sizes="(max-width: 1024px) 100vw, 640px"
        className="pointer-events-none object-contain hero-neon-truck-image"
      />
    </div>
  );
}
