type Props = {
  name: string;
  className?: string;
  size?: number;
  filled?: boolean;
};

export function IconSymbol({ name, className = "", size = 20, filled = false }: Props) {
  return (
    <span
      className={`font-symbols select-none leading-none ${className}`}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 500, 'GRAD' 0, 'opsz' ${size}`,
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
