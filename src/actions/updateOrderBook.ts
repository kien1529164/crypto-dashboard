import { action } from 'satcheljs';
import { OrderBookLevel } from '@/types/orderBook';

export const updateOrderBook = action(
  'UPDATE_ORDER_BOOK',
  (symbol: string, bids: OrderBookLevel[], asks: OrderBookLevel[], lastUpdateId: number) =>
    ({ symbol, bids, asks, lastUpdateId })
);