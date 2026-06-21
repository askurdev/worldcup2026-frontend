"use client";

import { Hero } from "@/components/layout/hero";
import { MatchSection } from "@/components/match/match-section";
import { useTodayMatches, useLiveMatches, useMatches } from "@/hooks/use-matches";

export default function HomePage() {
  const { data: todayMatches, isLoading: todayLoading } = useTodayMatches();
  const { data: liveMatches, isLoading: liveLoading } = useLiveMatches();
  const { data: upcomingResponse, isLoading: upcomingLoading } = useMatches({
    status: "scheduled",
    pageSize: 6,
  });
  const { data: completedResponse, isLoading: completedLoading } = useMatches({
    status: "completed",
    sortOrder: "desc",
    pageSize: 6,
  });

  return (
    <div>
      <Hero />

      <div className="mx-auto max-w-7xl">
        <MatchSection
          title="Live Now"
          matches={liveMatches}
          isLoading={liveLoading}
          emptyMessage="No matches live right now — check back closer to kickoff."
          accentDot="live"
        />

        <MatchSection
          title="Today's Matches (BST)"
          matches={todayMatches}
          isLoading={todayLoading}
          emptyMessage="No matches kick off today in Bangladesh time — check the upcoming fixtures below."
          accentDot="gold"
        />

        <MatchSection
          title="Upcoming"
          matches={upcomingResponse?.data}
          isLoading={upcomingLoading}
          emptyMessage="No upcoming matches found."
        />

        <MatchSection
          title="Recent Results"
          matches={completedResponse?.data}
          isLoading={completedLoading}
          emptyMessage="No completed matches yet."
        />
      </div>
    </div>
  );
}
