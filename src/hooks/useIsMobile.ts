"use client";
import { useState, useEffect } from "react";

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    // Lazy initializer — runs synchronously on first client render.
    // On SSR (window undefined) default to TRUE (mobile-first).
    // On client, read actual viewport width immediately — no flash.
    if (typeof window === "undefined") return true;
    return window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

export function useIsTablet() {
  return useIsMobile(1024);
}
