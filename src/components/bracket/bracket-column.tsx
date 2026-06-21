import type { BracketMatch } from "@/lib/types";
import { BracketSlot } from "./bracket-slot";

const ROUND_LABELS: Record<string, string> = {
  round_of_32: "Round of 32",
  round_of_16: "Round of 16",
  quarter_final: "Quarter-Finals",
  semi_final: "Semi-Finals",
  final: "Final",
  third_place: "3rd Place",
};

export function BracketColumn({
  round,
  slots,
  slotGapRem,
}: {
  round: string;
  slots: BracketMatch[];
  slotGapRem: number;
}) {
  return (
    <div className="flex flex-col">
      <h3 className="font-display mb-4 text-center text-sm uppercase tracking-wide text-[var(--foreground-dim)]">
        {ROUND_LABELS[round] ?? round}
      </h3>
      <div
        className="flex flex-1 flex-col justify-around"
        style={{ gap: `${slotGapRem}rem` }}
      >
        {slots.map((slot) => (
          <BracketSlot key={slot.id} slot={slot} />
        ))}
      </div>
    </div>
  );
}
