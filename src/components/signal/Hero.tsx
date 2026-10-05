import Link from "next/link";
import { MAKEJA, CAREER, fmt } from "@/data/facts";
import { HERO } from "@/data/media";
import { Star, Squiggle, Arrow, Underline, Bolt, Burst } from "./Doodles";

const STAGES = "idea  ·  design  ·  build  ·  verify  ·  ship  ·  ";

export default function Hero() {
  const stats = [
    { v: fmt(MAKEJA.tenants), l: "tenants on Makeja Homes" },
    { v: fmt(MAKEJA.units), l: "units managed" },
    { v: fmt(CAREER.years), l: CAREER.years.label },
    { v: fmt(CAREER.banking), l: CAREER.banking.label },
  ];

  return (
    <section className="sp-hero" aria-labelledby="hero-title">
      <Star className="sp-float" style={{ position: "absolute", top: 120, left: "46%", width: 30, ["--r" as string]: "-12deg" }} />
      <Squiggle style={{ position: "absolute", bottom: 140, left: -10, width: 160 }} />

      <div className="sp-wrap">
        <div className="sp-hero__grid">
          <div style={{ position: "relative" }}>
            <span className="sp-hand sp-hero__hey">Hey, I&apos;m</span>
            <Arrow style={{ position: "absolute", left: 120, top: -6, width: 70, transform: "rotate(-20deg)" }} />
            <h1 id="hero-title" className="sp-display sp-hero__name">
              LEVO<span>.</span>
            </h1>
            <div style={{ position: "relative", width: "min(520px, 80%)", height: 18, marginTop: 4 }}>
              <Underline style={{ width: "100%", height: 18 }} />
            </div>
            <div className="sp-hero__role">
              <span>Product engineer</span><i />
              <span>Designer</span><i />
              <span>SaaS founder</span>
            </div>
            <p className="sp-hero__lede">
              I build systems that move real money and real people, then design them to feel right. Founder of Makeja Homes. Four years inside core banking. Based in Nairobi, working worldwide.
            </p>
            <div className="sp-hero__ctas">
              <Link href="#path" className="sp-btn sp-btn--primary">Follow the signal ↓</Link>
              <Link href="/work" className="sp-btn sp-btn--ghost">All case studies ↗</Link>
            </div>
          </div>

          <div className="sp-stage">
            {/* back half of the ribbon, behind the orb */}
            <svg className="sp-stage__ribbon" viewBox="0 0 600 600" aria-hidden style={{ zIndex: 0 }}>
              <path d="M40 380 C 120 120, 480 90, 560 250" stroke="#7a3d08" strokeWidth="30" fill="none" strokeLinecap="round" />
            </svg>
            <div className="sp-stage__orb" style={{ zIndex: 1 }}>
              {HERO.loop.ready ? (
                <video autoPlay muted loop playsInline poster={HERO.loop.poster} aria-label="Animated 3D centrepiece">
                  <source src={HERO.loop.src} type="video/mp4" />
                </video>
              ) : HERO.avatar.ready ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={HERO.avatar.src} alt="Illustrated portrait of Levis Kibirie" />
              ) : (
                <div className="sp-stage__slot">
                  <div style={{ color: "var(--sp-signal)", marginBottom: 8 }}>[ HERO SLOT ]</div>
                  {HERO.loop.note}
                  <br />or the illustrated avatar
                </div>
              )}
            </div>
            {/* front half of the ribbon, over the orb, with the build stages riding on it */}
            <svg className="sp-stage__ribbon" viewBox="0 0 600 600" aria-hidden style={{ zIndex: 2 }}>
              <defs>
                <linearGradient id="rib" x1="0" x2="1">
                  <stop offset="0" stopColor="#ff8a1f" />
                  <stop offset="1" stopColor="#ffb35c" />
                </linearGradient>
                <path id="ribPath" d="M560 250 C 600 420, 220 560, 40 380" />
              </defs>
              <use href="#ribPath" stroke="url(#rib)" strokeWidth="34" fill="none" strokeLinecap="round" />
              <text fontFamily="var(--font-mono)" fontSize="15" fill="#2a1400" letterSpacing="2" dy="5">
                <textPath href="#ribPath" startOffset="4%">{STAGES + STAGES}</textPath>
              </text>
            </svg>

            <div className="sp-bubble sp-hand sp-float" style={{ top: "2%", left: "-4%", ["--r" as string]: "-8deg", zIndex: 3 }}>
              let&apos;s build<br />something real!
            </div>
            <div className="sp-sticker sp-float" style={{ bottom: "6%", right: "-2%", zIndex: 3, animationDelay: "1.5s" }}>
              <Bolt style={{ width: 18 }} />
              <div><b>{fmt(MAKEJA.leases)}</b><div style={{ color: "var(--sp-muted)", fontSize: 12 }}>leases signed online</div></div>
            </div>
            <Burst style={{ position: "absolute", top: "18%", right: "4%", width: 46, zIndex: 3 }} />
          </div>
        </div>

        <div className="sp-stats">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="sp-stat__v">{s.v}</div>
              <div className="sp-stat__l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
