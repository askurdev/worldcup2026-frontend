"use client";

import { useEffect, useState } from "react";
import { toBSTFull } from "@/lib/utils/time";

export function Hero() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-[var(--border-subtle)]">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, var(--color-fifa-gold) 39px, var(--color-fifa-gold) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, var(--color-fifa-gold) 39px, var(--color-fifa-gold) 40px)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="font-data text-xs uppercase tracking-[0.2em] text-[var(--color-electric-teal)]">
          {now ? toBSTFull(now.toISOString()) : "Loading time..."}
        </p>
        <h1 className="font-display mt-3 text-4xl leading-[1.05] text-[var(--foreground)] sm:text-6xl">
          World Cup 2026,
          <br />
          <span className="text-[var(--color-fifa-gold)]">on Dhaka time.</span>
        </h1>
        <p className="mt-4 max-w-xl text-base text-[var(--foreground-dim)] sm:text-lg">
          Every kickoff, every group, every bracket slot — converted to BST so
          you never do the timezone math during a World Cup at odd hours back home.
        </p>
      </div>
    </section>
  );
}
