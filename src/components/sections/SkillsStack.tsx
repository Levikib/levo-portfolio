"use client";
import { useEffect, useRef, useState } from "react";

const categories = [
  { name: "Frontend", color: "#a855f7", rgb:"168,85,247", level: 95, skills: ["TypeScript", "Next.js 14", "React", "Tailwind CSS", "Framer Motion", "GSAP"] },
  { name: "Backend", color: "#4ead6a", rgb:"78,173,106", level: 88, skills: ["Node.js", "Prisma ORM", "PostgreSQL", "REST APIs", "Webhooks", "Cron Jobs"] },
  { name: "Infrastructure", color: "#d97706", rgb:"217,119,6", level: 78, skills: ["VPS/Linux", "Nginx", "SSL/TLS", "Vercel", "Neon DB", "CI/CD"] },
  { name: "Payments & APIs", color: "#e11d48", rgb:"225,29,72", level: 90, skills: ["Paystack API", "Webhook Verification", "Resend", "Automated Billing"] },
  { name: "Design", color: "#a855f7", rgb:"168,85,247", level: 85, skills: ["Graphic Design", "Editorial Layout", "Brand Identity", "Typography"] },
  { name: "Security", color: "#4ead6a", rgb:"78,173,106", level: 75, skills: ["ISC2 CC", "Ethical Hacking", "Oracle Cloud AI", "Secure Architecture"] },
];

// Radar chart
function RadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let p = 0;
        const interval = setInterval(() => {
          p += 0.02;
          if (p >= 1) { p = 1; clearInterval(interval); }
          setProgress(p);
        }, 16);
      }
    }, { threshold: 0.3 });
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
    const maxR = Math.min(W, H) * 0.38;
    const points = categories.length;
    const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

    ctx.clearRect(0, 0, W, H);

    // Draw grid rings
    levels.forEach(l => {
      ctx.beginPath();
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * maxR * l;
        const y = cy + Math.sin(angle) * maxR * l;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(255,255,255,0.06)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw axis lines
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw data polygon with animation
    const eased = progress < 1 ? 1 - Math.pow(1 - progress, 3) : 1;

    ctx.beginPath();
    categories.forEach((cat, i) => {
      const angle = (i / points) * Math.PI * 2 - Math.PI / 2;
      const r = maxR * (cat.level / 100) * eased;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.closePath();

    // Gradient fill
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
    grad.addColorStop(0, "rgba(168,85,247,0.35)");
    grad.addColorStop(0.5, "rgba(78,173,106,0.2)");
    grad.addColorStop(1, "rgba(168,85,247,0.05)");
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = "#a855f7";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#a855f7";
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw dots at vertices
    categories.forEach((cat, i) => {
      const angle = (i / points) * Math.PI * 2 - Math.PI / 2;
      const r = maxR * (cat.level / 100) * eased;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = cat.color;
      ctx.shadowColor = cat.color;
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Labels
      const lx = cx + Math.cos(angle) * (maxR + 28);
      const ly = cy + Math.sin(angle) * (maxR + 28);
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "bold 11px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(cat.name.toUpperCase(), lx, ly);
    });

  }, [progress]);

  return <canvas ref={canvasRef} width={420} height={420} style={{ maxWidth: "100%", filter:"drop-shadow(0 0 30px rgba(168,85,247,0.2))" }} />;
}

// Animated skill bar
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
    <div ref={ref} style={{ marginBottom: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em" }}>{name}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color, fontWeight: 700 }}>{Math.round(width)}%</span>
      </div>
      <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${width}%`,
          background: `linear-gradient(90deg, ${color}99, ${color})`,
          borderRadius: "2px", transition: "width 0.05s linear",
          boxShadow: `0 0 8px ${color}80`,
        }} />
      </div>
    </div>
  );
}

export default function SkillsStack() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add("visible"); }), { threshold: 0.05 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative px-8 md:px-12 py-28 overflow-hidden" style={{ background: "#0a0805" }}>
      {/* Dot grid */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(168,85,247,0.1) 1px, transparent 1px)", backgroundSize:"32px 32px", opacity:0.5, pointerEvents:"none" }} />
      {/* Glow orbs */}
      <div style={{ position:"absolute", top:"20%", left:"10%", width:"400px", height:"400px", background:"radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)", filter:"blur(60px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"20%", right:"10%", width:"300px", height:"300px", background:"radial-gradient(circle, rgba(78,173,106,0.06) 0%, transparent 70%)", filter:"blur(60px)", pointerEvents:"none" }} />

      <div className="relative z-10">
        <div className="reveal mb-16">
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(168,85,247,0.8)", textTransform:"uppercase", marginBottom:"12px" }}>// Tech Stack</div>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(32px,5vw,56px)", lineHeight:1, letterSpacing:"-0.02em", color:"white" }}>What I Work With</div>
        </div>

        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Radar */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"16px" }}>
            <RadarChart />
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(255,255,255,0.25)", textTransform:"uppercase" }}>Skill Proficiency Radar</div>
          </div>

          {/* Right — Bars per category */}
          <div>
            {categories.map((cat, ci) => (
              <div key={cat.name} style={{ marginBottom: "28px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
                  <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:cat.color, boxShadow:`0 0 8px ${cat.color}` }} />
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.2em", color:cat.color, textTransform:"uppercase", fontWeight:700 }}>{cat.name}</span>
                </div>
                <SkillBar name="Proficiency" level={cat.level} color={cat.color} delay={ci * 120} />
                <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginTop:"8px" }}>
                  {cat.skills.map(s => (
                    <span key={s} style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.06em", color:"rgba(255,255,255,0.4)", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", padding:"4px 9px" }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
