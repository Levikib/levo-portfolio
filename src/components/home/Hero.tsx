"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="h-24" />

      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-0 items-stretch">

        {/* LEFT: typography does the work */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-16 lg:py-0">

          <div className="flex items-center gap-3 mb-10" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
            fontFamily: "var(--font-mono)", fontSize: "10px",
            letterSpacing: "0.25em", textTransform: "uppercase",
            flexWrap: "wrap",
          }}>
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--forest-light)", animation: "blink 2s ease-in-out infinite", flexShrink: 0 }} />
            <span style={{ color: "var(--forest)" }}>Available for work</span>
            <span style={{ color: "var(--text-4)" }}>·</span>
            <span style={{ color: "var(--text-3)" }}>Nairobi, Kenya</span>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)", transition: "all 0.8s 0.08s cubic-bezier(0.16,1,0.3,1)" }}>
            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(56px,8.5vw,132px)", lineHeight: 0.88,
              letterSpacing: "-0.04em", color: "var(--text)",
            }}>
              Levis
            </h1>
            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(56px,8.5vw,132px)", lineHeight: 0.88,
              letterSpacing: "-0.04em", color: "var(--text)",
              marginBottom: "36px",
            }}>
              Kibirie<span style={{ color: "var(--purple)" }}>.</span>
            </h1>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s 0.18s cubic-bezier(0.16,1,0.3,1)" }}>
            <p className="max-w-md" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px,1.6vw,19px)", color: "var(--text-2)", lineHeight: 1.7, marginBottom: "32px" }}>
              Fullstack engineer and SaaS founder building production systems that move real money,
              <strong style={{ color: "var(--text)" }}> and designing them to feel as good as they work.</strong>
            </p>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 0.8s 0.22s cubic-bezier(0.16,1,0.3,1)", borderLeft: "2px solid var(--border)", paddingLeft: "16px", marginBottom: "32px", maxWidth: "380px" }}>
            <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "13px", color: "var(--text-3)", lineHeight: 1.7 }}>
              &quot;Water shapes its course according to the nature of the ground.&quot;
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", color: "var(--text-4)", textTransform: "uppercase", marginTop: "6px" }}>
              Sun Tzu, The Art of War
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-10" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 0.8s 0.26s cubic-bezier(0.16,1,0.3,1)" }}>
            {["Fullstack Engineer", "SaaS Founder", "Designer"].map(r => (
              <span key={r} style={{
                fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase",
                color: "var(--text-3)", border: "1px solid var(--border)", padding: "6px 14px",
              }}>{r}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 0.8s 0.34s cubic-bezier(0.16,1,0.3,1)" }}>
            <a href="#contact" className="btn-primary">Let&apos;s Work →</a>
            <a href="/work" className="btn-secondary">See My Work</a>
          </div>

          {/* Quiet stat strip, replaces the floating badge clutter */}
          <div className="flex flex-wrap gap-x-10 gap-y-4 mt-16" style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s 0.5s ease" }}>
            {[
              { val: "247+", label: "Active Tenants" },
              { val: "13", label: "GhostNet Modules" },
              { val: "8+", label: "Years in Tech" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "22px", color: "var(--text)", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", color: "var(--text-4)", textTransform: "uppercase", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: full original photo, grayscale, untouched background */}
        <div className="relative" style={{
          minHeight: "clamp(420px, 60vh, 900px)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1.1s 0.2s cubic-bezier(0.16,1,0.3,1)",
          background: "#0a0910",
        }}>
          <Image
            src="/levo-hero.jpg"
            alt="Levis Kibirie at a waterfall in Kenya: Fullstack Engineer and SaaS Founder"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            style={{ objectFit: "cover", objectPosition: "center 12%" }}
          />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-8 md:left-16 z-10 flex items-center gap-3" style={{ animation: "float 3s ease-in-out infinite" }}>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--forest-light)] to-transparent" />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", color: "var(--text-4)", textTransform: "uppercase" }}>Scroll to explore</span>
      </div>
    </section>
  );
}
