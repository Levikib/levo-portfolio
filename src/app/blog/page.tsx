"use client";
import { useState } from "react";

const POSTS = [
  {
    id: "01",
    slug: "building-saas-solo",
    title: "Building a Production SaaS Solo in 6 Months — What Nobody Tells You",
    excerpt: "Everyone talks about the tech stack. Nobody talks about the 2am deployments, the first time real money moves through your webhook, or what it feels like when a landlord calls because the system is down.",
    category: "Engineering",
    accent: "#7c3aed",
    date: "Feb 2026",
    readTime: "8 min read",
    featured: true,
    tags: ["SaaS", "Fullstack", "Makeja Homes", "Solo Founder"],
  },
  {
    id: "02",
    slug: "nse-ai-research",
    title: "Why I'm Building an AI Research Agent for the Nairobi Securities Exchange",
    excerpt: "Kenyan retail investors are flying blind. NSE data is fragmented, expensive, and locked away. I'm building the tool I always wished existed — and here's exactly how it works.",
    category: "AI & Data",
    accent: "#d97706",
    date: "Mar 2026",
    readTime: "6 min read",
    featured: true,
    tags: ["NSE", "AI", "Python", "Financial Data"],
  },
  {
    id: "03",
    slug: "paystack-integration-deep-dive",
    title: "The Complete Paystack Integration Guide Nobody Wrote",
    excerpt: "Webhooks, idempotency, receipt emails, failed payment recovery — a full breakdown of what it actually takes to integrate payments into a production multi-tenant SaaS.",
    category: "Engineering",
    accent: "#7c3aed",
    date: "Jan 2026",
    readTime: "12 min read",
    featured: false,
    tags: ["Paystack", "Payments", "TypeScript", "Webhooks"],
  },
  {
    id: "04",
    slug: "kenyan-sme-digital-transformation",
    title: "What Happens When You Give a Kenyan SME a Real CRM for the First Time",
    excerpt: "12 clients. 12 different stories of businesses that had never had an automated follow-up or a real sales pipeline. This is what the data looked like 90 days later.",
    category: "Business",
    accent: "#e11d48",
    date: "Dec 2025",
    readTime: "7 min read",
    featured: false,
    tags: ["CRM", "GoHighLevel", "Kenya", "Digital Marketing"],
  },
  {
    id: "05",
    slug: "remote-engineering-from-nairobi",
    title: "Getting a Senior Remote Engineering Role From Nairobi — The Honest Guide",
    excerpt: "Portfolio, positioning, platforms, and the one thing most Kenyan engineers get wrong when applying to US and European companies. Everything I learned building mine.",
    category: "Career",
    accent: "#059669",
    date: "Mar 2026",
    readTime: "10 min read",
    featured: false,
    tags: ["Career", "Remote Work", "Portfolio", "Job Search"],
  },
  {
    id: "06",
    slug: "multi-tenant-architecture",
    title: "Database-Per-Tenant vs Shared Schema — The Decision That Shapes Everything",
    excerpt: "When I built Makeja Homes, this was the first real architectural fork. Here's the full breakdown of what I chose, why, and what I'd do differently with hindsight.",
    category: "Engineering",
    accent: "#0891b2",
    date: "Nov 2025",
    readTime: "9 min read",
    featured: false,
    tags: ["Architecture", "PostgreSQL", "Multi-tenant", "SaaS"],
  },
];

const CATS = ["All", "Engineering", "AI & Data", "Business", "Career"];

export default function Blog() {
  const [activecat, setActivecat] = useState("All");
  const filtered = activecat === "All" ? POSTS : POSTS.filter(p => p.category === activecat);
  const featured = POSTS.filter(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>

      {/* ── HERO ── */}
      <div style={{ background:"var(--bg)", paddingTop:"140px", paddingBottom:"64px", paddingLeft:"48px", paddingRight:"48px", borderBottom:"1px solid var(--border)" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"var(--purple)", textTransform:"uppercase", marginBottom:"16px" }}>// Thoughts</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", gap:"24px", flexWrap:"wrap" }}>
          <div>
            <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(44px,6vw,80px)", lineHeight:0.92, letterSpacing:"-0.03em", color:"var(--text)", marginBottom:"16px" }}>
              Things I&apos;ve<br /><span style={{ color:"var(--purple)" }}>Figured Out.</span>
            </h1>
            <p style={{ fontFamily:"var(--font-body)", fontSize:"15px", color:"var(--text-3)", maxWidth:"480px", lineHeight:1.85 }}>
              Engineering decisions, lessons from building in Kenya, AI experiments, and career moves. Written from the trenches — no fluff.
            </p>
          </div>
          <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setActivecat(c)}
                style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", padding:"8px 18px", background:activecat===c?"var(--text)":"transparent", border:`1px solid ${activecat===c?"var(--text)":"var(--border)"}`, color:activecat===c?"white":"var(--text-3)", cursor:"pointer", transition:"all 0.2s", borderRadius:"2px" }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURED ── */}
      {activecat === "All" && (
        <div style={{ background:"var(--bg)", padding:"64px 48px 0" }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"var(--text-4)", textTransform:"uppercase", marginBottom:"24px" }}>// Featured</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"64px" }}>
            {featured.map((post, i) => (
              <div key={post.slug}
                style={{ background: i===0 ? "#0a0805" : "var(--bg-2)", border:`1px solid ${i===0 ? "rgba(255,255,255,0.08)" : "var(--border)"}`, padding:"40px", position:"relative", overflow:"hidden", cursor:"pointer", transition:"all 0.25s" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-2px)";(e.currentTarget as HTMLElement).style.boxShadow=`0 12px 40px ${post.accent}20`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(0)";(e.currentTarget as HTMLElement).style.boxShadow="none";}}>
                {/* Accent stripe */}
                <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:`linear-gradient(90deg, ${post.accent}, ${post.accent}40, transparent)` }} />
                {/* Background glow for dark card */}
                {i===0 && <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"250px", height:"250px", background:`radial-gradient(circle, ${post.accent}12, transparent 70%)`, filter:"blur(60px)", pointerEvents:"none" }} />}

                <div style={{ position:"relative", zIndex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"20px" }}>
                    <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                      <span style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"0.12em", textTransform:"uppercase", color:post.accent, background:`${post.accent}15`, border:`1px solid ${post.accent}30`, padding:"3px 9px" }}>{post.category}</span>
                      <span style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color: i===0 ? "rgba(255,255,255,0.25)" : "var(--text-4)" }}>Featured</span>
                    </div>
                    <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color: i===0 ? "rgba(255,255,255,0.3)" : "var(--text-4)" }}>{post.readTime}</div>
                  </div>
                  <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(20px,2.2vw,26px)", lineHeight:1.2, letterSpacing:"-0.01em", color: i===0 ? "white" : "var(--text)", marginBottom:"14px" }}>{post.title}</h2>
                  <p style={{ fontFamily:"var(--font-body)", fontSize:"13px", color: i===0 ? "rgba(255,255,255,0.45)" : "var(--text-3)", lineHeight:1.85, marginBottom:"24px" }}>{post.excerpt}</p>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ display:"flex", gap:"5px", flexWrap:"wrap" }}>
                      {post.tags.slice(0,3).map(t => <span key={t} style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color: i===0 ? "rgba(255,255,255,0.3)" : "var(--text-4)", border:`1px solid ${i===0 ? "rgba(255,255,255,0.08)" : "var(--border)"}`, padding:"2px 8px" }}>{t}</span>)}
                    </div>
                    <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color: i===0 ? "rgba(255,255,255,0.3)" : "var(--text-4)" }}>{post.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ALL POSTS ── */}
      <div style={{ padding:"0 48px 80px" }}>
        {activecat !== "All" && <div style={{ paddingTop:"64px" }} />}
        {activecat === "All" && <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"var(--text-4)", textTransform:"uppercase", marginBottom:"24px" }}>// All Posts</div>}

        <div style={{ display:"flex", flexDirection:"column", gap:"0" }}>
          {(activecat === "All" ? rest : filtered).map((post, i, arr) => (
            <div key={post.slug}
              style={{ display:"grid", gridTemplateColumns:"80px 1fr auto", gap:"0 32px", padding:"28px 0", borderBottom: i < arr.length-1 ? "1px solid var(--border)" : "none", cursor:"pointer", transition:"all 0.18s" }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.paddingLeft="12px";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.paddingLeft="0";}}>
              {/* Number */}
              <div style={{ display:"flex", alignItems:"center" }}>
                <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"24px", color:`${post.accent}30`, letterSpacing:"-0.02em" }}>{post.id}</div>
              </div>
              {/* Content */}
              <div>
                <div style={{ display:"flex", gap:"8px", alignItems:"center", marginBottom:"8px" }}>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"0.12em", textTransform:"uppercase", color:post.accent, background:`${post.accent}10`, border:`1px solid ${post.accent}25`, padding:"2px 8px" }}>{post.category}</span>
                  {post.tags.slice(0,2).map(t => <span key={t} style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"var(--text-4)", border:"1px solid var(--border)", padding:"2px 8px" }}>{t}</span>)}
                </div>
                <h3 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(16px,1.8vw,20px)", letterSpacing:"-0.01em", color:"var(--text)", lineHeight:1.2, marginBottom:"8px" }}>{post.title}</h3>
                <p style={{ fontFamily:"var(--font-body)", fontSize:"13px", color:"var(--text-3)", lineHeight:1.8, maxWidth:"680px" }}>{post.excerpt}</p>
              </div>
              {/* Meta */}
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", justifyContent:"center", gap:"6px", minWidth:"90px" }}>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"var(--text-4)" }}>{post.date}</div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"var(--text-4)" }}>{post.readTime}</div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:post.accent, opacity:0 }} className="read-more">Read →</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── NEWSLETTER CTA ── */}
      <div style={{ background:"#0a0805", padding:"80px 48px", borderTop:"1px solid rgba(255,255,255,0.06)", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"64px", alignItems:"center" }}>
        <div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(124,58,237,0.6)", textTransform:"uppercase", marginBottom:"16px" }}>// Stay Sharp</div>
          <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(28px,4vw,48px)", lineHeight:1, letterSpacing:"-0.02em", color:"white", marginBottom:"16px" }}>
            Articles drop when<br /><span style={{ color:"#a855f7" }}>there&apos;s something real to say.</span>
          </h2>
          <p style={{ fontFamily:"var(--font-body)", fontSize:"14px", color:"rgba(255,255,255,0.4)", lineHeight:1.8 }}>
            Engineering deep dives, Kenya tech scene takes, and lessons learned shipping real products. No filler. No frequency promises.
          </p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.15em", color:"rgba(255,255,255,0.3)", textTransform:"uppercase", marginBottom:"4px" }}>Get notified</div>
          <div style={{ display:"flex", gap:"0" }}>
            <input type="email" placeholder="your@email.com"
              style={{ flex:1, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRight:"none", color:"white", fontFamily:"var(--font-body)", fontSize:"13px", padding:"13px 18px", outline:"none" }}
              onFocus={e=>{e.target.style.borderColor="rgba(168,85,247,0.5)";}}
              onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.1)";}}
            />
            <button style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", background:"#7c3aed", color:"white", border:"none", padding:"13px 24px", cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.2s" }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#6d28d9";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#7c3aed";}}>
              Notify Me
            </button>
          </div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"rgba(255,255,255,0.18)" }}>No spam. Unsubscribe anytime.</div>
        </div>
      </div>
    </div>
  );
}
