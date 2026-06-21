import type { FootballDataProvider } from "./football-data-provider";
import { MockFootballDataProvider } from "./mock-football-data-provider";
import { BackendApiProvider } from "./backend-api-provider";

// ── Switch point ─────────────────────────────────────────────
// NEXT_PUBLIC_API_URL set → use real backend (which handles
// API-Football auth server-side so the key stays safe).
// Not set → fall back to mock data (no backend needed).

let cachedProvider: FootballDataProvider | null = null;

export function getProvider(): FootballDataProvider {
  if (cachedProvider) return cachedProvider;

  if (process.env.NEXT_PUBLIC_API_URL) {
    cachedProvider = new BackendApiProvider();
  } else {
    cachedProvider = new MockFootballDataProvider();
  }

  return cachedProvider;
}
