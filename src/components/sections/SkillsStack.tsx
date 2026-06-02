"use client";
import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

// ── Ocean Terrain 3D ──────────────────────────────────────────────────────────
function OceanTerrain() {
  const { scene } = useGLTF("/models/ocean-terrain.glb");
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.06;
    ref.current.position.y = Math.sin(t * 0.4) * 0.08;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.4}>
      <primitive ref={ref} object={scene} scale={2.2} position={[0, -0.4, 0]} />
    </Float>
  );
}

const CATEGORIES = [
  { name: "Frontend",     color: "#0ea5e9", rgb: "14,165,233",  level: 95, skills: ["TypeScript", "Next.js 14", "React", "Tailwind CSS", "GSAP", "Canvas API", "Three.js / R3F"] },
  { name: "Payments",     color: "#7c3aed", rgb: "124,58,237",  level: 90, skills: ["Paystack API", "Webhook Verification", "Resend", "Automated Billing", "M-Pesa Daraja"] },
  { name: "Backend",      color: "#06b6d4", rgb: "6,182,212",   level: 88, skills: ["Node.js", "FastAPI", "Prisma ORM", "PostgreSQL", "REST APIs", "Supabase Realtime"] },
  { name: "AI & Data",    color: "#f59e0b", rgb: "245,158,11",  level: 82, skills: ["Groq llama-3.3-70b", "Python", "Binance API", "Technical Analysis", "LLM APIs", "RAG"] },
  { name: "Design",       color: "#a855f7", rgb: "168,85,247",  level: 85, skills: ["Figma", "InDesign", "Brand Identity", "Typography Systems", "Editorial Layout"] },
  { name: "Security",     color: "#22c55e", rgb: "34,197,94",   level: 80, skills: ["Pen Testing", "OWASP", "Secure Architecture", "Auth Hardening", "Webhook Security"] },
  { name: "Infrastructure", color: "#e11d48", rgb: "225,29,72", level: 78, skills: ["VPS / Nginx", "Vercel", "Docker", "GitHub Actions", "CI/CD", "Supabase"] },
];

function DepthRadar({ size }: { size: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let p = 0;
        const iv = setInterval(() => {
          p += 0.018;
          if (p >= 1) { p = 1; clearInterval(iv); }
          setProgress(p);
        }, 16);
      }
    }, { threshold: 0.2 });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const maxR = Math.min(W, H) * 0.34;
    const pts = CATEGORIES.length;
    const eased = progress < 1 ? 1 - Math.pow(1 - progress, 3) : 1;
    ctx.clearRect(0, 0, W, H);

    // Grid rings — ocean depth layers
    [0.25, 0.5, 0.75, 1.0].forEach((l, li) => {
      ctx.beginPath();
      for (let i = 0; i < pts; i++) {
        const a = (i / pts) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(a) * maxR * l;
        const y = cy + Math.sin(a) * maxR * l;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(6,182,212,${0.04 + li * 0.02})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Axis spokes
    for (let i = 0; i < pts; i++) {
      const a = (i / pts) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
      ctx.strokeStyle = "rgba(3,105,161,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Data polygon
    ctx.beginPath();
    CATEGORIES.forEach((cat, i) => {
      const a = (i / pts) * Math.PI * 2 - Math.PI / 2;
      const r = maxR * (cat.level / 100) * eased;
      i === 0 ? ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
              : ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    });
    ctx.closePath();
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
    grad.addColorStop(0,   "rgba(6,182,212,0.28)");
    grad.addColorStop(0.5, "rgba(3,105,161,0.16)");
    grad.addColorStop(1,   "rgba(124,58,237,0.06)");
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = "#0ea5e9";
    ctx.lineWidth = 1.5;
    ctx.shadowColor = "#06b6d4";
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Dots + labels
    const labelOffset = size < 280 ? 22 : 26;
    CATEGORIES.forEach((cat, i) => {
      const a = (i / pts) * Math.PI * 2 - Math.PI / 2;
      const r = maxR * (cat.level / 100) * eased;
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = cat.color;
      ctx.shadowColor = cat.color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
      const lx = cx + Math.cos(a) * (maxR + labelOffset);
      const ly = cy + Math.sin(a) * (maxR + labelOffset);
      ctx.fillStyle = "rgba(12,26,46,0.75)";
      ctx.font = `bold ${size < 280 ? 8 : 9}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(cat.name.toUpperCase(), lx, ly);
    });
  }, [progress, size]);

  return (
    <canvas ref={canvasRef} width={size} height={size}
      style={{ width: `${size}px`, height: `${size}px`, maxWidth: "100%", filter: "drop-shadow(0 0 24px rgba(6,182,212,0.15))" }}
    />
  );
}

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          let w = 0;
          const step = level / 40;
          const t = setInterval(() => {
            w += step;
            if (w >= level) { setWidth(level); clearInterval(t); }
            else setWidth(w);
          }, 20);
        }, delay);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level, delay]);

  return (
    <div ref={ref} style={{ marginBottom: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-3)", letterSpacing: "0.1em" }}>{name}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color, fontWeight: 700 }}>{Math.round(width)}%</span>
      </div>
      <div style={{ height: "2px", background: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${width}%`, background: `linear-gradient(90deg, ${color}70, ${color})`, borderRadius: "2px", transition: "width 0.05s linear", boxShadow: `0 0 6px ${color}60` }} />
      </div>
    </div>
  );
}

export default function SkillsStack() {
  const sectionRef  = useRef<HTMLElement>(null);
  const [radarSize, setRadarSize] = useState(320);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setRadarSize(Math.min(w - 56, 280));
      else if (w < 768) setRadarSize(Math.min(w - 64, 340));
      else setRadarSize(320);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add("visible"); }), { threshold: 0.05 });
    sectionRef.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "var(--abyss)", position: "relative", overflow: "hidden", padding: "80px clamp(24px,5vw,64px)" }}>

      {/* Underwater ambient */}
      <div style={{ position: "absolute", top: "15%", left: "5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(3,105,161,0.08) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(124,58,237,0.04) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />

      {/* Caustic light grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(6,182,212,0.05) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none", opacity: 0.6 }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* Header row with Ocean Terrain 3D */}
        <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "56px", flexWrap: "wrap", gap: "32px" }}>
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.2em", color: "rgba(6,182,212,0.3)", textTransform: "uppercase" }}>Scene 04 — Underwater</span>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(6,182,212,0.7)", textTransform: "uppercase", marginBottom: "10px", marginTop: "12px" }}>// Full Stack</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", lineHeight: 1, letterSpacing: "-0.02em", color: "white" }}>The Toolkit.</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(255,255,255,0.4)", marginTop: "12px", maxWidth: "380px", lineHeight: 1.7 }}>
              Seven depth layers. Every tool is battle-tested in production.
            </p>
          </div>
          {/* Ocean Terrain mini */}
          <div style={{ width: "140px", height: "140px", flexShrink: 0 }}>
            <Canvas camera={{ position: [0, 2.5, 4], fov: 45 }} style={{ background: "transparent" }} gl={{ alpha: true }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[4, 6, 4]} intensity={1} color="#bae6fd" />
              <pointLight position={[0, 3, 0]} intensity={0.6} color="#06b6d4" />
              <Suspense fallback={null}><OceanTerrain /></Suspense>
            </Canvas>
          </div>
        </div>

        {/* Main skills layout */}
        <div className="reveal skills-layout">

          {/* Radar */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <DepthRadar size={radarSize} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.18em", color: "rgba(6,182,212,0.3)", textTransform: "uppercase" }}>Depth Proficiency Radar</span>
          </div>

          {/* Skill bars per category */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {CATEGORIES.map((cat, ci) => (
              <div key={cat.name} style={{ background: `rgba(${cat.rgb},0.04)`, border: `1px solid rgba(${cat.rgb},0.1)`, padding: "18px 20px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "2px", height: "100%", background: `rgba(${cat.rgb},0.6)` }} />
                <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "10px" }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: cat.color, boxShadow: `0 0 6px ${cat.color}` }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.18em", color: cat.color, textTransform: "uppercase" }}>{cat.name}</span>
                </div>
                <SkillBar name="Proficiency" level={cat.level} color={cat.color} delay={ci * 80} />
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>
                  {cat.skills.map(s => (
                    <span key={s} style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.06em", color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "2px 7px" }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .skills-layout { display: grid; grid-template-columns: 1fr; gap: 48px; }
        @media (min-width: 1024px) { .skills-layout { grid-template-columns: auto 1fr; gap: 56px; align-items: start; } }
      `}</style>
    </section>
  );
}

useGLTF.preload("/models/ocean-terrain.glb");
