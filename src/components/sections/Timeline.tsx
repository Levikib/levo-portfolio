"use client";
import { useEffect, useRef, useState } from "react";

const events = [
  {
    year: "2016",
    title: "First Line of Code",
    sub: "Self-taught · Nairobi",
    desc: "Started with HTML/CSS during school. Built first website for a local business. Charged KSH 3,000. Never looked back.",
    color: "#4ead6a",
    icon: "⌨",
    side: "left",
  },
  {
    year: "2018",
    title: "ISC2 Certified in Cybersecurity",
    sub: "ISC2 CC · Ethical Hacking",
    desc: "Earned ISC2 CC and CEH certifications. Built first security tools. Discovered the intersection of systems thinking and attack surface design.",
    color: "#10b981",
    icon: "🔐",
    side: "right",
  },
  {
    year: "2020",
    title: "Freelance & Agency Years",
    sub: "Web Dev · Design · Strategy",
    desc: "Built websites, brand identities, and digital strategies for 30+ Kenyan businesses. Developed the designer's eye and the engineer's discipline — simultaneously.",
    color: "#a855f7",
    icon: "🎨",
    side: "left",
  },
  {
    year: "2022",
    title: "ShanTech Agency Founded",
    sub: "Digital Agency · Kenya",
    desc: "Founded ShanTech to scale the freelance operation. 12+ SME clients, GoHighLevel CRM systems, Meta Ads, 250K+ engagement views. First taste of building a business, not just products.",
    color: "#e11d48",
    icon: "🏢",
    side: "right",
  },
  {
    year: "2023",
    title: "Chill Minds Magazine",
    sub: "72 Pages · Print · 2 Volumes",
    desc: "Designed 72-page children's mental wellness magazine. Solo. Every page, every colour system, every typography decision. Proof that engineering precision applies to design too.",
    color: "#d97706",
    icon: "📖",
    side: "left",
  },
  {
    year: "2024",
    title: "Makeja Homes Launched",
    sub: "SaaS · Live · Production",
    desc: "Built a full multi-tenant property management SaaS from scratch. PostgreSQL schema, Paystack webhooks, automated billing, tenant portals. 247+ active tenants. KSH 1.5M/month. Real money. Real stakes.",
    color: "#7c3aed",
    icon: "🏗",
    side: "right",
    highlight: true,
  },
  {
    year: "2025",
    title: "GhostNet Launched",
    sub: "Cybersec Platform · AI · Live",
    desc: "Built a full-stack cybersecurity research and training platform. 13 modules, 243 lab steps, 5450 XP, 9 live hacking tools, real-time leaderboard, and GHOST AI powered by Groq llama-3.3-70b. Cinematic entry. Zero compromises.",
    color: "#10b981",
    icon: "👻",
    side: "left",
    highlight: true,
  },
  {
    year: "NOW",
    title: "Open. Building. Shipping.",
    sub: "Remote · Worldwide",
    desc: "NSE Research Agent in development. Open to senior remote engineering roles and SaaS collaborations that actually matter. Based in Nairobi. Available everywhere.",
    color: "#4ead6a",
    icon: "🌍",
    side: "right",
    now: true,
  },
];

function TimelineCard({ ev, index }: { ev: typeof events[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const isLeft = ev.side === "left";

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 48px 1fr",
        gap: "0",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ${index * 0.08}s cubic-bezier(0.16,1,0.3,1), transform 0.7s ${index * 0.08}s cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      {/* Left slot */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 24px 0 0" }}>
        {isLeft && <CardContent ev={ev} />}
      </div>

      {/* Center spine */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Node */}
        <div style={{
          width: "36px", height: "36px", borderRadius: "50%",
          background: ev.now ? `linear-gradient(135deg, ${ev.color}, ${ev.color}88)` : "var(--bg)",
          border: `2px solid ${ev.color}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "16px", flexShrink: 0, zIndex: 2, position: "relative",
          boxShadow: ev.highlight || ev.now ? `0 0 20px ${ev.color}50, 0 0 40px ${ev.color}20` : "none",
          animation: ev.now ? "blink 2.5s ease-in-out infinite" : "none",
        }}>
          {ev.icon}
        </div>
        {/* Line below */}
        {index < events.length - 1 && (
          <div style={{ flex: 1, width: "1px", background: `linear-gradient(to bottom, ${ev.color}60, ${events[index + 1].color}30)`, minHeight: "40px" }} />
        )}
      </div>

      {/* Right slot */}
      <div style={{ padding: "0 0 0 24px" }}>
        {!isLeft && <CardContent ev={ev} />}
      </div>
    </div>
  );
}

function CardContent({ ev }: { ev: typeof events[0] }) {
  return (
    <div style={{
      marginBottom: "40px", maxWidth: "360px",
      background: ev.highlight ? `${ev.color}06` : ev.now ? `${ev.color}08` : "transparent",
      border: ev.highlight || ev.now ? `1px solid ${ev.color}20` : "1px solid transparent",
      padding: ev.highlight || ev.now ? "18px 20px" : "0",
      transition: "all 0.3s",
    }}
    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${ev.color}40`; }}
    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = ev.highlight || ev.now ? `${ev.color}20` : "transparent"; }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", color: ev.color, fontWeight: 700 }}>
          {ev.year}
        </span>
        {ev.now && (
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: ev.color, animation: "blink 1.5s ease-in-out infinite", display: "inline-block" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: ev.color, letterSpacing: "0.15em", textTransform: "uppercase" }}>live</span>
          </span>
        )}
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(15px,1.8vw,18px)", color: "var(--text)", lineHeight: 1.2, marginBottom: "4px" }}>
        {ev.title}
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: ev.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
        {ev.sub}
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--text-3)", lineHeight: 1.75 }}>
        {ev.desc}
      </p>
    </div>
  );
}

export default function Timeline() {
  const ref = useRef<HTMLElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setHeaderVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "var(--bg-2)", padding: "80px clamp(16px,4vw,48px)" }}>
      {/* Subtle dot grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(124,58,237,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />

      <div className="relative z-10" style={{ maxWidth: "860px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          textAlign: "center", marginBottom: "64px",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--forest)", textTransform: "uppercase", marginBottom: "12px" }}>// The Journey</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,5vw,56px)", lineHeight: 1, letterSpacing: "-0.02em", color: "var(--text)" }}>
            8 Years.<br />
            <span style={{ color: "var(--purple)" }}>One Direction.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--text-3)", marginTop: "16px", maxWidth: "420px", margin: "16px auto 0", lineHeight: 1.8 }}>
            From HTML on a school computer to production SaaS with real money flowing through it.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {events.map((ev, i) => (
            <TimelineCard key={ev.year} ev={ev} index={i} />
          ))}
        </div>
      </div>

      {/* Mobile: single-column timeline */}
      <style>{`
        @media (max-width: 640px) {
          .timeline-grid {
            grid-template-columns: 32px 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
