import { cn } from "@/lib/utils/cn";

type BadgeVariant = "default" | "live" | "completed" | "scheduled" | "gold";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[var(--background-elevated)] text-[var(--foreground-dim)]",
  live: "bg-[var(--color-electric-teal)]/15 text-[var(--color-electric-teal)] ring-1 ring-[var(--color-electric-teal)]/40",
  completed: "bg-white/5 text-[var(--foreground-dim)]",
  scheduled: "bg-white/5 text-[var(--foreground-dim)]",
  gold: "bg-[var(--color-fifa-gold)]/15 text-[var(--color-fifa-gold)] ring-1 ring-[var(--color-fifa-gold)]/40",
};

export function Badge({
  children,
  variant = "default",
  className,
  pulse = false,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  pulse?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-electric-teal)] opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-electric-teal)]" />
        </span>
      )}
      {children}
    </span>
  );
}
