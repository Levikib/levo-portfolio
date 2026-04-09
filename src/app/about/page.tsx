"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ── PAGE DATA ─────────────────────────────────────────────────────────────────
const JOURNEY = [
  { year: "2017",       label: "Education",  accent: "#7c3aed", title: "Software Development Certificate", org: "ICT Authority Kenya",                  desc: "First formal grounding in software engineering. The start of everything." },
  { year: "2020",       label: "Education",  accent: "#0891b2", title: "Cybersecurity & Pen Testing",      org: "Zalego Institute of Technology",        desc: "Ethical hacking, penetration testing, security fundamentals. Built first security tools." },
  { year: "2020–2024",  label: "Education",  accent: "#0891b2", title: "BSc Information Technology",       org: "Kenyatta University · 2nd Upper Class", desc: "Full degree: software engineering, networks, databases, systems architecture." },
  { year: "Apr 2022",   label: "Work",       accent: "#059669", title: "IT Intern",                        org: "Ministry of Foreign & Diaspora Affairs", desc: "Government infrastructure, network management, and systems support." },
  { year: "May 2024",   label: "Founded",    accent: "#e11d48", title: "Founder — ShanTech Agency",        org: "Digital Agency · Kenya",                desc: "12+ SME clients, 250K+ engagement views. GoHighLevel, Meta Ads, full-stack delivery." },
  { year: "2024",       label: "Founded",    accent: "#7c3aed", title: "Founder — Makeja Homes",           org: "Production SaaS",                       desc: "Built a full multi-tenant property management SaaS. 247+ tenants, KSH 1.5M/month." },
  { year: "2025",       label: "Cert",       accent: "#d97706", title: "Oracle Cloud AI Foundations",      org: "Oracle",                                desc: "Validated cloud and AI fundamentals with an internationally recognised Oracle certification." },
  { year: "2025",       label: "Built",      accent: "#10b981", title: "Launched GhostNet",                org: "Live Cybersec Platform",                desc: "13 modules, 243 lab steps, 5450 XP, 9 live tools, GHOST AI. Built solo from scratch." },
  { year: "2026",       label: "Building",   accent: "#a855f7", title: "NSE Research Agent",               org: "In Development",                        desc: "AI-powered market intelligence for the Nairobi Securities Exchange." },
];

const STACK = [
  { cat: "Frontend",       accent: "#7c3aed", items: ["TypeScript", "Next.js 14", "React", "Tailwind CSS", "GSAP"] },
  { cat: "Backend",        accent: "#0891b2", items: ["Node.js", "Prisma ORM", "PostgreSQL", "REST APIs", "Supabase"] },
  { cat: "AI & Data",      accent: "#a855f7", items: ["Groq llama-3.3-70b", "Python", "LLM APIs", "LangChain"] },
  { cat: "Payments",       accent: "#e11d48", items: ["Paystack", "M-Pesa Daraja", "Webhooks", "Resend"] },
  { cat: "Infrastructure", accent: "#d97706", items: ["VPS / Nginx", "Vercel", "Docker", "GitHub Actions"] },
  { cat: "Security",       accent: "#10b981", items: ["OWASP", "Pen Testing", "Auth Hardening", "Webhook Security"] },
  { cat: "Design",         accent: "#059669", items: ["Figma", "InDesign", "Typography Systems", "Brand Identity"] },
];

const BEYOND = [
  { icon: "🎌", title: "Anime",          body: "FMA, Attack on Titan, Vinland Saga. The philosophy in these is real — don't argue." },
  { icon: "📈", title: "Markets",        body: "NSE investor building the tool I always wished existed." },
  { icon: "📖", title: "Editorial",      body: "Designed Chill Minds Magazine — 72 pages, solo. Printed, distributed, real." },
  { icon: "🌍", title: "Nairobi → World", body: "Proving that world-class products ship from anywhere." },
];

const STATS = [
  { val: "247+",   label: "Active Tenants",   accent: "#7c3aed" },
  { val: "KSH 1.5M", label: "Monthly Volume", accent: "#4ead6a" },
  { val: "13",     label: "GhostNet Modules",  accent: "#10b981" },
  { val: "8+",     label: "Years in Tech",     accent: "#d97706" },
  { val: "2",      label: "SaaS Built Solo",   accent: "#a855f7" },
];

const LABEL_COLORS: Record<string, string> = {
  Education: "#0891b2", Work: "#059669", Founded: "#7c3aed",
  Cert: "#d97706", Built: "#10b981", Building: "#a855f7",
};

export default function About() {
  const [filter, setFilter] = useState<string | null>(null);
  const filtered = filter ? JOURNEY.filter(j => j.label === filter) : JOURNEY;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="about-hero-grid" style={{ display: "grid" }}>

          {/* Left: text */}
          <div style={{ padding: "clamp(96px,12vw,140px) clamp(20px,4vw,48px) clamp(40px,5vw,72px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--purple)", textTransform: "uppercase", marginBottom: "20px" }}>// Who I Am</div>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(52px,6vw,84px)", lineHeight: 0.9, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: "28px" }}>
                Levis.<br /><span style={{ color: "var(--purple)" }}>Kibirie.</span>
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--text-3)", lineHeight: 1.9, maxWidth: "400px", marginBottom: "14px" }}>
                Founding Fullstack Engineer from Nairobi, Kenya. I build production systems that handle real money and real users — then I make them look good.
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--text-3)", lineHeight: 1.9, maxWidth: "400px", marginBottom: "36px" }}>
                Built Makeja Homes (247+ tenants, KSH 1.5M/mo) and GhostNet (cybersec platform with AI) — both live, both solo.
              </p>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a href="/work" className="btn-primary">See My Work →</a>
                <a href="/#contact" className="btn-secondary">Let&apos;s Talk</a>
              </div>
            </div>

            {/* Quick facts strip */}
            <div style={{ display: "flex", flexWrap: "wrap", borderTop: "1px solid var(--border)", marginTop: "40px" }}>
              {[{ l: "Based in", v: "Nairobi, KE" }, { l: "Available", v: "Remotely" }, { l: "Response", v: "< 24 hrs" }].map((f, i) => (
                <div key={f.l} style={{ flex: "1 1 120px", padding: "18px 20px", borderRight: i < 2 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--text-4)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>{f.l}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "14px", color: "var(--text)" }}>{f.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: photo + ambient */}
          <div style={{ background: "#0a0805", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "420px" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(124,58,237,0.08) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "360px", height: "360px", background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-40px", left: "10%", width: "260px", height: "260px", background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />

            <div style={{ position: "relative", zIndex: 2 }}>
              {/* Photo */}
              <div style={{ width: "220px", height: "280px", borderRadius: "40% 60% 55% 45% / 45% 40% 60% 55%", overflow: "hidden", border: "2px solid rgba(124,58,237,0.3)", boxShadow: "0 0 40px rgba(124,58,237,0.2)" }}>
                <Image src="/levo.jpg" alt="Levis Kibirie — Fullstack Engineer" width={220} height={280} priority style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", filter: "saturate(1.05)" }} />
              </div>
              {/* Floating badge */}
              <div style={{ position: "absolute", bottom: "-16px", left: "-28px", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "10px", padding: "10px 14px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "18px", color: "var(--purple)", lineHeight: 1 }}>2 SaaS</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--text-4)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "2px" }}>Live in prod</div>
              </div>
              <div style={{ position: "absolute", top: "-16px", right: "-28px", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "10px", padding: "10px 14px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "18px", color: "#059669", lineHeight: 1 }}>8+ yrs</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--text-4)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "2px" }}>In tech</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS ────────────────────────────────────────────────────────────── */}
      <div style={{ background: "#0a0805", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="about-stats-grid" style={{ display: "grid" }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ padding: "32px 24px", textAlign: "center", position: "relative", borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${s.accent}, transparent)` }} />
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(22px,2.5vw,36px)", color: s.accent, lineHeight: 1, marginBottom: "6px" }}>{s.val}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── JOURNEY TIMELINE ─────────────────────────────────────────────────── */}
      <div style={{ background: "var(--bg)", padding: "72px clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth: "840px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--purple)", textTransform: "uppercase", marginBottom: "10px" }}>// Journey</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1 }}>How I Got Here.</h2>
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {[null, "Education", "Work", "Founded", "Built"].map(f => (
                <button key={String(f)} onClick={() => setFilter(f)}
                  style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 12px", background: filter === f ? "var(--text)" : "transparent", border: `1px solid ${filter === f ? "var(--text)" : "var(--border)"}`, color: filter === f ? "white" : "var(--text-3)", cursor: "pointer", transition: "all 0.2s" }}>
                  {f ?? "All"}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "96px", top: 0, bottom: 0, width: "1px", background: "var(--border)" }} />
            {filtered.map((item, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr", position: "relative" }}>
                <div style={{ paddingTop: "30px", paddingRight: "16px", textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: item.accent, letterSpacing: "0.06em", lineHeight: 1.4 }}>{item.year}</div>
                </div>
                <div style={{ padding: "24px 0 24px 32px", borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none", position: "relative" }}>
                  <div style={{ position: "absolute", left: "-4.5px", top: "32px", width: "9px", height: "9px", borderRadius: "50%", background: item.accent, border: "2px solid var(--bg)", boxShadow: `0 0 0 1px ${item.accent}40` }} />
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: LABEL_COLORS[item.label] ?? item.accent, background: `${LABEL_COLORS[item.label] ?? item.accent}12`, border: `1px solid ${LABEL_COLORS[item.label] ?? item.accent}30`, padding: "2px 8px" }}>{item.label}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-4)" }}>{item.org}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "17px", color: "var(--text)", lineHeight: 1.2, marginBottom: "6px" }}>{item.title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-3)", lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TECH STACK ───────────────────────────────────────────────────────── */}
      <div style={{ background: "#0a0805", padding: "72px clamp(20px,4vw,48px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(124,58,237,0.6)", textTransform: "uppercase", marginBottom: "10px" }}>// Stack</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", letterSpacing: "-0.02em", color: "white", lineHeight: 1, marginBottom: "40px" }}>The Toolkit.</h2>
          <div className="about-stack-grid" style={{ display: "grid", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
            {STACK.map(cat => (
              <div key={cat.cat} style={{ background: "#0a0805", padding: "28px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,${cat.accent},transparent)` }} />
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: cat.accent, marginBottom: "14px", opacity: 0.8 }}>{cat.cat}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  {cat.items.map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: cat.accent, flexShrink: 0, opacity: 0.7 }} />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BEYOND THE CODE ──────────────────────────────────────────────────── */}
      <div style={{ background: "var(--bg-2)", padding: "72px clamp(20px,4vw,48px)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--forest)", textTransform: "uppercase", marginBottom: "10px" }}>// Beyond the Code</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1, marginBottom: "40px" }}>Who I Actually Am.</h2>
          <div className="about-beyond-grid" style={{ display: "grid", gap: "12px" }}>
            {BEYOND.map(b => (
              <div key={b.title} style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "28px 24px" }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{b.icon}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "16px", color: "var(--text)", marginBottom: "8px" }}>{b.title}</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-3)", lineHeight: 1.75 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <div style={{ background: "#05020f", padding: "72px clamp(20px,4vw,48px)", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(168,85,247,0.6)", textTransform: "uppercase", marginBottom: "16px" }}>// Open to Work</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,5vw,64px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: "white", marginBottom: "20px" }}>
          Let&apos;s build<br /><span style={{ color: "#a855f7" }}>something real.</span>
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: "460px", margin: "0 auto 36px" }}>
          Open to senior remote engineering roles, SaaS collaborations, and problems worth solving.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/#contact" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", background: "#7c3aed", color: "white", padding: "14px 32px", textDecoration: "none", transition: "all 0.2s", boxShadow: "0 0 24px rgba(124,58,237,0.3)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "white"; (e.currentTarget as HTMLElement).style.color = "#7c3aed"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#7c3aed"; (e.currentTarget as HTMLElement).style.color = "white"; }}>
            Get In Touch →
          </a>
          <a href="/work" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", background: "transparent", color: "rgba(255,255,255,0.5)", padding: "14px 32px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; }}>
            See My Work
          </a>
        </div>
      </div>

      <style>{`
        .about-hero-grid  { grid-template-columns: 1fr; }
        .about-stats-grid { grid-template-columns: repeat(2, 1fr); }
        .about-stack-grid { grid-template-columns: repeat(2, 1fr); }
        .about-beyond-grid { grid-template-columns: repeat(2, 1fr); }
        @media (min-width: 640px) {
          .about-stats-grid  { grid-template-columns: repeat(3, 1fr); }
          .about-stack-grid  { grid-template-columns: repeat(3, 1fr); }
          .about-beyond-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .about-hero-grid   { grid-template-columns: 1fr 1fr; }
          .about-stats-grid  { grid-template-columns: repeat(5, 1fr); }
          .about-stack-grid  { grid-template-columns: repeat(4, 1fr); }
          .about-beyond-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </div>
  );
}
