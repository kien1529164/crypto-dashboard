import { createStore } from 'satcheljs';
import { OrderBookState } from '@/types/orderBook';

interface OrderBookStore {
  books: Record<string, OrderBookState>;
}

declare global {
  var __orderBookStore: (() => OrderBookStore) | undefined;
}

const getOrderBookStore: () => OrderBookStore = (() => {
  if (global.__orderBookStore) return global.__orderBookStore;
  try {
    global.__orderBookStore = createStore<OrderBookStore>('orderBook', {
      books: {},
    });
  } catch {
  }
  return global.__orderBookStore!;
})();

export default getOrderBookStore;