"use client";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "rgba(10,8,5,0.98)", position: "relative", overflow: "hidden" }}>
      {/* Glass strip at top */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(77,173,106,0.4), transparent)" }} />

      <div className="px-8 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Brand */}
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "32px", letterSpacing: "-0.02em", color: "white", marginBottom: "12px" }}>
              LK<span style={{ color: "var(--purple-light)" }}>.</span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: "220px" }}>
              Fullstack Engineer & SaaS Founder. Nairobi, Kenya → World.
            </p>
          </div>

          {/* Links */}
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "16px" }}>Navigation</div>
            <div className="flex flex-col gap-3">
              {[["Work", "/work"], ["Store", "/store"], ["Thoughts", "/blog"], ["About", "/about"]].map(([label, href]) => (
                <a key={label} href={href} style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = "white"}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.55)"}
                >{label}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "16px" }}>Connect</div>
            <div className="flex flex-col gap-3">
              {[
                { label: "Email", href: "mailto:leviskibirie2110@gmail.com" },
                { label: "LinkedIn", href: "https://linkedin.com/in/levis-kibirie-6bba13344" },
                { label: "GitHub", href: "https://github.com/Levikib" },
              ].map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--purple-light)"}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.55)"}
                >{item.label}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
            © {year} Levis Kibirie. Built with Next.js · Deployed on Vercel
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--forest-light)", animation: "blink 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em" }}>AVAILABLE FOR HIRE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
