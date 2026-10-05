"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  alt: string;
  sizes: string;
  /**
   * "card": plays while the parent card is hovered or focused (fine pointers),
   *         or while mostly in view (touch). No controls: the whole card is a link.
   * "stage": plays while in view, with a visible pause/play button.
   * Both stay on the poster under prefers-reduced-motion (stage can still be started by hand).
   */
  mode?: "card" | "stage";
  priority?: boolean;
};

/** Muted looping film over a next/image poster. Never autoplays with sound, never preloads. */
export default function LoopVideo({ src, poster, alt, sizes, mode = "card", priority }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const v = vid.current;
    const el = wrap.current;
    if (!v || !el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const play = () => { if (!userPaused.current) v.play().catch(() => {}); };
    const pause = () => v.pause();
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("playing", onPlay);
    v.addEventListener("pause", onPause);
    const cleanups: (() => void)[] = [() => { v.removeEventListener("playing", onPlay); v.removeEventListener("pause", onPause); }];

    if (!reduced) {
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (mode === "card" && fine) {
        const host = (el.closest(".clay, .ed-shelf__item") as HTMLElement) ?? el;
        const out = (e: FocusEvent) => { if (!host.contains(e.relatedTarget as Node)) pause(); };
        host.addEventListener("mouseenter", play);
        host.addEventListener("mouseleave", pause);
        host.addEventListener("focusin", play);
        host.addEventListener("focusout", out);
        cleanups.push(() => {
          host.removeEventListener("mouseenter", play);
          host.removeEventListener("mouseleave", pause);
          host.removeEventListener("focusin", play);
          host.removeEventListener("focusout", out);
        });
      } else {
        const io = new IntersectionObserver(([e]) => (e.intersectionRatio >= 0.6 ? play() : pause()), { threshold: [0, 0.6] });
        io.observe(el);
        cleanups.push(() => io.disconnect());
      }
    }
    return () => cleanups.forEach((f) => f());
  }, [mode]);

  const toggle = () => {
    const v = vid.current;
    if (!v) return;
    if (v.paused) { userPaused.current = false; v.play().catch(() => {}); }
    else { userPaused.current = true; v.pause(); }
  };

  return (
    <div ref={wrap} className={`ed-vid${playing ? " is-playing" : ""}`}>
      {poster && <Image src={poster} alt={alt} fill sizes={sizes} className="ed-vid__poster" priority={priority} />}
      <video
        ref={vid}
        className="ed-vid__film"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden={poster ? true : undefined}
        aria-label={poster ? undefined : alt}
        tabIndex={-1}
      />
      {mode === "stage" && (
        <button type="button" className="ed-vid__toggle" onClick={toggle} aria-label={playing ? `Pause: ${alt}` : `Play: ${alt}`}>
          {playing ? (
            <svg aria-hidden width="16" height="16" viewBox="0 0 16 16"><rect x="3" y="2" width="3.6" height="12" rx="1.2" fill="currentColor" /><rect x="9.4" y="2" width="3.6" height="12" rx="1.2" fill="currentColor" /></svg>
          ) : (
            <svg aria-hidden width="16" height="16" viewBox="0 0 16 16"><path d="M4 2.2v11.6c0 .7.8 1.1 1.4.7l8.6-5.8c.5-.3.5-1.1 0-1.4L5.4 1.5C4.8 1.1 4 1.5 4 2.2z" fill="currentColor" /></svg>
          )}
          <span className="ed-vid__toggle-label">{playing ? "Pause" : "Play"}</span>
        </button>
      )}
    </div>
  );
}
