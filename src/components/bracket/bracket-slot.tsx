import Image from "next/image";
import Link from "next/link";
import type { BracketMatch } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

function TeamLine({
  flagUrl,
  name,
  score,
  isWinner,
  hasScore,
}: {
  flagUrl?: string;
  name: string;
  score?: number;
  isWinner?: boolean;
  hasScore: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 px-2.5 py-1.5",
        isWinner && "bg-[var(--color-fifa-gold)]/[0.06]"
      )}
    >
      <div className="flex min-w-0 items-center gap-1.5">
        {flagUrl ? (
          <Image
            src={flagUrl}
            alt=""
            width={16}
            height={12}
            className="shrink-0 rounded-[1px] object-cover"
            unoptimized
          />
        ) : (
          <span className="h-3 w-4 shrink-0 rounded-[1px] bg-white/10" />
        )}
        <span
          className={cn(
            "truncate text-xs",
            flagUrl ? "text-[var(--foreground)]" : "text-[var(--foreground-dim)] italic"
          )}
        >
          {name}
        </span>
      </div>
      {hasScore && (
        <span
          className={cn(
            "font-data text-xs font-bold",
            isWinner ? "text-[var(--color-fifa-gold)]" : "text-[var(--foreground-dim)]"
          )}
        >
          {score}
        </span>
      )}
    </div>
  );
}

export function BracketSlot({ slot }: { slot: BracketMatch }) {
  const hasScore = slot.homeScore !== undefined && slot.awayScore !== undefined;
  const homeWins = hasScore && slot.homeScore! > slot.awayScore!;
  const awayWins = hasScore && slot.awayScore! > slot.homeScore!;

  const content = (
    <div className="w-56 shrink-0 overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--background-elevated)]">
      <TeamLine
        flagUrl={slot.homeTeam?.flagUrl}
        name={slot.homeTeam?.shortName ?? "TBD"}
        score={slot.homeScore}
        isWinner={homeWins}
        hasScore={hasScore}
      />
      <div className="h-px bg-[var(--border-subtle)]" />
      <TeamLine
        flagUrl={slot.awayTeam?.flagUrl}
        name={slot.awayTeam?.shortName ?? "TBD"}
        score={slot.awayScore}
        isWinner={awayWins}
        hasScore={hasScore}
      />
      {!slot.homeTeam && (
        <p className="border-t border-[var(--border-subtle)] px-2.5 py-1 text-[10px] leading-tight text-[var(--foreground-dim)]">
          {slot.slotLabel}
        </p>
      )}
    </div>
  );

  if (slot.matchId) {
    return <Link href={`/matches/${slot.matchId}`}>{content}</Link>;
  }
  return content;
}
