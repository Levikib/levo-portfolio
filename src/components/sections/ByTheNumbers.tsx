"use client";
import { useEffect, useRef, useState } from "react";
import { useIsTablet } from "@/hooks/useIsMobile";

const stats = [
  { val:247, suffix:"+", label:"Active Tenants", sub:"Live on Makeja Homes", color:"#a855f7" },
  { val:1.5, suffix:"M+", prefix:"KSH ", label:"Monthly Volume", sub:"Processed via Paystack", color:"#d97706" },
  { val:13, suffix:"", label:"Cybersec Modules", sub:"243 lab steps · 9 tools", color:"#10b981" },
  { val:5450, suffix:"", label:"XP Economy", sub:"GhostNet gamified learning", color:"#06b6d4" },
  { val:8, suffix:"+", label:"Years in Tech", sub:"From cert to SaaS founder", color:"#4ead6a" },
  { val:2, suffix:"", label:"SaaS Live", sub:"Makeja Homes · GhostNet", color:"#e11d48" },
];

// Positions around the hub, as px offsets from center. Tuned for a 720x640 stage.
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

const HUB_RADIUS = 94;

// Curved path from hub edge to node — bows outward along the tangent, like a power conduit, not a straight wire.
// Starts on the hub's circumference (not its dead-center point) so multiple conduits don't visually
// bundle into one overlapping knot where they meet.
function conduitPath(cx: number, cy: number, dx: number, dy: number) {
  const x2 = cx + dx, y2 = cy + dy;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  const x1 = cx + ux * HUB_RADIUS, y1 = cy + uy * HUB_RADIUS;

  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  // perpendicular offset for the bow, direction alternates by quadrant for variety
  const nx = -uy, ny = ux;
  const bow = 46 * (dx < 0 ? -1 : 1);
  const cx1 = mx + nx * bow, cy1 = my + ny * bow;
  return `M ${x1} ${y1} Q ${cx1} ${cy1} ${x2} ${y2}`;
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
        transform: active ? "translate(-50%, -50%) translateY(-3px)" : "translate(-50%, -50%)",
        width: "190px",
        padding: "18px 20px",
        borderRadius: "14px",
        background: active
          ? `linear-gradient(160deg, ${stat.color}14 0%, rgba(10,8,5,0.9) 65%)`
          : "linear-gradient(160deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
        border: `1px solid ${active ? stat.color : "rgba(255,255,255,0.12)"}`,
        boxShadow: active
          ? `0 0 0 1px ${stat.color}55 inset, 0 0 24px ${stat.color}70, 0 0 70px ${stat.color}35, 0 18px 40px rgba(0,0,0,0.55)`
          : `0 0 0 1px rgba(255,255,255,0.03) inset, 0 8px 24px rgba(0,0,0,0.35)`,
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.35s, background 0.35s",
        zIndex: active ? 5 : 3,
        clipPath: "polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Corner accent ticks */}
      <div style={{ position:"absolute", top:0, left:0, width:"16px", height:"16px", borderTop:`2px solid ${active?stat.color:"rgba(255,255,255,0.18)"}`, borderLeft:`2px solid ${active?stat.color:"rgba(255,255,255,0.18)"}`, transition:"border-color 0.3s" }}/>
      <div style={{ position:"absolute", bottom:0, right:0, width:"16px", height:"16px", borderBottom:`2px solid ${active?stat.color:"rgba(255,255,255,0.18)"}`, borderRight:`2px solid ${active?stat.color:"rgba(255,255,255,0.18)"}`, transition:"border-color 0.3s" }}/>

      <div style={{
        fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(24px,2.4vw,30px)", lineHeight:1,
        color: active ? stat.color : "rgba(255,255,255,0.92)",
        marginBottom:"6px", letterSpacing:"-0.01em",
        textShadow: active ? `0 0 18px ${stat.color}90, 0 0 40px ${stat.color}50` : "none",
        transition:"color 0.3s, text-shadow 0.3s",
      }}>
        {stat.prefix || ""}{displayVal}{stat.suffix}
      </div>
      <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"12.5px", color:"rgba(255,255,255,0.85)", marginBottom:"3px", lineHeight:1.25 }}>{stat.label}</div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:"9.5px", color:active?`${stat.color}cc`:"rgba(255,255,255,0.35)", letterSpacing:"0.02em", transition:"color 0.3s" }}>{stat.sub}</div>
    </div>
  );
}

function HubDiagram() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const STAGE_W = 720, STAGE_H = 640;
  const cx = STAGE_W / 2, cy = STAGE_H / 2;

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

      {/* Radial tech-grid backdrop */}
      <svg width={STAGE_W} height={STAGE_H} style={{ position:"absolute", inset:0, overflow:"visible", opacity:0.35 }}>
        <circle cx={cx} cy={cy} r={110} fill="none" stroke="rgba(124,58,237,0.18)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={175} fill="none" stroke="rgba(124,58,237,0.1)" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx={cx} cy={cy} r={240} fill="none" stroke="rgba(124,58,237,0.06)" strokeWidth="1" />
      </svg>

      {/* Connecting conduits */}
      <svg width={STAGE_W} height={STAGE_H} style={{ position:"absolute", inset:0, overflow:"visible" }}>
        <defs>
          {stats.map((s, i) => {
            const p = layout[i];
            const len = Math.hypot(p.x, p.y) || 1;
            const ux = p.x / len, uy = p.y / len;
            const x1 = cx + ux * HUB_RADIUS, y1 = cy + uy * HUB_RADIUS;
            const x2 = cx + p.x, y2 = cy + p.y;
            return (
              <linearGradient key={i} id={`conduit-grad-${i}`} gradientUnits="userSpaceOnUse"
                x1={x1} y1={y1} x2={x2} y2={y2}>
                <stop offset="0%" stopColor={s.color} stopOpacity="0" />
                <stop offset="22%" stopColor={s.color} stopOpacity="0.75" />
                <stop offset="100%" stopColor={s.color} stopOpacity="0.9" />
              </linearGradient>
            );
          })}
          <filter id="conduitGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {layout.map((p, i) => {
          const d = conduitPath(cx, cy, p.x, p.y);
          const isActive = activeIdx === i;
          // stagger each conduit's pulse so all 6 don't fire in lockstep
          const dur = 2.2 + (i % 3) * 0.35;
          const delay = i * 0.32;
          return (
            <g key={i}>
              {/* base conduit line, dim */}
              <path d={d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              {/* energized overlay — always on, brightens on hover */}
              <path
                d={d} fill="none"
                stroke={`url(#conduit-grad-${i})`}
                strokeWidth={isActive ? 2.75 : 1.75}
                strokeLinecap="round"
                opacity={isActive ? 1 : 0.55}
                filter={isActive ? "url(#conduitGlow)" : undefined}
                style={{ transition: "opacity 0.3s, stroke-width 0.3s" }}
              />
              {/* traveling energy pulse — always animating, intensifies on hover */}
              <path
                d={d} fill="none"
                stroke={stats[i].color}
                strokeWidth={isActive ? 5 : 2.5}
                strokeLinecap="round"
                strokeDasharray="1 90"
                opacity={isActive ? 1 : 0.55}
                filter="url(#conduitGlow)"
                style={{
                  transition: "opacity 0.25s, stroke-width 0.25s",
                  animation: `conduitFlow ${isActive ? 1.1 : dur}s linear infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Center hub */}
      <div style={{
        position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)",
        width:"188px", height:"188px", borderRadius:"50%",
        display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column",
        zIndex:2, textAlign:"center", padding:"12px",
      }}>
        {/* rotating outer ring */}
        <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:"1px dashed rgba(168,85,247,0.35)", animation:"spinSlow 22s linear infinite" }} />
        <div style={{ position:"absolute", inset:"10px", borderRadius:"50%", border:"1px solid rgba(168,85,247,0.2)" }} />
        {/* pulsing core glow */}
        <div style={{
          position:"absolute", inset:"14px", borderRadius:"50%",
          background:"radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(124,58,237,0.12) 55%, transparent 100%)",
          boxShadow:"0 0 50px rgba(124,58,237,0.55), 0 0 110px rgba(124,58,237,0.25)",
          animation:"hubPulse 2.6s ease-in-out infinite",
        }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(216,180,254,0.9)", textTransform:"uppercase", marginBottom:"6px", textShadow:"0 0 10px rgba(168,85,247,0.6)" }}>// Impact</div>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"18px", color:"white", lineHeight:1.15, textShadow:"0 0 20px rgba(168,85,247,0.5)" }}>By The<br/>Numbers</div>
        </div>
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
    <div ref={ref} style={{
      position:"relative", background:"linear-gradient(160deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
      border:`1px solid ${stat.color}40`, borderRadius:"14px", padding:"18px 20px",
      boxShadow:`0 0 24px ${stat.color}18, 0 8px 24px rgba(0,0,0,0.35)`,
    }}>
      <div style={{ position:"absolute", top:0, left:0, width:"14px", height:"14px", borderTop:`2px solid ${stat.color}`, borderLeft:`2px solid ${stat.color}` }}/>
      <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"26px", color:stat.color, marginBottom:"6px", textShadow:`0 0 16px ${stat.color}60` }}>
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
    <section ref={ref} className="relative px-8 md:px-12 py-28 overflow-hidden" style={{ background: "#07050c" }}>
      {/* Ambient glow */}
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"1000px", height:"680px", background:"radial-gradient(ellipse, rgba(124,58,237,0.09) 0%, rgba(16,185,129,0.03) 45%, transparent 70%)", filter:"blur(80px)", pointerEvents:"none" }} />
      {/* Fine grid texture */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize:"48px 48px", pointerEvents:"none", maskImage:"radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 80%)" }} />

      <div className="relative z-10">
        <div className="reveal text-center mb-16">
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(168,85,247,0.7)", textTransform:"uppercase", marginBottom:"12px" }}>// Impact</div>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(32px,5vw,64px)", lineHeight:1, letterSpacing:"-0.03em", color:"white", textShadow:"0 0 40px rgba(124,58,237,0.25)" }}>By The Numbers</div>
          <p style={{ fontFamily:"var(--font-body)", fontSize:"15px", color:"rgba(255,255,255,0.35)", marginTop:"12px", maxWidth:"400px", margin:"12px auto 0" }}>Real metrics from real systems running in production.</p>
        </div>

        <div className="reveal">
          {isMobile ? <StackedFallback /> : <HubDiagram />}
        </div>
      </div>
    </section>
  );
}
