"use client";
const projects = [
  { num: "01", name: "Makeja Homes", status: "live", statusLabel: "Live in Production", year: "2024–Present", type: "SaaS Platform", desc: "Multi-tenant residential property management SaaS. Built solo from zero — architecture, payments, automation, UI, and infrastructure. 170+ units. KSH 1.5M/month in transaction volume processed through Paystack.", tags: ["TypeScript", "Next.js 14", "PostgreSQL", "Prisma ORM", "Paystack", "VPS/Nginx", "Resend"], metrics: [{ val: "170+", label: "Active Units" }, { val: "KSH 1.5M", label: "Monthly Volume" }, { val: "Solo", label: "Built By" }], github: "https://github.com/Levikib/makeja-homes", accent: "var(--purple)", accentHex: "#7c3aed" },
  { num: "02", name: "NSE Research Agent", status: "building", statusLabel: "In Development", year: "2026", type: "AI Tool", desc: "Live data-fetching intelligence system for the Nairobi Securities Exchange. Ingests real-time market data, applies technical analysis models, and surfaces actionable trade insights. Decision support — not prediction.", tags: ["Python", "TypeScript", "Financial APIs", "Data Analysis", "ML Models"], metrics: [{ val: "Live", label: "NSE Data" }, { val: "AI", label: "Analysis" }, { val: "Real-time", label: "Feed" }], github: null, accent: "var(--amber)", accentHex: "#d97706" },
  { num: "03", name: "ShanTech Agency", status: "completed", statusLabel: "Completed · 2024–2025", year: "2024–2025", type: "Digital Agency", desc: "Full-service digital agency helping Kenyan SMEs grow through technology. AI-powered CRM automation, social infrastructure, full-stack web delivery. 250K+ engagement views delivered.", tags: ["GoHighLevel", "Zapier", "Meta Ads API", "Automation", "Full-stack", "Social"], metrics: [{ val: "250K+", label: "Engagement" }, { val: "35%", label: "Traffic Increase" }, { val: "12+", label: "Clients" }], github: null, accent: "var(--rose)", accentHex: "#e11d48" },
  { num: "04", name: "Chill Minds Magazine", status: "completed", statusLabel: "Vol. 1 & 2 Published", year: "2024–2025", type: "Editorial Design", desc: "A fully designed kids' mental wellness and health magazine. Two volumes, 36 pages each. Complete design ownership — concept, layout, illustration direction, typography, and production.", tags: ["Print Design", "Editorial", "InDesign", "Typography", "Illustration Direction"], metrics: [{ val: "2", label: "Volumes" }, { val: "72", label: "Total Pages" }, { val: "100%", label: "Solo Design" }], github: null, accent: "var(--forest)", accentHex: "#2d7a45" },
];

export default function Work() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="pt-32 pb-24 px-8 md:px-12">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--sage)", textTransform: "uppercase", marginBottom: "16px" }}>// Portfolio</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(48px,8vw,96px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: "16px" }}>
          What I&apos;ve<br /><span style={{ color: "var(--purple)" }}>Built & Made</span>
        </h1>
        <p style={{ fontSize: "16px", color: "var(--text-3)", maxWidth: "500px", lineHeight: 1.8, marginBottom: "80px" }}>
          Production systems, AI tools, digital agencies, and magazines. Real work. Real impact.
        </p>

        <div className="flex flex-col gap-6">
          {projects.map((p) => (
            <div key={p.num} className="group bg-white border border-[var(--border)] p-8 md:p-12 overflow-hidden relative" style={{ transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${p.accentHex}18`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <div className="absolute top-0 left-0 bottom-0 w-1" style={{ background: p.accent }} />
              <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "36px", color: "var(--border)", lineHeight: 1 }}>{p.num}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full" style={{ background: p.accent, animation: p.status === "live" ? "blink 2s ease-in-out infinite" : "none" }} />
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: p.accent }}>{p.statusLabel}</span>
                      </div>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-4)", letterSpacing: "0.1em" }}>{p.type} · {p.year}</span>
                    </div>
                  </div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,42px)", letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "16px" }}>{p.name}</h2>
                  <p style={{ fontSize: "14px", color: "var(--text-3)", lineHeight: 1.8, maxWidth: "560px", marginBottom: "20px" }}>{p.desc}</p>
                  <div className="flex flex-wrap gap-2">{p.tags.map(t => <span key={t} className="pill">{t}</span>)}</div>
                </div>
                <div className="flex flex-row md:flex-col gap-6 md:gap-5 md:items-end md:min-w-[160px]">
                  {p.metrics.map(m => (
                    <div key={m.label} className="text-right">
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "22px", color: p.accent, lineHeight: 1 }}>{m.val}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", color: "var(--text-4)", textTransform: "uppercase" }}>{m.label}</div>
                    </div>
                  ))}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-2.5 px-5 mt-2" style={{ borderColor: p.accent, color: p.accent }}>
                      View Repo →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
