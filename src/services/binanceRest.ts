import { API_CONFIG } from "@/config/api";
import { Candle, CryptoPair } from "@/types";

const BASE = API_CONFIG.restBase;

export async function fetchPairs(): Promise<CryptoPair[]> {
  const res = await fetch(`${BASE}/exchangeInfo`);
  if (!res.ok) throw new Error('Failed to fetch exchange info');
  const data = await res.json();
  return data.symbols
    .filter((s: any) => s.status === 'TRADING' && s.quoteAsset === 'USDT')
    .map((s: any) => ({ symbol: s.symbol, baseAsset: s.baseAsset, quoteAsset: s.quoteAsset }));
}

export async function fetchKlines(symbol: string, interval: string): Promise<Candle[]> {
  const res = await fetch(`${BASE}/klines?symbol=${symbol}&interval=${interval}&limit=200`);
  const data = await res.json();
  return data.map((k: any[]) => ({
    time: k[0] / 1000, open: parseFloat(k[1]), high: parseFloat(k[2]),
    low: parseFloat(k[3]), close: parseFloat(k[4]), volume: parseFloat(k[5]),
  }));
}