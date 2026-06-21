"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function FavoriteButton({
  isFavorite,
  onToggle,
  label,
  className,
}: {
  isFavorite: boolean;
  onToggle: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={isFavorite ? `Remove ${label} from favorites` : `Add ${label} to favorites`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className={cn(
        "rounded-full p-1.5 transition-colors hover:bg-white/10",
        className
      )}
    >
      <Star
        className={cn(
          "h-4 w-4 transition-colors",
          isFavorite
            ? "fill-[var(--color-fifa-gold)] text-[var(--color-fifa-gold)]"
            : "text-[var(--foreground-dim)]"
        )}
      />
    </button>
  );
}
