"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { usePlayer } from "@/hooks/use-players";
import { useFavoritesStore } from "@/store/favorites-store";
import { FavoriteButton } from "@/components/favorites/favorite-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center">
      <p className="font-data text-3xl font-bold text-[var(--color-fifa-gold)]">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-[var(--foreground-dim)]">{label}</p>
    </div>
  );
}

function calculateAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear =
    now.getMonth() > dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());
  if (!hasHadBirthdayThisYear) age--;
  return age;
}

export default function PlayerDetailsPage() {
  const params = useParams<{ slug: string }>();
  const { data: player, isLoading, error } = usePlayer(params.slug);
  const { isFavoritePlayer, toggleFavoritePlayer } = useFavoritesStore();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center text-[var(--foreground-dim)] sm:px-6">
        Loading player...
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
        <p className="text-[var(--foreground)]">Player not found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-[var(--border-subtle)] bg-[var(--background-elevated)] px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Image
            src={player.photoUrl}
            alt=""
            width={96}
            height={96}
            className="rounded-full bg-white/5"
            unoptimized
          />
          <h1 className="font-display mt-4 text-3xl text-[var(--foreground)] sm:text-4xl">
            {player.knownAs}
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-dim)]">{player.fullName}</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="gold">{player.nationalTeamName}</Badge>
            <Badge>{player.position}</Badge>
            <Badge>#{player.shirtNumber}</Badge>
            {player.isCaptain && <Badge variant="live">Captain</Badge>}
            <FavoriteButton
              isFavorite={isFavoritePlayer(player.id)}
              onToggle={() => toggleFavoritePlayer(player.id)}
              label={player.knownAs}
            />
          </div>
          <p className="mt-3 text-sm text-[var(--foreground-dim)]">
            {player.clubName} ({player.clubCountry}) · Age {calculateAge(player.dateOfBirth)} ·{" "}
            {player.heightCm}cm
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Card className="grid grid-cols-2 gap-6 p-6 sm:grid-cols-5">
          <Stat label="Appearances" value={player.appearances} />
          <Stat label="Goals" value={player.goals} />
          <Stat label="Assists" value={player.assists} />
          <Stat label="Yellow Cards" value={player.yellowCards} />
          <Stat label="Red Cards" value={player.redCards} />
        </Card>
      </div>
    </div>
  );
}
