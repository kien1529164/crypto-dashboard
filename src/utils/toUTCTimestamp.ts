import { UTCTimestamp } from 'lightweight-charts';

export const toUTCTimestamp = (timeMs: number): UTCTimestamp =>
  Math.floor(timeMs / 1000) as UTCTimestamp;