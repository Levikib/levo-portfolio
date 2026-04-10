"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Home",     href: "/",       accent: "#a855f7" },
  { label: "Work",     href: "/work",   accent: "#4ead6a" },
  { label: "Store",    href: "/store",  accent: "#d97706" },
  { label: "Thoughts", href: "/blog",   accent: "#e11d48" },
  { label: "About",    href: "/about",  accent: "#0891b2" },
];

// Animated grid background for overlay
function GridBackground() {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none",
    }}>
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(168,85,247,0.15) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}/>
      {/* Diagonal scan lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(168,85,247,0.02) 40px, rgba(168,85,247,0.02) 41px)",
      }}/>
      {/* Radial purple glow — top right */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%",
        width: "60vw", height: "60vw",
        background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%)",
        filter: "blur(40px)",
      }}/>
      {/* Green glow — bottom left */}
      <div style={{
        position: "absolute", bottom: "-10%", left: "-10%",
        width: "50vw", height: "50vw",
        background: "radial-gradient(circle, rgba(78,173,106,0.1) 0%, transparent 65%)",
        filter: "blur(50px)",
      }}/>
      {/* Animated beam */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)",
        animation: "navBeam 4s ease-in-out infinite",
        top: "30%",
      }}/>
      {/* Corner accent — top left */}
      <div style={{
        position: "absolute", top: 52, left: 0,
        width: "1px", height: "120px",
        background: "linear-gradient(to bottom, #a855f7, transparent)",
        opacity: 0.4,
      }}/>
      <div style={{
        position: "absolute", top: 52, left: 0,
        height: "1px", width: "120px",
        background: "linear-gradient(to right, #a855f7, transparent)",
        opacity: 0.4,
      }}/>
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [hovered, setHovered]   = useState<string | null>(null);
  const pathname = usePathname();

  // Auto-close menu on route change
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
      {/* ─── NAV BAR ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9990,
        height: "52px",
        display: "flex", alignItems: "center",
        padding: "0 20px",
        background: scrolled ? "rgba(6,4,10,0.95)" : "rgba(6,4,10,0.75)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.08)"}`,
        boxShadow: scrolled ? "0 2px 40px rgba(0,0,0,0.7)" : "none",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* Rainbow thread */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1.5px",
          background: "linear-gradient(90deg, transparent 0%, #7c3aed 25%, #a855f7 45%, #4ead6a 65%, #d97706 82%, transparent 100%)",
          opacity: scrolled ? 1 : 0.5,
          transition: "opacity 0.4s",
        }}/>

        {/* Logo */}
        <Link href="/" onClick={() => setOpen(false)}
          style={{ textDecoration: "none", flexShrink: 0, marginRight: "auto" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "18px", letterSpacing: "-0.02em", color: "white" }}>
            LK<span style={{ color: "#a855f7", textShadow: "0 0 12px rgba(168,85,247,0.9)" }}>.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="nav-links" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center" }}>
          {LINKS.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link key={label} href={href}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: "10px",
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  textDecoration: "none", padding: "6px 14px",
                  color: active ? "white" : "rgba(255,255,255,0.42)",
                  position: "relative", transition: "color 0.2s",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)"; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.42)"; }}
              >
                {label}
                <span style={{
                  height: "1px", borderRadius: "1px",
                  width: active ? "100%" : "0",
                  background: "linear-gradient(90deg, transparent, #a855f7, transparent)",
                  boxShadow: "0 0 6px #a855f7",
                  transition: "width 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}/>
              </Link>
            );
          })}
        </div>

        {/* Desktop right */}
        <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: "14px", marginLeft: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ead6a", boxShadow: "0 0 6px #4ead6a", animation: "navBlink 2.5s ease-in-out infinite" }}/>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", color: "rgba(78,173,106,0.8)", textTransform: "uppercase" }}>Available</span>
          </div>
          <a href="#contact"
            style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", color: "white", padding: "7px 16px", border: "1px solid rgba(168,85,247,0.45)", background: "rgba(124,58,237,0.12)", transition: "all 0.25s", whiteSpace: "nowrap" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(124,58,237,0.85)"; el.style.borderColor = "#a855f7"; el.style.boxShadow = "0 0 18px rgba(168,85,247,0.35)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(124,58,237,0.12)"; el.style.borderColor = "rgba(168,85,247,0.45)"; el.style.boxShadow = "none"; }}
          >Let&apos;s Work</a>
        </div>

        {/* Hamburger */}
        <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Menu"
          style={{ background: "transparent", border: "none", cursor: "pointer", marginLeft: "auto", padding: "8px 4px", display: "none", flexDirection: "column", gap: "5px", position: "relative", zIndex: 9991 }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block",
              width: i === 1 ? (open ? "22px" : "13px") : "22px",
              height: "1.5px",
              background: open ? "#a855f7" : "rgba(255,255,255,0.7)",
              borderRadius: "1px",
              transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              transform: open ? (i === 0 ? "rotate(45deg) translate(4.5px,4.5px)" : i === 2 ? "rotate(-45deg) translate(4.5px,-4.5px)" : "none") : "none",
              opacity: open && i === 1 ? 0 : 1,
              boxShadow: open ? "0 0 8px rgba(168,85,247,0.9)" : "none",
            }}/>
          ))}
        </button>
      </nav>

      {/* ─── MOBILE OVERLAY ─── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9985,
        background: "rgba(4,2,10,0.97)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        display: "flex", flexDirection: "column",
        transform: open ? "translateY(0)" : "translateY(-100%)",
        pointerEvents: open ? "auto" : "none",
        visibility: open ? "visible" : "hidden",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        overflowY: "auto",
      }}>
        {/* Subtle grid pattern */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(168,85,247,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}/>
        {/* Corner glow */}
        <div style={{
          position: "absolute", bottom: "-10%", right: "-10%", zIndex: 0, pointerEvents: "none",
          width: "50vw", height: "50vw",
          background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}/>
        <div style={{
          position: "absolute", top: "20%", left: "-5%", zIndex: 0, pointerEvents: "none",
          width: "30vw", height: "30vw",
          background: "radial-gradient(circle, rgba(78,173,106,0.07) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}/>

        {/* Top bar */}
        <div style={{
          position: "relative", zIndex: 2,
          height: "52px", display: "flex", alignItems: "center",
          padding: "0 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "17px", letterSpacing: "-0.02em", color: "white" }}>
            LK<span style={{ color: "#a855f7", textShadow: "0 0 10px rgba(168,85,247,0.8)" }}>.</span>
          </span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ead6a", boxShadow: "0 0 6px #4ead6a", animation: "navBlink 2.5s ease-in-out infinite" }}/>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.16em", color: "rgba(78,173,106,0.7)", textTransform: "uppercase" }}>Available</span>
          </div>
        </div>

        {/* Nav links */}
        <nav style={{
          flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "8px 24px", position: "relative", zIndex: 2, gap: "2px",
        }}>
          {LINKS.map(({ label, href, accent }, i) => {
            const active = pathname === href;
            return (
              <Link key={label} href={href}
                style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  textDecoration: "none",
                  padding: "13px 14px",
                  borderRadius: "6px",
                  background: active ? `${accent}12` : "transparent",
                  border: `1px solid ${active ? accent + "30" : "transparent"}`,
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(-12px)",
                  transition: `opacity 0.35s ${i * 0.055}s ease, transform 0.35s ${i * 0.055}s cubic-bezier(0.16,1,0.3,1), background 0.2s`,
                }}
                onTouchStart={e => { (e.currentTarget as HTMLElement).style.background = `${accent}18`; }}
                onTouchEnd={e => {
                  const el = e.currentTarget as HTMLElement;
                  setTimeout(() => { el.style.background = active ? `${accent}12` : "transparent"; }, 180);
                }}
              >
                {/* Number badge */}
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "9px",
                  letterSpacing: "0.1em",
                  color: active ? accent : "rgba(255,255,255,0.18)",
                  flexShrink: 0, width: "20px",
                }}>0{i + 1}</span>

                {/* Divider */}
                <span style={{ width: "1px", height: "18px", background: active ? `${accent}50` : "rgba(255,255,255,0.07)", flexShrink: 0 }}/>

                {/* Label */}
                <span style={{
                  fontFamily: "var(--font-display)", fontWeight: 700,
                  fontSize: "15px", letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: active ? "white" : "rgba(255,255,255,0.55)",
                  flex: 1,
                  transition: "color 0.2s",
                }}>{label}</span>

                {/* Right indicator */}
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "10px",
                  color: active ? accent : "rgba(255,255,255,0.12)",
                  transition: "color 0.2s, transform 0.2s",
                  transform: active ? "translateX(0)" : "translateX(-4px)",
                }}>→</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom strip */}
        <div style={{
          position: "relative", zIndex: 2,
          padding: "16px 24px 32px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", flexDirection: "column", gap: "8px",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.35s 0.3s ease",
          flexShrink: 0,
        }}>
          <a href="#contact" onClick={() => setOpen(false)}
            style={{
              fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "10px",
              letterSpacing: "0.16em", textTransform: "uppercase",
              textDecoration: "none", textAlign: "center", color: "white",
              padding: "13px",
              background: "linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)",
              boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
              display: "block", borderRadius: "4px",
            }}
          >Let&apos;s Work Together →</a>

          <div style={{ display: "flex", gap: "6px" }}>
            <a href="https://github.com/Levikib" target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", textDecoration: "none", textAlign: "center", padding: "10px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "4px" }}
            >GitHub ↗</a>
            <a href="https://linkedin.com/in/levis-kibirie-6bba13344" target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", textDecoration: "none", textAlign: "center", padding: "10px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "4px" }}
            >LinkedIn ↗</a>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "4px", gap: "2px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "7px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em", textTransform: "uppercase" }}>📍</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "7px", color: "rgba(78,173,106,0.6)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Nairobi</span>
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

        @keyframes navBlink {
          0%,100% { opacity:1; }
          50%      { opacity:0.2; }
        }

        @keyframes navBeam {
          0%   { opacity:0; transform:translateY(-10px); }
          20%  { opacity:1; }
          80%  { opacity:1; }
          100% { opacity:0; transform:translateY(200px); }
        }

        @keyframes nudgeDrift {
          0%,100% { transform:translateX(0); }
          50%     { transform:translateX(5px); }
        }
      `}</style>
    </>
  );
}
