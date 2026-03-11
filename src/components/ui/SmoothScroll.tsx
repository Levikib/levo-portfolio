"use client";
import { useEffect, useRef, useState } from "react";

// Detect touch device — skip Lenis entirely on mobile
// Lenis hijacks touch scroll events causing pages to appear frozen/unloadable
function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [isTouch] = useState(() => typeof window !== "undefined" ? isTouchDevice() : false);
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Never run Lenis on touch/mobile — it blocks native scroll
    if (isTouch) return;

    let lenis: any;
    (async () => {
      try {
        // Try both package names — handles both old and new installs
        let LenisClass;
        try {
          const mod = await import("lenis");
          LenisClass = mod.default || mod.Lenis;
        } catch {
          const mod = await import("@studio-freight/lenis");
          LenisClass = mod.default;
        }

        lenis = new LenisClass({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          smoothWheel: true,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch {
        // If Lenis fails entirely, native scroll works fine
      }
    })();

    return () => { lenis?.destroy(); };
  }, [isTouch]);

  return <>{children}</>;
}
