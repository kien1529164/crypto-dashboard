import { fetchPairs } from '@/services/binanceRest';
import { DashboardClient } from '@/components/DashboardClient';
import { SearchBar } from '@/components/SearchBar';
import { ThemeToggle } from '@/components/ThemeToggle';

export default async function DashboardPage() {
  const pairs = await fetchPairs();
  return (
    <main className="min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-200">
          Crypto Market
        </h1>
        <div className="flex items-center gap-3">
          <SearchBar />
          <ThemeToggle />
        </div>
      </div>
      <DashboardClient initialPairs={pairs} />
    </main>
  );
}