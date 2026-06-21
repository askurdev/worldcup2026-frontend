"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTeams } from "@/hooks/use-teams";
import { Card } from "@/components/ui/card";
import { groupNames } from "@/lib/mock-data/teams";
import { cn } from "@/lib/utils/cn";

export default function TeamsPage() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const { data: response, isLoading } = useTeams({
    pageSize: 48,
    group: selectedGroup ?? undefined,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl text-[var(--foreground)]">All Teams</h1>
      <p className="mt-2 text-sm text-[var(--foreground-dim)]">
        All 48 qualified nations across 12 groups.
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        <button
          onClick={() => setSelectedGroup(null)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium",
            selectedGroup === null
              ? "bg-[var(--color-fifa-gold)] text-[var(--color-pitch-night)]"
              : "bg-white/5 text-[var(--foreground-dim)] hover:bg-white/10"
          )}
        >
          All
        </button>
        {groupNames.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGroup(g)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium",
              selectedGroup === g
                ? "bg-[var(--color-fifa-gold)] text-[var(--color-pitch-night)]"
                : "bg-white/5 text-[var(--foreground-dim)] hover:bg-white/10"
            )}
          >
            Group {g}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-lg bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {response?.data.map((team) => (
            <Link key={team.id} href={`/teams/${team.slug}`}>
              <Card className="flex flex-col items-center gap-2 p-4 text-center transition-colors hover:border-[var(--color-fifa-gold)]/40">
                <Image
                  src={team.flagUrl}
                  alt=""
                  width={40}
                  height={30}
                  className="rounded-[2px] object-cover ring-1 ring-white/10"
                  unoptimized
                />
                <span className="text-xs font-medium text-[var(--foreground)]">
                  {team.shortName}
                </span>
                <span className="text-[10px] text-[var(--foreground-dim)]">Group {team.group}</span>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
