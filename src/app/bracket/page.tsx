"use client";

import { useBracket } from "@/hooks/use-standings";
import { BracketColumn } from "@/components/bracket/bracket-column";

export default function BracketPage() {
  const { data: bracket, isLoading } = useBracket();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl text-[var(--foreground)]">Knockout Bracket</h1>
      <p className="mt-2 text-sm text-[var(--foreground-dim)]">
        Slots fill in automatically as group standings are finalized. Right now the group
        stage is still underway, so most slots show the qualification logic rather than
        confirmed teams.
      </p>

      {isLoading || !bracket ? (
        <div className="mt-8 h-96 animate-pulse rounded-xl bg-white/5" />
      ) : (
        <div className="bracket-scroll mt-8 overflow-x-auto pb-4">
          <div className="flex min-w-[1400px] gap-8">
            <div className="w-56 shrink-0">
              <BracketColumn round="round_of_32" slots={bracket.roundOf32} slotGapRem={1} />
            </div>
            <div className="w-56 shrink-0">
              <BracketColumn round="round_of_16" slots={bracket.roundOf16} slotGapRem={3.25} />
            </div>
            <div className="w-56 shrink-0">
              <BracketColumn round="quarter_final" slots={bracket.quarterFinals} slotGapRem={7.75} />
            </div>
            <div className="w-56 shrink-0">
              <BracketColumn round="semi_final" slots={bracket.semiFinals} slotGapRem={17} />
            </div>
            <div className="flex w-56 shrink-0 flex-col gap-12">
              {bracket.final && (
                <BracketColumn round="final" slots={[bracket.final]} slotGapRem={0} />
              )}
              {bracket.thirdPlace && (
                <BracketColumn round="third_place" slots={[bracket.thirdPlace]} slotGapRem={0} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
