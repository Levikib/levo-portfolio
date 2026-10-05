"use client";
import { useEffect, useState } from "react";

/** Prev/next clay buttons for the featured shelf row. Disabled at either end. */
export default function ShelfControls({ target }: { target: string }) {
  const [edge, setEdge] = useState({ start: true, end: false });
  useEffect(() => {
    const el = document.getElementById(target);
    if (!el) return;
    const check = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    check();
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => { el.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, [target]);
  const go = (dir: 1 | -1) => {
    const el = document.getElementById(target);
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduced ? "auto" : "smooth" });
  };
  return (
    <div className="ed-shelf__controls">
      <button type="button" className="ed-shelf__btn" onClick={() => go(-1)} disabled={edge.start} aria-label="Scroll the shelf back" aria-controls={target}>←</button>
      <button type="button" className="ed-shelf__btn" onClick={() => go(1)} disabled={edge.end} aria-label="Scroll the shelf forward" aria-controls={target}>→</button>
    </div>
  );
}
