"use client";
import { useState, useEffect, useRef } from "react";

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
    desc: "Multi-tenant residential property management SaaS. Built solo from zero — every line of architecture, every payment flow, every automation. 170+ units. KSH 1.5M/month flowing through Paystack webhooks.",
    challenge: "How do you build a system landlords trust with their entire rental income — from zero, alone, in 6 months?",
    solution: "Database-driven architecture with monthly_bills as single source of truth. Automated lease expiry, recurring charges, tenant unit-switching, and full email receipt pipeline.",
    tags: ["TypeScript", "Next.js 14", "PostgreSQL", "Prisma ORM", "Paystack", "VPS/Nginx", "Resend"],
    metrics: [{ val:"170+", label:"Active Units" },{ val:"KSH 1.5M", label:"Monthly Volume" },{ val:"Solo", label:"Built By" },{ val:"100%", label:"Uptime" }],
    github: "https://github.com/Levikib/makeja-homes",
  },
  {
    num: "02", id: "nse",
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
    num: "03", id: "shantech",
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
    num: "04", id: "chillminds",
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

const CATS = ["All", "Engineering", "AI & Data", "Agency", "Design"];
const STATUS_COLOR: Record<string, string> = { live:"#4ead6a", building:"#d97706", completed:"#a855f7", published:"#059669" };

// ── VISUALISATIONS ────────────────────────────────────────────────────────────

function MakejaViz({ accent }: { accent: string }) {
  const payments = [340,480,520,390,610,580,720,650,810,760,920,1050];
  const maxP = Math.max(...payments);
  return (
    <div style={{ padding:"28px", height:"100%", display:"flex", flexDirection:"column", gap:"18px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"0.2em", color:`${accent}80`, textTransform:"uppercase" }}>Dashboard · Live</div>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"22px", color:"white", lineHeight:1, marginTop:"4px" }}>KSH 1,521,400</div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"#4ead6a", marginTop:"2px" }}>↑ 8.4% this month</div>
        </div>
        <div style={{ display:"flex", gap:"5px" }}>
          {["#a855f7","#4ead6a","rgba(255,255,255,0.12)"].map((c,i) => <div key={i} style={{ width:"7px", height:"7px", borderRadius:"50%", background:c }} />)}
        </div>
      </div>

      <div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"7px", color:"rgba(255,255,255,0.25)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:"8px" }}>Monthly Transactions (KSH &apos;000)</div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:"4px", height:"75px" }}>
          {payments.map((v,i) => (
            <div key={i} style={{ flex:1, height:`${(v/maxP)*71}px`, background: i===payments.length-1 ? `linear-gradient(to top, ${accent}, ${accent}cc)` : `${accent}${Math.round(20+(v/maxP)*50).toString(16).padStart(2,"0")}`, borderRadius:"2px 2px 0 0", boxShadow:i===payments.length-1?`0 0 10px ${accent}60`:"none" }} />
          ))}
        </div>
        <div style={{ display:"flex", marginTop:"3px" }}>
          {["J","F","M","A","M","J","J","A","S","O","N","D"].map(m => (
            <div key={m} style={{ flex:1, textAlign:"center", fontFamily:"var(--font-mono)", fontSize:"6px", color:"rgba(255,255,255,0.18)" }}>{m}</div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"7px", color:"rgba(255,255,255,0.25)", textTransform:"uppercase", letterSpacing:"0.12em" }}>Unit Occupancy</div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"7px", color:"#4ead6a" }}>170/182</div>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"2px" }}>
          {Array.from({length:36}).map((_,i) => (
            <div key={i} style={{ width:"13px", height:"13px", borderRadius:"2px", background: i<34 ? i%9===0?`${accent}cc`:"#4ead6a50" : "rgba(255,255,255,0.05)" }} />
          ))}
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"7px", color:"rgba(255,255,255,0.18)", alignSelf:"center", marginLeft:"4px" }}>+134</div>
        </div>
      </div>

      <div style={{ display:"flex", gap:"8px", marginTop:"auto" }}>
        {[{l:"Tenants",v:"247",c:accent},{l:"Bills Due",v:"18",c:"#d97706"},{l:"Paid",v:"11",c:"#4ead6a"}].map(s => (
          <div key={s.l} style={{ flex:1, background:"rgba(255,255,255,0.04)", borderRadius:"4px", padding:"8px 10px", border:`1px solid ${s.c}20` }}>
            <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"18px", color:s.c, lineHeight:1 }}>{s.v}</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"7px", color:"rgba(255,255,255,0.25)", marginTop:"2px" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NseViz({ accent }: { accent: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [price, setPrice] = useState(142.5);
  useEffect(() => { const t = setInterval(() => setPrice(p => parseFloat((p+(Math.random()-0.48)*2).toFixed(2))), 1200); return () => clearInterval(t); }, []);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const W = canvas.width, H = canvas.height;
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
    <div style={{ padding:"28px", height:"100%", display:"flex", flexDirection:"column", gap:"14px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"0.15em", color:`${accent}80`, textTransform:"uppercase" }}>NSE:SCOM · Live</div>
          <div style={{ display:"flex", alignItems:"baseline", gap:"8px", marginTop:"3px" }}>
            <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"26px", color:"white" }}>{price.toFixed(2)}</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"#4ead6a" }}>+2.14%</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:"3px" }}>
          {["1D","1W","1M","1Y"].map((t,i) => (
            <div key={t} style={{ fontFamily:"var(--font-mono)", fontSize:"8px", padding:"2px 7px", background:i===2?`${accent}25`:"transparent", border:`1px solid ${i===2?accent+"50":"rgba(255,255,255,0.08)"}`, color:i===2?accent:"rgba(255,255,255,0.25)", cursor:"pointer" }}>{t}</div>
          ))}
        </div>
      </div>
      <canvas ref={canvasRef} width={420} height={130} style={{ width:"100%", height:"130px" }} />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"6px" }}>
        {[{n:"RSI",v:"58.4",s:"Neutral",c:accent},{n:"MACD",v:"+1.23",s:"Bullish",c:"#4ead6a"},{n:"Vol",v:"2.4M",s:"Above avg",c:"#a855f7"}].map(ind => (
          <div key={ind.n} style={{ background:"rgba(255,255,255,0.04)", borderRadius:"4px", padding:"9px", border:`1px solid ${ind.c}20` }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"7px", color:"rgba(255,255,255,0.25)", letterSpacing:"0.1em" }}>{ind.n}</div>
            <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"16px", color:ind.c, marginTop:"2px" }}>{ind.v}</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"7px", color:"rgba(255,255,255,0.2)", marginTop:"1px" }}>{ind.s}</div>
          </div>
        ))}
      </div>
      <div style={{ background:`${accent}12`, border:`1px solid ${accent}25`, borderRadius:"4px", padding:"10px 14px", display:"flex", gap:"8px" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:accent, flexShrink:0, marginTop:"1px" }}>AI →</div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"rgba(255,255,255,0.4)", lineHeight:1.6 }}>SCOM consolidating above 138 support. Volume confirms accumulation. Watch 145 resistance.</div>
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
    <div ref={ref} style={{ padding:"28px", height:"100%", display:"flex", flexDirection:"column", gap:"16px" }}>
      <div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"0.15em", color:`${accent}80`, textTransform:"uppercase" }}>Engagement Funnel</div>
        <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"22px", color:"white", marginTop:"4px" }}>250K+ Engagements</div>
      </div>
      {funnel.map((f,i) => (
        <div key={f.l}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"5px" }}>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"rgba(255,255,255,0.4)", letterSpacing:"0.06em" }}>{f.l}</span>
            <span style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"11px", color:f.c }}>{f.v}</span>
          </div>
          <div style={{ height:"5px", background:"rgba(255,255,255,0.05)", borderRadius:"3px", overflow:"hidden" }}>
            <div style={{ height:"100%", width:animated?`${f.pct}%`:"0%", background:`linear-gradient(90deg,${f.c}88,${f.c})`, borderRadius:"3px", transition:`width 1.2s ${i*0.18}s cubic-bezier(0.16,1,0.3,1)`, boxShadow:`0 0 6px ${f.c}50` }} />
          </div>
        </div>
      ))}
      <div style={{ marginTop:"8px" }}>
        {[{n:"Hotel Digital Transform",r:"Web + Social"},{n:"Retail Fashion Brand",r:"Meta Ads + CRM"},{n:"Real Estate Co.",r:"Full-Stack Web"},{n:"F&B Brand",r:"Social Strategy"}].map((c,i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
            <span style={{ fontFamily:"var(--font-body)", fontSize:"11px", color:"rgba(255,255,255,0.5)" }}>{c.n}</span>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:accent }}>{c.r}</span>
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
    <div style={{ padding:"28px", height:"100%", display:"flex", flexDirection:"column", gap:"16px" }}>
      <div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"0.15em", color:`${accent}80`, textTransform:"uppercase" }}>Editorial System</div>
        <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"22px", color:"white", marginTop:"4px" }}>72 Pages Solo</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"7px" }}>
        {spreads.map(s => (
          <div key={s.title} style={{ aspectRatio:"1.41", borderRadius:"3px", background:`linear-gradient(135deg,${s.col}25,${s.col}08)`, border:`1px solid ${s.col}25`, padding:"9px", display:"flex", flexDirection:"column", justifyContent:"space-between", overflow:"hidden", position:"relative" }}>
            <div style={{ position:"absolute", top:"35%", left:"8%", right:"8%", height:"1px", background:`${s.col}25` }} />
            <div style={{ position:"absolute", top:"52%", left:"8%", right:"35%", height:"1px", background:`${s.col}18` }} />
            <div style={{ position:"absolute", top:"62%", left:"8%", right:"25%", height:"1px", background:`${s.col}18` }} />
            <div style={{ position:"absolute", top:"10%", right:"8%", width:"28%", bottom:"10%", background:`${s.col}12`, borderRadius:"2px" }} />
            <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"10px", color:s.col, lineHeight:1.2, position:"relative", zIndex:1 }}>{s.title}</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"6px", color:"rgba(255,255,255,0.25)", letterSpacing:"0.1em", position:"relative", zIndex:1 }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"7px", color:"rgba(255,255,255,0.2)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"5px" }}>Colour Systems</div>
        <div style={{ display:"flex", gap:"2px", marginBottom:"3px" }}>{p1.map(c => <div key={c} style={{ flex:1, height:"17px", background:c, borderRadius:"1px" }} />)}</div>
        <div style={{ display:"flex", gap:"2px" }}>{p2.map(c => <div key={c} style={{ flex:1, height:"17px", background:c, borderRadius:"1px" }} />)}</div>
      </div>
      <div style={{ display:"flex", gap:"6px", marginTop:"auto" }}>
        {[{v:"2",l:"Volumes"},{v:"72",l:"Pages"},{v:"6",l:"Sections"},{v:"∞",l:"Impact"}].map(s => (
          <div key={s.l} style={{ flex:1, textAlign:"center", background:`${accent}10`, borderRadius:"4px", padding:"8px 4px", border:`1px solid ${accent}20` }}>
            <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"16px", color:accent }}>{s.v}</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"7px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.08em", marginTop:"1px" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const VIZMAP: Record<string, React.FC<{ accent: string }>> = {
  makeja: MakejaViz,
  nse: NseViz,
  shantech: ShantechViz,
  chillminds: ChillMindsViz,
};

// ── PROJECT CARD ──────────────────────────────────────────────────────────────

function ProjectCard({ p, idx, expanded, onToggle }: {
  p: typeof PROJECTS[0];
  idx: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const Viz = VIZMAP[p.id];
  const isEven = idx % 2 === 0;
  // even rows: details LEFT, viz RIGHT
  // odd rows:  viz LEFT, details RIGHT

  const detailsPanel = (
    <div style={{ padding:"44px 48px", display:"flex", flexDirection:"column", justifyContent:"space-between", background: isEven ? "#ffffff" : "var(--bg-2)" }}>
      <div>
        <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"80px", color:`${p.accent}10`, lineHeight:1, marginBottom:"-18px", letterSpacing:"-0.05em", userSelect:"none" }}>{p.num}</div>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"14px" }}>
          <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:STATUS_COLOR[p.status]??p.accent, display:"block", animation:p.status==="live"?"blink 2s ease-in-out infinite":"none", flexShrink:0 }} />
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.16em", textTransform:"uppercase", color:STATUS_COLOR[p.status]??p.accent }}>{p.statusLabel}</span>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"var(--text-4)" }}>·</span>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"var(--text-4)" }}>{p.year}</span>
        </div>
        <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(28px,3vw,42px)", letterSpacing:"-0.02em", color:"var(--text)", lineHeight:1, marginBottom:"6px" }}>{p.name}</h2>
        <div style={{ fontFamily:"var(--font-body)", fontSize:"13px", color:p.accent, marginBottom:"18px", fontStyle:"italic" }}>{p.tagline}</div>
        <p style={{ fontFamily:"var(--font-body)", fontSize:"13px", color:"var(--text-3)", lineHeight:1.85, marginBottom:"20px", maxWidth:"500px" }}>{p.desc}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
          {p.tags.map(t => (
            <span key={t} style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.05em", color:"var(--text-3)", background: isEven ? "var(--bg-2)" : "#ffffff", border:"1px solid var(--border)", padding:"4px 9px" }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ marginTop:"32px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"8px", marginBottom:"20px" }}>
          {p.metrics.map(m => (
            <div key={m.label} style={{ background:`${p.accent}08`, border:`1px solid ${p.accent}20`, padding:"11px 8px", textAlign:"center" }}>
              <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"15px", color:p.accent, lineHeight:1, marginBottom:"4px" }}>{m.val}</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"7px", color:"var(--text-4)", letterSpacing:"0.1em", textTransform:"uppercase" }}>{m.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:"8px" }}>
          <button onClick={onToggle}
            style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.1em", textTransform:"uppercase", background:"transparent", border:`1px solid ${p.accent}60`, color:p.accent, padding:"9px 18px", cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background=`${p.accent}10`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; }}
          >{expanded ? "Show Less ↑" : "Deep Dive →"}</button>
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--text-3)", textDecoration:"none", padding:"9px 18px", border:"1px solid var(--border)", transition:"all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color="var(--text)"; (e.currentTarget as HTMLElement).style.borderColor="var(--text)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color="var(--text-3)"; (e.currentTarget as HTMLElement).style.borderColor="var(--border)"; }}
            >GitHub ↗</a>
          )}
        </div>
      </div>
    </div>
  );

  const vizPanel = (
    <div style={{ background:p.vizBg, position:"relative", overflow:"hidden", minHeight:"420px" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(${p.accent}12 1px, transparent 1px)`, backgroundSize:"20px 20px", opacity:0.7, pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"220px", height:"220px", background:`radial-gradient(circle, ${p.accent}15, transparent 70%)`, filter:"blur(40px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-20px", left:"-20px", width:"150px", height:"150px", background:`radial-gradient(circle, ${p.accent}08, transparent 70%)`, filter:"blur(30px)", pointerEvents:"none" }} />
      <div style={{ position:"relative", zIndex:1, height:"100%" }}>
        <Viz accent={p.accent} />
      </div>
    </div>
  );

  return (
    <div style={{ border:"1px solid var(--border)", overflow:"hidden", boxShadow:"0 2px 24px rgba(0,0,0,0.06)" }}>
      {/* Accent top stripe */}
      <div style={{ height:"3px", background:`linear-gradient(90deg, ${p.accent}, ${p.accent}40, transparent)` }} />

      {/* Two-column layout — order flips on odd rows */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"420px" }}>
        <div style={{ order: isEven ? 1 : 2 }}>{detailsPanel}</div>
        <div style={{ order: isEven ? 2 : 1 }}>{vizPanel}</div>
      </div>

      {/* Deep dive expansion */}
      {expanded && (
        <div style={{ background:`${p.accent}06`, borderTop:`1px solid ${p.accent}20`, padding:"36px 48px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"52px" }}>
          <div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:p.accent, textTransform:"uppercase", marginBottom:"12px" }}>// The Challenge</div>
            <p style={{ fontFamily:"var(--font-body)", fontSize:"13px", color:"var(--text-3)", lineHeight:1.9, fontStyle:"italic", borderLeft:`2px solid ${p.accent}40`, paddingLeft:"16px" }}>{p.challenge}</p>
          </div>
          <div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:p.accent, textTransform:"uppercase", marginBottom:"12px" }}>// The Solution</div>
            <p style={{ fontFamily:"var(--font-body)", fontSize:"13px", color:"var(--text-3)", lineHeight:1.9 }}>{p.solution}</p>
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
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>

      {/* ── HERO ── */}
      <div style={{ background:"var(--bg)", paddingTop:"140px", paddingBottom:"72px", paddingLeft:"48px", paddingRight:"48px", borderBottom:"1px solid var(--border)" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"var(--purple)", textTransform:"uppercase", marginBottom:"16px" }}>// Selected Work</div>
        <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(48px,7vw,88px)", lineHeight:0.92, letterSpacing:"-0.03em", color:"var(--text)", marginBottom:"20px" }}>
          What I&apos;ve Built<br /><span style={{ color:"var(--purple)" }}>& Made.</span>
        </h1>
        <p style={{ fontFamily:"var(--font-body)", fontSize:"15px", color:"var(--text-3)", maxWidth:"460px", lineHeight:1.8, marginBottom:"40px" }}>
          Production systems, AI tools, digital agencies, editorial design. Every project is real. Every metric is earned.
        </p>
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setActive(c)}
              style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.15em", textTransform:"uppercase", padding:"8px 18px", background:active===c?"var(--purple)":"transparent", border:`1px solid ${active===c?"var(--purple)":"var(--border)"}`, color:active===c?"white":"var(--text-3)", cursor:"pointer", transition:"all 0.2s", borderRadius:"2px" }}
            >{c}</button>
          ))}
        </div>
      </div>

      {/* ── PROJECT LIST — white space gap between each card ── */}
      <div style={{ background:"var(--bg)", padding:"56px 48px 80px", display:"flex", flexDirection:"column", gap:"56px" }}>
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

      {/* ── BOTTOM CTA ── */}
      <div style={{ background:"#0a0805", textAlign:"center", padding:"80px 48px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(168,85,247,0.6)", textTransform:"uppercase", marginBottom:"16px" }}>// Next Mission</div>
        <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(32px,5vw,60px)", lineHeight:1, letterSpacing:"-0.02em", color:"white", marginBottom:"32px" }}>
          Want to be<br /><span style={{ color:"#a855f7" }}>the next project?</span>
        </h2>
        <a href="/#contact"
          style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", background:"#7c3aed", color:"white", padding:"15px 36px", textDecoration:"none", display:"inline-block", boxShadow:"0 0 32px rgba(124,58,237,0.35)", transition:"all 0.25s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="white"; (e.currentTarget as HTMLElement).style.color="#7c3aed"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="#7c3aed"; (e.currentTarget as HTMLElement).style.color="white"; }}
        >Let&apos;s Work Together →</a>
      </div>
    </div>
  );
}
