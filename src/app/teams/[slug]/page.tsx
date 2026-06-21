"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useTeam } from "@/hooks/use-teams";
import { useFavoritesStore } from "@/store/favorites-store";
import { FavoriteButton } from "@/components/favorites/favorite-button";
import { PlayerCard } from "@/components/team/player-card";
import { TeamStatsGrid } from "@/components/team/team-stats-grid";
import { MatchCard } from "@/components/match/match-card";
import { Badge } from "@/components/ui/badge";

export default function TeamDetailsPage() {
  const params = useParams<{ slug: string }>();
  const { data: team, isLoading, error } = useTeam(params.slug);
  const { isFavoriteTeam, toggleFavoriteTeam } = useFavoritesStore();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 text-center text-[var(--foreground-dim)] sm:px-6">
        Loading team...
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6">
        <p className="text-[var(--foreground)]">Team not found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-[var(--border-subtle)] bg-[var(--background-elevated)] px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <Image
            src={team.flagUrl}
            alt=""
            width={96}
            height={72}
            className="rounded-md object-cover ring-1 ring-white/10"
            unoptimized
          />
          <h1 className="font-display mt-4 text-4xl text-[var(--foreground)]">{team.name}</h1>
          <div className="mt-3 flex items-center gap-2">
            <Badge variant="gold">Group {team.group}</Badge>
            <Badge>{team.confederation}</Badge>
            {team.isHost && <Badge variant="live">Host Nation</Badge>}
            <FavoriteButton
              isFavorite={isFavoriteTeam(team.id)}
              onToggle={() => toggleFavoriteTeam(team.id)}
              label={team.name}
            />
          </div>
          <p className="mt-3 text-sm text-[var(--foreground-dim)]">
            Coach: {team.coachName} · FIFA Ranking #{team.fifaRanking}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <TeamStatsGrid stats={team.stats} />

        <div className="mt-10">
          <h2 className="font-display mb-4 text-xl text-[var(--foreground)]">
            Squad ({team.squad.length})
          </h2>
          {team.squad.length === 0 ? (
            <p className="text-sm text-[var(--foreground-dim)]">
              Full squad list not available yet for this team in the mock dataset.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {team.squad.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          <h2 className="font-display mb-4 text-xl text-[var(--foreground)]">Upcoming Matches</h2>
          {team.upcomingMatches.length === 0 ? (
            <p className="text-sm text-[var(--foreground-dim)]">No upcoming matches scheduled.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {team.upcomingMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          <h2 className="font-display mb-4 text-xl text-[var(--foreground)]">Previous Matches</h2>
          {team.previousMatches.length === 0 ? (
            <p className="text-sm text-[var(--foreground-dim)]">No matches played yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {team.previousMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
