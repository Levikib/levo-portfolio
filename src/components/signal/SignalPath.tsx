"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Draws the amber signal through every [data-node] inside it and reveals the
 * line as you scroll. Stations light up when the signal reaches them.
 * Reduced motion: the whole path is drawn and every station is lit.
 */
export default function SignalPath({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const line = useRef<SVGPathElement>(null);
  const glow = useRef<SVGPathElement>(null);
  const head = useRef<SVGCircleElement>(null);
  const [d, setD] = useState("");
  const [box, setBox] = useState({ w: 0, h: 0 });

  // Build the path from the nodes' positions.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const build = () => {
      const r = el.getBoundingClientRect();
      const nodes = Array.from(el.querySelectorAll<HTMLElement>("[data-node]")).map((n) => {
        const b = n.getBoundingClientRect();
        return { x: b.left - r.left + b.width / 2, y: b.top - r.top + b.height / 2 };
      });
      if (!nodes.length) return;
      const w = r.width;
      const bow = w > 900 ? w * 0.3 : 0;
      let p = `M ${nodes[0].x} 0 L ${nodes[0].x} ${nodes[0].y}`;
      for (let i = 1; i < nodes.length; i++) {
        const a = nodes[i - 1], b = nodes[i];
        const dy = b.y - a.y;
        const s = i % 2 ? 1 : -1;
        p += ` C ${a.x + s * bow} ${a.y + dy * 0.3}, ${b.x + s * bow} ${b.y - dy * 0.3}, ${b.x} ${b.y}`;
      }
      const last = nodes[nodes.length - 1];
      p += ` L ${last.x} ${r.height}`;
      setBox({ w, h: r.height });
      setD(p);
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(el);
    window.addEventListener("load", build);
    return () => { ro.disconnect(); window.removeEventListener("load", build); };
  }, []);

  // Reveal on scroll.
  useEffect(() => {
    const el = wrap.current, path = line.current, g = glow.current, h = head.current;
    if (!el || !path || !d) return;
    const total = path.getTotalLength();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stations = Array.from(el.querySelectorAll<HTMLElement>("[data-station]"));
    [path, g].forEach((p) => { if (p) { p.style.strokeDasharray = `${total}`; } });
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const reach = window.innerHeight * 0.62 - r.top;
      const prog = reduce ? 1 : Math.min(1, Math.max(0, reach / r.height));
      const drawn = total * prog;
      path.style.strokeDashoffset = `${total - drawn}`;
      if (g) g.style.strokeDashoffset = `${total - drawn}`;
      if (h) {
        const pt = path.getPointAtLength(drawn);
        h.setAttribute("cx", `${pt.x}`);
        h.setAttribute("cy", `${pt.y}`);
        h.style.opacity = prog > 0 && prog < 1 ? "1" : "0";
      }
      for (const s of stations) {
        const n = s.querySelector<HTMLElement>("[data-node]");
        if (!n) continue;
        const ny = n.getBoundingClientRect().top - r.top;
        s.dataset.lit = String(reduce || ny <= reach);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [d]);

  return (
    <div ref={wrap} className="sp-path" id="path">
      <svg className="sp-path__svg" viewBox={`0 0 ${box.w || 1} ${box.h || 1}`} preserveAspectRatio="none" aria-hidden>
        <path d={d} stroke="#25282d" strokeWidth="3" fill="none" strokeDasharray="2 10" strokeLinecap="round" />
        <path ref={glow} d={d} className="sp-path__glow" stroke="#ff8a1f" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path ref={line} d={d} stroke="#ff8a1f" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle ref={head} r="9" fill="#ffd9a8" stroke="#ff8a1f" strokeWidth="4" style={{ opacity: 0 }} />
      </svg>
      {children}
    </div>
  );
}
