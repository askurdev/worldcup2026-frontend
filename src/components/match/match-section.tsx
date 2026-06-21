import type { Match } from "@/lib/types";
import { MatchCard } from "./match-card";
import { MatchCardSkeleton } from "./match-card-skeleton";

export function MatchSection({
  title,
  matches,
  isLoading,
  emptyMessage,
  accentDot,
}: {
  title: string;
  matches: Match[] | undefined;
  isLoading: boolean;
  emptyMessage: string;
  accentDot?: "live" | "gold" | "none";
}) {
  return (
    <section className="py-6">
      {title && (
        <div className="mb-4 flex items-center gap-2 px-4 sm:px-6">
          {accentDot === "live" && (
            <span className="h-2 w-2 rounded-full bg-[var(--color-electric-teal)]" />
          )}
          {accentDot === "gold" && (
            <span className="h-2 w-2 rounded-full bg-[var(--color-fifa-gold)]" />
          )}
          <h2 className="font-display text-xl text-[var(--foreground)]">{title}</h2>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <MatchCardSkeleton key={i} />
          ))}
        </div>
      ) : !matches || matches.length === 0 ? (
        <p className="px-4 text-sm text-[var(--foreground-dim)] sm:px-6">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </section>
  );
}
