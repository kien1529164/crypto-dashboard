import { PairDetailClient } from "@/components/PairDetailClient";
import { fetchKlines } from "@/services/binanceRest";

interface Props {
  params: Promise<{ symbol: string }>;
}

export default async function PairDetailPage({ params }: Props) {
  const { symbol } = await params;
  const candles = await fetchKlines(symbol, "15m");

  return (
    <main style={{ minHeight: "100vh", padding: 24 }}>
      <PairDetailClient symbol={symbol} initialCandles={candles} />
    </main>
  );
}
