"use client";

import { useQuery } from "@tanstack/react-query";
import { getProvider } from "@/lib/providers";
import type { TeamListParams } from "@/lib/providers/football-data-provider";

export function useTeams(params: TeamListParams = {}) {
  return useQuery({
    queryKey: ["teams", params],
    queryFn: () => getProvider().getTeams(params),
  });
}

export function useTeam(slug: string) {
  return useQuery({
    queryKey: ["team", slug],
    queryFn: () => getProvider().getTeamBySlug(slug),
    enabled: !!slug,
  });
}
