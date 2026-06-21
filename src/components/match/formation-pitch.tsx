import type { TeamLineup } from "@/lib/types";
import { Card } from "@/components/ui/card";

// Approximate (x%, y%) positions per grid slot for a 4-3-3-ish layout.
// gridPosition is "row:col" from buildMockLineup (1:1 .. 4:3 roughly).
// This is a simplified visual approximation, not a tactically precise
// formation renderer — sufficient for an at-a-glance lineup view.
function positionFor(gridPosition: string | undefined, index: number): { x: number; y: number } {
  if (!gridPosition) {
    // fallback: spread evenly if no grid position provided
    return { x: 20 + (index % 4) * 20, y: 20 + Math.floor(index / 4) * 25 };
  }
  const [row, col] = gridPosition.split(":").map(Number);
  return {
    x: 15 + (col - 1) * 30,
    y: 12 + (row - 1) * 25,
  };
}

export function FormationPitch({
  lineup,
  teamName,
  flipVertical = false,
}: {
  lineup: TeamLineup;
  teamName: string;
  flipVertical?: boolean;
}) {
  return (
    <Card className="overflow-hidden p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-[var(--foreground)]">{teamName}</h4>
        <span className="font-data text-xs text-[var(--foreground-dim)]">{lineup.formation}</span>
      </div>
      <div
        className="relative aspect-[4/3] w-full rounded-lg"
        style={{
          backgroundColor: "var(--color-pitch-green)",
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 20%)",
        }}
      >
        {lineup.startingXI.map((player, idx) => {
          const pos = positionFor(player.gridPosition, idx);
          const y = flipVertical ? 100 - pos.y : pos.y;
          return (
            <div
              key={player.playerId}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5"
              style={{ left: `${pos.x}%`, top: `${y}%` }}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-fifa-gold)] font-data text-xs font-bold text-[var(--color-pitch-night)] ring-2 ring-black/20">
                {player.shirtNumber}
              </div>
              <span className="max-w-[60px] truncate text-[10px] text-[var(--foreground)]">
                {player.playerName}
              </span>
            </div>
          );
        })}
      </div>

      {lineup.substitutes.length > 0 && (
        <div className="mt-3">
          <p className="mb-1.5 text-xs font-medium text-[var(--foreground-dim)]">Substitutes</p>
          <div className="flex flex-wrap gap-1.5">
            {lineup.substitutes.map((sub) => (
              <span
                key={sub.playerId}
                className="rounded-full bg-white/5 px-2 py-1 text-xs text-[var(--foreground-dim)]"
              >
                {sub.shirtNumber} {sub.playerName}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
