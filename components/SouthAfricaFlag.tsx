export function SouthAfricaFlag({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 40"
      role="img"
      aria-label="South Africa"
      focusable="false"
    >
      <g>
        <rect width="60" height="40" fill="#fff" />
        <path fill="#de3831" d="M0 0h60v18H31L15 8H0z" />
        <path fill="#002395" d="M0 40h60V22H31L15 32H0z" />
        <path fill="#ffb612" d="M0 4l28 16L0 36V28l15-8L0 12z" />
        <path fill="#007a4d" d="M0 0h8l26 16h26v8H34L8 40H0v-8l20-12L0 8z" />
        <path fill="#000" d="M0 8l20 12L0 32z" />
      </g>
    </svg>
  );
}
