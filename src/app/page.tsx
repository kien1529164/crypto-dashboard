import { fetchPairs } from '@/services/binanceRest';
import { DashboardClient } from '@/components/DashboardClient';
import { SearchBar } from '@/components/SearchBar';

export default async function DashboardPage() {
  const pairs = await fetchPairs();
  return (
    <main className="min-h-screen bg-[#0f1117] p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-200">Crypto Market</h1>
        <SearchBar />
      </div>
      <DashboardClient initialPairs={pairs} />
    </main>
  );
}