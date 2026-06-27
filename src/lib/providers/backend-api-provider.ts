function snakeToCamel(key: string) {
  return key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

function camelize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(camelize);

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [snakeToCamel(key), camelize(val)])
    );
  }

  return value;
}

async function apiFetch<T>(
  path: string,
  params?: Record<string, string | number | undefined>
): Promise<T> {
  const url = new URL(`${API_BASE}/api/v1${path}`);

  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    });
  }

  const res = await fetch(url.toString(), { next: { revalidate: 30 } });
  if (!res.ok) throw new Error(`API error ${res.status} on ${path}`);

  return camelize(await res.json()) as T;
}










// /**
//  * BackendApiProvider
//  * ------------------
//  * Calls our FastAPI backend at NEXT_PUBLIC_API_URL.
//  * The backend handles API-Football authentication server-side
//  * so the API key is never exposed in the browser.
//  *
//  * This replaces MockFootballDataProvider when the backend is running.
//  */

// import type { FootballDataProvider, MatchListParams, TeamListParams, PlayerListParams } from "./football-data-provider";
// import type {
//   Bracket, Group, Match, MatchDetail, PaginatedResponse,
//   Player, SearchResult, Team, TeamDetail,
// } from "@/lib/types";

// const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// async function apiFetch<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
//   const url = new URL(`${API_BASE}/api/v1${path}`);
//   if (params) {
//     Object.entries(params).forEach(([k, v]) => {
//       if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
//     });
//   }
//   const res = await fetch(url.toString(), { next: { revalidate: 30 } });
//   if (!res.ok) throw new Error(`API error ${res.status} on ${path}`);
//   return res.json();
// }

// export class BackendApiProvider implements FootballDataProvider {
//   readonly providerName = "backend_api";

//   async getMatches(params: MatchListParams = {}): Promise<PaginatedResponse<Match>> {
//     return apiFetch("/matches", {
//       page: params.page,
//       pageSize: params.pageSize,
//       status: params.status,
//       stage: params.stage,
//       group: params.group,
//       teamId: params.teamId,
//       date: params.date,
//       sortBy: params.sortBy,
//       sortOrder: params.sortOrder,
//     });
//   }

//   async getMatchById(id: string): Promise<MatchDetail | null> {
//     try { return await apiFetch(`/matches/${id}`); }
//     catch { return null; }
//   }

//   async getLiveMatches(): Promise<Match[]> {
//     return apiFetch("/live");
//   }

//   async getTodayMatches(): Promise<Match[]> {
//     return apiFetch("/live/today");
//   }

//   async getTeams(params: TeamListParams = {}): Promise<PaginatedResponse<Team>> {
//     return apiFetch("/teams", {
//       page: params.page,
//       pageSize: params.pageSize ?? 48,
//       group: params.group,
//       confederation: params.confederation,
//     });
//   }

//   async getTeamBySlug(slug: string): Promise<TeamDetail | null> {
//     try { return await apiFetch(`/teams/${slug}`); }
//     catch { return null; }
//   }

//   async getPlayers(params: PlayerListParams = {}): Promise<PaginatedResponse<Player>> {
//     return apiFetch("/players", {
//       page: params.page,
//       pageSize: params.pageSize,
//       teamId: params.teamId,
//       position: params.position,
//     });
//   }

//   async getPlayerBySlug(slug: string): Promise<Player | null> {
//     try { return await apiFetch(`/players/${slug}`); }
//     catch { return null; }
//   }

//   async getGroups(): Promise<Group[]> {
//     return apiFetch("/standings");
//   }

//   async getGroupByName(name: string): Promise<Group | null> {
//     try { return await apiFetch(`/standings/${name}`); }
//     catch { return null; }
//   }

//   async getBracket(): Promise<Bracket> {
//     return apiFetch("/brackets");
//   }

//   async search(query: string): Promise<SearchResult> {
//     return apiFetch("/search", { q: query });
//   }
// }
