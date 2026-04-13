import { mutator } from 'satcheljs';
import { addTrade, setPairs, setTrades, toggleFavorite, updateLastCandle, updatePrices, updateSettings } from '@/actions/marketActions';
import getStore from '@/stores/marketStore';

mutator(setPairs, ({ pairs }) => {
  getStore().pairs = pairs;
});

mutator(updatePrices, ({ updates }) => {
  updates.forEach(u => {
    getStore().prices[u.symbol] = u;
  });
});

mutator(updateLastCandle, ({ candle }) => {
  const candles = getStore().candles;
  if (candles.length === 0) return;
  const last = candles[candles.length - 1];
  if (last.time === candle.time) {
    candles[candles.length - 1] = candle;
  } else {
    candles.push(candle);
  }
});

mutator(updateSettings, ({ settings }) => {
  Object.assign(getStore().settings, settings);
  if (typeof window !== 'undefined') {
    localStorage.setItem('settings', JSON.stringify(getStore().settings));
  }
});

mutator(toggleFavorite, ({ symbol }) => {
  const favorites = getStore().settings.favorites;
  const idx = favorites.indexOf(symbol);
  if (idx === -1) {
    favorites.push(symbol);
  } else {
    favorites.splice(idx, 1);
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem('settings', JSON.stringify(getStore().settings));
  }
});

mutator(setTrades, ({ trades }) => {
  const seen = new Set<number>();
  getStore().trades = trades.filter(t => {
    if (seen.has(t.id)) return false;
    seen.add(t.id);
    return true;
  });
});

mutator(addTrade, ({ trade }) => {
  const trades = getStore().trades;
  
  // Deduplicate by id
  const exists = trades.some(t => t.id === trade.id);
  if (exists) return;

  trades.unshift(trade);
  if (trades.length > 50) {
    trades.pop();
  }
});