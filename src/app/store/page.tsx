"use client";
import { useState } from "react";

const PRODUCTS = [
  {
    id: "01",
    name: "SaaS Starter Kit — Kenya Stack",
    tagline: "The exact setup I used to ship Makeja Homes.",
    price: "KSH 4,500",
    usd: "$35",
    category: "Templates",
    accent: "#7c3aed",
    status: "available",
    badge: "Best Seller",
    desc: "Next.js 14 + Prisma ORM + PostgreSQL (Neon) + Paystack + Resend — fully wired up and ready to build on. Multi-tenant ready, auth included, payment webhooks configured. Skip the 2 weeks of boilerplate.",
    includes: ["Next.js 14 + TypeScript", "Prisma + PostgreSQL schema", "Paystack integration + webhooks", "Resend email templates", "Multi-tenant architecture", "Auth system (NextAuth)", "Dashboard starter", "Full documentation"],
    format: "GitHub repo + Loom walkthrough",
  },
  {
    id: "02",
    name: "Meta Ads Playbook for Kenyan SMEs",
    tagline: "The campaigns that actually worked. Not the ones that looked good.",
    price: "KSH 2,200",
    usd: "$17",
    category: "Guides",
    accent: "#e11d48",
    status: "available",
    badge: "New",
    desc: "12 clients. Hundreds of thousands of shillings in ad spend. This is the distilled playbook: audience targeting for Kenya, creative that converts, budgets that make sense on African CPMs, and the exact campaign structures I run.",
    includes: ["Campaign structure templates", "Kenyan audience targeting guide", "Creative brief templates", "Budget calculator (KSH)", "Reporting dashboard template", "7 winning ad copy frameworks", "Retargeting sequences", "Q&A access (30 days)"],
    format: "PDF + Notion template + Google Sheets",
  },
  {
    id: "03",
    name: "Editorial Design System — Chill Minds",
    tagline: "The full design language from a published 72-page magazine.",
    price: "KSH 3,500",
    usd: "$27",
    category: "Design",
    accent: "#059669",
    status: "available",
    badge: null,
    desc: "The complete InDesign + brand system used to produce two volumes of Chill Minds Magazine. Typography system, colour palettes, grid layouts, master pages, section templates. Rip the whole system or raid it for parts.",
    includes: ["InDesign master template", "Full typography system", "2 complete colour palettes", "Section layout templates", "Cover design system", "Image treatment styles", "Print production checklist", "Source files (.indd)"],
    format: "InDesign files + PDF style guide",
  },
  {
    id: "04",
    name: "Technical CV Template — Engineering Edition",
    tagline: "The exact CV structure that gets senior engineer interviews.",
    price: "KSH 1,500",
    usd: "$12",
    category: "Career",
    accent: "#d97706",
    status: "available",
    badge: null,
    desc: "Not a pretty template. A strategically structured document built around how hiring managers at US/European tech companies actually scan CVs. With the positioning framework, metrics language, and project storytelling format that gets past ATS.",
    includes: ["Word + PDF templates", "Section-by-section guide", "Metrics language cheatsheet", "Project description framework", "ATS keyword strategy", "Cover letter template", "LinkedIn alignment guide", "1 review round"],
    format: ".docx + PDF + Notion playbook",
  },
];

const CATS = ["All", "Templates", "Guides", "Design", "Career"];

export default function Store() {
  const [activeCat, setActiveCat] = useState("All");
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const filtered = activeCat === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCat);

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>

      {/* ── HERO ── */}
      <div style={{ background:"var(--bg)", paddingTop:"140px", paddingBottom:"64px", paddingLeft:"48px", paddingRight:"48px", borderBottom:"1px solid var(--border)" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"var(--purple)", textTransform:"uppercase", marginBottom:"16px" }}>// Store</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", gap:"24px", flexWrap:"wrap" }}>
          <div>
            <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(44px,6vw,80px)", lineHeight:0.92, letterSpacing:"-0.03em", color:"var(--text)", marginBottom:"16px" }}>
              Packaged<br /><span style={{ color:"var(--purple)" }}>Knowledge.</span>
            </h1>
            <p style={{ fontFamily:"var(--font-body)", fontSize:"15px", color:"var(--text-3)", maxWidth:"480px", lineHeight:1.85 }}>
              Templates, playbooks, and systems pulled from real projects. Not theory — things that shipped, scaled, and made money.
            </p>
          </div>
          <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setActiveCat(c)}
                style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", padding:"8px 18px", background:activeCat===c?"var(--text)":"transparent", border:`1px solid ${activeCat===c?"var(--text)":"var(--border)"}`, color:activeCat===c?"white":"var(--text-3)", cursor:"pointer", transition:"all 0.2s", borderRadius:"2px" }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <div style={{ padding:"64px 48px 80px" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          {filtered.map((product, idx) => {
            const isExpanded = expandedProduct === product.id;
            const isDark = idx % 2 !== 0;

            return (
              <div key={product.id} style={{ border:`1px solid ${isDark ? "rgba(255,255,255,0.08)" : "var(--border)"}`, overflow:"hidden", background: isDark ? "#0a0805" : "#ffffff", transition:"all 0.2s" }}>
                {/* Accent stripe */}
                <div style={{ height:"3px", background:`linear-gradient(90deg, ${product.accent}, ${product.accent}50, transparent)` }} />

                <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:"32px", padding:"36px 40px", alignItems:"center" }}>
                  {/* Left: product info */}
                  <div style={{ display:"grid", gridTemplateColumns:"64px 1fr", gap:"24px", alignItems:"start" }}>
                    {/* Number */}
                    <div style={{ paddingTop:"4px" }}>
                      <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"36px", color:`${product.accent}20`, lineHeight:1, letterSpacing:"-0.04em" }}>{product.id}</div>
                    </div>
                    {/* Info */}
                    <div>
                      <div style={{ display:"flex", gap:"8px", alignItems:"center", marginBottom:"10px", flexWrap:"wrap" }}>
                        <span style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"0.12em", textTransform:"uppercase", color:product.accent, background:`${product.accent}15`, border:`1px solid ${product.accent}30`, padding:"3px 9px" }}>{product.category}</span>
                        {product.badge && <span style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"0.12em", textTransform:"uppercase", color: isDark ? "rgba(255,255,255,0.5)" : "var(--text-3)", background: isDark ? "rgba(255,255,255,0.06)" : "var(--bg-2)", border:`1px solid ${isDark ? "rgba(255,255,255,0.1)" : "var(--border)"}`, padding:"3px 9px" }}>{product.badge}</span>}
                        <span style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color: isDark ? "rgba(255,255,255,0.2)" : "var(--text-4)" }}>{product.format}</span>
                      </div>
                      <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(18px,2vw,24px)", letterSpacing:"-0.01em", color: isDark ? "white" : "var(--text)", lineHeight:1.2, marginBottom:"8px" }}>{product.name}</h2>
                      <div style={{ fontFamily:"var(--font-body)", fontSize:"13px", color:product.accent, fontStyle:"italic", marginBottom:"12px" }}>{product.tagline}</div>
                      <p style={{ fontFamily:"var(--font-body)", fontSize:"13px", color: isDark ? "rgba(255,255,255,0.45)" : "var(--text-3)", lineHeight:1.85, maxWidth:"580px" }}>{product.desc}</p>
                    </div>
                  </div>

                  {/* Right: price + CTA */}
                  <div style={{ display:"flex", flexDirection:"column", gap:"12px", alignItems:"flex-end", minWidth:"160px" }}>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"28px", color:product.accent, lineHeight:1 }}>{product.price}</div>
                      <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color: isDark ? "rgba(255,255,255,0.25)" : "var(--text-4)", marginTop:"2px" }}>{product.usd} USD</div>
                    </div>
                    <button style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", background:product.accent, color:"white", border:"none", padding:"12px 24px", cursor:"pointer", transition:"all 0.2s", width:"100%", boxShadow:`0 0 20px ${product.accent}30` }}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.opacity="0.85";}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.opacity="1";}}>
                      Get It →
                    </button>
                    <button onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
                      style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.1em", textTransform:"uppercase", background:"transparent", border:`1px solid ${isDark ? "rgba(255,255,255,0.1)" : "var(--border)"}`, color: isDark ? "rgba(255,255,255,0.35)" : "var(--text-3)", padding:"8px 14px", cursor:"pointer", transition:"all 0.2s", width:"100%" }}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=product.accent;(e.currentTarget as HTMLElement).style.color=product.accent;}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=isDark?"rgba(255,255,255,0.1)":"var(--border)";(e.currentTarget as HTMLElement).style.color=isDark?"rgba(255,255,255,0.35)":"var(--text-3)";}}>
                      {isExpanded ? "Less ↑" : "What&apos;s inside ↓"}
                    </button>
                  </div>
                </div>

                {/* Expanded: what's included */}
                {isExpanded && (
                  <div style={{ borderTop:`1px solid ${isDark ? "rgba(255,255,255,0.06)" : "var(--border)"}`, padding:"32px 40px 36px", background: isDark ? `${product.accent}06` : `${product.accent}04` }}>
                    <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:product.accent, textTransform:"uppercase", marginBottom:"20px" }}>// What&apos;s Inside</div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:"8px 32px" }}>
                      {product.includes.map(item => (
                        <div key={item} style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
                          <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:product.accent, flexShrink:0, marginTop:"6px" }} />
                          <span style={{ fontFamily:"var(--font-body)", fontSize:"12px", color: isDark ? "rgba(255,255,255,0.55)" : "var(--text-3)", lineHeight:1.5 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CUSTOM WORK CTA ── */}
      <div style={{ background:"#0a0805", padding:"80px 48px", borderTop:"1px solid rgba(255,255,255,0.06)", display:"grid", gridTemplateColumns:"1fr auto", gap:"48px", alignItems:"center" }}>
        <div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(168,85,247,0.6)", textTransform:"uppercase", marginBottom:"12px" }}>// Need Something Custom?</div>
          <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(28px,4vw,48px)", lineHeight:1, letterSpacing:"-0.02em", color:"white", marginBottom:"12px" }}>
            Don&apos;t see what you need.<br /><span style={{ color:"#a855f7" }}>Let&apos;s build it together.</span>
          </h2>
          <p style={{ fontFamily:"var(--font-body)", fontSize:"14px", color:"rgba(255,255,255,0.4)", lineHeight:1.8, maxWidth:"560px" }}>
            These products are packaged versions of real work. If you need a custom build — a full SaaS, a specific integration, a tailored playbook — check the services page or reach out directly.
          </p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"10px", flexShrink:0 }}>
          <a href="/work#services" style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", background:"#7c3aed", color:"white", padding:"14px 28px", textDecoration:"none", whiteSpace:"nowrap", transition:"all 0.2s", textAlign:"center", boxShadow:"0 0 24px rgba(124,58,237,0.3)" }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="white";(e.currentTarget as HTMLElement).style.color="#7c3aed";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#7c3aed";(e.currentTarget as HTMLElement).style.color="white";}}>
            View Services →
          </a>
          <a href="/#contact" style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", background:"transparent", color:"rgba(255,255,255,0.4)", padding:"14px 28px", textDecoration:"none", border:"1px solid rgba(255,255,255,0.1)", whiteSpace:"nowrap", transition:"all 0.2s", textAlign:"center" }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="white";(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.4)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.4)";(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.1)";}}>
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </div>
  );
}
