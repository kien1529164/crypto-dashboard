import { fetchPairs } from "@/services/binanceRest";
import { DashboardClient } from "@/components/DashboardClient";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchBar } from "@/components/SearchBar";

export default async function DashboardPage() {
  const pairs = await fetchPairs();
  return (
    <main className="min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-(--placeholder-color)">Crypto Market</h1>
        <div className="flex items-center gap-3">
          <SearchBar />
          <ThemeToggle />
        </div>
      </div>
      <DashboardClient initialPairs={pairs} />
    </main>
  );
}
