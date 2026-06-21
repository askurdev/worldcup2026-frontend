"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favoriteTeamIds: string[];
  favoritePlayerIds: string[];
  toggleFavoriteTeam: (teamId: string) => void;
  toggleFavoritePlayer: (playerId: string) => void;
  isFavoriteTeam: (teamId: string) => boolean;
  isFavoritePlayer: (playerId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteTeamIds: [],
      favoritePlayerIds: [],

      toggleFavoriteTeam: (teamId) => {
        const current = get().favoriteTeamIds;
        set({
          favoriteTeamIds: current.includes(teamId)
            ? current.filter((id) => id !== teamId)
            : [...current, teamId],
        });
      },

      toggleFavoritePlayer: (playerId) => {
        const current = get().favoritePlayerIds;
        set({
          favoritePlayerIds: current.includes(playerId)
            ? current.filter((id) => id !== playerId)
            : [...current, playerId],
        });
      },

      isFavoriteTeam: (teamId) => get().favoriteTeamIds.includes(teamId),
      isFavoritePlayer: (playerId) => get().favoritePlayerIds.includes(playerId),
    }),
    {
      name: "wc2026-favorites", // localStorage key
    }
  )
);
