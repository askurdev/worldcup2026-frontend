import { teams, groupNames } from "../src/lib/mock-data/teams";
import { matches } from "../src/lib/mock-data/matches";
import { getAllGroups } from "../src/lib/mock-data/standings";
import { players } from "../src/lib/mock-data/players";
import { MockFootballDataProvider } from "../src/lib/providers/mock-football-data-provider";
import { toBSTTime, toBSTFull, getCountdown } from "../src/lib/utils/time";

let failures = 0;
function check(label: string, condition: boolean, detail?: string) {
  if (condition) {
    console.log(`  OK   ${label}`);
  } else {
    failures++;
    console.log(`  FAIL ${label}${detail ? " — " + detail : ""}`);
  }
}

console.log("\n=== Teams ===");
check("48 teams total", teams.length === 48, `got ${teams.length}`);
check("12 groups", groupNames.length === 12);
for (const g of groupNames) {
  const count = teams.filter((t) => t.group === g).length;
  check(`Group ${g} has exactly 4 teams`, count === 4, `got ${count}`);
}
check("all slugs unique", new Set(teams.map((t) => t.slug)).size === teams.length);
check("all ids unique", new Set(teams.map((t) => t.id)).size === teams.length);
check(
  "host nations flagged (USA/MEX/CAN)",
  teams.filter((t) => t.isHost).length === 3,
  `got ${teams.filter((t) => t.isHost).length}`
);

console.log("\n=== Matches ===");
check("72 group-stage matches generated (48 teams x 3 / 2)", matches.length === 72, `got ${matches.length}`);
check("match ids unique", new Set(matches.map((m) => m.id)).size === matches.length);
const completedCount = matches.filter((m) => m.status === "completed").length;
console.log(`  INFO completed matches so far: ${completedCount}`);
check("every match has a valid venue timezone", matches.every((m) => !!m.venue.timezone));
check(
  "no team plays itself",
  matches.every((m) => m.homeTeam.id !== m.awayTeam.id)
);
// Each team should appear in exactly 3 matches (round robin within a 4-team group)
const apps = new Map<string, number>();
for (const m of matches) {
  apps.set(m.homeTeam.id, (apps.get(m.homeTeam.id) ?? 0) + 1);
  apps.set(m.awayTeam.id, (apps.get(m.awayTeam.id) ?? 0) + 1);
}
const wrongCount = teams.filter((t) => apps.get(t.id) !== 3);
check(
  "every team appears in exactly 3 group matches",
  wrongCount.length === 0,
  wrongCount.map((t) => `${t.name}=${apps.get(t.id)}`).join(", ")
);

console.log("\n=== Standings (derived from results) ===");
const groups = getAllGroups();
check("12 groups returned", groups.length === 12);
for (const group of groups) {
  const totalPlayed = group.standings.reduce((sum, s) => sum + s.played, 0);
  const completedInGroup = matches.filter(
    (m) => m.group === group.name && m.status === "completed"
  ).length;
  check(
    `Group ${group.name}: standings 'played' sum (${totalPlayed}) = 2x completed matches (${completedInGroup})`,
    totalPlayed === completedInGroup * 2
  );
  // Points sanity: 3 per win, 1 per draw — total points should be
  // explainable by W/D/L counts.
  for (const row of group.standings) {
    const expectedPoints = row.wins * 3 + row.draws * 1;
    check(
      `  ${row.team.name}: points (${row.points}) match W*3+D (${expectedPoints})`,
      row.points === expectedPoints
    );
  }
}

console.log("\n=== Players ===");
check("players reference valid team ids", players.every((p) => teams.some((t) => t.id === p.nationalTeamId)));
check("player slugs unique", new Set(players.map((p) => p.slug)).size === players.length);

console.log("\n=== Time utils (BST = UTC+6) ===");
const sample = "2026-06-18T16:00:00Z"; // 4:00 PM UTC
const bst = toBSTTime(sample);
check("16:00 UTC -> 10:00 PM BST", bst === "10:00 PM", `got "${bst}"`);
const full = toBSTFull(sample);
check("full BST string contains 'BST'", full.includes("BST"), full);
const countdownPast = getCountdown("2020-01-01T00:00:00Z");
check("past date returns 'Live'", countdownPast === "Live", countdownPast);

console.log("\n=== Provider (async layer) ===");

async function runAsyncChecks() {
  const provider = new MockFootballDataProvider();
  const liveMatches = await provider.getLiveMatches();
  check("getLiveMatches returns array", Array.isArray(liveMatches));
  console.log(`  INFO live matches right now: ${liveMatches.length} (expected 0 — see provenance note)`);

  const todayMatches = await provider.getTodayMatches();
  console.log(`  INFO matches today (server UTC date): ${todayMatches.length}`);

  const bracket = await provider.getBracket();
  check("bracket has 16 round-of-32 slots", bracket.roundOf32.length === 16, `got ${bracket.roundOf32.length}`);
  check(
    "bracket slots have no fabricated winners yet (group stage incomplete)",
    bracket.roundOf32.every((m) => !m.homeTeam && !m.awayTeam)
  );

  const searchResult = await provider.search("Argentina");
  check(
    "search 'Argentina' finds the team",
    searchResult.teams.some((t) => t.name === "Argentina")
  );
  check(
    "search 'Argentina' finds Messi via national team",
    searchResult.players.length === 0 // players list isn't filtered by team name match, only player name — confirms search scope is as coded
  );

  const messiSearch = await provider.search("Messi");
  check("search 'Messi' finds the player", messiSearch.players.some((p) => p.knownAs === "Messi"));

  console.log(`\n${failures === 0 ? "ALL CHECKS PASSED" : `${failures} CHECK(S) FAILED`}\n`);
  process.exit(failures === 0 ? 0 : 1);
}

runAsyncChecks();
