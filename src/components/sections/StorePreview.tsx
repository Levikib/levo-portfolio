"use client";
import Link from "next/link";
const products=[
  {title:"Chill Minds Vol. 1",price:"KSH 299",tag:"Magazine",accent:"var(--rose)"},
  {title:"Chill Minds Vol. 2",price:"KSH 299",tag:"Magazine",accent:"var(--purple)"},
  {title:"Coming Soon",price:"—",tag:"Digital Products",accent:"var(--sage)"},
  {title:"Coming Soon",price:"—",tag:"Brand Assets",accent:"var(--amber)"},
];
export default function StorePreview(){return(
  <section id="store" className="relative z-10 px-8 md:px-12 py-24" style={{background:"var(--bg)",borderTop:"1px solid var(--border)"}}>
    <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div>
        <div style={{fontFamily:"var(--font-mono)",fontSize:"10px",letterSpacing:"0.25em",color:"var(--amber)",textTransform:"uppercase",marginBottom:"12px"}}>{`// Digital Store`}</div>
        <h2 style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"clamp(32px,5vw,56px)",lineHeight:1,letterSpacing:"-0.02em",marginBottom:"24px",color:"var(--text)"}}>Products &<br/>Publications</h2>
        <p className="mb-8 text-sm leading-relaxed max-w-sm" style={{color:"var(--text-3)"}}>Magazines, design assets, and digital products. Thoughtfully made. Immediately useful.</p>
        <Link href="/store" className="btn-primary">Browse Store →</Link>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {products.map((p,i)=>(
          <div key={i} className="group bg-white border border-[var(--border)] p-5 relative overflow-hidden card-hover rounded-sm">
            <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{background:p.accent}}/>
            <div className="tag-purple mb-4 text-xs" style={{background:`color-mix(in srgb, ${p.accent} 10%, white)`,color:p.accent}}>{p.tag}</div>
            <div style={{fontFamily:"var(--font-display)",fontWeight:700,fontSize:"14px",marginBottom:"8px",color:"var(--text)"}}>{p.title}</div>
            <div style={{fontFamily:"var(--font-mono)",fontSize:"12px",color:p.accent,fontWeight:600}}>{p.price}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);}
