"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const pieces = [
  {
    title: "Chill Minds Vol. 1A",
    type: "Editorial Design",
    year: "2024",
    desc: "36-page student mental health magazine. Complete design ownership: concept, layout, colour theory, typography, illustration direction.",
    tags: ["Print", "Editorial", "Typography"],
    accent: "var(--rose)",
    bg: "#fff5f7",
    cover: "/editorial/vol1/page-01.jpg",
    stat: "36 pages",
    href: "/editorial",
  },
  {
    title: "Chill Minds Vol. 1B",
    type: "Editorial Design",
    year: "2025",
    desc: "Second volume: self-esteem, relationships, and grief. New themes, deeper visual language, same commitment to student wellbeing.",
    tags: ["Print", "Magazine", "Illustration"],
    accent: "var(--purple)",
    bg: "#f5f3ff",
    cover: "/editorial/vol2/page-01.jpg",
    stat: "36 pages",
    href: "/editorial",
  },
  {
    title: "Brand Identity Work",
    type: "Brand Design",
    year: "2024–2025",
    desc: "Logo systems, colour palettes, and visual identity for Kenyan SMEs through ShanTech Agency. Built brands that communicate before a word is read.",
    tags: ["Branding", "Logo", "Identity"],
    accent: "var(--amber)",
    bg: "#fffbf0",
    cover: null,
    emoji: "🎨",
    stat: "12+ clients",
    href: "/work",
  },
];

export default function DesignWork() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add("visible"); }), { threshold: 0.08 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative px-8 md:px-12 py-24" style={{ background:"var(--bg)" }}>
      <div className="reveal flex justify-between items-end mb-12" style={{ flexWrap:"wrap", gap:"16px" }}>
        <div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"var(--rose)", textTransform:"uppercase", marginBottom:"12px" }}>// Creative Work</div>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(32px,5vw,56px)", lineHeight:1, letterSpacing:"-0.02em", color:"var(--text)" }}>Design & Editorial</div>
        </div>
        <Link href="/store" style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"12px", letterSpacing:"0.08em", textTransform:"uppercase", border:"1.5px solid var(--border)", color:"var(--text-3)", padding:"10px 20px", textDecoration:"none" }}>View Store →</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {pieces.map((p) => (
          <Link key={p.title} href={p.href} className="reveal group glass-card rounded-sm overflow-hidden" style={{ display:"block", textDecoration:"none" }}>
            {/* Cover */}
            <div style={{ height:"260px", background:p.bg, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
              {p.cover ? (
                <Image src={p.cover} alt={`${p.title} cover`} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit:"cover", objectPosition:"top center" }} />
              ) : (
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:"52px", marginBottom:"8px" }}>{p.emoji}</div>
                  <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"16px", color:p.accent }}>{p.title}</div>
                </div>
              )}
              <div style={{ position:"absolute", top:"12px", right:"12px", background:p.accent, color:"white", fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.1em", textTransform:"uppercase", padding:"4px 10px", zIndex:1 }}>{p.year}</div>
            </div>

            <div className="p-6">
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.15em", color:p.accent, textTransform:"uppercase", marginBottom:"8px" }}>{p.type}</div>
              <h3 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"18px", color:"var(--text)", marginBottom:"10px" }}>{p.title}</h3>
              <p style={{ fontFamily:"var(--font-body)", fontSize:"13px", color:"var(--text-3)", lineHeight:1.7, marginBottom:"14px" }}>{p.desc}</p>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                  {p.tags.map(t => <span key={t} className="pill">{t}</span>)}
                </div>
                <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"13px", color:p.accent }}>{p.stat}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
