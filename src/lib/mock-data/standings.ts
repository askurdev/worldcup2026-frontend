import type { Group, GroupStanding } from "@/lib/types";
import { getTeamsByGroup, groupNames } from "./teams";
import { matches } from "./matches";

// Standings are DERIVED from match results, never hand-entered.
// This guarantees the table always agrees with the scores shown
// on match cards — a common bug in dashboards where standings and
// results drift out of sync because they're maintained separately.
function computeGroupStandings(group: string): GroupStanding[] {
  const groupTeams = getTeamsByGroup(group);
  const groupMatches = matches.filter(
    (m) => m.group === group && m.status === "completed"
  );

  const table = new Map<string, GroupStanding>();
  for (const team of groupTeams) {
    table.set(team.id, {
      teamId: team.id,
      team,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
      position: 0,
      form: [],
    });
  }

  // Sort chronologically so "form" (last 5 results) reads correctly.
  const sorted = [...groupMatches].sort(
    (a, b) => new Date(a.kickoffUtc).getTime() - new Date(b.kickoffUtc).getTime()
  );

  for (const match of sorted) {
    const home = table.get(match.homeTeam.id);
    const away = table.get(match.awayTeam.id);
    if (!home || !away) continue;

    home.played++;
    away.played++;
    home.goalsFor += match.homeScore;
    home.goalsAgainst += match.awayScore;
    away.goalsFor += match.awayScore;
    away.goalsAgainst += match.homeScore;

    if (match.homeScore > match.awayScore) {
      home.wins++;
      home.points += 3;
      away.losses++;
      home.form.push("W");
      away.form.push("L");
    } else if (match.homeScore < match.awayScore) {
      away.wins++;
      away.points += 3;
      home.losses++;
      away.form.push("W");
      home.form.push("L");
    } else {
      home.draws++;
      away.draws++;
      home.points += 1;
      away.points += 1;
      home.form.push("D");
      away.form.push("D");
    }
  }

  for (const row of table.values()) {
    row.goalDifference = row.goalsFor - row.goalsAgainst;
    row.form = row.form.slice(-5);
  }

  // FIFA tiebreak order: points, then goal difference, then goals
  // scored. (Head-to-head and fair play omitted from this sort for
  // simplicity — see backend Step 2 for full tiebreak logic.)
  const ranked = Array.from(table.values()).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });

  ranked.forEach((row, idx) => {
    row.position = idx + 1;
  });

  return ranked;
}

export function getAllGroups(): Group[] {
  return groupNames.map((name) => ({
    name,
    teams: getTeamsByGroup(name),
    standings: computeGroupStandings(name),
  }));
}

export function getGroupByName(name: string): Group | undefined {
  if (!groupNames.includes(name as (typeof groupNames)[number])) return undefined;
  return {
    name,
    teams: getTeamsByGroup(name),
    standings: computeGroupStandings(name),
  };
}
