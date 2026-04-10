"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const posts = [
  { title: "Building a SaaS in Public: What 2 Years Taught Me", category: "Engineering", date: "Mar 2026", accent: "var(--purple)", accentRgb:"124,58,237", readTime: "8 min", excerpt: "The real story behind Makeja Homes — wins, 3am debugging sessions, and the moments I almost quit." },
  { title: "Why Attack on Titan is the Greatest Piece of Fiction Ever Made", category: "Culture", date: "Feb 2026", accent: "var(--rose)", accentRgb:"225,29,72", readTime: "6 min", excerpt: "A fully unhinged, completely defensible argument. The ending was perfect. I will die on this hill." },
  { title: "Nairobi's Tech Scene is About to Explode", category: "Thoughts", date: "Jan 2026", accent: "var(--forest)", accentRgb:"45,122,69", readTime: "5 min", excerpt: "M-Pesa democratised finance. AI is democratising software. What happens when both forces meet in one city?" },
];

export default function BlogPreview() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add("visible"); }), { threshold: 0.08 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative px-8 md:px-12 py-24" style={{ background:"#0a0805" }}>
      <div className="reveal flex justify-between items-end mb-12" style={{ flexWrap:"wrap", gap:"16px" }}>
        <div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"#d97706", textTransform:"uppercase", marginBottom:"12px" }}>// Latest Writing</div>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(32px,5vw,56px)", lineHeight:1, letterSpacing:"-0.02em", color:"rgba(255,255,255,0.9)" }}>Thoughts</div>
        </div>
        <Link href="/blog" style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"12px", letterSpacing:"0.08em", textTransform:"uppercase", border:"1.5px solid rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.45)", padding:"10px 20px", textDecoration:"none" }}>All Posts →</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {posts.map((p, i) => (
          <Link key={i} href="/blog" style={{ textDecoration:"none" }}>
            <div  style={{ cursor:"pointer" }}>
              <div style={{ height:"4px", background:`linear-gradient(90deg, ${p.accent}, transparent)` }} />
              <div className="p-6 flex flex-col flex-1">
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }}>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.15em", textTransform:"uppercase", color:p.accent, background:`rgba(${p.accentRgb},0.08)`, padding:"4px 10px" }}>{p.category}</span>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"rgba(255,255,255,0.25)" }}>{p.readTime} read</span>
                </div>
                <h3 style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"16px", color:"rgba(255,255,255,0.9)", lineHeight:1.3, marginBottom:"10px", flex:1 }}>{p.title}</h3>
                <p style={{ fontFamily:"var(--font-body)", fontSize:"12px", color:"rgba(255,255,255,0.45)", lineHeight:1.7, marginBottom:"16px" }}>{p.excerpt}</p>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:p.accent, letterSpacing:"0.08em" }}>Read → &nbsp;{p.date}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
