import { createStore } from 'satcheljs';
import type { CryptoPair, PriceData, Candle, AppSettings } from '@/types';

interface MarketStore {
  pairs: CryptoPair[];
  prices: Record<string, PriceData>;
  selectedSymbol: string | null;
  candles: Candle[];
  settings: AppSettings;
  isLoading: boolean;
  error: string | null;
}

const initialState: MarketStore = {
  pairs: [],
  prices: {},
  selectedSymbol: null,
  candles: [],
  settings: {
    theme: 'dark',
    language: 'en',
    favorites: [],
  },
  isLoading: false,
  error: null,
};

const globalKey = '__marketStore__';

if (!(global as any)[globalKey]) {
  (global as any)[globalKey] = createStore('marketStore', initialState);
}

const getStore = (global as any)[globalKey] as () => MarketStore;

export default getStore;