import { action } from "satcheljs";

export const subscribeOrderBook = action("SUBSCRIBE_ORDER_BOOK", (symbol: string) => ({ symbol }));
