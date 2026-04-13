'use client';
import { observer } from 'mobx-react-lite';
import { toggleFavorite } from '@/actions/marketActions';
import getStore from '@/stores/marketStore';

interface Props {
  symbol: string;
}

export const FavoriteButton = observer(({ symbol }: Props) => {
  const isFav = getStore().settings.favorites.includes(symbol);

  return (
    <button
      onClick={e => {
        e.stopPropagation(); // prevent navigating to detail page
        toggleFavorite(symbol);
      }}
      className="p-1 rounded-md transition-colors hover:bg-white/10"
      title={isFav ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={isFav ? '#f59e0b' : 'none'}
        stroke={isFav ? '#f59e0b' : '#475569'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    </button>
  );
});