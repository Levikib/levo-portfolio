"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [["Home", "/"], ["Work", "/work"], ["Store", "/store"], ["Thoughts", "/blog"], ["About", "/about"]];

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:9999,
      background:"rgba(10,8,5,0.98)",
      backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
      borderBottom:"1px solid rgba(124,58,237,0.3)",
      boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "0 2px 20px rgba(0,0,0,0.3)",
    }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:"linear-gradient(90deg, #7c3aed 0%, #a855f7 25%, #4ead6a 50%, #d97706 75%, #7c3aed 100%)" }} />
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 48px", height:"72px" }}>

        <Link href="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:"12px" }}>
          <span style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"24px", letterSpacing:"-0.02em", color:"white" }}>LK<span style={{ color:"#a855f7" }}>.</span></span>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(255,255,255,0.4)", textTransform:"uppercase", borderLeft:"1px solid rgba(255,255,255,0.15)", paddingLeft:"12px" }}>Nairobi → World</span>
        </Link>

        <div style={{ display:"flex", alignItems:"center", gap:"2px" }}>
          {links.map(([label, href]) => (
            <Link key={label} href={href}
              style={{ fontFamily:"var(--font-mono)", fontWeight:600, fontSize:"11px", letterSpacing:"0.18em", textTransform:"uppercase", textDecoration:"none", padding:"10px 16px", color:"rgba(255,255,255,0.82)", transition:"all 0.2s", borderRadius:"2px" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color="white"; (e.currentTarget as HTMLElement).style.background="rgba(124,58,237,0.18)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.82)"; (e.currentTarget as HTMLElement).style.background="transparent"; }}
            >{label}</Link>
          ))}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"7px", padding:"6px 14px", borderRadius:"999px", background:"rgba(77,173,106,0.12)", border:"1px solid rgba(77,173,106,0.3)" }}>
            <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#4ead6a", display:"block", animation:"blink 2s ease-in-out infinite" }} />
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.15em", color:"#4ead6a", textTransform:"uppercase", fontWeight:600 }}>Available</span>
          </div>
          <a href="https://github.com/Levikib" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(255,255,255,0.6)", textDecoration:"none", transition:"color 0.2s", fontWeight:600 }}
            onMouseEnter={e => (e.currentTarget.style.color="white")}
            onMouseLeave={e => (e.currentTarget.style.color="rgba(255,255,255,0.6)")}
          >GitHub</a>
          <a href="#contact"
            style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", background:"#7c3aed", color:"white", padding:"11px 26px", textDecoration:"none", transition:"all 0.25s", display:"block", boxShadow:"0 0 24px rgba(124,58,237,0.45)" }}
            onMouseEnter={e => { (e.currentTarget.style.background="white"); (e.currentTarget.style.color="#7c3aed"); }}
            onMouseLeave={e => { (e.currentTarget.style.background="#7c3aed"); (e.currentTarget.style.color="white"); }}
          >Let&apos;s Work</a>
        </div>
      </div>
    </nav>
  );
}
