"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mx = useRef(0), my = useRef(0);
  const rx = useRef(0), ry = useRef(0);
  const rafRef = useRef<number>(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;
    setShow(true);

    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx.current - 6 + "px";
        dotRef.current.style.top  = my.current - 6 + "px";
        dotRef.current.style.opacity = "1";
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
      if (dotRef.current)  dotRef.current.style.transform  = "scale(2.5)";
      if (ringRef.current) ringRef.current.style.transform = "scale(1.8)";
      if (ringRef.current) ringRef.current.style.opacity   = "0.5";
    };
    const onLeaveLink = () => {
      if (dotRef.current)  dotRef.current.style.transform  = "scale(1)";
      if (ringRef.current) ringRef.current.style.transform = "scale(1)";
      if (ringRef.current) ringRef.current.style.opacity   = "1";
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
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "#ff4d00",
          pointerEvents: "none",
          zIndex: 999999,
          opacity: 0,
          transition: "transform 0.1s ease",
          boxShadow: "0 0 10px #ff4d00, 0 0 20px rgba(255,77,0,0.4)",
          willChange: "left, top",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1.5px solid #ff4d00",
          pointerEvents: "none",
          zIndex: 999998,
          opacity: 1,
          transition: "transform 0.2s ease, opacity 0.2s ease",
          willChange: "left, top",
        }}
      />
    </>
  );
}
