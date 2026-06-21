// ============================================================
// Core domain types for the World Cup 2026 Dashboard.
// These mirror the shape FootballDataProvider implementations
// (mock, API-Football, SportMonks, etc.) must return, so the
// frontend stays identical no matter which provider is plugged in.
// ============================================================

export type MatchStatus =
  | "scheduled"
  | "live"
  | "halftime"
  | "completed"
  | "postponed"
  | "cancelled";

export type MatchStage =
  | "group"
  | "round_of_32"
  | "round_of_16"
  | "quarter_final"
  | "semi_final"
  | "third_place"
  | "final";

export type CardType = "yellow" | "red" | "second_yellow";

export interface Team {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  fifaCode: string; // e.g. "ARG", "BRA"
  flagUrl: string;
  group: string; // "A" through "L"
  confederation: string; // CONMEBOL, UEFA, CONCACAF, etc.
  coachName: string;
  fifaRanking: number;
  isHost: boolean;
}

export interface TeamDetail extends Team {
  squad: Player[];
  upcomingMatches: Match[];
  previousMatches: Match[];
  stats: TeamStats;
}

export interface TeamStats {
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  cleanSheets: number;
  averagePossession: number;
}

export type PlayerPosition =
  | "GK"
  | "CB"
  | "LB"
  | "RB"
  | "CDM"
  | "CM"
  | "CAM"
  | "LM"
  | "RM"
  | "LW"
  | "RW"
  | "ST"
  | "CF";

export interface Player {
  id: string;
  slug: string;
  fullName: string;
  knownAs: string;
  photoUrl: string;
  nationalTeamId: string;
  nationalTeamName: string;
  clubName: string;
  clubCountry: string;
  position: PlayerPosition;
  shirtNumber: number;
  dateOfBirth: string; // ISO date
  heightCm: number;
  goals: number;
  assists: number;
  appearances: number;
  yellowCards: number;
  redCards: number;
  isCaptain: boolean;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  country: "USA" | "Mexico" | "Canada";
  capacity: number;
  timezone: string; // IANA tz, e.g. "America/New_York"
}

export interface GoalEvent {
  id: string;
  minute: number;
  extraTimeMinute?: number;
  playerId: string;
  playerName: string;
  teamId: string;
  isPenalty: boolean;
  isOwnGoal: boolean;
  assistPlayerId?: string;
  assistPlayerName?: string;
}

export interface CardEvent {
  id: string;
  minute: number;
  extraTimeMinute?: number;
  playerId: string;
  playerName: string;
  teamId: string;
  cardType: CardType;
  reason?: string;
}

export interface SubstitutionEvent {
  id: string;
  minute: number;
  teamId: string;
  playerOutId: string;
  playerOutName: string;
  playerInId: string;
  playerInName: string;
}

export interface MatchEvents {
  goals: GoalEvent[];
  cards: CardEvent[];
  substitutions: SubstitutionEvent[];
}

export interface MatchStats {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  offsides: { home: number; away: number };
  passes: { home: number; away: number };
  passAccuracy: { home: number; away: number };
}

export interface LineupPlayer {
  playerId: string;
  playerName: string;
  shirtNumber: number;
  position: PlayerPosition;
  isStarting: boolean;
  gridPosition?: string; // e.g. "4:2" row:col for formation rendering
}

export interface TeamLineup {
  formation: string; // e.g. "4-3-3"
  startingXI: LineupPlayer[];
  substitutes: LineupPlayer[];
}

export interface Match {
  id: string;
  matchNumber: number;
  stage: MatchStage;
  group?: string;
  status: MatchStatus;
  kickoffUtc: string; // ISO 8601 UTC
  minute?: number; // current match minute, only when live
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  homePenalties?: number;
  awayPenalties?: number;
  venue: Venue;
  referee: string;
}

export interface MatchDetail extends Match {
  events: MatchEvents;
  stats: MatchStats;
  homeLineup: TeamLineup;
  awayLineup: TeamLineup;
}

export interface GroupStanding {
  teamId: string;
  team: Team;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  position: number;
  form: ("W" | "D" | "L")[]; // last 5 results, most recent last
}

export interface Group {
  name: string; // "A" through "L"
  teams: Team[];
  standings: GroupStanding[];
}

export interface BracketMatch {
  id: string;
  matchId?: string; // links to actual Match once teams are determined
  round: MatchStage;
  slotLabel: string; // e.g. "Winner Group A", "Runner-up Group B"
  homeTeam?: Team; // undefined until determined
  awayTeam?: Team;
  homeScore?: number;
  awayScore?: number;
  winnerTeamId?: string;
  kickoffUtc?: string;
  venue?: Venue;
}

export interface Bracket {
  roundOf32: BracketMatch[];
  roundOf16: BracketMatch[];
  quarterFinals: BracketMatch[];
  semiFinals: BracketMatch[];
  thirdPlace: BracketMatch | null;
  final: BracketMatch | null;
}

export interface SearchResult {
  teams: Team[];
  players: Player[];
  matches: Match[];
}

// Pagination envelope shared by all list endpoints
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
