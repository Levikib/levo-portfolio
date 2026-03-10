"use client";
const products = [
  {
    title: "Chill Minds Vol. 1",
    subtitle: "Kids Mental Wellness Magazine",
    price: "KSH 299",
    priceUSD: "$2.30",
    tag: "Magazine",
    accent: "var(--rose)",
    bg: "var(--rose-pale)",
    pages: "36 pages",
    year: "2024",
    desc: "A beautifully designed magazine tackling mental health and wellness for children. Full layout, illustration direction, and typography — completely designed by Levis.",
    link: "https://gumroad.com",
    status: "available",
  },
  {
    title: "Chill Minds Vol. 2",
    subtitle: "Kids Mental Wellness Magazine",
    price: "KSH 299",
    priceUSD: "$2.30",
    tag: "Magazine",
    accent: "var(--purple)",
    bg: "var(--purple-pale)",
    pages: "36 pages",
    year: "2025",
    desc: "The second volume expands the Chill Minds universe with new themes, deeper stories, and more vibrant visuals. Same commitment to children's wellbeing.",
    link: "https://gumroad.com",
    status: "available",
  },
  {
    title: "Brand Starter Kit",
    subtitle: "Digital Product — Coming Soon",
    price: "KSH 1,500",
    priceUSD: "$12",
    tag: "Design Assets",
    accent: "var(--amber)",
    bg: "var(--earth-pale)",
    pages: "Templates + Guide",
    year: "2026",
    desc: "Logo templates, color palette guides, and typography systems for SMEs who want professional branding without agency prices.",
    link: null,
    status: "coming",
  },
  {
    title: "SaaS Founder Playbook",
    subtitle: "Digital Download — Coming Soon",
    price: "KSH 2,000",
    priceUSD: "$15",
    tag: "Guide",
    accent: "var(--forest)",
    bg: "var(--forest-pale)",
    pages: "40+ pages",
    year: "2026",
    desc: "Everything I learned building Makeja Homes from scratch — architecture decisions, payment integrations, multi-tenancy patterns, and what I'd do differently.",
    link: null,
    status: "coming",
  },
];

export default function Store() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="pt-32 pb-24 px-8 md:px-12">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--amber)", textTransform: "uppercase", marginBottom: "16px" }}>// Digital Store</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(48px,8vw,96px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: "16px" }}>
          Products &<br /><span style={{ color: "var(--purple)" }}>Publications</span>
        </h1>
        <p style={{ fontSize: "16px", color: "var(--text-3)", maxWidth: "480px", lineHeight: 1.8, marginBottom: "64px" }}>
          Magazines, design assets, and digital guides. Made with care, priced for access.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p, i) => (
            <div key={i} className="group bg-white border border-[var(--border)] overflow-hidden" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.04)", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 20px rgba(0,0,0,0.04)"; }}
            >
              {/* Cover area */}
              <div className="h-52 flex items-center justify-center relative" style={{ background: p.bg }}>
                <div className="text-center">
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "32px", color: p.accent, marginBottom: "8px" }}>{p.title}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", color: p.accent, opacity: 0.6, textTransform: "uppercase" }}>{p.subtitle}</div>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span style={{ background: p.accent, color: "white", fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px" }}>{p.tag}</span>
                  {p.status === "coming" && <span style={{ background: "var(--text)", color: "white", fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px" }}>Coming Soon</span>}
                </div>
                <div className="absolute top-4 right-4" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: p.accent, opacity: 0.7 }}>{p.pages}</div>
              </div>

              {/* Info */}
              <div className="p-8">
                <p style={{ fontSize: "14px", color: "var(--text-3)", lineHeight: 1.8, marginBottom: "20px" }}>{p.desc}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "22px", color: p.accent }}>{p.price}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-4)" }}>{p.priceUSD} USD</div>
                  </div>
                  {p.status === "available" && p.link ? (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-primary py-3 px-6" style={{ background: p.accent }}>
                      Buy Now →
                    </a>
                  ) : (
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.15em", color: "var(--text-4)", textTransform: "uppercase", border: "1px solid var(--border)", padding: "10px 16px" }}>Notify Me</span>
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
