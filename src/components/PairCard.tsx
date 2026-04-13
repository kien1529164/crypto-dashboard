'use client';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CryptoPair } from '@/types';
import getStore from '@/stores/marketStore';
import { FavoriteButton } from './FavoriteButton';

interface PairCardProps {
  pair: CryptoPair;
}

export const PairCard = observer(({ pair }: PairCardProps) => {
  const router = useRouter();
  const store = getStore();
  const priceData = store.prices[pair.symbol];

  const [flash, setFlash] = useState<'up' | 'down' | 'neutral'>('neutral');
  const prevPriceRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!priceData?.price) return;
    const prev = prevPriceRef.current;
    if (prev !== null && prev !== priceData.price) {
      const dir = parseFloat(priceData.price) > parseFloat(prev) ? 'up' : 'down';
      if (timerRef.current) clearTimeout(timerRef.current);
      setFlash(dir);
      timerRef.current = setTimeout(() => setFlash('neutral'), 800);
    }
    prevPriceRef.current = priceData.price;
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [priceData?.price]);

  const changePercent = priceData ? parseFloat(priceData.priceChangePercent) : null;
  const isPositive = changePercent !== null && changePercent >= 0;

  const cardStyle: React.CSSProperties = {
    backgroundColor:
      flash === 'up'   ? 'rgba(34, 197, 94, 0.15)' :
      flash === 'down' ? 'rgba(239, 68, 68, 0.15)'  :
      '#1a1d27',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor:
      flash === 'up'   ? 'rgba(34, 197, 94, 0.6)'  :
      flash === 'down' ? 'rgba(239, 68, 68, 0.6)'   :
      '#2a2d3a',
    borderRadius: 12,
    padding: '14px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.4s ease, border-color 0.4s ease',
  };

  const priceColor =
    flash === 'up'   ? '#22c55e' :
    flash === 'down' ? '#ef4444' :
    '#ffffff';

  return (
    <div
  onClick={() => router.push(`/pair/${pair.symbol}`)}
  className={`border rounded-xl px-4 py-3.5 cursor-pointer transition-all duration-300 p
    ${
      flash === 'up'
        ? 'bg-green-500/15 border-green-500/60'
        : flash === 'down'
        ? 'bg-red-500/15 border-red-500/60'
        : 'bg-[#1a1d27] border-[#2a2d3a]'
    }`}
>
      {/* Header */}
      <div className="flex justify-between items-center mb-2.5">
        <FavoriteButton symbol={pair.symbol} />
        <span className="text-[13px] font-semibold text-slate-200">
          {pair.baseAsset}
          <span className="text-slate-500 font-normal">
            /{pair.quoteAsset}
          </span>
        </span>

        {/* % badge */}
        <span
          className={`text-[11px] font-medium px-2 py-0.5 rounded-full
            ${
              changePercent === null
                ? 'bg-[#2a2d3a] text-slate-500'
                : isPositive
                ? 'bg-green-500/15 text-green-500'
                : 'bg-red-500/15 text-red-500'
            }`}
        >
          {changePercent !== null
            ? `${isPositive ? '+' : ''}${changePercent.toFixed(2)}%`
            : '—'}
        </span>
      </div>

      {/* Price */}
      <div
        className="text-[17px] font-bold font-mono transition-colors duration-400"
        style={{ color: priceColor }}
      >
        {priceData ? (
          `$${parseFloat(priceData.price).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
          })}`
        ) : (
          <span className="text-slate-700 text-[13px]">
            Loading...
          </span>
        )}
      </div>

      {/* Absolute change */}
      {priceData && (
        <div
          className={`text-[12px] mt-1 ${
            isPositive ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {isPositive ? '+' : ''}
          {parseFloat(priceData.priceChange).toFixed(4)}
        </div>
      )}

      {/* Flash bar */}
      <div
        className={`mt-2.5 h-0.5 rounded-full transition-all duration-400
          ${
            flash === 'up'
              ? 'bg-green-500 opacity-100'
              : flash === 'down'
              ? 'bg-red-500 opacity-100'
              : 'bg-[#2a2d3a] opacity-40'
          }`}
      />
    </div>
  );
});