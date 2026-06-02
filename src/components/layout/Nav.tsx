"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Home",     href: "/",      accent: "#0ea5e9" },
  { label: "Work",     href: "/work",  accent: "#a855f7" },
  { label: "Store",    href: "/store", accent: "#f59e0b" },
  { label: "Thoughts", href: "/blog",  accent: "#06b6d4" },
  { label: "About",    href: "/about", accent: "#0369a1" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── NAV BAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9990,
        height: "52px", display: "flex", alignItems: "center", padding: "0 24px",
        background: scrolled
          ? "rgba(240,248,255,0.88)"
          : "rgba(240,248,255,0.65)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderBottom: `1px solid ${scrolled ? "rgba(3,105,161,0.18)" : "rgba(3,105,161,0.08)"}`,
        boxShadow: scrolled
          ? "0 2px 32px rgba(3,105,161,0.08), 0 1px 0 rgba(255,255,255,0.8)"
          : "none",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* Water gradient top thread */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1.5px",
          background: "linear-gradient(90deg, transparent 0%, #0369a1 20%, #0ea5e9 45%, #06b6d4 65%, #7c3aed 82%, transparent 100%)",
          opacity: scrolled ? 0.8 : 0.35,
          transition: "opacity 0.4s",
        }}/>

        {/* Logo */}
        <Link href="/" onClick={() => setOpen(false)} style={{ textDecoration: "none", flexShrink: 0, marginRight: "auto" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "18px", letterSpacing: "-0.02em", color: "var(--text)" }}>
            LK<span style={{ color: "var(--ocean)", textShadow: "0 0 12px rgba(3,105,161,0.5)" }}>.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="nav-links" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center" }}>
          {LINKS.map(({ label, href, accent }) => {
            const active = pathname === href;
            return (
              <Link key={label} href={href} style={{
                fontFamily: "var(--font-mono)", fontSize: "10px",
                letterSpacing: "0.18em", textTransform: "uppercase",
                textDecoration: "none", padding: "6px 14px",
                color: active ? "var(--text)" : "var(--text-3)",
                position: "relative", transition: "color 0.2s",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
              >
                {label}
                <span style={{
                  height: "1.5px", borderRadius: "1px",
                  width: active ? "100%" : "0",
                  background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                  boxShadow: `0 0 6px ${accent}`,
                  transition: "width 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}/>
              </Link>
            );
          })}
        </div>

        {/* Desktop right */}
        <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: "14px", marginLeft: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e", animation: "navBlink 2.5s ease-in-out infinite" }}/>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", color: "rgba(34,197,94,0.8)", textTransform: "uppercase" }}>Available</span>
          </div>
          <a href="#contact" style={{
            fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.14em",
            textTransform: "uppercase", textDecoration: "none", color: "white",
            padding: "7px 16px",
            background: "linear-gradient(135deg, #0369a1, #0284c7)",
            border: "1px solid rgba(6,182,212,0.3)",
            boxShadow: "0 0 16px rgba(3,105,161,0.2)",
            transition: "all 0.25s", whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 0 28px rgba(3,105,161,0.4)"; el.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 0 16px rgba(3,105,161,0.2)"; el.style.transform = "translateY(0)"; }}
          >Let&apos;s Work</a>
        </div>

        {/* Hamburger */}
        <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Menu"
          style={{ background: "transparent", border: "none", cursor: "pointer", marginLeft: "auto", padding: "8px 4px", display: "none", flexDirection: "column", gap: "5px", zIndex: 9991, position: "relative" }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block",
              width: i === 1 ? (open ? "22px" : "13px") : "22px",
              height: "1.5px",
              background: open ? "var(--ocean)" : "var(--text-2)",
              borderRadius: "1px",
              transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              transform: open ? (i === 0 ? "rotate(45deg) translate(4.5px,4.5px)" : i === 2 ? "rotate(-45deg) translate(4.5px,-4.5px)" : "none") : "none",
              opacity: open && i === 1 ? 0 : 1,
              boxShadow: open ? "0 0 8px rgba(3,105,161,0.7)" : "none",
            }}/>
          ))}
        </button>
      </nav>

      {/* ── MOBILE OVERLAY ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9985,
        background: "rgba(240,248,255,0.97)",
        backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
        display: "flex", flexDirection: "column",
        transform: open ? "translateY(0)" : "translateY(-100%)",
        pointerEvents: open ? "auto" : "none",
        visibility: open ? "visible" : "hidden",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        overflowY: "auto",
      }}>
        {/* Subtle water pattern */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(3,105,161,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}/>
        {/* Ocean glow — bottom right */}
        <div style={{
          position: "absolute", bottom: "-10%", right: "-10%", zIndex: 0, pointerEvents: "none",
          width: "50vw", height: "50vw",
          background: "radial-gradient(circle, rgba(3,105,161,0.1) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}/>
        {/* Aqua glow — top left */}
        <div style={{
          position: "absolute", top: "10%", left: "-10%", zIndex: 0, pointerEvents: "none",
          width: "40vw", height: "40vw",
          background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}/>

        {/* Top bar */}
        <div style={{
          position: "relative", zIndex: 2,
          height: "52px", display: "flex", alignItems: "center",
          padding: "0 24px", borderBottom: "1px solid var(--border)", flexShrink: 0,
        }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "17px", letterSpacing: "-0.02em", color: "var(--text)" }}>
            LK<span style={{ color: "var(--ocean)", textShadow: "0 0 10px rgba(3,105,161,0.4)" }}>.</span>
          </span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e", animation: "navBlink 2.5s ease-in-out infinite" }}/>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.16em", color: "rgba(34,197,94,0.8)", textTransform: "uppercase" }}>Available</span>
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 24px", position: "relative", zIndex: 2, gap: "2px" }}>
          {LINKS.map(({ label, href, accent }, i) => {
            const active = pathname === href;
            return (
              <Link key={label} href={href} style={{
                display: "flex", alignItems: "center", gap: "14px",
                textDecoration: "none", padding: "13px 14px",
                background: active ? `${accent}0e` : "transparent",
                border: `1px solid ${active ? accent + "28" : "transparent"}`,
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(-12px)",
                transition: `opacity 0.35s ${i * 0.055}s ease, transform 0.35s ${i * 0.055}s cubic-bezier(0.16,1,0.3,1), background 0.2s`,
              }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", color: active ? accent : "var(--text-4)", flexShrink: 0, width: "20px" }}>0{i + 1}</span>
                <span style={{ width: "1px", height: "18px", background: active ? `${accent}50` : "var(--border)", flexShrink: 0 }}/>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", letterSpacing: "0.04em", textTransform: "uppercase", color: active ? "var(--text)" : "var(--text-3)", flex: 1, transition: "color 0.2s" }}>{label}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: active ? accent : "var(--text-4)", transform: active ? "translateX(0)" : "translateX(-4px)", transition: "color 0.2s, transform 0.2s" }}>→</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom strip */}
        <div style={{
          position: "relative", zIndex: 2,
          padding: "16px 24px 32px", borderTop: "1px solid var(--border)",
          display: "flex", flexDirection: "column", gap: "8px",
          opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.35s 0.3s ease", flexShrink: 0,
        }}>
          <a href="#contact" onClick={() => setOpen(false)} style={{
            fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "10px",
            letterSpacing: "0.16em", textTransform: "uppercase",
            textDecoration: "none", textAlign: "center", color: "white",
            padding: "13px", display: "block",
            background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
            boxShadow: "0 4px 20px rgba(3,105,161,0.3)",
          }}>Let&apos;s Work Together →</a>
          <div style={{ display: "flex", gap: "6px" }}>
            <a href="https://github.com/Levikib" target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-3)", textDecoration: "none", textAlign: "center", padding: "10px", border: "1px solid var(--border)" }}>GitHub ↗</a>
            <a href="https://linkedin.com/in/levis-kibirie-6bba13344" target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-3)", textDecoration: "none", textAlign: "center", padding: "10px", border: "1px solid var(--border)" }}>LinkedIn ↗</a>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px", border: "1px solid var(--border)", gap: "2px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "7px", color: "var(--text-4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>📍</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "7px", color: "var(--ocean)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Nairobi</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .nav-links, .nav-right { display: flex !important; }
        .nav-burger { display: none !important; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-right  { display: none !important; }
          .nav-burger { display: flex !important; }
        }
        @keyframes navBlink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes navBeam  { 0%{opacity:0;transform:translateY(-10px)} 20%{opacity:1} 80%{opacity:1} 100%{opacity:0;transform:translateY(200px)} }
      `}</style>
    </>
  );
}
