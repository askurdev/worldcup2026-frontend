"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: true, // dark-first design — the stadium-night palette is the primary identity
      toggleTheme: () => set({ isDark: !get().isDark }),
    }),
    { name: "wc2026-theme" }
  )
);
