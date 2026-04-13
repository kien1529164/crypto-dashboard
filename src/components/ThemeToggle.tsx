"use client";
import { observer } from "mobx-react-lite";
import { setTheme } from "@/actions/marketActions";
import getStore from "@/stores/marketStore";
import { MoonIcon } from "./icons/MoonIcon";
import { SunIcon } from "./icons/SunIcon";

export const ThemeToggle = observer(() => {
  const theme = getStore().settings.theme;
  const isDark = theme === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      onClick={toggle}
      className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-(--border-color) hover:bg-(--bg-primary-revert) transition-colors"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <SunIcon className="text-amber-400" /> : <MoonIcon className="text-(--text-muted)" />}
    </button>
  );
});
