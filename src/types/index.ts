import { UTCTimestamp } from "lightweight-charts";

export interface CryptoPair {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
}

export interface PriceData {
  symbol: string;
  price: string;
  priceChange: string;
  priceChangePercent: string;
  highPrice?: string;
  lowPrice?: string;
  lastUpdated: number;
  direction: 'up' | 'down' | 'neutral';
}

export interface Candle {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MiniTickerPayload {
  e: '24hrMiniTicker';
  s: string;   // symbol
  c: string;   // close price
  o: string;   // open price
  h: string;   // high
  l: string;   // low
}

export interface KlinePayload {
  k: {
    t: number; o: string; h: string;
    l: string; c: string; v: string;
    x: boolean; // is candle closed?
  };
}

export interface AppSettings {
  theme: 'light' | 'dark';
  language: 'en' | 'vi';
  favorites: string[];
}

export interface Trade {
  id: number;
  price: string;
  quantity: string;
  time: number;
  isBuyerMaker: boolean; // true = sell, false = buy
}