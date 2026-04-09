"use client";
import { useEffect, useRef } from "react";

const principles = [
  {
    icon: "🏗",
    title: "I Build to Ship",
    color: "var(--purple)",
    colorRgb: "124,58,237",
    points: [
      "Production-first thinking from day one",
      "Every feature designed for real users",
      "Scalable architecture, not clever hacks",
      "Solo or team — same standard applies",
    ],
  },
  {
    icon: "🔐",
    title: "Security is Not an Afterthought",
    color: "var(--forest)",
    colorRgb: "45,122,69",
    points: [
      "Certified Ethical Hacker (CEH)",
      "GhostNet — built a live cybersec platform",
      "Secure-by-design API architecture",
      "Webhook verification, auth hardening",
    ],
  },
  {
    icon: "🌍",
    title: "Remote-Native by Design",
    color: "var(--amber)",
    colorRgb: "217,119,6",
    points: [
      "Async-first communication style",
      "Documented decisions, not just code",
      "Self-directed and deadline-driven",
      "Nairobi timezone — flexible overlap",
    ],
  },
  {
    icon: "🎨",
    title: "Design Sense Embedded",
    color: "var(--rose)",
    colorRgb: "225,29,72",
    points: [
      "Engineer who actually cares about UI",
      "Typography, spacing, visual hierarchy",
      "Designed 72-page magazines solo",
      "Products that feel as good as they work",
    ],
  },
];

export default function HowIWork() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add("visible"); }), { threshold: 0.08 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative px-8 md:px-12 py-24" style={{ background:"var(--bg-2)" }}>
      <div className="reveal mb-14">
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"var(--forest)", textTransform:"uppercase", marginBottom:"12px" }}>// Working Style</div>
        <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(32px,5vw,56px)", lineHeight:1, letterSpacing:"-0.02em", color:"var(--text)" }}>How I Work</div>
        <p style={{ fontFamily:"var(--font-body)", fontSize:"16px", color:"var(--text-3)", marginTop:"16px", maxWidth:"480px", lineHeight:1.8 }}>
          Four things that make me different from an engineer who just writes code and disappears.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {principles.map((p, i) => (
          <div key={p.title} className="reveal group relative overflow-hidden p-8"
            style={{ background:"var(--surface)", border:"1px solid var(--border)", transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow=`0 20px 60px rgba(${p.colorRgb},0.1)`; (e.currentTarget as HTMLElement).style.transform="translateY(-3px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow="none"; (e.currentTarget as HTMLElement).style.transform="translateY(0)"; }}
          >
            {/* Color left bar */}
            <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"3px", background:`linear-gradient(to bottom, ${p.color}, transparent)` }} />

            <div style={{ fontSize:"36px", marginBottom:"14px" }}>{p.icon}</div>
            <h3 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"20px", color:"var(--text)", marginBottom:"16px", lineHeight:1.2 }}>{p.title}</h3>

            <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
              {p.points.map(pt => (
                <div key={pt} style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
                  <span style={{ color:p.color, fontSize:"14px", marginTop:"2px", flexShrink:0 }}>→</span>
                  <span style={{ fontFamily:"var(--font-body)", fontSize:"13px", color:"var(--text-3)", lineHeight:1.7 }}>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
