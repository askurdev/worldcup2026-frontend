import { Goal, Square, RefreshCw } from "lucide-react";
import type { MatchEvents } from "@/lib/types";
import { Card } from "@/components/ui/card";

interface TimelineItem {
  minute: number;
  type: "goal" | "card" | "sub";
  teamId: string;
  content: React.ReactNode;
}

export function MatchTimeline({
  events,
  homeTeamId,
}: {
  events: MatchEvents;
  homeTeamId: string;
}) {
  const items: TimelineItem[] = [
    ...events.goals.map((g) => ({
      minute: g.minute,
      type: "goal" as const,
      teamId: g.teamId,
      content: (
        <span>
          <span className="font-semibold">{g.playerName}</span>
          {g.isPenalty && " (pen.)"}
          {g.isOwnGoal && " (OG)"}
        </span>
      ),
    })),
    ...events.cards.map((c) => ({
      minute: c.minute,
      type: "card" as const,
      teamId: c.teamId,
      content: (
        <span>
          <span className="font-semibold">{c.playerName}</span>
          <span className="text-[var(--foreground-dim)]"> — {c.cardType.replace("_", " ")} card</span>
        </span>
      ),
    })),
    ...events.substitutions.map((s) => ({
      minute: s.minute,
      type: "sub" as const,
      teamId: s.teamId,
      content: (
        <span>
          <span className="font-semibold">{s.playerInName}</span>
          <span className="text-[var(--foreground-dim)]"> on for </span>
          <span className="font-semibold">{s.playerOutName}</span>
        </span>
      ),
    })),
  ].sort((a, b) => a.minute - b.minute);

  if (items.length === 0) {
    return (
      <Card className="p-6 text-center text-sm text-[var(--foreground-dim)]">
        No events yet — check back once the match kicks off.
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <ul className="space-y-3">
        {items.map((item, idx) => {
          const isHome = item.teamId === homeTeamId;
          const Icon = item.type === "goal" ? Goal : item.type === "card" ? Square : RefreshCw;
          const iconColor =
            item.type === "goal"
              ? "text-[var(--color-fifa-gold)]"
              : item.type === "card"
                ? "text-yellow-500"
                : "text-[var(--color-electric-teal)]";

          return (
            <li
              key={idx}
              className={`flex items-center gap-3 text-sm ${isHome ? "" : "flex-row-reverse text-right"}`}
            >
              <span className="font-data w-10 shrink-0 text-[var(--foreground-dim)]">
                {item.minute}&apos;
              </span>
              <Icon className={`h-4 w-4 shrink-0 ${iconColor}`} />
              <span className="flex-1">{item.content}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
