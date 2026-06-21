"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { useFavoritesStore } from "@/store/favorites-store";
import { useTeams } from "@/hooks/use-teams";
import { usePlayers } from "@/hooks/use-players";
import { FavoriteButton } from "@/components/favorites/favorite-button";
import { Card } from "@/components/ui/card";

export default function FavoritesPage() {
  const { favoriteTeamIds, favoritePlayerIds, toggleFavoriteTeam, toggleFavoritePlayer } =
    useFavoritesStore();
  const { data: teamsResponse } = useTeams({ pageSize: 48 });
  const { data: playersResponse } = usePlayers({ pageSize: 100 });

  const favoriteTeams = (teamsResponse?.data ?? []).filter((t) => favoriteTeamIds.includes(t.id));
  const favoritePlayers = (playersResponse?.data ?? []).filter((p) =>
    favoritePlayerIds.includes(p.id)
  );

  const isEmpty = favoriteTeams.length === 0 && favoritePlayers.length === 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl text-[var(--foreground)]">Your Favorites</h1>
      <p className="mt-2 text-sm text-[var(--foreground-dim)]">
        Saved on this device only — stored in your browser&apos;s local storage.
      </p>

      {isEmpty ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed border-[var(--border-subtle)] py-16 text-center">
          <Star className="h-8 w-8 text-[var(--foreground-dim)]" />
          <p className="text-[var(--foreground)]">No favorites yet</p>
          <p className="max-w-xs text-sm text-[var(--foreground-dim)]">
            Tap the star icon on any team or player to save them here.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {favoriteTeams.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--foreground-dim)]">
                Teams
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {favoriteTeams.map((team) => (
                  <Card key={team.id} className="flex items-center gap-3 p-3">
                    <Link href={`/teams/${team.slug}`} className="flex min-w-0 flex-1 items-center gap-3">
                      <Image
                        src={team.flagUrl}
                        alt=""
                        width={28}
                        height={21}
                        className="rounded-[2px] object-cover"
                        unoptimized
                      />
                      <span className="truncate text-sm text-[var(--foreground)]">{team.name}</span>
                    </Link>
                    <FavoriteButton
                      isFavorite
                      onToggle={() => toggleFavoriteTeam(team.id)}
                      label={team.name}
                    />
                  </Card>
                ))}
              </div>
            </section>
          )}

          {favoritePlayers.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--foreground-dim)]">
                Players
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {favoritePlayers.map((player) => (
                  <Card key={player.id} className="flex items-center gap-3 p-3">
                    <Link
                      href={`/players/${player.slug}`}
                      className="flex min-w-0 flex-1 items-center gap-3"
                    >
                      <Image
                        src={player.photoUrl}
                        alt=""
                        width={32}
                        height={32}
                        className="rounded-full bg-white/5"
                        unoptimized
                      />
                      <span className="truncate text-sm text-[var(--foreground)]">
                        {player.knownAs}
                      </span>
                    </Link>
                    <FavoriteButton
                      isFavorite
                      onToggle={() => toggleFavoritePlayer(player.id)}
                      label={player.knownAs}
                    />
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
