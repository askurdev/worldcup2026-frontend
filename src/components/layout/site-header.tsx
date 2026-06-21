"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Moon, Search, Star, Sun, Menu, X } from "lucide-react";
import { useThemeStore } from "@/store/theme-store";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/matches", label: "Matches" },
  { href: "/standings", label: "Standings" },
  { href: "/bracket", label: "Bracket" },
  { href: "/teams", label: "Teams" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useThemeStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--background)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-lg leading-none text-[var(--color-fifa-gold)]">
            WC26
          </span>
          <span className="hidden text-sm font-medium text-[var(--foreground-dim)] sm:inline">
            Bangladesh Dashboard
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-[var(--color-fifa-gold)]"
                    : "text-[var(--foreground-dim)] hover:text-[var(--foreground)]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            aria-label="Search teams, players, matches"
            className="rounded-full p-2 text-[var(--foreground-dim)] hover:bg-white/5 hover:text-[var(--foreground)]"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/favorites"
            aria-label="Your favorites"
            className="rounded-full p-2 text-[var(--foreground-dim)] hover:bg-white/5 hover:text-[var(--foreground)]"
          >
            <Star className="h-5 w-5" />
          </Link>
          <button
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
            className="rounded-full p-2 text-[var(--foreground-dim)] hover:bg-white/5 hover:text-[var(--foreground)]"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full p-2 text-[var(--foreground-dim)] hover:bg-white/5 hover:text-[var(--foreground)] md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-[var(--border-subtle)] px-4 py-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block rounded-md px-3 py-2.5 text-sm font-medium",
                pathname === link.href
                  ? "text-[var(--color-fifa-gold)]"
                  : "text-[var(--foreground-dim)]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
