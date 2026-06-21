import type {
  Bracket,
  BracketMatch,
  Group,
  Match,
  MatchDetail,
  MatchEvents,
  MatchStats,
  PaginatedResponse,
  Player,
  SearchResult,
  Team,
  TeamDetail,
  TeamLineup,
  TeamStats,
} from "@/lib/types";
import type {
  FootballDataProvider,
  MatchListParams,
  PlayerListParams,
  TeamListParams,
} from "./football-data-provider";
import { matches as allMatches, getMatchById } from "@/lib/mock-data/matches";
import { teams as allTeams, getTeamBySlug as findTeamBySlug } from "@/lib/mock-data/teams";
import { players as allPlayers, getPlayerBySlug as findPlayerBySlug, getPlayersByTeam } from "@/lib/mock-data/players";
import { getAllGroups, getGroupByName as findGroupByName } from "@/lib/mock-data/standings";
import { getMatchesByTeam } from "@/lib/mock-data/matches";

// Simulates realistic network latency so loading states
// (skeletons, spinners) can be built and tested honestly,
// rather than every mock call resolving in 0ms.
function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function paginate<T>(items: T[], page = 1, pageSize = 20): PaginatedResponse<T> {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const start = (page - 1) * pageSize;
  return {
    data: items.slice(start, start + pageSize),
    page,
    pageSize,
    totalItems,
    totalPages,
  };
}

// Deterministic pseudo-stats derived from a match's id so the same
// match always shows the same mock stats across renders, instead of
// re-randomizing on every fetch (which would look broken to a user
// refreshing the page).
function seededRandom(seed: string, max: number, min = 0): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const normalized = Math.abs(hash % (max - min + 1));
  return min + normalized;
}

function buildMockMatchStats(matchId: string): MatchStats {
  const homePossession = seededRandom(matchId + "poss", 65, 35);
  return {
    possession: { home: homePossession, away: 100 - homePossession },
    shots: { home: seededRandom(matchId + "sh", 18, 6), away: seededRandom(matchId + "sa", 18, 6) },
    shotsOnTarget: { home: seededRandom(matchId + "sot", 8, 1), away: seededRandom(matchId + "sota", 8, 1) },
    corners: { home: seededRandom(matchId + "co", 9, 1), away: seededRandom(matchId + "coa", 9, 1) },
    fouls: { home: seededRandom(matchId + "fo", 16, 4), away: seededRandom(matchId + "foa", 16, 4) },
    offsides: { home: seededRandom(matchId + "of", 4, 0), away: seededRandom(matchId + "ofa", 4, 0) },
    passes: { home: seededRandom(matchId + "pa", 650, 300), away: seededRandom(matchId + "paa", 650, 300) },
    passAccuracy: { home: seededRandom(matchId + "pac", 92, 78), away: seededRandom(matchId + "paca", 92, 78) },
  };
}

function buildMockEvents(match: Match): MatchEvents {
  if (match.status === "scheduled") {
    return { goals: [], cards: [], substitutions: [] };
  }
  // For completed matches, derive plausible goal minutes matching the
  // real final score, so events stay internally consistent with the
  // scoreline shown elsewhere on the page.
  const goals = [];
  const totalGoals = match.homeScore + match.awayScore;
  for (let i = 0; i < totalGoals; i++) {
    const isHomeGoal = i < match.homeScore;
    const scoringTeam = isHomeGoal ? match.homeTeam : match.awayTeam;
    const squadPlayers = getPlayersByTeam(scoringTeam.id);
    const scorer = squadPlayers[i % Math.max(squadPlayers.length, 1)];
    goals.push({
      id: `${match.id}-goal-${i}`,
      minute: seededRandom(match.id + "goal" + i, 90, 3),
      playerId: scorer?.id ?? "unknown",
      playerName: scorer?.knownAs ?? `${scoringTeam.shortName} player`,
      teamId: scoringTeam.id,
      isPenalty: false,
      isOwnGoal: false,
    });
  }
  goals.sort((a, b) => a.minute - b.minute);

  return {
    goals,
    cards: [
      {
        id: `${match.id}-card-1`,
        minute: seededRandom(match.id + "card1", 85, 10),
        playerId: "unknown",
        playerName: `${match.homeTeam.shortName} defender`,
        teamId: match.homeTeam.id,
        cardType: "yellow",
      },
    ],
    substitutions: [],
  };
}

function buildMockLineup(teamId: string): TeamLineup {
  const squad = getPlayersByTeam(teamId);
  const startingXI = squad.slice(0, 11).map((p, idx) => ({
    playerId: p.id,
    playerName: p.knownAs,
    shirtNumber: p.shirtNumber,
    position: p.position,
    isStarting: true,
    gridPosition: `${Math.floor(idx / 3) + 1}:${(idx % 3) + 1}`,
  }));
  return {
    formation: "4-3-3",
    startingXI,
    substitutes: squad.slice(11).map((p) => ({
      playerId: p.id,
      playerName: p.knownAs,
      shirtNumber: p.shirtNumber,
      position: p.position,
      isStarting: false,
    })),
  };
}

function buildTeamStats(teamId: string): TeamStats {
  const teamMatches = getMatchesByTeam(teamId).filter((m) => m.status === "completed");
  let wins = 0, draws = 0, losses = 0, goalsFor = 0, goalsAgainst = 0, cleanSheets = 0;
  for (const m of teamMatches) {
    const isHome = m.homeTeam.id === teamId;
    const gf = isHome ? m.homeScore : m.awayScore;
    const ga = isHome ? m.awayScore : m.homeScore;
    goalsFor += gf;
    goalsAgainst += ga;
    if (ga === 0) cleanSheets++;
    if (gf > ga) wins++;
    else if (gf < ga) losses++;
    else draws++;
  }
  return {
    matchesPlayed: teamMatches.length,
    wins,
    draws,
    losses,
    goalsFor,
    goalsAgainst,
    cleanSheets,
    averagePossession: seededRandom(teamId + "poss", 62, 42),
  };
}

export class MockFootballDataProvider implements FootballDataProvider {
  readonly providerName = "mock";

  async getMatches(params: MatchListParams = {}): Promise<PaginatedResponse<Match>> {
    let filtered = [...allMatches];

    if (params.status) filtered = filtered.filter((m) => m.status === params.status);
    if (params.stage) filtered = filtered.filter((m) => m.stage === params.stage);
    if (params.group) filtered = filtered.filter((m) => m.group === params.group);
    if (params.teamId) {
      filtered = filtered.filter(
        (m) => m.homeTeam.id === params.teamId || m.awayTeam.id === params.teamId
      );
    }
    if (params.date) {
      filtered = filtered.filter((m) => m.kickoffUtc.startsWith(params.date!));
    }

    const sortBy = params.sortBy ?? "kickoffUtc";
    const sortOrder = params.sortOrder ?? "asc";
    filtered.sort((a, b) => {
      const aVal = sortBy === "matchNumber" ? a.matchNumber : new Date(a.kickoffUtc).getTime();
      const bVal = sortBy === "matchNumber" ? b.matchNumber : new Date(b.kickoffUtc).getTime();
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

    return delay(paginate(filtered, params.page, params.pageSize));
  }

  async getMatchById(id: string): Promise<MatchDetail | null> {
    const match = getMatchById(id);
    if (!match) return delay(null);
    const detail: MatchDetail = {
      ...match,
      events: buildMockEvents(match),
      stats: buildMockMatchStats(match.id),
      homeLineup: buildMockLineup(match.homeTeam.id),
      awayLineup: buildMockLineup(match.awayTeam.id),
    };
    return delay(detail);
  }

  async getLiveMatches(): Promise<Match[]> {
    return delay(allMatches.filter((m) => m.status === "live" || m.status === "halftime"));
  }

  async getTodayMatches(): Promise<Match[]> {
    const todayUtc = new Date().toISOString().slice(0, 10);
    return delay(allMatches.filter((m) => m.kickoffUtc.startsWith(todayUtc)));
  }

  async getTeams(params: TeamListParams = {}): Promise<PaginatedResponse<Team>> {
    let filtered = [...allTeams];
    if (params.group) filtered = filtered.filter((t) => t.group === params.group);
    if (params.confederation) {
      filtered = filtered.filter((t) => t.confederation === params.confederation);
    }
    return delay(paginate(filtered, params.page, params.pageSize ?? 48));
  }

  async getTeamBySlug(slug: string): Promise<TeamDetail | null> {
    const team = findTeamBySlug(slug);
    if (!team) return delay(null);

    const teamMatches = getMatchesByTeam(team.id);
    const detail: TeamDetail = {
      ...team,
      squad: getPlayersByTeam(team.id),
      upcomingMatches: teamMatches.filter((m) => m.status === "scheduled"),
      previousMatches: teamMatches.filter((m) => m.status === "completed"),
      stats: buildTeamStats(team.id),
    };
    return delay(detail);
  }

  async getPlayers(params: PlayerListParams = {}): Promise<PaginatedResponse<Player>> {
    let filtered = [...allPlayers];
    if (params.teamId) filtered = filtered.filter((p) => p.nationalTeamId === params.teamId);
    if (params.position) filtered = filtered.filter((p) => p.position === params.position);
    return delay(paginate(filtered, params.page, params.pageSize));
  }

  async getPlayerBySlug(slug: string): Promise<Player | null> {
    return delay(findPlayerBySlug(slug) ?? null);
  }

  async getGroups(): Promise<Group[]> {
    return delay(getAllGroups());
  }

  async getGroupByName(name: string): Promise<Group | null> {
    return delay(findGroupByName(name) ?? null);
  }

  async getBracket(): Promise<Bracket> {
    // Round of 32 slots reference the real confirmed slot logic
    // from FIFA's published bracket structure (winner/runner-up/
    // best-third-place combinations), but with no group stage
    // complete yet, no slots are filled in. This is the honest
    // state: an empty bracket scaffold, not invented winners.
    const emptySlot = (round: BracketMatch["round"], label: string, idx: number): BracketMatch => ({
      id: `bracket-${round}-${idx}`,
      round,
      slotLabel: label,
    });

    const roundOf32: BracketMatch[] = [
      emptySlot("round_of_32", "Winner Group A vs Runner-up Group C", 1),
      emptySlot("round_of_32", "Winner Group B vs Runner-up Group D", 2),
      emptySlot("round_of_32", "Winner Group C vs Runner-up Group A", 3),
      emptySlot("round_of_32", "Winner Group D vs Runner-up Group B", 4),
      emptySlot("round_of_32", "Winner Group E vs 3rd Place (A/B/C/D/F)", 5),
      emptySlot("round_of_32", "Winner Group F vs Runner-up Group C", 6),
      emptySlot("round_of_32", "Winner Group G vs 3rd Place (A/E/H/I/J)", 7),
      emptySlot("round_of_32", "Winner Group H vs Runner-up Group J", 8),
      emptySlot("round_of_32", "Winner Group I vs 3rd Place (C/D/F/G/H)", 9),
      emptySlot("round_of_32", "Winner Group J vs Runner-up Group H", 10),
      emptySlot("round_of_32", "Winner Group K vs Runner-up Group L", 11),
      emptySlot("round_of_32", "Winner Group L vs 3rd Place (E/H/I/J/K)", 12),
      emptySlot("round_of_32", "Runner-up Group A vs Runner-up Group B", 13),
      emptySlot("round_of_32", "Runner-up Group E vs Runner-up Group I", 14),
      emptySlot("round_of_32", "Runner-up Group K vs Runner-up Group L", 15),
      emptySlot("round_of_32", "Runner-up Group D vs Runner-up Group G", 16),
    ];

    const roundOf16 = Array.from({ length: 8 }, (_, i) =>
      emptySlot("round_of_16", `Winner R32 Match ${i * 2 + 1} vs Winner R32 Match ${i * 2 + 2}`, i + 1)
    );
    const quarterFinals = Array.from({ length: 4 }, (_, i) =>
      emptySlot("quarter_final", `Winner R16 Match ${i * 2 + 1} vs Winner R16 Match ${i * 2 + 2}`, i + 1)
    );
    const semiFinals = Array.from({ length: 2 }, (_, i) =>
      emptySlot("semi_final", `Winner QF${i * 2 + 1} vs Winner QF${i * 2 + 2}`, i + 1)
    );

    return delay({
      roundOf32,
      roundOf16,
      quarterFinals,
      semiFinals,
      thirdPlace: emptySlot("third_place", "Loser SF1 vs Loser SF2", 1),
      final: emptySlot("final", "Winner SF1 vs Winner SF2", 1),
    });
  }

  async search(query: string): Promise<SearchResult> {
    const q = query.trim().toLowerCase();
    if (!q) return delay({ teams: [], players: [], matches: [] });

    return delay({
      teams: allTeams.filter(
        (t) => t.name.toLowerCase().includes(q) || t.fifaCode.toLowerCase().includes(q)
      ),
      players: allPlayers.filter(
        (p) =>
          p.fullName.toLowerCase().includes(q) ||
          p.knownAs.toLowerCase().includes(q)
      ),
      matches: allMatches.filter(
        (m) =>
          m.homeTeam.name.toLowerCase().includes(q) ||
          m.awayTeam.name.toLowerCase().includes(q)
      ),
    });
  }
}
