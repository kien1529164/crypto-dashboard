const SHORTCUTS = [
  ["↑↓", "navigate"],
  ["↵", "select"],
  ["esc", "close"],
] as const;

export function SearchFooter() {
  return (
    <div
      className="flex items-center gap-3 px-4 py-2 border-t"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-color)",
      }}
    >
      {SHORTCUTS.map(([key, label]) => (
        <span key={key} className="flex items-center gap-1 text-[11px]" style={{ color: "var(--text-muted)" }}>
          <kbd
            className="font-mono text-[10px] px-1.5 py-px rounded"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
            }}
          >
            {key}
          </kbd>
          {label}
        </span>
      ))}
    </div>
  );
}
