"use client";
import { useEffect, useRef, useState } from "react";

const categories = [
  { name: "Frontend",     color: "#a855f7", rgb:"168,85,247", level: 95, skills: ["TypeScript","Next.js 14","React","Tailwind CSS","GSAP","Canvas API"] },
  { name: "Payments",     color: "#e11d48", rgb:"225,29,72",   level: 90, skills: ["Paystack API","Webhook Verification","Resend","Automated Billing","M-Pesa"] },
  { name: "Backend",      color: "#4ead6a", rgb:"78,173,106",  level: 88, skills: ["Node.js","Prisma ORM","PostgreSQL","REST APIs","Supabase Realtime","Webhooks"] },
  { name: "AI / LLM",     color: "#d97706", rgb:"217,119,6",   level: 82, skills: ["Groq llama-3.3-70b","Supabase AI","LLM Integration","Prompt Engineering","RAG"] },
  { name: "Design",       color: "#a855f7", rgb:"168,85,247",  level: 85, skills: ["Graphic Design","Editorial Layout","Brand Identity","Typography","InDesign"] },
  { name: "Security",     color: "#10b981", rgb:"16,185,129",  level: 80, skills: ["Pen Testing","OWASP","Secure Architecture","GhostNet Platform","Auth Hardening","Webhook Security"] },
];

function RadarChart({ size }: { size: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let p = 0;
        const iv = setInterval(() => {
          p += 0.02;
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
    const maxR = Math.min(W, H) * 0.36;
    const pts = categories.length;
    const eased = progress < 1 ? 1 - Math.pow(1 - progress, 3) : 1;

    ctx.clearRect(0, 0, W, H);

    // Grid rings
    [0.25, 0.5, 0.75, 1.0].forEach(l => {
      ctx.beginPath();
      for (let i = 0; i < pts; i++) {
        const a = (i / pts) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(a) * maxR * l;
        const y = cy + Math.sin(a) * maxR * l;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Axis lines
    for (let i = 0; i < pts; i++) {
      const a = (i / pts) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Data polygon
    ctx.beginPath();
    categories.forEach((cat, i) => {
      const a = (i / pts) * Math.PI * 2 - Math.PI / 2;
      const r = maxR * (cat.level / 100) * eased;
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
    grad.addColorStop(0, "rgba(168,85,247,0.32)");
    grad.addColorStop(0.5, "rgba(78,173,106,0.18)");
    grad.addColorStop(1, "rgba(168,85,247,0.04)");
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = "#a855f7";
    ctx.lineWidth = 1.5;
    ctx.shadowColor = "#a855f7";
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Dots + labels
    const labelOffset = size < 280 ? 22 : 28;
    const fontSize = size < 280 ? 9 : 10;
    categories.forEach((cat, i) => {
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
      ctx.fillStyle = "rgba(255,255,255,0.65)";
      ctx.font = `bold ${fontSize}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(cat.name.toUpperCase(), lx, ly);
    });
  }, [progress, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ width:`${size}px`, height:`${size}px`, maxWidth:"100%", filter:"drop-shadow(0 0 24px rgba(168,85,247,0.18))" }}
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
    <div ref={ref} style={{ marginBottom:"10px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"rgba(255,255,255,0.55)", letterSpacing:"0.1em" }}>{name}</span>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color, fontWeight:700 }}>{Math.round(width)}%</span>
      </div>
      <div style={{ height:"2px", background:"rgba(255,255,255,0.06)", borderRadius:"2px", overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${width}%`, background:`linear-gradient(90deg, ${color}88, ${color})`, borderRadius:"2px", transition:"width 0.05s linear", boxShadow:`0 0 6px ${color}70` }}/>
      </div>
    </div>
  );
}

export default function SkillsStack() {
  const ref = useRef<HTMLElement>(null);
  const [radarSize, setRadarSize] = useState(340);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480)       setRadarSize(Math.min(w - 56, 300));
      else if (w < 768)  setRadarSize(Math.min(w - 64, 360));
      else               setRadarSize(340);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add("visible"); }), { threshold: 0.05 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background:"#0a0805", padding:"80px 24px" }}>
      {/* Dot grid */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(168,85,247,0.08) 1px, transparent 1px)", backgroundSize:"28px 28px", opacity:0.5, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:"20%", left:"5%", width:"300px", height:"300px", background:"radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)", filter:"blur(50px)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"20%", right:"5%", width:"240px", height:"240px", background:"radial-gradient(circle, rgba(78,173,106,0.06) 0%, transparent 70%)", filter:"blur(50px)", pointerEvents:"none" }}/>

      <div className="relative z-10" style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <div className="reveal" style={{ marginBottom:"48px" }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(168,85,247,0.8)", textTransform:"uppercase", marginBottom:"10px" }}>// Full Stack</div>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(28px,5vw,52px)", lineHeight:1, letterSpacing:"-0.02em", color:"white" }}>The Toolkit.</div>
        </div>

        {/* Responsive layout: stacked on mobile, side-by-side on lg */}
        <div className="reveal skills-grid">
          {/* Radar — centered on mobile */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"12px" }}>
            <RadarChart size={radarSize} />
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.18em", color:"rgba(255,255,255,0.2)", textTransform:"uppercase" }}>Skill Proficiency Radar</div>
          </div>

          {/* Skill bars */}
          <div>
            {categories.map((cat, ci) => (
              <div key={cat.name} style={{ marginBottom:"24px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"10px" }}>
                  <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:cat.color, boxShadow:`0 0 6px ${cat.color}` }}/>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:cat.color, textTransform:"uppercase", fontWeight:700 }}>{cat.name}</span>
                </div>
                <SkillBar name="Proficiency" level={cat.level} color={cat.color} delay={ci * 100} />
                <div style={{ display:"flex", flexWrap:"wrap", gap:"5px", marginTop:"6px" }}>
                  {cat.skills.map(s => (
                    <span key={s} style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.05em", color:"rgba(255,255,255,0.35)", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", padding:"3px 8px" }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }
        @media (min-width: 1024px) {
          .skills-grid {
            grid-template-columns: 1fr 1fr;
            align-items: start;
            gap: 64px;
          }
        }
      `}</style>
    </section>
  );
}
