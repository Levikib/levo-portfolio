"use client";
import Link from "next/link";
const items=[
  {title:"Chill Minds Vol. 1",category:"Magazine Design",desc:"Kids mental wellness & health magazine. 36 pages of carefully designed content addressing mental health for children.",year:"2024",accent:"var(--rose)",tag:"Print Design"},
  {title:"Chill Minds Vol. 2",category:"Magazine Design",desc:"Second volume expanding the Chill Minds universe. New themes, new stories, same commitment to kids' wellbeing.",year:"2025",accent:"var(--purple)",tag:"Print Design"},
  {title:"Brand Identity Work",category:"Branding",desc:"Logo design, brand systems and visual identity for SME clients through ShanTech Agency.",year:"2024–2025",accent:"var(--sage)",tag:"Branding"},
];
export default function DesignWork(){return(
  <section id="design" className="relative z-10 px-8 md:px-12 py-24" style={{background:"var(--bg-2)",borderTop:"1px solid var(--border)"}}>
    <div className="reveal flex justify-between items-end mb-16">
      <div>
        <div style={{fontFamily:"var(--font-mono)",fontSize:"10px",letterSpacing:"0.25em",color:"var(--rose)",textTransform:"uppercase",marginBottom:"12px"}}>{`// Creative & Design`}</div>
        <div style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"clamp(32px,5vw,56px)",lineHeight:1,letterSpacing:"-0.02em",color:"var(--text)"}}>Visual Work</div>
        <p className="mt-4 max-w-md text-sm leading-relaxed" style={{color:"var(--text-3)"}}>Beyond the code — designing magazines, brands, and digital experiences that resonate.</p>
      </div>
      <Link href="/work#design" className="btn-secondary text-xs py-3 px-5 hidden md:flex">Full Portfolio →</Link>
    </div>
    <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {items.map((item,i)=>(
        <div key={i} className="group bg-white border border-[var(--border)] p-8 relative overflow-hidden card-hover rounded-sm">
          <div className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{background:item.accent}}/>
          <div className="flex justify-between items-start mb-6">
            <span className="tag-purple" style={{background:`color-mix(in srgb, ${item.accent} 10%, white)`,color:item.accent}}>{item.tag}</span>
            <span style={{fontFamily:"var(--font-mono)",fontSize:"10px",color:"var(--text-4)"}}>{item.year}</span>
          </div>
          <div className="w-full h-36 mb-6 flex items-center justify-center rounded-sm" style={{background:`color-mix(in srgb, ${item.accent} 8%, white)`,border:`1px solid color-mix(in srgb, ${item.accent} 20%, transparent)`}}>
            <div style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"11px",letterSpacing:"0.2em",color:item.accent,opacity:0.7,textTransform:"uppercase"}}>{item.category}</div>
          </div>
          <div className="mb-3" style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"20px",letterSpacing:"-0.01em",color:"var(--text)"}}>{item.title}</div>
          <p style={{fontSize:"13px",color:"var(--text-3)",lineHeight:1.7}}>{item.desc}</p>
        </div>
      ))}
    </div>
    <div className="reveal p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white border border-[var(--border)] rounded-sm">
      <div>
        <div style={{fontFamily:"var(--font-mono)",fontSize:"10px",letterSpacing:"0.2em",color:"var(--rose)",textTransform:"uppercase",marginBottom:"8px"}}>Featured Publication</div>
        <h3 style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"clamp(24px,4vw,40px)",letterSpacing:"-0.02em",marginBottom:"8px",color:"var(--text)"}}>Chill Minds Magazine</h3>
        <p style={{fontSize:"14px",color:"var(--text-3)",maxWidth:"480px",lineHeight:1.8}}>A kids&apos; mental wellness & health publication. Two volumes, 36 pages each. Fully designed — concept, layout, illustration direction, and typography.</p>
      </div>
      <Link href="/store" className="btn-primary whitespace-nowrap">View in Store →</Link>
    </div>
  </section>
);}
