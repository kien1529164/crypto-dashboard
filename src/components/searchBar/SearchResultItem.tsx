import type { CryptoPair, PriceData } from "@/types";
import { SearchHighlight } from "./SearchHighLight";

interface Props {
  pair: CryptoPair;
  priceData: PriceData | undefined;
  query: string;
  isHighlighted: boolean;
  onSelect: () => void;
  onMouseEnter: () => void;
}

export function SearchResultItem({ pair, priceData, query, isHighlighted, onSelect, onMouseEnter }: Props) {
  const changePercent = priceData ? parseFloat(priceData.priceChangePercent) : null;
  const isPositive = changePercent !== null && changePercent >= 0;

  return (
    <div
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      className="flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors border-b last:border-b-0"
      style={{
        backgroundColor: isHighlighted ? "var(--border-color)" : "transparent",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Left: symbol info */}
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          <SearchHighlight text={pair.baseAsset} query={query} />
          <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>/{pair.quoteAsset}</span>
        </span>
        <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
          <SearchHighlight text={pair.symbol} query={query} />
        </span>
      </div>

      {/* Right: price + change */}
      <div className="text-right">
        <div className="text-sm font-semibold font-mono" style={{ color: "var(--text-primary)" }}>
          {priceData ? (
            `$${parseFloat(priceData.price).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            })}`
          ) : (
            <span style={{ color: "var(--text-muted)" }}>—</span>
          )}
        </div>
        {changePercent !== null && (
          <div className={`text-[11px] ${isPositive ? "text-green-400" : "text-red-400"}`}>
            {isPositive ? "+" : ""}
            {changePercent.toFixed(2)}%
          </div>
        )}
      </div>
    </div>
  );
}
