interface Props {
  text: string;
  query: string;
}

export function SearchHighlight({ text, query }: Props) {
  if (!query.trim()) return <>{text}</>;

  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, idx)}
      <span className="text-amber-400 font-bold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}
