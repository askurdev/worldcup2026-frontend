# World Cup 2026 Dashboard — Frontend

A FIFA World Cup 2026 dashboard for Bangladesh-based fans: full schedule converted to Bangladesh Standard Time (BST), live match tracking, standings, team/player profiles, and a knockout bracket.

This is **Step 1 of a 5-step build** (Frontend → Backend structure → Real API integration → Replace mock → Deploy). Right now the frontend runs entirely on mock data — there is no backend yet. That comes in Step 2.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Zustand · TanStack Query · Framer Motion · lucide-react

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run build && npm run start   # production build
npx tsx scripts/smoke-test.ts    # data-layer correctness check (no browser needed)
```

## Architecture: the FootballDataProvider abstraction

Every page and hook talks to `getProvider()` (`src/lib/providers/index.ts`), never to a concrete data source. This is the single switch point for going live with real data later:

```
src/lib/providers/
├── football-data-provider.ts      # the interface — implement this for any new source
├── mock-football-data-provider.ts # current implementation, serves local mock data
└── index.ts                       # getProvider() — change ONE line here to swap providers
```

To connect API-Football, SportMonks, or another real provider in Step 3: implement `FootballDataProvider` in a new file, then point `getProvider()` at it. No page, component, or hook needs to change.

## Data provenance — what's real vs. generated

This matters, so it's not buried: the tournament is genuinely underway as of this build (today is mid-June 2026, inside the actual June 11 - July 19, 2026 World Cup window).

- **Teams and groups** (`src/lib/mock-data/teams.ts`): the real, confirmed 48-team / 12-group composition from the FIFA Final Draw (Dec 5, 2025), cross-checked against FIFA.com, ESPN, UEFA.com, and Sky Sports.
- **Matchday 1-2 results and this week's fixtures** (`src/lib/mock-data/matches.ts`, see `REAL_RESULTS`): verified against live sports news sources as of build time.
- **Everything else in `matches.ts`** (each team's remaining group match, mostly dated June 21+): **programmatically generated**, not independently verified against the official schedule. Structurally correct (round-robin, right opponents) but placeholder dates/venues/referees.
- **Standings**: always *derived* from match results, never hand-typed — so the table can never drift out of sync with the scores shown elsewhere.
- **The knockout bracket**: intentionally shows **empty slots** with real FIFA qualification logic ("Winner Group A vs Runner-up Group C", etc.), not fabricated winners — because the group stage isn't finished yet. Don't be tempted to "fill it in" with guesses; wire it to real data once groups conclude.
- **Match events, stats, lineups**: deterministically generated per-match (same match always shows the same mock stats), not real play-by-play data.
- **Player photos**: placeholder initials-avatars (no licensing concerns), not real photography. Flags use the free FlagCDN.

## What's genuinely implemented vs. partial

| Feature | Status |
|---|---|
| Home dashboard, BST conversion, dual-clock UI | Done |
| Live Match Center, Match Details, Team, Player pages | Done |
| Group Standings (derived from results) | Done |
| Knockout Bracket (honest empty-slot state) | Done |
| Search (teams/players/matches) | Done |
| Favorites (Zustand + localStorage) | Done |
| Dark/light mode | Done — both themes are real, not a stub |
| Countdown timer + Google Calendar reminder | Done |
| Browser notifications | Done, but **only fires while the tab stays open** — true background push needs a service worker + push subscription + backend trigger, which is out of scope for Step 1 |
| PWA (manifest, icons, service worker, offline page) | Done |
| Admin panel, real live data, backend | **Not started** — Steps 2-5 |

## Known limitations to revisit

- Visual/mobile-viewport QA was done via code review + automated checks (build success, route 200s, data-layer smoke test), not in an actual browser — there's no headless browser tool in the build environment this was created in. Worth a manual click-through before shipping.
- `getCountdown`/live-minute derivation are simple client-side calculations, not real live-feed data — see the Step 3 plan above.
