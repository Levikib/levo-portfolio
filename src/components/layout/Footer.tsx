"use client";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "var(--abyss)", position: "relative", overflow: "hidden" }}>
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(3,105,161,0.5), rgba(6,182,212,0.4), rgba(124,58,237,0.3), transparent)" }} />

      <div style={{ padding: "64px clamp(24px,5vw,64px) 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "48px", marginBottom: "56px" }} className="footer-grid">

            {/* Brand */}
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "30px", letterSpacing: "-0.02em", color: "white", marginBottom: "12px" }}>
                LK<span style={{ color: "var(--ocean-light)", textShadow: "0 0 12px rgba(14,165,233,0.6)" }}>.</span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: "200px", marginBottom: "20px" }}>
                Fullstack Engineer & SaaS Founder.<br />Nairobi, Kenya → World.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e", animation: "blink 2s ease-in-out infinite" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.16em", color: "rgba(34,197,94,0.7)", textTransform: "uppercase" }}>Available for hire</span>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: "16px" }}>Navigation</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[["Work", "/work"], ["Store", "/store"], ["Thoughts", "/blog"], ["About", "/about"]].map(([label, href]) => (
                  <a key={label} href={href} style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--ocean-light)"}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)"}
                  >{label}</a>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: "16px" }}>Connect</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "Email", href: "mailto:kibirielevis@gmail.com" },
                  { label: "LinkedIn", href: "https://linkedin.com/in/levis-kibirie-6bba13344" },
                  { label: "GitHub",   href: "https://github.com/Levikib" },
                ].map(item => (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--aqua-light)"}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)"}
                  >{item.label}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
              © {year} Levis Kibirie. Built with Next.js · Three.js · Meshy · Deployed on Vercel
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(6,182,212,0.4)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Different containers. Same force. 🌊
            </div>
          </div>
        </div>
      </div>

      <style>{`.footer-grid { grid-template-columns: 1fr 1fr 1fr; } @media(max-width:640px){.footer-grid{grid-template-columns:1fr!important;}}`}</style>
    </footer>
  );
}
