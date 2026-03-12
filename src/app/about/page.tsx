"use client";
import { useState, useEffect, useRef } from "react";

// ── SCRAMBLE ENGINE ───────────────────────────────────────────────────────────
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%<>?/\\|ΛΨΩΦΞアイウエカキクケコサシスセ";
const rg = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

const SIZES: Record<string, { fs: string; fw: number }> = {
  xxs: { fs: "9px",  fw: 400 },
  xs:  { fs: "11px", fw: 400 },
  sm:  { fs: "13px", fw: 400 },
  md:  { fs: "16px", fw: 500 },
  lg:  { fs: "22px", fw: 700 },
  xl:  { fs: "30px", fw: 800 },
  xxl: { fs: "42px", fw: 800 },
};

type WordDef = {
  text: string; color?: string; size?: string;
  glow?: boolean; chromatic?: boolean; shimmer?: boolean; emoji?: boolean;
};
type LineDef = { words: WordDef[]; pauseAfter: number };

const SCRIPT: LineDef[] = [
  { words: [
    { text: "Hi,",    size: "xxl", color: "rgba(255,255,255,0.92)" },
    { text: "I'm",    size: "xxl", color: "rgba(255,255,255,0.92)" },
    { text: "Levis",  size: "xxl", color: "#a855f7", glow: true, chromatic: true, shimmer: true },
    { text: "👋",     size: "xl",  emoji: true },
  ], pauseAfter: 750 },
  { words: [
    { text: "Welcome to my little corner of the internet.", size: "xs", color: "rgba(255,255,255,0.28)" },
  ], pauseAfter: 650 },
  { words: [
    { text: "Let's talk", size: "lg", color: "rgba(255,255,255,0.62)" },
  ], pauseAfter: 220 },
  { words: [
    { text: "tech.",        size: "xl", color: "#7c3aed", glow: true, chromatic: true },
    { text: "Anime.",       size: "xl", color: "#e11d48", glow: true },
    { text: "Shows.",       size: "xl", color: "#d97706", glow: true },
    { text: "Life.",        size: "xl", color: "#4ead6a", glow: true },
    { text: "Philosophy.",  size: "xl", color: "#0891b2", glow: true },
    { text: "Politics.",    size: "xl", color: "#a855f7", glow: true, chromatic: true },
  ], pauseAfter: 320 },
  { words: [
    { text: "You name it.", size: "sm", color: "rgba(255,255,255,0.32)" },
  ], pauseAfter: 1000 },
  { words: [
    { text: "But also —",   size: "xxs", color: "rgba(255,255,255,0.2)" },
  ], pauseAfter: 450 },
  { words: [
    { text: "I",       size: "xxl", color: "white" },
    { text: "build",   size: "xxl", color: "white" },
    { text: "things.", size: "xxl", color: "#a855f7", glow: true, shimmer: true, chromatic: true },
  ], pauseAfter: 520 },
  { words: [
    { text: "Real things.",          size: "lg", color: "rgba(255,255,255,0.78)" },
    { text: "That move real money.", size: "lg", color: "#4ead6a", glow: true },
  ], pauseAfter: 620 },
  { words: [
    { text: "From Nairobi, Kenya.", size: "sm",  color: "rgba(255,255,255,0.42)" },
    { text: "To the world.",        size: "xxl", color: "#a855f7", glow: true, shimmer: true, chromatic: true },
    { text: "🌍", size: "xl", emoji: true },
  ], pauseAfter: 4200 },
];

type WordTiming = { li: number; wi: number; key: string; def: WordDef; startTime: number; charMs: number; totalDuration: number };

function buildTimeline(): { timeline: WordTiming[]; totalTime: number } {
  const tl: WordTiming[] = [];
  let cursor = 480;
  for (let li = 0; li < SCRIPT.length; li++) {
    const line = SCRIPT[li];
    for (let wi = 0; wi < line.words.length; wi++) {
      const def = line.words[wi];
      const charMs = def.emoji ? 0 : 42;
      const totalDuration = def.emoji ? 60 : def.text.length * charMs + 60;
      tl.push({ li, wi, key: `${li}-${wi}`, def, startTime: cursor, charMs, totalDuration });
      cursor += totalDuration + (def.emoji ? 0 : 80);
    }
    cursor += line.pauseAfter;
  }
  return { timeline: tl, totalTime: cursor + 200 };
}

// ── CANVAS TYPES ─────────────────────────────────────────────────────────────
type Particle = { x: number; y: number; vx: number; vy: number; color: string; size: number; opacity: number; life: number; maxLife: number };
type DataStream = { x: number; chars: string[]; y: number; speed: number; opacity: number };
const PARTICLE_COLORS = ["#7c3aed","#a855f7","#e11d48","#d97706","#4ead6a","#0891b2"];

function initParticles(w: number, h: number): Particle[] {
  return Array.from({ length: 28 }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    size: Math.random() * 1.8 + 0.5,
    opacity: Math.random() * 0.5 + 0.15,
    life: Math.random() * 200, maxLife: 200 + Math.random() * 200,
  }));
}
function initStreams(w: number, h: number): DataStream[] {
  return Array.from({ length: 5 }, () => ({
    x: Math.random() * w, chars: Array.from({ length: 16 }, () => rg()),
    y: Math.random() * h, speed: 0.5 + Math.random() * 0.8, opacity: 0.03 + Math.random() * 0.05,
  }));
}

// ── MOTION GRAPHIC ────────────────────────────────────────────────────────────
function MotionGraphic() {
  const [display, setDisplay]           = useState<Record<string, string>>({});
  const [resolved, setResolved]         = useState<Set<string>>(new Set());
  const [justResolved, setJustResolved] = useState<Set<string>>(new Set());
  const [showCursor, setShowCursor]     = useState(true);
  const [cursorKey, setCursorKey]       = useState("");
  const [isComplete, setIsComplete]     = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef  = useRef<HTMLDivElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);
  const animRef = useRef({
    seqStart: 0 as number, rafId: 0 as number,
    timeline: [] as WordTiming[], totalTime: 0,
    particles: [] as Particle[], streams: [] as DataStream[],
    scanOffset: 0, beamY: -40,
    mouse: { x: 0.5, y: 0.5 }, tilt: { x: 0, y: 0 },
    lastRender: 0,
  });

  useEffect(() => {
    const { timeline, totalTime } = buildTimeline();
    animRef.current.timeline = timeline;
    animRef.current.totalTime = totalTime;
    animRef.current.seqStart = performance.now();
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width; canvas.height = rect.height;
      animRef.current.particles = initParticles(rect.width, rect.height);
      animRef.current.streams   = initStreams(rect.width, rect.height);
    }
    const blinkId = setInterval(() => setShowCursor(c => !c), 540);

    const loop = (now: number) => {
      const a = animRef.current;
      const elapsed = now - a.seqStart;
      if (now - a.lastRender >= 20) {
        a.lastRender = now;
        const newDisplay: Record<string, string> = {};
        const newResolved = new Set<string>();
        const newJustResolved = new Set<string>();
        let lastVisibleKey = "";
        for (const item of a.timeline) {
          const t = elapsed - item.startTime;
          if (t < 0) continue;
          lastVisibleKey = item.key;
          if (item.def.emoji) { newDisplay[item.key] = item.def.text; newResolved.add(item.key); continue; }
          const charsResolved = Math.min(item.def.text.length, Math.floor(t / item.charMs));
          if (charsResolved >= item.def.text.length) {
            newDisplay[item.key] = item.def.text; newResolved.add(item.key);
            if (!resolved.has(item.key)) newJustResolved.add(item.key);
          } else {
            newDisplay[item.key] = item.def.text.slice(0, charsResolved) + Array.from({ length: item.def.text.length - charsResolved }, () => rg()).join("");
          }
        }
        setCursorKey(lastVisibleKey);
        setDisplay(newDisplay);
        setResolved(newResolved);
        if (newJustResolved.size > 0) { setJustResolved(newJustResolved); setTimeout(() => setJustResolved(new Set()), 400); }
        if (elapsed > a.totalTime) {
          setIsComplete(true);
          setTimeout(() => { setIsComplete(false); setDisplay({}); setResolved(new Set()); a.seqStart = performance.now(); }, 800);
        }
      }
      // Canvas draw
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const W = canvas.width, H = canvas.height;
          ctx.clearRect(0, 0, W, H);
          for (const stream of a.streams) {
            stream.y += stream.speed;
            if (stream.y > H + 200) { stream.y = -200; stream.x = Math.random() * W; }
            for (let i = 0; i < stream.chars.length; i++) {
              if (Math.random() < 0.02) stream.chars[i] = rg();
              ctx.fillStyle = `rgba(168,85,247,${stream.opacity * (1 - i / stream.chars.length)})`;
              ctx.font = "9px monospace"; ctx.fillText(stream.chars[i], stream.x, stream.y - i * 12);
            }
          }
          for (const p of a.particles) {
            p.x += p.vx; p.y += p.vy; p.life++;
            if (p.life > p.maxLife) { p.life = 0; p.maxLife = 200 + Math.random() * 200; p.x = Math.random() * W; p.y = Math.random() * H; p.color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]; p.opacity = Math.random() * 0.5 + 0.15; }
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;
            const fade = Math.sin((p.life / p.maxLife) * Math.PI);
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color + Math.round(p.opacity * fade * 255).toString(16).padStart(2, "0"); ctx.fill();
            for (const q of a.particles) {
              const dx = p.x - q.x, dy = p.y - q.y, dist = Math.sqrt(dx*dx+dy*dy);
              if (dist < 70 && dist > 0) { ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.strokeStyle = `rgba(168,85,247,${(1-dist/70)*0.08})`; ctx.lineWidth = 0.5; ctx.stroke(); }
            }
          }
          a.scanOffset = (a.scanOffset + 0.3) % 4;
          for (let y = a.scanOffset; y < H; y += 4) { ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.fillRect(0, y, W, 1); }
          a.beamY += 0.8; if (a.beamY > H + 40) a.beamY = -40;
          const bg = ctx.createLinearGradient(0, a.beamY-20, 0, a.beamY+20);
          bg.addColorStop(0,"rgba(168,85,247,0)"); bg.addColorStop(0.5,"rgba(168,85,247,0.06)"); bg.addColorStop(1,"rgba(168,85,247,0)");
          ctx.fillStyle = bg; ctx.fillRect(0, a.beamY-20, W, 40);
          const vg = ctx.createRadialGradient(W/2,H/2,H*0.3,W/2,H/2,H*0.85);
          vg.addColorStop(0,"rgba(0,0,0,0)"); vg.addColorStop(1,"rgba(0,0,0,0.55)");
          ctx.fillStyle = vg; ctx.fillRect(0,0,W,H);
        }
      }
      // 3D tilt
      if (textRef.current) {
        const targetX = (a.mouse.y - 0.5) * -6, targetY = (a.mouse.x - 0.5) * 6;
        a.tilt.x += (targetX - a.tilt.x) * 0.06; a.tilt.y += (targetY - a.tilt.y) * 0.06;
        textRef.current.style.transform = `perspective(900px) rotateX(${a.tilt.x}deg) rotateY(${a.tilt.y}deg)`;
      }
      a.rafId = requestAnimationFrame(loop);
    };
    a.rafId = requestAnimationFrame(loop);
    return () => { clearInterval(blinkId); cancelAnimationFrame(animRef.current.rafId); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const a = animRef.current;
  const lineGroups: { li: number; wi: number; key: string; def: WordDef }[][] = [];
  for (const item of a.timeline) { if (!lineGroups[item.li]) lineGroups[item.li] = []; lineGroups[item.li].push(item); }

  return (
    <div ref={panelRef}
      onMouseMove={(e) => { const r = panelRef.current?.getBoundingClientRect(); if (!r) return; animRef.current.mouse.x = (e.clientX-r.left)/r.width; animRef.current.mouse.y = (e.clientY-r.top)/r.height; }}
      onMouseLeave={() => { animRef.current.mouse = { x: 0.5, y: 0.5 }; }}
      style={{ background:"#0a0805", position:"relative", overflow:"hidden", minHeight:"540px", display:"flex", flexDirection:"column", justifyContent:"center", borderLeft:"1px solid rgba(255,255,255,0.05)" }}
    >
      <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:1 }} />
      <div style={{ position:"absolute", top:"-100px", right:"-60px", width:"400px", height:"400px", background:"radial-gradient(circle, rgba(124,58,237,0.14), transparent 70%)", filter:"blur(80px)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", bottom:"-60px", left:"20%", width:"300px", height:"300px", background:"radial-gradient(circle, rgba(78,173,106,0.07), transparent 70%)", filter:"blur(80px)", pointerEvents:"none", zIndex:0 }} />

      {/* Terminal bar */}
      <div style={{ position:"absolute", top:"18px", left:"108px", right:"24px", display:"flex", alignItems:"center", justifyContent:"space-between", zIndex:6 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"7px" }}>
          <div style={{ display:"flex", gap:"5px" }}>
            {["#e11d48","#d97706","#4ead6a"].map(c => <div key={c} style={{ width:"9px", height:"9px", borderRadius:"50%", background:c, opacity:0.65 }} />)}
          </div>
          <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"8px", color:"rgba(255,255,255,0.18)", letterSpacing:"0.1em" }}>levo.sh — about.tsx</div>
        </div>
        <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"8px", color:"rgba(255,255,255,0.1)", letterSpacing:"0.08em" }}>{isComplete ? "REPLAYING..." : "● LIVE"}</div>
      </div>
      {/* Text content — 3D tilt container */}
      <div ref={textRef} style={{ position:"relative", zIndex:6, padding:"56px 48px 48px 110px", transformOrigin:"center center", willChange:"transform", minHeight:"400px", display:"flex", flexDirection:"column", justifyContent:"center", gap:"8px" }}>
        {lineGroups.map((lineWords, li) => {
          const hasAny = lineWords.some(w => display[w.key] !== undefined);
          if (!hasAny) return null;
          return (
            <div key={li} style={{ display:"flex", flexWrap:"wrap", alignItems:"baseline", gap:"8px 10px", marginBottom:"2px" }}>
              {lineWords.map(({ key, def }) => {
                const text = display[key];
                if (text === undefined) return null;
                const isResolved = resolved.has(key);
                const wasJustResolved = justResolved.has(key);
                const sz = SIZES[def.size ?? "md"];
                const isLast = key === cursorKey;
                const glowStyle = def.glow && isResolved ? `0 0 20px ${def.color}80, 0 0 40px ${def.color}40, 0 0 2px ${def.color}` : undefined;
                return (
                  <span key={key} style={{ fontFamily: sz.fw >= 700 ? "var(--font-syne)" : "var(--font-dm-sans)", fontWeight: sz.fw, fontSize: sz.fs, letterSpacing: sz.fw >= 700 ? "-0.02em" : "0", color: def.color ?? "rgba(255,255,255,0.8)", textShadow: glowStyle, display:"inline-block", animation: wasJustResolved ? "resolveFlash 0.5s ease-out forwards" : def.chromatic && isResolved ? "chromatic 2.8s ease-in-out infinite" : undefined, position:"relative", transition:"text-shadow 0.3s ease" }}>
                    {def.shimmer && isResolved && (
                      <span aria-hidden="true" style={{ position:"absolute", inset:0, background:"linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.28) 50%, transparent 70%)", backgroundSize:"200% 100%", animation:"shimmerSweep 3s ease-in-out infinite", mixBlendMode:"overlay", pointerEvents:"none" }} />
                    )}
                    {def.emoji ? text : text.split("").map((ch, ci) => (
                      <span key={ci} style={{ color: ch === def.text[ci] ? undefined : "rgba(168,85,247,0.7)", fontFamily: ch !== def.text[ci] ? "monospace" : undefined, opacity: ch !== def.text[ci] ? 0.6 : 1, transition:"color 0.05s" }}>{ch}</span>
                    ))}
                    {isLast && !isComplete && (
                      <span style={{ display:"inline-block", width:"2px", height:sz.fs, background:"#a855f7", opacity:showCursor?1:0, marginLeft:"3px", verticalAlign:"middle", boxShadow:"0 0 8px #a855f7, 0 0 16px #a855f7", transition:"opacity 0.08s" }} />
                    )}
                  </span>
                );
              })}
            </div>
          );
        })}
        {Object.keys(display).length === 0 && (
          <span style={{ display:"inline-block", width:"2px", height:"44px", background:"#a855f7", opacity:showCursor?1:0, boxShadow:"0 0 10px #a855f7", transition:"opacity 0.1s" }} />
        )}
      </div>
      {/* Noise grain */}
      <div style={{ position:"absolute", inset:0, zIndex:7, pointerEvents:"none", opacity:0.025, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat:"repeat", backgroundSize:"128px" }} />
      <style>{`
        @keyframes chromatic {
          0%   { text-shadow: -3px 0 rgba(255,0,100,0.65), 3px 0 rgba(0,200,255,0.65); }
          25%  { text-shadow: -5px 0 rgba(255,0,100,0.4), 5px 0 rgba(0,200,255,0.4), 0 0 30px currentColor; }
          50%  { text-shadow: -2px 0 rgba(255,0,100,0.7), 2px 0 rgba(0,200,255,0.7); }
          75%  { text-shadow: -4px 0 rgba(255,0,100,0.35), 4px 0 rgba(0,200,255,0.35), 0 0 20px currentColor; }
          100% { text-shadow: -3px 0 rgba(255,0,100,0.65), 3px 0 rgba(0,200,255,0.65); }
        }
        @keyframes resolveFlash {
          0%   { filter: brightness(1); }
          20%  { filter: brightness(2.5) saturate(1.5); }
          60%  { filter: brightness(1.4); }
          100% { filter: brightness(1); }
        }
        @keyframes shimmerSweep {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </div>
  );
}

// ── PAGE DATA ─────────────────────────────────────────────────────────────────
const TIMELINE = [
  { year:"2017",      title:"First code — Software Development Certificate", org:"ICT Authority Kenya",               type:"education", accent:"#7c3aed", desc:"First formal grounding in software engineering fundamentals. The start of everything." },
  { year:"2020",      title:"Cybersecurity & Ethical Hacking",               org:"Zalego Institute of Technology",    type:"education", accent:"#dc2626", desc:"Hands-on ethical hacking, penetration testing, and security fundamentals." },
  { year:"2020–2024", title:"BSc Information Technology",                    org:"Kenyatta University",               type:"education", accent:"#0891b2", desc:"Full degree covering software engineering, networks, databases, and systems. Second Upper Class Honours." },
  { year:"Apr 2022",  title:"IT Intern",                                     org:"Ministry of Foreign & Diaspora Affairs", type:"work", accent:"#059669", desc:"Government infrastructure, network management, and systems support. First real-world deployment experience." },
  { year:"Apr 2024",  title:"Founded Makeja Homes",                          org:"Founding Fullstack Engineer",       type:"founding",  accent:"#7c3aed", desc:"Co-founded and built a full production SaaS from zero. 170+ units, KSH 1.5M/month in transaction volume." },
  { year:"May 2024",  title:"Founder & Lead Engineer",                       org:"ShanTech Agency",                   type:"founding",  accent:"#e11d48", desc:"12+ SME clients, 250K+ engagement views, full-stack delivery + CRM automation. Hired, managed, shipped." },
  { year:"2025",      title:"Oracle Cloud Infrastructure AI Foundations",    org:"Oracle · 2025",                     type:"cert",      accent:"#d97706", desc:"Validated cloud and AI knowledge with an internationally recognised Oracle certification." },
  { year:"2026",      title:"NSE Research Agent",                            org:"In Development",                    type:"building",  accent:"#a855f7", desc:"AI-powered market intelligence for the Nairobi Securities Exchange. Decision support, not prediction." },
];

const STACK = [
  { cat:"Frontend",       accent:"#7c3aed", items:["TypeScript","Next.js 14","React","Tailwind CSS","Framer Motion"] },
  { cat:"Backend",        accent:"#0891b2", items:["Node.js","Java","Spring Boot","REST APIs","WebSockets"] },
  { cat:"Database",       accent:"#4ead6a", items:["PostgreSQL","Prisma ORM","MySQL","MongoDB","Neon"] },
  { cat:"Infrastructure", accent:"#d97706", items:["Vercel","VPS/Nginx","Docker","GitHub Actions","PM2"] },
  { cat:"Payments",       accent:"#e11d48", items:["Paystack","Stripe","M-Pesa Daraja","Resend","Twilio"] },
  { cat:"AI & Data",      accent:"#a855f7", items:["Python","Pandas","LLM APIs","LangChain","Financial APIs"] },
  { cat:"Security",       accent:"#dc2626", items:["OWASP","Pen Testing","OAuth2/JWT","SSL/TLS","Webhook Security"] },
  { cat:"Design & CMS",   accent:"#059669", items:["Figma","InDesign","Sanity CMS","GoHighLevel","Canva"] },
];

const BEYOND = [
  { icon:"🎌", title:"Anime Head",        body:"Fullmetal Alchemist, Attack on Titan, Vinland Saga. The philosophy in these is real — don't argue." },
  { icon:"📖", title:"Editorial Designer", body:"Two volumes of Chill Minds Magazine — 72 pages of children's mental wellness content. Designed solo, printed, distributed." },
  { icon:"📈", title:"Markets Watcher",   body:"NSE investor building the tool I always wished existed. Understanding money is understanding systems." },
  { icon:"🌍", title:"Nairobi → World",   body:"Building from Kenya, for Kenya and beyond. Proving that world-class products can ship from anywhere." },
];

function CountUp({ target, suffix="" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let cur = 0; const steps = 40; const inc = target / steps;
        const t = setInterval(() => { cur = Math.min(cur+inc, target); setCount(Math.floor(cur)); if (cur >= target) clearInterval(t); }, 1600/steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <div ref={ref}>{count}{suffix}</div>;
}

// ── ABOUT PAGE ────────────────────────────────────────────────────────────────
export default function About() {
  const [activeType, setActiveType] = useState<string | null>(null);
  const filtered = activeType ? TIMELINE.filter(t => t.type === activeType) : TIMELINE;

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>

      {/* HERO */}
      <div style={{ borderBottom:"1px solid var(--border)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>

          {/* Left: copy */}
          <div style={{ padding:"140px 0 0 48px", display:"flex", flexDirection:"column" }}>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"var(--purple)", textTransform:"uppercase", marginBottom:"20px" }}>// Who I Am</div>
              <h1 style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"clamp(48px,6vw,84px)", lineHeight:0.9, letterSpacing:"-0.03em", color:"var(--text)", marginBottom:"28px" }}>
                Levis.<br /><span style={{ color:"var(--purple)" }}>Kibirie.</span>
              </h1>
              <p style={{ fontFamily:"var(--font-dm-sans)", fontSize:"15px", color:"var(--text-3)", lineHeight:1.9, maxWidth:"420px", marginBottom:"20px" }}>
                Founding Fullstack Engineer based in Nairobi, Kenya. I build production systems that handle real money, real users, and real consequences — then I make them beautiful.
              </p>
              <p style={{ fontFamily:"var(--font-dm-sans)", fontSize:"15px", color:"var(--text-3)", lineHeight:1.9, maxWidth:"420px", marginBottom:"36px" }}>
                Co-founded Makeja Homes — a property management SaaS processing KSH 1.5M/month across 170+ units. That&apos;s the bar.
              </p>
              <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
                <a href="/work"
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--purple)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--text)"; }}
                  style={{ fontFamily:"var(--font-syne-mono)", fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", background:"var(--text)", color:"white", padding:"12px 24px", textDecoration:"none", transition:"all 0.2s" }}>
                  See My Work →
                </a>
                <a href="/#contact"
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--text)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                  style={{ fontFamily:"var(--font-syne-mono)", fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", background:"transparent", color:"var(--text-3)", padding:"12px 24px", textDecoration:"none", border:"1px solid var(--border)", transition:"all 0.2s" }}>
                  Let&apos;s Talk
                </a>
              </div>
            </div>
            {/* Quick facts */}
            <div style={{ display:"flex", borderTop:"1px solid var(--border)", marginTop:"48px" }}>
              {[{l:"Based in",v:"Nairobi, KE"},{l:"Available",v:"Remotely"},{l:"Response",v:"< 24 hrs"}].map((f,i) => (
                <div key={f.l} style={{ flex:1, padding:"20px 24px", borderRight:i<2?"1px solid var(--border)":"none" }}>
                  <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"8px", color:"var(--text-4)", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"4px" }}>{f.l}</div>
                  <div style={{ fontFamily:"var(--font-syne)", fontWeight:700, fontSize:"15px", color:"var(--text)" }}>{f.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: motion graphic */}
          <MotionGraphic />
        </div>
      </div>

      {/* NUMBERS */}
      <div style={{ background:"#0a0805", padding:"72px 48px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(124,58,237,0.6)", textTransform:"uppercase", marginBottom:"48px" }}>// By The Numbers</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"1px", background:"rgba(255,255,255,0.06)" }}>
          {[
            { val:170, suffix:"+",     label:"Units Managed",  accent:"#7c3aed" },
            { val:1.5, suffix:"M KSH", label:"Monthly Volume", accent:"#4ead6a" },
            { val:12,  suffix:"+",     label:"Agency Clients", accent:"#e11d48" },
            { val:250, suffix:"K+",    label:"Engagements",    accent:"#d97706" },
            { val:6,   suffix:"+",     label:"Years Building", accent:"#0891b2" },
          ].map(s => (
            <div key={s.label} style={{ background:"#0a0805", padding:"36px 24px", textAlign:"center", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"2px", background:`linear-gradient(90deg, ${s.accent}, transparent)` }} />
              <div style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"clamp(26px,2.5vw,40px)", color:s.accent, lineHeight:1, marginBottom:"8px" }}>
                <CountUp target={s.val} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"9px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.12em", textTransform:"uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <div style={{ background:"var(--bg)", padding:"72px 48px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"48px", flexWrap:"wrap", gap:"16px" }}>
          <div>
            <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"var(--purple)", textTransform:"uppercase", marginBottom:"10px" }}>// Journey</div>
            <h2 style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"clamp(32px,4vw,52px)", letterSpacing:"-0.02em", color:"var(--text)", lineHeight:1 }}>How I Got Here.</h2>
          </div>
          <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
            {[{k:null,l:"All"},{k:"education",l:"Education"},{k:"work",l:"Work"},{k:"founding",l:"Founded"},{k:"cert",l:"Certs"},{k:"building",l:"Building"}].map(f => (
              <button key={String(f.k)} onClick={() => setActiveType(f.k)}
                style={{ fontFamily:"var(--font-syne-mono)", fontSize:"9px", letterSpacing:"0.1em", textTransform:"uppercase", padding:"6px 14px", background:activeType===f.k?"var(--text)":"transparent", border:`1px solid ${activeType===f.k?"var(--text)":"var(--border)"}`, color:activeType===f.k?"white":"var(--text-3)", cursor:"pointer", transition:"all 0.2s" }}>
                {f.l}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline list — fixed dot overlap */}
        <div style={{ position:"relative" }}>
          {/* Vertical line */}
          <div style={{ position:"absolute", left:"120px", top:0, bottom:0, width:"1px", background:"var(--border)" }} />
          {filtered.map((item, i) => (
            <div key={i} style={{ display:"grid", gridTemplateColumns:"120px 1fr", position:"relative", paddingBottom: i < filtered.length-1 ? "0" : "0" }}>
              {/* Year */}
              <div style={{ paddingTop:"32px", paddingRight:"24px", textAlign:"right" }}>
                <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"10px", color:item.accent, letterSpacing:"0.08em" }}>{item.year}</div>
              </div>
              {/* Content */}
              <div style={{ padding:"28px 0 28px 40px", borderBottom: i < filtered.length-1 ? "1px solid var(--border)" : "none", position:"relative" }}>
                {/* Dot on the line */}
                <div style={{ position:"absolute", left:"-4.5px", top:"36px", width:"9px", height:"9px", borderRadius:"50%", background:item.accent, border:"2px solid var(--bg)", boxShadow:`0 0 0 1px ${item.accent}` }} />
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"7px", flexWrap:"wrap" }}>
                  <span style={{ fontFamily:"var(--font-syne-mono)", fontSize:"8px", letterSpacing:"0.12em", textTransform:"uppercase", color:item.accent, background:`${item.accent}12`, border:`1px solid ${item.accent}30`, padding:"3px 9px" }}>
                    {item.type==="education"?"Education":item.type==="work"?"Work":item.type==="founding"?"Founded":item.type==="cert"?"Certified":"Building"}
                  </span>
                  <span style={{ fontFamily:"var(--font-syne-mono)", fontSize:"9px", color:"var(--text-4)" }}>{item.org}</span>
                </div>
                <h3 style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"19px", color:"var(--text)", lineHeight:1.2, marginBottom:"9px" }}>{item.title}</h3>
                <p style={{ fontFamily:"var(--font-dm-sans)", fontSize:"13px", color:"var(--text-3)", lineHeight:1.85, maxWidth:"580px" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STACK */}
      <div style={{ background:"#0a0805", padding:"72px 48px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(124,58,237,0.6)", textTransform:"uppercase", marginBottom:"12px" }}>// Full Stack</div>
        <h2 style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"clamp(32px,4vw,52px)", letterSpacing:"-0.02em", color:"white", lineHeight:1, marginBottom:"48px" }}>The Toolkit.</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", background:"rgba(255,255,255,0.06)" }}>
          {STACK.map(cat => (
            <div key={cat.cat} style={{ background:"#0a0805", padding:"32px 28px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:`linear-gradient(90deg,${cat.accent},transparent)` }} />
              <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"9px", letterSpacing:"0.15em", textTransform:"uppercase", color:cat.accent, marginBottom:"18px", opacity:0.7 }}>{cat.cat}</div>
              {cat.items.map(item => (
                <div key={item} style={{ display:"flex", alignItems:"center", gap:"9px", marginBottom:"7px" }}>
                  <div style={{ width:"4px", height:"4px", borderRadius:"50%", background:cat.accent, flexShrink:0, opacity:0.7 }} />
                  <span style={{ fontFamily:"var(--font-dm-sans)", fontSize:"13px", color:"rgba(255,255,255,0.65)" }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* BEYOND */}
      <div style={{ background:"var(--bg)", padding:"72px 48px" }}>
        <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"var(--purple)", textTransform:"uppercase", marginBottom:"12px" }}>// Beyond the Code</div>
        <h2 style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"clamp(32px,4vw,52px)", letterSpacing:"-0.02em", color:"var(--text)", lineHeight:1, marginBottom:"48px" }}>The Full Picture.</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px" }}>
          {BEYOND.map((b,i) => (
            <div key={b.title} style={{ background:i%2===0?"#ffffff":"var(--bg-2)", border:"1px solid var(--border)", padding:"32px 28px" }}>
              <div style={{ fontSize:"32px", marginBottom:"16px" }}>{b.icon}</div>
              <h3 style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"16px", color:"var(--text)", marginBottom:"10px" }}>{b.title}</h3>
              <p style={{ fontFamily:"var(--font-dm-sans)", fontSize:"12px", color:"var(--text-3)", lineHeight:1.85 }}>{b.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background:"#0a0805", padding:"80px 48px", textAlign:"center", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily:"var(--font-syne-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(168,85,247,0.6)", textTransform:"uppercase", marginBottom:"16px" }}>// Open to Opportunities</div>
        <h2 style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"clamp(32px,5vw,60px)", lineHeight:1, letterSpacing:"-0.02em", color:"white", marginBottom:"12px" }}>
          Available for the<br /><span style={{ color:"#a855f7" }}>right opportunity.</span>
        </h2>
        <p style={{ fontFamily:"var(--font-dm-sans)", fontSize:"15px", color:"rgba(255,255,255,0.4)", marginBottom:"36px" }}>Senior remote roles · Founding engineer positions · Long-term contracts</p>
        <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
          <a href="/#contact"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "white"; (e.currentTarget as HTMLElement).style.color = "#7c3aed"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#7c3aed"; (e.currentTarget as HTMLElement).style.color = "white"; }}
            style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", background:"#7c3aed", color:"white", padding:"15px 36px", textDecoration:"none", boxShadow:"0 0 32px rgba(124,58,237,0.35)", transition:"all 0.25s" }}>
            Let&apos;s Work Together →
          </a>
          <a href="/work"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
            style={{ fontFamily:"var(--font-syne)", fontWeight:800, fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", background:"transparent", color:"rgba(255,255,255,0.5)", padding:"15px 36px", textDecoration:"none", border:"1px solid rgba(255,255,255,0.12)", transition:"all 0.25s" }}>
            View My Work
          </a>
        </div>
      </div>
    </div>
  );
}
