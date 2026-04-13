export interface OrderBookLevel {
  price: string;
  quantity: string;
}

export interface OrderBookState {
  bids: OrderBookLevel[]; // sorted desc
  asks: OrderBookLevel[]; // sorted asc
  lastUpdateId: number;
}
