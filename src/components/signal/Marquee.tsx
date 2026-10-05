/** A slow ticker of words on an amber clay strip. Pure CSS, stops under reduced motion. */
export default function Marquee({ items, tone = "signal" }: { items: string[]; tone?: "signal" | "lime" | "violet" }) {
  const row = items.map((t, i) => (
    <span key={i} className="marquee__item">{t}<i aria-hidden>✦</i></span>
  ));
  return (
    <div className={`marquee marquee--${tone}`}>
      <p className="sr-only">{items.join(", ")}</p>
      <div className="marquee__track" aria-hidden>
        <div className="marquee__run">{row}</div>
        <div className="marquee__run">{row}</div>
      </div>
    </div>
  );
}
