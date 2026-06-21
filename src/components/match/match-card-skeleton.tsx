import { Card } from "@/components/ui/card";

export function MatchCardSkeleton() {
  return (
    <Card className="p-4">
      <div className="mb-3 h-5 w-20 animate-pulse rounded-full bg-white/5" />
      <div className="space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="h-[18px] w-6 animate-pulse rounded-[2px] bg-white/5" />
          <div className="h-4 w-32 animate-pulse rounded bg-white/5" />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="h-[18px] w-6 animate-pulse rounded-[2px] bg-white/5" />
          <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
        </div>
      </div>
      <div className="mt-4 h-12 animate-pulse rounded-lg bg-white/5" />
    </Card>
  );
}
