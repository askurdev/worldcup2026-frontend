import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-fifa-gold)] text-[var(--color-pitch-night)] hover:bg-[var(--color-fifa-gold)]/90",
  secondary:
    "bg-white/5 text-[var(--foreground)] hover:bg-white/10 ring-1 ring-[var(--border-subtle)]",
  ghost: "text-[var(--foreground-dim)] hover:text-[var(--foreground)] hover:bg-white/5",
  icon: "text-[var(--foreground-dim)] hover:text-[var(--foreground)] hover:bg-white/5 p-2 rounded-full",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
