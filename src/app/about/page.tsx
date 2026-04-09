"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ── SCRAMBLE ENGINE ───────────────────────────────────────────────────────────
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>?/\\|ΛΨΩΦΞΣΔΘアイウエカキクケコサシスセソ█▓▒░▄▀■□";
const rg = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

const SIZES: Record<string, { fs: string; fw: number; lh?: number }> = {
  xxs: { fs: "9px",  fw: 400 },
  xs:  { fs: "11px", fw: 400 },
  sm:  { fs: "14px", fw: 400 },
  md:  { fs: "17px", fw: 500 },
  lg:  { fs: "24px", fw: 700 },
  xl:  { fs: "32px", fw: 800, lh: 1.05 },
  xxl: { fs: "clamp(36px,5vw,52px)", fw: 800, lh: 1.0 },
};

type WordDef = {
  text: string; color?: string; size?: string;
  glow?: boolean; chromatic?: boolean; shimmer?: boolean; emoji?: boolean;
  pulse?: boolean;
};
type LineDef = { words: WordDef[]; pauseAfter: number };

const SCRIPT: LineDef[] = [
  { words: [
    { text: "Hi,",    size: "xxl", color: "rgba(255,255,255,0.92)" },
    { text: "I'm",    size: "xxl", color: "rgba(255,255,255,0.92)" },
    { text: "Levis",  size: "xxl", color: "#a855f7", glow: true, chromatic: true, shimmer: true },
    { text: "👋",     size: "xl",  emoji: true },
  ], pauseAfter: 700 },
  { words: [
    { text: "Welcome to my little corner of the internet.", size: "xs", color: "rgba(255,255,255,0.28)" },
  ], pauseAfter: 600 },
  { words: [
    { text: "Let's talk", size: "lg", color: "rgba(255,255,255,0.62)" },
  ], pauseAfter: 180 },
  { words: [
    { text: "tech.",        size: "xl", color: "#7c3aed", glow: true, chromatic: true },
    { text: "Anime.",       size: "xl", color: "#e11d48", glow: true },
    { text: "Shows.",       size: "xl", color: "#d97706", glow: true },
    { text: "Life.",        size: "xl", color: "#4ead6a", glow: true },
    { text: "Philosophy.",  size: "xl", color: "#0891b2", glow: true },
    { text: "Politics.",    size: "xl", color: "#a855f7", glow: true, chromatic: true },
  ], pauseAfter: 280 },
  { words: [
    { text: "You name it.", size: "sm", color: "rgba(255,255,255,0.32)" },
  ], pauseAfter: 900 },
  { words: [
    { text: "But also —", size: "xxs", color: "rgba(255,255,255,0.2)" },
  ], pauseAfter: 400 },
  { words: [
    { text: "I",       size: "xxl", color: "white" },
    { text: "build",   size: "xxl", color: "white" },
    { text: "things.", size: "xxl", color: "#a855f7", glow: true, shimmer: true, chromatic: true },
  ], pauseAfter: 480 },
  { words: [
    { text: "Real things.",          size: "lg", color: "rgba(255,255,255,0.78)" },
    { text: "That move real money.", size: "lg", color: "#4ead6a", glow: true },
  ], pauseAfter: 560 },
  { words: [
    { text: "Makeja Homes.", size: "xl", color: "#a855f7", glow: true, chromatic: true, shimmer: true },
    { text: "GhostNet.",     size: "xl", color: "#10b981", glow: true, shimmer: true },
  ], pauseAfter: 560 },
  { words: [
    { text: "Both live.", size: "md", color: "rgba(255,255,255,0.55)" },
    { text: "Both solo.", size: "md", color: "#4ead6a", glow: true },
  ], pauseAfter: 520 },
  { words: [
    { text: "From Nairobi, Kenya.", size: "sm",  color: "rgba(255,255,255,0.42)" },
    { text: "To the world.",        size: "xxl", color: "#a855f7", glow: true, shimmer: true, chromatic: true },
    { text: "🌍", size: "xl", emoji: true },
  ], pauseAfter: 4500 },
];

type WordTiming = { li: number; wi: number; key: string; def: WordDef; startTime: number; charMs: number; totalDuration: number };

function buildTimeline(): { timeline: WordTiming[]; totalTime: number } {
  const tl: WordTiming[] = [];
  let cursor = 420;
  for (let li = 0; li < SCRIPT.length; li++) {
    const line = SCRIPT[li];
    for (let wi = 0; wi < line.words.length; wi++) {
      const def = line.words[wi];
      const charMs = def.emoji ? 0 : 38;
      const totalDuration = def.emoji ? 60 : def.text.length * charMs + 60;
      tl.push({ li, wi, key: `${li}-${wi}`, def, startTime: cursor, charMs, totalDuration });
      cursor += totalDuration + (def.emoji ? 0 : 70);
    }
    cursor += line.pauseAfter;
  }
  return { timeline: tl, totalTime: cursor + 200 };
}

// ── CANVAS TYPES ──────────────────────────────────────────────────────────────
type Particle = { x: number; y: number; vx: number; vy: number; color: string; size: number; opacity: number; life: number; maxLife: number };
type DataStream = { x: number; chars: string[]; y: number; speed: number; opacity: number; color: string };
const PARTICLE_COLORS = ["#7c3aed","#a855f7","#e11d48","#d97706","#4ead6a","#0891b2","#10b981"];
const STREAM_COLORS   = ["#7c3aed","#a855f7","#10b981","#4ead6a"];

function initParticles(w: number, h: number): Particle[] {
  return Array.from({ length: 35 }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.55 + 0.12,
    life: Math.random() * 200, maxLife: 200 + Math.random() * 240,
  }));
}
function initStreams(w: number, h: number): DataStream[] {
  return Array.from({ length: 7 }, () => ({
    x: Math.random() * w,
    chars: Array.from({ length: 20 }, () => rg()),
    y: Math.random() * h,
    speed: 0.4 + Math.random() * 0.9,
    opacity: 0.025 + Math.random() * 0.045,
    color: STREAM_COLORS[Math.floor(Math.random() * STREAM_COLORS.length)],
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
    scanOffset: 0, beamY: -40, beamSpeed: 0.7,
    mouse: { x: 0.5, y: 0.5 }, tilt: { x: 0, y: 0 },
    lastRender: 0, hexPulse: 0,
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
    const blinkId = setInterval(() => setShowCursor(c => !c), 520);

    const loop = (now: number) => {
      const a = animRef.current;
      const elapsed = now - a.seqStart;

      if (now - a.lastRender >= 16) {
        a.lastRender = now;
        const newDisplay: Record<string, string> = {};
        const newResolved = new Set<string>();
        const newJustResolved = new Set<string>();
        let lastVisibleKey = "";

        for (const item of a.timeline) {
          const t = elapsed - item.startTime;
          if (t < 0) continue;
          lastVisibleKey = item.key;
          if (item.def.emoji) {
            newDisplay[item.key] = item.def.text;
            newResolved.add(item.key);
            continue;
          }
          const charsResolved = Math.min(item.def.text.length, Math.floor(t / item.charMs));
          if (charsResolved >= item.def.text.length) {
            newDisplay[item.key] = item.def.text;
            newResolved.add(item.key);
            if (!resolved.has(item.key)) newJustResolved.add(item.key);
          } else {
            // Scramble: resolved chars locked, rest scrambling
            const locked = item.def.text.slice(0, charsResolved);
            const scrambled = Array.from({ length: item.def.text.length - charsResolved }, () => rg()).join("");
            newDisplay[item.key] = locked + scrambled;
          }
        }

        setCursorKey(lastVisibleKey);
        setDisplay(newDisplay);
        setResolved(newResolved);
        if (newJustResolved.size > 0) {
          setJustResolved(newJustResolved);
          setTimeout(() => setJustResolved(new Set()), 450);
        }
        if (elapsed > a.totalTime) {
          setIsComplete(true);
          setTimeout(() => {
            setIsComplete(false);
            setDisplay({});
            setResolved(new Set());
            a.seqStart = performance.now();
          }, 600);
        }
      }

      // ── Canvas rendering ──────────────────────────────────────────────────
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const W = canvas.width, H = canvas.height;
          ctx.clearRect(0, 0, W, H);

          // Data streams (matrix columns)
          for (const stream of a.streams) {
            stream.y += stream.speed;
            if (stream.y > H + 260) { stream.y = -260; stream.x = Math.random() * W; stream.color = STREAM_COLORS[Math.floor(Math.random() * STREAM_COLORS.length)]; }
            for (let i = 0; i < stream.chars.length; i++) {
              if (Math.random() < 0.025) stream.chars[i] = rg();
              const fade = 1 - i / stream.chars.length;
              ctx.fillStyle = `${stream.color}${Math.round(stream.opacity * fade * 255).toString(16).padStart(2,"0")}`;
              ctx.font = "9px monospace";
              ctx.fillText(stream.chars[i], stream.x, stream.y - i * 13);
            }
          }

          // Particles + connections
          a.hexPulse = (a.hexPulse + 0.012) % (Math.PI * 2);
          for (const p of a.particles) {
            p.x += p.vx; p.y += p.vy; p.life++;
            if (p.life > p.maxLife) {
              p.life = 0; p.maxLife = 200 + Math.random() * 240;
              p.x = Math.random() * W; p.y = Math.random() * H;
              p.color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
              p.opacity = Math.random() * 0.55 + 0.12;
            }
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;
            const fade = Math.sin((p.life / p.maxLife) * Math.PI);
            const alpha = Math.round(p.opacity * fade * 255).toString(16).padStart(2,"0");
            // Glow dot
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size + Math.sin(a.hexPulse + p.life * 0.05) * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = p.color + alpha; ctx.fill();
            // Connections
            for (const q of a.particles) {
              const dx = p.x - q.x, dy = p.y - q.y, dist = Math.sqrt(dx*dx+dy*dy);
              if (dist < 75 && dist > 0) {
                ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
                ctx.strokeStyle = `rgba(168,85,247,${(1 - dist/75) * 0.07})`;
                ctx.lineWidth = 0.5; ctx.stroke();
              }
            }
          }

          // Scanlines
          a.scanOffset = (a.scanOffset + 0.35) % 4;
          for (let y = a.scanOffset; y < H; y += 4) {
            ctx.fillStyle = "rgba(0,0,0,0.16)"; ctx.fillRect(0, y, W, 1);
          }

          // Moving beam
          a.beamY += a.beamSpeed; if (a.beamY > H + 60) a.beamY = -60;
          const bg = ctx.createLinearGradient(0, a.beamY - 28, 0, a.beamY + 28);
          bg.addColorStop(0, "rgba(168,85,247,0)");
          bg.addColorStop(0.5, "rgba(168,85,247,0.07)");
          bg.addColorStop(1, "rgba(168,85,247,0)");
          ctx.fillStyle = bg; ctx.fillRect(0, a.beamY - 28, W, 56);

          // Vignette
          const vg = ctx.createRadialGradient(W/2, H/2, H * 0.28, W/2, H/2, H * 0.9);
          vg.addColorStop(0, "rgba(0,0,0,0)");
          vg.addColorStop(1, "rgba(0,0,0,0.6)");
          ctx.fillStyle = vg; ctx.fillRect(0,0,W,H);
        }
      }

      // 3D tilt from mouse
      if (textRef.current) {
        const targetX = (a.mouse.y - 0.5) * -7;
        const targetY = (a.mouse.x - 0.5) * 7;
        a.tilt.x += (targetX - a.tilt.x) * 0.06;
        a.tilt.y += (targetY - a.tilt.y) * 0.06;
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
  for (const item of a.timeline) {
    if (!lineGroups[item.li]) lineGroups[item.li] = [];
    lineGroups[item.li].push(item);
  }

  return (
    <div
      ref={panelRef}
      onMouseMove={(e) => {
        const r = panelRef.current?.getBoundingClientRect();
        if (!r) return;
        animRef.current.mouse.x = (e.clientX - r.left) / r.width;
        animRef.current.mouse.y = (e.clientY - r.top) / r.height;
      }}
      onMouseLeave={() => { animRef.current.mouse = { x: 0.5, y: 0.5 }; }}
      style={{ background: "#0a0805", position: "relative", overflow: "hidden", minHeight: "560px", display: "flex", flexDirection: "column", justifyContent: "center", borderLeft: "1px solid rgba(255,255,255,0.05)" }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} />

      {/* Ambient glows */}
      <div style={{ position: "absolute", top: "-80px", right: "-60px", width: "440px", height: "440px", background: "radial-gradient(circle, rgba(124,58,237,0.16), transparent 70%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "-60px", left: "15%", width: "320px", height: "320px", background: "radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />

      {/* Terminal bar */}
      <div style={{ position: "absolute", top: "18px", left: "16px", right: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "flex", gap: "5px" }}>
            {["#e11d48","#d97706","#4ead6a"].map(c => <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c, opacity: 0.7 }} />)}
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em" }}>levo.sh — about.tsx</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ead6a", animation: "blink 2s ease-in-out infinite" }} />
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(255,255,255,0.15)", letterSpacing: "0.1em" }}>{isComplete ? "REPLAYING..." : "● LIVE"}</div>
        </div>
      </div>

      {/* Text — 3D tilt wrapper */}
      <div
        ref={textRef}
        style={{ position: "relative", zIndex: 6, padding: "clamp(56px,6vw,72px) clamp(20px,5vw,56px) clamp(36px,4vw,52px)", transformOrigin: "center center", willChange: "transform", minHeight: "460px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "6px" }}
      >
        {lineGroups.map((lineWords, li) => {
          const hasAny = lineWords.some(w => display[w.key] !== undefined);
          if (!hasAny) return null;
          return (
            <div key={li} style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "6px 10px", marginBottom: "1px" }}>
              {lineWords.map(({ key, def }) => {
                const text = display[key];
                if (text === undefined) return null;
                const isResolved = resolved.has(key);
                const wasJustResolved = justResolved.has(key);
                const sz = SIZES[def.size ?? "md"];
                const isLast = key === cursorKey;
                const glowStyle = def.glow && isResolved
                  ? `0 0 24px ${def.color}90, 0 0 48px ${def.color}45, 0 0 2px ${def.color}`
                  : undefined;

                return (
                  <span
                    key={key}
                    style={{
                      fontFamily: (sz.fw ?? 400) >= 700 ? "var(--font-display)" : "var(--font-body)",
                      fontWeight: sz.fw, fontSize: sz.fs,
                      lineHeight: sz.lh ?? 1.2,
                      letterSpacing: (sz.fw ?? 400) >= 700 ? "-0.02em" : "0",
                      color: def.color ?? "rgba(255,255,255,0.8)",
                      textShadow: glowStyle,
                      display: "inline-block",
                      animation: wasJustResolved
                        ? "resolveFlash 0.55s ease-out forwards"
                        : def.chromatic && isResolved
                          ? "chromatic 2.8s ease-in-out infinite"
                          : undefined,
                      position: "relative",
                      transition: "text-shadow 0.3s ease",
                    }}
                  >
                    {/* Shimmer overlay */}
                    {def.shimmer && isResolved && (
                      <span aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.32) 50%, transparent 75%)", backgroundSize: "250% 100%", animation: "shimmerSweep 2.8s ease-in-out infinite", mixBlendMode: "overlay", pointerEvents: "none" }} />
                    )}

                    {/* Characters — scrambled vs resolved */}
                    {def.emoji ? text : text.split("").map((ch, ci) => (
                      <span
                        key={ci}
                        style={{
                          color: ch === def.text[ci] ? undefined : "rgba(168,85,247,0.65)",
                          fontFamily: ch !== def.text[ci] ? "monospace" : undefined,
                          opacity: ch !== def.text[ci] ? 0.55 : 1,
                          transition: "color 0.04s, opacity 0.04s",
                        }}
                      >{ch}</span>
                    ))}

                    {/* Blinking cursor on last active word */}
                    {isLast && !isComplete && (
                      <span style={{ display: "inline-block", width: "2px", height: sz.fs, background: "#a855f7", opacity: showCursor ? 1 : 0, marginLeft: "3px", verticalAlign: "middle", boxShadow: "0 0 10px #a855f7, 0 0 20px #a855f7aa", transition: "opacity 0.08s" }} />
                    )}
                  </span>
                );
              })}
            </div>
          );
        })}

        {/* Initial cursor before first word */}
        {Object.keys(display).length === 0 && (
          <span style={{ display: "inline-block", width: "2px", height: "48px", background: "#a855f7", opacity: showCursor ? 1 : 0, boxShadow: "0 0 12px #a855f7, 0 0 24px #a855f7aa", transition: "opacity 0.1s" }} />
        )}
      </div>

      {/* Noise grain */}
      <div style={{ position: "absolute", inset: 0, zIndex: 7, pointerEvents: "none", opacity: 0.022, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "128px" }} />

      <style>{`
        @keyframes chromatic {
          0%   { text-shadow: -3px 0 rgba(255,0,100,0.65), 3px 0 rgba(0,200,255,0.65); }
          25%  { text-shadow: -5px 0 rgba(255,0,100,0.4), 5px 0 rgba(0,200,255,0.4), 0 0 32px currentColor; }
          50%  { text-shadow: -2px 0 rgba(255,0,100,0.72), 2px 0 rgba(0,200,255,0.72); }
          75%  { text-shadow: -4px 0 rgba(255,0,100,0.38), 4px 0 rgba(0,200,255,0.38), 0 0 22px currentColor; }
          100% { text-shadow: -3px 0 rgba(255,0,100,0.65), 3px 0 rgba(0,200,255,0.65); }
        }
        @keyframes resolveFlash {
          0%   { filter: brightness(1); }
          15%  { filter: brightness(3) saturate(2); }
          50%  { filter: brightness(1.5) saturate(1.3); }
          100% { filter: brightness(1); }
        }
        @keyframes shimmerSweep {
          0%   { background-position: 250% center; }
          100% { background-position: -250% center; }
        }
      `}</style>
    </div>
  );
}

// ── PAGE DATA ─────────────────────────────────────────────────────────────────
const JOURNEY = [
  { year: "2017",      label: "Education", accent: "#7c3aed", title: "Software Development Certificate", org: "ICT Authority Kenya",                  desc: "First formal grounding in software engineering. The start of everything." },
  { year: "2020",      label: "Education", accent: "#0891b2", title: "Cybersecurity & Pen Testing",      org: "Zalego Institute of Technology",        desc: "Ethical hacking, penetration testing, security fundamentals. Built first security tools." },
  { year: "2020–2024", label: "Education", accent: "#0891b2", title: "BSc Information Technology",       org: "Kenyatta University · 2nd Upper Class", desc: "Full degree: software engineering, networks, databases, systems architecture." },
  { year: "Apr 2022",  label: "Work",      accent: "#059669", title: "IT Intern",                        org: "Ministry of Foreign & Diaspora Affairs", desc: "Government infrastructure, network management, and systems support." },
  { year: "May 2024",  label: "Founded",   accent: "#e11d48", title: "Founder — ShanTech Agency",        org: "Digital Agency · Kenya",                desc: "12+ SME clients, 250K+ engagement views. GoHighLevel, Meta Ads, full-stack delivery." },
  { year: "2024",      label: "Founded",   accent: "#7c3aed", title: "Founder — Makeja Homes",           org: "Production SaaS",                       desc: "Built a full multi-tenant property management SaaS. 247+ tenants, KSH 1.5M/month." },
  { year: "2025",      label: "Cert",      accent: "#d97706", title: "Oracle Cloud AI Foundations",      org: "Oracle",                                desc: "Validated cloud and AI fundamentals with an internationally recognised Oracle certification." },
  { year: "2025",      label: "Built",     accent: "#10b981", title: "Launched GhostNet",                org: "Live Cybersec Platform",                desc: "13 modules, 243 lab steps, 5450 XP, 9 live tools, GHOST AI. Built solo from scratch." },
  { year: "2026",      label: "Building",  accent: "#a855f7", title: "NSE Research Agent",               org: "In Development",                        desc: "AI-powered market intelligence for the Nairobi Securities Exchange." },
];

const STACK = [
  { cat: "Frontend",       accent: "#7c3aed", items: ["TypeScript", "Next.js 14", "React", "Tailwind CSS", "GSAP"] },
  { cat: "Backend",        accent: "#0891b2", items: ["Node.js", "Prisma ORM", "PostgreSQL", "REST APIs", "Supabase"] },
  { cat: "AI & Data",      accent: "#a855f7", items: ["Groq llama-3.3-70b", "Python", "LLM APIs", "LangChain"] },
  { cat: "Payments",       accent: "#e11d48", items: ["Paystack", "M-Pesa Daraja", "Webhooks", "Resend"] },
  { cat: "Infrastructure", accent: "#d97706", items: ["VPS / Nginx", "Vercel", "Docker", "GitHub Actions"] },
  { cat: "Security",       accent: "#10b981", items: ["OWASP", "Pen Testing", "Auth Hardening", "Webhook Security"] },
  { cat: "Design",         accent: "#059669", items: ["Figma", "InDesign", "Typography Systems", "Brand Identity"] },
];

const BEYOND = [
  { icon: "🎌", title: "Anime",           body: "FMA, Attack on Titan, Vinland Saga. The philosophy in these is real — don't argue." },
  { icon: "📈", title: "Markets",         body: "NSE investor building the tool I always wished existed." },
  { icon: "📖", title: "Editorial",       body: "Designed Chill Minds Magazine — 72 pages, solo. Printed, distributed, real." },
  { icon: "🌍", title: "Nairobi → World", body: "Proving that world-class products ship from anywhere." },
];

const STATS = [
  { val: "247+",    label: "Active Tenants",   accent: "#7c3aed" },
  { val: "KSH 1.5M", label: "Monthly Volume", accent: "#4ead6a" },
  { val: "13",      label: "GhostNet Modules", accent: "#10b981" },
  { val: "8+",      label: "Years in Tech",    accent: "#d97706" },
  { val: "2",       label: "SaaS Built Solo",  accent: "#a855f7" },
];

const LABEL_COLORS: Record<string, string> = {
  Education: "#0891b2", Work: "#059669", Founded: "#7c3aed",
  Cert: "#d97706", Built: "#10b981", Building: "#a855f7",
};

// ── ABOUT PAGE ────────────────────────────────────────────────────────────────
export default function About() {
  const [filter, setFilter] = useState<string | null>(null);
  const filtered = filter ? JOURNEY.filter(j => j.label === filter) : JOURNEY;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <div style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="about-hero-grid" style={{ display: "grid" }}>

          {/* Left: info */}
          <div style={{ padding: "clamp(96px,12vw,140px) clamp(20px,4vw,48px) clamp(40px,5vw,72px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--purple)", textTransform: "uppercase", marginBottom: "20px" }}>// Who I Am</div>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(52px,6vw,84px)", lineHeight: 0.9, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: "28px" }}>
                Levis.<br /><span style={{ color: "var(--purple)" }}>Kibirie.</span>
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--text-3)", lineHeight: 1.9, maxWidth: "400px", marginBottom: "14px" }}>
                Founding Fullstack Engineer from Nairobi, Kenya. I build production systems that handle real money and real users — then I make them look good.
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--text-3)", lineHeight: 1.9, maxWidth: "400px", marginBottom: "36px" }}>
                Built Makeja Homes (247+ tenants, KSH 1.5M/mo) and GhostNet (cybersec platform with AI) — both live, both solo.
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a href="/work" className="btn-primary">See My Work →</a>
                <a href="/#contact" className="btn-secondary">Let&apos;s Talk</a>
              </div>
            </div>
            {/* Quick facts */}
            <div style={{ display: "flex", flexWrap: "wrap", borderTop: "1px solid var(--border)", marginTop: "40px" }}>
              {[{ l: "Based in", v: "Nairobi, KE" }, { l: "Available", v: "Remotely" }, { l: "Response", v: "< 24 hrs" }].map((f, i) => (
                <div key={f.l} style={{ flex: "1 1 120px", padding: "18px 20px", borderRight: i < 2 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--text-4)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>{f.l}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "14px", color: "var(--text)" }}>{f.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: motion graphic */}
          <MotionGraphic />
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ background: "#0a0805", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="about-stats-grid" style={{ display: "grid" }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ padding: "32px 24px", textAlign: "center", position: "relative", borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${s.accent}, transparent)` }} />
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(22px,2.5vw,36px)", color: s.accent, lineHeight: 1, marginBottom: "6px" }}>{s.val}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <div style={{ background: "var(--bg)", padding: "72px clamp(20px,4vw,48px)" }}>
        <div style={{ maxWidth: "840px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--purple)", textTransform: "uppercase", marginBottom: "10px" }}>// Journey</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1 }}>How I Got Here.</h2>
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {[null, "Education", "Work", "Founded", "Built"].map(f => (
                <button key={String(f)} onClick={() => setFilter(f)}
                  style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 12px", background: filter === f ? "var(--text)" : "transparent", border: `1px solid ${filter === f ? "var(--text)" : "var(--border)"}`, color: filter === f ? "white" : "var(--text-3)", cursor: "pointer", transition: "all 0.2s" }}>
                  {f ?? "All"}
                </button>
              ))}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "clamp(64px,10vw,96px)", top: 0, bottom: 0, width: "1px", background: "var(--border)" }} />
            {filtered.map((item, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "clamp(56px,10vw,80px) 1fr", position: "relative" }}>
                <div style={{ paddingTop: "30px", paddingRight: "16px", textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: item.accent, letterSpacing: "0.06em", lineHeight: 1.4 }}>{item.year}</div>
                </div>
                <div style={{ padding: "24px 0 24px 32px", borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none", position: "relative" }}>
                  <div style={{ position: "absolute", left: "-4.5px", top: "32px", width: "9px", height: "9px", borderRadius: "50%", background: item.accent, border: "2px solid var(--bg)", boxShadow: `0 0 0 1px ${item.accent}40` }} />
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: LABEL_COLORS[item.label] ?? item.accent, background: `${LABEL_COLORS[item.label] ?? item.accent}12`, border: `1px solid ${LABEL_COLORS[item.label] ?? item.accent}30`, padding: "2px 8px" }}>{item.label}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-4)" }}>{item.org}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "17px", color: "var(--text)", lineHeight: 1.2, marginBottom: "6px" }}>{item.title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-3)", lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STACK ── */}
      <div style={{ background: "#0a0805", padding: "72px clamp(20px,4vw,48px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(124,58,237,0.6)", textTransform: "uppercase", marginBottom: "10px" }}>// Stack</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", letterSpacing: "-0.02em", color: "white", lineHeight: 1, marginBottom: "40px" }}>The Toolkit.</h2>
          <div className="about-stack-grid" style={{ display: "grid", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
            {STACK.map(cat => (
              <div key={cat.cat} style={{ background: "#0a0805", padding: "28px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,${cat.accent},transparent)` }} />
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: cat.accent, marginBottom: "14px", opacity: 0.8 }}>{cat.cat}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  {cat.items.map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: cat.accent, flexShrink: 0, opacity: 0.7 }} />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BEYOND THE CODE ── */}
      <div style={{ background: "var(--bg-2)", padding: "72px clamp(20px,4vw,48px)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--forest)", textTransform: "uppercase", marginBottom: "10px" }}>// Beyond the Code</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1, marginBottom: "40px" }}>Who I Actually Am.</h2>
          <div className="about-beyond-grid" style={{ display: "grid", gap: "12px" }}>
            {BEYOND.map(b => (
              <div key={b.title} style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "28px 24px" }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{b.icon}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "16px", color: "var(--text)", marginBottom: "8px" }}>{b.title}</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-3)", lineHeight: 1.75 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ background: "#05020f", padding: "72px clamp(20px,4vw,48px)", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(168,85,247,0.6)", textTransform: "uppercase", marginBottom: "16px" }}>// Open to Work</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,5vw,64px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: "white", marginBottom: "20px" }}>
          Let&apos;s build<br /><span style={{ color: "#a855f7" }}>something real.</span>
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: "460px", margin: "0 auto 36px" }}>
          Open to senior remote engineering roles, SaaS collaborations, and problems worth solving.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/#contact"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", background: "#7c3aed", color: "white", padding: "14px 32px", textDecoration: "none", transition: "all 0.2s", boxShadow: "0 0 24px rgba(124,58,237,0.3)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "white"; (e.currentTarget as HTMLElement).style.color = "#7c3aed"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#7c3aed"; (e.currentTarget as HTMLElement).style.color = "white"; }}>
            Get In Touch →
          </a>
          <a href="/work"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", background: "transparent", color: "rgba(255,255,255,0.5)", padding: "14px 32px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; }}>
            See My Work
          </a>
        </div>
      </div>

      <style>{`
        .about-hero-grid   { grid-template-columns: 1fr; }
        .about-stats-grid  { grid-template-columns: repeat(2, 1fr); }
        .about-stack-grid  { grid-template-columns: repeat(2, 1fr); }
        .about-beyond-grid { grid-template-columns: repeat(2, 1fr); }
        @media (min-width: 640px) {
          .about-stats-grid  { grid-template-columns: repeat(3, 1fr); }
          .about-stack-grid  { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 900px) {
          .about-hero-grid   { grid-template-columns: 1fr 1fr; }
          .about-stats-grid  { grid-template-columns: repeat(5, 1fr); }
          .about-stack-grid  { grid-template-columns: repeat(4, 1fr); }
          .about-beyond-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </div>
  );
}
