"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const pieces = [
  {
    title: "Chill Minds Vol. 1",
    type: "Editorial Design",
    year: "2024",
    desc: "36-page mental wellness magazine for children. Complete design ownership — concept, layout, colour theory, typography, illustration direction.",
    tags: ["Print", "Editorial", "Typography"],
    accent: "var(--rose)",
    accentRgb: "225,29,72",
    bg: "#fff5f7",
    emoji: "📖",
    stat: "36 pages",
  },
  {
    title: "Chill Minds Vol. 2",
    type: "Editorial Design",
    year: "2025",
    desc: "Second volume expanding the universe. New themes, deeper visual language, more vibrant compositions. Same commitment to children's wellbeing.",
    tags: ["Print", "Magazine", "Illustration"],
    accent: "var(--purple)",
    accentRgb: "124,58,237",
    bg: "#f5f3ff",
    emoji: "✨",
    stat: "36 pages",
  },
  {
    title: "Brand Identity Work",
    type: "Brand Design",
    year: "2024–2025",
    desc: "Logo systems, colour palettes, and visual identity for Kenyan SMEs through ShanTech Agency. Built brands that communicate before a word is read.",
    tags: ["Branding", "Logo", "Identity"],
    accent: "var(--amber)",
    accentRgb: "217,119,6",
    bg: "#fffbf0",
    emoji: "🎨",
    stat: "12+ clients",
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
      <div className="reveal flex justify-between items-end mb-12">
        <div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"var(--rose)", textTransform:"uppercase", marginBottom:"12px" }}>// Creative Work</div>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(32px,5vw,56px)", lineHeight:1, letterSpacing:"-0.02em", color:"var(--text)" }}>Design & Editorial</div>
        </div>
        <Link href="/store" style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"12px", letterSpacing:"0.08em", textTransform:"uppercase", border:"1.5px solid var(--border)", color:"var(--text-3)", padding:"10px 20px", textDecoration:"none" }}>View Store →</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {pieces.map((p) => (
          <div key={p.title} className="reveal group glass-card rounded-sm overflow-hidden">
            {/* Cover mockup */}
            <div style={{ height:"180px", background:p.bg, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:"52px", marginBottom:"8px" }}>{p.emoji}</div>
                <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"16px", color:p.accent }}>{p.title}</div>
              </div>
              <div style={{ position:"absolute", top:"12px", right:"12px", background:p.accent, color:"white", fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.1em", textTransform:"uppercase", padding:"4px 10px" }}>{p.year}</div>
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
          </div>
        ))}
      </div>
    </section>
  );
}
