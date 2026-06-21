"use client";

import { useQuery } from "@tanstack/react-query";
import { getProvider } from "@/lib/providers";

export function useGroups() {
  return useQuery({
    queryKey: ["groups"],
    queryFn: () => getProvider().getGroups(),
  });
}

export function useGroup(name: string) {
  return useQuery({
    queryKey: ["group", name],
    queryFn: () => getProvider().getGroupByName(name),
    enabled: !!name,
  });
}

export function useBracket() {
  return useQuery({
    queryKey: ["bracket"],
    queryFn: () => getProvider().getBracket(),
  });
}

export function useSearch(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => getProvider().search(query),
    enabled: query.trim().length > 1,
  });
}
