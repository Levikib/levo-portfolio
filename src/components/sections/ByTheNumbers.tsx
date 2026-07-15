"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { val:247, suffix:"+", label:"Active Tenants Managed", sub:"Live on Makeja Homes", color:"var(--purple)" },
  { val:1.5, suffix:"M+", prefix:"KSH ", label:"Monthly Transaction Volume", sub:"Processed via Paystack", color:"var(--amber)" },
  { val:13, suffix:"", label:"GhostNet Cybersec Modules", sub:"243 lab steps · 9 live tools", color:"var(--forest)" },
  { val:5450, suffix:"", label:"GhostNet XP Economy", sub:"Gamified learning platform", color:"var(--forest)" },
  { val:8, suffix:"+", label:"Years in Tech", sub:"From cert to SaaS founder", color:"var(--forest)" },
  { val:2, suffix:"", label:"Production SaaS Live", sub:"Makeja Homes · GhostNet", color:"var(--purple)" },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        setTimeout(() => {
          const duration = 1400;
          const steps = 60;
          const increment = stat.val / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= stat.val) {
              setCount(stat.val);
              clearInterval(timer);
            } else {
              setCount(parseFloat(current.toFixed(1)));
            }
          }, duration / steps);
        }, index * 100);
      }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [stat.val, index]);

  const displayVal = stat.val % 1 !== 0
    ? (count >= stat.val ? stat.val.toFixed(1) : count.toFixed(1))
    : Math.floor(count);

  return (
    <div ref={ref} className="reveal relative p-8"
      style={{ background:"var(--surface)", border:"1px solid var(--border)" }}
    >
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"3px", background:stat.color }} />

      <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(32px,4vw,44px)", lineHeight:1, color:stat.color, marginBottom:"10px", letterSpacing:"-0.02em" }}>
        {stat.prefix || ""}{displayVal}{stat.suffix}
      </div>
      <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"14px", color:"var(--text)", marginBottom:"4px", lineHeight:1.3 }}>{stat.label}</div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--text-4)", letterSpacing:"0.05em" }}>{stat.sub}</div>
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
    <section ref={ref} className="relative px-8 md:px-12 py-24" style={{ background:"var(--bg-2)" }}>
      <div className="reveal mb-14">
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"var(--purple)", textTransform:"uppercase", marginBottom:"12px" }}>// Impact</div>
        <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(32px,5vw,56px)", lineHeight:1, letterSpacing:"-0.02em", color:"var(--text)" }}>By The Numbers</div>
        <p style={{ fontFamily:"var(--font-body)", fontSize:"16px", color:"var(--text-3)", marginTop:"16px", maxWidth:"480px", lineHeight:1.8 }}>
          Real metrics from real systems running in production.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>
    </section>
  );
}
