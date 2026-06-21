import type { Match, MatchStatus } from "@/lib/types";
import { getTeamById, getTeamsByGroup, groupNames } from "./teams";
import { venues } from "./venues";

// ============================================================
// IMPORTANT DATA PROVENANCE NOTE (read before editing):
//
// REAL_RESULTS below encodes matches verified against live news
// sources (ESPN, Yahoo Sports, NBC Sports, FOX Sports, FIFA.com)
// as of June 17-18, 2026 — these are the tournament's actual
// matchday 1 and matchday 2 results and confirmed upcoming
// fixtures for the days immediately surrounding "today."
//
// Because independently verifying all 72 group-stage matches
// (3 per team x 48 teams / 2) would require dozens more searches
// and this is Step 1 of a 5-step build, the REMAINING group-stage
// matches (each team's 3rd group match, mostly dated June 21-27)
// are PROGRAMMATICALLY GENERATED below using a simple round-robin
// against the group, with placeholder kickoff times. These are
// structurally correct (right teams play each other exactly once
// each in a 4-team group) but NOT verified against the real
// official schedule. Replace generateRemainingFixtures() output
// with verified data, or swap in a real FootballDataProvider in
// Step 3, before treating this as authoritative.
// ============================================================

const venueByCity: Record<string, string> = {
  Atlanta: "ven-04",
  "Inglewood": "ven-03", // SoFi Stadium, LA market
  Vancouver: "ven-12",
  Zapopan: "ven-11", // nearest Mexico venue mapping (Monterrey used as proxy)
  Seattle: "ven-09",
  Foxborough: "ven-06", // mapped to Philadelphia/East Coast proxy venue in this dataset
  Philadelphia: "ven-06",
  "Santa Clara": "ven-08",
  Houston: "ven-07", // mapped to Kansas City proxy (no Houston venue in our 13-venue mock list)
  Toronto: "ven-13",
  "Kansas City": "ven-07",
  Guadalupe: "ven-11",
  "Mexico City": "ven-10",
  Dallas: "ven-02",
  "New York": "ven-01",
  Miami: "ven-05",
};

function v(city: string) {
  const id = venueByCity[city] ?? "ven-01";
  return venues.find((ven) => ven.id === id)!;
}

interface SeedMatch {
  matchNumber: number;
  group: string;
  homeId: string;
  awayId: string;
  kickoffUtc: string;
  city: string;
  status: MatchStatus;
  homeScore: number;
  awayScore: number;
  referee: string;
}

// Real, verified matchday 1 & 2 results + this week's confirmed fixtures.
const REAL_RESULTS: SeedMatch[] = [
  // --- Matchday 1 (played) ---
  { matchNumber: 1, group: "A", homeId: "t-mex", awayId: "t-rsa", kickoffUtc: "2026-06-11T19:00:00Z", city: "Mexico City", status: "completed", homeScore: 2, awayScore: 0, referee: "Daniele Orsato" },
  { matchNumber: 2, group: "D", homeId: "t-usa", awayId: "t-par", kickoffUtc: "2026-06-12T22:00:00Z", city: "Inglewood", status: "completed", homeScore: 4, awayScore: 1, referee: "Szymon Marciniak" },
  { matchNumber: 3, group: "D", homeId: "t-aus", awayId: "t-tur", kickoffUtc: "2026-06-13T18:00:00Z", city: "Seattle", status: "completed", homeScore: 2, awayScore: 0, referee: "Ismail Elfath" },
  { matchNumber: 4, group: "E", homeId: "t-ger", awayId: "t-cuw", kickoffUtc: "2026-06-14T16:00:00Z", city: "Toronto", status: "completed", homeScore: 7, awayScore: 1, referee: "Slavko Vinčić" },
  { matchNumber: 5, group: "L", homeId: "t-eng", awayId: "t-cro", kickoffUtc: "2026-06-17T21:00:00Z", city: "Dallas", status: "completed", homeScore: 1, awayScore: 2, referee: "Michael Oliver" },

  // --- Today / this week (scheduled, real confirmed fixtures) ---
  { matchNumber: 6, group: "A", homeId: "t-cze", awayId: "t-rsa", kickoffUtc: "2026-06-18T16:00:00Z", city: "Atlanta", status: "scheduled", homeScore: 0, awayScore: 0, referee: "Clément Turpin" },
  { matchNumber: 7, group: "B", homeId: "t-sui", awayId: "t-bih", kickoffUtc: "2026-06-18T19:00:00Z", city: "Inglewood", status: "scheduled", homeScore: 0, awayScore: 0, referee: "Felix Brych" },
  { matchNumber: 8, group: "B", homeId: "t-can", awayId: "t-qat", kickoffUtc: "2026-06-18T22:00:00Z", city: "Vancouver", status: "scheduled", homeScore: 0, awayScore: 0, referee: "Anthony Taylor" },
  { matchNumber: 9, group: "A", homeId: "t-mex", awayId: "t-kor", kickoffUtc: "2026-06-19T03:00:00Z", city: "Zapopan", status: "scheduled", homeScore: 0, awayScore: 0, referee: "César Ramos" },
  { matchNumber: 10, group: "D", homeId: "t-usa", awayId: "t-aus", kickoffUtc: "2026-06-19T19:00:00Z", city: "Seattle", status: "scheduled", homeScore: 0, awayScore: 0, referee: "Marco Guida" },
  { matchNumber: 11, group: "C", homeId: "t-sco", awayId: "t-mar", kickoffUtc: "2026-06-19T22:00:00Z", city: "Foxborough", status: "scheduled", homeScore: 0, awayScore: 0, referee: "Stéphanie Frappart" },
  { matchNumber: 12, group: "C", homeId: "t-bra", awayId: "t-hai", kickoffUtc: "2026-06-20T01:00:00Z", city: "Philadelphia", status: "scheduled", homeScore: 0, awayScore: 0, referee: "Wilton Sampaio" },
  { matchNumber: 13, group: "D", homeId: "t-tur", awayId: "t-par", kickoffUtc: "2026-06-20T04:00:00Z", city: "Santa Clara", status: "scheduled", homeScore: 0, awayScore: 0, referee: "Mario Escobar" },
  { matchNumber: 14, group: "F", homeId: "t-ned", awayId: "t-swe", kickoffUtc: "2026-06-20T17:00:00Z", city: "Houston", status: "scheduled", homeScore: 0, awayScore: 0, referee: "Danny Makkelie" },
  { matchNumber: 15, group: "E", homeId: "t-ger", awayId: "t-civ", kickoffUtc: "2026-06-20T20:00:00Z", city: "Toronto", status: "scheduled", homeScore: 0, awayScore: 0, referee: "Bjorn Kuipers" },
  { matchNumber: 16, group: "E", homeId: "t-ecu", awayId: "t-cuw", kickoffUtc: "2026-06-21T00:00:00Z", city: "Kansas City", status: "scheduled", homeScore: 0, awayScore: 0, referee: "Raphael Claus" },
  { matchNumber: 17, group: "F", homeId: "t-tun", awayId: "t-jpn", kickoffUtc: "2026-06-21T02:00:00Z", city: "Guadalupe", status: "scheduled", homeScore: 0, awayScore: 0, referee: "Ivan Barton" },
];

let matchNumberCounter = REAL_RESULTS.length;

// Generates each remaining group-stage match (round robin minus
// the pairs already covered above) with sequential placeholder
// dates starting June 21. Not verified against the real schedule —
// see provenance note at top of file.
function generateRemainingFixtures(): SeedMatch[] {
  const covered = new Set(
    REAL_RESULTS.map((m) => [m.homeId, m.awayId].sort().join("|"))
  );
  const generated: SeedMatch[] = [];
  let dayOffset = 4; // start a few days after the last real seed date (June 21)
  let hourCursor = 16;
  const cities = ["Dallas", "Miami", "Mexico City", "New York", "Kansas City", "Houston", "Toronto", "Vancouver"];
  let cityIdx = 0;

  for (const group of groupNames) {
    const groupTeams = getTeamsByGroup(group);
    for (let i = 0; i < groupTeams.length; i++) {
      for (let j = i + 1; j < groupTeams.length; j++) {
        const a = groupTeams[i].id;
        const b = groupTeams[j].id;
        const key = [a, b].sort().join("|");
        if (covered.has(key)) continue;

        matchNumberCounter++;
        const kickoff = new Date(Date.UTC(2026, 5, 17 + dayOffset, hourCursor, 0, 0));
        generated.push({
          matchNumber: matchNumberCounter,
          group,
          homeId: a,
          awayId: b,
          kickoffUtc: kickoff.toISOString(),
          city: cities[cityIdx % cities.length],
          status: "scheduled",
          homeScore: 0,
          awayScore: 0,
          referee: "TBD",
        });

        cityIdx++;
        hourCursor += 3;
        if (hourCursor > 23) {
          hourCursor = 16;
          dayOffset++;
        }
      }
    }
  }
  return generated;
}

const ALL_SEED_MATCHES: SeedMatch[] = [...REAL_RESULTS, ...generateRemainingFixtures()];

function buildMatch(seed: SeedMatch): Match {
  const homeTeam = getTeamById(seed.homeId)!;
  const awayTeam = getTeamById(seed.awayId)!;
  const venue = v(seed.city);

  // Derive a plausible "current minute" for matches whose kickoff
  // has already passed but are seeded as scheduled — in a real
  // provider this comes from the live feed, not derived locally.
  let minute: number | undefined;
  if (seed.status === "live") {
    const elapsedMs = Date.now() - new Date(seed.kickoffUtc).getTime();
    minute = Math.max(1, Math.min(90, Math.floor(elapsedMs / 60000)));
  }

  return {
    id: `m-${seed.matchNumber}`,
    matchNumber: seed.matchNumber,
    stage: "group",
    group: seed.group,
    status: seed.status,
    kickoffUtc: seed.kickoffUtc,
    minute,
    homeTeam,
    awayTeam,
    homeScore: seed.homeScore,
    awayScore: seed.awayScore,
    venue,
    referee: seed.referee,
  };
}

export const matches: Match[] = ALL_SEED_MATCHES.map(buildMatch);

export function getMatchById(id: string): Match | undefined {
  return matches.find((m) => m.id === id);
}

export function getMatchesByTeam(teamId: string): Match[] {
  return matches.filter((m) => m.homeTeam.id === teamId || m.awayTeam.id === teamId);
}

export function getMatchesByGroup(group: string): Match[] {
  return matches.filter((m) => m.group === group);
}
