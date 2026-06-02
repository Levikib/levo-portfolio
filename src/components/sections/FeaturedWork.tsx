"use client";
import { useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

// ── River Ribbon 3D ───────────────────────────────────────────────────────────
function RiverRibbon() {
  const { scene } = useGLTF("/models/river-ribbon.glb");
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.12;
    ref.current.position.y = Math.sin(t * 0.5) * 0.12;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
      <primitive ref={ref} object={scene} scale={1.6} position={[0, 0, 0]} />
    </Float>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    num: "01", id: "makeja",
    name: "Makeja Homes",
    tagline: "The SaaS that moves real money.",
    status: "live", statusLabel: "Live in Production",
    year: "2024–Present",
    accent: "#0369a1", accentRgb: "3,105,161",
    desc: "Multi-tenant residential property management SaaS — built solo from zero. Every payment flow, every automation, every line of architecture. The same system that now handles KSH 1.5M monthly through Paystack webhooks.",
    tags: ["TypeScript", "Next.js 14", "PostgreSQL", "Prisma ORM", "Paystack", "VPS/Nginx", "Resend"],
    metrics: [{ val: "247+", label: "Active Tenants" }, { val: "KSH 1.5M", label: "Monthly Volume" }, { val: "100%", label: "Uptime" }],
    github: null, live: "https://makejahomes.co.ke",
  },
  {
    num: "02", id: "ghostnet",
    name: "GhostNet",
    tagline: "Where cybersecurity meets cinematic experience.",
    status: "live", statusLabel: "Live in Production",
    year: "2025–Present",
    accent: "#06b6d4", accentRgb: "6,182,212",
    desc: "Full-stack cybersecurity research & training platform. 13 learning modules, 243 guided lab steps, a 5450 XP gamification economy, 9 live hacking tools, a real-time leaderboard, GHOST AI (Groq llama-3.3-70b), and a cinematic matrix-rain splash. Built alone.",
    tags: ["Next.js 14", "TypeScript", "Supabase", "Groq llama-3.3-70b", "Realtime DB", "GSAP", "Canvas API"],
    metrics: [{ val: "13", label: "Modules" }, { val: "243", label: "Lab Steps" }, { val: "9", label: "Live Tools" }],
    github: null, live: "https://ghostnet-pi.vercel.app",
  },
  {
    num: "03", id: "akili",
    name: "Akili Markets",
    tagline: "AI that reads the market so you don't have to.",
    status: "building", statusLabel: "In Development",
    year: "2026",
    accent: "#f59e0b", accentRgb: "245,158,11",
    desc: "Full-stack algorithmic trading intelligence system for Binance Futures and Nairobi Securities Exchange. FastAPI ingestion layer, real-time Binance + Deriv tick data, technical indicator engine, strategy management, backtesting suite, risk management, and a TypeScript dashboard. Paper trading live; live deployment on track.",
    tags: ["Python", "FastAPI", "TypeScript", "Binance API", "Deriv API", "Technical Analysis", "Algorithmic Trading"],
    metrics: [{ val: "Live", label: "Market Data" }, { val: "Binance", label: "Futures Feed" }, { val: "Q3 2026", label: "Launch" }],
    github: "https://github.com/Levikib/Akili_Markets", live: undefined,
  },
  {
    num: "04", id: "hookah",
    name: "Hookah Website",
    tagline: "3D immersive product experience.",
    status: "live", statusLabel: "Live",
    year: "2026",
    accent: "#7c3aed", accentRgb: "124,58,237",
    desc: "3D immersive hookah rental, booking, and flavour selection website. Built with Next.js, Three.js/React Three Fiber, and Supabase. Demonstrates production-grade 3D web delivery — the same stack powering this portfolio.",
    tags: ["Next.js", "TypeScript", "Three.js", "React Three Fiber", "Supabase", "Blender MCP"],
    metrics: [{ val: "3D", label: "Immersive UI" }, { val: "Live", label: "Vercel Deploy" }],
    github: "https://github.com/Levikib/hookah-website", live: "https://hookah-website-two.vercel.app",
  },
  {
    num: "05", id: "shantech",
    name: "ShanTech Agency",
    tagline: "Kenyan SMEs. Measurable results. Technology.",
    status: "completed", statusLabel: "Completed · 2024–2025",
    year: "2024–2025",
    accent: "#e11d48", accentRgb: "225,29,72",
    desc: "Full-service digital agency serving Kenyan SMEs. AI-powered CRM deployment, Meta Ads automation, social infrastructure, full-stack web delivery. 12+ clients, 250K+ engagement views, 3× lead volume increase across engagements.",
    tags: ["GoHighLevel", "Zapier", "Meta Ads API", "Automation", "CRM", "Full-stack"],
    metrics: [{ val: "12+", label: "Clients" }, { val: "250K+", label: "Engagements" }, { val: "3×", label: "Lead Volume" }],
    github: null, live: undefined,
  },
  {
    num: "06", id: "chillminds",
    name: "Chill Minds Magazine",
    tagline: "72 pages. Two volumes. Print design.",
    status: "published", statusLabel: "Vol. 1 & 2 Published",
    year: "2024–2025",
    accent: "#059669", accentRgb: "5,150,105",
    desc: "A beautifully designed kids mental wellness magazine. Two volumes — 36 pages each. Full design ownership: concept, layout, illustration direction, typography, and print production. Physically distributed.",
    tags: ["Print Design", "Editorial Design", "Typography", "InDesign", "Brand Identity"],
    metrics: [{ val: "2", label: "Volumes" }, { val: "72", label: "Total Pages" }],
    github: null, live: undefined,
  },
];

const STATUS_COLORS: Record<string, string> = {
  live:      "#22c55e",
  building:  "#f59e0b",
  completed: "#06b6d4",
  published: "#7c3aed",
};

export default function FeaturedWork() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add("visible"); }),
      { threshold: 0.06 }
    );
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="work" style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}>

      {/* Scene band — river flow */}
      <div style={{ background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)", padding: "80px clamp(24px,5vw,64px) 0", position: "relative" }}>
        {/* Subtle water ripple bg */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(3,105,161,0.018) 40px, rgba(3,105,161,0.018) 41px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "56px", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.2em", color: "var(--border-2)", textTransform: "uppercase" }}>Scene 03 — River Flow</span>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--ocean)", textTransform: "uppercase", marginBottom: "10px" }}>// What I Built</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,5vw,56px)", lineHeight: 1, letterSpacing: "-0.02em", color: "var(--text)" }}>
                The Work.
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--text-3)", marginTop: "12px", maxWidth: "420px", lineHeight: 1.7 }}>
                Different domains. Same engineer. Property SaaS, cybersec platform, trading AI, 3D web, agency, print.
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {/* 3D River Ribbon mini scene */}
              <div style={{ width: "80px", height: "80px", opacity: 0.85 }}>
                <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} style={{ background: "transparent" }} gl={{ alpha: true }}>
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[3, 4, 3]} intensity={1} color="#e0f2fe" />
                  <Suspense fallback={null}>
                    <RiverRibbon />
                  </Suspense>
                </Canvas>
              </div>
              <Link href="/work" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid var(--border-2)", color: "var(--ocean)", padding: "10px 20px", textDecoration: "none", transition: "all 0.2s", background: "transparent" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--ocean-pale)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; }}
              >View All →</Link>
            </div>
          </div>

          {/* Cards grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: "1px", background: "var(--border)", border: "1px solid var(--border)" }}>
            {PROJECTS.map((p) => (
              <div key={p.id} className="reveal" style={{ background: "var(--bg)", position: "relative", overflow: "hidden", transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `rgba(${p.accentRgb},0.03)`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg)"; }}
              >
                {/* Accent top bar */}
                <div style={{ height: "2px", background: `linear-gradient(90deg, rgb(${p.accentRgb}), transparent)` }} />

                <div style={{ padding: "28px" }}>
                  {/* Header row */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "56px", color: `rgba(${p.accentRgb},0.07)`, lineHeight: 1, userSelect: "none" }}>{p.num}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", paddingTop: "6px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: STATUS_COLORS[p.status], animation: p.status === "live" ? "blink 2s ease-in-out infinite" : "none", flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", color: STATUS_COLORS[p.status] }}>{p.statusLabel}</span>
                    </div>
                  </div>

                  {/* Title + tagline */}
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(18px,2.2vw,24px)", letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "4px", lineHeight: 1.1 }}>{p.name}</h3>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", color: `rgb(${p.accentRgb})`, textTransform: "uppercase", marginBottom: "14px", opacity: 0.85 }}>{p.tagline}</p>

                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-3)", lineHeight: 1.8, marginBottom: "16px" }}>{p.desc}</p>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "20px" }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", border: "1px solid var(--border)", color: "var(--text-4)", background: "transparent" }}>{t}</span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                    <div style={{ display: "flex", gap: "20px", marginBottom: "16px", flexWrap: "wrap" }}>
                      {p.metrics.map(m => (
                        <div key={m.label}>
                          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "20px", color: `rgb(${p.accentRgb})`, lineHeight: 1 }}>{m.val}</div>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.12em", color: "var(--text-4)", textTransform: "uppercase", marginTop: "2px" }}>{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Links */}
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", background: `rgb(${p.accentRgb})`, color: "white", padding: "7px 14px", textDecoration: "none", transition: "all 0.2s", whiteSpace: "nowrap" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                        >Live Site ↗</a>
                      )}
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", border: `1px solid rgba(${p.accentRgb},0.4)`, color: `rgb(${p.accentRgb})`, padding: "7px 14px", textDecoration: "none", transition: "all 0.2s", whiteSpace: "nowrap", background: "transparent" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `rgba(${p.accentRgb},0.08)`; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                        >GitHub ↗</a>
                      )}
                      <Link href="/work" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid var(--border)", color: "var(--text-4)", padding: "7px 14px", textDecoration: "none", transition: "all 0.2s", whiteSpace: "nowrap", background: "transparent" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `rgba(${p.accentRgb},0.3)`; (e.currentTarget as HTMLElement).style.color = `rgb(${p.accentRgb})`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-4)"; }}
                      >Deep Dive →</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ paddingTop: "48px", paddingBottom: "80px", textAlign: "center" }}>
            <Link href="/work" className="btn-primary">View Full Case Studies →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

useGLTF.preload("/models/river-ribbon.glb");
