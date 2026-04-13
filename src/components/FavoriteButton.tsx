"use client";
import { observer } from "mobx-react-lite";
import { toggleFavorite } from "@/actions/marketActions";
import getStore from "@/stores/marketStore";
import { StarIcon } from "@/components/icons/StarIcon";

interface Props {
  symbol: string;
}

export const FavoriteButton = observer(({ symbol }: Props) => {
  const isFav = getStore().settings.favorites.includes(symbol);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(symbol);
      }}
      className="p-1 rounded-md transition-colors hover:bg-(--border-color)/40"
      title={isFav ? "Remove from watchlist" : "Add to watchlist"}
    >
      <StarIcon size={14} color={isFav ? "#f59e0b" : "none"} />
    </button>
  );
});
