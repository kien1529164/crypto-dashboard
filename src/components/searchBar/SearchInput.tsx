import { type RefObject } from "react";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { CloseIcon } from "@/components/icons/CloseIcon";

interface Props {
  query: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
  onClear: () => void;
}

export function SearchInput({ query, inputRef, onChange, onKeyDown, onFocus, onClear }: Props) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg px-3.5 border bg-(--bg-card) border-(--border-color)">
      {/* Search icon */}
      <SearchIcon className="text-(--text-muted) shrink-0" />

      <input
        ref={inputRef}
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        placeholder="Search pairs... (e.g. BTC, ETH)"
        className="flex-1 bg-transparent outline-none text-sm py-3 text-(--text-primary)"
      />

      {/* Clear button */}
      {query && (
        <button
          onClick={onClear}
          className="shrink-0 text-(--text-muted) hover:text-(--text-primary) transition-colors"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
