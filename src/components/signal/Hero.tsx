import { MAKEJA, CAREER, fmt } from "@/data/facts";
import { HERO } from "@/data/media";
import { Star, Squiggle, Arrow, Underline, Bolt, Burst } from "./Doodles";
import ClayCard from "./ClayCard";
import ClayButton from "./ClayButton";
import Marquee from "./Marquee";

const STAGES = "idea  ·  design  ·  build  ·  verify  ·  ship  ·  ";

export default function Hero() {
  const stats = [
    { v: fmt(MAKEJA.tenants), l: "tenants on Makeja Homes", a: "#ff8a1f" },
    { v: fmt(MAKEJA.units), l: "units managed", a: "#d4ff3a" },
    { v: fmt(CAREER.years), l: CAREER.years.label, a: "#8b7cff" },
    { v: fmt(MAKEJA.clients), l: "client companies", a: "#6fe7ff" },
  ];

  return (
    <section className="sp-hero" aria-labelledby="hero-title">
      <Star className="sp-float sp-hide-xs" style={{ position: "absolute", top: 120, left: "46%", width: 30, ["--r" as string]: "-12deg" }} />
      <Squiggle className="sp-hide-xs" style={{ position: "absolute", top: "62%", left: -10, width: 160 }} />

      <div className="sp-wrap">
        <div className="sp-hero__grid">
          <div style={{ position: "relative" }}>
            <span className="sp-hand sp-hero__hey">Hey, I&apos;m</span>
            <Arrow style={{ position: "absolute", left: 140, top: -4, width: 70, transform: "rotate(-20deg)" }} />
            <h1 id="hero-title" className="sp-display sp-hero__name">
              LEVO<span>.</span>
            </h1>
            <div style={{ position: "relative", width: "min(520px, 80%)", height: 18, marginTop: 10 }}>
              <Underline style={{ width: "100%", height: 18 }} />
            </div>
            <div className="sp-hero__role">
              <span>Product engineer</span>
              <span>Designer</span>
              <span>SaaS founder</span>
            </div>
            <p className="sp-hero__lede">
              I build systems that move real money and real people, then design them to feel right. Founder of Makeja Homes. Based in Nairobi, working worldwide.
            </p>
            <div className="cta-row sp-hero__ctas">
              <ClayButton href="#path" variant="primary" size="lg" icon="↓">Follow the signal</ClayButton>
              <ClayButton href="/#contact" variant="ghost" size="lg">Hire me</ClayButton>
            </div>
          </div>

          <div className="sp-stage">
            <div className="sp-stage__halo" aria-hidden />
            {/* back half of the ribbon, behind the orb */}
            <svg className="sp-stage__ribbon" viewBox="0 0 600 600" aria-hidden style={{ zIndex: 0 }}>
              <defs>
                <linearGradient id="ribBack" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#a8560c" />
                  <stop offset="1" stopColor="#5a2a03" />
                </linearGradient>
              </defs>
              <path d="M40 380 C 120 120, 480 90, 560 250" stroke="url(#ribBack)" strokeWidth="32" fill="none" strokeLinecap="round" />
            </svg>
            <div className="sp-stage__orb" style={{ zIndex: 1 }} data-slot={HERO.loop.note}>
              {HERO.loop.ready ? (
                <video autoPlay muted loop playsInline poster={HERO.loop.poster} aria-label="Animated 3D centrepiece">
                  <source src={HERO.loop.src} type="video/mp4" />
                </video>
              ) : HERO.avatar.ready ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={HERO.avatar.src} alt="Illustrated 3D character of Levis Kibirie" />
              ) : (
                <div className="sp-key" aria-hidden>
                  <div className="sp-key__cap"><span className="sp-key__glyph">&gt;_</span></div>
                </div>
              )}
            </div>
            <span className="sp-pebble sp-pebble--violet sp-float" aria-hidden style={{ zIndex: 1, ["--r" as string]: "0deg" }} />
            <span className="sp-pebble sp-pebble--amber sp-float" aria-hidden style={{ zIndex: 3, animationDelay: "2s" }} />
            {/* front half of the ribbon, over the orb, with the build stages riding on it */}
            <svg className="sp-stage__ribbon" viewBox="0 0 600 600" aria-hidden style={{ zIndex: 2 }}>
              <defs>
                <linearGradient id="rib" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffd39a" />
                  <stop offset=".35" stopColor="#ffa040" />
                  <stop offset=".75" stopColor="#ff8a1f" />
                  <stop offset="1" stopColor="#c45a00" />
                </linearGradient>
                <filter id="ribShadow" x="-20%" y="-20%" width="140%" height="160%">
                  <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#000" floodOpacity=".6" />
                </filter>
                <path id="ribPath" d="M560 250 C 600 420, 220 560, 40 380" />
              </defs>
              <use href="#ribPath" stroke="url(#rib)" strokeWidth="38" fill="none" strokeLinecap="round" filter="url(#ribShadow)" />
              <use href="#ribPath" stroke="rgba(255,255,255,.35)" strokeWidth="2" fill="none" transform="translate(0 -15)" />
              <text fontFamily="var(--font-mono)" fontSize="15" fontWeight="600" fill="#2a1400" letterSpacing="2" dy="5">
                <textPath href="#ribPath" startOffset="4%">{STAGES + STAGES}</textPath>
              </text>
            </svg>

            <div className="sp-bubble sp-hand sp-float" style={{ top: "2%", left: "-4%", ["--r" as string]: "-6deg", zIndex: 3 }}>
              let&apos;s build<br />something real!
            </div>
            <div className="sp-sticker sp-float" style={{ bottom: "4%", right: "-2%", zIndex: 3, animationDelay: "1.5s", ["--r" as string]: "3deg" }}>
              <Bolt style={{ width: 18 }} />
              <div><b>{fmt(MAKEJA.leases)}</b><small>leases signed online</small></div>
            </div>
            <Burst style={{ position: "absolute", top: "20%", right: "2%", width: 46, zIndex: 3 }} />
          </div>
        </div>

        <ul className="clay-grid clay-grid--4 sp-hero__stats" style={{ listStyle: "none" }}>
          {stats.map((s) => (
            <ClayCard as="li" key={s.l} accent={s.a} pad="sm">
              <span className="stat__bar" aria-hidden />
              <div className="stat__v">{s.v}</div>
              <div className="stat__l">{s.l}</div>
            </ClayCard>
          ))}
        </ul>
      </div>

      <div className="sp-hero__marquee">
        <Marquee items={["Idea", "Design", "Build", "Verify", "Ship", "Schema per tenant", "Paystack + M-Pesa", "KRA eTIMS", "The Real Estate OS"]} />
      </div>
    </section>
  );
}
