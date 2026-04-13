import { action } from "satcheljs";

export const unsubscribeOrderBook = action("UNSUBSCRIBE_ORDER_BOOK", (symbol: string) => ({
  symbol,
}));
