"use client";
import { useState, useEffect } from "react";

export function useIsMobile(breakpoint = 768) {
  // Default false so SSR renders desktop (avoids hydration mismatch)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check(); // run immediately on mount
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

// Convenience alias for tablet
export function useIsTablet() {
  return useIsMobile(1024);
}
