import { BinanceWebSocket } from '@/services/marketSocket';
import { fetchKlines, fetchPairs, fetchRecentTrades } from '@/services/binanceRest';
import { KlinePayload, MiniTickerPayload, PriceData } from '@/types';
import { toUTCTimestamp } from '@/utils/toUTCTimestamp';
import { addTrade, setCandles, setPairs, setTrades, updateLastCandle, updatePrices } from '../actions/marketActions';

// Batch buffer for price updates — flush every 300ms
let priceBuffer: Map<string, PriceData> = new Map();
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let tradesWs: BinanceWebSocket | null = null;

function scheduleFlush() {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    updatePrices(Array.from(priceBuffer.values()));
    priceBuffer.clear();
    flushTimer = null;
  }, 300);
}

export async function initMarket() {
  const pairs = await fetchPairs();
  setPairs(pairs);

  const ws = new BinanceWebSocket('!miniTicker@arr', (data: MiniTickerPayload[]) => {
    data.forEach(tick => {
      priceBuffer.set(tick.s, {
        symbol: tick.s,
        price: tick.c,
        priceChange: String(parseFloat(tick.c) - parseFloat(tick.o)),
        priceChangePercent: String(((parseFloat(tick.c) - parseFloat(tick.o)) / parseFloat(tick.o)) * 100),
        highPrice: tick.h,
        lowPrice: tick.l,
        lastUpdated: Date.now(),
        direction: parseFloat(tick.c) >= parseFloat(tick.o) ? 'up' : 'down',
      });
    });
    scheduleFlush();
  });
  ws.connect();
}

export async function initPairDetail(symbol: string) {
  const candles = await fetchKlines(symbol, '15m');
  setCandles(candles);

  const ws = new BinanceWebSocket(`${symbol.toLowerCase()}@kline_15m`, (data: KlinePayload) => {
    const k = data.k;
    updateLastCandle({
      time: toUTCTimestamp(k.t),
      open: parseFloat(k.o), high: parseFloat(k.h),
      low: parseFloat(k.l), close: parseFloat(k.c),
      volume: parseFloat(k.v),
    });
  });
  ws.connect();

  const trades = await fetchRecentTrades(symbol);
  setTrades(trades);

  if (tradesWs) tradesWs.close();
  tradesWs = new BinanceWebSocket(
    `${symbol.toLowerCase()}@trade`,
    (data: any) => {
      addTrade({
        id: data.t,
        price: data.p,
        quantity: data.q,
        time: data.T,
        isBuyerMaker: data.m,
      });
    }
  );
  tradesWs.connect();
}