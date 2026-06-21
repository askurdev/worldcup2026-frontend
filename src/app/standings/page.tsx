"use client";

import { useGroups } from "@/hooks/use-standings";
import { StandingsTable } from "@/components/standings/standings-table";
import { Card } from "@/components/ui/card";

function StandingsSkeleton() {
  return (
    <Card className="p-0">
      <div className="h-12 animate-pulse border-b border-[var(--border-subtle)] bg-white/5" />
      <div className="space-y-3 p-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-6 animate-pulse rounded bg-white/5" />
        ))}
      </div>
    </Card>
  );
}

export default function StandingsPage() {
  const { data: groups, isLoading } = useGroups();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl text-[var(--foreground)]">Group Standings</h1>
      <p className="mt-2 text-sm text-[var(--foreground-dim)]">
        All 12 groups, updated as results come in.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <StandingsSkeleton key={i} />)
          : groups?.map((group) => <StandingsTable key={group.name} group={group} />)}
      </div>
    </div>
  );
}
