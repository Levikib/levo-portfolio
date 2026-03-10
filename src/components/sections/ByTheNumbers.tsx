"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { val:170, suffix:"+", label:"Residential Units Managed", sub:"Active on Makeja Homes", color:"#a855f7", ring:170/200 },
  { val:1.5, suffix:"M+", prefix:"KSH ", label:"Monthly Transaction Volume", sub:"Processed via Paystack", color:"#d97706", ring:0.75 },
  { val:8, suffix:"+", label:"Years in Tech", sub:"From cert to SaaS founder", color:"#4ead6a", ring:8/10 },
  { val:2, suffix:"", label:"Companies Founded", sub:"Makeja Homes · ShanTech", color:"#a855f7", ring:0.65 },
  { val:30, suffix:"+", label:"TS Errors Fixed at 3am", sub:"Production debugging", color:"#e11d48", ring:30/50 },
  { val:1, suffix:"", label:"Production SaaS Built Solo", sub:"Architecture to deployment", color:"#4ead6a", ring:1.0 },
];

function CircleRing({ color, progress, size = 120 }: { color: string; progress: number; size?: number }) {
  const r = (size - 16) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - circ * progress;

  return (
    <svg width={size} height={size} style={{ position:"absolute", top:0, left:0, transform:"rotate(-90deg)" }}>
      {/* Background ring */}
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
      {/* Animated ring */}
      <circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ filter:`drop-shadow(0 0 6px ${color})`, transition:"stroke-dashoffset 1.5s cubic-bezier(0.16,1,0.3,1)" }}
      />
    </svg>
  );
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [count, setCount] = useState(0);
  const [ringProg, setRingProg] = useState(0);
  const [sparks, setSparks] = useState<{x:number,y:number,id:number}[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        setTimeout(() => {
          // Animate counter
          const duration = 2000;
          const steps = 80;
          const increment = stat.val / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= stat.val) {
              setCount(stat.val);
              clearInterval(timer);
              // Sparks on completion
              setSparks(Array.from({length:6},(_,i) => ({x: 50 + Math.cos(i/6*Math.PI*2)*40, y: 50 + Math.sin(i/6*Math.PI*2)*40, id:i})));
              setTimeout(() => setSparks([]), 800);
            } else {
              setCount(parseFloat(current.toFixed(1)));
            }
          }, duration / steps);
          // Animate ring
          setRingProg(stat.ring);
        }, index * 150);
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
      style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", padding:"28px 24px", position:"relative", overflow:"hidden", transition:"all 0.3s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.borderColor=`${stat.color}40`; (e.currentTarget as HTMLElement).style.transform="translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow=`0 20px 40px ${stat.color}15`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.03)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.transform="translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow="none"; }}
    >
      {/* Top accent bar */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:`linear-gradient(90deg, ${stat.color}, transparent)` }} />

      {/* Corner glow */}
      <div style={{ position:"absolute", top:"-30px", right:"-30px", width:"100px", height:"100px", background:`radial-gradient(circle, ${stat.color}20 0%, transparent 70%)`, filter:"blur(20px)", pointerEvents:"none" }} />

      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"12px" }}>
        {/* Number */}
        <div>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(36px,4vw,52px)", lineHeight:1, color:stat.color, marginBottom:"8px", letterSpacing:"-0.02em", filter:`drop-shadow(0 0 20px ${stat.color}60)` }}>
            {stat.prefix || ""}{displayVal}{stat.suffix}
          </div>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"14px", color:"rgba(255,255,255,0.85)", marginBottom:"4px", lineHeight:1.3 }}>{stat.label}</div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.05em" }}>{stat.sub}</div>
        </div>

        {/* Ring */}
        <div style={{ position:"relative", width:"80px", height:"80px", flexShrink:0 }}>
          <CircleRing color={stat.color} progress={ringProg} size={80} />
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"11px", color:stat.color, fontWeight:700 }}>{Math.round(ringProg * 100)}%</span>
          </div>
          {/* Sparks */}
          {sparks.map(s => (
            <div key={s.id} style={{ position:"absolute", left:`${s.x}%`, top:`${s.y}%`, width:"4px", height:"4px", borderRadius:"50%", background:stat.color, animation:"trailFade 0.6s ease-out forwards", pointerEvents:"none", boxShadow:`0 0 6px ${stat.color}` }} />
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
    <section ref={ref} className="relative px-8 md:px-12 py-28 overflow-hidden" style={{ background: "#0a0805" }}>
      {/* Dot grid */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(168,85,247,0.1) 1px, transparent 1px)", backgroundSize:"28px 28px", opacity:0.4, pointerEvents:"none" }} />
      {/* Center glow */}
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"900px", height:"500px", background:"radial-gradient(ellipse, rgba(168,85,247,0.06) 0%, rgba(78,173,106,0.04) 40%, transparent 70%)", filter:"blur(80px)", pointerEvents:"none" }} />

      {/* Decorative rotating ring */}
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"600px", height:"600px", border:"1px solid rgba(168,85,247,0.04)", borderRadius:"50%", animation:"spinSlow 60s linear infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"800px", height:"800px", border:"1px dashed rgba(78,173,106,0.03)", borderRadius:"50%", animation:"spinSlowReverse 80s linear infinite", pointerEvents:"none" }} />

      <div className="relative z-10">
        <div className="reveal text-center mb-16">
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(168,85,247,0.7)", textTransform:"uppercase", marginBottom:"12px" }}>// Impact</div>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(32px,5vw,64px)", lineHeight:1, letterSpacing:"-0.03em", color:"white" }}>By The Numbers</div>
          <p style={{ fontFamily:"var(--font-body)", fontSize:"15px", color:"rgba(255,255,255,0.35)", marginTop:"12px", maxWidth:"400px", margin:"12px auto 0" }}>Real metrics from real systems running in production.</p>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
