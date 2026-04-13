"use client";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import getStore from "@/stores/marketStore";

export const TradesFeed = observer(() => {
  const trades = getStore().trades;
  const listRef = useRef<HTMLDivElement>(null);
  const isUserScrolling = useRef(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!listRef.current || isUserScrolling.current) return;
    listRef.current.scrollTop = 0;
  }, [trades.length]);

  const handleScroll = () => {
    isUserScrolling.current = true;
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      isUserScrolling.current = false;
    }, 2000);
  };

  const formatPrice = (price: string) =>
    parseFloat(price).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });

  const formatQty = (qty: string) => parseFloat(qty).toFixed(4);

  const formatTime = (ms: number) => {
    const d = new Date(ms);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="bg-(--bg-card) border border-(--border-color) rounded-xl overflow-hidden flex flex-col h-120">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-(--border-color)">
        <h3 className="text-sm font-semibold text-(--text-primary)">Recent Trades</h3>

        {/* Live indicator */}
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-[11px] text-(--text-muted)">Live</span>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-3 px-4 py-2 text-[11px] text-(--text-muted) border-b border-[#1e2130]">
        <span>Price (USDT)</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Time</span>
      </div>

      {/* Trades list */}
      <div ref={listRef} onScroll={handleScroll} className="flex-1 overflow-y-auto scrollbar-thin">
        {trades.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-600 text-sm">Loading trades...</div>
        ) : (
          trades.map((trade, i) => {
            const isBuy = !trade.isBuyerMaker;
            return (
              <div
                key={`${trade.id}-${trade.time}`}
                className="grid grid-cols-3 px-4 py-1.5 text-[12px] font-mono hover:bg-white/5 transition-colors border-b border-[#1e2130]/50"
              >
                <span className={isBuy ? "text-green-400" : "text-red-400"}>{formatPrice(trade.price)}</span>
                <span className="text-right text-slate-300">{formatQty(trade.quantity)}</span>
                <span className="text-right text-(--text-muted)">{formatTime(trade.time)}</span>
              </div>
            );
          })
        )}
      </div>

      {/* Footer: buy/sell ratio */}
      {trades.length > 0 &&
        (() => {
          const buys = trades.filter((t) => !t.isBuyerMaker).length;
          const sells = trades.length - buys;
          const buyPct = Math.round((buys / trades.length) * 100);
          const sellPct = 100 - buyPct;
          return (
            <div className="px-4 py-3 border-t border-[#2a2d3a]">
              <div className="flex justify-between text-[11px] mb-1.5">
                <span className="text-green-400">Buy {buyPct}%</span>
                <span className="text-red-400">Sell {sellPct}%</span>
              </div>
              <div className="flex h-1 rounded-full overflow-hidden">
                <div className="bg-green-500 transition-all duration-500" style={{ width: `${buyPct}%` }} />
                <div className="bg-red-500 transition-all duration-500" style={{ width: `${sellPct}%` }} />
              </div>
            </div>
          );
        })()}
    </div>
  );
});
