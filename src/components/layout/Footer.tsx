import Link from "next/link";
const nav=[{href:"/work",label:"Work"},{href:"/store",label:"Store"},{href:"/blog",label:"Thoughts"},{href:"/about",label:"About"}];
const social=[{href:"https://linkedin.com/in/levis-kibirie-6bba13344",label:"LinkedIn"},{href:"https://github.com/Levikib",label:"GitHub"},{href:"mailto:leviskibirie2110@gmail.com",label:"Email"}];
export default function Footer(){return(
  <footer className="relative z-10 px-8 md:px-12 py-12" style={{background:"var(--text)",borderTop:"1px solid #2a2218"}}>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
      <div>
        <div style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"28px",marginBottom:"12px",color:"var(--bg)"}}>LK<span style={{color:"var(--purple-light)"}}>.</span></div>
        <p style={{fontSize:"13px",color:"#8a7d6e",lineHeight:1.7,maxWidth:"240px"}}>Fullstack Engineer & SaaS Founder. Building production systems from Nairobi to the world.</p>
      </div>
      <div>
        <div style={{fontFamily:"var(--font-mono)",fontSize:"10px",letterSpacing:"0.25em",color:"#5a4e40",textTransform:"uppercase",marginBottom:"20px"}}>Navigate</div>
        <ul className="flex flex-col gap-3 list-none">{nav.map(l=><li key={l.href}><Link href={l.href} style={{fontFamily:"var(--font-mono)",fontSize:"11px",letterSpacing:"0.12em",textTransform:"uppercase",color:"#8a7d6e",textDecoration:"none"}}>{l.label}</Link></li>)}</ul>
      </div>
      <div>
        <div style={{fontFamily:"var(--font-mono)",fontSize:"10px",letterSpacing:"0.25em",color:"#5a4e40",textTransform:"uppercase",marginBottom:"20px"}}>Connect</div>
        <ul className="flex flex-col gap-3 list-none">{social.map(l=><li key={l.href}><a href={l.href} target={l.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" style={{fontFamily:"var(--font-mono)",fontSize:"11px",letterSpacing:"0.12em",textTransform:"uppercase",color:"#8a7d6e",textDecoration:"none"}}>{l.label} ↗</a></li>)}</ul>
      </div>
    </div>
    <div className="flex flex-col md:flex-row justify-between pt-8" style={{borderTop:"1px solid #2a2218",fontFamily:"var(--font-mono)",fontSize:"10px",color:"#5a4e40",letterSpacing:"0.1em"}}>
      <span>© 2026 LEVIS KIBIRIE · NAIROBI, KENYA</span>
      <span>BUILT WITH NEXT.JS + FRAMER MOTION</span>
      <span>AVAILABLE GLOBALLY</span>
    </div>
  </footer>
);}
