"use client";
import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// ── WATER DROPLET 3D MODEL ────────────────────────────────────────────────────
function WaterDroplet() {
  const { scene } = useGLTF("/models/water-droplet.glb");
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.18;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.08;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.8}>
      <primitive ref={ref} object={scene} scale={1.8} position={[0, -0.3, 0]} />
    </Float>
  );
}

// ── RAIN PARTICLES (canvas 2D) ────────────────────────────────────────────────
type Drop = { x: number; y: number; speed: number; length: number; opacity: number };

function RainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef  = useRef<{ drops: Drop[]; raf: number }>({ drops: [], raf: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 80;
    stateRef.current.drops = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 1.2 + Math.random() * 2.2,
      length: 8 + Math.random() * 16,
      opacity: 0.04 + Math.random() * 0.1,
    }));

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const d of stateRef.current.drops) {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.length * 0.15, d.y + d.length);
        ctx.strokeStyle = `rgba(3,105,161,${d.opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        d.y += d.speed;
        if (d.y > canvas.height + d.length) {
          d.y = -d.length;
          d.x = Math.random() * canvas.width;
        }
      }
      stateRef.current.raf = requestAnimationFrame(loop);
    };
    stateRef.current.raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(stateRef.current.raf);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 1,
    }} />
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [loaded, setLoaded]   = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const badge1Ref  = useRef<HTMLDivElement>(null);
  const badge2Ref  = useRef<HTMLDivElement>(null);
  const badge3Ref  = useRef<HTMLDivElement>(null);
  const badge4Ref  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);
    const onScroll = () => {
      const s  = window.scrollY;
      const sH = sectionRef.current?.offsetHeight ?? window.innerHeight;
      if (s > sH) return;
      if (badge1Ref.current) badge1Ref.current.style.transform = `translateY(${s * 0.14}px)`;
      if (badge2Ref.current) badge2Ref.current.style.transform = `translateY(${s * 0.18}px)`;
      if (badge3Ref.current) badge3Ref.current.style.transform = `translateY(${s * 0.11}px)`;
      if (badge4Ref.current) badge4Ref.current.style.transform = `translateY(${s * 0.16}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} style={{
      position: "relative", minHeight: "100vh",
      background: "var(--bg)", overflow: "hidden",
      display: "flex", flexDirection: "column",
    }}>
      {/* Rain layer */}
      <RainCanvas />

      {/* Ocean depth glow — top right */}
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "55%", height: "70%", background: "radial-gradient(ellipse at 80% 20%, rgba(3,105,161,0.1) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />
      {/* Aqua glow — bottom left */}
      <div style={{ position: "absolute", bottom: "0", left: "-5%", width: "45%", height: "50%", background: "radial-gradient(ellipse at 20% 80%, rgba(6,182,212,0.08) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />
      {/* Purple accent — mid */}
      <div style={{ position: "absolute", top: "40%", left: "40%", width: "30%", height: "40%", background: "radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ height: "96px" }} />

      <div style={{
        position: "relative", zIndex: 10, flex: 1,
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 0, padding: "0 clamp(24px,5vw,64px)", paddingBottom: "48px",
        alignItems: "center",
      }} className="hero-grid">

        {/* ── LEFT ── */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "32px 0" }}>

          {/* Status badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px",
            flexWrap: "wrap",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", animation: "blink 2s ease-in-out infinite", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(34,197,94,0.9)", textTransform: "uppercase" }}>Available for work</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-4)" }}>·</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.12em", color: "var(--text-3)", textTransform: "uppercase" }}>Nairobi → World</span>
          </div>

          {/* Name */}
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s 0.1s cubic-bezier(0.16,1,0.3,1)", marginBottom: "20px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.3em", color: "var(--text-4)", textTransform: "uppercase", marginBottom: "8px" }}>Hi, I&apos;m</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(48px,6.5vw,84px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: "4px" }}>Levis</h1>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(48px,6.5vw,84px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: "var(--ocean)", display: "block", marginBottom: "4px" }}>Kibirie.</h1>
            {/* Water metaphor tagline */}
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--aqua)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "12px", opacity: 0.85 }}>
              Different containers. Same force.
            </p>
          </div>

          {/* Role pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s 0.2s cubic-bezier(0.16,1,0.3,1)" }}>
            {[
              { label: "Fullstack Engineer", c: "var(--ocean)",  bg: "var(--ocean-pale)" },
              { label: "SaaS Founder",       c: "var(--purple)", bg: "var(--purple-pale)" },
              { label: "Graphic Designer",   c: "var(--aqua)",   bg: "var(--aqua-pale)" },
              { label: "Creative",           c: "var(--text-2)", bg: "rgba(255,255,255,0.7)" },
            ].map(r => (
              <span key={r.label} style={{ background: r.bg, color: r.c, fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 12px", border: "1px solid rgba(3,105,161,0.1)" }}>{r.label}</span>
            ))}
          </div>

          {/* Description */}
          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--text-3)", lineHeight: 1.85, maxWidth: "460px", marginBottom: "36px", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s 0.3s cubic-bezier(0.16,1,0.3,1)" }}>
            Engineer who builds systems that move real money. Designer who makes things people feel.
            <strong style={{ color: "var(--text)" }}> 8+ years</strong> in tech —
            Makeja Homes, GhostNet, Akili Markets. Production. Always.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
            <a href="#contact" className="btn-primary">Let&apos;s Work →</a>
            <a href="/work"    className="btn-secondary">See My Work</a>
          </div>
        </div>

        {/* ── RIGHT — 3D Water Droplet + floating badges ── */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "500px", opacity: loaded ? 1 : 0, transition: "opacity 1s 0.3s cubic-bezier(0.16,1,0.3,1)" }}>

          {/* Caustic ring behind model */}
          <div style={{ position: "absolute", width: "340px", height: "340px", borderRadius: "50%", border: "1px solid rgba(6,182,212,0.15)", animation: "spinSlow 40s linear infinite", pointerEvents: "none" }} />
          <div style={{ position: "absolute", width: "260px", height: "260px", borderRadius: "50%", border: "1px dashed rgba(3,105,161,0.12)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />

          {/* Three.js canvas */}
          <div style={{ width: "320px", height: "380px", position: "relative", zIndex: 2 }}>
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }} style={{ background: "transparent" }} gl={{ alpha: true, antialias: true }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 8, 5]} intensity={1.2} color="#e0f2fe" />
              <directionalLight position={[-4, 2, -4]} intensity={0.5} color="#7c3aed" />
              <pointLight position={[0, 4, 2]} intensity={0.8} color="#06b6d4" />
              <Environment preset="city" />
              <Suspense fallback={null}>
                <WaterDroplet />
                <ContactShadows position={[0, -2.2, 0]} opacity={0.12} scale={4} blur={2.5} />
              </Suspense>
            </Canvas>
          </div>

          {/* Floating badges — parallax */}

          {/* Nairobi KE — top left */}
          <div ref={badge1Ref} style={{ position: "absolute", top: "30px", left: "0px", zIndex: 5, willChange: "transform" }}>
            <div style={{ background: "rgba(240,248,255,0.9)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(3,105,161,0.15)", padding: "8px 16px", display: "flex", alignItems: "center", gap: "8px", animation: "float 5s ease-in-out infinite", boxShadow: "0 4px 20px rgba(3,105,161,0.08)" }}>
              <span style={{ fontSize: "13px" }}>🌊</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", color: "var(--ocean)", textTransform: "uppercase" }}>Nairobi, KE</span>
            </div>
          </div>

          {/* 247+ tenants — top right */}
          <div ref={badge2Ref} style={{ position: "absolute", top: "40px", right: "0px", zIndex: 5, willChange: "transform" }}>
            <div style={{ background: "rgba(240,248,255,0.9)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(3,105,161,0.15)", padding: "14px 18px", animation: "float 4s ease-in-out infinite", minWidth: "120px", boxShadow: "0 4px 20px rgba(3,105,161,0.08)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "26px", color: "var(--ocean)", lineHeight: 1 }}>247+</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.12em", color: "var(--text-4)", textTransform: "uppercase", marginTop: "3px" }}>Tenants Managed</div>
            </div>
          </div>

          {/* GhostNet — bottom right */}
          <div ref={badge3Ref} style={{ position: "absolute", bottom: "50px", right: "0px", zIndex: 5, willChange: "transform" }}>
            <div style={{ background: "rgba(240,248,255,0.9)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(6,182,212,0.2)", padding: "14px 18px", animation: "float 4s 1.2s ease-in-out infinite", minWidth: "120px", boxShadow: "0 4px 20px rgba(6,182,212,0.1)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "16px", color: "var(--aqua)", lineHeight: 1 }}>GhostNet</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.12em", color: "var(--text-4)", textTransform: "uppercase", marginTop: "3px" }}>Cybersec · Live ●</div>
            </div>
          </div>

          {/* 8+ Yrs — bottom left */}
          <div ref={badge4Ref} style={{ position: "absolute", bottom: "60px", left: "0px", zIndex: 5, willChange: "transform" }}>
            <div style={{ background: "rgba(240,248,255,0.9)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(124,58,237,0.15)", padding: "14px 18px", animation: "float 4s 2.2s ease-in-out infinite", boxShadow: "0 4px 20px rgba(124,58,237,0.08)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "20px", color: "var(--purple)", lineHeight: 1 }}>8+ Yrs</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.12em", color: "var(--text-4)", textTransform: "uppercase", marginTop: "3px" }}>In Tech</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: "absolute", bottom: "32px", left: "clamp(24px,5vw,64px)", zIndex: 10, display: "flex", alignItems: "center", gap: "12px", animation: "float 3s ease-in-out infinite" }}>
        <div style={{ width: "1px", height: "36px", background: "linear-gradient(to bottom, var(--ocean-light), transparent)" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", color: "var(--text-4)", textTransform: "uppercase" }}>Scroll to explore</span>
      </div>

      {/* Scene label */}
      <div style={{ position: "absolute", bottom: "32px", right: "clamp(24px,5vw,64px)", zIndex: 10 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.2em", color: "var(--border-2)", textTransform: "uppercase" }}>Scene 01 — Ocean Surface</span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </section>
  );
}

useGLTF.preload("/models/water-droplet.glb");
