"use client";
import { useEffect, useRef } from "react";

/**
 * A tilted ring of type orbiting the hero orb. It speeds up while the pointer is over the stage
 * or the page is scrolling, and leans toward the pointer. The ring is drawn twice: the back half
 * sits behind the orb, the front half (clipped) passes over it, so the words wrap the avatar.
 */
const LINES = [
  "I don't get lucky. I ship",
  "Founder, Makeja Homes",
  "Code. Brand. Strategy",
  "Nairobi to the world",
  "Winners build the system",
];
const TEXT = LINES.map((l) => l.toUpperCase()).join("  ✦  ") + "  ✦  ";

const R = 262; // ring radius in a 600 x 600 box
const C = 2 * Math.PI * R;
// counter-clockwise circle, so letters read upright on the front (lower) half
const CIRCLE = `M ${300 - R} 300 A ${R} ${R} 0 1 0 ${300 + R} 300 A ${R} ${R} 0 1 0 ${300 - R} 300`;

function Ring({ id, layer }: { id: string; layer: "back" | "front" }) {
  return (
    <svg viewBox="0 0 600 600" className={`hr-ring__svg hr-ring__svg--${layer}`} aria-hidden>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd39a" />
          <stop offset=".45" stopColor="#ff9a33" />
          <stop offset="1" stopColor="#d76400" />
        </linearGradient>
        <path id={`${id}-p`} d={CIRCLE} />
      </defs>
      <circle cx="300" cy="300" r={R} fill="none" stroke={`url(#${id}-g)`} strokeWidth="46" />
      <circle cx="300" cy="300" r={R + 21} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
      <circle cx="300" cy="300" r={R - 21} fill="none" stroke="rgba(90,40,0,.35)" strokeWidth="1.5" />
      <text className="hr-ring__text" dy="7">
        <textPath href={`#${id}-p`} textLength={C - 6} lengthAdjust="spacing">{TEXT}</textPath>
      </text>
    </svg>
  );
}

export default function HeroRing() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const stage = el.parentElement as HTMLElement | null;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let angle = 0, speed = 0.06, target = 0.06, tiltX = 0, tiltY = 0, tx = 0, ty = 0, last = performance.now(), raf = 0;
    let lastScroll = window.scrollY;

    const onEnter = () => { target = 0.3; };
    const onLeave = () => { target = 0.06; tx = 0; ty = 0; };
    const onMove = (e: PointerEvent) => {
      const r = (stage ?? el).getBoundingClientRect();
      tx = ((e.clientY - r.top) / r.height - 0.5) * -14;
      ty = ((e.clientX - r.left) / r.width - 0.5) * 18;
    };
    const onScroll = () => {
      const d = Math.abs(window.scrollY - lastScroll);
      lastScroll = window.scrollY;
      speed = Math.min(1.2, speed + d * 0.004);
    };

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      speed += (target - speed) * 0.05;
      angle = (angle + speed * dt * 0.06) % 360;
      tiltX += (tx - tiltX) * 0.08;
      tiltY += (ty - tiltY) * 0.08;
      el.style.setProperty("--hr-a", `${-angle}deg`);
      el.style.setProperty("--hr-tx", `${tiltX}deg`);
      el.style.setProperty("--hr-ty", `${tiltY}deg`);
      raf = requestAnimationFrame(tick);
    };

    if (!reduce) {
      stage?.addEventListener("pointerenter", onEnter);
      stage?.addEventListener("pointerleave", onLeave);
      stage?.addEventListener("pointermove", onMove);
      window.addEventListener("scroll", onScroll, { passive: true });
      raf = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(raf);
      stage?.removeEventListener("pointerenter", onEnter);
      stage?.removeEventListener("pointerleave", onLeave);
      stage?.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="hr-ring" aria-hidden>
      <div className="hr-ring__plane hr-ring__plane--back"><div className="hr-ring__spin"><Ring id="hrb" layer="back" /></div></div>
      <div className="hr-ring__plane hr-ring__plane--front"><div className="hr-ring__spin"><Ring id="hrf" layer="front" /></div></div>
    </div>
  );
}
