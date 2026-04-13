export function Skeleton({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`animate-pulse bg-[#2a2d3a] rounded-lg ${className}`} style={style} />;
}
export function PairCardSkeleton() {
  return (
    <div className="rounded-xl border border-[#2a2d3a] bg-(--bg-primary) p-4">
      <div className="flex justify-between items-center mb-2.5">
        <Skeleton className="h-3.5 w-20" />
        <Skeleton className="h-4 w-12 rounded-full" />
      </div>
      <Skeleton className="h-5 w-28 mb-2" />
      <Skeleton className="h-3 w-16 mb-3" />
      <Skeleton className="h-0.5 w-full mt-2" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-(--bg-primary) border border-[#2a2d3a] rounded-xl p-4">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="relative h-105 w-full overflow-hidden rounded-lg">
        <Skeleton className="h-full w-full" />
        {/* Fake candles for visual effect */}
        <div className="absolute inset-0 flex items-end gap-1 px-4 pb-8 opacity-20">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="flex-1 bg-slate-500 rounded-sm" style={{ height: "50%" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TradesSkeleton() {
  return (
    <div className="bg-(--bg-primary) border border-[#2a2d3a] rounded-xl overflow-hidden h-120 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2d3a]">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-10" />
      </div>
      <div className="grid grid-cols-3 px-4 py-2 border-b border-[#1e2130] gap-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-12 ml-auto" />
        <Skeleton className="h-3 w-10 ml-auto" />
      </div>
      <div className="flex-1 overflow-hidden px-4 py-2 space-y-2">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 py-1">
            <Skeleton className="h-3" style={{ opacity: 1 - i * 0.04 }} />
            <Skeleton className="h-3 ml-auto w-3/4" style={{ opacity: 1 - i * 0.04 }} />
            <Skeleton className="h-3 ml-auto w-2/3" style={{ opacity: 1 - i * 0.04 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-(--bg-primary) border border-[#2a2d3a] rounded-xl px-4 py-3 min-w-30">
          <Skeleton className="h-3 w-16 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
}
