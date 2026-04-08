"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ParticleField from "@/components/ui/ParticleField";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef   = useRef<HTMLDivElement>(null);
  const badge1Ref  = useRef<HTMLDivElement>(null);
  const badge2Ref  = useRef<HTMLDivElement>(null);
  const badge3Ref  = useRef<HTMLDivElement>(null);
  const badge4Ref  = useRef<HTMLDivElement>(null);
  const ringRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);
    const onScroll = () => {
      const s  = window.pageYOffset;
      const sH = sectionRef.current?.offsetHeight ?? window.innerHeight;
      if (s > sH) {
        // reset everything cleanly when past section
        [photoRef, ringRef, badge1Ref, badge2Ref, badge3Ref, badge4Ref].forEach(r => {
          if (r.current) r.current.style.transform = "translateY(0px)";
        });
        return;
      }
      if (photoRef.current)  photoRef.current.style.transform  = `translateY(${s * 0.08}px)`;
      if (ringRef.current)   ringRef.current.style.transform   = `translateY(${s * 0.04}px)`;
      if (badge1Ref.current) badge1Ref.current.style.transform = `translateY(${s * 0.14}px)`;
      if (badge2Ref.current) badge2Ref.current.style.transform = `translateY(${s * 0.18}px)`;
      if (badge3Ref.current) badge3Ref.current.style.transform = `translateY(${s * 0.11}px)`;
      if (badge4Ref.current) badge4Ref.current.style.transform = `translateY(${s * 0.16}px)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const BLOB = "40% 60% 55% 45% / 45% 40% 60% 55%";

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "var(--bg)" }}>
      <ParticleField />

      {/* Ambient washes */}
      <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none z-0" style={{
        background: "radial-gradient(ellipse at 80% 40%, rgba(77,173,106,0.07) 0%, transparent 70%)"
      }}/>
      <div className="absolute bottom-0 left-0 w-[40%] h-[50%] pointer-events-none z-0" style={{
        background: "radial-gradient(ellipse at 20% 80%, rgba(124,58,237,0.06) 0%, transparent 60%)"
      }}/>

      <div className="h-24" />

      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 px-8 md:px-12 pb-12 items-center">

        {/* ── LEFT ── */}
        <div className="flex flex-col justify-center py-8">

          <div className="flex items-center gap-3 mb-8" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
            fontFamily:"var(--font-mono)", fontSize:"10px",
            letterSpacing:"0.25em", textTransform:"uppercase",
          }}>
            <span className="w-2 h-2 rounded-full" style={{ background:"var(--forest-light)", animation:"blink 2s ease-in-out infinite" }}/>
            <span style={{ color:"var(--forest)", whiteSpace:"nowrap" }}>Available</span>
            <span style={{ color:"var(--text-4)" }}>·</span>
            <span style={{ color:"var(--text-3)", whiteSpace:"nowrap" }}>Nairobi, Kenya</span>
            <span style={{ color:"var(--text-4)" }}>→</span>
            <span style={{ color:"var(--purple)", whiteSpace:"nowrap" }}>World</span>
          </div>

          <div style={{ opacity:loaded?1:0, transform:loaded?"translateY(0)":"translateY(30px)", transition:"all 0.8s 0.1s cubic-bezier(0.16,1,0.3,1)" }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"0.3em", color:"var(--text-4)", textTransform:"uppercase", marginBottom:"8px" }}>Hi, I&apos;m</div>
            <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(52px,7vw,88px)", lineHeight:0.95, letterSpacing:"-0.03em", color:"var(--text)", marginBottom:"4px" }}>Levis</h1>
            <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(52px,7vw,88px)", lineHeight:0.95, letterSpacing:"-0.03em", color:"var(--purple)", display:"block", marginBottom:"28px" }}>Kibirie.</h1>
          </div>

          <div className="flex flex-wrap gap-2 mb-8" style={{ opacity:loaded?1:0, transform:loaded?"translateY(0)":"translateY(20px)", transition:"all 0.8s 0.2s cubic-bezier(0.16,1,0.3,1)" }}>
            {[
              { label:"Fullstack Engineer", color:"var(--purple)", bg:"var(--purple-pale)" },
              { label:"SaaS Founder",       color:"var(--forest)", bg:"var(--forest-pale)" },
              { label:"Graphic Designer",   color:"var(--earth)",  bg:"var(--earth-pale)"  },
              { label:"Creative",           color:"var(--purple)", bg:"var(--purple-pale)" },
            ].map(r => (
              <span key={r.label} style={{ background:r.bg, color:r.color, fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", padding:"5px 12px" }}>{r.label}</span>
            ))}
          </div>

          <p className="max-w-sm mb-10" style={{ fontFamily:"var(--font-body)", fontSize:"15px", color:"var(--text-3)", lineHeight:1.8, opacity:loaded?1:0, transform:loaded?"translateY(0)":"translateY(20px)", transition:"all 0.8s 0.3s cubic-bezier(0.16,1,0.3,1)" }}>
            Engineer who builds systems that move real money. Designer who makes things people actually feel.
            <strong style={{ color:"var(--text)" }}> 8+ years</strong> turning ideas into production.
          </p>

          <div className="flex flex-wrap gap-3" style={{ opacity:loaded?1:0, transform:loaded?"translateY(0)":"translateY(20px)", transition:"all 0.8s 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
            <a href="#contact" className="btn-primary">Let&apos;s Work →</a>
            <a href="/work"    className="btn-secondary">See My Work</a>
          </div>
        </div>

        {/* ── RIGHT — pure layout column, zero bg/shadow/border ── */}
        <div style={{
          position:"relative",
          display:"flex", alignItems:"center", justifyContent:"center",
          padding:"90px 70px",
          opacity: loaded ? 1 : 0,
          transition:"opacity 1s 0.3s cubic-bezier(0.16,1,0.3,1)",
          background:"transparent", boxShadow:"none", border:"none",
        }}>

          {/* Rings layer — slowest parallax */}
          <div ref={ringRef} style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none", willChange:"transform" }}>
            <div style={{ position:"absolute", width:"360px", height:"360px", borderRadius:"50%", border:"1px dashed rgba(77,173,106,0.22)", animation:"spinSlow 40s linear infinite" }}/>
            <div style={{ position:"absolute", width:"295px", height:"295px", borderRadius:"50%", border:"1.5px solid rgba(124,58,237,0.13)" }}/>
          </div>

          {/* Photo layer — medium parallax */}
          <div ref={photoRef} style={{ position:"relative", zIndex:2, willChange:"transform" }}>

            {/* Outer glow ring — same border-radius as photo, NO overflow */}
            <div style={{
              position:"absolute", inset:"-4px",
              borderRadius: BLOB,
              border:"2px solid rgba(124,58,237,0.22)",
              pointerEvents:"none",
            }}/>

            {/* White outline ring */}
            <div style={{
              position:"absolute", inset:"-2px",
              borderRadius: BLOB,
              border:"2px solid rgba(255,255,255,0.85)",
              pointerEvents:"none",
              zIndex:3,
            }}/>

            {/* Photo — overflow:hidden clips image to shape cleanly */}
            <div style={{
              position:"relative",
              width:"260px", height:"320px",
              borderRadius: BLOB,
              overflow:"hidden",
            }}>
              <Image
                src="/levo.jpg"
                alt="Levis Kibirie — Fullstack Engineer & SaaS Founder from Nairobi, Kenya"
                width={260}
                height={320}
                priority
                style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 20%", filter:"saturate(1.1) contrast(1.03)", display:"block" }}
              />
              {/* Gradient overlay — INSIDE overflow:hidden so it clips perfectly */}
              <div style={{
                position:"absolute", bottom:0, left:0, right:0, height:"45%",
                background:"linear-gradient(to top, rgba(15,61,31,0.3) 0%, transparent 100%)",
                pointerEvents:"none",
              }}/>
            </div>
          </div>

          {/* ── BADGES — each on own layer with own ref ── */}

          {/* Nairobi — top left */}
          <div ref={badge1Ref} style={{ position:"absolute", top:"16px", left:"4px", zIndex:5, willChange:"transform" }}>
            <div style={{ background:"rgba(255,255,255,0.85)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", border:"1px solid rgba(45,122,69,0.2)", borderRadius:"999px", padding:"7px 14px", display:"flex", alignItems:"center", gap:"7px", animation:"float 5s ease-in-out infinite" }}>
              <span style={{ fontSize:"13px" }}>🌿</span>
              <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.12em", color:"var(--forest)", textTransform:"uppercase", fontWeight:600 }}>Nairobi</span>
            </div>
          </div>

          {/* 247+ tenants — top right */}
          <div ref={badge2Ref} style={{ position:"absolute", top:"24px", right:"4px", zIndex:5, willChange:"transform" }}>
            <div style={{ background:"rgba(255,255,255,0.85)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", border:"1px solid var(--border)", borderRadius:"12px", padding:"12px 16px", animation:"float 4s ease-in-out infinite", minWidth:"108px" }}>
              <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"24px", color:"var(--purple)", lineHeight:1 }}>247+</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.12em", color:"var(--text-4)", textTransform:"uppercase", marginTop:"3px" }}>Tenants Managed</div>
            </div>
          </div>

          {/* GhostNet — bottom right */}
          <div ref={badge3Ref} style={{ position:"absolute", bottom:"24px", right:"4px", zIndex:5, willChange:"transform" }}>
            <div style={{ background:"rgba(255,255,255,0.85)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:"12px", padding:"12px 16px", animation:"float 4s 1.2s ease-in-out infinite", minWidth:"108px" }}>
              <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"18px", color:"#059669", lineHeight:1 }}>GhostNet</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.12em", color:"var(--text-4)", textTransform:"uppercase", marginTop:"3px" }}>Cybersec · Live</div>
            </div>
          </div>

          {/* 8+ Yrs — bottom left */}
          <div ref={badge4Ref} style={{ position:"absolute", bottom:"36px", left:"4px", zIndex:5, willChange:"transform" }}>
            <div style={{ background:"rgba(255,255,255,0.85)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", border:"1px solid rgba(45,122,69,0.2)", borderRadius:"12px", padding:"12px 16px", animation:"float 4s 2.2s ease-in-out infinite" }}>
              <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"18px", color:"var(--forest)", lineHeight:1 }}>8+ Yrs</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.12em", color:"var(--text-4)", textTransform:"uppercase", marginTop:"3px" }}>In Tech</div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-12 z-10 flex items-center gap-3" style={{ animation:"float 3s ease-in-out infinite" }}>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--forest-light)] to-transparent"/>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"var(--text-4)", textTransform:"uppercase" }}>Scroll to explore</span>
      </div>
    </section>
  );
}
