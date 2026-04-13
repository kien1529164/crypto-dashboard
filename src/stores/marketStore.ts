import { createStore } from 'satcheljs';
import type { CryptoPair, PriceData, Candle, AppSettings, Trade } from '@/types';

interface MarketStore {
  pairs: CryptoPair[];
  prices: Record<string, PriceData>;
  selectedSymbol: string | null;
  candles: Candle[];
  trades: Trade[];
  settings: AppSettings;
  isLoadingPairs: boolean,
  isLoadingDetail: boolean, 
  error: string | null;
}

const initialState: MarketStore = {
  pairs: [],
  prices: {},
  selectedSymbol: null,
  candles: [],
  trades: [] as Trade[], 
  settings: {
    theme: 'dark',
    language: 'en',
    favorites: [],
  },
  isLoadingPairs: true,
  isLoadingDetail: true, 
  error: null,
};

const globalKey = '__marketStore__';

if (!(global as any)[globalKey]) {
  (global as any)[globalKey] = createStore('marketStore', initialState);
}

const getStore = (global as any)[globalKey] as () => MarketStore;

export default getStore;