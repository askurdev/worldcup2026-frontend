import Link from "next/link";
import Image from "next/image";
import type { Player } from "@/lib/types";
import { Card } from "@/components/ui/card";

export function PlayerCard({ player }: { player: Player }) {
  return (
    <Link href={`/players/${player.slug}`}>
      <Card className="flex items-center gap-3 p-3 transition-colors hover:border-[var(--color-fifa-gold)]/40">
        <Image
          src={player.photoUrl}
          alt=""
          width={44}
          height={44}
          className="shrink-0 rounded-full bg-white/5"
          unoptimized
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[var(--foreground)]">
            {player.knownAs}
            {player.isCaptain && (
              <span className="ml-1.5 text-xs text-[var(--color-fifa-gold)]">(C)</span>
            )}
          </p>
          <p className="truncate text-xs text-[var(--foreground-dim)]">
            {player.position} · #{player.shirtNumber} · {player.clubName}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-data text-sm font-semibold text-[var(--foreground)]">
            {player.goals}
          </p>
          <p className="text-[10px] uppercase text-[var(--foreground-dim)]">Goals</p>
        </div>
      </Card>
    </Link>
  );
}
