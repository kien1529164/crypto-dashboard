import { type RefObject } from "react";
import { SearchResultItem } from "./SearchResultItem";
import type { CryptoPair } from "@/types";
import getStore from "@/stores/marketStore";
import { SearchFooter } from "./SerachFooter";

interface Props {
  results: CryptoPair[];
  query: string;
  highlighted: number;
  dropdownRef: RefObject<HTMLDivElement | null>;
  onSelect: (pair: CryptoPair) => void;
  onMouseEnter: (i: number) => void;
}

export function SearchDropdown({ results, query, highlighted, dropdownRef, onSelect, onMouseEnter }: Props) {
  const store = getStore();

  return (
    <div
      ref={dropdownRef}
      className="absolute top-[calc(100%+6px)] left-0 right-0 rounded-lg overflow-hidden z-50 border"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-color)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      {results.map((pair, i) => (
        <SearchResultItem
          key={pair.symbol}
          pair={pair}
          priceData={store.prices[pair.symbol]}
          query={query}
          isHighlighted={highlighted === i}
          onSelect={() => onSelect(pair)}
          onMouseEnter={() => onMouseEnter(i)}
        />
      ))}
      <SearchFooter />
    </div>
  );
}
