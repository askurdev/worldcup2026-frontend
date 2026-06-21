"use client";

import { useQuery } from "@tanstack/react-query";
import { getProvider } from "@/lib/providers";
import type { MatchListParams } from "@/lib/providers/football-data-provider";

export function useMatches(params: MatchListParams = {}) {
  return useQuery({
    queryKey: ["matches", params],
    queryFn: () => getProvider().getMatches(params),
  });
}

export function useMatch(id: string) {
  return useQuery({
    queryKey: ["match", id],
    queryFn: () => getProvider().getMatchById(id),
    enabled: !!id,
  });
}

export function useLiveMatches() {
  return useQuery({
    queryKey: ["matches", "live"],
    queryFn: () => getProvider().getLiveMatches(),
    // Poll every 20s once this is wired to a real provider in Step 3 —
    // harmless against mock data (which doesn't change), and exactly
    // the cadence we want for genuinely live polling later.
    refetchInterval: 20_000,
  });
}

export function useTodayMatches() {
  return useQuery({
    queryKey: ["matches", "today"],
    queryFn: () => getProvider().getTodayMatches(),
  });
}
