import { mutator } from "satcheljs";
import { updateOrderBook } from "@/actions/updateOrderBook";
import getOrderBookStore from "@/stores/orderBookStore";
import { OrderBookLevel } from "@/types/orderBook";

const LEVELS = 20;

function mergeAndSort(existing: OrderBookLevel[], updates: OrderBookLevel[], descending: boolean): OrderBookLevel[] {
  const map = new Map(existing.map((l) => [l.price, l.quantity]));

  for (const { price, quantity } of updates) {
    if (parseFloat(quantity) === 0) {
      map.delete(price); // quantity 0 = remove level
    } else {
      map.set(price, quantity);
    }
  }

  return Array.from(map.entries())
    .map(([price, quantity]) => ({ price, quantity }))
    .sort((a, b) =>
      descending ? parseFloat(b.price) - parseFloat(a.price) : parseFloat(a.price) - parseFloat(b.price),
    )
    .slice(0, LEVELS);
}

mutator(updateOrderBook, ({ symbol, bids, asks, lastUpdateId }) => {
  const store = getOrderBookStore();
  const existing = store.books[symbol];

  store.books[symbol] = {
    lastUpdateId,
    bids: mergeAndSort(existing?.bids ?? [], bids, true),
    asks: mergeAndSort(existing?.asks ?? [], asks, false),
  };
});
