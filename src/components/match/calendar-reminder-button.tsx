"use client";

import { CalendarPlus } from "lucide-react";
import type { Match } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { buildGoogleCalendarUrl } from "@/lib/utils/time";

export function CalendarReminderButton({ match }: { match: Match }) {
  const url = buildGoogleCalendarUrl({
    title: `${match.homeTeam.name} vs ${match.awayTeam.name} — World Cup 2026`,
    description: `${match.homeTeam.name} vs ${match.awayTeam.name}, Group ${match.group ?? ""}. Venue: ${match.venue.name}, ${match.venue.city}. Referee: ${match.referee}.`,
    location: `${match.venue.name}, ${match.venue.city}`,
    startUtc: match.kickoffUtc,
  });

  return (
    <Button
      variant="secondary"
      onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
    >
      <CalendarPlus className="h-4 w-4" />
      Add to Calendar
    </Button>
  );
}
