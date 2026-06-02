"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import dynamic from "next/dynamic";

// ── Lazy-load the 3D ribbon scene so it never blocks SSR ──────────────────────
const RiverRibbonScene = dynamic(() => import("./RiverRibbonScene"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: "160px", background: "var(--abyss)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(6,182,212,0.4)", textTransform: "uppercase" }}>loading scene...</span>
    </div>
  ),
});

// ── PROJECT DATA ──────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    num: "01", id: "makeja",
    name: "Makeja Homes",
    tagline: "The SaaS that moves real money.",
    category: "Engineering",
    status: "live", statusLabel: "Live in Production",
    year: "2024–Present", type: "Multi-Tenant SaaS",
    accent: "#0369a1",
    desc: "Multi-tenant residential property management SaaS built solo from zero. Every payment flow, every automation, every line of architecture. Now handling 247+ active tenants and KSH 1.5M monthly through Paystack webhooks.",
    challenge: "How do you build a system landlords trust with their entire rental income — from zero, in 6 months?",
    solution: "Database-driven architecture with monthly_bills as single source of truth. Automated lease expiry, recurring charges, tenant unit-switching, and full email receipt pipeline via Resend.",
    tags: ["TypeScript", "Next.js 14", "PostgreSQL", "Prisma ORM", "Paystack", "VPS/Nginx", "Resend"],
    metrics: [
      { val: "247+", label: "Active Tenants" },
      { val: "KSH 1.5M", label: "Monthly Volume" },
      { val: "100%", label: "Uptime" },
      { val: "260", label: "Units Managed" },
    ],
    live: "https://makejahomes.co.ke",
    github: null,
  },
  {
    num: "02", id: "ghostnet",
    name: "GhostNet",
    tagline: "Where cybersecurity meets cinematic experience.",
    category: "Engineering",
    status: "live", statusLabel: "Live in Production",
    year: "2025–Present", type: "EdTech Platform",
    accent: "#06b6d4",
    desc: "Full-stack cybersecurity research & training platform. 13 learning modules, 243 guided lab steps, 5450 XP gamification economy, 9 live hacking tools, real-time leaderboard, GHOST AI (Groq llama-3.3-70b), and cinematic matrix-rain splash. Built alone.",
    challenge: "Cybersecurity education is either too academic or too shallow. How do you build something that feels like a game but trains you like a professional?",
    solution: "Supabase realtime for XP and leaderboard. Groq llama-3.3-70b powering GHOST AI. 9 browser-based live tools. Cinematic GSAP/canvas matrix welcome. Full gamification with badges and progress persistence.",
    tags: ["Next.js 14", "TypeScript", "Supabase", "Groq llama-3.3-70b", "Realtime DB", "GSAP", "Canvas API"],
    metrics: [
      { val: "13", label: "Modules" },
      { val: "243", label: "Lab Steps" },
      { val: "5450", label: "XP Economy" },
      { val: "9", label: "Live Tools" },
    ],
    live: "https://ghostnet-pi.vercel.app",
    github: null,
  },
  {
    num: "03", id: "akili",
    name: "Akili Markets",
    tagline: "AI that reads the market so you don't have to.",
    category: "AI & Data",
    status: "building", statusLabel: "In Development",
    year: "2026", type: "Algorithmic Trading System",
    accent: "#f59e0b",
    desc: "Full-stack algorithmic trading intelligence system connecting to Binance Futures and Deriv. FastAPI backend with real-time tick data ingestion, technical indicator engine, strategy management, backtesting suite, risk management module, and a TypeScript dashboard. Paper trading is live. Production deployment in Q3 2026.",
    challenge: "NSE and crypto data is fragmented, delayed, or locked behind expensive terminals. Retail traders in Kenya are flying blind.",
    solution: "Python/FastAPI ingestion layer feeding Binance Futures + Deriv live data. Technical indicator engine (10+ indicators). Strategy evaluation every 60s. TypeScript dashboard with real-time P&L. Async architecture with CORS for Vercel frontend.",
    tags: ["Python", "FastAPI", "TypeScript", "Binance API", "Deriv API", "Technical Analysis", "Algorithmic Trading", "Paper Trading"],
    metrics: [
      { val: "Live", label: "Market Data" },
      { val: "Binance", label: "Futures" },
      { val: "10+", label: "Indicators" },
      { val: "Q3 2026", label: "Launch" },
    ],
    live: null,
    github: "https://github.com/Levikib/Akili_Markets",
  },
  {
    num: "04", id: "hookah",
    name: "Hookah Website",
    tagline: "3D immersive product experience.",
    category: "Engineering",
    status: "live", statusLabel: "Live",
    year: "2026", type: "3D Web Experience",
    accent: "#7c3aed",
    desc: "3D immersive hookah rental, booking, and flavour selection website. Built with Next.js, Three.js/React Three Fiber, and Supabase. Demonstrates production-grade 3D web delivery — interactive product viewer, booking system, and flavour menu. Live on Vercel.",
    challenge: "How do you sell a premium sensory product — hookah — through a screen?",
    solution: "React Three Fiber for interactive 3D hookah model rotation and inspection. Supabase for real-time booking and inventory. Blender MCP for model optimization. Responsive from mobile up.",
    tags: ["Next.js", "TypeScript", "Three.js", "React Three Fiber", "Supabase", "Blender MCP", "Vercel"],
    metrics: [
      { val: "3D", label: "Interactive" },
      { val: "Live", label: "Booking" },
      { val: "Vercel", label: "Deploy" },
      { val: "53", label: "Commits" },
    ],
    live: "https://hookah-website-two.vercel.app",
    github: "https://github.com/Levikib/hookah-website",
  },
  {
    num: "05", id: "shantech",
    name: "ShanTech Agency",
    tagline: "Kenyan SMEs. Measurable results. Technology.",
    category: "Agency",
    status: "completed", statusLabel: "Completed · 2024–2025",
    year: "2024–2025", type: "Digital Agency",
    accent: "#e11d48",
    desc: "Full-service digital agency serving Kenyan SMEs. AI-powered CRM deployment via GoHighLevel, Meta Ads API automation, social infrastructure build-out, and full-stack web delivery. Every engagement was outcome-tracked.",
    challenge: "Most Kenyan SMEs have no digital presence, no CRM, and no funnel — but have real products and customers ready to buy.",
    solution: "GoHighLevel CRM deployment, Meta Ads API integration, automated follow-up sequences, and full web delivery. Measurable revenue impact — 3× lead volume, 35% traffic lift, 250K+ views across engagements.",
    tags: ["GoHighLevel", "Zapier", "Meta Ads API", "Automation", "CRM", "Full-stack Web", "Social Strategy"],
    metrics: [
      { val: "12+", label: "Clients" },
      { val: "250K+", label: "Engagement Views" },
      { val: "35%", label: "Traffic Lift" },
      { val: "3×", label: "Lead Volume" },
    ],
    live: null,
    github: null,
  },
  {
    num: "06", id: "chillminds",
    name: "Chill Minds Magazine",
    tagline: "72 pages. Two volumes. Kids mental wellness.",
    category: "Design",
    status: "published", statusLabel: "Vol. 1 & 2 Published",
    year: "2024–2025", type: "Editorial Design",
    accent: "#059669",
    desc: "A beautifully designed kids mental wellness magazine. Two volumes, 36 pages each. Complete design ownership: concept, layout, illustration direction, typography systems, and print production. Physically printed and distributed.",
    challenge: "Kids mental wellness content in Kenya is either non-existent or adult-framed. How do you make something a child actually wants to read?",
    solution: "Age-appropriate visual language, playful but structured typography, warm colour palettes. InDesign for full layout. Distributed to schools and partners.",
    tags: ["Print Design", "Editorial Design", "Typography", "InDesign", "Brand Identity", "Illustration Direction"],
    metrics: [
      { val: "2", label: "Volumes" },
      { val: "72", label: "Total Pages" },
      { val: "Printed", label: "& Distributed" },
    ],
    live: null,
    github: null,
  },
];

// ── CATEGORIES ────────────────────────────────────────────────────────────────
const CATS = ["All", "Engineering", "AI & Data", "Design", "Agency"];

// ── STATUS CONFIG ─────────────────────────────────────────────────────────────
const STATUS_CFG: Record<string, { color: string; pulse: boolean }> = {
  live:      { color: "#4ead6a", pulse: true },
  building:  { color: "#f59e0b", pulse: true },
  completed: { color: "#a855f7", pulse: false },
  published: { color: "#059669", pulse: false },
};

// ── VIZ COMPONENTS ────────────────────────────────────────────────────────────

function MakejaViz({ accent }: { accent: string }) {
  const payments = [340, 480, 520, 390, 610, 580, 720, 650, 810, 760, 920, 1050];
  const maxP = Math.max(...payments);
  return (
    <div style={{ padding: "clamp(16px,3vw,24px)", height: "100%", display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.2em", color: `${accent}99`, textTransform: "uppercase" }}>Dashboard · Live</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(18px,2.5vw,22px)", color: "white", lineHeight: 1, marginTop: "4px" }}>KSH 1,521,400</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#4ead6a", marginTop: "2px" }}>↑ 8.4% this month</div>
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          {[accent, "#4ead6a", "rgba(255,255,255,0.12)"].map((c, i) => (
            <div key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: c }} />
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "7px", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "6px" }}>Monthly (KSH &apos;000)</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "64px" }}>
          {payments.map((v, i) => (
            <div key={i} style={{
              flex: 1,
              height: `${(v / maxP) * 60}px`,
              background: i === payments.length - 1
                ? `linear-gradient(to top, ${accent}, ${accent}cc)`
                : `${accent}${Math.round(20 + (v / maxP) * 50).toString(16).padStart(2, "0")}`,
              borderRadius: "2px 2px 0 0",
              boxShadow: i === payments.length - 1 ? `0 0 10px ${accent}60` : "none",
            }} />
          ))}
        </div>
        <div style={{ display: "flex", marginTop: "3px" }}>
          {["J","F","M","A","M","J","J","A","S","O","N","D"].map(m => (
            <div key={m} style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: "6px", color: "rgba(255,255,255,0.18)" }}>{m}</div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: "6px", marginTop: "auto" }}>
        {[{ l: "Tenants", v: "247", c: accent }, { l: "Units", v: "260", c: "#4ead6a" }, { l: "Uptime", v: "100%", c: "rgba(255,255,255,0.4)" }].map(s => (
          <div key={s.l} style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: "3px", padding: "8px 6px", border: `1px solid ${s.c}20`, textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(14px,2vw,17px)", color: s.c, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "7px", color: "rgba(255,255,255,0.25)", marginTop: "2px" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GhostNetViz({ accent }: { accent: string }) {
  const [tick, setTick] = useState(0);
  const [xpFlash, setXpFlash] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setTick(n => n + 1);
      if (Math.random() > 0.6) { setXpFlash(true); setTimeout(() => setXpFlash(false), 400); }
    }, 1400);
    return () => clearInterval(t);
  }, []);
  const modules = [
    { name: "Recon & OSINT", xp: 450, done: true },
    { name: "Network Scanning", xp: 380, done: true },
    { name: "Web App Attacks", xp: 520, done: true },
    { name: "Exploitation", xp: 410, done: false },
    { name: "Privilege Escalation", xp: 390, done: false },
  ];
  const tools = ["Port Scanner","Hash Cracker","SQLi Tester","XSS Probe","Dir Buster","DNS Enum","Payload Gen","Log Analyser","GHOST AI"];
  return (
    <div style={{ padding: "clamp(16px,3vw,24px)", height: "100%", display: "flex", flexDirection: "column", gap: "12px", fontFamily: "var(--font-mono)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: "8px", letterSpacing: "0.2em", color: `${accent}80`, textTransform: "uppercase" }}>GhostNet · Active</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(16px,2.5vw,20px)", color: "white", lineHeight: 1, marginTop: "4px" }}>
            GHOST<span style={{ color: accent }}>_AI</span>
          </div>
          <div style={{ fontSize: "8px", color: xpFlash ? accent : "rgba(255,255,255,0.4)", transition: "color 0.2s", marginTop: "3px" }}>
            ▲ {xpFlash ? "+50 XP" : "5450 XP total"}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "7px", color: "rgba(255,255,255,0.2)", marginBottom: "4px" }}>LIVE TOOLS</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", justifyContent: "flex-end", maxWidth: "100px" }}>
            {tools.map((t, i) => (
              <div key={i} style={{ width: "9px", height: "9px", borderRadius: "1px", background: i === (tick % tools.length) ? accent : `${accent}30`, transition: "background 0.3s", boxShadow: i === (tick % tools.length) ? `0 0 6px ${accent}` : "none" }} title={t} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <div style={{ fontSize: "7px", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "5px" }}>MODULES · 13 total</div>
        {modules.map((m, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ width: "13px", height: "13px", borderRadius: "2px", background: m.done ? `${accent}30` : "rgba(255,255,255,0.04)", border: `1px solid ${m.done ? accent : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {m.done && <span style={{ fontSize: "8px", color: accent }}>✓</span>}
            </div>
            <span style={{ fontSize: "9px", color: m.done ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)", flex: 1, letterSpacing: "0.03em" }}>{m.name}</span>
            <span style={{ fontSize: "8px", color: m.done ? accent : "rgba(255,255,255,0.2)" }}>{m.xp} XP</span>
          </div>
        ))}
        <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.2)", marginTop: "4px", textAlign: "right" }}>+8 more...</div>
      </div>
      <div style={{ marginTop: "auto" }}>
        <div style={{ fontSize: "7px", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "5px" }}>LEADERBOARD</div>
        {[{ rank: 1, name: "gh0st_r00t", xp: 5450 }, { rank: 2, name: "void_runner", xp: 4820 }, { rank: 3, name: "n3t_phr34k", xp: 4210 }].map(r => (
          <div key={r.rank} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "5px 7px", background: r.rank === 1 ? `${accent}12` : "rgba(255,255,255,0.02)", borderRadius: "3px", marginBottom: "2px", border: `1px solid ${r.rank === 1 ? accent + "25" : "rgba(255,255,255,0.05)"}` }}>
            <span style={{ fontSize: "9px", color: accent, width: "14px" }}>#{r.rank}</span>
            <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)", flex: 1 }}>{r.name}</span>
            <span style={{ fontSize: "9px", color: r.rank === 1 ? accent : "rgba(255,255,255,0.35)" }}>{r.xp.toLocaleString()} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AkiliViz({ accent }: { accent: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [price, setPrice] = useState(142.5);
  useEffect(() => {
    const t = setInterval(() => setPrice(p => parseFloat((p + (Math.random() - 0.48) * 2).toFixed(2))), 1200);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.offsetWidth || 300;
    const H = 110;
    canvas.width = W; canvas.height = H;
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < 5; i++) {
      ctx.beginPath(); ctx.moveTo(0, (H / 5) * i + H / 10); ctx.lineTo(W, (H / 5) * i + H / 10);
      ctx.strokeStyle = "rgba(255,255,255,0.04)"; ctx.lineWidth = 1; ctx.stroke();
    }
    const candles = Array.from({ length: 16 }, (_, i) => {
      const o = 130 + Math.sin(i * 0.7) * 15 + Math.random() * 8;
      const c = o + (Math.random() - 0.45) * 12;
      return { o, c, h: Math.max(o, c) + Math.random() * 5, l: Math.min(o, c) - Math.random() * 5 };
    });
    const hi = Math.max(...candles.map(c => c.h)), lo = Math.min(...candles.map(c => c.l));
    const cW = W / candles.length, scale = H * 0.65 / (hi - lo), base = H * 0.82;
    const toY = (v: number) => base - (v - lo) * scale;
    candles.forEach((c, i) => {
      const x = i * cW + cW / 2, bull = c.c >= c.o, col = bull ? "#4ead6a" : "#e11d48";
      ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, toY(c.h)); ctx.lineTo(x, toY(c.l)); ctx.stroke();
      ctx.fillStyle = col; ctx.fillRect(x - cW * 0.28, toY(Math.max(c.o, c.c)), cW * 0.56, Math.max(2, Math.abs(toY(c.o) - toY(c.c))));
    });
  }, [price, accent]);
  return (
    <div style={{ padding: "clamp(16px,3vw,24px)", height: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.15em", color: `${accent}80`, textTransform: "uppercase" }}>Binance Futures · Live</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "3px" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(20px,3vw,26px)", color: "white" }}>{price.toFixed(2)}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#4ead6a" }}>+2.14%</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "3px" }}>
          {["1D","1W","1M"].map((t, i) => (
            <div key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "8px", padding: "2px 6px", background: i === 1 ? `${accent}25` : "transparent", border: `1px solid ${i === 1 ? accent + "50" : "rgba(255,255,255,0.08)"}`, color: i === 1 ? accent : "rgba(255,255,255,0.25)" }}>{t}</div>
          ))}
        </div>
      </div>
      <canvas ref={canvasRef} style={{ width: "100%", height: "110px", display: "block" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "5px" }}>
        {[{ n: "RSI", v: "58.4", s: "Neutral", c: accent }, { n: "MACD", v: "+1.23", s: "Bullish", c: "#4ead6a" }, { n: "Vol", v: "2.4M", s: "Above avg", c: "#a855f7" }].map(ind => (
          <div key={ind.n} style={{ background: "rgba(255,255,255,0.04)", borderRadius: "3px", padding: "7px 8px", border: `1px solid ${ind.c}20` }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "7px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>{ind.n}</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(12px,2vw,15px)", color: ind.c, marginTop: "2px" }}>{ind.v}</div>
          </div>
        ))}
      </div>
      <div style={{ background: `${accent}12`, border: `1px solid ${accent}25`, borderRadius: "3px", padding: "8px 12px", display: "flex", gap: "6px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: accent, flexShrink: 0 }}>AI →</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>Consolidating above support. Volume confirms accumulation. Watch resistance.</div>
      </div>
    </div>
  );
}

function HookahViz({ accent }: { accent: string }) {
  return (
    <div style={{ padding: "clamp(16px,3vw,24px)", height: "100%", display: "flex", flexDirection: "column", gap: "14px" }}>
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.2em", color: `${accent}80`, textTransform: "uppercase" }}>3D Experience · Live</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(18px,2.5vw,22px)", color: "white", marginTop: "4px" }}>Interactive 3D</div>
      </div>
      {/* Fake 3D viewport */}
      <div style={{ flex: 1, background: `linear-gradient(135deg, #0a0014 0%, #1a0033 50%, #0a0014 100%)`, borderRadius: "4px", border: `1px solid ${accent}30`, position: "relative", overflow: "hidden", minHeight: "100px" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "40px", height: "100px", background: `linear-gradient(to bottom, ${accent}80, ${accent}20)`, borderRadius: "20px 20px 4px 4px", position: "relative" }}>
            <div style={{ position: "absolute", top: "10px", left: "-10px", right: "-10px", height: "15px", background: `${accent}40`, borderRadius: "50%", filter: "blur(4px)" }} />
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "8px", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-mono)", fontSize: "7px", color: `${accent}80`, letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap" }}>drag to rotate</div>
        <div style={{ position: "absolute", top: "8px", right: "8px", background: `${accent}20`, border: `1px solid ${accent}40`, borderRadius: "2px", padding: "2px 6px", fontFamily: "var(--font-mono)", fontSize: "7px", color: accent }}>Three.js</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
        {[{ l: "R3F Model", v: "Live" }, { l: "Booking", v: "Active" }, { l: "Commits", v: "53" }, { l: "Platform", v: "Vercel" }].map(s => (
          <div key={s.l} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${accent}18`, borderRadius: "3px", padding: "7px 9px" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "13px", color: accent }}>{s.v}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "7px", color: "rgba(255,255,255,0.25)", marginTop: "1px" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShantechViz({ accent }: { accent: string }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const funnel = [
    { l: "Impressions", v: "250,000", pct: 100, c: accent },
    { l: "Clicks", v: "18,500", pct: 42, c: "#a855f7" },
    { l: "Leads", v: "2,200", pct: 22, c: "#f59e0b" },
    { l: "Clients", v: "148", pct: 8, c: "#4ead6a" },
  ];
  return (
    <div ref={ref} style={{ padding: "clamp(16px,3vw,24px)", height: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.15em", color: `${accent}80`, textTransform: "uppercase" }}>Engagement Funnel</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(18px,2.5vw,22px)", color: "white", marginTop: "4px" }}>250K+ Engagements</div>
      </div>
      {funnel.map((f, i) => (
        <div key={f.l}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>{f.l}</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "11px", color: f.c }}>{f.v}</span>
          </div>
          <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: animated ? `${f.pct}%` : "0%", background: `linear-gradient(90deg,${f.c}88,${f.c})`, borderRadius: "2px", transition: `width 1.2s ${i * 0.18}s cubic-bezier(0.16,1,0.3,1)` }} />
          </div>
        </div>
      ))}
      <div style={{ marginTop: "auto", display: "flex", gap: "5px", flexWrap: "wrap" }}>
        {[{ v: "12+", l: "Clients" }, { v: "3×", l: "Lead Vol." }, { v: "35%", l: "Traffic" }].map(s => (
          <div key={s.l} style={{ flex: 1, background: `${accent}10`, border: `1px solid ${accent}20`, borderRadius: "3px", padding: "7px 6px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(14px,2vw,16px)", color: accent }}>{s.v}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "7px", color: "rgba(255,255,255,0.3)", marginTop: "1px" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChillMindsViz({ accent }: { accent: string }) {
  const spreads = [
    { title: "Mental Clarity", col: "#f472b6", sub: "Vol.1 · Cover" },
    { title: "Breathing Space", col: "#60a5fa", sub: "Vol.1 · Feature" },
    { title: "Growing Up", col: "#34d399", sub: "Vol.2 · Cover" },
    { title: "Feeling Safe", col: "#fbbf24", sub: "Vol.2 · Feature" },
  ];
  const palette1 = ["#f472b6","#60a5fa","#34d399","#fbbf24","#a78bfa","#f87171"];
  return (
    <div style={{ padding: "clamp(16px,3vw,24px)", height: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.15em", color: `${accent}80`, textTransform: "uppercase" }}>Editorial System</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(18px,2.5vw,22px)", color: "white", marginTop: "4px" }}>72 Pages · Two Volumes</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
        {spreads.map(s => (
          <div key={s.title} style={{ aspectRatio: "1.41", borderRadius: "3px", background: `linear-gradient(135deg,${s.col}25,${s.col}08)`, border: `1px solid ${s.col}25`, padding: "8px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", top: "38%", left: "8%", right: "8%", height: "1px", background: `${s.col}25` }} />
            <div style={{ position: "absolute", top: "55%", left: "8%", right: "30%", height: "1px", background: `${s.col}18` }} />
            <div style={{ position: "absolute", top: "10%", right: "8%", width: "25%", bottom: "10%", background: `${s.col}12`, borderRadius: "2px" }} />
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "9px", color: s.col, lineHeight: 1.2, position: "relative", zIndex: 1 }}>{s.title}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "6px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", position: "relative", zIndex: 1 }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "7px", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Colour System</div>
        <div style={{ display: "flex", gap: "2px" }}>{palette1.map(c => <div key={c} style={{ flex: 1, height: "14px", background: c, borderRadius: "1px" }} />)}</div>
      </div>
    </div>
  );
}

const VIZMAP: Record<string, React.FC<{ accent: string }>> = {
  makeja: MakejaViz,
  ghostnet: GhostNetViz,
  akili: AkiliViz,
  hookah: HookahViz,
  shantech: ShantechViz,
  chillminds: ChillMindsViz,
};

// ── PROJECT CARD ──────────────────────────────────────────────────────────────
function ProjectCard({
  p, idx, expanded, onToggle
}: {
  p: typeof PROJECTS[0]; idx: number; expanded: boolean; onToggle: () => void;
}) {
  const Viz = VIZMAP[p.id];
  const statusCfg = STATUS_CFG[p.status] ?? { color: p.accent, pulse: false };
  const isLight = idx % 2 === 0;

  return (
    <div className="work-card" style={{
      border: `1px solid var(--border)`,
      borderTop: `2px solid ${p.accent}`,
      overflow: "hidden",
      background: "var(--bg)",
      boxShadow: "0 2px 32px rgba(3,105,161,0.06)",
      transition: "box-shadow 0.3s",
    }}>
      {/* Main grid: details + viz */}
      <div className="work-card-grid" style={{ display: "grid" }}>
        {/* ── DETAILS PANEL ── */}
        <div style={{
          padding: "clamp(24px,4vw,44px) clamp(20px,4vw,48px)",
          background: isLight ? "var(--bg)" : "var(--bg-2)",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
        }}>
          <div>
            {/* Ghost number */}
            <div style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(60px,8vw,90px)", color: `${p.accent}10`,
              lineHeight: 1, marginBottom: "-16px", letterSpacing: "-0.05em",
              userSelect: "none", pointerEvents: "none",
            }}>{p.num}</div>

            {/* Status + type row */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: statusCfg.color, display: "block", flexShrink: 0,
                animation: statusCfg.pulse ? "blink 2s ease-in-out infinite" : "none",
              }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: statusCfg.color }}>{p.statusLabel}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-4)" }}>·</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-4)" }}>{p.year}</span>
              <span className="pill" style={{ marginLeft: "4px" }}>{p.type}</span>
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(26px,3vw,40px)", letterSpacing: "-0.02em",
              color: "var(--text)", lineHeight: 1, marginBottom: "6px",
            }}>{p.name}</h2>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: p.accent, marginBottom: "16px", fontStyle: "italic" }}>{p.tagline}</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-3)", lineHeight: 1.85, marginBottom: "18px", maxWidth: "480px" }}>{p.desc}</p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {p.tags.map(t => (
                <span key={t} className="pill">{t}</span>
              ))}
            </div>
          </div>

          {/* Bottom: metrics + actions */}
          <div style={{ marginTop: "28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px,1fr))", gap: "6px", marginBottom: "18px" }}>
              {p.metrics.map(m => (
                <div key={m.label} style={{
                  background: `${p.accent}08`, border: `1px solid ${p.accent}20`,
                  padding: "10px 8px", textAlign: "center",
                }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(12px,1.6vw,15px)", color: p.accent, lineHeight: 1, marginBottom: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.val}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "7px", color: "var(--text-4)", letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                onClick={onToggle}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em",
                  textTransform: "uppercase", background: "transparent",
                  border: `1px solid ${p.accent}60`, color: p.accent,
                  padding: "9px 18px", cursor: "pointer", transition: "all 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${p.accent}12`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >{expanded ? "Show Less ↑" : "Deep Dive →"}</button>
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ fontSize: "10px", padding: "9px 16px", textDecoration: "none" }}
                >GitHub ↗</a>
              )}
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em",
                    textTransform: "uppercase", color: p.accent, textDecoration: "none",
                    padding: "9px 18px", border: `1px solid ${p.accent}50`, transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${p.accent}12`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >Live ↗</a>
              )}
            </div>
          </div>
        </div>

        {/* ── VIZ PANEL ── */}
        <div style={{
          background: "var(--abyss)",
          position: "relative", overflow: "hidden",
          minHeight: "320px",
        }}>
          {/* Subtle dot grid */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `radial-gradient(${p.accent}14 1px, transparent 1px)`,
            backgroundSize: "20px 20px", opacity: 0.8, pointerEvents: "none",
          }} />
          {/* Glow blobs */}
          <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", background: `radial-gradient(circle, ${p.accent}18, transparent 70%)`, filter: "blur(40px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-20px", left: "-20px", width: "140px", height: "140px", background: `radial-gradient(circle, ${p.accent}0a, transparent 70%)`, filter: "blur(28px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
            <Viz accent={p.accent} />
          </div>
        </div>
      </div>

      {/* ── DEEP DIVE PANEL ── */}
      {expanded && (
        <div className="work-deep-grid" style={{
          borderTop: `1px solid ${p.accent}20`,
          background: `${p.accent}05`,
          padding: "clamp(20px,3vw,36px) clamp(20px,4vw,48px)",
          display: "grid", gap: "clamp(20px,3vw,48px)",
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", color: p.accent, textTransform: "uppercase", marginBottom: "10px" }}>// The Challenge</div>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-3)",
              lineHeight: 1.9, fontStyle: "italic",
              borderLeft: `2px solid ${p.accent}40`, paddingLeft: "16px",
            }}>{p.challenge}</p>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", color: p.accent, textTransform: "uppercase", marginBottom: "10px" }}>// The Solution</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-3)", lineHeight: 1.9 }}>{p.solution}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function Work() {
  const [active, setActive] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* ── RESPONSIVE STYLES ──────────────────────────────────────────────── */}
      <style>{`
        .work-card-grid {
          grid-template-columns: 1fr;
        }
        .work-deep-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 700px) {
          .work-card-grid { grid-template-columns: 1fr 1fr; min-height: 400px; }
          .work-deep-grid { grid-template-columns: 1fr 1fr; }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes riverFlow {
          0% { transform: translateX(-6px) skewX(-2deg); opacity: 0.6; }
          50% { transform: translateX(6px) skewX(2deg); opacity: 1; }
          100% { transform: translateX(-6px) skewX(-2deg); opacity: 0.6; }
        }
        * { cursor: none !important; }
      `}</style>

      {/* ── PAGE HEADER — dark abyss section ─────────────────────────────── */}
      <div style={{ background: "var(--abyss)", borderBottom: "1px solid rgba(6,182,212,0.12)" }}>
        {/* River Ribbon 3D scene */}
        <div style={{ width: "100%", height: "160px", overflow: "hidden", position: "relative" }}>
          <RiverRibbonScene />
          {/* Gradient fade at bottom */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40px", background: "linear-gradient(to bottom, transparent, var(--abyss))", pointerEvents: "none" }} />
        </div>

        <div style={{ padding: "clamp(28px,5vw,56px) clamp(20px,5vw,64px) clamp(40px,6vw,72px)" }}>
          {/* Scene label */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <div style={{ width: "24px", height: "1px", background: "rgba(6,182,212,0.5)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(6,182,212,0.7)", textTransform: "uppercase" }}>Scene 03 — River Flow</span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(52px,9vw,110px)", lineHeight: 0.9,
            letterSpacing: "-0.03em", color: "white",
            marginBottom: "20px",
          }}>
            The<br />
            <span style={{
              background: "linear-gradient(135deg, #0ea5e9, #06b6d4, #0369a1)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Work.</span>
          </h1>

          <p style={{
            fontFamily: "var(--font-body)", fontSize: "clamp(13px,1.8vw,16px)",
            color: "rgba(255,255,255,0.45)", maxWidth: "480px", lineHeight: 1.8,
            marginBottom: "40px",
          }}>
            6 projects. Production systems, AI tools, 3D experiences, digital agency, editorial design. Every metric earned. Every line written.
          </p>

          {/* Stats strip */}
          <div style={{ display: "flex", gap: "clamp(20px,4vw,48px)", flexWrap: "wrap" }}>
            {[
              { val: "6", label: "Projects Shipped" },
              { val: "247+", label: "Tenants Managed" },
              { val: "KSH 1.5M", label: "Monthly Volume" },
              { val: "72", label: "Pages Designed" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(22px,3vw,32px)", color: "white", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginTop: "3px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CATEGORY FILTER ────────────────────────────────────────────────── */}
      <div style={{
        background: "var(--bg)", padding: "18px clamp(16px,4vw,48px)",
        borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, zIndex: 40,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", color: "var(--text-4)", textTransform: "uppercase", marginRight: "4px" }}>Filter:</span>
          {CATS.map(c => (
            <button key={c} onClick={() => setActive(c)}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em",
                textTransform: "uppercase", padding: "7px 14px",
                background: active === c ? "var(--ocean)" : "transparent",
                border: `1px solid ${active === c ? "var(--ocean)" : "var(--border)"}`,
                color: active === c ? "white" : "var(--text-3)",
                cursor: "pointer", transition: "all 0.2s", borderRadius: "2px",
              }}
            >{c}</button>
          ))}
          {active !== "All" && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-4)", marginLeft: "6px" }}>
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* ── PROJECTS ───────────────────────────────────────────────────────── */}
      <div style={{
        background: "var(--bg)",
        padding: "clamp(28px,5vw,56px) clamp(16px,4vw,48px) clamp(56px,8vw,96px)",
        display: "flex", flexDirection: "column",
        gap: "clamp(28px,4vw,48px)",
      }}>
        {filtered.map((p, idx) => (
          <ProjectCard
            key={p.id}
            p={p}
            idx={idx}
            expanded={expanded === p.id}
            onToggle={() => setExpanded(expanded === p.id ? null : p.id)}
          />
        ))}
      </div>

      {/* ── CTA FOOTER ─────────────────────────────────────────────────────── */}
      <div style={{
        background: "var(--abyss)",
        borderTop: "1px solid rgba(6,182,212,0.1)",
        padding: "clamp(56px,8vw,96px) clamp(20px,5vw,64px)",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* Ambient glow */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(3,105,161,0.12), transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
            <div style={{ width: "32px", height: "1px", background: "rgba(6,182,212,0.4)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.25em", color: "rgba(6,182,212,0.6)", textTransform: "uppercase" }}>Next Mission</span>
            <div style={{ width: "32px", height: "1px", background: "rgba(6,182,212,0.4)" }} />
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(32px,5vw,64px)", lineHeight: 1,
            letterSpacing: "-0.025em", color: "white",
            marginBottom: "14px",
          }}>
            Want to be<br />
            <span style={{
              background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>the next project?</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(255,255,255,0.35)", maxWidth: "360px", margin: "0 auto 36px", lineHeight: 1.8 }}>
            From zero to production. Let&apos;s build something the market can actually feel.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/contact" className="btn-primary" style={{ textDecoration: "none" }}>Start a Project →</a>
            <a href="mailto:kibirielevis@gmail.com" className="btn-secondary" style={{ textDecoration: "none", borderColor: "rgba(6,182,212,0.3)", color: "var(--aqua)" }}>Email Directly ↗</a>
          </div>
        </div>
      </div>
    </div>
  );
}
