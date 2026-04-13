import { createStore } from "satcheljs";
import { OrderBookState } from "@/types/orderBook";

interface OrderBookStore {
  books: Record<string, OrderBookState>;
}

const initialState: OrderBookStore = {
  books: {},
};

const globalKey = "__orderBookStore__";

if (!(global as any)[globalKey]) {
  (global as any)[globalKey] = createStore("orderBookStore", initialState);
}

const getOrderBookStore = (global as any)[globalKey] as () => OrderBookStore;

export default getOrderBookStore;
