"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Home",     href: "/" },
  { label: "Work",     href: "/work" },
  { label: "Store",    href: "/store" },
  { label: "Thoughts", href: "/blog" },
  { label: "About",    href: "/about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname = usePathname();

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
        padding: "0 28px",
        background: scrolled ? "rgba(6,4,10,0.92)" : "rgba(6,4,10,0.7)",
        backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
        borderBottom: `1px solid ${scrolled ? "rgba(168,85,247,0.18)" : "rgba(168,85,247,0.08)"}`,
        boxShadow: scrolled ? "0 1px 40px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(168,85,247,0.1)" : "none",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* Rainbow thread */}
        <div style={{
          position:"absolute", top:0, left:0, right:0, height:"1.5px",
          background:"linear-gradient(90deg, transparent 0%, #7c3aed 25%, #a855f7 45%, #4ead6a 65%, #d97706 82%, transparent 100%)",
          opacity: scrolled ? 0.9 : 0.4,
          transition:"opacity 0.4s",
        }}/>

        {/* Logo */}
        <Link href="/" onClick={() => setOpen(false)}
          style={{ textDecoration:"none", flexShrink:0, marginRight:"auto" }}>
          <span style={{
            fontFamily:"var(--font-display)", fontWeight:800,
            fontSize:"18px", letterSpacing:"-0.02em", color:"white",
          }}>
            LK<span style={{ color:"#a855f7", textShadow:"0 0 12px rgba(168,85,247,0.8)" }}>.</span>
          </span>
        </Link>

        {/* Desktop links — centered absolutely */}
        <div className="nav-links" style={{
          position:"absolute", left:"50%", transform:"translateX(-50%)",
          display:"flex", alignItems:"center",
        }}>
          {LINKS.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link key={label} href={href}
                style={{
                  fontFamily:"var(--font-mono)", fontSize:"10px",
                  letterSpacing:"0.18em", textTransform:"uppercase",
                  textDecoration:"none", padding:"6px 14px",
                  color: active ? "white" : "rgba(255,255,255,0.42)",
                  position:"relative", transition:"color 0.2s",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:"3px",
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.85)"; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.42)"; }}
              >
                {label}
                <span style={{
                  height:"1px",
                  width: active ? "100%" : "0",
                  background:"linear-gradient(90deg, transparent, #a855f7, transparent)",
                  boxShadow:"0 0 6px #a855f7",
                  transition:"width 0.3s cubic-bezier(0.16,1,0.3,1)",
                  borderRadius:"1px",
                }}/>
              </Link>
            );
          })}
        </div>

        {/* Right — desktop only */}
        <div className="nav-right" style={{ display:"flex", alignItems:"center", gap:"14px", marginLeft:"auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
            <span style={{
              width:"5px", height:"5px", borderRadius:"50%",
              background:"#4ead6a", boxShadow:"0 0 6px #4ead6a",
              animation:"navBlink 2.5s ease-in-out infinite", flexShrink:0,
            }}/>
            <span style={{
              fontFamily:"var(--font-mono)", fontSize:"9px",
              letterSpacing:"0.14em", color:"rgba(78,173,106,0.8)",
              textTransform:"uppercase",
            }}>Available</span>
          </div>

          <a href="#contact"
            style={{
              fontFamily:"var(--font-mono)", fontSize:"10px",
              letterSpacing:"0.14em", textTransform:"uppercase",
              textDecoration:"none", color:"white",
              padding:"7px 16px",
              border:"1px solid rgba(168,85,247,0.45)",
              background:"rgba(124,58,237,0.12)",
              transition:"all 0.25s",
              whiteSpace:"nowrap",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background="rgba(124,58,237,0.85)";
              el.style.borderColor="#a855f7";
              el.style.boxShadow="0 0 18px rgba(168,85,247,0.35)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background="rgba(124,58,237,0.12)";
              el.style.borderColor="rgba(168,85,247,0.45)";
              el.style.boxShadow="none";
            }}
          >Let&apos;s Work</a>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="nav-burger"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          style={{
            background:"transparent", border:"none",
            cursor:"pointer", marginLeft:"auto",
            padding:"8px 4px",
            display:"none", flexDirection:"column", gap:"5px",
          }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display:"block",
              width: i === 1 ? (open ? "22px" : "13px") : "22px",
              height:"1.5px",
              background: open ? "#a855f7" : "rgba(255,255,255,0.65)",
              borderRadius:"1px",
              transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)",
              transform: open
                ? i===0 ? "rotate(45deg) translate(4.5px, 4.5px)"
                : i===2 ? "rotate(-45deg) translate(4.5px,-4.5px)"
                : "none"
                : "none",
              opacity: open && i===1 ? 0 : 1,
              boxShadow: open ? "0 0 8px rgba(168,85,247,0.8)" : "none",
            }}/>
          ))}
        </button>
      </nav>

      {/* ─── MOBILE OVERLAY ─── */}
      <div style={{
        position:"fixed", inset:0, zIndex:9980,
        background:"rgba(4,2,10,0.97)",
        backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
        display:"flex", flexDirection:"column",
        padding:"72px 28px 36px",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition:"transform 0.42s cubic-bezier(0.16,1,0.3,1)",
        overflowY:"auto",
      }}>
        <nav style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center" }}>
          {LINKS.map(({ label, href }, i) => (
            <Link key={label} href={href}
              onClick={() => setOpen(false)}
              style={{
                display:"flex", alignItems:"baseline", gap:"14px",
                textDecoration:"none", padding:"16px 0",
                borderBottom:"1px solid rgba(255,255,255,0.04)",
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(32px)",
                transition:`opacity 0.4s ${i*0.065}s ease, transform 0.4s ${i*0.065}s cubic-bezier(0.16,1,0.3,1)`,
              }}
            >
              <span style={{
                fontFamily:"var(--font-mono)", fontSize:"10px",
                letterSpacing:"0.2em", color:"rgba(168,85,247,0.5)",
                flexShrink:0,
              }}>0{i+1}</span>
              <span
                style={{
                  fontFamily:"var(--font-display)", fontWeight:800,
                  fontSize:"clamp(26px,7.5vw,42px)", letterSpacing:"-0.02em",
                  textTransform:"uppercase", color:"rgba(255,255,255,0.1)",
                  transition:"color 0.2s", lineHeight:1.1,
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.88)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.1)"}
              >{label}</span>
            </Link>
          ))}
        </nav>

        <div style={{
          paddingTop:"28px", display:"flex", flexDirection:"column", gap:"10px",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(16px)",
          transition:"all 0.4s 0.32s ease",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:"7px" }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#4ead6a", boxShadow:"0 0 6px #4ead6a", animation:"navBlink 2.5s ease-in-out infinite" }}/>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.16em", color:"rgba(78,173,106,0.75)", textTransform:"uppercase" }}>Open to remote work</span>
          </div>
          <a href="#contact" onClick={() => setOpen(false)}
            style={{
              fontFamily:"var(--font-mono)", fontSize:"10px",
              letterSpacing:"0.2em", textTransform:"uppercase",
              textDecoration:"none", textAlign:"center", color:"white",
              padding:"15px",
              background:"linear-gradient(135deg, #6d28d9, #a855f7)",
              boxShadow:"0 8px 28px rgba(124,58,237,0.35)",
            }}
          >Let&apos;s Work Together →</a>
          <a href="https://github.com/Levikib" target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily:"var(--font-mono)", fontSize:"9px",
              letterSpacing:"0.2em", textTransform:"uppercase",
              color:"rgba(255,255,255,0.2)", textDecoration:"none",
              textAlign:"center", padding:"10px",
            }}
          >github ↗</a>
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
          0%,100% { opacity:1; box-shadow:0 0 6px #4ead6a; }
          50%      { opacity:0.2; box-shadow:none; }
        }
      `}</style>
    </>
  );
}
