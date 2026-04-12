export const API_CONFIG = {
  wsBase: process.env.NEXT_PUBLIC_WS_BASE!,
  restBase: process.env.NEXT_PUBLIC_REST_BASE!,
  wsOrderBook: process.env.NEXT_PUBLIC_WS_ORDER_BOOK!,
} as const;