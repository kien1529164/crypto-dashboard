'use client';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
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
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [priceData?.price]);

  const changePercent = priceData ? parseFloat(priceData.priceChangePercent) : null;
  const isPositive = changePercent !== null && changePercent >= 0;

  return (
      <div
        onClick={() => router.push(`/pair/${pair.symbol}`)}
        className={clsx(
          'card rounded-xl px-4 py-3.5 cursor-pointer transition-all duration-300',
          flash === 'up'   && 'border-green-500/60! bg-green-500/15',
          flash === 'down' && 'border-red-500/60! bg-red-500/15',
        )}
      >
      {/* Header */}
      <div className="flex justify-between items-center mb-2.5">
        <div className="flex items-center gap-1.5">
          <FavoriteButton symbol={pair.symbol} />
          <span className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>
            {pair.baseAsset}
            <span style={{ color: 'var(--text-muted)' }} className="font-normal">
              /{pair.quoteAsset}
            </span>
          </span>
        </div>

        {/* % badge */}
        <span
          className={clsx(
            'text-[11px] font-medium px-2 py-0.5 rounded-full',
            changePercent === null
              ? 'bg-slate-500/15 text-slate-500'
              : isPositive
              ? 'bg-green-500/15 text-green-500'
              : 'bg-red-500/15 text-red-500',
          )}
        >
          {changePercent !== null
            ? `${isPositive ? '+' : ''}${changePercent.toFixed(2)}%`
            : '—'}
        </span>
      </div>

      {/* Price */}
      <div
        className={clsx(
          'text-[17px] font-bold font-mono transition-colors duration-300',
          flash === 'up'   ? 'text-green-400' :
          flash === 'down' ? 'text-red-400'   : '',
        )}
        style={flash === 'neutral' ? { color: 'var(--text-primary)' } : undefined}
      >
        {priceData ? (
          `$${parseFloat(priceData.price).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
          })}`
        ) : (
          <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
            Loading...
          </span>
        )}
      </div>

      {/* Absolute change */}
      {priceData && (
        <div
          className={clsx(
            'text-[12px] mt-1',
            isPositive ? 'text-green-500' : 'text-red-500',
          )}
        >
          {isPositive ? '+' : ''}
          {parseFloat(priceData.priceChange).toFixed(4)}
        </div>
      )}

      {/* Flash bar */}
      <div
        className={clsx(
          'mt-2.5 h-0.5 rounded-full transition-all duration-300',
          flash === 'up'   ? 'bg-green-500 opacity-100' :
          flash === 'down' ? 'bg-red-500 opacity-100'   :
          'opacity-20',
        )}
        style={flash === 'neutral' ? { backgroundColor: 'var(--border-color)' } : undefined}
      />
    </div>
  );
});