'use client';
import { useEffect } from 'react';
import getStore from '@/stores/marketStore';
import '@/orchestrators';
import '@/mutators';
import '@/mutators/marketMutator';

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.assign(getStore().settings, parsed);
      } catch {
      }
    }
  }, []);

  return <>{children}</>;
}