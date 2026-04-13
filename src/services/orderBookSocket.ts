import { updateOrderBook } from "@/actions/updateOrderBook";
import { API_CONFIG } from "@/config/api";

interface DepthPayload {
  lastUpdateId: number;
  bids: [string, string][];
  asks: [string, string][];
}

const WS_BASE = API_CONFIG.wsOrderBook;
const sockets = new Map<string, WebSocket>();
const timers = new Map<string, ReturnType<typeof setInterval>>();

export function connectOrderBook(symbol: string) {
  if (sockets.has(symbol)) return;

  const ws = new WebSocket(`${WS_BASE}/${symbol.toLowerCase()}@depth20@100ms`);

  let buffer: DepthPayload | null = null;

  const flush = setInterval(() => {
    if (!buffer) return;
    updateOrderBook(
      symbol,
      buffer.bids.map(([price, quantity]) => ({ price, quantity })),
      buffer.asks.map(([price, quantity]) => ({ price, quantity })),
      buffer.lastUpdateId,
    );
    buffer = null;
  }, 200);

  ws.onopen = () => console.log("[orderBook] connected:", symbol);
  ws.onclose = (e) => {
    console.log("[orderBook] closed:", {
      code: e.code,
      reason: e.reason,
      wasClean: e.wasClean,
    });
  };
  ws.onclose = () => {
    clearInterval(flush);
    sockets.delete(symbol);
    timers.delete(symbol);
  };
  ws.onmessage = (e: MessageEvent) => {
    buffer = JSON.parse(e.data) as DepthPayload;
  };

  sockets.set(symbol, ws);
  timers.set(symbol, flush);
}

export function disconnectOrderBook(symbol: string) {
  const ws = sockets.get(symbol);
  const timer = timers.get(symbol);

  if (timer) clearInterval(timer);
  if (ws) ws.close();

  sockets.delete(symbol);
  timers.delete(symbol);
}
