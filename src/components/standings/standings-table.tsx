import Image from "next/image";
import Link from "next/link";
import type { Group } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

function FormPip({ result }: { result: "W" | "D" | "L" }) {
  const styles = {
    W: "bg-[var(--color-electric-teal)]/20 text-[var(--color-electric-teal)]",
    D: "bg-white/10 text-[var(--foreground-dim)]",
    L: "bg-red-500/15 text-red-400",
  };
  return (
    <span
      className={cn(
        "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
        styles[result]
      )}
    >
      {result}
    </span>
  );
}

export function StandingsTable({ group }: { group: Group }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
        <h3 className="font-display text-lg text-[var(--foreground)]">Group {group.name}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] text-left text-xs text-[var(--foreground-dim)]">
              <th className="px-4 py-2 font-medium">#</th>
              <th className="px-2 py-2 font-medium">Team</th>
              <th className="px-2 py-2 text-center font-medium">P</th>
              <th className="px-2 py-2 text-center font-medium">W</th>
              <th className="px-2 py-2 text-center font-medium">D</th>
              <th className="px-2 py-2 text-center font-medium">L</th>
              <th className="hidden px-2 py-2 text-center font-medium sm:table-cell">GF</th>
              <th className="hidden px-2 py-2 text-center font-medium sm:table-cell">GA</th>
              <th className="px-2 py-2 text-center font-medium">GD</th>
              <th className="px-2 py-2 text-center font-medium">Pts</th>
              <th className="hidden px-4 py-2 text-right font-medium md:table-cell">Form</th>
            </tr>
          </thead>
          <tbody>
            {group.standings.map((row) => (
              <tr
                key={row.teamId}
                className={cn(
                  "border-b border-[var(--border-subtle)] last:border-0",
                  row.position <= 2 && "bg-[var(--color-fifa-gold)]/[0.04]"
                )}
              >
                <td className="px-4 py-2.5 font-data text-[var(--foreground-dim)]">
                  {row.position}
                </td>
                <td className="px-2 py-2.5">
                  <Link
                    href={`/teams/${row.team.slug}`}
                    className="flex items-center gap-2 hover:text-[var(--color-fifa-gold)]"
                  >
                    <Image
                      src={row.team.flagUrl}
                      alt=""
                      width={20}
                      height={15}
                      className="rounded-[2px] object-cover ring-1 ring-white/10"
                      unoptimized
                    />
                    <span className="font-medium">{row.team.shortName}</span>
                  </Link>
                </td>
                <td className="px-2 py-2.5 text-center font-data">{row.played}</td>
                <td className="px-2 py-2.5 text-center font-data">{row.wins}</td>
                <td className="px-2 py-2.5 text-center font-data">{row.draws}</td>
                <td className="px-2 py-2.5 text-center font-data">{row.losses}</td>
                <td className="hidden px-2 py-2.5 text-center font-data sm:table-cell">
                  {row.goalsFor}
                </td>
                <td className="hidden px-2 py-2.5 text-center font-data sm:table-cell">
                  {row.goalsAgainst}
                </td>
                <td className="px-2 py-2.5 text-center font-data">
                  {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                </td>
                <td className="px-2 py-2.5 text-center font-data font-bold text-[var(--color-fifa-gold)]">
                  {row.points}
                </td>
                <td className="hidden px-4 py-2.5 md:table-cell">
                  <div className="flex justify-end gap-1">
                    {row.form.length === 0 ? (
                      <span className="text-xs text-[var(--foreground-dim)]">—</span>
                    ) : (
                      row.form.map((r, i) => <FormPip key={i} result={r} />)
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="px-4 py-2.5 text-xs text-[var(--foreground-dim)]">
        Top 2 in each group, plus best third-place teams, advance to the Round of 32.
      </p>
    </Card>
  );
}
