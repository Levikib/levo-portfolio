"use client";
import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LenisInstance = any;

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisInstance>(null);

  useEffect(() => {
    // Skip smooth scroll on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      return;
    }

    let animFrameId: number;

    async function initLenis() {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mod = await import("lenis") as any;
        const LenisClass = mod.default || mod;

        const lenis = new LenisClass({
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          smoothWheel: true,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
          lenis.raf(time);
          animFrameId = requestAnimationFrame(raf);
        }
        animFrameId = requestAnimationFrame(raf);
      } catch {
        try {
          const mod = await import("@studio-freight/lenis");
          const LenisClass = mod.default;

          const lenis = new LenisClass({
            duration: 1.4,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            smoothWheel: true,
          });

          lenisRef.current = lenis;

          function raf(time: number) {
            lenis.raf(time);
            animFrameId = requestAnimationFrame(raf);
          }
          animFrameId = requestAnimationFrame(raf);
        } catch {
          // Smooth scroll unavailable — page scrolls normally
        }
      }
    }

    initLenis();

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (lenisRef.current?.destroy) lenisRef.current.destroy();
    };
  }, []);

  return <>{children}</>;
}
