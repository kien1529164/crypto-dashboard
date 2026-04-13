import { action } from 'satcheljs';
import type { PriceData, Candle, AppSettings, CryptoPair, Trade } from '../types';

export const setPairs = action('setPairs', (pairs: CryptoPair[]) => ({ pairs }));
export const updatePrices = action('updatePrices', (updates: PriceData[]) => ({ updates }));
export const setSelectedSymbol = action('setSelectedSymbol', (symbol: string) => ({ symbol }));
export const setCandles = action('setCandles', (candles: Candle[]) => ({ candles }));
export const updateLastCandle = action('updateLastCandle', (candle: Candle) => ({ candle }));
export const updateSettings = action('updateSettings', (settings: Partial<AppSettings>) => ({ settings }));
export const toggleFavorite = action('toggleFavorite', (symbol: string) => ({ symbol }));
export const setTrades = action('setTrades', (trades: Trade[]) => ({ trades }));
export const addTrade = action('addTrade', (trade: Trade) => ({ trade }));