/* Hand-drawn doodle marks. Decorative only: aria-hidden everywhere. */
type P = { className?: string; style?: React.CSSProperties; color?: string };

export function Star({ className, style, color = "#ffd23f" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={className} style={style}>
      <path d="M20 3l4.6 10.6L36 15l-8.7 7.7 2.6 11.6L20 28.3 10.1 34.3l2.6-11.6L4 15l11.4-1.4z" fill={color} stroke="#000" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function Squiggle({ className, style, color = "#8b7cff" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 120 30" className={className} style={style} fill="none">
      <path d="M3 18c10-14 18 10 28-2s18 12 28 0 18 12 28 0 18 10 30-4" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Arrow({ className, style, color = "#eee9df" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 90 70" className={className} style={style} fill="none">
      <path d="M6 10c8 30 30 48 70 46" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M64 46l13 10-15 7" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Underline({ className, style, color = "#d4ff3a" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 300 20" preserveAspectRatio="none" className={className} style={style} fill="none">
      <path d="M4 13c60-8 130-10 290-6" stroke={color} strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

export function Burst({ className, style, color = "#ff8a1f" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 60 60" className={className} style={style} fill="none">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <line key={a} x1="30" y1="10" x2="30" y2="2" stroke={color} strokeWidth="4" strokeLinecap="round" transform={`rotate(${a} 30 30)`} />
      ))}
    </svg>
  );
}

export function Bolt({ className, style, color = "#d4ff3a" }: P) {
  return (
    <svg aria-hidden viewBox="0 0 30 44" className={className} style={style}>
      <path d="M18 2L4 25h10l-4 17 16-25H16z" fill={color} stroke="#000" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
