import type { TeamStats } from "@/lib/types";
import { Card } from "@/components/ui/card";

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center">
      <p className="font-data text-2xl font-bold text-[var(--color-fifa-gold)]">{value}</p>
      <p className="mt-0.5 text-xs uppercase tracking-wide text-[var(--foreground-dim)]">{label}</p>
    </div>
  );
}

export function TeamStatsGrid({ stats }: { stats: TeamStats }) {
  return (
    <Card className="grid grid-cols-3 gap-4 p-5 sm:grid-cols-6">
      <Stat label="Played" value={stats.matchesPlayed} />
      <Stat label="Won" value={stats.wins} />
      <Stat label="Drawn" value={stats.draws} />
      <Stat label="Lost" value={stats.losses} />
      <Stat label="GF / GA" value={`${stats.goalsFor}/${stats.goalsAgainst}`} />
      <Stat label="Clean Sheets" value={stats.cleanSheets} />
    </Card>
  );
}
