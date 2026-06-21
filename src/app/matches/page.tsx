"use client";

import { useState } from "react";
import { useMatches } from "@/hooks/use-matches";
import { MatchSection } from "@/components/match/match-section";
import { cn } from "@/lib/utils/cn";
import type { MatchListParams } from "@/lib/providers/football-data-provider";

const STATUS_FILTERS: { label: string; value: MatchListParams["status"] }[] = [
  { label: "All", value: undefined },
  { label: "Live", value: "live" },
  { label: "Scheduled", value: "scheduled" },
  { label: "Completed", value: "completed" },
];

export default function MatchesPage() {
  const [status, setStatus] = useState<MatchListParams["status"]>(undefined);
  const { data: response, isLoading } = useMatches({
    status,
    pageSize: 48,
    sortBy: "matchNumber",
    sortOrder: "asc",
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl text-[var(--foreground)]">All Matches</h1>
      <p className="mt-2 text-sm text-[var(--foreground-dim)]">
        Full group-stage schedule, converted to Bangladesh Standard Time.
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.label}
            onClick={() => setStatus(f.value)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium",
              status === f.value
                ? "bg-[var(--color-fifa-gold)] text-[var(--color-pitch-night)]"
                : "bg-white/5 text-[var(--foreground-dim)] hover:bg-white/10"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-2">
        <MatchSection
          title=""
          matches={response?.data}
          isLoading={isLoading}
          emptyMessage="No matches match this filter."
        />
      </div>
    </div>
  );
}
