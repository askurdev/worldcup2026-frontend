export function StatBar({
  label,
  homeValue,
  awayValue,
  isPercentage = false,
}: {
  label: string;
  homeValue: number;
  awayValue: number;
  isPercentage?: boolean;
}) {
  const total = homeValue + awayValue || 1;
  const homePercent = (homeValue / total) * 100;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-data font-semibold text-[var(--foreground)]">
          {homeValue}
          {isPercentage ? "%" : ""}
        </span>
        <span className="text-xs uppercase tracking-wide text-[var(--foreground-dim)]">
          {label}
        </span>
        <span className="font-data font-semibold text-[var(--foreground)]">
          {awayValue}
          {isPercentage ? "%" : ""}
        </span>
      </div>
      <div className="flex h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="bg-[var(--color-fifa-gold)]"
          style={{ width: `${homePercent}%` }}
        />
        <div
          className="bg-[var(--color-electric-teal)]"
          style={{ width: `${100 - homePercent}%` }}
        />
      </div>
    </div>
  );
}
