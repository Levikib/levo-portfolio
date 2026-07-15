"use client";
import { useEffect, useRef, useState } from "react";
import { useIsTablet } from "@/hooks/useIsMobile";

const stats = [
  { val:247, suffix:"+", label:"Active Tenants", sub:"Live on Makeja Homes", color:"#a855f7" },
  { val:1.5, suffix:"M+", prefix:"KSH ", label:"Monthly Volume", sub:"Processed via Paystack", color:"#d97706" },
  { val:13, suffix:"", label:"Cybersec Modules", sub:"243 lab steps · 9 tools", color:"#10b981" },
  { val:5450, suffix:"", label:"XP Economy", sub:"GhostNet gamified learning", color:"#10b981" },
  { val:8, suffix:"+", label:"Years in Tech", sub:"From cert to SaaS founder", color:"#4ead6a" },
  { val:2, suffix:"", label:"SaaS Live", sub:"Makeja Homes · GhostNet", color:"#a855f7" },
];

// Positions around the hub, as % offsets from center. Tuned for a 640x640 stage.
const layout = [
  { x: -240, y: -190 },
  { x:   40, y: -260 },
  { x:  270, y: -110 },
  { x:  240, y:  150 },
  { x:  -40, y:  260 },
  { x: -270, y:   90 },
];

function useCount(target: number, start: boolean, delay: number) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const duration = 1200;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    const t = setTimeout(() => {
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(parseFloat(current.toFixed(1)));
        }
      }, duration / steps);
    }, delay);
    return () => clearTimeout(t);
  }, [target, start, delay]);
  return count;
}

function Node({ stat, index, active, onEnter, onLeave }: {
  stat: typeof stats[0]; index: number; active: boolean;
  onEnter: () => void; onLeave: () => void;
}) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setStarted(true);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const count = useCount(stat.val, started, index * 120);
  const displayVal = stat.val % 1 !== 0
    ? (count >= stat.val ? stat.val.toFixed(1) : count.toFixed(1))
    : Math.floor(count);

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "absolute",
        left: `calc(50% + ${layout[index].x}px)`,
        top: `calc(50% + ${layout[index].y}px)`,
        transform: "translate(-50%, -50%)",
        width: "190px",
        padding: "18px 20px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${active ? stat.color : "rgba(255,255,255,0.1)"}`,
        boxShadow: active ? `0 0 30px ${stat.color}40, 0 0 0 1px ${stat.color}20 inset` : "0 0 0 rgba(0,0,0,0)",
        transition: "border-color 0.3s, box-shadow 0.3s",
        zIndex: 3,
      }}
    >
      <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(24px,2.4vw,30px)", lineHeight:1, color:stat.color, marginBottom:"6px", letterSpacing:"-0.01em" }}>
        {stat.prefix || ""}{displayVal}{stat.suffix}
      </div>
      <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"12.5px", color:"rgba(255,255,255,0.85)", marginBottom:"3px", lineHeight:1.25 }}>{stat.label}</div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:"9.5px", color:"rgba(255,255,255,0.35)", letterSpacing:"0.02em" }}>{stat.sub}</div>
    </div>
  );
}

function HubDiagram() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const STAGE_W = 720, STAGE_H = 640;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      setScale(Math.min(1, w / STAGE_W));
    };
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ position:"relative", width:"100%", maxWidth: `${STAGE_W}px`, height: `${STAGE_H * scale}px`, margin:"0 auto" }}>
      <div style={{ position:"absolute", top:0, left:"50%", width: `${STAGE_W}px`, height: `${STAGE_H}px`, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "top center" }}>
      {/* Connecting lines */}
      <svg width={STAGE_W} height={STAGE_H} style={{ position:"absolute", inset:0, overflow:"visible" }}>
        {layout.map((p, i) => {
          const cx = 360, cy = 320;
          const x2 = cx + p.x, y2 = cy + p.y;
          const isActive = activeIdx === i;
          return (
            <line
              key={i}
              x1={cx} y1={cy} x2={x2} y2={y2}
              stroke={isActive ? stats[i].color : "rgba(255,255,255,0.12)"}
              strokeWidth={isActive ? 1.5 : 1}
              style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
            />
          );
        })}
      </svg>

      {/* Center hub */}
      <div style={{
        position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)",
        width:"180px", height:"180px", borderRadius:"50%",
        background:"radial-gradient(circle, rgba(124,58,237,0.14) 0%, rgba(124,58,237,0.04) 60%, transparent 100%)",
        border:"1px solid rgba(124,58,237,0.3)",
        display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column",
        zIndex:2, textAlign:"center", padding:"12px",
      }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(168,85,247,0.8)", textTransform:"uppercase", marginBottom:"6px" }}>// Impact</div>
        <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"18px", color:"white", lineHeight:1.15 }}>By The<br/>Numbers</div>
      </div>

      {/* Nodes */}
      {stats.map((s, i) => (
        <Node
          key={s.label}
          stat={s}
          index={i}
          active={activeIdx === i}
          onEnter={() => setActiveIdx(i)}
          onLeave={() => setActiveIdx(null)}
        />
      ))}
      </div>
    </div>
  );
}

function StackedCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setStarted(true);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const count = useCount(stat.val, started, index * 100);
  const displayVal = stat.val % 1 !== 0
    ? (count >= stat.val ? stat.val.toFixed(1) : count.toFixed(1))
    : Math.floor(count);

  return (
    <div ref={ref} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"14px", padding:"18px 20px" }}>
      <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"26px", color:stat.color, marginBottom:"6px" }}>
        {stat.prefix || ""}{displayVal}{stat.suffix}
      </div>
      <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"13px", color:"rgba(255,255,255,0.85)", marginBottom:"3px" }}>{stat.label}</div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"rgba(255,255,255,0.35)" }}>{stat.sub}</div>
    </div>
  );
}

function StackedFallback() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map((s, i) => <StackedCard key={s.label} stat={s} index={i} />)}
    </div>
  );
}

export default function ByTheNumbers() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsTablet();

  useEffect(() => {
    const obs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add("visible"); }), { threshold: 0.05 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative px-8 md:px-12 py-28 overflow-hidden" style={{ background: "#0a0805" }}>
      {/* Ambient glow */}
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"900px", height:"600px", background:"radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 70%)", filter:"blur(80px)", pointerEvents:"none" }} />

      <div className="relative z-10">
        <div className="reveal text-center mb-16">
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(168,85,247,0.7)", textTransform:"uppercase", marginBottom:"12px" }}>// Impact</div>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(32px,5vw,64px)", lineHeight:1, letterSpacing:"-0.03em", color:"white" }}>By The Numbers</div>
          <p style={{ fontFamily:"var(--font-body)", fontSize:"15px", color:"rgba(255,255,255,0.35)", marginTop:"12px", maxWidth:"400px", margin:"12px auto 0" }}>Real metrics from real systems running in production.</p>
        </div>

        <div className="reveal">
          {isMobile ? <StackedFallback /> : <HubDiagram />}
        </div>
      </div>
    </section>
  );
}
