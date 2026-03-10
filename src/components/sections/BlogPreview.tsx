"use client";
import Link from "next/link";
const posts=[
  {title:"Building a SaaS in Public: What 2 Years Taught Me",category:"Engineering",date:"Mar 2026",accent:"var(--purple)",excerpt:"The real story behind Makeja Homes — the wins, the 3am debugging sessions, and everything in between."},
  {title:"Why Attack on Titan is the Greatest Piece of Fiction",category:"Anime & Stories",date:"Feb 2026",accent:"var(--rose)",excerpt:"A fully unhinged defense of why AoT's ending was actually perfect and anyone who disagrees is wrong."},
  {title:"Nairobi's Tech Scene is About to Explode",category:"Thoughts",date:"Jan 2026",accent:"var(--sage)",excerpt:"M-Pesa democratised finance. AI is democratising software. What happens when both collide in one city?"},
];
export default function BlogPreview(){return(
  <section id="thoughts" className="relative z-10 px-8 md:px-12 py-24" style={{background:"var(--bg-2)",borderTop:"1px solid var(--border)"}}>
    <div className="reveal flex justify-between items-end mb-16">
      <div>
        <div style={{fontFamily:"var(--font-mono)",fontSize:"10px",letterSpacing:"0.25em",color:"var(--amber)",textTransform:"uppercase",marginBottom:"12px"}}>{`// Thoughts & Writing`}</div>
        <h2 style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"clamp(32px,5vw,56px)",lineHeight:1,letterSpacing:"-0.02em",color:"var(--text)"}}>The Blog</h2>
        <p className="mt-4 text-sm max-w-sm leading-relaxed" style={{color:"var(--text-3)"}}>Engineering deep-dives. Anime takes. Movie opinions. Mental notes on building things in Africa.</p>
      </div>
      <Link href="/blog" className="btn-secondary text-xs py-3 px-5 hidden md:flex">All Posts →</Link>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {posts.map((post,i)=>(
        <article key={i} className="reveal group bg-white border border-[var(--border)] p-8 relative overflow-hidden card-hover rounded-sm">
          <div className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{background:post.accent}}/>
          <div className="flex justify-between items-center mb-6">
            <span className="tag-purple text-xs" style={{background:`color-mix(in srgb, ${post.accent} 10%, white)`,color:post.accent}}>{post.category}</span>
            <span style={{fontFamily:"var(--font-mono)",fontSize:"10px",color:"var(--text-4)"}}>{post.date}</span>
          </div>
          <h3 className="mb-4" style={{fontFamily:"var(--font-display)",fontWeight:700,fontSize:"18px",lineHeight:1.3,color:"var(--text)"}}>{post.title}</h3>
          <p style={{fontSize:"13px",color:"var(--text-3)",lineHeight:1.7}}>{post.excerpt}</p>
          <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity" style={{fontFamily:"var(--font-mono)",fontSize:"10px",color:post.accent,letterSpacing:"0.1em"}}>Read more →</div>
        </article>
      ))}
    </div>
  </section>
);}
