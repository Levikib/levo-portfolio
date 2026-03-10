"use client";
import { useEffect, useState } from "react";
import ParticleField from "@/components/ui/ParticleField";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const onScroll = () => {
      const scrolled = window.pageYOffset;
      const photoEl = document.querySelector(".hero-photo-wrap") as HTMLElement;
      if (photoEl) photoEl.style.transform = `translateY(${scrolled * 0.12}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: "var(--bg)" }}>
      <ParticleField />

      {/* Soft forest gradient wash — top right */}
      <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none z-0" style={{
        background: "radial-gradient(ellipse at 80% 40%, rgba(77,173,106,0.07) 0%, rgba(26,92,46,0.04) 40%, transparent 70%)"
      }} />
      {/* Warm earth wash — bottom left */}
      <div className="absolute bottom-0 left-0 w-[40%] h-[50%] pointer-events-none z-0" style={{
        background: "radial-gradient(ellipse at 20% 80%, rgba(124,58,237,0.06) 0%, transparent 60%)"
      }} />

      <div className="h-24" />

      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 px-8 md:px-12 pb-12 items-center">

        {/* LEFT */}
        <div className="flex flex-col justify-center py-8">

          {/* Availability */}
          <div className="flex items-center gap-3 mb-8" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
            fontFamily: "var(--font-mono)", fontSize: "10px",
            letterSpacing: "0.25em", textTransform: "uppercase",
          }}>
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--forest-light)", animation: "blink 2s ease-in-out infinite" }} />
            <span style={{ color: "var(--forest)" }}>Available</span>
            <span style={{ color: "var(--text-4)" }}>·</span>
            <span style={{ color: "var(--text-3)" }}>Nairobi, Kenya</span>
            <span style={{ color: "var(--text-4)" }}>→</span>
            <span style={{ color: "var(--purple)" }}>World</span>
          </div>

          {/* Name */}
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s 0.1s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "11px",
              letterSpacing: "0.3em", color: "var(--text-4)",
              textTransform: "uppercase", marginBottom: "8px",
            }}>Hi, I&apos;m</div>
            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(52px, 7vw, 88px)",
              lineHeight: 0.95, letterSpacing: "-0.03em",
              color: "var(--text)", marginBottom: "4px",
            }}>Levis</h1>
            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(52px, 7vw, 88px)",
              lineHeight: 0.95, letterSpacing: "-0.03em",
              color: "var(--purple)", display: "block", marginBottom: "28px",
            }}>Kibirie.</h1>
          </div>

          {/* Role tags */}
          <div className="flex flex-wrap gap-2 mb-8" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s 0.2s cubic-bezier(0.16,1,0.3,1)",
          }}>
            {[
              { label: "Fullstack Engineer", color: "var(--purple)", bg: "var(--purple-pale)" },
              { label: "SaaS Founder", color: "var(--forest)", bg: "var(--forest-pale)" },
              { label: "Graphic Designer", color: "var(--earth)", bg: "var(--earth-pale)" },
              { label: "Creative", color: "var(--purple)", bg: "var(--purple-pale)" },
            ].map((role) => (
              <span key={role.label} style={{
                background: role.bg, color: role.color,
                fontFamily: "var(--font-mono)", fontSize: "10px",
                letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "5px 12px", display: "inline-block",
              }}>{role.label}</span>
            ))}
          </div>

          {/* Bio */}
          <p className="max-w-sm mb-10" style={{
            fontFamily: "var(--font-body)", fontSize: "15px",
            color: "var(--text-3)", lineHeight: 1.8,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s 0.3s cubic-bezier(0.16,1,0.3,1)",
          }}>
            Engineer who builds systems that move real money. Designer who makes things people actually feel.
            <strong style={{ color: "var(--text-2)" }}> 8+ years</strong> turning ideas into production.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <a href="mailto:leviskibirie2110@gmail.com" className="btn-primary">Hire Me →</a>
            <a href="#work" className="btn-secondary">See My Work</a>
          </div>
        </div>

        {/* RIGHT — Photo, organic, forest-integrated */}
        <div className="hero-photo-wrap relative flex items-center justify-center py-8 lg:py-0" style={{
          opacity: loaded ? 1 : 0,
          transition: "all 1s 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}>

          {/* Organic blob shape behind photo */}
          <div className="absolute" style={{
            width: "380px", height: "420px",
            background: "radial-gradient(ellipse at 45% 55%, rgba(77,173,106,0.12) 0%, rgba(124,58,237,0.06) 50%, transparent 75%)",
            borderRadius: "60% 40% 55% 45% / 45% 55% 45% 55%",
            filter: "blur(2px)",
          }} />

          {/* Decorative leaf/organic ring */}
          <div className="absolute rounded-full" style={{
            width: "360px", height: "360px",
            border: "1px dashed rgba(77,173,106,0.25)",
            animation: "spinSlow 40s linear infinite",
          }} />
          <div className="absolute rounded-full" style={{
            width: "300px", height: "300px",
            border: "1.5px solid rgba(124,58,237,0.15)",
          }} />

          {/* THE PHOTO — organic rounded rectangle, not a stiff circle */}
          <div style={{
            width: "260px", height: "320px",
            borderRadius: "40% 60% 55% 45% / 45% 40% 60% 55%",
            overflow: "hidden",
            position: "relative", zIndex: 2,
            boxShadow: "0 30px 80px rgba(26,92,46,0.15), 0 0 0 3px white, 0 0 0 5px rgba(124,58,237,0.2)",
          }}>
            <img
              src="/levo.jpg"
              alt="Levis Kibirie"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover",
                objectPosition: "center 20%",
                filter: "saturate(1.1) contrast(1.03)",
              }}
            />
            {/* Subtle forest overlay at bottom */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
              background: "linear-gradient(to top, rgba(15,61,31,0.35) 0%, transparent 100%)",
            }} />
          </div>

          {/* Floating location badge */}
          <div className="absolute top-12 left-4 lg:left-0 bg-white rounded-full px-4 py-2 shadow-md flex items-center gap-2" style={{
            border: "1px solid var(--forest-pale)",
            animation: "float 5s ease-in-out infinite",
            zIndex: 3,
          }}>
            <span style={{ fontSize: "14px" }}>🌿</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", color: "var(--forest)", textTransform: "uppercase" }}>Nairobi</span>
          </div>

          {/* Stats — floating cards */}
          <div className="absolute top-20 right-2 lg:-right-2 bg-white rounded-lg p-4 shadow-lg" style={{
            border: "1px solid var(--border)",
            animation: "float 4s ease-in-out infinite",
            zIndex: 3, minWidth: "110px",
          }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "26px", color: "var(--purple)", lineHeight: 1 }}>170+</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", color: "var(--text-4)", textTransform: "uppercase", marginTop: "3px" }}>Units Managed</div>
          </div>

          <div className="absolute bottom-16 right-2 lg:-right-2 bg-white rounded-lg p-4 shadow-lg" style={{
            border: "1px solid var(--border)",
            animation: "float 4s 1.2s ease-in-out infinite",
            zIndex: 3, minWidth: "110px",
          }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "20px", color: "var(--earth)", lineHeight: 1 }}>KSH 1.5M</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", color: "var(--text-4)", textTransform: "uppercase", marginTop: "3px" }}>Monthly Volume</div>
          </div>

          <div className="absolute bottom-28 left-4 lg:left-0 bg-white rounded-lg p-4 shadow-lg" style={{
            border: "1px solid var(--forest-pale)",
            animation: "float 4s 2.2s ease-in-out infinite",
            zIndex: 3,
          }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "20px", color: "var(--forest)", lineHeight: 1 }}>8+ Yrs</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", color: "var(--text-4)", textTransform: "uppercase", marginTop: "3px" }}>In Tech</div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-12 z-10 flex items-center gap-3" style={{ animation: "float 3s ease-in-out infinite" }}>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--forest-light)] to-transparent" />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", color: "var(--text-4)", textTransform: "uppercase" }}>Scroll to explore</span>
      </div>
    </section>
  );
}
