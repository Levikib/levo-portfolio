"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mx = useRef(0), my = useRef(0);
  const rx = useRef(0), ry = useRef(0);
  const rafRef = useRef<number>(0);
  // Don't render on touch devices — causes invisible overlapping elements at 0,0
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;
    setShow(true);

    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx.current - 6 + "px";
        dotRef.current.style.top  = my.current - 6 + "px";
      }
    };

    const animate = () => {
      rx.current += (mx.current - rx.current - 20) * 0.1;
      ry.current += (my.current - ry.current - 20) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = rx.current + "px";
        ringRef.current.style.top  = ry.current + "px";
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      dotRef.current?.classList.add("scale-[2.5]");
      ringRef.current?.classList.add("scale-[1.8]", "opacity-50");
    };
    const onLeaveLink = () => {
      dotRef.current?.classList.remove("scale-[2.5]");
      ringRef.current?.classList.remove("scale-[1.8]", "opacity-50");
    };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!show) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed w-3 h-3 bg-[var(--neon-orange)] rounded-full pointer-events-none z-[9999] transition-transform duration-100 mix-blend-difference"
        style={{ top: 0, left: 0 }}
      />
      <div
        ref={ringRef}
        className="fixed w-10 h-10 border border-[var(--neon-orange)] rounded-full pointer-events-none z-[9998] transition-transform duration-200 mix-blend-difference"
        style={{ top: 0, left: 0 }}
      />
    </>
  );
}
