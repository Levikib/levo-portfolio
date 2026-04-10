"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

type Project = { num:string; name:string; status:string; statusLabel:string; desc:string; tags:string[]; metrics:{val:string;label:string}[]; github:string|null; live?:string; accent:string; accentRgb:string; };
const projects: Project[] = [
  { num:"01", name:"Makeja Homes", status:"live", statusLabel:"Live in Production", desc:"Multi-tenant SaaS for residential property management. Paystack payments, automated lease management, recurring billing, full landlord/tenant dashboards.", tags:["TypeScript","Next.js 14","PostgreSQL","Prisma ORM","Paystack","VPS/Nginx"], metrics:[{val:"247+",label:"Active Tenants"},{val:"KSH 1.5M",label:"Monthly Volume"}], github:"https://github.com/Levikib/makeja-homes", live:"https://makejahomes.co.ke", accent:"var(--purple)", accentRgb:"124,58,237" },
  { num:"02", name:"GhostNet", status:"live", statusLabel:"Live in Production", desc:"Full-stack cybersecurity research & training platform. 13 modules, 243 lab steps, 5450 XP economy, 9 live hacking tools, and GHOST AI — an LLM-powered agent running inside the platform. Cinematic matrix-rain splash on entry.", tags:["Next.js 14","TypeScript","Supabase","Groq llama-3.3-70b","Realtime"], metrics:[{val:"13",label:"Modules"},{val:"5450",label:"Total XP"}], github:null, live:"https://ghostnet-pi.vercel.app", accent:"#10b981", accentRgb:"16,185,129" },
  { num:"03", name:"NSE Research Agent", status:"building", statusLabel:"In Development", desc:"Live data-fetching intelligence tool for the Nairobi Securities Exchange. Ingests real-time market data, runs technical analysis, surfaces actionable trade insights.", tags:["Python","TypeScript","Financial APIs","Data Analysis","ML Models"], metrics:[{val:"Live",label:"NSE Data"},{val:"AI",label:"Analysis"}], github:null, accent:"var(--amber)", accentRgb:"217,119,6" },
  { num:"04", name:"ShanTech Agency", status:"completed", statusLabel:"Completed · 2024–2025", desc:"Full-service digital agency helping Kenyan SMEs achieve measurable revenue through technology. AI-powered CRM automation, social infrastructure, full-stack web delivery.", tags:["GoHighLevel","Zapier","Meta Ads API","Automation","Full-stack"], metrics:[{val:"250K+",label:"Engagement"},{val:"35%",label:"Traffic Up"}], github:null, accent:"var(--rose)", accentRgb:"225,29,72" },
  { num:"05", name:"Chill Minds Magazine", status:"completed", statusLabel:"Vol. 1 & 2 Published", desc:"A beautifully designed kids mental wellness magazine. Two volumes, 36 pages each. Complete design ownership — concept, layout, illustration direction, typography, production.", tags:["Print Design","Editorial","Typography","Illustration","InDesign"], metrics:[{val:"2",label:"Volumes"},{val:"72",label:"Pages"}], github:null, accent:"var(--forest)", accentRgb:"45,122,69" },
];

export default function FeaturedWork() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add("visible"); }), { threshold: 0.08 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="work" className="relative z-10 px-8 md:px-12 py-24" style={{ background: "var(--bg)" }}>
      <div className="reveal flex justify-between items-end mb-12" style={{ flexWrap:"wrap", gap:"16px" }}>
        <div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"var(--sage)", textTransform:"uppercase", marginBottom:"12px" }}>// Engineering Work</div>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(32px,5vw,56px)", lineHeight:1, letterSpacing:"-0.02em", color:"var(--text)" }}>What I Built</div>
        </div>
        <Link href="/work" style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"12px", letterSpacing:"0.08em", textTransform:"uppercase", border:"1.5px solid var(--border)", color:"var(--text-3)", padding:"10px 20px", textDecoration:"none" }}>View All →</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((p) => (
          <div key={p.num} className="reveal group glass-card rounded-sm overflow-hidden" style={{ position:"relative" }}>
            <div style={{ height:"3px", background:`linear-gradient(90deg, ${p.accent}, transparent)` }} />
            <div className="p-7">
              <div className="flex items-center justify-between mb-4">
                <span style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"52px", color:`rgba(${p.accentRgb},0.08)`, lineHeight:1, userSelect:"none" }}>{p.num}</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background:p.accent, animation:p.status==="live"?"blink 2s ease-in-out infinite":"none" }} />
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.15em", textTransform:"uppercase", color:p.accent }}>{p.statusLabel}</span>
                </div>
              </div>
              <h3 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(20px,2.5vw,28px)", letterSpacing:"-0.02em", color:"var(--text)", marginBottom:"10px", lineHeight:1.1 }}>{p.name}</h3>
              <p style={{ fontSize:"13px", color:"var(--text-3)", lineHeight:1.8, marginBottom:"14px" }}>{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-5">{p.tags.map(t => <span key={t} className="pill">{t}</span>)}</div>
              <div style={{ paddingTop:"14px", borderTop:"1px solid var(--border)" }}>
                <div className="flex gap-5 mb-4">
                  {p.metrics.map(m => (
                    <div key={m.label}>
                      <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"20px", color:p.accent, lineHeight:1 }}>{m.val}</div>
                      <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.12em", color:"var(--text-4)", textTransform:"uppercase", marginTop:"2px" }}>{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"11px", letterSpacing:"0.08em", textTransform:"uppercase", background:p.accent, color:"white", padding:"8px 16px", textDecoration:"none", transition:"all 0.2s", whiteSpace:"nowrap" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity="0.85"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity="1"; }}
                    >Live Site ↗</a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"11px", letterSpacing:"0.08em", textTransform:"uppercase", border:`1.5px solid ${p.accent}`, color:p.accent, padding:"8px 16px", textDecoration:"none", transition:"all 0.2s", whiteSpace:"nowrap" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background=p.accent; (e.currentTarget as HTMLElement).style.color="white"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; (e.currentTarget as HTMLElement).style.color=p.accent; }}
                    >GitHub ↗</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
