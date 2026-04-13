export function StarIcon({
  className = "",
  size = 15,
  color = "var(--color-amber-400)",
  borderColor = "var(--color-amber-400)",
}: {
  className?: string;
  size?: number;
  color?: string;
  borderColor?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke={borderColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
