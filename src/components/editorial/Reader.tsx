"use client";
import Image from "next/image";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";

export type ReaderVolume = { vol: string; title: string; folder: string; count: number; ext: string; w: number; h: number };

const src = (v: ReaderVolume, n: number) => `${v.folder}/page-${String(n).padStart(2, "0")}.${v.ext}`;

const Page = forwardRef<HTMLDivElement, { url: string; n: number; total: number; title: string; w: number; h: number; eager: boolean }>(
  ({ url, n, total, title, w, h, eager }, ref) => (
    <div ref={ref} className="ed-reader__page">
      <Image src={url} alt={`${title}, page ${n} of ${total}`} width={w} height={h} sizes="(max-width: 760px) 92vw, 520px" loading={eager ? "eager" : "lazy"} priority={n === 1} />
    </div>
  ),
);
Page.displayName = "Page";

type Book = { pageFlip: () => { flipNext: () => void; flipPrev: () => void; flip: (i: number) => void; turnToPage: (i: number) => void } | undefined };

/**
 * Magazine reader. Renders the cover as a same-size placeholder on the server,
 * then mounts react-pageflip on the client (no window access during render).
 * One page at a time under 760px, a spread above. Arrow keys, buttons, a scrubber
 * and swipes all turn pages; the page lives in ?p= so a page can be shared.
 */
export default function Reader({ v }: { v: ReaderVolume }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<Book | null>(null);
  const [Flip, setFlip] = useState<ComponentType<any> | null>(null);
  const [layout, setLayout] = useState<{ narrow: boolean; pw: number; ph: number } | null>(null);
  const [page, setPage] = useState(0); // 0-based
  const startRef = useRef(0);

  useEffect(() => {
    const p = Number(new URLSearchParams(window.location.search).get("p"));
    if (p >= 1 && p <= v.count) { startRef.current = p - 1; setPage(p - 1); }
    let alive = true;
    import("react-pageflip").then((m) => { if (alive) setFlip(() => m.default as ComponentType<any>); });
    return () => { alive = false; };
  }, [v.count]);

  useEffect(() => {
    const measure = () => {
      const el = stageRef.current;
      if (!el) return;
      const narrow = window.innerWidth < 760;
      const avail = el.clientWidth;
      const maxH = Math.max(320, window.innerHeight - (narrow ? 210 : 230));
      let pw = Math.floor(narrow ? avail : avail / 2);
      let ph = Math.floor((pw * v.h) / v.w);
      if (ph > maxH) { ph = maxH; pw = Math.floor((ph * v.w) / v.h); }
      setLayout((old) => (old && old.narrow === narrow && Math.abs(old.pw - pw) < 8 ? old : { narrow, pw, ph }));
    };
    measure();
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(t); t = setTimeout(measure, 150); };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(t); };
  }, [v.w, v.h]);

  const go = useCallback((dir: 1 | -1) => {
    const pf = bookRef.current?.pageFlip();
    if (!pf) return;
    if (dir === 1) pf.flipNext(); else pf.flipPrev();
  }, []);

  const jump = (i: number) => {
    const pf = bookRef.current?.pageFlip();
    if (!pf) return;
    pf.turnToPage(i);
    onFlip(i);
  };

  const onFlip = (i: number) => {
    setPage(i);
    startRef.current = i;
    const url = new URL(window.location.href);
    url.searchParams.set("p", String(i + 1));
    window.history.replaceState(null, "", url.pathname + url.search);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const ready = Flip && layout;
  const spread = layout && !layout.narrow;
  // In a spread the visible pair after the cover is (even, odd); show both numbers.
  const shown = spread && page > 0 && page < v.count - 1 ? `${page + 1} and ${page + 2}` : `${page + 1}`;

  return (
    <div className="ed-reader">
      <div ref={stageRef} className="ed-reader__stage" style={{ "--pr": `${v.w} / ${v.h}` } as React.CSSProperties}>
        {ready ? (
          <Flip
            key={`${layout.narrow}-${layout.pw}`}
            ref={bookRef}
            width={layout.pw}
            height={layout.ph}
            size="fixed"
            minWidth={200}
            maxWidth={1200}
            minHeight={280}
            maxHeight={1800}
            showCover
            usePortrait={layout.narrow}
            drawShadow
            flippingTime={650}
            maxShadowOpacity={0.45}
            mobileScrollSupport
            className="ed-reader__book"
            style={{}}
            startPage={startRef.current}
            startZIndex={0}
            autoSize={false}
            clickEventForward
            useMouseEvents
            swipeDistance={30}
            showPageCorners
            disableFlipByClick={false}
            onFlip={(e: { data: number }) => onFlip(e.data)}
          >
            {Array.from({ length: v.count }, (_, i) => (
              <Page key={i} url={src(v, i + 1)} n={i + 1} total={v.count} title={v.title} w={v.w} h={v.h} eager={Math.abs(i - startRef.current) < 4} />
            ))}
          </Flip>
        ) : (
          <div className="ed-reader__placeholder">
            <Image src={src(v, 1)} alt={`${v.title}, cover`} width={v.w} height={v.h} priority sizes="(max-width: 760px) 92vw, 520px" />
            <span className="ed-reader__loading">Opening the reader…</span>
          </div>
        )}
      </div>

      <div className="ed-reader__controls">
        <button type="button" className="cbtn cbtn--dark cbtn--md ed-reader__btn" onClick={() => go(-1)} disabled={!ready || page === 0} aria-label="Previous page">
          <span className="cbtn__icon" aria-hidden>←</span><span className="cbtn__label ed-hide-xs">Prev</span>
        </button>
        <div className="ed-reader__scrub">
          <label htmlFor="ed-scrub" className="ed-reader__count" aria-live="polite">
            Page <b>{shown}</b> of {v.count}
          </label>
          <input
            id="ed-scrub"
            type="range"
            min={1}
            max={v.count}
            value={page + 1}
            disabled={!ready}
            onChange={(e) => jump(Number(e.target.value) - 1)}
            style={{ "--pct": `${(page / (v.count - 1)) * 100}%` } as React.CSSProperties}
          />
        </div>
        <button type="button" className="cbtn cbtn--primary cbtn--md ed-reader__btn" onClick={() => go(1)} disabled={!ready || page >= v.count - 1} aria-label="Next page">
          <span className="cbtn__label ed-hide-xs">Next</span><span className="cbtn__icon" aria-hidden>→</span>
        </button>
      </div>
      <p className="ed-reader__hint">Use the arrow keys, swipe, or drag a page corner.</p>
    </div>
  );
}
