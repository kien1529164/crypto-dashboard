import { type RefObject } from "react";

interface Props {
  query: string;
  dropdownRef: RefObject<HTMLDivElement | null>;
}

export function SearchEmpty({ query, dropdownRef }: Props) {
  return (
    <div
      ref={dropdownRef}
      className="absolute top-[calc(100%+6px)] left-0 right-0 rounded-lg px-4 py-5 text-center text-sm z-50 border"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-color)",
        color: "var(--text-muted)",
      }}
    >
      No pairs found for "{query}"
    </div>
  );
}
