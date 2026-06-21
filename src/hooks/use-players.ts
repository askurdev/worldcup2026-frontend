"use client";

import { useQuery } from "@tanstack/react-query";
import { getProvider } from "@/lib/providers";
import type { PlayerListParams } from "@/lib/providers/football-data-provider";

export function usePlayers(params: PlayerListParams = {}) {
  return useQuery({
    queryKey: ["players", params],
    queryFn: () => getProvider().getPlayers(params),
  });
}

export function usePlayer(slug: string) {
  return useQuery({
    queryKey: ["player", slug],
    queryFn: () => getProvider().getPlayerBySlug(slug),
    enabled: !!slug,
  });
}
