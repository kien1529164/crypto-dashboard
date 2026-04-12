'use client';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { initMarket } from '@/orchestrators/marketOrchestrators';
import { setPairs } from '@/actions/marketActions';
import { PairCard } from './PairCard';
import getStore from '@/stores/marketStore';
import type { CryptoPair } from '@/types';

interface DashboardClientProps {
  initialPairs: CryptoPair[];
}

const DashboardClient = observer(({ initialPairs }: DashboardClientProps) => {
  useEffect(() => {
    setPairs(initialPairs);
    initMarket();
  }, []);

  const store = getStore();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
      {store.pairs.map(pair => (
        <PairCard key={pair.symbol} pair={pair} />
      ))}
    </div>
  );
});

export { DashboardClient };