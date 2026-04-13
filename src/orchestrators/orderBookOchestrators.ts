import { orchestrator } from "satcheljs";
import { subscribeOrderBook } from "@/actions/subscribeOrderBook";
import { unsubscribeOrderBook } from "@/actions/unsubscribeOrderBook";
import { connectOrderBook, disconnectOrderBook } from "@/services/orderBookSocket";

orchestrator(subscribeOrderBook, ({ symbol }) => {
  connectOrderBook(symbol);
});

orchestrator(unsubscribeOrderBook, ({ symbol }) => {
  disconnectOrderBook(symbol);
});
