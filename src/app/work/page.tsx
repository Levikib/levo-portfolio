"use client";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const PROJECTS = [
  {
    num: "01", id: "makeja",
    name: "Makeja Homes",
    tagline: "The SaaS that moves real money.",
    category: "Engineering",
    status: "live", statusLabel: "Live in Production",
    year: "2024–Present", type: "SaaS Platform",
    accent: "#7c3aed", accentBorder: "rgba(124,58,237,0.2)",
    vizBg: "#0f0a1e",
    desc: "Multi-tenant residential property management SaaS. Built from zero — every line of architecture, every payment flow, every automation. 247+ active tenants. KSH 1.5M/month flowing through Paystack webhooks.",
    challenge: "How do you build a system landlords trust with their entire rental income — from zero, in 6 months?",
    solution: "Database-driven architecture with monthly_bills as single source of truth. Automated lease expiry, recurring charges, tenant unit-switching, and full email receipt pipeline.",
    tags: ["TypeScript", "Next.js 14", "PostgreSQL", "Prisma ORM", "Paystack", "VPS/Nginx", "Resend"],
    metrics: [{ val:"247+", label:"Active Tenants" },{ val:"KSH 1.5M", label:"Monthly Volume" },{ val:"2024", label:"Founded" },{ val:"100%", label:"Uptime" }],
    github: "https://github.com/Levikib/makeja-homes",
    live: "https://makejahomes.co.ke",
  },
  {
    num: "02", id: "ghostnet",
    name: "GhostNet",
    tagline: "Where cybersecurity meets cinematic experience.",
    category: "Engineering",
    status: "live", statusLabel: "Live in Production",
    year: "2025–Present", type: "EdTech Platform",
    accent: "#10b981", accentBorder: "rgba(16,185,129,0.2)",
    vizBg: "#020f08",
    desc: "Full-stack cybersecurity research & training platform. 13 learning modules, 243 guided lab steps, a 5450 XP gamification economy, 9 live hacking tools, a real-time leaderboard, and GHOST AI — a Groq llama-3.3-70b agent embedded inside the platform. Cinematic matrix-rain splash screen on first entry.",
    challenge: "Cybersecurity education is either too academic or too shallow. How do you build something that feels like a game but trains you like a professional?",
    solution: "Supabase realtime for XP updates and leaderboard. Groq llama-3.3-70b powering GHOST AI for contextual guidance. 9 browser-based live tools (port scanner, hash cracker, etc.). Cinematic GSAP/canvas matrix welcome sequence. Full gamification layer with badges and progress persistence.",
    tags: ["Next.js 14", "TypeScript", "Supabase", "Groq llama-3.3-70b", "Realtime DB", "GSAP", "Canvas API"],
    metrics: [{ val:"13", label:"Modules" },{ val:"243", label:"Lab Steps" },{ val:"5450", label:"XP Economy" },{ val:"9", label:"Live Tools" }],
    github: null,
    live: "https://ghostnet-pi.vercel.app",
  },
  {
    num: "03", id: "nse",
    name: "NSE Research Agent",
    tagline: "AI that reads the market so you don't have to.",
    category: "AI & Data",
    status: "building", statusLabel: "In Development",
    year: "2026", type: "AI / Data Tool",
    accent: "#d97706", accentBorder: "rgba(217,119,6,0.2)",
    vizBg: "#0f0c05",
    desc: "Live data-fetching intelligence system for the Nairobi Securities Exchange. Ingests real-time market data, applies technical analysis, and surfaces actionable trade insights. Decision support — not prediction.",
    challenge: "NSE data is fragmented, delayed, and mostly locked behind expensive terminals. Retail investors in Kenya are flying blind.",
    solution: "Python ingestion layer + TypeScript dashboard. Multiple financial API sources, technical indicator engine, and an AI summarisation layer that turns raw data into readable insight.",
    tags: ["Python", "TypeScript", "Financial APIs", "Data Analysis", "AI Summarisation", "Real-time Feed"],
    metrics: [{ val:"Live", label:"NSE Data" },{ val:"AI", label:"Analysis" },{ val:"10+", label:"Indicators" },{ val:"Q2 2026", label:"Launch" }],
    github: null,
  },
  {
    num: "04", id: "shantech",
    name: "ShanTech Agency",
    tagline: "Kenyan SMEs. Measurable results. Technology.",
    category: "Agency",
    status: "completed", statusLabel: "Completed · 2024–2025",
    year: "2024–2025", type: "Digital Agency",
    accent: "#e11d48", accentBorder: "rgba(225,29,72,0.2)",
    vizBg: "#0f050a",
    desc: "Full-service digital agency helping Kenyan SMEs grow through technology. AI-powered CRM automation, social infrastructure, full-stack web delivery. 12+ clients, 250K+ engagement views delivered.",
    challenge: "Most Kenyan SMEs have no digital presence, no CRM, and no funnel — but have real products and customers ready to buy.",
    solution: "GoHighLevel CRM deployment, Meta Ads API integration, automated follow-up sequences, and full web delivery. Measurable revenue impact across every engagement.",
    tags: ["GoHighLevel", "Zapier", "Meta Ads API", "Automation", "Full-stack", "Social Strategy"],
    metrics: [{ val:"12+", label:"Clients" },{ val:"250K+", label:"Engagements" },{ val:"35%", label:"Traffic Lift" },{ val:"3×", label:"Lead Volume" }],
    github: null,
  },
  {
    num: "05", id: "chillminds",
    name: "Chill Minds Magazine",
    tagline: "72 pages. Two volumes. Built alone.",
    category: "Design",
    status: "published", statusLabel: "Vol. 1 & 2 Published",
    year: "2024–2025", type: "Editorial Design",
    accent: "#059669", accentBorder: "rgba(5,150,105,0.2)",
    vizBg: "#030f09",
    desc: "A fully designed children's mental wellness and health magazine. Two volumes, 36 pages each. Complete design ownership — concept, layout, illustration direction, colour theory, typography, and production.",
    challenge: "Mental health for children in Kenya has almost no visual language. How do you make something kids actually want to read?",
    solution: "Vibrant editorial system with consistent grid, custom colour palette per section, illustration direction brief, and typography system built from scratch. Designed in InDesign, printed and distributed.",
    tags: ["InDesign", "Editorial Design", "Typography", "Colour Theory", "Illustration Direction", "Print Production"],
    metrics: [{ val:"2", label:"Volumes" },{ val:"72", label:"Total Pages" },{ val:"100%", label:"Design Own." },{ val:"Kids", label:"Audience" }],
    github: null,
  },
];

const SERVICES = [
  {
    id: "fullstack", category: "Fullstack Engineering", icon: "⬡", accent: "#7c3aed", dark: true,
    tagline: "Production-grade systems from database to UI.",
    items: [
      { name: "Next.js Application Development", desc: "Full-stack apps with SSR, API routes, auth, and deployment." },
      { name: "REST & GraphQL API Design", desc: "Clean, documented APIs built to scale from day one." },
      { name: "Database Architecture", desc: "PostgreSQL schema design, Prisma ORM, migrations, and indexing." },
      { name: "TypeScript Systems", desc: "Typed, maintainable codebases — zero any, real contracts." },
      { name: "Authentication & RBAC", desc: "JWT, session auth, role-based access across multi-tenant systems." },
      { name: "Performance Optimisation", desc: "Core Web Vitals, query tuning, lazy loading, and bundle analysis." },
    ],
  },
  {
    id: "saas", category: "SaaS & Product", icon: "◈", accent: "#a855f7", dark: false,
    tagline: "From zero to paying users — architecture that scales.",
    items: [
      { name: "MVP Development", desc: "Ship fast, ship right — full product from idea to launch." },
      { name: "Multi-tenant Architecture", desc: "Subdomain routing, tenant isolation, shared infrastructure." },
      { name: "Subscription & Billing Systems", desc: "Recurring charges, invoices, payment webhooks, and reconciliation." },
      { name: "SaaS Dashboard Design", desc: "Admin panels, tenant portals, and real-time data views." },
      { name: "User Onboarding Flows", desc: "First-run experience, progress tracking, and activation funnels." },
      { name: "Analytics & Reporting", desc: "Business metrics, usage dashboards, and export pipelines." },
    ],
  },
  {
    id: "payments", category: "Payments & Integrations", icon: "⟁", accent: "#d97706", dark: true,
    tagline: "Real money flowing reliably through your system.",
    items: [
      { name: "Paystack Integration", desc: "Full payment flows — cards, M-Pesa, bank transfers, webhooks." },
      { name: "Webhook Architecture", desc: "Reliable event-driven systems with retry logic and logging." },
      { name: "Third-Party API Integrations", desc: "Any API connected cleanly — CRMs, ERPs, comms platforms." },
      { name: "Resend & Email Pipelines", desc: "Transactional emails, receipts, reminders, and bulk campaigns." },
      { name: "Automation Workflows", desc: "Zapier, n8n, and custom trigger-action pipelines." },
    ],
  },
  {
    id: "devops", category: "DevOps & Infrastructure", icon: "⬢", accent: "#059669", dark: false,
    tagline: "Servers that don't wake you up at 3am.",
    items: [
      { name: "VPS Setup & Nginx Config", desc: "Ubuntu servers, reverse proxy, SSL, and process management." },
      { name: "CI/CD Pipelines", desc: "GitHub Actions, auto-deploy, environment promotion." },
      { name: "Docker Containerisation", desc: "Compose stacks, image optimisation, and registry setup." },
      { name: "Domain, DNS & SSL", desc: "End-to-end domain management and certificate automation." },
      { name: "Monitoring & Alerting", desc: "Uptime checks, error tracking, and on-call alerts." },
    ],
  },
  {
    id: "ai", category: "AI & Data", icon: "◭", accent: "#d97706", dark: true,
    tagline: "Intelligent systems that surface insight from noise.",
    items: [
      { name: "AI-Powered Dashboards", desc: "LLM summarisation layers on top of real business data." },
      { name: "Data Ingestion Pipelines", desc: "Python ETL, scheduled jobs, and structured data stores." },
      { name: "Financial Analysis Tools", desc: "Technical indicators, market data feeds, and signal engines." },
      { name: "LLM API Integration", desc: "Claude, GPT, and open models wired into your product." },
      { name: "Automated Reporting", desc: "Scheduled AI-generated reports delivered to stakeholders." },
    ],
  },
  {
    id: "agency", category: "Digital Agency", icon: "◇", accent: "#e11d48", dark: false,
    tagline: "Growth infrastructure for businesses that mean business.",
    items: [
      { name: "GoHighLevel CRM Deployment", desc: "Full GHL setup — pipelines, automations, and integrations." },
      { name: "Meta Ads Strategy & Execution", desc: "Campaign architecture, creative brief, pixel setup, and ROAS tracking." },
      { name: "Social Infrastructure", desc: "Content systems, scheduling, and engagement workflows." },
      { name: "Lead Generation Funnels", desc: "Landing pages, lead magnets, and automated follow-up sequences." },
      { name: "Website for SMEs", desc: "Fast, SEO-ready sites built for conversion, not just aesthetics." },
    ],
  },
  {
    id: "design", category: "Design & Editorial", icon: "◉", accent: "#059669", dark: true,
    tagline: "Visual systems with intent. Not decoration.",
    items: [
      { name: "UI/UX Design", desc: "Figma-based design systems, wireframes, and prototype handoff." },
      { name: "Brand Identity", desc: "Logo, colour palette, type system, and brand guidelines." },
      { name: "Editorial Design", desc: "Magazine layouts, annual reports, and long-form print design." },
      { name: "Design Systems", desc: "Component libraries, token systems, and cross-team documentation." },
    ],
  },
];

const CATS = ["All", "Engineering", "AI & Data", "Agency", "Design"];
const STATUS_COLOR: Record<string, string> = { live:"#4ead6a", building:"#d97706", completed:"#a855f7", published:"#059669" };

function MakejaViz({ accent }: { accent: string }) {
  const payments = [340,480,520,390,610,580,720,650,810,760,920,1050];
  const maxP = Math.max(...payments);
  return (
    <div style={{ padding:"clamp(16px,3vw,28px)", height:"100%", display:"flex", flexDirection:"column", gap:"18px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"8px", letterSpacing:"0.2em", color:`${accent}80`, textTransform:"uppercase" }}>Dashboard · Live</div>
          <div style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"22px", color:"white", lineHeight:1, marginTop:"4px" }}>KSH 1,521,400</div>
          <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"9px", color:"#4ead6a", marginTop:"2px" }}>↑ 8.4% this month</div>
        </div>
        <div style={{ display:"flex", gap:"5px" }}>
          {["#a855f7","#4ead6a","rgba(255,255,255,0.12)"].map((c,i) => <div key={i} style={{ width:"7px", height:"7px", borderRadius:"50%", background:c }} />)}
        </div>
      </div>
      <div>
        <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"7px", color:"rgba(255,255,255,0.25)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:"8px" }}>Monthly Transactions (KSH &apos;000)</div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:"4px", height:"75px" }}>
          {payments.map((v,i) => (
            <div key={i} style={{ flex:1, height:`${(v/maxP)*71}px`, background: i===payments.length-1 ? `linear-gradient(to top, ${accent}, ${accent}cc)` : `${accent}${Math.round(20+(v/maxP)*50).toString(16).padStart(2,"0")}`, borderRadius:"2px 2px 0 0", boxShadow:i===payments.length-1?`0 0 10px ${accent}60`:"none" }} />
          ))}
        </div>
        <div style={{ display:"flex", marginTop:"3px" }}>
          {["J","F","M","A","M","J","J","A","S","O","N","D"].map(m => (
            <div key={m} style={{ flex:1, textAlign:"center", fontFamily:"var(--font-syne-mono)", fontSize:"6px", color:"rgba(255,255,255,0.18)" }}>{m}</div>
          ))}
        </div>
      </div>
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
          <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"7px", color:"rgba(255,255,255,0.25)", textTransform:"uppercase", letterSpacing:"0.12em" }}>Unit Occupancy</div>
          <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"7px", color:"#4ead6a" }}>247/260</div>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"2px" }}>
          {Array.from({length:36}).map((_,i) => (
            <div key={i} style={{ width:"13px", height:"13px", borderRadius:"2px", background: i<34 ? i%9===0?`${accent}cc`:"#4ead6a50" : "rgba(255,255,255,0.05)" }} />
          ))}
          <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"7px", color:"rgba(255,255,255,0.18)", alignSelf:"center", marginLeft:"4px" }}>+134</div>
        </div>
      </div>
      <div style={{ display:"flex", gap:"8px", marginTop:"auto" }}>
        {[{l:"Tenants",v:"247",c:accent},{l:"Bills Due",v:"18",c:"#d97706"},{l:"Paid",v:"11",c:"#4ead6a"}].map(s => (
          <div key={s.l} style={{ flex:1, background:"rgba(255,255,255,0.04)", borderRadius:"4px", padding:"8px 10px", border:`1px solid ${s.c}20` }}>
            <div style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"18px", color:s.c, lineHeight:1 }}>{s.v}</div>
            <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"7px", color:"rgba(255,255,255,0.25)", marginTop:"2px" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NseViz({ accent }: { accent: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [price, setPrice] = useState(142.5);
  useEffect(() => { const t = setInterval(() => setPrice(p => parseFloat((p+(Math.random()-0.48)*2).toFixed(2))), 1200); return () => clearInterval(t); }, []);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const W = wrapRef.current ? wrapRef.current.offsetWidth : canvas.offsetWidth;
    const H = 130;
    canvas.width = W; canvas.height = H;
    ctx.clearRect(0,0,W,H);
    for (let i=0;i<5;i++) { ctx.beginPath();ctx.moveTo(0,(H/5)*i+H/10);ctx.lineTo(W,(H/5)*i+H/10);ctx.strokeStyle="rgba(255,255,255,0.04)";ctx.lineWidth=1;ctx.stroke(); }
    const candles = Array.from({length:18},(_,i) => { const o=130+Math.sin(i*0.7)*15+Math.random()*8; const c=o+(Math.random()-0.45)*12; return{o,c,h:Math.max(o,c)+Math.random()*5,l:Math.min(o,c)-Math.random()*5}; });
    const hi = Math.max(...candles.map(c=>c.h)), lo = Math.min(...candles.map(c=>c.l));
    const cW = W/candles.length, scale = H*0.65/(hi-lo), base = H*0.82;
    const toY = (v: number) => base-(v-lo)*scale;
    candles.forEach((c,i) => { const x=i*cW+cW/2,bull=c.c>=c.o,col=bull?"#4ead6a":"#e11d48"; ctx.strokeStyle=col;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,toY(c.h));ctx.lineTo(x,toY(c.l));ctx.stroke();ctx.fillStyle=bull?col:`${col}cc`;ctx.fillRect(x-cW*0.28,toY(Math.max(c.o,c.c)),cW*0.56,Math.max(2,Math.abs(toY(c.o)-toY(c.c)))); });
    const pts = Array.from({length:50},(_,i) => 130+Math.sin(i*0.3)*12+i*0.2+Math.random()*4);
    ctx.beginPath(); pts.forEach((p,i) => { const x=(i/pts.length)*W,y=toY(p); i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
    ctx.strokeStyle=accent;ctx.lineWidth=1.5;ctx.shadowColor=accent;ctx.shadowBlur=6;ctx.stroke();ctx.shadowBlur=0;
  }, [price, accent]);
  return (
    <div style={{ padding:"clamp(16px,3vw,28px)", height:"100%", display:"flex", flexDirection:"column", gap:"14px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"8px", letterSpacing:"0.15em", color:`${accent}80`, textTransform:"uppercase" }}>NSE:SCOM · Live</div>
          <div style={{ display:"flex", alignItems:"baseline", gap:"8px", marginTop:"3px" }}>
            <div style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"26px", color:"white" }}>{price.toFixed(2)}</div>
            <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"10px", color:"#4ead6a" }}>+2.14%</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:"3px" }}>
          {["1D","1W","1M","1Y"].map((t,i) => (
            <div key={t} style={{ fontFamily:"var(--font-syne-mono)", fontSize:"8px", padding:"2px 7px", background:i===2?`${accent}25`:"transparent", border:`1px solid ${i===2?accent+"50":"rgba(255,255,255,0.08)"}`, color:i===2?accent:"rgba(255,255,255,0.25)", cursor:"pointer" }}>{t}</div>
          ))}
        </div>
      </div>
      <div ref={wrapRef} style={{ width:"100%" }}>
        <canvas ref={canvasRef} style={{ width:"100%", height:"130px", display:"block" }} />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"6px" }}>
        {[{n:"RSI",v:"58.4",s:"Neutral",c:accent},{n:"MACD",v:"+1.23",s:"Bullish",c:"#4ead6a"},{n:"Vol",v:"2.4M",s:"Above avg",c:"#a855f7"}].map(ind => (
          <div key={ind.n} style={{ background:"rgba(255,255,255,0.04)", borderRadius:"4px", padding:"9px", border:`1px solid ${ind.c}20` }}>
            <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"7px", color:"rgba(255,255,255,0.25)", letterSpacing:"0.1em" }}>{ind.n}</div>
            <div style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"16px", color:ind.c, marginTop:"2px" }}>{ind.v}</div>
            <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"7px", color:"rgba(255,255,255,0.2)", marginTop:"1px" }}>{ind.s}</div>
          </div>
        ))}
      </div>
      <div style={{ background:`${accent}12`, border:`1px solid ${accent}25`, borderRadius:"4px", padding:"10px 14px", display:"flex", gap:"8px" }}>
        <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"8px", color:accent, flexShrink:0, marginTop:"1px" }}>AI →</div>
        <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"8px", color:"rgba(255,255,255,0.4)", lineHeight:1.6 }}>SCOM consolidating above 138 support. Volume confirms accumulation. Watch 145 resistance.</div>
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
  const funnel = [{l:"Impressions",v:"250,000",pct:100,c:accent},{l:"Clicks",v:"18,500",pct:42,c:"#a855f7"},{l:"Leads",v:"2,200",pct:22,c:"#d97706"},{l:"Clients",v:"148",pct:8,c:"#4ead6a"}];
  return (
    <div ref={ref} style={{ padding:"clamp(16px,3vw,28px)", height:"100%", display:"flex", flexDirection:"column", gap:"16px" }}>
      <div>
        <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"8px", letterSpacing:"0.15em", color:`${accent}80`, textTransform:"uppercase" }}>Engagement Funnel</div>
        <div style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"22px", color:"white", marginTop:"4px" }}>250K+ Engagements</div>
      </div>
      {funnel.map((f,i) => (
        <div key={f.l}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"5px" }}>
            <span style={{ fontFamily:"var(--font-syne-mono)", fontSize:"8px", color:"rgba(255,255,255,0.4)", letterSpacing:"0.06em" }}>{f.l}</span>
            <span style={{ fontFamily:"var(--font-syne)", fontWeight:700, fontSize:"11px", color:f.c }}>{f.v}</span>
          </div>
          <div style={{ height:"5px", background:"rgba(255,255,255,0.05)", borderRadius:"3px", overflow:"hidden" }}>
            <div style={{ height:"100%", width:animated?`${f.pct}%`:"0%", background:`linear-gradient(90deg,${f.c}88,${f.c})`, borderRadius:"3px", transition:`width 1.2s ${i*0.18}s cubic-bezier(0.16,1,0.3,1)`, boxShadow:`0 0 6px ${f.c}50` }} />
          </div>
        </div>
      ))}
      <div style={{ marginTop:"8px" }}>
        {[{n:"Hotel Digital Transform",r:"Web + Social"},{n:"Retail Fashion Brand",r:"Meta Ads + CRM"},{n:"Real Estate Co.",r:"Full-Stack Web"},{n:"F&B Brand",r:"Social Strategy"}].map((c,i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
            <span style={{ fontFamily:"var(--font-dm-sans)", fontSize:"11px", color:"rgba(255,255,255,0.5)" }}>{c.n}</span>
            <span style={{ fontFamily:"var(--font-syne-mono)", fontSize:"8px", color:accent }}>{c.r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChillMindsViz({ accent }: { accent: string }) {
  const spreads = [{title:"Mental Clarity",col:"#f472b6",sub:"Vol.1 · Cover"},{title:"Breathing Space",col:"#60a5fa",sub:"Vol.1 · Feature"},{title:"Growing Up",col:"#34d399",sub:"Vol.2 · Cover"},{title:"Feeling Safe",col:"#fbbf24",sub:"Vol.2 · Feature"}];
  const p1 = ["#f472b6","#60a5fa","#34d399","#fbbf24","#a78bfa","#f87171"];
  const p2 = ["#6ee7b7","#93c5fd","#fca5a5","#fde68a","#c4b5fd","#86efac"];
  return (
    <div style={{ padding:"clamp(16px,3vw,28px)", height:"100%", display:"flex", flexDirection:"column", gap:"16px" }}>
      <div>
        <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"8px", letterSpacing:"0.15em", color:`${accent}80`, textTransform:"uppercase" }}>Editorial System</div>
        <div style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"22px", color:"white", marginTop:"4px" }}>72 Pages. Two Volumes.</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"7px" }}>
        {spreads.map(s => (
          <div key={s.title} style={{ aspectRatio:"1.41", borderRadius:"3px", background:`linear-gradient(135deg,${s.col}25,${s.col}08)`, border:`1px solid ${s.col}25`, padding:"9px", display:"flex", flexDirection:"column", justifyContent:"space-between", overflow:"hidden", position:"relative" }}>
            <div style={{ position:"absolute", top:"35%", left:"8%", right:"8%", height:"1px", background:`${s.col}25` }} />
            <div style={{ position:"absolute", top:"52%", left:"8%", right:"35%", height:"1px", background:`${s.col}18` }} />
            <div style={{ position:"absolute", top:"62%", left:"8%", right:"25%", height:"1px", background:`${s.col}18` }} />
            <div style={{ position:"absolute", top:"10%", right:"8%", width:"28%", bottom:"10%", background:`${s.col}12`, borderRadius:"2px" }} />
            <div style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"10px", color:s.col, lineHeight:1.2, position:"relative", zIndex:1 }}>{s.title}</div>
            <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"6px", color:"rgba(255,255,255,0.25)", letterSpacing:"0.1em", position:"relative", zIndex:1 }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"7px", color:"rgba(255,255,255,0.2)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"5px" }}>Colour Systems</div>
        <div style={{ display:"flex", gap:"2px", marginBottom:"3px" }}>{p1.map(c => <div key={c} style={{ flex:1, height:"17px", background:c, borderRadius:"1px" }} />)}</div>
        <div style={{ display:"flex", gap:"2px" }}>{p2.map(c => <div key={c} style={{ flex:1, height:"17px", background:c, borderRadius:"1px" }} />)}</div>
      </div>
      <div style={{ display:"flex", gap:"6px", marginTop:"auto" }}>
        {[{v:"2",l:"Volumes"},{v:"72",l:"Pages"},{v:"6",l:"Sections"},{v:"∞",l:"Impact"}].map(s => (
          <div key={s.l} style={{ flex:1, textAlign:"center", background:`${accent}10`, borderRadius:"4px", padding:"8px 4px", border:`1px solid ${accent}20` }}>
            <div style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"16px", color:accent }}>{s.v}</div>
            <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"7px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.08em", marginTop:"1px" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GhostNetViz({ accent }: { accent: string }) {
  const [tick, setTick] = useState(0);
  const [xpFlash, setXpFlash] = useState(false);
  useEffect(() => { const t = setInterval(() => { setTick(n => n + 1); if (Math.random() > 0.6) { setXpFlash(true); setTimeout(() => setXpFlash(false), 400); } }, 1400); return () => clearInterval(t); }, []);
  const modules = [
    { name:"Recon & OSINT", xp:450, done:true },
    { name:"Network Scanning", xp:380, done:true },
    { name:"Web App Attacks", xp:520, done:true },
    { name:"Exploitation", xp:410, done:false },
    { name:"Privilege Escalation", xp:390, done:false },
  ];
  const tools = ["Port Scanner","Hash Cracker","SQLi Tester","XSS Probe","Dir Buster","DNS Enum","Payload Gen","Log Analyser","GHOST AI"];
  const leaderboard = [
    { rank:1, name:"gh0st_r00t", xp:5450, badge:"🔴" },
    { rank:2, name:"void_runner", xp:4820, badge:"🟠" },
    { rank:3, name:"n3t_phr34k", xp:4210, badge:"🟡" },
  ];
  return (
    <div style={{ padding:"clamp(16px,3vw,24px)", height:"100%", display:"flex", flexDirection:"column", gap:"14px", fontFamily:"var(--font-syne-mono)" }}>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div style={{ fontSize:"8px", letterSpacing:"0.2em", color:`${accent}80`, textTransform:"uppercase" }}>GhostNet · Active</div>
          <div style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"20px", color:"white", lineHeight:1, marginTop:"4px" }}>
            GHOST<span style={{ color:accent }}>_AI</span>
          </div>
          <div style={{ fontSize:"8px", color:`${accent}cc`, marginTop:"3px", animation:xpFlash?"none":"none" }}>
            <span style={{ color:xpFlash?accent:"rgba(255,255,255,0.4)", transition:"color 0.2s" }}>▲ {xpFlash ? "+50 XP" : "5450 XP total"}</span>
          </div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontSize:"7px", color:"rgba(255,255,255,0.2)", marginBottom:"4px" }}>LIVE TOOLS</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"3px", justifyContent:"flex-end", maxWidth:"120px" }}>
            {tools.map((t,i) => (
              <div key={i} style={{ width:"9px", height:"9px", borderRadius:"1px", background: i === (tick % tools.length) ? accent : `${accent}30`, transition:"background 0.3s", boxShadow: i === (tick % tools.length) ? `0 0 6px ${accent}` : "none" }} title={t} />
            ))}
          </div>
        </div>
      </div>
      {/* Modules */}
      <div>
        <div style={{ fontSize:"7px", color:"rgba(255,255,255,0.2)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:"6px" }}>MODULES · 13 total</div>
        {modules.map((m, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"5px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ width:"14px", height:"14px", borderRadius:"2px", background:m.done?`${accent}30`:"rgba(255,255,255,0.04)", border:`1px solid ${m.done?accent:"rgba(255,255,255,0.1)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              {m.done && <span style={{ fontSize:"8px", color:accent }}>✓</span>}
            </div>
            <span style={{ fontSize:"9px", color:m.done?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.3)", flex:1, letterSpacing:"0.03em" }}>{m.name}</span>
            <span style={{ fontSize:"8px", color:m.done?accent:"rgba(255,255,255,0.2)" }}>{m.xp} XP</span>
          </div>
        ))}
        <div style={{ fontSize:"8px", color:"rgba(255,255,255,0.2)", marginTop:"5px", textAlign:"right" }}>+8 more modules...</div>
      </div>
      {/* Leaderboard */}
      <div style={{ marginTop:"auto" }}>
        <div style={{ fontSize:"7px", color:"rgba(255,255,255,0.2)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:"6px" }}>LEADERBOARD</div>
        {leaderboard.map(r => (
          <div key={r.rank} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"6px 8px", background: r.rank===1?`${accent}12`:"rgba(255,255,255,0.02)", borderRadius:"3px", marginBottom:"3px", border:`1px solid ${r.rank===1?accent+"25":"rgba(255,255,255,0.05)"}` }}>
            <span style={{ fontSize:"9px", color:accent, width:"14px" }}>#{r.rank}</span>
            <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.6)", flex:1 }}>{r.name}</span>
            <span style={{ fontSize:"9px", color:r.rank===1?accent:"rgba(255,255,255,0.35)" }}>{r.xp.toLocaleString()} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const VIZMAP: Record<string, React.FC<{ accent: string }>> = {
  makeja: MakejaViz, ghostnet: GhostNetViz, nse: NseViz, shantech: ShantechViz, chillminds: ChillMindsViz,
};

function ProjectCard({ p, idx, expanded, onToggle }: {
  p: typeof PROJECTS[0]; idx: number; expanded: boolean; onToggle: () => void;
}) {
  const Viz = VIZMAP[p.id];
  const isEven = idx % 2 === 0;
  const detailsPanel = (
    <div style={{ padding:"clamp(24px,4vw,44px) clamp(20px,4vw,48px)", display:"flex", flexDirection:"column", justifyContent:"space-between", background: isEven ? "#ffffff" : "var(--bg-2)" }}>
      <div>
        <div style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"80px", color:`${p.accent}10`, lineHeight:1, marginBottom:"-18px", letterSpacing:"-0.05em", userSelect:"none" }}>{p.num}</div>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"14px" }}>
          <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:STATUS_COLOR[p.status]??p.accent, display:"block", animation:p.status==="live"?"blink 2s ease-in-out infinite":"none", flexShrink:0 }} />
          <span style={{ fontFamily:"var(--font-syne-mono)", fontSize:"9px", letterSpacing:"0.16em", textTransform:"uppercase", color:STATUS_COLOR[p.status]??p.accent }}>{p.statusLabel}</span>
          <span style={{ fontFamily:"var(--font-syne-mono)", fontSize:"9px", color:"var(--text-4)" }}>·</span>
          <span style={{ fontFamily:"var(--font-syne-mono)", fontSize:"9px", color:"var(--text-4)" }}>{p.year}</span>
        </div>
        <h2 style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"clamp(28px,3vw,42px)", letterSpacing:"-0.02em", color:"var(--text)", lineHeight:1, marginBottom:"6px" }}>{p.name}</h2>
        <div style={{ fontFamily:"var(--font-dm-sans)", fontSize:"13px", color:p.accent, marginBottom:"18px", fontStyle:"italic" }}>{p.tagline}</div>
        <p style={{ fontFamily:"var(--font-dm-sans)", fontSize:"13px", color:"var(--text-3)", lineHeight:1.85, marginBottom:"20px", maxWidth:"500px" }}>{p.desc}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
          {p.tags.map(t => (
            <span key={t} style={{ fontFamily:"var(--font-syne-mono)", fontSize:"9px", letterSpacing:"0.05em", color:"var(--text-3)", background: isEven ? "var(--bg-2)" : "#ffffff", border:"1px solid var(--border)", padding:"4px 9px" }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ marginTop:"32px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"8px", marginBottom:"20px" }}>
          {p.metrics.map(m => (
            <div key={m.label} style={{ background:`${p.accent}08`, border:`1px solid ${p.accent}20`, padding:"11px 8px", textAlign:"center" }}>
              <div style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"15px", color:p.accent, lineHeight:1, marginBottom:"4px", whiteSpace:"nowrap" }}>{m.val}</div>
              <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"7px", color:"var(--text-4)", letterSpacing:"0.1em", textTransform:"uppercase", whiteSpace:"nowrap" }}>{m.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:"8px" }}>
          <button onClick={onToggle}
            style={{ fontFamily:"var(--font-syne-mono)", fontSize:"10px", letterSpacing:"0.1em", textTransform:"uppercase", background:"transparent", border:`1px solid ${p.accent}60`, color:p.accent, padding:"9px 18px", cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background=`${p.accent}10`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; }}
          >{expanded ? "Show Less ↑" : "Deep Dive →"}</button>
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:"var(--font-syne-mono)", fontSize:"10px", letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--text-3)", textDecoration:"none", padding:"9px 18px", border:"1px solid var(--border)", transition:"all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color="var(--text)"; (e.currentTarget as HTMLElement).style.borderColor="var(--text)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color="var(--text-3)"; (e.currentTarget as HTMLElement).style.borderColor="var(--border)"; }}
            >GitHub ↗</a>
          )}
          {"live" in p && p.live && (
            <a href={p.live as string} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:"var(--font-syne-mono)", fontSize:"10px", letterSpacing:"0.1em", textTransform:"uppercase", color:p.accent, textDecoration:"none", padding:"9px 18px", border:`1px solid ${p.accent}50`, transition:"all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background=`${p.accent}15`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; }}
            >Live Demo ↗</a>
          )}
        </div>
      </div>
    </div>
  );
  const vizPanel = (
    <div style={{ background:p.vizBg, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(${p.accent}12 1px, transparent 1px)`, backgroundSize:"20px 20px", opacity:0.7, pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"220px", height:"220px", background:`radial-gradient(circle, ${p.accent}15, transparent 70%)`, filter:"blur(40px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-20px", left:"-20px", width:"150px", height:"150px", background:`radial-gradient(circle, ${p.accent}08, transparent 70%)`, filter:"blur(30px)", pointerEvents:"none" }} />
      <div style={{ position:"relative", zIndex:1, height:"100%" }}><Viz accent={p.accent} /></div>
    </div>
  );
  return (
    <div style={{ border:"1px solid var(--border)", overflow:"hidden", boxShadow:"0 2px 24px rgba(0,0,0,0.06)" }}>
      <div style={{ height:"3px", background:`linear-gradient(90deg, ${p.accent}, ${p.accent}40, transparent)` }} />
      <div className="proj-main-grid" style={{ display:"grid", minHeight:"420px" }}>
        <div style={{ order: isEven ? 1 : 2 }}>{detailsPanel}</div>
        <div style={{ order: isEven ? 2 : 1 }}>{vizPanel}</div>
      </div>
      {expanded && (
        <div className="proj-deep-grid" style={{ background:`${p.accent}06`, borderTop:`1px solid ${p.accent}20`, padding:"clamp(20px,3vw,36px) clamp(20px,4vw,48px)", display:"grid", gap:"clamp(20px,3vw,52px)" }}>
          <div>
            <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"9px", letterSpacing:"0.2em", color:p.accent, textTransform:"uppercase", marginBottom:"12px" }}>// The Challenge</div>
            <p style={{ fontFamily:"var(--font-dm-sans)", fontSize:"13px", color:"var(--text-3)", lineHeight:1.9, fontStyle:"italic", borderLeft:`2px solid ${p.accent}40`, paddingLeft:"16px" }}>{p.challenge}</p>
          </div>
          <div>
            <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"9px", letterSpacing:"0.2em", color:p.accent, textTransform:"uppercase", marginBottom:"12px" }}>// The Solution</div>
            <p style={{ fontFamily:"var(--font-dm-sans)", fontSize:"13px", color:"var(--text-3)", lineHeight:1.9 }}>{p.solution}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceBand({ s, idx }: { s: typeof SERVICES[0]; idx: number }) {
  const bg = s.dark ? "#0a0805" : "#ffffff";
  const textMain = s.dark ? "rgba(255,255,255,0.92)" : "var(--text)";
  const textSub = s.dark ? "rgba(255,255,255,0.35)" : "var(--text-3)";
  const borderCol = s.dark ? `${s.accent}20` : `${s.accent}25`;
  return (
    <div style={{ background:bg, borderBottom:`1px solid ${s.dark ? "rgba(255,255,255,0.06)" : "var(--border)"}` }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"clamp(36px,5vw,64px) clamp(20px,4vw,48px)" }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"40px", gap:"24px", flexWrap:"wrap" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
            <div style={{ width:"48px", height:"48px", background:`${s.accent}15`, border:`1px solid ${s.accent}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px", flexShrink:0 }}>
              {s.icon}
            </div>
            <div>
              <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"9px", letterSpacing:"0.2em", color:s.accent, textTransform:"uppercase", marginBottom:"4px" }}>// {String(idx+1).padStart(2,"0")}</div>
              <h3 style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"clamp(22px,2.5vw,32px)", color:textMain, lineHeight:1, letterSpacing:"-0.02em", margin:0 }}>{s.category}</h3>
            </div>
          </div>
          <div style={{ fontFamily:"var(--font-dm-sans)", fontSize:"13px", color:textSub, maxWidth:"320px", lineHeight:1.7, fontStyle:"italic" }}>{s.tagline}</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px,1fr))", gap:"1px", background:borderCol }}>
          {s.items.map((item, i) => (
            <div key={i}
              style={{ background:bg, padding:"24px 28px", transition:"background 0.2s", cursor:"default" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = s.dark ? `${s.accent}08` : `${s.accent}05`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = bg; }}
            >
              <div style={{ display:"flex", alignItems:"flex-start", gap:"10px", marginBottom:"8px" }}>
                <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:s.accent, flexShrink:0, marginTop:"7px" }} />
                <div style={{ fontFamily:"var(--font-syne)", fontWeight:700, fontSize:"13px", color:textMain, lineHeight:1.4 }}>{item.name}</div>
              </div>
              <div style={{ fontFamily:"var(--font-dm-sans)", fontSize:"12px", color:textSub, lineHeight:1.7, paddingLeft:"14px" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeadForm() {
  const [form, setForm] = useState({ name:"", email:"", company:"", service:"", message:"" });
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ ...form, subject:`[Work Enquiry] ${form.service || "General"} — ${form.name}` }) });
      setStatus(res.ok ? "sent" : "error");
    } catch { setStatus("error"); }
  };
  const inputStyle = { fontFamily:"var(--font-syne-mono)", fontSize:"11px", letterSpacing:"0.05em", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", color:"white", padding:"12px 16px", width:"100%", outline:"none", transition:"border-color 0.2s", boxSizing:"border-box" as const };
  return (
    <div style={{ background:"#05020f", borderTop:"1px solid rgba(255,255,255,0.06)", padding:"clamp(40px,6vw,80px) clamp(20px,4vw,48px)" }}>
      <div style={{ maxWidth:"760px", margin:"0 auto" }}>
        <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(168,85,247,0.6)", textTransform:"uppercase", marginBottom:"16px" }}>// Start a Project</div>
        <h2 style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"clamp(32px,4vw,52px)", color:"white", lineHeight:0.95, letterSpacing:"-0.03em", marginBottom:"14px" }}>
          Let&apos;s build<br /><span style={{ color:"#a855f7" }}>something real.</span>
        </h2>
        <p style={{ fontFamily:"var(--font-dm-sans)", fontSize:"14px", color:"rgba(255,255,255,0.35)", lineHeight:1.8, marginBottom:"48px", maxWidth:"500px" }}>
          Whether you need a full SaaS, a payment integration, or a growth system — tell me what you&apos;re building. I&apos;ll tell you how I can help.
        </p>
        {status === "sent" ? (
          <div style={{ background:"rgba(78,173,106,0.1)", border:"1px solid rgba(78,173,106,0.3)", padding:"32px 40px", textAlign:"center" }}>
            <div style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"24px", color:"#4ead6a", marginBottom:"8px" }}>Message received. ✓</div>
            <div style={{ fontFamily:"var(--font-dm-sans)", fontSize:"13px", color:"rgba(255,255,255,0.4)" }}>I&apos;ll get back to you within 24 hours.</div>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            <div className="form-col-2" style={{ display:"grid", gap:"12px" }}>
              <input style={inputStyle} placeholder="Your name *" value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} onFocus={e => { e.currentTarget.style.borderColor="rgba(168,85,247,0.5)"; }} onBlur={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; }} />
              <input style={inputStyle} placeholder="Email address *" type="email" value={form.email} onChange={e => setForm(f => ({...f, email:e.target.value}))} onFocus={e => { e.currentTarget.style.borderColor="rgba(168,85,247,0.5)"; }} onBlur={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; }} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
              <input style={inputStyle} placeholder="Company / Project name" value={form.company} onChange={e => setForm(f => ({...f, company:e.target.value}))} onFocus={e => { e.currentTarget.style.borderColor="rgba(168,85,247,0.5)"; }} onBlur={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; }} />
              <select style={{ ...inputStyle, cursor:"pointer" }} value={form.service} onChange={e => setForm(f => ({...f, service:e.target.value}))} onFocus={e => { e.currentTarget.style.borderColor="rgba(168,85,247,0.5)"; }} onBlur={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; }}>
                <option value="" style={{ background:"#0a0805" }}>Service area (optional)</option>
                {SERVICES.map(o => <option key={o.id} value={o.category} style={{ background:"#0a0805" }}>{o.category}</option>)}
              </select>
            </div>
            <textarea style={{ ...inputStyle, minHeight:"140px", resize:"vertical" }} placeholder="Tell me about your project. What are you building? What problem needs solving? *" value={form.message} onChange={e => setForm(f => ({...f, message:e.target.value}))} onFocus={e => { e.currentTarget.style.borderColor="rgba(168,85,247,0.5)"; }} onBlur={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; }} />
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"8px" }}>
              <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"9px", color:"rgba(255,255,255,0.2)", letterSpacing:"0.08em" }}>
                Or email directly: <span style={{ color:"rgba(168,85,247,0.7)" }}>leviskibirie2110@gmail.com</span>
              </div>
              <button onClick={handleSubmit} disabled={status==="sending"}
                style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"11px", letterSpacing:"0.12em", textTransform:"uppercase", background:status==="sending"?"rgba(124,58,237,0.5)":"#7c3aed", color:"white", padding:"13px 32px", border:"none", cursor:status==="sending"?"default":"pointer", transition:"all 0.2s", boxShadow:"0 0 24px rgba(124,58,237,0.3)" }}
                onMouseEnter={e => { if(status!=="sending"){ (e.currentTarget as HTMLElement).style.background="white"; (e.currentTarget as HTMLElement).style.color="#7c3aed"; }}}
                onMouseLeave={e => { if(status!=="sending"){ (e.currentTarget as HTMLElement).style.background="#7c3aed"; (e.currentTarget as HTMLElement).style.color="white"; }}}
              >{status==="sending"?"Sending...":status==="error"?"Try Again →":"Send Message →"}</button>
            </div>
            {status==="error" && <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"9px", color:"#e11d48", textAlign:"right" }}>Something went wrong. Email me directly.</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Work() {
  const [tab, setTab] = useState<"portfolio"|"services">("portfolio");
  const [active, setActive] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>
      <style>{`
        .proj-main-grid {
          grid-template-columns: 1fr;
          min-height: auto !important;
        }
        .proj-deep-grid {
          grid-template-columns: 1fr;
        }
        .form-col-2 {
          grid-template-columns: 1fr;
        }
        @media (min-width: 700px) {
          .proj-main-grid { grid-template-columns: 1fr 1fr; min-height: 420px !important; }
          .proj-deep-grid { grid-template-columns: 1fr 1fr; }
          .form-col-2     { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
      <div style={{ background:"var(--bg)", paddingTop:"clamp(96px,12vw,140px)", paddingBottom:"0", paddingLeft:"clamp(20px,5vw,48px)", paddingRight:"clamp(20px,5vw,48px)", borderBottom:"1px solid var(--border)" }}>
        <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"var(--purple)", textTransform:"uppercase", marginBottom:"16px" }}>// Work</div>
        <h1 style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"clamp(48px,7vw,88px)", lineHeight:0.92, letterSpacing:"-0.03em", color:"var(--text)", marginBottom:"20px" }}>
          What I&apos;ve Built<br /><span style={{ color:"var(--purple)" }}>& Made.</span>
        </h1>
        <p style={{ fontFamily:"var(--font-dm-sans)", fontSize:"15px", color:"var(--text-3)", maxWidth:"460px", lineHeight:1.8, marginBottom:"40px" }}>
          Production systems, AI tools, digital agencies, editorial design. Every project is real. Every metric is earned.
        </p>
        {/* ── TOGGLE ── */}
        <div style={{ display:"flex", alignItems:"center", gap:"16px", paddingBottom:"40px", flexWrap:"wrap" }}>
          <div style={{ display:"inline-flex", background:"#0c0a07", border:"1px solid rgba(255,255,255,0.12)", borderRadius:"5px", padding:"5px", gap:"4px" }}>
            {([
              { id:"portfolio", label:"Portfolio", sub:"5 Projects",   accent:"#7c3aed", glow:"rgba(124,58,237,0.45)" },
              { id:"services",  label:"Services",  sub:"36 Offerings", accent:"#d97706", glow:"rgba(217,119,6,0.45)" },
            ] as const).map(btn => {
              const on = tab === btn.id;
              return (
                <button key={btn.id} onClick={() => setTab(btn.id)}
                  style={{
                    position:"relative", border:"none", cursor:"pointer",
                    padding:"12px 20px 10px", borderRadius:"3px", overflow:"hidden",
                    background: on ? btn.accent : "transparent",
                    boxShadow: on ? `0 0 32px ${btn.glow}, 0 0 64px ${btn.glow.replace("0.45","0.15")}, inset 0 1px 0 rgba(255,255,255,0.2)` : "none",
                    transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={e => { if(!on)(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.07)"; }}
                  onMouseLeave={e => { if(!on)(e.currentTarget as HTMLElement).style.background="transparent"; }}
                >
                  {on && <div style={{ position:"absolute", top:0, left:"-120%", width:"70%", height:"100%", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)", animation:"shimmerSweep 2.4s ease-in-out infinite", pointerEvents:"none" }} />}
                  {on && <div style={{ position:"absolute", top:"9px", right:"11px", width:"5px", height:"5px", borderRadius:"50%", background:"rgba(255,255,255,0.9)", boxShadow:"0 0 8px white", animation:"blink 1.8s ease-in-out infinite" }} />}
                  <div style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"13px", letterSpacing:"0.04em", textTransform:"uppercase", color: on ? "#ffffff" : "rgba(255,255,255,0.55)", transition:"color 0.3s", lineHeight:1, marginBottom:"4px", position:"relative", zIndex:1 }}>{btn.label}</div>
                  <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"9px", letterSpacing:"0.16em", textTransform:"uppercase", color: on ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.32)", transition:"color 0.3s", position:"relative", zIndex:1 }}>{btn.sub}</div>
                </button>
              );
            })}
          </div>

          {tab === "portfolio" && (
            <div style={{ display:"flex", alignItems:"center", gap:"8px", animation:"nudgeDrift 2.8s ease-in-out infinite" }}>
              <div style={{ width:"32px", height:"1px", background:"linear-gradient(90deg, transparent, #d97706aa)" }} />
              <span style={{ fontFamily:"var(--font-syne-mono)", fontSize:"9px", letterSpacing:"0.16em", textTransform:"uppercase", color:"#d97706", whiteSpace:"nowrap" }}>See what I offer →</span>
            </div>
          )}
        </div>
      </div>

      {tab === "portfolio" && (
        <>
          <div style={{ background:"var(--bg)", padding:`20px clamp(16px,4vw,48px) 24px`, borderBottom:"1px solid var(--border)" }}>
            <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
              {CATS.map(c => (
                <button key={c} onClick={() => setActive(c)}
                  style={{ fontFamily:"var(--font-syne-mono)", fontSize:"10px", letterSpacing:"0.15em", textTransform:"uppercase", padding:"8px 14px", background:active===c?"var(--purple)":"transparent", border:`1px solid ${active===c?"var(--purple)":"var(--border)"}`, color:active===c?"white":"var(--text-3)", cursor:"pointer", transition:"all 0.2s", borderRadius:"2px" }}
                >{c}</button>
              ))}
            </div>
          </div>
          <div style={{ background:"var(--bg)", padding:`clamp(28px,5vw,56px) clamp(16px,4vw,48px) 80px`, display:"flex", flexDirection:"column", gap:"clamp(32px,5vw,56px)" }}>
            {filtered.map((p, idx) => (
              <ProjectCard key={p.id} p={p} idx={idx} expanded={expanded===p.id} onToggle={() => setExpanded(expanded===p.id?null:p.id)} />
            ))}
          </div>
          <div style={{ background:"#0a0805", textAlign:"center", padding:`clamp(48px,8vw,80px) clamp(16px,4vw,48px)`, borderTop:"1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(168,85,247,0.6)", textTransform:"uppercase", marginBottom:"16px" }}>// Next Mission</div>
            <h2 style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"clamp(32px,5vw,60px)", lineHeight:1, letterSpacing:"-0.02em", color:"white", marginBottom:"32px" }}>
              Want to be<br /><span style={{ color:"#a855f7" }}>the next project?</span>
            </h2>
            <button onClick={() => setTab("services")}
              style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", background:"#7c3aed", color:"white", padding:"15px 36px", border:"none", cursor:"pointer", boxShadow:"0 0 32px rgba(124,58,237,0.35)", transition:"all 0.25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="white"; (e.currentTarget as HTMLElement).style.color="#7c3aed"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="#7c3aed"; (e.currentTarget as HTMLElement).style.color="white"; }}
            >See What I Offer →</button>
          </div>
        </>
      )}

      {tab === "services" && (
        <>
          <div style={{ background:"var(--bg)", padding:"clamp(16px,3vw,32px) clamp(16px,4vw,48px)", borderBottom:"1px solid var(--border)" }}>
            <div style={{ display:"flex", gap:"clamp(12px,3vw,24px)", alignItems:"center", flexWrap:"wrap" }}>
              {[{v:"7",l:"Service areas"},{v:"36",l:"Specific services"},{v:"4+",l:"Years shipping"}].map(s => (
                <div key={s.l} style={{ display:"flex", gap:"8px", alignItems:"baseline" }}>
                  <span style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"clamp(20px,4vw,28px)", color:"var(--purple)", lineHeight:1 }}>{s.v}</span>
                  <span style={{ fontFamily:"var(--font-syne-mono)", fontSize:"9px", color:"var(--text-4)", letterSpacing:"0.12em", textTransform:"uppercase", whiteSpace:"nowrap" }}>{s.l}</span>
                </div>
              ))}
              {!isMobile && <div style={{ marginLeft:"auto", fontFamily:"var(--font-syne-mono)", fontSize:"9px", color:"var(--text-4)", letterSpacing:"0.1em", maxWidth:"280px", textAlign:"right", lineHeight:1.7 }}>Remote-first. Async-friendly. Nairobi → World.</div>}
            </div>
          </div>
          {SERVICES.map((s, i) => <ServiceBand key={s.id} s={s} idx={i} />)}
          <LeadForm />
        </>
      )}

      <style>{`
        @keyframes blink        { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes shimmerSweep { 0%{left:-120%} 60%,100%{left:160%} }
        @keyframes nudgeDrift   { 0%,100%{transform:translateX(0);opacity:0.9} 50%{transform:translateX(7px);opacity:1} }
        * { cursor: none !important; }
      `}</style>
    </div>
  );
}
