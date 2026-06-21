"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { useSearch } from "@/hooks/use-standings";
import { MatchCard } from "@/components/match/match-card";
import { Card } from "@/components/ui/card";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { data: results, isLoading } = useSearch(query);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl text-[var(--foreground)]">Search</h1>
      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--foreground-dim)]" />
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search teams, players, or matches..."
          className="w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--background-elevated)] py-3 pl-11 pr-4 text-[var(--foreground)] placeholder:text-[var(--foreground-dim)] focus:border-[var(--color-fifa-gold)]/50"
        />
      </div>

      {query.trim().length <= 1 ? (
        <p className="mt-6 text-sm text-[var(--foreground-dim)]">
          Type at least 2 characters to search.
        </p>
      ) : isLoading ? (
        <p className="mt-6 text-sm text-[var(--foreground-dim)]">Searching...</p>
      ) : !results ||
        (results.teams.length === 0 && results.players.length === 0 && results.matches.length === 0) ? (
        <p className="mt-6 text-sm text-[var(--foreground-dim)]">
          No results for &quot;{query}&quot;.
        </p>
      ) : (
        <div className="mt-6 space-y-8">
          {results.teams.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--foreground-dim)]">
                Teams
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {results.teams.map((team) => (
                  <Link key={team.id} href={`/teams/${team.slug}`}>
                    <Card className="flex items-center gap-2 p-3 hover:border-[var(--color-fifa-gold)]/40">
                      <Image
                        src={team.flagUrl}
                        alt=""
                        width={24}
                        height={18}
                        className="rounded-[2px] object-cover"
                        unoptimized
                      />
                      <span className="truncate text-sm text-[var(--foreground)]">{team.name}</span>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {results.players.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--foreground-dim)]">
                Players
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {results.players.map((player) => (
                  <Link key={player.id} href={`/players/${player.slug}`}>
                    <Card className="flex items-center gap-2 p-3 hover:border-[var(--color-fifa-gold)]/40">
                      <Image
                        src={player.photoUrl}
                        alt=""
                        width={28}
                        height={28}
                        className="rounded-full bg-white/5"
                        unoptimized
                      />
                      <span className="truncate text-sm text-[var(--foreground)]">
                        {player.knownAs}
                      </span>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {results.matches.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--foreground-dim)]">
                Matches
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {results.matches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
