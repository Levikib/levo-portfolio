"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted looping video that downloads nothing until it is near the viewport,
 * then plays only while visible. The home page has six reels; with plain
 * `autoPlay` all six (several MB) downloaded during first load even with
 * preload="none" (PageSpeed, Nov 2026). The poster shows until then, and
 * reduced-motion users keep the poster.
 */
export default function LazyVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") { setArmed(true); return; }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setArmed(true);
            v.play().catch(() => {});
          } else if (!v.paused) {
            v.pause();
          }
        }
      },
      { rootMargin: "150px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video ref={ref} muted loop playsInline preload="none" poster={poster} aria-label={label} src={armed ? src : undefined} autoPlay={armed} />
  );
}
