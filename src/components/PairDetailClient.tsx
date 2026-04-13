'use client';
import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  CandlestickSeries
} from 'lightweight-charts';
import { Candle } from '@/types';
import getStore from '@/stores/marketStore';
import { setCandles, setSelectedSymbol } from '@/actions/marketActions';
import { initPairDetail } from '@/orchestrators/marketOrchestrators';
import { OrderBook } from './OrderBook';
import { FavoriteButton } from './FavoriteButton';
import { TradesFeed } from './TradesFeed';
import { StatsSkeleton, ChartSkeleton, TradesSkeleton } from './Skeleton';

interface Props {
  symbol: string;
  initialCandles: Candle[];
}

const PairDetailClient = observer(({ symbol, initialCandles }: Props) => {
  const router = useRouter();
  const store = getStore();

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 420,
      layout: {
        background: { color: '#0f1117' },
        textColor: '#94a3b8',
      },
      grid: {
        vertLines: { color: '#1e2130' },
        horzLines: { color: '#1e2130' },
      },
      crosshair: {
        vertLine: { color: '#475569' },
        horzLine: { color: '#475569' },
      },
      rightPriceScale: { borderColor: '#2a2d3a' },
      timeScale: { borderColor: '#2a2d3a', timeVisible: true },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderUpColor: '#22c55e',
      borderDownColor: '#ef4444',
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });

    chartRef.current = chart;
    seriesRef.current = series;

    setSelectedSymbol(symbol);
    setCandles(initialCandles);
    series.setData(initialCandles as CandlestickData[]);

    initPairDetail(symbol);

    const ro = new ResizeObserver(() => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    });

    ro.observe(chartContainerRef.current);

    return () => {
      ro.disconnect();
      chart.remove();
    };
  }, [symbol]);

  useEffect(() => {
    if (!seriesRef.current || store.candles.length === 0) return;
    const last = store.candles[store.candles.length - 1];
    seriesRef.current.update(last as CandlestickData);
  }, [store.candles]);

  const priceData = store.prices[symbol];
  const changePercent = priceData ? parseFloat(priceData.priceChangePercent) : null;
  const isPositive = changePercent !== null && changePercent >= 0;

  if (store.isLoadingDetail) {
    return (
      <div>
        {/* Back button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-sm mb-5"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back to market
        </button>

        {/* Header skeleton */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-8 w-36 bg-[#2a2d3a] rounded-lg animate-pulse" />
          <div className="h-7 w-28 bg-[#2a2d3a] rounded-lg animate-pulse" />
          <div className="h-6 w-16 bg-[#2a2d3a] rounded-full animate-pulse" />
        </div>

        <StatsSkeleton />

        <div className="flex gap-4 mt-4">
          <div className="flex-1 min-w-0">
            <ChartSkeleton />
          </div>
          <div className="w-72 shrink-0">
            <TradesSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-slate-200">
      {/* Back button */}
      <button
        onClick={() => router.push('/')}
        className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-sm mb-5"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Back to market
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <FavoriteButton symbol={symbol} />
        <h1 className="text-2xl font-bold">
          {symbol.replace('USDT', '')}
          <span className="text-slate-600 font-normal text-lg">/USDT</span>
        </h1>

        {priceData && (
          <>
            <span className="text-2xl font-bold font-mono">
              ${parseFloat(priceData.price).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              })}
            </span>

            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                isPositive
                  ? 'bg-green-500/15 text-green-400'
                  : 'bg-red-500/15 text-red-400'
              }`}
            >
              {isPositive ? '+' : ''}
              {changePercent?.toFixed(2)}%
            </span>
          </>
        )}
      </div>

      {/* Stats */}
      {priceData && (
        <div className="flex gap-6 mb-6 flex-wrap">
          {[
            {
              label: '24h change',
              value: `${isPositive ? '+' : ''}${parseFloat(priceData.priceChange).toFixed(4)}`,
              color: isPositive ? 'text-green-400' : 'text-red-400',
            },
            {
              label: '24h high',
              value: `$${parseFloat(priceData.highPrice ?? priceData.price).toLocaleString()}`,
              color: 'text-slate-200',
            },
            {
              label: '24h low',
              value: `$${parseFloat(priceData.lowPrice ?? priceData.price).toLocaleString()}`,
              color: 'text-slate-200',
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl px-4 py-3"
            >
              <div className="text-xs text-slate-500 mb-1">{label}</div>
              <div className={`text-sm font-semibold font-mono ${color}`}>
                {value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chart */}
      <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-4 overflow-hidden">
        <div ref={chartContainerRef} className="w-full" />
      </div>

      {/* Trades feed */}
      <div className="flex gap-4 mt-4">
        <div className="w-72 shrink-0">
          <TradesFeed />
        </div>

        <div className="w-64 shrink-0">
          <OrderBook symbol={symbol} />
        </div>
      </div>
    </div>
  );
});

export { PairDetailClient };