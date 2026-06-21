import type {
  Bracket,
  Group,
  Match,
  MatchDetail,
  PaginatedResponse,
  Player,
  SearchResult,
  Team,
  TeamDetail,
} from "@/lib/types";

/**
 * FootballDataProvider
 * ---------------------------------------------------------------
 * Every data source (mock, API-Football, SportMonks, Football Data API)
 * implements this same interface. The rest of the app — every page,
 * every hook, every component — only ever talks to this interface,
 * never to a specific provider.
 *
 * To go live with a real provider later:
 *   1. Create a new class implementing FootballDataProvider
 *      (e.g. ApiFootballProvider).
 *   2. Swap the export in `getProvider()` below.
 *   3. Nothing else in the codebase changes.
 *
 * All methods are async and return plain data (no provider-specific
 * shapes leak through) so the swap is invisible to consumers.
 * ---------------------------------------------------------------
 */
export interface MatchListParams {
  page?: number;
  pageSize?: number;
  status?: string;
  stage?: string;
  group?: string;
  teamId?: string;
  date?: string; // ISO date, filters matches on that calendar day (UTC)
  sortBy?: "kickoffUtc" | "matchNumber";
  sortOrder?: "asc" | "desc";
}

export interface TeamListParams {
  page?: number;
  pageSize?: number;
  group?: string;
  confederation?: string;
}

export interface PlayerListParams {
  page?: number;
  pageSize?: number;
  teamId?: string;
  position?: string;
}

export interface FootballDataProvider {
  readonly providerName: string;

  // ---- Matches ----
  getMatches(params?: MatchListParams): Promise<PaginatedResponse<Match>>;
  getMatchById(id: string): Promise<MatchDetail | null>;
  getLiveMatches(): Promise<Match[]>;
  getTodayMatches(): Promise<Match[]>;

  // ---- Teams ----
  getTeams(params?: TeamListParams): Promise<PaginatedResponse<Team>>;
  getTeamBySlug(slug: string): Promise<TeamDetail | null>;

  // ---- Players ----
  getPlayers(params?: PlayerListParams): Promise<PaginatedResponse<Player>>;
  getPlayerBySlug(slug: string): Promise<Player | null>;

  // ---- Standings ----
  getGroups(): Promise<Group[]>;
  getGroupByName(name: string): Promise<Group | null>;

  // ---- Bracket ----
  getBracket(): Promise<Bracket>;

  // ---- Search ----
  search(query: string): Promise<SearchResult>;
}
