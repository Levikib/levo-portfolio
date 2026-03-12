"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const [mounted, setMounted]     = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [["Home", "/"], ["Work", "/work"], ["Store", "/store"], ["Thoughts", "/blog"], ["About", "/about"]];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
        background: "rgba(10,8,5,0.98)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(124,58,237,0.3)",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "0 2px 20px rgba(0,0,0,0.3)",
      }}>
        {/* Rainbow top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #7c3aed 0%, #a855f7 25%, #4ead6a 50%, #d97706 75%, #7c3aed 100%)" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: "68px" }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "22px", letterSpacing: "-0.02em", color: "white" }}>
              LK<span style={{ color: "#a855f7" }}>.</span>
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", borderLeft: "1px solid rgba(255,255,255,0.12)", paddingLeft: "12px", display: mounted && window.innerWidth < 480 ? "none" : "block" }}>
              Nairobi → World
            </span>
          </Link>

          {/* Desktop nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }} className="nav-desktop-links">
            {links.map(([label, href]) => (
              <Link key={label} href={href}
                style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", padding: "10px 14px", color: "rgba(255,255,255,0.75)", transition: "all 0.2s", borderRadius: "2px" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.18)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                onClick={() => setOpen(false)}
              >{label}</Link>
            ))}
          </div>

          {/* Desktop right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="nav-desktop-right">
            <div style={{ display: "flex", alignItems: "center", gap: "7px", padding: "6px 12px", borderRadius: "999px", background: "rgba(77,173,106,0.12)", border: "1px solid rgba(77,173,106,0.3)" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ead6a", display: "block", animation: "blink 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", color: "#4ead6a", textTransform: "uppercase" }}>Available</span>
            </div>
            <a href="https://github.com/Levikib" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "white")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            >GitHub</a>
            <a href="#contact"
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", background: "#7c3aed", color: "white", padding: "10px 22px", textDecoration: "none", transition: "all 0.25s", display: "block", boxShadow: "0 0 20px rgba(124,58,237,0.4)", whiteSpace: "nowrap" }}
              onMouseEnter={e => { (e.currentTarget.style.background = "white"); (e.currentTarget.style.color = "#7c3aed"); }}
              onMouseLeave={e => { (e.currentTarget.style.background = "#7c3aed"); (e.currentTarget.style.color = "white"); }}
            >Let&apos;s Work</a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(o => !o)}
            className="nav-hamburger"
            style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
              padding: "8px 10px", cursor: "pointer", display: "flex",
              flexDirection: "column", gap: "5px", borderRadius: "3px",
              transition: "border-color 0.2s",
            }}
            aria-label="Toggle menu"
          >
            <span style={{ display: "block", width: "22px", height: "2px", background: open ? "#a855f7" : "rgba(255,255,255,0.8)", borderRadius: "2px", transition: "all 0.3s", transform: open ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ display: "block", width: "22px", height: "2px", background: open ? "#a855f7" : "rgba(255,255,255,0.8)", borderRadius: "2px", transition: "all 0.3s", opacity: open ? 0 : 1 }} />
            <span style={{ display: "block", width: "22px", height: "2px", background: open ? "#a855f7" : "rgba(255,255,255,0.8)", borderRadius: "2px", transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9998,
        background: "rgba(5,2,15,0.97)",
        backdropFilter: "blur(20px)",
        display: "flex", flexDirection: "column",
        paddingTop: "88px", paddingBottom: "40px",
        paddingLeft: "28px", paddingRight: "28px",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        overflowY: "auto",
      }}>
        {/* Nav links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "40px" }}>
          {links.map(([label, href], i) => (
            <Link key={label} href={href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-display)", fontWeight: 800,
                fontSize: "clamp(32px,8vw,48px)", letterSpacing: "-0.02em",
                textTransform: "uppercase", textDecoration: "none",
                color: "rgba(255,255,255,0.15)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                padding: "16px 0",
                transition: "color 0.2s",
                transform: open ? "translateX(0)" : "translateX(40px)",
                opacity: open ? 1 : 0,
                transitionDelay: `${i * 0.06}s`,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "white")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.15)")}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", color: "#a855f7", marginRight: "14px", verticalAlign: "middle" }}>0{i + 1}</span>
              {label}
            </Link>
          ))}
        </div>

        {/* Bottom contact strip */}
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4ead6a", animation: "blink 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.15em", color: "#4ead6a", textTransform: "uppercase" }}>Available for work</span>
          </div>
          <a href="#contact" onClick={() => setOpen(false)}
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase", background: "#7c3aed", color: "white", padding: "16px 28px", textDecoration: "none", textAlign: "center", boxShadow: "0 0 32px rgba(124,58,237,0.4)" }}
          >Let&apos;s Work Together →</a>
          <a href="https://github.com/Levikib" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", textDecoration: "none", textAlign: "center", padding: "12px" }}
          >GitHub ↗</a>
        </div>
      </div>

      <style>{`
        .nav-desktop-links { display: flex; }
        .nav-desktop-right  { display: flex; }
        .nav-hamburger      { display: none; }

        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-desktop-right  { display: none !important; }
          .nav-hamburger      { display: flex !important; }
        }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </>
  );
}
