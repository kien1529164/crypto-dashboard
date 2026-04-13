// components/OrderBook.tsx
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import getOrderBookStore from "@/stores/orderBookStore";
import { OrderBookLevel } from "@/types/orderBook";
import { subscribeOrderBook } from "@/actions/subscribeOrderBook";
import { unsubscribeOrderBook } from "@/actions/unsubscribeOrderBook";

interface Props {
  symbol: string;
}

export const OrderBook = observer(({ symbol }: Props) => {
  const store = getOrderBookStore();
  const book = store.books[symbol];

  useEffect(() => {
    subscribeOrderBook(symbol);
    return () => {
      unsubscribeOrderBook(symbol);
    };
  }, [symbol]);

  if (!book) return <div className="text-slate-500 text-sm p-4">Loading order book…</div>;

  const maxBidQty = Math.max(...book.bids.map((l) => parseFloat(l.quantity)));
  const maxAskQty = Math.max(...book.asks.map((l) => parseFloat(l.quantity)));
  const spread = (parseFloat(book.asks[0]?.price ?? "0") - parseFloat(book.bids[0]?.price ?? "0")).toFixed(2);

  const BidRow = ({ level, maxQty }: { level: OrderBookLevel; maxQty: number }) => {
    const pct = Math.min((parseFloat(level.quantity) / maxQty) * 100, 100) || 0;
    return (
      <div className="relative flex justify-between text-[12px] font-mono px-2 py-0.5">
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: `${pct}%`, backgroundColor: "rgba(34,197,94,0.15)" }}
        />
        <span className="relative text-green-500">{parseFloat(level.price).toFixed(2)}</span>
        <span className="relative text-slate-400">{parseFloat(level.quantity).toFixed(4)}</span>
      </div>
    );
  };

  const AskRow = ({ level, maxQty }: { level: OrderBookLevel; maxQty: number }) => {
    const pct = Math.min((parseFloat(level.quantity) / maxQty) * 100, 100) || 0;
    return (
      <div className="relative flex justify-between text-[12px] font-mono px-2 py-0.5">
        <div
          className="absolute inset-y-0 right-0"
          style={{ width: `${pct}%`, backgroundColor: "rgba(239,68,68,0.15)" }}
        />
        <span className="relative text-slate-400">{parseFloat(level.quantity).toFixed(4)}</span>
        <span className="relative text-red-500">{parseFloat(level.price).toFixed(2)}</span>
      </div>
    );
  };

  return (
    <div className="bg-(--bg-card) rounded-xl overflow-hidden text-(--text-primary)">
      {/* Header */}
      <div className="grid grid-cols-2 px-2 py-1.5 text-[11px] text-(--text-muted) border-b border-(--border-color)">
        <div className="flex justify-between pr-2">
          <span>Bid Price</span>
          <span>Quantity</span>
        </div>
        <div className="flex justify-between pl-2">
          <span>Quantity</span>
          <span>Ask Price</span>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-2 divide-x divide-(--border-color)">
        {/* Bids (left) */}
        <div>
          {book.bids.map((level) => (
            <BidRow key={level.price} level={level} maxQty={maxBidQty} />
          ))}
        </div>

        {/* Asks (right) */}
        <div>
          {book.asks.map((level) => (
            <AskRow key={level.price} level={level} maxQty={maxAskQty} />
          ))}
        </div>
      </div>

      {/* Spread */}
      <div className="flex justify-center py-1 text-[11px] text-(--text-muted) border-t border-(--border-color)">
        Spread: {spread}
      </div>
    </div>
  );
});
