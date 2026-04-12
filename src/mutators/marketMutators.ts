import { mutator } from 'satcheljs';
import { setPairs, updateLastCandle, updatePrices, updateSettings } from '@/actions/marketActions';
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