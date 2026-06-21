import Image from "next/image";
import { MapPin, UserCheck } from "lucide-react";
import type { MatchDetail } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { toBSTFull, toVenueTime } from "@/lib/utils/time";
import { CountdownTimer } from "./countdown-timer";
import { CalendarReminderButton } from "./calendar-reminder-button";

export function MatchHeader({ match }: { match: MatchDetail }) {
  const isLive = match.status === "live" || match.status === "halftime";
  const isCompleted = match.status === "completed";
  const isScheduled = match.status === "scheduled";

  return (
    <div className="border-b border-[var(--border-subtle)] bg-[var(--background-elevated)]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-center gap-3">
          {isLive ? (
            <Badge variant="live" pulse>
              {match.status === "halftime" ? "Half Time" : `${match.minute ?? 0}' Live`}
            </Badge>
          ) : isCompleted ? (
            <Badge variant="completed">Full Time</Badge>
          ) : (
            <Badge variant="scheduled">Upcoming</Badge>
          )}
          {match.group && <Badge variant="gold">Group {match.group}</Badge>}
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <div className="flex flex-col items-center text-center">
            <Image
              src={match.homeTeam.flagUrl}
              alt=""
              width={64}
              height={48}
              className="rounded object-cover ring-1 ring-white/10"
              unoptimized
            />
            <span className="mt-3 font-display text-lg text-[var(--foreground)]">
              {match.homeTeam.name}
            </span>
          </div>

          <div className="flex items-center justify-center gap-4">
            {!isScheduled && (
              <span className="font-data text-5xl font-bold text-[var(--foreground)]">
                {match.homeScore}
              </span>
            )}
            <span className="font-display text-xl text-[var(--foreground-dim)]">
              {isScheduled ? "VS" : "–"}
            </span>
            {!isScheduled && (
              <span className="font-data text-5xl font-bold text-[var(--foreground)]">
                {match.awayScore}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center text-center">
            <Image
              src={match.awayTeam.flagUrl}
              alt=""
              width={64}
              height={48}
              className="rounded object-cover ring-1 ring-white/10"
              unoptimized
            />
            <span className="mt-3 font-display text-lg text-[var(--foreground)]">
              {match.awayTeam.name}
            </span>
          </div>
        </div>

        {isScheduled && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <CountdownTimer kickoffUtc={match.kickoffUtc} />
            <CalendarReminderButton match={match} />
          </div>
        )}

        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl bg-black/20 px-4 py-4 text-sm sm:flex-row sm:justify-center sm:gap-8">
          <div className="flex flex-col items-center">
            <span className="text-[var(--foreground-dim)]">{match.venue.city} time</span>
            <span className="font-data font-semibold text-[var(--foreground)]">
              {toVenueTime(match.kickoffUtc, match.venue.timezone)}
            </span>
          </div>
          <div className="hidden h-8 w-px bg-[var(--border-subtle)] sm:block" />
          <div className="flex flex-col items-center">
            <span className="text-[var(--color-fifa-gold)]">Dhaka (BST)</span>
            <span className="font-data font-semibold text-[var(--color-fifa-gold)]">
              {toBSTFull(match.kickoffUtc)}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[var(--foreground-dim)]">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {match.venue.name}, {match.venue.city}
          </span>
          <span className="flex items-center gap-1.5">
            <UserCheck className="h-3.5 w-3.5" />
            Referee: {match.referee}
          </span>
        </div>
      </div>
    </div>
  );
}
