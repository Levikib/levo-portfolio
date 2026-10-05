"use client";
import { useState, useEffect } from "react";

/**
 * Server and first client render both return `true` (mobile-first), so
 * hydration always matches. The real width is applied right after mount.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

export function useIsTablet() {
  return useIsMobile(1024);
}
