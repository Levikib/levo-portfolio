"use client";
import {useEffect,useRef} from "react";
import Link from "next/link";
const projects=[
  {num:"01",name:"Makeja Homes",status:"live",statusLabel:"Live in Production",desc:"Multi-tenant SaaS for residential property management. Solo-built from zero. Paystack payments, automated lease management, recurring billing, full landlord/tenant dashboards.",tags:["TypeScript","Next.js 14","PostgreSQL","Prisma ORM","Paystack","VPS/Nginx"],metrics:[{val:"170+",label:"Active Units"},{val:"KSH 1.5M",label:"Monthly Volume"}],github:"https://github.com/Levikib/makeja-homes",accent:"var(--purple)"},
  {num:"02",name:"NSE Research Agent",status:"building",statusLabel:"In Development",desc:"Live data-fetching intelligence tool for the Nairobi Securities Exchange. Ingests real-time market data, runs technical analysis, surfaces actionable trade insights.",tags:["Python","TypeScript","Financial APIs","Data Analysis","ML Models"],metrics:[{val:"Live",label:"NSE Data"},{val:"AI",label:"Analysis"}],github:null,accent:"var(--amber)"},
  {num:"03",name:"ShanTech Agency",status:"completed",statusLabel:"Completed · 2024-2025",desc:"Full-service digital agency helping Kenyan SMEs achieve measurable revenue through technology. AI-powered CRM automation, social infrastructure, full-stack web delivery.",tags:["GoHighLevel","Zapier","Meta Ads API","Automation","Full-stack"],metrics:[{val:"250K+",label:"Engagement"},{val:"35%",label:"Traffic Up"}],github:null,accent:"var(--rose)"},
];
export default function FeaturedWork(){
  const ref=useRef<HTMLElement>(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add("visible")}),{threshold:0.1});
    ref.current?.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);
  return(
    <section ref={ref} id="work" className="relative z-10 px-8 md:px-12 pb-24" style={{background:"var(--bg)"}}>
      <div className="reveal flex justify-between items-end py-12 border-b border-[var(--border)] mb-0">
        <div>
          <div style={{fontFamily:"var(--font-mono)",fontSize:"10px",letterSpacing:"0.25em",color:"var(--sage)",textTransform:"uppercase",marginBottom:"12px"}}>// Engineering Work</div>
          <div style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"clamp(32px,5vw,56px)",lineHeight:1,letterSpacing:"-0.02em",color:"var(--text)"}}>What I Built</div>
        </div>
        <Link href="/work" className="btn-secondary text-xs py-3 px-5 hidden md:flex">View All</Link>
      </div>
      {projects.map((p)=>(
        <div key={p.num} className="reveal group py-10 border-b border-[var(--border)] rounded-lg px-4 transition-all duration-300 hover:bg-white hover:shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <span style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"40px",color:"var(--border-2)",lineHeight:1,minWidth:"56px"}}>{p.num}</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{background:p.accent,animation:p.status==="live"?"blink 2s ease-in-out infinite":"none"}}/>
              <span style={{fontFamily:"var(--font-mono)",fontSize:"10px",letterSpacing:"0.15em",textTransform:"uppercase",color:p.accent}}>{p.statusLabel}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-8 items-start">
            <div>
              <h3 className="mb-3" style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"clamp(22px,3vw,34px)",letterSpacing:"-0.02em",color:"var(--text)"}}>{p.name}</h3>
              <p className="mb-5" style={{fontSize:"14px",color:"var(--text-3)",lineHeight:1.8,maxWidth:"560px"}}>{p.desc}</p>
              <div className="flex flex-wrap gap-2">{p.tags.map(t=><span key={t} className="pill">{t}</span>)}</div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex md:flex-col gap-5">
                {p.metrics.map(m=>(
                  <div key={m.label}>
                    <div style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"24px",color:p.accent,lineHeight:1,marginBottom:"2px"}}>{m.val}</div>
                    <div style={{fontFamily:"var(--font-mono)",fontSize:"9px",letterSpacing:"0.15em",color:"var(--text-4)",textTransform:"uppercase"}}>{m.label}</div>
                  </div>
                ))}
              </div>
              {p.github&&(
                <a href={p.github} target="_blank" rel="noopener noreferrer" style={{fontFamily:"var(--font-display)",fontWeight:700,fontSize:"12px",letterSpacing:"0.06em",textTransform:"uppercase",border:"1.5px solid",borderColor:p.accent,color:p.accent,padding:"10px 16px",textDecoration:"none",textAlign:"center",display:"block",transition:"all 0.2s"}}>
                  View Repo
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
