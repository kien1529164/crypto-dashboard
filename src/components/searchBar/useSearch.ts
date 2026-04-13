import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { CryptoPair } from "@/types";
import getStore from "@/stores/marketStore";

export function useSearch() {
  const router = useRouter();
  const store = getStore();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const results: CryptoPair[] =
    query.trim().length === 0
      ? []
      : store.pairs
          .filter(
            (p) =>
              p.symbol.toLowerCase().includes(query.toLowerCase()) ||
              p.baseAsset.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 8);

  // Reset highlight when query changes
  useEffect(() => {
    setHighlighted(0);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current?.contains(e.target as Node) || inputRef.current?.contains(e.target as Node)) return;
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (pair: CryptoPair) => {
    setQuery("");
    setIsOpen(false);
    router.push(`/pair/${pair.symbol}`);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setIsOpen(true);
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;
    const actions: Record<string, () => void> = {
      ArrowDown: () => setHighlighted((i) => Math.min(i + 1, results.length - 1)),
      ArrowUp: () => setHighlighted((i) => Math.max(i - 1, 0)),
      Enter: () => handleSelect(results[highlighted]),
      Escape: () => setIsOpen(false),
    };
    if (actions[e.key]) {
      e.preventDefault();
      actions[e.key]();
    }
  };

  const handleFocus = () => {
    if (query) setIsOpen(true);
  };

  return {
    query,
    isOpen,
    highlighted,
    results,
    inputRef,
    dropdownRef,
    handleSelect,
    handleQueryChange,
    handleClear,
    handleKeyDown,
    handleFocus,
    setHighlighted,
  };
}
