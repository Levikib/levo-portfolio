"use client";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

// ── PROJECTS DATA ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    num: "01", id: "makeja",
    name: "Makeja Homes",
    tagline: "The SaaS that moves real money.",
    category: "Engineering",
    status: "live", statusLabel: "Live in Production",
    year: "2024–Present", type: "SaaS Platform",
    accent: "#7c3aed", vizBg: "#0f0a1e",
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
    accent: "#d97706", vizBg: "#0f0c05",
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
    accent: "#e11d48", vizBg: "#0f050a",
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
    accent: "#059669", vizBg: "#030f09",
    desc: "A fully designed children's mental wellness and health magazine. Two volumes, 36 pages each. Complete design ownership — concept, layout, illustration direction, colour theory, typography, and production.",
    challenge: "Mental health for children in Kenya has almost no visual language. How do you make something kids actually want to read?",
    solution: "Vibrant editorial system with consistent grid, custom colour palette per section, illustration direction brief, and typography system built from scratch. Designed in InDesign, printed and distributed.",
    tags: ["InDesign", "Editorial Design", "Typography", "Colour Theory", "Illustration Direction", "Print Production"],
    metrics: [{ val:"2", label:"Volumes" },{ val:"72", label:"Total Pages" },{ val:"100%", label:"Design Own." },{ val:"Kids", label:"Audience" }],
    github: null,
  },
];

// ── SERVICES DATA ─────────────────────────────────────────────────────────────
const SERVICE_CATEGORIES = [
  {
    id: "engineering",
    label: "Engineering & Development",
    icon: "⬡",
    accent: "#7c3aed",
    accentLight: "rgba(124,58,237,0.07)",
    accentBorder: "rgba(124,58,237,0.18)",
    desc: "Full-stack systems built to ship, scale, and survive production.",
    services: [
      { id:"s-fullstack", name:"Full-Stack Web Development", desc:"End-to-end web applications using Next.js, React, Node.js, and TypeScript. From landing page to complex SaaS — architected to scale.", tags:["Next.js","React","TypeScript","Node.js"] },
      { id:"s-saas", name:"SaaS Architecture & Development", desc:"Multi-tenant platforms with proper data isolation, subscription management, user roles, and billing. I've built one from zero to production.", tags:["Multi-tenant","Auth","Billing","Prisma ORM"] },
      { id:"s-api", name:"API Development & Integration", desc:"RESTful APIs, webhook systems, third-party integrations — Paystack, Resend, Daraja M-Pesa, any REST or GraphQL API you need connected.", tags:["REST APIs","Webhooks","GraphQL","OAuth"] },
      { id:"s-db", name:"Database Design & Optimisation", desc:"Schema design, query optimisation, migrations, and data modelling. PostgreSQL, MySQL, MongoDB — whatever fits the problem at hand.", tags:["PostgreSQL","Prisma","Migrations","Indexing"] },
      { id:"s-payment", name:"Payment Integration", desc:"Paystack, Stripe, M-Pesa Daraja. Full webhook verification, automated receipts, reconciliation logic, and billing automation pipelines.", tags:["Paystack","Stripe","M-Pesa","Webhooks"] },
      { id:"s-automation", name:"Backend Automation & Cron Jobs", desc:"Automated workflows, scheduled tasks, lease expiry systems, email sequences — any process that should run itself without manual intervention.", tags:["Cron Jobs","Automation","Email","Queues"] },
    ],
  },
  {
    id: "infra",
    label: "Infrastructure & DevOps",
    icon: "◈",
    accent: "#0891b2",
    accentLight: "rgba(8,145,178,0.07)",
    accentBorder: "rgba(8,145,178,0.18)",
    desc: "Your code runs somewhere. I make sure it runs well.",
    services: [
      { id:"s-vps", name:"VPS Setup & Configuration", desc:"Full Linux server setup — Nginx, SSL/TLS, firewall rules, environment configuration, process management with PM2. Clean and properly locked down.", tags:["Ubuntu","Nginx","PM2","Firewall"] },
      { id:"s-deploy", name:"Deployment & CI/CD Pipelines", desc:"Vercel, Railway, DigitalOcean, AWS EC2. Zero-downtime deployments, automated testing hooks, and multi-environment management.", tags:["Vercel","GitHub Actions","Docker","CI/CD"] },
      { id:"s-ssl", name:"Domain, DNS & SSL Configuration", desc:"Custom domains, CNAME and A record setup, SSL certificate provisioning via Let's Encrypt, subdomain routing, and DNS troubleshooting.", tags:["Cloudflare","Let's Encrypt","DNS","CNAME"] },
      { id:"s-hosting", name:"Web Hosting Setup & Management", desc:"Full hosting stack setup for businesses — shared hosting, VPS, or cloud. Ongoing management, uptime monitoring, and performance assurance.", tags:["cPanel","Hostinger","DigitalOcean","Monitoring"] },
      { id:"s-docker", name:"Containerisation & Orchestration", desc:"Docker-based deployments for consistent, reproducible environments. Container builds, docker-compose setups, and lightweight orchestration.", tags:["Docker","Docker Compose","Images","Environments"] },
      { id:"s-migration", name:"Server & Database Migration", desc:"Moving from one host to another, upgrading infrastructure, migrating databases — with zero data loss and minimal downtime.", tags:["Migration","Backup","Zero-downtime","PostgreSQL"] },
    ],
  },
  {
    id: "security",
    label: "Cybersecurity",
    icon: "⬢",
    accent: "#dc2626",
    accentLight: "rgba(220,38,38,0.07)",
    accentBorder: "rgba(220,38,38,0.18)",
    desc: "CEH certified. Security as architecture, not an afterthought.",
    services: [
      { id:"s-audit", name:"Web Application Security Audit", desc:"Review of your codebase and infrastructure for OWASP Top 10 vulnerabilities — injection, broken auth, XSS, CSRF, insecure configs, and more.", tags:["OWASP","Pen Testing","XSS","CSRF"] },
      { id:"s-pentest", name:"Penetration Testing", desc:"Ethical hacking of your systems to find what real attackers would find — before they do. Detailed report with prioritised remediation steps.", tags:["CEH","Ethical Hacking","Reporting","Remediation"] },
      { id:"s-hardening", name:"Server Hardening", desc:"Locking down Linux servers — SSH key authentication, fail2ban, UFW firewall, disabling unused ports, and hardened Nginx configuration.", tags:["Linux","fail2ban","UFW","SSH"] },
      { id:"s-authsys", name:"Auth & Access Control Systems", desc:"Implementing secure authentication — JWT, OAuth2, RBAC, MFA, session management. Getting auth right the first time, from the architecture up.", tags:["JWT","OAuth2","RBAC","MFA"] },
      { id:"s-compliance", name:"Security Consultation & Review", desc:"One-time or ongoing consultation on your security posture, threat model, and best practices tailored to your specific stack and context.", tags:["Consultation","Threat Model","Best Practices","ISC2 CC"] },
    ],
  },
  {
    id: "ai",
    label: "AI & Data",
    icon: "◎",
    accent: "#d97706",
    accentLight: "rgba(217,119,6,0.07)",
    accentBorder: "rgba(217,119,6,0.18)",
    desc: "AI tools that solve real problems, not demos that impress and die.",
    services: [
      { id:"s-aiagent", name:"AI Agent Development", desc:"Custom AI agents for research, automation, and decision support. Built with real data sources — like the NSE Research Agent currently in development.", tags:["LLM APIs","Python","Agents","Automation"] },
      { id:"s-aiintegration", name:"AI Integration into Existing Apps", desc:"Adding AI capabilities to your existing product — summarisation, classification, intelligent search, or chat — without rebuilding from scratch.", tags:["OpenAI","Anthropic","LangChain","Embeddings"] },
      { id:"s-dashboard", name:"Data Dashboards & Visualisation", desc:"Business intelligence dashboards with real-time data, interactive charts, KPIs, and drill-down capability. Built to replace spreadsheets permanently.", tags:["Recharts","D3.js","Real-time","PostgreSQL"] },
      { id:"s-scraping", name:"Data Scraping & Pipeline", desc:"Automated data collection, cleaning, transformation, and storage pipelines. NSE data, competitor monitoring, market research — anything web-accessible.", tags:["Python","Playwright","ETL","Scheduling"] },
      { id:"s-analysis", name:"Data Analysis & Reporting", desc:"One-off or recurring analysis — market trends, business metrics, cohort analysis. Delivered as polished reports or live interactive dashboards.", tags:["Python","Pandas","SQL","Reporting"] },
    ],
  },
  {
    id: "marketing",
    label: "Digital Marketing & Growth",
    icon: "◉",
    accent: "#e11d48",
    accentLight: "rgba(225,29,72,0.07)",
    accentBorder: "rgba(225,29,72,0.18)",
    desc: "Traffic, leads, and customers — built with systems, not luck.",
    services: [
      { id:"s-meta", name:"Meta Ads Management", desc:"Facebook and Instagram campaign strategy, creative direction, audience targeting, A/B testing, and performance optimisation. Every decision is data-driven.", tags:["Meta Ads","Facebook","Instagram","ROAS"] },
      { id:"s-crm", name:"CRM Setup & Automation", desc:"GoHighLevel, HubSpot, or custom CRM configuration. Lead pipelines, automated follow-ups, appointment booking, and complete sales funnel automation.", tags:["GoHighLevel","HubSpot","Automation","Zapier"] },
      { id:"s-social", name:"Social Media Strategy & Management", desc:"Content strategy, posting cadence, community management, and engagement growth. Built for real business outcomes, not vanity metrics.", tags:["Content Strategy","Scheduling","Analytics","Engagement"] },
      { id:"s-email", name:"Email Marketing & Automation", desc:"Email sequences, newsletters, drip campaigns, and transactional email setup. Resend, Mailchimp, or ConvertKit — delivered to inboxes, not spam folders.", tags:["Resend","Mailchimp","Sequences","Deliverability"] },
      { id:"s-seo", name:"SEO & Technical Optimisation", desc:"On-page SEO, technical audit, Core Web Vitals optimisation, structured data, sitemap, and meta strategy — built into the codebase, not bolted on later.", tags:["SEO","Core Web Vitals","Schema","Performance"] },
      { id:"s-funnel", name:"Sales Funnel Design & Build", desc:"Strategy, copy, and technical build of full sales funnels — landing pages, lead magnets, checkout, upsells, and post-purchase flows.", tags:["Funnels","Landing Pages","Conversion","Copywriting"] },
    ],
  },
  {
    id: "design",
    label: "Design & Editorial",
    icon: "◇",
    accent: "#059669",
    accentLight: "rgba(5,150,105,0.07)",
    accentBorder: "rgba(5,150,105,0.18)",
    desc: "Design that communicates — whether on screen or on paper.",
    services: [
      { id:"s-brand", name:"Brand Identity Design", desc:"Logo, colour system, typography, and brand guidelines. A complete visual language that works consistently across both digital and print applications.", tags:["Logo","Brand Guidelines","Typography","Colour"] },
      { id:"s-uiux", name:"UI/UX Design", desc:"Interface design for web and mobile — wireframes, high-fidelity mockups, component systems, and interactive prototypes. Designed to convert.", tags:["Figma","Wireframes","Prototypes","Components"] },
      { id:"s-print", name:"Print & Editorial Design", desc:"Magazines, books, brochures, flyers — complete print design with proper grids, bleed settings, and print-ready files. 72 pages already shipped.", tags:["InDesign","Print-ready","Editorial","Grid Systems"] },
      { id:"s-webdesign", name:"Web Design & Landing Pages", desc:"Visually striking web designs from concept to fully coded implementation — not just a Figma handoff that developers have to interpret.", tags:["Next.js","Tailwind","Animation","Conversion"] },
      { id:"s-social-design", name:"Social Media Design", desc:"Post templates, story formats, carousel layouts, and ad creatives. Consistent visual identity across all your channels.", tags:["Canva","Figma","Templates","Branding"] },
    ],
  },
  {
    id: "consulting",
    label: "Consulting & Strategy",
    icon: "◐",
    accent: "#7c3aed",
    accentLight: "rgba(124,58,237,0.07)",
    accentBorder: "rgba(124,58,237,0.18)",
    desc: "You don't always need more code. Sometimes you need clearer thinking.",
    services: [
      { id:"s-techstrat", name:"Technical Strategy & Architecture", desc:"Reviewing your current stack, proposing the right architecture for your next phase, and creating a realistic roadmap to get you there.", tags:["Architecture","Roadmap","Stack Review","Scalability"] },
      { id:"s-codeaudit", name:"Codebase & Product Audit", desc:"Deep review of an existing codebase or product — identifying tech debt, security gaps, performance bottlenecks, and quick high-value wins.", tags:["Code Review","Tech Debt","Performance","Security"] },
      { id:"s-digitaltransform", name:"Digital Transformation Consulting", desc:"Helping businesses move offline processes online — from manual workflows to automated systems. Hotels, agencies, real estate, retail.", tags:["Process Automation","SaaS","Integration","Change Mgmt"] },
      { id:"s-startup", name:"Startup Technical Advisory", desc:"For early-stage startups — helping founders make the right technology decisions before they become expensive and painful mistakes.", tags:["Startups","MVP","Tech Decisions","Fundraising"] },
      { id:"s-training", name:"Technical Training & Mentorship", desc:"One-on-one or team training on specific technologies, development practices, or security awareness. Practical, hands-on, not theoretical.", tags:["Training","Mentorship","Workshops","Teams"] },
    ],
  },
];

const PROJ_CATS = ["All", "Engineering", "AI & Data", "Agency", "Design"];
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
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.3 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, []);
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

const VIZMAP: Record<string, React.FC<{ accent: string }>> = { makeja:MakejaViz, nse:NseViz, shantech:ShantechViz, chillminds:ChillMindsViz };

// ── PROJECT CARD ──────────────────────────────────────────────────────────────
function ProjectCard({ p, idx, expanded, onToggle }: { p: typeof PROJECTS[0]; idx: number; expanded: boolean; onToggle: () => void; }) {
  const isMobile = useIsMobile();
  const Viz = VIZMAP[p.id];
  const isEven = idx % 2 === 0;
  const detailsPanel = (
    <div style={{ padding:isMobile?"24px 20px":"44px 48px", display:"flex", flexDirection:"column", justifyContent:"space-between", background: isEven ? "#ffffff" : "var(--bg-2)", height:"100%" }}>
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
          {p.tags.map(t => <span key={t} style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.05em", color:"var(--text-3)", background: isEven ? "var(--bg-2)" : "#ffffff", border:"1px solid var(--border)", padding:"4px 9px" }}>{t}</span>)}
        </div>
      </div>
      <div style={{ marginTop:"32px" }}>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(4,1fr)", gap:"8px", marginBottom:"20px" }}>
          {p.metrics.map(m => (
            <div key={m.label} style={{ background:`${p.accent}08`, border:`1px solid ${p.accent}20`, padding:"11px 8px", textAlign:"center" }}>
              <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"15px", color:p.accent, lineHeight:1, marginBottom:"4px" }}>{m.val}</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"7px", color:"var(--text-4)", letterSpacing:"0.1em", textTransform:"uppercase" }}>{m.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:"8px" }}>
          <button onClick={onToggle} style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.1em", textTransform:"uppercase", background:"transparent", border:`1px solid ${p.accent}60`, color:p.accent, padding:"9px 18px", cursor:"pointer", transition:"all 0.2s" }} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background=`${p.accent}10`;}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="transparent";}}>{expanded?"Show Less ↑":"Deep Dive →"}</button>
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--text-3)", textDecoration:"none", padding:"9px 18px", border:"1px solid var(--border)", transition:"all 0.2s" }} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="var(--text)";(e.currentTarget as HTMLElement).style.borderColor="var(--text)";}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="var(--text-3)";(e.currentTarget as HTMLElement).style.borderColor="var(--border)";}}>GitHub ↗</a>}
        </div>
      </div>
    </div>
  );
  const vizPanel = (
    <div style={{ background:p.vizBg, position:"relative", overflow:"hidden", minHeight:"420px" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(${p.accent}12 1px, transparent 1px)`, backgroundSize:"20px 20px", opacity:0.7, pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"220px", height:"220px", background:`radial-gradient(circle, ${p.accent}15, transparent 70%)`, filter:"blur(40px)", pointerEvents:"none" }} />
      <div style={{ position:"relative", zIndex:1, height:"100%" }}><Viz accent={p.accent} /></div>
    </div>
  );
  return (
    <div style={{ border:"1px solid var(--border)", overflow:"hidden", boxShadow:"0 2px 24px rgba(0,0,0,0.06)" }}>
      <div style={{ height:"3px", background:`linear-gradient(90deg, ${p.accent}, ${p.accent}40, transparent)` }} />
      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", minHeight:isMobile?"auto":"420px" }}>
        <div style={{ order: isEven ? 1 : 2 }}>{detailsPanel}</div>
        <div style={{ order: isEven ? 2 : 1 }}>{vizPanel}</div>
      </div>
      {expanded && (
        <div style={{ background:`${p.accent}06`, borderTop:`1px solid ${p.accent}20`, padding:isMobile?"24px 20px":"36px 48px", display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:isMobile?"32px":"52px" }}>
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

// ── SERVICES VIEW ─────────────────────────────────────────────────────────────
function ServicesView() {
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name:"", email:"", message:"" });
  const [formState, setFormState] = useState<"idle"|"sending"|"sent"|"error">("idle");

  const toggleService = (id: string) => {
    setSelected(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };

  const selectedNames = SERVICE_CATEGORIES
    .flatMap(cat => cat.services)
    .filter(s => selected.has(s.id))
    .map(s => s.name);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || selected.size === 0) return;
    setFormState("sending");
    try {
      const body = `Services of interest:\n${selectedNames.map(n=>`• ${n}`).join("\n")}\n\n${formData.message ? `Message:\n${formData.message}` : ""}`;
      const res = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ name:formData.name, email:formData.email, message:body }) });
      setFormState(res.ok ? "sent" : "error");
    } catch { setFormState("error"); }
  };

  const visibleCats = activeCategory === null
    ? SERVICE_CATEGORIES
    : SERVICE_CATEGORIES.filter(c => c.id === activeCategory);

  return (
    <div>
      {/* Intro strip + category pills */}
      <div style={{ background:"var(--bg)", padding:isMobile?"28px 20px":"40px 48px 32px", borderBottom:"1px solid var(--border)" }}>
        <p style={{ fontFamily:"var(--font-body)", fontSize:"15px", color:"var(--text-3)", maxWidth:"640px", lineHeight:1.85, marginBottom:"24px" }}>
          Everything I can do for your business — engineering, infrastructure, security, AI, marketing, design. Browse by category, select what you need, and I&apos;ll reach out within 24 hours.
        </p>
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
          <button onClick={() => setActiveCategory(null)}
            style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.12em", textTransform:"uppercase", padding:"7px 16px", background:activeCategory===null?"var(--text)":"transparent", border:`1px solid ${activeCategory===null?"var(--text)":"var(--border)"}`, color:activeCategory===null?"white":"var(--text-3)", cursor:"pointer", transition:"all 0.2s", borderRadius:"2px" }}>All Categories</button>
        {SERVICE_CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setActiveCategory(activeCategory===cat.id ? null : cat.id)}
            style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.12em", textTransform:"uppercase", padding:"7px 16px", background:activeCategory===cat.id?cat.accent:"transparent", border:`1px solid ${activeCategory===cat.id?cat.accent:"var(--border)"}`, color:activeCategory===cat.id?"white":"var(--text-3)", cursor:"pointer", transition:"all 0.2s", borderRadius:"2px" }}>{cat.label}</button>
        ))}
        </div>
      </div>

      {/* Service categories — alternating light / dark full-width bands */}
      <div>
        {visibleCats.map((cat, cidx) => {
          const isDark = cidx % 2 !== 0;
          const sectionBg    = isDark ? "#0a0805" : "var(--bg)";
          const headingCol   = isDark ? "white"   : "var(--text)";
          const subCol       = isDark ? "rgba(255,255,255,0.45)" : "var(--text-3)";
          const borderCol    = isDark ? "rgba(255,255,255,0.08)" : "var(--border)";
          const cardBg       = isDark ? "rgba(255,255,255,0.04)" : "#ffffff";
          const cardBgAlt    = isDark ? "rgba(255,255,255,0.02)" : "var(--bg-2)";
          const tagCol       = isDark ? "rgba(255,255,255,0.3)" : "var(--text-4)";
          const tagBorder    = isDark ? "rgba(255,255,255,0.08)" : "var(--border)";
          const svcNameCol   = isDark ? "rgba(255,255,255,0.9)" : "var(--text)";
          const svcDescCol   = isDark ? "rgba(255,255,255,0.45)" : "var(--text-3)";
          const checkBorder  = isDark ? "rgba(255,255,255,0.2)" : "var(--border)";
          const countBg      = isDark ? `${cat.accent}20` : cat.accentLight;
          const dividerCol   = isDark ? "rgba(255,255,255,0.06)" : "var(--border)";

          return (
            <div key={cat.id} style={{ background:sectionBg, padding:isMobile?"32px 20px":"56px 48px", borderBottom:`1px solid ${dividerCol}`, position:"relative", overflow:"hidden" }}>
              {/* Subtle background texture for dark sections */}
              {isDark && <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(${cat.accent}08 1px, transparent 1px)`, backgroundSize:"28px 28px", pointerEvents:"none" }} />}
              {isDark && <div style={{ position:"absolute", top:"-80px", right:"-60px", width:"320px", height:"320px", background:`radial-gradient(circle, ${cat.accent}10, transparent 70%)`, filter:"blur(80px)", pointerEvents:"none" }} />}

              <div style={{ position:"relative", zIndex:1 }}>
                {/* Category header */}
                <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"28px", paddingBottom:"20px", borderBottom:`1px solid ${borderCol}` }}>
                  <div style={{ width:"44px", height:"44px", background: isDark ? `${cat.accent}15` : cat.accentLight, border:`1px solid ${isDark ? `${cat.accent}30` : cat.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px", color:cat.accent, flexShrink:0 }}>{cat.icon}</div>
                  <div style={{ flex:1 }}>
                    <h3 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"24px", letterSpacing:"-0.01em", color:headingCol, lineHeight:1 }}>{cat.label}</h3>
                    <div style={{ fontFamily:"var(--font-body)", fontSize:"12px", color:subCol, marginTop:"4px" }}>{cat.desc}</div>
                  </div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:cat.accent, letterSpacing:"0.1em", background:countBg, border:`1px solid ${isDark ? `${cat.accent}30` : cat.accentBorder}`, padding:"5px 12px" }}>{cat.services.length} services</div>
                </div>

                {/* Service cards */}
                <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(3, 1fr)", gap:"10px" }}>
                  {cat.services.map((svc, si) => {
                    const isSel = selected.has(svc.id);
                    const bg = isSel ? (isDark ? `${cat.accent}18` : cat.accentLight) : (si % 2 === 0 ? cardBg : cardBgAlt);
                    const bd = isSel ? cat.accent : borderCol;
                    return (
                      <div key={svc.id} onClick={() => toggleService(svc.id)}
                        style={{ background:bg, border:`1.5px solid ${bd}`, padding:"20px 20px 18px", cursor:"pointer", transition:"all 0.18s", position:"relative", boxShadow: isSel ? `0 0 0 1px ${cat.accent}30, 0 4px 24px ${cat.accent}18` : "none" }}
                        onMouseEnter={e => { if (!isSel) { (e.currentTarget as HTMLElement).style.borderColor = isDark ? `${cat.accent}40` : cat.accentBorder; (e.currentTarget as HTMLElement).style.boxShadow = isDark ? `0 2px 16px rgba(0,0,0,0.3)` : "0 2px 12px rgba(0,0,0,0.06)"; } }}
                        onMouseLeave={e => { if (!isSel) { (e.currentTarget as HTMLElement).style.borderColor = borderCol; (e.currentTarget as HTMLElement).style.boxShadow = "none"; } }}
                      >
                        {/* Checkbox */}
                        <div style={{ position:"absolute", top:"16px", right:"16px", width:"18px", height:"18px", border:`1.5px solid ${isSel ? cat.accent : checkBorder}`, background: isSel ? cat.accent : "transparent", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.18s" }}>
                          {isSel && <span style={{ color:"white", fontSize:"11px", lineHeight:1, fontWeight:700 }}>✓</span>}
                        </div>
                        <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"14px", color: isSel ? cat.accent : svcNameCol, lineHeight:1.3, marginBottom:"8px", paddingRight:"28px", transition:"color 0.18s" }}>{svc.name}</div>
                        <div style={{ fontFamily:"var(--font-body)", fontSize:"11px", color:svcDescCol, lineHeight:1.75, marginBottom:"14px" }}>{svc.desc}</div>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:"4px" }}>
                          {svc.tags.map(t => <span key={t} style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color: isSel ? cat.accent : tagCol, background: isSel ? `${cat.accent}12` : "transparent", border:`1px solid ${isSel ? `${cat.accent}40` : tagBorder}`, padding:"2px 7px", transition:"all 0.18s" }}>{t}</span>)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── LEAD GEN FORM ── */}
      <div style={{ margin:isMobile?"0 0 0":"0 48px 80px", background:"var(--text)", padding:isMobile?"32px 20px":"56px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize:"24px 24px", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"400px", height:"400px", background:"radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)", filter:"blur(80px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-40px", left:"10%", width:"200px", height:"200px", background:"radial-gradient(circle, rgba(217,119,6,0.08), transparent 70%)", filter:"blur(50px)", pointerEvents:"none" }} />

        <div style={{ position:"relative", zIndex:1, display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:isMobile?"40px":"72px", alignItems:"start" }}>

          {/* Left: selection summary */}
          <div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(255,255,255,0.35)", textTransform:"uppercase", marginBottom:"12px" }}>// Your Selection</div>
            <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(22px,3vw,34px)", lineHeight:1.15, letterSpacing:"-0.02em", color:"white", marginBottom:"28px" }}>
              {selected.size === 0
                ? <>Select services above<br /><span style={{ color:"#a855f7" }}>to get started.</span></>
                : <>{selected.size} service{selected.size>1?"s":""} selected.<br /><span style={{ color:"#a855f7" }}>Let&apos;s talk.</span></>}
            </h2>

            {selected.size > 0 && (
              <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"28px", maxHeight:"240px", overflowY:"auto" }}>
                {selectedNames.map(name => (
                  <div key={name} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                    <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#a855f7", flexShrink:0 }} />
                    <span style={{ fontFamily:"var(--font-body)", fontSize:"13px", color:"rgba(255,255,255,0.65)" }}>{name}</span>
                  </div>
                ))}
              </div>
            )}

            {selected.size > 0 && (
              <button onClick={() => setSelected(new Set())}
                style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.1em", textTransform:"uppercase", background:"transparent", border:"1px solid rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.35)", padding:"7px 14px", cursor:"pointer", marginBottom:"28px" }}>
                Clear Selection
              </button>
            )}

            <div style={{ padding:"20px 24px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"0.15em", color:"rgba(255,255,255,0.3)", textTransform:"uppercase", marginBottom:"8px" }}>Response time</div>
              <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"20px", color:"white" }}>Within 24 hours</div>
              <div style={{ fontFamily:"var(--font-body)", fontSize:"12px", color:"rgba(255,255,255,0.35)", marginTop:"6px", lineHeight:1.65 }}>Every message is read personally. No templates, no autoresponders, no outsourcing. You get a real reply from me.</div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(255,255,255,0.35)", textTransform:"uppercase", marginBottom:"24px" }}>// Get In Touch</div>

            {formState === "sent" ? (
              <div style={{ textAlign:"center", padding:"48px 20px" }}>
                <div style={{ width:"56px", height:"56px", background:"rgba(78,173,106,0.15)", border:"1px solid rgba(78,173,106,0.3)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:"24px" }}>✓</div>
                <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"24px", color:"white", marginBottom:"8px" }}>Message sent.</div>
                <div style={{ fontFamily:"var(--font-body)", fontSize:"13px", color:"rgba(255,255,255,0.45)" }}>I&apos;ll be in touch within 24 hours.</div>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
                {[
                  { key:"name", label:"Your Name", placeholder:"Levis Kibirie", type:"text", required:true },
                  { key:"email", label:"Email Address", placeholder:"you@company.com", type:"email", required:true },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"0.15em", color:"rgba(255,255,255,0.35)", textTransform:"uppercase", display:"block", marginBottom:"7px" }}>
                      {field.label} {field.required && <span style={{ color:"#a855f7" }}>*</span>}
                    </label>
                    <input
                      type={field.type}
                      value={formData[field.key as keyof typeof formData]}
                      onChange={e => setFormData(p => ({...p, [field.key]: e.target.value}))}
                      placeholder={field.placeholder}
                      style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"white", fontFamily:"var(--font-body)", fontSize:"13px", padding:"13px 16px", outline:"none", boxSizing:"border-box", transition:"border-color 0.2s" }}
                      onFocus={e=>{e.target.style.borderColor="rgba(168,85,247,0.5)";}}
                      onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.1)";}}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"0.15em", color:"rgba(255,255,255,0.35)", textTransform:"uppercase", display:"block", marginBottom:"7px" }}>
                    Additional Context <span style={{ color:"rgba(255,255,255,0.2)", textTransform:"lowercase", letterSpacing:"normal" }}>(optional)</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData(p => ({...p, message: e.target.value}))}
                    placeholder="Tell me about your project, timeline, budget, or anything else that helps..."
                    rows={4}
                    style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"white", fontFamily:"var(--font-body)", fontSize:"13px", padding:"13px 16px", outline:"none", resize:"vertical", boxSizing:"border-box", lineHeight:1.7, transition:"border-color 0.2s" }}
                    onFocus={e=>{e.target.style.borderColor="rgba(168,85,247,0.5)";}}
                    onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.1)";}}
                  />
                </div>

                {formState === "error" && (
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"#f87171", padding:"10px 14px", background:"rgba(220,38,38,0.1)", border:"1px solid rgba(220,38,38,0.2)" }}>
                    Something went wrong. Email me directly at leviskibirie2110@gmail.com
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email || selected.size === 0 || formState === "sending"}
                  style={{
                    fontFamily:"var(--font-display)", fontWeight:800, fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase",
                    background: (!formData.name||!formData.email||selected.size===0) ? "rgba(255,255,255,0.07)" : "#7c3aed",
                    color: (!formData.name||!formData.email||selected.size===0) ? "rgba(255,255,255,0.25)" : "white",
                    border:"none", padding:"16px 24px", cursor: (!formData.name||!formData.email||selected.size===0) ? "not-allowed" : "pointer",
                    transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"16px",
                    boxShadow: (formData.name&&formData.email&&selected.size>0) ? "0 0 24px rgba(124,58,237,0.3)" : "none",
                  }}
                  onMouseEnter={e=>{if(formData.name&&formData.email&&selected.size>0)(e.currentTarget as HTMLElement).style.background="#6d28d9";}}
                  onMouseLeave={e=>{if(formData.name&&formData.email&&selected.size>0)(e.currentTarget as HTMLElement).style.background="#7c3aed";}}
                >
                  <span>
                    {formState==="sending" ? "Sending..." : selected.size===0 ? "Select services above first" : `Send Enquiry — ${selected.size} service${selected.size>1?"s":""} selected`}
                  </span>
                  {formState !== "sending" && selected.size > 0 && <span>→</span>}
                </button>

                <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"rgba(255,255,255,0.18)", lineHeight:1.6 }}>
                  Select at least one service + fill name and email to submit. No spam. No outsourcing. Just me.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function Work() {
  const isMobile = useIsMobile();
  const [view, setView] = useState<"portfolio"|"services">("portfolio");
  const [activeCat, setActiveCat] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const filtered = activeCat === "All" ? PROJECTS : PROJECTS.filter(p => p.category === activeCat);

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>

      {/* ── HERO ── */}
      <div style={{ background:"var(--bg)", paddingTop:"110px", paddingBottom:"40px", paddingLeft:isMobile?"20px":"48px", paddingRight:isMobile?"20px":"48px", borderBottom:"1px solid var(--border)" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"var(--purple)", textTransform:"uppercase", marginBottom:"16px" }}>// Work & Services</div>

        <div style={{ maxWidth:"680px" }}>
          <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(44px,6vw,80px)", lineHeight:0.92, letterSpacing:"-0.03em", color:"var(--text)", marginBottom:"16px" }}>
            {view === "portfolio"
              ? <>What I&apos;ve Built<br /><span style={{ color:"var(--purple)" }}>& Made.</span></>
              : <>What I Can<br /><span style={{ color:"var(--purple)" }}>Do For You.</span></>}
          </h1>
          <p style={{ fontFamily:"var(--font-body)", fontSize:"15px", color:"var(--text-3)", maxWidth:"460px", lineHeight:1.8, marginBottom:"32px" }}>
            {view === "portfolio"
              ? "Production systems, AI tools, digital agencies, editorial design. Every project is real. Every metric is earned."
              : "Engineering, infrastructure, security, AI, marketing, design. Select what you need — I'll handle the rest."}
          </p>

          {/* Toggle — left-aligned under description */}
          <div style={{ display:"flex", background:"var(--bg-2)", border:"1px solid var(--border)", padding:"4px", gap:"3px", width:isMobile?"100%":"auto" }}>
            <button onClick={() => setView("portfolio")}
              style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", padding:isMobile?"11px 12px":"11px 26px", flex:isMobile?"1":"none", background:view==="portfolio"?"var(--text)":"transparent", border:"none", color:view==="portfolio"?"white":"var(--text-3)", cursor:"pointer", transition:"all 0.25s", whiteSpace:"nowrap" }}>
              ◆ Work Portfolio
            </button>
            <button onClick={() => setView("services")}
              style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", padding:isMobile?"11px 12px":"11px 26px", flex:isMobile?"1":"none", background:view==="services"?"#7c3aed":"transparent", border:"none", color:view==="services"?"white":"var(--text-3)", cursor:"pointer", transition:"all 0.25s", whiteSpace:"nowrap" }}>
              ◈ Services
            </button>
          </div>
        </div>

        {/* Portfolio filter — only in portfolio view */}
        {view === "portfolio" && (
          <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginTop:"36px" }}>
            {PROJ_CATS.map(c => (
              <button key={c} onClick={() => setActiveCat(c)}
                style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.15em", textTransform:"uppercase", padding:"8px 18px", background:activeCat===c?"var(--purple)":"transparent", border:`1px solid ${activeCat===c?"var(--purple)":"var(--border)"}`, color:activeCat===c?"white":"var(--text-3)", cursor:"pointer", transition:"all 0.2s", borderRadius:"2px" }}>{c}</button>
            ))}
          </div>
        )}
      </div>

      {/* ── CONTENT ── */}
      {view === "portfolio" ? (
        <div style={{ background:"var(--bg)", padding:isMobile?"32px 20px 64px":"56px 48px 80px", display:"flex", flexDirection:"column", gap:isMobile?"40px":"56px" }}>
          {filtered.map((p, idx) => (
            <ProjectCard key={p.id} p={p} idx={idx} expanded={expanded===p.id} onToggle={() => setExpanded(expanded===p.id?null:p.id)} />
          ))}
        </div>
      ) : (
        <ServicesView />
      )}

      {/* ── CTA ── */}
      <div style={{ background:"#0a0805", textAlign:"center", padding:isMobile?"48px 20px":"80px 48px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(168,85,247,0.6)", textTransform:"uppercase", marginBottom:"16px" }}>// Next Mission</div>
        <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(32px,5vw,60px)", lineHeight:1, letterSpacing:"-0.02em", color:"white", marginBottom:"32px" }}>
          Want to be<br /><span style={{ color:"#a855f7" }}>the next project?</span>
        </h2>
        <a href="/#contact"
          style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", background:"#7c3aed", color:"white", padding:"15px 36px", textDecoration:"none", display:"inline-block", boxShadow:"0 0 32px rgba(124,58,237,0.35)", transition:"all 0.25s" }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="white";(e.currentTarget as HTMLElement).style.color="#7c3aed";}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#7c3aed";(e.currentTarget as HTMLElement).style.color="white";}}
        >Let&apos;s Work Together →</a>
      </div>
    </div>
  );
}
