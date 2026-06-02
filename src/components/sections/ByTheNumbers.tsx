"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { val: 247,  suffix: "+",  label: "Active Tenants Managed",      sub: "Live on Makeja Homes",         color: "#0369a1", rgb: "3,105,161",    ring: 247/300 },
  { val: 1.5,  suffix: "M+", prefix: "KSH ", label: "Monthly Transaction Volume", sub: "Processed via Paystack",    color: "#7c3aed", rgb: "124,58,237",  ring: 0.75 },
  { val: 13,   suffix: "",   label: "GhostNet Cybersec Modules",   sub: "243 lab steps · 9 live tools", color: "#06b6d4", rgb: "6,182,212",   ring: 13/15 },
  { val: 5450, suffix: "",   label: "GhostNet XP Economy",         sub: "Gamified learning platform",   color: "#0ea5e9", rgb: "14,165,233",  ring: 0.82 },
  { val: 8,    suffix: "+",  label: "Years in Tech",               sub: "From cert to SaaS founder",    color: "#a855f7", rgb: "168,85,247",  ring: 8/10 },
  { val: 2,    suffix: "",   label: "Production SaaS Live",         sub: "Makeja Homes · GhostNet",     color: "#f59e0b", rgb: "245,158,11",  ring: 1.0 },
];

// Steam/rising particles
function SteamParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    type Particle = { x: number; y: number; size: number; speed: number; opacity: number; drift: number };
    const particles: Particle[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * (canvas.width || 400),
      y: (canvas.height || 400) + Math.random() * 100,
      size: 2 + Math.random() * 5,
      speed: 0.3 + Math.random() * 0.7,
      opacity: 0.04 + Math.random() * 0.1,
      drift: (Math.random() - 0.5) * 0.3,
    }));

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;
        p.size *= 1.002;
        if (p.y < -p.size * 4) {
          p.y = (canvas.height || 400) + 20;
          p.x = Math.random() * (canvas.width || 400);
          p.size = 2 + Math.random() * 4;
          p.opacity = 0.04 + Math.random() * 0.08;
        }
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        grad.addColorStop(0, `rgba(6,182,212,${p.opacity})`);
        grad.addColorStop(1, "rgba(6,182,212,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

function CircleRing({ color, progress, size = 80 }: { color: string; progress: number; size?: number }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="4"
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ - circ * progress}
        style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)" }}
      />
    </svg>
  );
}

function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const [count, setCount]   = useState(0);
  const [ring, setRing]     = useState(0);
  const [sparks, setSparks] = useState<{ x: number; y: number; id: number }[]>([]);
  const ref     = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        setTimeout(() => {
          const steps = 80;
          const inc = stat.val / steps;
          let cur = 0;
          const t = setInterval(() => {
            cur += inc;
            if (cur >= stat.val) {
              setCount(stat.val); clearInterval(t);
              setSparks(Array.from({ length: 6 }, (_, i) => ({ x: 50 + Math.cos(i/6*Math.PI*2)*40, y: 50 + Math.sin(i/6*Math.PI*2)*40, id: i })));
              setTimeout(() => setSparks([]), 800);
            } else setCount(parseFloat(cur.toFixed(1)));
          }, 2000 / steps);
          setRing(stat.ring);
        }, index * 140);
      }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [stat.val, stat.ring, index]);

  const displayVal = stat.val % 1 !== 0
    ? (count >= stat.val ? stat.val.toFixed(1) : count.toFixed(1))
    : Math.floor(count);

  return (
    <div ref={ref}
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "28px 24px", position: "relative", overflow: "hidden", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)" }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `rgba(${stat.rgb},0.08)`; el.style.borderColor = `rgba(${stat.rgb},0.3)`; el.style.transform = "translateY(-4px)"; el.style.boxShadow = `0 20px 40px rgba(${stat.rgb},0.12)`; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.04)"; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, rgba(${stat.rgb},0.8), transparent)` }} />
      <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "100px", height: "100px", background: `radial-gradient(circle, rgba(${stat.rgb},0.18) 0%, transparent 70%)`, filter: "blur(20px)", pointerEvents: "none" }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,3.5vw,48px)", lineHeight: 1, color: `rgb(${stat.rgb})`, marginBottom: "8px", letterSpacing: "-0.02em", filter: `drop-shadow(0 0 16px rgba(${stat.rgb},0.5))` }}>
            {stat.prefix || ""}{displayVal}{stat.suffix}
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px", color: "rgba(255,255,255,0.8)", marginBottom: "4px", lineHeight: 1.3 }}>{stat.label}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>{stat.sub}</div>
        </div>
        <div style={{ position: "relative", width: "80px", height: "80px", flexShrink: 0 }}>
          <CircleRing color={`rgb(${stat.rgb})`} progress={ring} size={80} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: `rgb(${stat.rgb})`, fontWeight: 700 }}>{Math.round(ring * 100)}%</span>
          </div>
          {sparks.map(s => (
            <div key={s.id} style={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%`, width: "4px", height: "4px", borderRadius: "50%", background: `rgb(${stat.rgb})`, animation: "fadeIn 0.6s ease-out forwards", pointerEvents: "none", boxShadow: `0 0 6px rgb(${stat.rgb})` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ByTheNumbers() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add("visible"); }), { threshold: 0.05 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "var(--abyss)", padding: "80px clamp(24px,5vw,64px)", position: "relative", overflow: "hidden" }}>
      <SteamParticles />

      {/* Depth glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "400px", background: "radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, rgba(3,105,161,0.04) 40%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />

      {/* Rotating rings */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", border: "1px solid rgba(6,182,212,0.04)", borderRadius: "50%", animation: "spinSlow 70s linear infinite", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "56px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.2em", color: "rgba(6,182,212,0.3)", textTransform: "uppercase" }}>Scene 05 — Steam Rising</span>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(6,182,212,0.7)", textTransform: "uppercase", marginBottom: "12px", marginTop: "12px" }}>// Impact</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,5vw,64px)", lineHeight: 1, letterSpacing: "-0.03em", color: "white" }}>By The Numbers</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(255,255,255,0.35)", marginTop: "12px", maxWidth: "360px", margin: "12px auto 0", lineHeight: 1.7 }}>Real metrics from real systems running in production.</p>
        </div>

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1px", background: "rgba(255,255,255,0.04)" }}>
          {STATS.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
        </div>
      </div>

      <style>{`@keyframes spinSlow{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}`}</style>
    </section>
  );
}
