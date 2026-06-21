"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Match } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/favorites/favorite-button";
import { useFavoritesStore } from "@/store/favorites-store";
import { toBSTTime, toBSTDate, toVenueTime, getCountdown } from "@/lib/utils/time";

function TeamRow({
  flagUrl,
  name,
  score,
  isWinner,
  showScore,
}: {
  flagUrl: string;
  name: string;
  score: number;
  isWinner: boolean;
  showScore: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0">
        <Image
          src={flagUrl}
          alt=""
          width={24}
          height={18}
          className="rounded-[2px] object-cover shrink-0 ring-1 ring-white/10"
          unoptimized
        />
        <span
          className={`truncate text-sm ${
            isWinner ? "font-semibold text-[var(--foreground)]" : "text-[var(--foreground-dim)]"
          }`}
        >
          {name}
        </span>
      </div>
      {showScore && (
        <span
          className={`font-data text-lg shrink-0 ${
            isWinner ? "font-bold text-[var(--color-fifa-gold)]" : "text-[var(--foreground-dim)]"
          }`}
        >
          {score}
        </span>
      )}
    </div>
  );
}

export function MatchCard({ match }: { match: Match }) {
  const { isFavoriteTeam, toggleFavoriteTeam } = useFavoritesStore();
  const isLive = match.status === "live" || match.status === "halftime";
  const isCompleted = match.status === "completed";
  const showScore = isLive || isCompleted;
  const homeWins = isCompleted && match.homeScore > match.awayScore;
  const awayWins = isCompleted && match.awayScore > match.homeScore;
  const eitherFavorited =
    isFavoriteTeam(match.homeTeam.id) || isFavoriteTeam(match.awayTeam.id);

  return (
    <Link href={`/matches/${match.id}`} className="block">
      <Card
        className={`p-4 transition-colors hover:border-[var(--color-fifa-gold)]/40 ${
          eitherFavorited ? "ring-1 ring-[var(--color-fifa-gold)]/30" : ""
        }`}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isLive ? (
              <Badge variant="live" pulse>
                {match.status === "halftime" ? "HT" : `${match.minute ?? 0}'`}
              </Badge>
            ) : isCompleted ? (
              <Badge variant="completed">Full Time</Badge>
            ) : (
              <Badge variant="scheduled">{getCountdown(match.kickoffUtc)}</Badge>
            )}
            {match.group && (
              <span className="text-xs font-medium text-[var(--foreground-dim)]">
                Group {match.group}
              </span>
            )}
          </div>
          <FavoriteButton
            isFavorite={eitherFavorited}
            onToggle={() => {
              toggleFavoriteTeam(match.homeTeam.id);
            }}
            label={`${match.homeTeam.shortName} or ${match.awayTeam.shortName}`}
          />
        </div>

        <div className="space-y-2.5">
          <TeamRow
            flagUrl={match.homeTeam.flagUrl}
            name={match.homeTeam.name}
            score={match.homeScore}
            isWinner={homeWins}
            showScore={showScore}
          />
          <TeamRow
            flagUrl={match.awayTeam.flagUrl}
            name={match.awayTeam.name}
            score={match.awayScore}
            isWinner={awayWins}
            showScore={showScore}
          />
        </div>

        {/* Signature element: dual-clock — venue local time and BST,
            side by side with a thin divider. This encodes the
            dashboard's core value prop (BST conversion) visually,
            on every single match card. */}
        {!showScore && (
          <div className="mt-4 flex items-center justify-center gap-3 rounded-lg bg-black/20 px-3 py-2 text-xs">
            <div className="flex flex-col items-center">
              <span className="text-[var(--foreground-dim)]">{match.venue.city}</span>
              <span className="font-data font-semibold text-[var(--foreground)]">
                {toVenueTime(match.kickoffUtc, match.venue.timezone)}
              </span>
            </div>
            <div className="h-8 w-px bg-[var(--border-subtle)]" />
            <div className="flex flex-col items-center">
              <span className="text-[var(--color-fifa-gold)]">Dhaka (BST)</span>
              <span className="font-data font-semibold text-[var(--color-fifa-gold)]">
                {toBSTTime(match.kickoffUtc)}
              </span>
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between text-xs text-[var(--foreground-dim)]">
          <span className="flex items-center gap-1 truncate">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">{match.venue.name}</span>
          </span>
          {!showScore && <span className="shrink-0">{toBSTDate(match.kickoffUtc)}</span>}
        </div>
      </Card>
    </Link>
  );
}
