"use client";

import { useParams } from "next/navigation";
import { useMatch } from "@/hooks/use-matches";
import { MatchHeader } from "@/components/match/match-header";
import { MatchTimeline } from "@/components/match/match-timeline";
import { StatBar } from "@/components/match/stat-bar";
import { FormationPitch } from "@/components/match/formation-pitch";
import { Card } from "@/components/ui/card";

export default function MatchDetailsPage() {
  const params = useParams<{ id: string }>();
  const { data: match, isLoading, error } = useMatch(params.id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 text-center text-[var(--foreground-dim)] sm:px-6">
        Loading match...
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6">
        <p className="text-[var(--foreground)]">Match not found.</p>
        <p className="mt-1 text-sm text-[var(--foreground-dim)]">
          It may not exist, or the id in the URL might be wrong.
        </p>
      </div>
    );
  }

  const hasStarted = match.status !== "scheduled";

  return (
    <div>
      <MatchHeader match={match} />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {hasStarted ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display mb-4 text-xl text-[var(--foreground)]">Timeline</h2>
              <MatchTimeline events={match.events} homeTeamId={match.homeTeam.id} />
            </div>

            <div>
              <h2 className="font-display mb-4 text-xl text-[var(--foreground)]">
                Match Statistics
              </h2>
              <Card className="space-y-4 p-5">
                <StatBar
                  label="Possession"
                  homeValue={match.stats.possession.home}
                  awayValue={match.stats.possession.away}
                  isPercentage
                />
                <StatBar label="Shots" homeValue={match.stats.shots.home} awayValue={match.stats.shots.away} />
                <StatBar
                  label="Shots on Target"
                  homeValue={match.stats.shotsOnTarget.home}
                  awayValue={match.stats.shotsOnTarget.away}
                />
                <StatBar
                  label="Corners"
                  homeValue={match.stats.corners.home}
                  awayValue={match.stats.corners.away}
                />
                <StatBar label="Fouls" homeValue={match.stats.fouls.home} awayValue={match.stats.fouls.away} />
                <StatBar
                  label="Offsides"
                  homeValue={match.stats.offsides.home}
                  awayValue={match.stats.offsides.away}
                />
                <StatBar
                  label="Pass Accuracy"
                  homeValue={match.stats.passAccuracy.home}
                  awayValue={match.stats.passAccuracy.away}
                  isPercentage
                />
              </Card>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--background-elevated)] p-6 text-center text-sm text-[var(--foreground-dim)]">
            Timeline and live statistics will appear here once the match kicks off.
          </div>
        )}

        <div className="mt-10">
          <h2 className="font-display mb-4 text-xl text-[var(--foreground)]">
            {hasStarted ? "Lineups" : "Predicted Lineups"}
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <FormationPitch lineup={match.homeLineup} teamName={match.homeTeam.name} />
            <FormationPitch lineup={match.awayLineup} teamName={match.awayTeam.name} flipVertical />
          </div>
        </div>
      </div>
    </div>
  );
}
