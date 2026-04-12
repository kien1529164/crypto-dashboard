'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import getStore from '@/stores/marketStore';
import type { CryptoPair } from '@/types';

export const SearchBar = observer(() => {
  const router = useRouter();
  const store = getStore();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const results: CryptoPair[] = query.trim().length === 0
    ? []
    : store.pairs
        .filter(p =>
          p.symbol.toLowerCase().includes(query.toLowerCase()) ||
          p.baseAsset.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8);

  useEffect(() => {
    setHighlighted(0);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current && !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (pair: CryptoPair) => {
    setQuery('');
    setIsOpen(false);
    router.push(`/pair/${pair.symbol}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(results[highlighted]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const highlight = (text: string, query: string) => {
    if (!query.trim()) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span style={{ color: '#f59e0b', fontWeight: 700 }}>
          {text.slice(idx, idx + query.length)}
        </span>
        {text.slice(idx + query.length)}
      </>
    );
  };

return (
  <div className="relative w-full max-w-105">
    {/* Input */}
    <div className="flex items-center bg-[#1a1d27] border border-[#2a2d3a] rounded-lg px-3.5 gap-2.5">
      {/* Search icon */}
      <svg
        className="w-4 h-4 text-slate-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>

      <input
        ref={inputRef}
        value={query}
        onChange={e => { setQuery(e.target.value); setIsOpen(true); }}
        onFocus={() => { if (query) setIsOpen(true); }}
        onKeyDown={handleKeyDown}
        placeholder="Search pairs... (e.g. BTC, ETH)"
        className="flex-1 bg-transparent outline-none text-slate-200 text-sm py-3"
      />

      {/* Clear button */}
      {query && (
        <button
          onClick={() => { setQuery(''); setIsOpen(false); inputRef.current?.focus(); }}
          className="text-slate-500 hover:text-slate-300 transition-colors"
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>

    {/* Dropdown */}
    {isOpen && results.length > 0 && (
      <div
        ref={dropdownRef}
        className="absolute top-[calc(100%+6px)] left-0 right-0 bg-[#1a1d27] border border-[#2a2d3a] rounded-lg overflow-hidden z-100 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      >
        {results.map((pair, i) => {
          const priceData = store.prices[pair.symbol];
          const changePercent = priceData ? parseFloat(priceData.priceChangePercent) : null;
          const isPositive = changePercent !== null && changePercent >= 0;

          return (
            <div
              key={pair.symbol}
              onClick={() => handleSelect(pair)}
              onMouseEnter={() => setHighlighted(i)}
              className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors
                ${
                  highlighted === i
                    ? 'bg-[#242736]'
                    : 'bg-transparent'
                }
                ${
                  i < results.length - 1
                    ? 'border-b border-[#1e2130]'
                    : ''
                }`}
            >
              {/* Left */}
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-slate-200">
                  {highlight(pair.baseAsset, query)}
                  <span className="text-slate-500 font-normal">
                    /{pair.quoteAsset}
                  </span>
                </span>
                <span className="text-[11px] text-slate-500">
                  {highlight(pair.symbol, query)}
                </span>
              </div>

              {/* Right */}
              <div className="text-right">
                <div className="text-[13px] font-semibold font-mono text-slate-200">
                  {priceData
                    ? `$${parseFloat(priceData.price).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6,
                      })}`
                    : <span className="text-slate-700">—</span>
                  }
                </div>

                {changePercent !== null && (
                  <div className={`text-[11px] ${
                    isPositive ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {isPositive ? '+' : ''}
                    {changePercent.toFixed(2)}%
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Footer */}
        <div className="px-4 py-2 bg-[#141620] flex gap-3 border-t border-[#1e2130]">
          {[['↑↓', 'navigate'], ['↵', 'select'], ['esc', 'close']].map(([key, label]) => (
            <span
              key={key}
              className="text-[11px] text-slate-600 flex items-center gap-1"
            >
              <kbd className="bg-[#1e2130] border border-[#2a2d3a] rounded px-1.5 py-px text-[10px] text-slate-400 font-mono">
                {key}
              </kbd>
              {label}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* No results */}
    {isOpen && query.trim().length > 0 && results.length === 0 && (
      <div
        ref={dropdownRef}
        className="absolute top-[calc(100%+6px)] left-0 right-0 bg-[#1a1d27] border border-[#2a2d3a] rounded-lg px-4 py-5 text-center text-slate-600 text-sm z-100"
      >
        No pairs found for "{query}"
      </div>
    )}
  </div>
);
});