import { cn } from "@/lib/utils/cn";

export function Card({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--background-elevated)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
