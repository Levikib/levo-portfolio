"use client";
import { useState, useEffect, useRef } from "react";

const TIMELINE = [
  { year:"2017", title:"Software Development Certificate", org:"ICT Authority Kenya", type:"education", accent:"#7c3aed", desc:"First formal grounding in software engineering fundamentals. The start of everything." },
  { year:"2020", title:"Cybersecurity & Ethical Hacking", org:"Zalego Institute of Technology", type:"education", accent:"#dc2626", desc:"Hands-on ethical hacking, penetration testing, and security fundamentals. CEH foundation begins." },
  { year:"2020–2023", title:"BSc Information Technology", org:"Kenyatta University", type:"education", accent:"#0891b2", desc:"Full degree covering software engineering, networks, databases, and systems. Built the theoretical backbone." },
  { year:"Apr–Sep 2022", title:"IT Intern", org:"Ministry of Foreign & Diaspora Affairs", type:"work", accent:"#059669", desc:"Government infrastructure, network management, and systems support. First real-world deployment experience." },
  { year:"2024", title:"Founded Makeja Homes", org:"Founding Fullstack Engineer", type:"founding", accent:"#7c3aed", desc:"Quit waiting for permission. Built a full production SaaS from zero — alone. 170+ units, KSH 1.5M/month." },
  { year:"2024–2025", title:"Founder & Lead Engineer", org:"ShanTech Agency", type:"founding", accent:"#e11d48", desc:"12+ SME clients, 250K+ engagement views, full-stack delivery + CRM automation. Hired, managed, shipped." },
  { year:"2025", title:"ISC2 CC · Oracle Cloud AI Foundations", org:"International Certifications", type:"cert", accent:"#d97706", desc:"Validated cloud and security knowledge with internationally recognised certifications." },
  { year:"2026", title:"NSE Research Agent", org:"In Development", type:"building", accent:"#d97706", desc:"AI-powered market intelligence for the Nairobi Securities Exchange. Decision support, not prediction." },
];

const STACK = [
  { cat:"Frontend", accent:"#7c3aed", items:["TypeScript","Next.js 14","React","Tailwind CSS","Framer Motion"] },
  { cat:"Backend", accent:"#0891b2", items:["Node.js","Java","Spring Boot","REST APIs","WebSockets"] },
  { cat:"Database", accent:"#4ead6a", items:["PostgreSQL","Prisma ORM","MySQL","MongoDB","Neon"] },
  { cat:"Infrastructure", accent:"#d97706", items:["Vercel","VPS/Nginx","Docker","GitHub Actions","PM2"] },
  { cat:"Payments & Comms", accent:"#e11d48", items:["Paystack","Stripe","M-Pesa Daraja","Resend","Twilio"] },
  { cat:"AI & Data", accent:"#a855f7", items:["Python","Pandas","LLM APIs","LangChain","Financial APIs"] },
  { cat:"Security", accent:"#dc2626", items:["OWASP","Pen Testing","fail2ban","JWT/OAuth2","SSL/TLS"] },
  { cat:"Design & CMS", accent:"#059669", items:["Figma","InDesign","Sanity CMS","GoHighLevel","Canva"] },
];

const BEYOND = [
  { icon:"📖", title:"Editorial Designer", body:"Two volumes of Chill Minds Magazine — 72 pages of children's mental wellness content. Designed solo, printed, distributed." },
  { icon:"🍽️", title:"Food Entrepreneur", body:"Running Shan's Delights — because systems thinking applies to kitchens too." },
  { icon:"📈", title:"Markets Watcher", body:"NSE investor building the tool I always wished existed. Understanding money is understanding systems." },
  { icon:"🌍", title:"Nairobi → World", body:"Building from Kenya, for Kenya and beyond. Proving that world-class products can ship from anywhere." },
];

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 40;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + increment, target);
          setCount(Math.floor(current));
          if (current >= target) clearInterval(timer);
        }, 1600 / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <div ref={ref}>{count}{suffix}</div>;
}

export default function About() {
  const [activeType, setActiveType] = useState<string | null>(null);
  const filtered = activeType ? TIMELINE.filter(t => t.type === activeType) : TIMELINE;

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>

      {/* ── HERO ── */}
      <div style={{ borderBottom:"1px solid var(--border)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"540px" }}>

          {/* Left */}
          <div style={{ paddingTop:"140px", padding:"140px 0 0 48px", display:"flex", flexDirection:"column" }}>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"var(--purple)", textTransform:"uppercase", marginBottom:"20px" }}>// Who I Am</div>
              <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(48px,6vw,84px)", lineHeight:0.9, letterSpacing:"-0.03em", color:"var(--text)", marginBottom:"28px" }}>
                Levis.<br /><span style={{ color:"var(--purple)" }}>Kibirie.</span>
              </h1>
              <p style={{ fontFamily:"var(--font-body)", fontSize:"15px", color:"var(--text-3)", lineHeight:1.9, maxWidth:"440px", marginBottom:"20px" }}>
                Founding Fullstack Engineer based in Nairobi, Kenya. I build production systems that handle real money, real users, and real consequences — then I make them beautiful.
              </p>
              <p style={{ fontFamily:"var(--font-body)", fontSize:"15px", color:"var(--text-3)", lineHeight:1.9, maxWidth:"440px", marginBottom:"36px" }}>
                I founded Makeja Homes — a property management SaaS processing KSH 1.5M/month across 170+ units. Built every line of it alone. That&apos;s the bar I hold everything to.
              </p>
              <div style={{ display:"flex", gap:"10px" }}>
                <a href="/work" style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", background:"var(--text)", color:"white", padding:"12px 24px", textDecoration:"none", transition:"all 0.2s" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="var(--purple)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="var(--text)";}}>
                  See My Work →
                </a>
                <a href="/#contact" style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", background:"transparent", color:"var(--text-3)", padding:"12px 24px", textDecoration:"none", border:"1px solid var(--border)", transition:"all 0.2s" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="var(--text)";(e.currentTarget as HTMLElement).style.borderColor="var(--text)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="var(--text-3)";(e.currentTarget as HTMLElement).style.borderColor="var(--border)";}}>
                  Let&apos;s Talk
                </a>
              </div>
            </div>
            {/* Quick facts */}
            <div style={{ display:"flex", borderTop:"1px solid var(--border)", marginTop:"48px" }}>
              {[{l:"Based in",v:"Nairobi, KE"},{l:"Available",v:"Remotely"},{l:"Response",v:"< 24 hrs"}].map((f,i) => (
                <div key={f.l} style={{ flex:1, padding:"20px 24px", borderRight:i<2?"1px solid var(--border)":"none" }}>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"var(--text-4)", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"4px" }}>{f.l}</div>
                  <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"15px", color:"var(--text)" }}>{f.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: photo */}
          <div style={{ position:"relative", background:"var(--bg-2)", overflow:"hidden", borderLeft:"1px solid var(--border)" }}>
            <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(124,58,237,0.05) 1px, transparent 1px)", backgroundSize:"24px 24px" }} />
            <img src="/levo.jpg" alt="Levis Kibirie" style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:"85%", objectFit:"cover", objectPosition:"top", display:"block" }} />
            {/* Floating badges */}
            <div style={{ position:"absolute", top:"32px", left:"28px", background:"white", border:"1px solid var(--border)", padding:"14px 20px", zIndex:3, boxShadow:"0 4px 20px rgba(0,0,0,0.08)" }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"var(--text-4)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"4px" }}>Active Units</div>
              <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"28px", color:"var(--purple)", lineHeight:1 }}>170+</div>
            </div>
            <div style={{ position:"absolute", top:"32px", right:"28px", background:"#0a0805", border:"1px solid rgba(255,255,255,0.08)", padding:"14px 20px", zIndex:3 }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"4px" }}>Monthly Vol.</div>
              <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"20px", color:"#4ead6a", lineHeight:1 }}>KSH 1.5M</div>
            </div>
            <div style={{ position:"absolute", bottom:"80px", right:"28px", background:"var(--purple)", padding:"12px 18px", zIndex:3 }}>
              <div style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#4ead6a", animation:"blink 2s ease-in-out infinite" }} />
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"11px", color:"white", letterSpacing:"0.08em" }}>Available Remotely</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── NUMBERS ── */}
      <div style={{ background:"#0a0805", padding:"72px 48px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(124,58,237,0.6)", textTransform:"uppercase", marginBottom:"48px" }}>// By The Numbers</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"1px", background:"rgba(255,255,255,0.06)" }}>
          {[
            { val:170, suffix:"+", label:"Units Managed", accent:"#7c3aed" },
            { val:1.5, suffix:"M KSH", label:"Monthly Volume", accent:"#4ead6a" },
            { val:12, suffix:"+", label:"Agency Clients", accent:"#e11d48" },
            { val:250, suffix:"K+", label:"Engagements", accent:"#d97706" },
            { val:6, suffix:"+", label:"Years Building", accent:"#0891b2" },
          ].map(s => (
            <div key={s.label} style={{ background:"#0a0805", padding:"36px 24px", textAlign:"center", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"2px", background:`linear-gradient(90deg, ${s.accent}, transparent)` }} />
              <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(26px,2.5vw,40px)", color:s.accent, lineHeight:1, marginBottom:"8px" }}>
                <CountUp target={s.val} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.12em", textTransform:"uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <div style={{ background:"var(--bg)", padding:"72px 48px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"48px", flexWrap:"wrap", gap:"16px" }}>
          <div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"var(--purple)", textTransform:"uppercase", marginBottom:"10px" }}>// Journey</div>
            <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(32px,4vw,52px)", letterSpacing:"-0.02em", color:"var(--text)", lineHeight:1 }}>How I Got Here.</h2>
          </div>
          <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
            {[{k:null,l:"All"},{k:"education",l:"Education"},{k:"work",l:"Work"},{k:"founding",l:"Founded"},{k:"cert",l:"Certs"},{k:"building",l:"Building"}].map(f => (
              <button key={String(f.k)} onClick={() => setActiveType(f.k)}
                style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.1em", textTransform:"uppercase", padding:"6px 14px", background:activeType===f.k?"var(--text)":"transparent", border:`1px solid ${activeType===f.k?"var(--text)":"var(--border)"}`, color:activeType===f.k?"white":"var(--text-3)", cursor:"pointer", transition:"all 0.2s" }}>{f.l}
              </button>
            ))}
          </div>
        </div>

        <div style={{ position:"relative", paddingLeft:"160px" }}>
          <div style={{ position:"absolute", left:"140px", top:0, bottom:0, width:"1px", background:"var(--border)" }} />
          {filtered.map((item, i) => (
            <div key={i} style={{ display:"flex", gap:"0", position:"relative" }}>
              <div style={{ position:"absolute", left:"-20px", top:"36px", width:"9px", height:"9px", borderRadius:"50%", background:item.accent, border:`2px solid var(--bg)`, boxShadow:`0 0 0 1px ${item.accent}` }} />
              <div style={{ position:"absolute", left:"-160px", top:"32px", right:"calc(100% + 20px)", textAlign:"right" }}>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--text-4)", letterSpacing:"0.08em", whiteSpace:"nowrap" }}>{item.year}</div>
              </div>
              <div style={{ flex:1, padding:"28px 0 28px 40px", borderBottom: i < filtered.length-1 ? "1px solid var(--border)" : "none" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"7px", flexWrap:"wrap" }}>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"0.12em", textTransform:"uppercase", color:item.accent, background:`${item.accent}12`, border:`1px solid ${item.accent}30`, padding:"3px 9px" }}>
                    {item.type === "education" ? "Education" : item.type === "work" ? "Work" : item.type === "founding" ? "Founded" : item.type === "cert" ? "Certified" : "Building"}
                  </span>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"var(--text-4)" }}>{item.org}</span>
                </div>
                <h3 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"19px", color:"var(--text)", lineHeight:1.2, marginBottom:"9px" }}>{item.title}</h3>
                <p style={{ fontFamily:"var(--font-body)", fontSize:"13px", color:"var(--text-3)", lineHeight:1.85, maxWidth:"580px" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── STACK ── */}
      <div style={{ background:"#0a0805", padding:"72px 48px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(124,58,237,0.6)", textTransform:"uppercase", marginBottom:"12px" }}>// Full Stack</div>
        <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(32px,4vw,52px)", letterSpacing:"-0.02em", color:"white", lineHeight:1, marginBottom:"48px" }}>The Toolkit.</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", background:"rgba(255,255,255,0.06)" }}>
          {STACK.map(cat => (
            <div key={cat.cat} style={{ background:"#0a0805", padding:"32px 28px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:`linear-gradient(90deg,${cat.accent},transparent)` }} />
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.15em", textTransform:"uppercase", color:cat.accent, marginBottom:"18px", opacity:0.7 }}>{cat.cat}</div>
              {cat.items.map(item => (
                <div key={item} style={{ display:"flex", alignItems:"center", gap:"9px", marginBottom:"7px" }}>
                  <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:cat.accent, flexShrink:0, opacity:0.7 }} />
                  <span style={{ fontFamily:"var(--font-body)", fontSize:"13px", color:"rgba(255,255,255,0.65)" }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── BEYOND ── */}
      <div style={{ background:"var(--bg)", padding:"72px 48px" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"var(--purple)", textTransform:"uppercase", marginBottom:"12px" }}>// Beyond the Code</div>
        <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(32px,4vw,52px)", letterSpacing:"-0.02em", color:"var(--text)", lineHeight:1, marginBottom:"48px" }}>The Full Picture.</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px" }}>
          {BEYOND.map((b,i) => (
            <div key={b.title} style={{ background:i%2===0?"#ffffff":"var(--bg-2)", border:"1px solid var(--border)", padding:"32px 28px" }}>
              <div style={{ fontSize:"32px", marginBottom:"16px" }}>{b.icon}</div>
              <h3 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"16px", color:"var(--text)", marginBottom:"10px" }}>{b.title}</h3>
              <p style={{ fontFamily:"var(--font-body)", fontSize:"12px", color:"var(--text-3)", lineHeight:1.85 }}>{b.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ background:"#0a0805", padding:"80px 48px", textAlign:"center", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(168,85,247,0.6)", textTransform:"uppercase", marginBottom:"16px" }}>// Open to Opportunities</div>
        <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(32px,5vw,60px)", lineHeight:1, letterSpacing:"-0.02em", color:"white", marginBottom:"12px" }}>
          Available for the<br /><span style={{ color:"#a855f7" }}>right opportunity.</span>
        </h2>
        <p style={{ fontFamily:"var(--font-body)", fontSize:"15px", color:"rgba(255,255,255,0.4)", marginBottom:"36px" }}>Senior remote roles · Founding engineer positions · Long-term contracts</p>
        <div style={{ display:"flex", gap:"12px", justifyContent:"center" }}>
          <a href="/#contact" style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", background:"#7c3aed", color:"white", padding:"15px 36px", textDecoration:"none", boxShadow:"0 0 32px rgba(124,58,237,0.35)", transition:"all 0.25s" }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="white";(e.currentTarget as HTMLElement).style.color="#7c3aed";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#7c3aed";(e.currentTarget as HTMLElement).style.color="white";}}>
            Let&apos;s Work Together →
          </a>
          <a href="/work" style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", background:"transparent", color:"rgba(255,255,255,0.5)", padding:"15px 36px", textDecoration:"none", border:"1px solid rgba(255,255,255,0.12)", transition:"all 0.25s" }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="white";(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.4)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.5)";(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.12)";}}>
            View My Work
          </a>
        </div>
      </div>
    </div>
  );
}
