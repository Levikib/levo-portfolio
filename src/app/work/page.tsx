"use client";
import { useState, useEffect, useRef } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    num: "01", id: "makeja",
    name: "Makeja Homes",
    tagline: "The SaaS that moves real money.",
    category: "Engineering",
    status: "live", statusLabel: "Live in Production",
    year: "2024–Present", type: "SaaS Platform",
    accent: "#a855f7", accentDim: "rgba(168,85,247,0.12)",
    desc: "Multi-tenant residential property management SaaS. Built solo from zero — every line of architecture, every payment flow, every automation. 170+ units. KSH 1.5M/month flowing through Paystack webhooks.",
    challenge: "How do you build a system that landlords trust with their entire rental income — from zero, alone, in 6 months?",
    solution: "Database-driven architecture with monthly_bills as single source of truth. Automated lease expiry, recurring charges, tenant unit-switching, and full email receipt pipeline.",
    tags: ["TypeScript", "Next.js 14", "PostgreSQL", "Prisma ORM", "Paystack", "VPS/Nginx", "Resend", "Webhooks"],
    metrics: [
      { val: "170+", label: "Active Units", sub: "Residential" },
      { val: "KSH 1.5M", label: "Monthly Volume", sub: "Via Paystack" },
      { val: "Solo", label: "Built By", sub: "Architecture→Deploy" },
      { val: "100%", label: "Uptime", sub: "Production" },
    ],
    github: "https://github.com/Levikib/makeja-homes",
  },
  {
    num: "02", id: "nse",
    name: "NSE Research Agent",
    tagline: "AI that reads the market so you don't have to.",
    category: "AI & Data",
    status: "building", statusLabel: "In Development",
    year: "2026", type: "AI / Data Tool",
    accent: "#d97706", accentDim: "rgba(217,119,6,0.12)",
    desc: "Live data-fetching intelligence system for the Nairobi Securities Exchange. Ingests real-time market data, applies technical analysis, and surfaces trade insights. Decision support — not prediction.",
    challenge: "NSE data is fragmented, delayed, and mostly locked behind expensive terminals. Retail investors in Kenya are flying blind.",
    solution: "Python ingestion layer + TypeScript dashboard. Multiple financial API sources, technical indicator engine, and an AI summarisation layer that turns raw data into readable insight.",
    tags: ["Python", "TypeScript", "Financial APIs", "Data Analysis", "AI Summarisation", "Real-time Feed"],
    metrics: [
      { val: "Live", label: "NSE Data", sub: "Real-time feed" },
      { val: "AI", label: "Analysis", sub: "Insight layer" },
      { val: "10+", label: "Indicators", sub: "Technical" },
      { val: "2026", label: "Target Launch", sub: "Q2" },
    ],
    github: null,
  },
  {
    num: "03", id: "shantech",
    name: "ShanTech Agency",
    tagline: "Kenyan SMEs. Measurable results. Technology.",
    category: "Agency",
    status: "completed", statusLabel: "Completed · 2024–2025",
    year: "2024–2025", type: "Digital Agency",
    accent: "#e11d48", accentDim: "rgba(225,29,72,0.12)",
    desc: "Full-service digital agency helping Kenyan SMEs grow through technology. AI-powered CRM automation, social infrastructure, full-stack web delivery. 12+ clients, 250K+ engagement views delivered.",
    challenge: "Most Kenyan SMEs have no digital presence, no CRM, and no funnel — but have real products and real customers ready to buy.",
    solution: "GoHighLevel CRM deployment, Meta Ads API integration, automated follow-up sequences, and full web delivery. Measurable revenue impact across every client engagement.",
    tags: ["GoHighLevel", "Zapier", "Meta Ads API", "Automation", "Full-stack", "Social Strategy"],
    metrics: [
      { val: "12+", label: "Clients", sub: "SME & Corporate" },
      { val: "250K+", label: "Engagements", sub: "Delivered" },
      { val: "35%", label: "Traffic Lift", sub: "Avg across clients" },
      { val: "3×", label: "Lead Volume", sub: "Best case result" },
    ],
    github: null,
  },
  {
    num: "04", id: "chillminds",
    name: "Chill Minds Magazine",
    tagline: "72 pages. Two volumes. Built alone.",
    category: "Design",
    status: "published", statusLabel: "Vol. 1 & 2 Published",
    year: "2024–2025", type: "Editorial Design",
    accent: "#4ead6a", accentDim: "rgba(78,173,106,0.12)",
    desc: "A fully designed children's mental wellness and health magazine. Two volumes, 36 pages each. Complete design ownership — concept, layout, illustration direction, colour theory, typography, and production.",
    challenge: "Mental health for children in Kenya has almost no visual language. How do you make something kids actually want to read?",
    solution: "Vibrant editorial system with consistent grid, custom colour palette per section, illustration direction brief, and typography system built from scratch. Designed in InDesign, printed and distributed.",
    tags: ["InDesign", "Editorial Design", "Typography", "Colour Theory", "Illustration Direction", "Print Production"],
    metrics: [
      { val: "2", label: "Volumes", sub: "Published" },
      { val: "72", label: "Total Pages", sub: "Designed solo" },
      { val: "100%", label: "Design Own.", sub: "Concept to print" },
      { val: "Kids", label: "Audience", sub: "Mental wellness" },
    ],
    github: null,
  },
];

const CATS = ["All", "Engineering", "AI & Data", "Agency", "Design"];

// ─── VISUALISATIONS ─────────────────────────────────────────────────────────

function MakejaViz() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(x => x + 1), 2000); return () => clearInterval(t); }, []);
  const units = [92, 87, 78, 95, 83, 71, 88, 96, 74, 85, 91, 79];
  const payments = [340, 480, 520, 390, 610, 580, 720, 650, 810, 760, 920, 1050];
  const maxP = Math.max(...payments);

  return (
    <div style={{ width:"100%", height:"100%", padding:"28px", display:"flex", flexDirection:"column", gap:"20px" }}>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(168,85,247,0.6)", textTransform:"uppercase" }}>Makeja Homes · Dashboard</div>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"22px", color:"white", lineHeight:1, marginTop:"4px" }}>KSH 1,521,400</div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"rgba(168,85,247,0.7)", marginTop:"2px" }}>↑ 8.4% this month</div>
        </div>
        <div style={{ display:"flex", gap:"6px" }}>
          {["●","●","●"].map((d,i) => <div key={i} style={{ width:"8px", height:"8px", borderRadius:"50%", background:i===0?"#a855f7":i===1?"#4ead6a":"rgba(255,255,255,0.15)" }} />)}
        </div>
      </div>

      {/* Transaction bars */}
      <div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"0.15em", color:"rgba(255,255,255,0.3)", textTransform:"uppercase", marginBottom:"10px" }}>Monthly Transactions (KSH '000)</div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:"5px", height:"80px" }}>
          {payments.map((v, i) => (
            <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"3px" }}>
              <div style={{
                width:"100%",
                height: `${(v/maxP)*72}px`,
                background: i === payments.length-1
                  ? "linear-gradient(to top, #a855f7, #c084fc)"
                  : `rgba(168,85,247,${0.15 + (v/maxP)*0.4})`,
                borderRadius:"2px 2px 0 0",
                transition:"height 0.8s cubic-bezier(0.16,1,0.3,1)",
                boxShadow: i === payments.length-1 ? "0 0 12px rgba(168,85,247,0.5)" : "none",
              }} />
            </div>
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:"4px" }}>
          {["J","F","M","A","M","J","J","A","S","O","N","D"].map(m => (
            <div key={m} style={{ flex:1, textAlign:"center", fontFamily:"var(--font-mono)", fontSize:"7px", color:"rgba(255,255,255,0.2)" }}>{m}</div>
          ))}
        </div>
      </div>

      {/* Unit occupancy */}
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"0.15em", color:"rgba(255,255,255,0.3)", textTransform:"uppercase" }}>Unit Occupancy</div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"#4ead6a" }}>170 / 182 occupied</div>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"3px" }}>
          {Array.from({length:42}).map((_,i) => (
            <div key={i} style={{
              width:"14px", height:"14px", borderRadius:"2px",
              background: i < 40
                ? i % 7 === 0 ? "rgba(168,85,247,0.8)" : "rgba(78,173,106,0.5)"
                : "rgba(255,255,255,0.06)",
              transition: `background 0.3s ${i*0.02}s`,
            }} />
          ))}
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"rgba(255,255,255,0.2)", alignSelf:"center", marginLeft:"4px" }}>+128 more</div>
        </div>
      </div>

      {/* Live ticker */}
      <div style={{ marginTop:"auto", display:"flex", gap:"8px" }}>
        {[{l:"Tenants",v:"247",c:"#a855f7"},{l:"Bills Due",v:"18",c:"#d97706"},{l:"Paid Today",v:"11",c:"#4ead6a"}].map(s => (
          <div key={s.l} style={{ flex:1, background:"rgba(255,255,255,0.04)", borderRadius:"6px", padding:"8px 10px", border:`1px solid ${s.c}20` }}>
            <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"18px", color:s.c }}>{s.v}</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.08em" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NseViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [price, setPrice] = useState(142.5);

  useEffect(() => {
    const t = setInterval(() => setPrice(p => parseFloat((p + (Math.random()-0.48)*2).toFixed(2))), 1200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0,0,W,H);

    // Grid lines
    for (let i=0;i<5;i++) {
      const y = (H/5)*i + H/10;
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y);
      ctx.strokeStyle="rgba(255,255,255,0.04)"; ctx.lineWidth=1; ctx.stroke();
    }

    // Candles
    const candles = Array.from({length:20},(_,i)=>{
      const o=130+Math.sin(i*0.7)*15+Math.random()*8;
      const c=o+(Math.random()-0.45)*12;
      return { o, c, h:Math.max(o,c)+Math.random()*5, l:Math.min(o,c)-Math.random()*5 };
    });
    const hi=Math.max(...candles.map(c=>c.h)), lo=Math.min(...candles.map(c=>c.l));
    const cW=W/candles.length, scale=H*0.7/(hi-lo), base=H*0.85;
    const toY=(v:number)=>base-(v-lo)*scale;

    candles.forEach((c,i)=>{
      const x=i*cW+cW/2, bull=c.c>=c.o;
      const col=bull?"#4ead6a":"#e11d48";
      ctx.strokeStyle=col; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(x,toY(c.h)); ctx.lineTo(x,toY(c.l)); ctx.stroke();
      ctx.fillStyle=bull?col:`${col}cc`;
      const top=toY(Math.max(c.o,c.c)), ht=Math.max(2,Math.abs(toY(c.o)-toY(c.c)));
      ctx.fillRect(x-cW*0.3,top,cW*0.6,ht);
    });

    // Price line
    const pts=Array.from({length:60},(_,i)=>130+Math.sin(i*0.3)*12+i*0.2+Math.random()*4);
    ctx.beginPath();
    pts.forEach((p,i)=>{ const x=(i/pts.length)*W, y=toY(p); i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
    ctx.strokeStyle="#d97706"; ctx.lineWidth=1.5;
    ctx.shadowColor="#d97706"; ctx.shadowBlur=6; ctx.stroke(); ctx.shadowBlur=0;

  }, [price]);

  return (
    <div style={{ width:"100%", height:"100%", padding:"28px", display:"flex", flexDirection:"column", gap:"16px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(217,119,6,0.7)", textTransform:"uppercase" }}>NSE Research Agent</div>
          <div style={{ display:"flex", alignItems:"baseline", gap:"10px", marginTop:"4px" }}>
            <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"28px", color:"white" }}>{price.toFixed(2)}</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"11px", color:"#4ead6a" }}>+2.14%</div>
          </div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"rgba(255,255,255,0.25)", marginTop:"2px" }}>KSH · NSE:SCOM · Live</div>
        </div>
        <div style={{ display:"flex", gap:"4px" }}>
          {["1D","1W","1M","1Y"].map((t,i) => (
            <div key={t} style={{ fontFamily:"var(--font-mono)", fontSize:"9px", padding:"3px 8px", background:i===2?"rgba(217,119,6,0.2)":"transparent", border:`1px solid ${i===2?"rgba(217,119,6,0.4)":"rgba(255,255,255,0.08)"}`, color:i===2?"#d97706":"rgba(255,255,255,0.3)", cursor:"pointer" }}>{t}</div>
          ))}
        </div>
      </div>

      <canvas ref={canvasRef} width={440} height={140} style={{ width:"100%", height:"140px" }} />

      {/* Indicators */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"8px" }}>
        {[{n:"RSI",v:"58.4",s:"Neutral",c:"#d97706"},{n:"MACD",v:"+1.23",s:"Bullish",c:"#4ead6a"},{n:"Vol",v:"2.4M",s:"Above avg",c:"#a855f7"}].map(ind => (
          <div key={ind.n} style={{ background:"rgba(255,255,255,0.04)", borderRadius:"6px", padding:"10px", border:`1px solid ${ind.c}20` }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.1em" }}>{ind.n}</div>
            <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"16px", color:ind.c, marginTop:"2px" }}>{ind.v}</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"7px", color:"rgba(255,255,255,0.2)", marginTop:"1px" }}>{ind.s}</div>
          </div>
        ))}
      </div>

      {/* AI signal */}
      <div style={{ background:"rgba(217,119,6,0.08)", border:"1px solid rgba(217,119,6,0.2)", borderRadius:"6px", padding:"12px 14px", display:"flex", gap:"10px", alignItems:"flex-start" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"#d97706", letterSpacing:"0.1em", marginTop:"1px", flexShrink:0 }}>AI →</div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"rgba(255,255,255,0.5)", lineHeight:1.6 }}>SCOM showing consolidation above support at 138. Volume confirms accumulation. Watch for breakout above 145 resistance.</div>
      </div>
    </div>
  );
}

function ShantechViz() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setAnimated(true); }, {threshold:0.3});
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const funnel = [
    {l:"Impressions",v:250000,pct:100,c:"#e11d48"},
    {l:"Clicks",v:18500,pct:7.4,c:"#a855f7"},
    {l:"Leads",v:2200,pct:0.88,c:"#d97706"},
    {l:"Clients",v:148,pct:0.06,c:"#4ead6a"},
  ];
  const clients = [{n:"Hotel Digital Transform",r:"Web + Social"},{n:"Retail Fashion Brand",r:"Meta Ads + CRM"},{n:"Real Estate Co.",r:"Full Stack Web"},{n:"Food & Beverage",r:"Social Strategy"}];

  return (
    <div ref={ref} style={{ width:"100%", height:"100%", padding:"28px", display:"flex", flexDirection:"column", gap:"18px" }}>
      <div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(225,29,72,0.7)", textTransform:"uppercase" }}>ShanTech Agency · Funnel</div>
        <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"22px", color:"white", marginTop:"4px" }}>250K+ Engagements</div>
      </div>

      {funnel.map((f,i) => (
        <div key={f.l}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"5px" }}>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"rgba(255,255,255,0.45)", letterSpacing:"0.08em" }}>{f.l}</span>
            <span style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"12px", color:f.c }}>{f.v.toLocaleString()}</span>
          </div>
          <div style={{ height:"6px", background:"rgba(255,255,255,0.05)", borderRadius:"3px", overflow:"hidden" }}>
            <div style={{ height:"100%", width: animated ? `${f.pct === 100 ? 100 : Math.max(f.pct*3, 8)}%` : "0%", background:`linear-gradient(90deg, ${f.c}aa, ${f.c})`, borderRadius:"3px", transition:`width 1.2s ${i*0.2}s cubic-bezier(0.16,1,0.3,1)`, boxShadow:`0 0 8px ${f.c}60` }} />
          </div>
        </div>
      ))}

      <div style={{ marginTop:"4px" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"0.15em", color:"rgba(255,255,255,0.25)", textTransform:"uppercase", marginBottom:"8px" }}>Recent Engagements</div>
        {clients.map((c,i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
            <span style={{ fontFamily:"var(--font-body)", fontSize:"11px", color:"rgba(255,255,255,0.6)" }}>{c.n}</span>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"#e11d48", letterSpacing:"0.06em" }}>{c.r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChillMindsViz() {
  const spreads = [
    {title:"Mental Clarity", col:"#f472b6", sub:"Issue 01 · Cover"},
    {title:"Breathing Space", col:"#60a5fa", sub:"Issue 01 · Feature"},
    {title:"Growing Up", col:"#34d399", sub:"Issue 02 · Cover"},
    {title:"Feeling Safe", col:"#fbbf24", sub:"Issue 02 · Feature"},
  ];
  const palette1 = ["#f472b6","#60a5fa","#34d399","#fbbf24","#a78bfa","#f87171"];
  const palette2 = ["#6ee7b7","#93c5fd","#fca5a5","#fde68a","#c4b5fd","#86efac"];

  return (
    <div style={{ width:"100%", height:"100%", padding:"28px", display:"flex", flexDirection:"column", gap:"16px" }}>
      <div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(78,173,106,0.7)", textTransform:"uppercase" }}>Chill Minds · Editorial System</div>
        <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"22px", color:"white", marginTop:"4px" }}>72 Pages Designed Solo</div>
      </div>

      {/* Spread mockups */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
        {spreads.map((s) => (
          <div key={s.title} style={{ aspectRatio:"1.41", borderRadius:"4px", background:`linear-gradient(135deg, ${s.col}30, ${s.col}10)`, border:`1px solid ${s.col}30`, padding:"10px", display:"flex", flexDirection:"column", justifyContent:"space-between", overflow:"hidden", position:"relative" }}>
            {/* Simulated layout lines */}
            <div style={{ position:"absolute", top:"30%", left:"10%", right:"10%", height:"1px", background:`${s.col}30` }} />
            <div style={{ position:"absolute", top:"55%", left:"10%", right:"40%", height:"1px", background:`${s.col}20` }} />
            <div style={{ position:"absolute", top:"65%", left:"10%", right:"30%", height:"1px", background:`${s.col}20` }} />
            <div style={{ position:"absolute", top:"75%", left:"10%", right:"50%", height:"1px", background:`${s.col}20` }} />
            <div style={{ position:"absolute", top:"10%", right:"10%", width:"30%", bottom:"10%", background:`${s.col}15`, borderRadius:"2px" }} />
            <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"11px", color:`${s.col}`, lineHeight:1.2 }}>{s.title}</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"7px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.1em" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Colour palettes */}
      <div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"0.15em", color:"rgba(255,255,255,0.25)", textTransform:"uppercase", marginBottom:"8px" }}>Colour Systems</div>
        <div style={{ display:"flex", gap:"3px", marginBottom:"5px" }}>
          {palette1.map(c => <div key={c} style={{ flex:1, height:"20px", background:c, borderRadius:"2px" }} />)}
        </div>
        <div style={{ display:"flex", gap:"3px" }}>
          {palette2.map(c => <div key={c} style={{ flex:1, height:"20px", background:c, borderRadius:"2px" }} />)}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:"4px" }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"7px", color:"rgba(255,255,255,0.2)" }}>Vol. 1 Palette</div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"7px", color:"rgba(255,255,255,0.2)" }}>Vol. 2 Palette</div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display:"flex", gap:"8px", marginTop:"auto" }}>
        {[{v:"2",l:"Volumes"},{v:"72",l:"Pages"},{v:"6",l:"Sections"},{v:"∞",l:"Impact"}].map(s => (
          <div key={s.l} style={{ flex:1, textAlign:"center", background:"rgba(78,173,106,0.08)", borderRadius:"6px", padding:"8px 4px", border:"1px solid rgba(78,173,106,0.15)" }}>
            <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"18px", color:"#4ead6a" }}>{s.v}</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"7px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.08em", marginTop:"2px" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const VIZMAP: Record<string, React.FC> = {
  makeja: MakejaViz,
  nse: NseViz,
  shantech: ShantechViz,
  chillminds: ChillMindsViz,
};

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function Work() {
  const [active, setActive] = useState("All");
  const [expanded, setExpanded] = useState<string|null>(null);

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <div style={{ background:"#0a0805", minHeight:"100vh" }}>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{ background:"#0a0805", paddingTop:"140px", paddingBottom:"80px", paddingLeft:"48px", paddingRight:"48px" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(168,85,247,0.08) 1px, transparent 1px)", backgroundSize:"28px 28px", opacity:0.5, pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"50%", left:"30%", width:"600px", height:"400px", background:"radial-gradient(ellipse, rgba(168,85,247,0.06) 0%, transparent 70%)", filter:"blur(80px)", pointerEvents:"none", transform:"translateY(-50%)" }} />

        <div className="relative z-10">
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(168,85,247,0.6)", textTransform:"uppercase", marginBottom:"20px" }}>// Selected Work</div>
          <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(52px,8vw,100px)", lineHeight:0.92, letterSpacing:"-0.03em", color:"white", marginBottom:"24px" }}>
            What I&apos;ve<br /><span style={{ color:"#a855f7" }}>Built & Made</span>
          </h1>
          <p style={{ fontFamily:"var(--font-body)", fontSize:"16px", color:"rgba(255,255,255,0.4)", maxWidth:"480px", lineHeight:1.8, marginBottom:"48px" }}>
            Production systems, AI tools, digital agencies, editorial design. Every project is real. Every metric is earned.
          </p>

          {/* Category filter */}
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setActive(c)}
                style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.15em", textTransform:"uppercase", padding:"9px 20px", background: active===c ? "#a855f7" : "rgba(255,255,255,0.04)", border: active===c ? "1px solid #a855f7" : "1px solid rgba(255,255,255,0.08)", color: active===c ? "white" : "rgba(255,255,255,0.45)", cursor:"pointer", transition:"all 0.2s", borderRadius:"2px" }}
                onMouseEnter={e => { if(active!==c)(e.currentTarget as HTMLElement).style.borderColor="rgba(168,85,247,0.4)"; }}
                onMouseLeave={e => { if(active!==c)(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.08)"; }}
              >{c}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROJECT CARDS ── */}
      <div style={{ padding:"0 48px 120px" }}>
        {filtered.map((p, idx) => {
          const Viz = VIZMAP[p.id];
          const isExpanded = expanded === p.id;
          const isEven = idx % 2 === 0;

          return (
            <div key={p.id} style={{ marginBottom:"24px" }}>
              <div
                style={{ background:"rgba(255,255,255,0.02)", border:`1px solid rgba(255,255,255,0.07)`, overflow:"hidden", transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=`${p.accent}40`; (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.035)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.02)"; }}
              >
                {/* Accent top bar */}
                <div style={{ height:"2px", background:`linear-gradient(90deg, ${p.accent}, ${p.accent}40, transparent)` }} />

                {/* Main card layout */}
                <div style={{ display:"grid", gridTemplateColumns: isEven ? "1fr 1fr" : "1fr 1fr", minHeight:"360px" }}>

                  {/* VIZ panel */}
                  <div style={{ order: isEven ? 1 : 2, background:`linear-gradient(135deg, ${p.accentDim}, rgba(255,255,255,0.01))`, borderRight: isEven ? `1px solid rgba(255,255,255,0.06)` : "none", borderLeft: isEven ? "none" : `1px solid rgba(255,255,255,0.06)`, position:"relative", overflow:"hidden", minHeight:"360px" }}>
                    {/* Corner number */}
                    <div style={{ position:"absolute", top:"20px", right:"20px", fontFamily:"var(--font-display)", fontWeight:800, fontSize:"80px", color:"rgba(255,255,255,0.03)", lineHeight:1, pointerEvents:"none", zIndex:0 }}>{p.num}</div>
                    <div style={{ position:"relative", zIndex:1, height:"100%" }}>
                      <Viz />
                    </div>
                  </div>

                  {/* DETAILS panel */}
                  <div style={{ order: isEven ? 2 : 1, padding:"40px 44px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                    <div>
                      {/* Status + type */}
                      <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"16px" }}>
                        <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:p.accent, display:"block", animation: p.status==="live" ? "blink 2s ease-in-out infinite" : "none", flexShrink:0 }} />
                        <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase", color:p.accent }}>{p.statusLabel}</span>
                        <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"rgba(255,255,255,0.2)" }}>·</span>
                        <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"rgba(255,255,255,0.2)", letterSpacing:"0.08em" }}>{p.year}</span>
                      </div>

                      <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(28px,3.5vw,44px)", letterSpacing:"-0.02em", color:"white", lineHeight:1, marginBottom:"8px" }}>{p.name}</h2>
                      <div style={{ fontFamily:"var(--font-body)", fontSize:"13px", color:p.accent, marginBottom:"20px", fontStyle:"italic" }}>{p.tagline}</div>
                      <p style={{ fontFamily:"var(--font-body)", fontSize:"13px", color:"rgba(255,255,255,0.5)", lineHeight:1.85, marginBottom:"24px" }}>{p.desc}</p>

                      {/* Tags */}
                      <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"28px" }}>
                        {p.tags.map(t => (
                          <span key={t} style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.06em", color:"rgba(255,255,255,0.35)", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", padding:"4px 10px" }}>{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Metrics row */}
                    <div>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px", marginBottom:"24px" }}>
                        {p.metrics.map(m => (
                          <div key={m.label} style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${p.accent}20`, padding:"12px 10px", textAlign:"center" }}>
                            <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"16px", color:p.accent, lineHeight:1, marginBottom:"4px" }}>{m.val}</div>
                            <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"rgba(255,255,255,0.35)", letterSpacing:"0.1em", textTransform:"uppercase" }}>{m.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
                        <button onClick={() => setExpanded(isExpanded ? null : p.id)}
                          style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", background:"transparent", border:`1px solid ${p.accent}60`, color:p.accent, padding:"10px 20px", cursor:"pointer", transition:"all 0.2s" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background=`${p.accent}15`; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; }}
                        >{isExpanded ? "Show Less ↑" : "Deep Dive →"}</button>

                        {p.github && (
                          <a href={p.github} target="_blank" rel="noopener noreferrer"
                            style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", textDecoration:"none", padding:"10px 20px", border:"1px solid rgba(255,255,255,0.1)", transition:"all 0.2s" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color="white"; (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.3)"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.35)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.1)"; }}
                          >GitHub ↗</a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* EXPANDED deep dive */}
                {isExpanded && (
                  <div style={{ borderTop:`1px solid rgba(255,255,255,0.06)`, padding:"40px 44px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"48px", background:"rgba(0,0,0,0.2)" }}>
                    <div>
                      <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:p.accent, textTransform:"uppercase", marginBottom:"12px" }}>// The Challenge</div>
                      <p style={{ fontFamily:"var(--font-body)", fontSize:"14px", color:"rgba(255,255,255,0.55)", lineHeight:1.9, fontStyle:"italic", borderLeft:`2px solid ${p.accent}40`, paddingLeft:"16px" }}>{p.challenge}</p>
                    </div>
                    <div>
                      <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:p.accent, textTransform:"uppercase", marginBottom:"12px" }}>// The Solution</div>
                      <p style={{ fontFamily:"var(--font-body)", fontSize:"14px", color:"rgba(255,255,255,0.55)", lineHeight:1.9 }}>{p.solution}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── CTA ── */}
      <div style={{ textAlign:"center", padding:"80px 48px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(168,85,247,0.6)", textTransform:"uppercase", marginBottom:"16px" }}>// Next Mission</div>
        <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(32px,5vw,64px)", lineHeight:1, letterSpacing:"-0.02em", color:"white", marginBottom:"32px" }}>
          Want to be<br /><span style={{ color:"#a855f7" }}>the next project?</span>
        </h2>
        <a href="/#contact"
          style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"13px", letterSpacing:"0.1em", textTransform:"uppercase", background:"#a855f7", color:"white", padding:"16px 40px", textDecoration:"none", display:"inline-block", boxShadow:"0 0 40px rgba(168,85,247,0.35)", transition:"all 0.25s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="white"; (e.currentTarget as HTMLElement).style.color="#7c3aed"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="#a855f7"; (e.currentTarget as HTMLElement).style.color="white"; }}
        >Let&apos;s Work Together →</a>
      </div>
    </div>
  );
}
