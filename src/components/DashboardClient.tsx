"use client";
import { setPairs } from "@/actions/marketActions";
import { initMarket } from "@/orchestrators/marketOrchestrators";
import getStore from "@/stores/marketStore";
import type { CryptoPair } from "@/types";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { PairCard } from "./PairCard";
import { PairCardSkeleton } from "./Skeleton";
import { StarIcon } from "./icons/StarIcon";

interface DashboardClientProps {
  initialPairs: CryptoPair[];
}

const DashboardClient = observer(({ initialPairs }: DashboardClientProps) => {
  useEffect(() => {
    setPairs(initialPairs);
    initMarket();
  }, []);

  const store = getStore();
  const favorites = store.settings.favorites;

  const favoritePairs = store.pairs.filter((p) => favorites.includes(p.symbol));
  const otherPairs = store.pairs.filter((p) => !favorites.includes(p.symbol));

  if (store.isLoadingPairs) {
    return (
      <div>
        {/* Skeleton grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {Array.from({ length: 24 }).map((_, i) => (
            <PairCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Watchlist section */}
      {favoritePairs.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <StarIcon className="text-amber-400" />
            <h2 className="text-sm font-semibold text-amber-400">Watchlist</h2>
            <span className="text-xs text-slate-500">
              {favoritePairs.length} pair{favoritePairs.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-2">
            {favoritePairs.map((pair) => (
              <PairCard key={pair.symbol} pair={pair} />
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-[#2a2d3a] mt-6" />
        </section>
      )}

      {/* All pairs section */}
      <section>
        {favoritePairs.length > 0 && <h2 className="text-sm font-semibold text-slate-500 mb-3">All pairs</h2>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {otherPairs.map((pair) => (
            <PairCard key={pair.symbol} pair={pair} />
          ))}
        </div>
      </section>
    </div>
  );
});

export { DashboardClient };
