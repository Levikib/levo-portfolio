"use client";
import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// SCRAMBLE GLYPHS
// ─────────────────────────────────────────────────────────────────────────────
const GLYPHS = "ΛΨΩΦΞΣΔΘΠアイウエオカキクケコサシスセタチツテト日月火水木金土0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%<>[]{}";
const rg = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
interface WordDef {
  text: string;
  color?: string;
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  glow?: boolean;
  chromatic?: boolean;
  shimmer?: boolean;
  emoji?: boolean;
}
interface LineDef { lineIdx: number; words: WordDef[]; pauseAfter: number; }
interface TimelineItem {
  key: string; lineIdx: number; word: WordDef;
  startTime: number; charMs: number; duration: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// SCRIPT — all words fully bright, no dim colours, clean topics
// ─────────────────────────────────────────────────────────────────────────────
const SCRIPT: LineDef[] = [
  { lineIdx: 0, words: [
    { text: "Hi,",   color: "rgba(255,255,255,0.95)", size: "xxl" },
    { text: "I'm",   color: "rgba(255,255,255,0.95)", size: "xxl" },
    { text: "Levis", color: "#a855f7", size: "xxl", glow: true, chromatic: true, shimmer: true },
    { text: "👋",    size: "xl", emoji: true },
  ], pauseAfter: 820 },

  { lineIdx: 1, words: [
    { text: "Welcome to my little corner of the internet.", color: "rgba(255,255,255,0.82)", size: "sm" },
  ], pauseAfter: 680 },

  { lineIdx: 2, words: [
    { text: "Let's talk", color: "rgba(255,255,255,0.88)", size: "lg" },
  ], pauseAfter: 180 },

  { lineIdx: 3, words: [
    { text: "tech.",       color: "#7c3aed",  size: "xl", glow: true, chromatic: true },
    { text: "Anime.",      color: "#e11d48",  size: "xl", glow: true },
    { text: "Shows.",      color: "#d97706",  size: "xl", glow: true },
    { text: "Life.",       color: "#4ead6a",  size: "xl", glow: true },
    { text: "Philosophy.", color: "#0891b2",  size: "xl", glow: true },
    { text: "Travelling.", color: "#f59e0b",  size: "xl", glow: true },
    { text: "Meditation.", color: "#a855f7",  size: "xl", glow: true, chromatic: true },
  ], pauseAfter: 380 },

  { lineIdx: 4, words: [
    { text: "You name it.", color: "rgba(255,255,255,0.85)", size: "sm" },
  ], pauseAfter: 1100 },

  { lineIdx: 5, words: [
    { text: "But also —", color: "rgba(255,255,255,0.75)", size: "xs" },
  ], pauseAfter: 500 },

  { lineIdx: 6, words: [
    { text: "I",       color: "white",   size: "xxl" },
    { text: "build",   color: "white",   size: "xxl" },
    { text: "things.", color: "#a855f7", size: "xxl", glow: true, shimmer: true, chromatic: true },
  ], pauseAfter: 580 },

  { lineIdx: 7, words: [
    { text: "Real things.",          color: "rgba(255,255,255,0.92)", size: "lg" },
    { text: "That move real money.", color: "#4ead6a", size: "lg", glow: true },
  ], pauseAfter: 680 },

  { lineIdx: 8, words: [
    { text: "From Nairobi, Kenya.", color: "rgba(255,255,255,0.88)", size: "sm" },
    { text: "To the world.",        color: "#a855f7", size: "xxl", glow: true, shimmer: true, chromatic: true },
    { text: "🌍",                   size: "xl", emoji: true },
  ], pauseAfter: 4800 },
];

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE BUILDER
// ─────────────────────────────────────────────────────────────────────────────
function buildTimeline(): { items: TimelineItem[]; totalTime: number } {
  const items: TimelineItem[] = [];
  let cursor = 500;
  for (const line of SCRIPT) {
    for (let wi = 0; wi < line.words.length; wi++) {
      const word = line.words[wi];
      const duration = word.emoji ? 60 : word.text.length * 38 + 80;
      items.push({ key: `${line.lineIdx}-${wi}`, lineIdx: line.lineIdx, word, startTime: cursor, charMs: 38, duration });
      cursor += duration + (word.emoji ? 20 : 55);
    }
    cursor += line.pauseAfter;
  }
  return { items, totalTime: cursor + 300 };
}

// ─────────────────────────────────────────────────────────────────────────────
// GALAXY CANVAS
// Each nebula cloud: drifting radial gradient blob that pulses opacity
// Stars: tiny dots with individual twinkle timers
// ─────────────────────────────────────────────────────────────────────────────
interface Star   { x:number; y:number; r:number; alpha:number; phase:number; speed:number; color:string; }
interface Nebula { x:number; y:number; rx:number; ry:number; color:string; alpha:number; phase:number; driftX:number; driftY:number; speed:number; }

const STAR_COLORS  = ["#ffffff","#e8d5ff","#d0e8ff","#ffecd0","#d0ffe8"];
const NEBULA_DEFS: { color: string; alpha: number }[] = [
  { color: "124,58,237",  alpha: 0.065 },  // purple
  { color: "168,85,247",  alpha: 0.050 },  // light purple
  { color: "78,173,106",  alpha: 0.040 },  // green
  { color: "8,145,178",   alpha: 0.038 },  // cyan
  { color: "232,29,72",   alpha: 0.030 },  // rose
  { color: "213,119,6",   alpha: 0.028 },  // amber
];

function mkStars(W: number, H: number): Star[] {
  return Array.from({ length: 180 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.2 + 0.2,
    alpha: Math.random() * 0.7 + 0.2,
    phase: Math.random() * Math.PI * 2,
    speed: 0.003 + Math.random() * 0.008,
    color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
  }));
}

function mkNebulas(W: number, H: number): Nebula[] {
  return NEBULA_DEFS.map((def, i) => ({
    x: W * (0.15 + (i / NEBULA_DEFS.length) * 0.75 + (Math.random() - 0.5) * 0.2),
    y: H * (0.2 + Math.random() * 0.6),
    rx: W * (0.22 + Math.random() * 0.18),
    ry: H * (0.22 + Math.random() * 0.18),
    color: def.color,
    alpha: def.alpha,
    phase: Math.random() * Math.PI * 2,
    driftX: (Math.random() - 0.5) * 0.12,
    driftY: (Math.random() - 0.5) * 0.06,
    speed: 0.002 + Math.random() * 0.004,
  }));
}

interface GalaxyState {
  stars: Star[];
  nebulas: Nebula[];
  t: number;
}

function drawGalaxy(canvas: HTMLCanvasElement, gs: GalaxyState) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = canvas.width, H = canvas.height;
  gs.t += 0.012;

  ctx.clearRect(0, 0, W, H);

  // Deep space base — very subtle blue-black gradient
  const bg = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, H * 0.9);
  bg.addColorStop(0, "rgba(12,8,28,0.6)");
  bg.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Nebula clouds — drifting radial gradients
  for (const neb of gs.nebulas) {
    neb.x += neb.driftX;
    neb.y += neb.driftY;
    // Wrap
    if (neb.x < -neb.rx) neb.x = W + neb.rx;
    if (neb.x > W + neb.rx) neb.x = -neb.rx;
    if (neb.y < -neb.ry) neb.y = H + neb.ry;
    if (neb.y > H + neb.ry) neb.y = -neb.ry;

    const pulse = neb.alpha * (0.7 + 0.3 * Math.sin(gs.t * neb.speed * 200 + neb.phase));
    const grad = ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, Math.max(neb.rx, neb.ry));
    grad.addColorStop(0,   `rgba(${neb.color},${pulse})`);
    grad.addColorStop(0.4, `rgba(${neb.color},${pulse * 0.55})`);
    grad.addColorStop(1,   `rgba(${neb.color},0)`);

    ctx.save();
    ctx.scale(neb.rx / Math.max(neb.rx, neb.ry), neb.ry / Math.max(neb.rx, neb.ry));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(
      neb.x * Math.max(neb.rx, neb.ry) / neb.rx,
      neb.y * Math.max(neb.rx, neb.ry) / neb.ry,
      Math.max(neb.rx, neb.ry), 0, Math.PI * 2
    );
    ctx.fill();
    ctx.restore();
  }

  // Stars — twinkling
  for (const star of gs.stars) {
    const twinkle = star.alpha * (0.4 + 0.6 * Math.abs(Math.sin(gs.t * star.speed * 100 + star.phase)));
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = star.color.replace(")", `,${twinkle})`).replace("rgb(", "rgba(") ?? `rgba(255,255,255,${twinkle})`;
    // For hex colors, just use globalAlpha
    ctx.globalAlpha = twinkle;
    ctx.fillStyle = star.color;
    ctx.fill();
    ctx.globalAlpha = 1;

    // Glow on brighter stars
    if (star.r > 0.9 && twinkle > 0.6) {
      const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r * 4);
      glow.addColorStop(0, `rgba(255,255,255,${twinkle * 0.3})`);
      glow.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r * 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Subtle scanlines for the futuristic feel — very faint
  for (let y = 0; y < H; y += 3) {
    ctx.fillStyle = "rgba(0,0,0,0.07)";
    ctx.fillRect(0, y, W, 1);
  }

  // Vignette
  const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.28, W / 2, H / 2, H * 0.88);
  vig.addColorStop(0, "rgba(0,0,0,0)");
  vig.addColorStop(1, "rgba(0,0,0,0.62)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, W, H);
}

// ─────────────────────────────────────────────────────────────────────────────
// FONT SIZE MAP
// ─────────────────────────────────────────────────────────────────────────────
const SZ: Record<string, { fs: string; fw: number }> = {
  xxs: { fs: "9px",  fw: 400 },
  xs:  { fs: "11px", fw: 400 },
  sm:  { fs: "13px", fw: 400 },
  md:  { fs: "15px", fw: 500 },
  lg:  { fs: "21px", fw: 700 },
  xl:  { fs: "28px", fw: 800 },
  xxl: { fs: "38px", fw: 800 },
};

// ─────────────────────────────────────────────────────────────────────────────
// MOTION GRAPHIC COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function MotionGraphic() {
  const [display,    setDisplay]    = useState<Record<string, string>>({});
  const [resolved,   setResolved]   = useState<Set<string>>(new Set());
  const [flashing,   setFlashing]   = useState<Set<string>>(new Set());
  const [showCursor, setShowCursor] = useState(true);
  const [cursorKey,  setCursorKey]  = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef  = useRef<HTMLDivElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);

  const iv = useRef({
    seqStart:   0 as number,
    rafId:      0 as number,
    items:      [] as TimelineItem[],
    totalTime:  0,
    gs:         { stars: [] as Star[], nebulas: [] as Nebula[], t: 0 } as GalaxyState,
    mouseX:     0.5, mouseY: 0.5,
    tiltX:      0,   tiltY:  0,
    lastUpdate: 0,
    prevRes:    new Set<string>(),
  });

  useEffect(() => {
    const v = iv.current;
    const { items, totalTime } = buildTimeline();
    v.items = items; v.totalTime = totalTime;
    v.seqStart = performance.now();

    // Init canvas
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width; canvas.height = rect.height;
    v.gs.stars   = mkStars(canvas.width, canvas.height);
    v.gs.nebulas = mkNebulas(canvas.width, canvas.height);

    const blinkId = setInterval(() => setShowCursor(c => !c), 530);

    const loop = (now: number) => {
      const elapsed = now - v.seqStart;

      // Galaxy canvas — every frame
      drawGalaxy(canvas, v.gs);

      // 3D tilt — direct DOM, every frame
      if (textRef.current) {
        const tx = (v.mouseY - 0.5) * -7;
        const ty = (v.mouseX - 0.5) * 7;
        v.tiltX += (tx - v.tiltX) * 0.055;
        v.tiltY += (ty - v.tiltY) * 0.055;
        textRef.current.style.transform =
          `perspective(820px) rotateX(${v.tiltX}deg) rotateY(${v.tiltY}deg)`;
      }

      // Text state — throttled ~30fps
      if (now - v.lastUpdate >= 33) {
        v.lastUpdate = now;
        if (elapsed <= v.totalTime) {
          const nd: Record<string, string> = {};
          const nr = new Set<string>();
          const nf = new Set<string>();
          let lk = "";

          for (const it of v.items) {
            const t = elapsed - it.startTime;
            if (t < 0) continue;
            lk = it.key;
            if (it.word.emoji) {
              nd[it.key] = it.word.text; nr.add(it.key); continue;
            }
            const cr = Math.min(it.word.text.length, Math.floor(t / it.charMs));
            if (cr >= it.word.text.length) {
              nd[it.key] = it.word.text; nr.add(it.key);
              if (!v.prevRes.has(it.key)) nf.add(it.key);
            } else {
              nd[it.key] = it.word.text.slice(0, cr)
                + Array.from({ length: it.word.text.length - cr }, rg).join("");
            }
          }

          v.prevRes = nr;
          setDisplay(nd); setResolved(nr); setCursorKey(lk);
          if (nf.size > 0) {
            setFlashing(nf);
            setTimeout(() => setFlashing(new Set()), 520);
          }
        } else {
          // Restart
          setTimeout(() => {
            setDisplay({}); setResolved(new Set()); setFlashing(new Set());
            setCursorKey(""); v.prevRes = new Set();
            v.seqStart = performance.now();
          }, 700);
        }
      }

      v.rafId = requestAnimationFrame(loop);
    };
    v.rafId = requestAnimationFrame(loop);

    return () => { clearInterval(blinkId); cancelAnimationFrame(v.rafId); };
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = panelRef.current?.getBoundingClientRect();
    if (!r) return;
    iv.current.mouseX = (e.clientX - r.left) / r.width;
    iv.current.mouseY = (e.clientY - r.top)  / r.height;
  };
  const onMouseLeave = () => { iv.current.mouseX = 0.5; iv.current.mouseY = 0.5; };

  // Build line map
  const lineMap: Record<number, TimelineItem[]> = {};
  for (const item of iv.current.items) {
    if (!lineMap[item.lineIdx]) lineMap[item.lineIdx] = [];
    lineMap[item.lineIdx].push(item);
  }

  return (
    <div
      ref={panelRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        background: "#05020f",
        position: "relative",
        overflow: "hidden",
        minHeight: "540px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderLeft: "1px solid rgba(168,85,247,0.12)",
      }}
    >
      {/* Galaxy canvas — fills entire panel */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
      />

      {/* Terminal chrome bar */}
      <div style={{
        position: "absolute", top: 18, left: 24, right: 20,
        display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 9,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <div style={{ display: "flex", gap: "5px" }}>
            {["#e11d48", "#d97706", "#4ead6a"].map(c => (
              <div key={c} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c, opacity: 0.65 }} />
            ))}
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em" }}>
            levo.sh — about.tsx
          </span>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(168,85,247,0.55)", letterSpacing: "0.1em", animation: "livePulse 2s ease-in-out infinite" }}>
          ● LIVE
        </span>
      </div>

      {/* 3D tilt text */}
      <div
        ref={textRef}
        style={{
          position: "relative", zIndex: 9,
          padding: "60px 48px 48px 48px",
          transformOrigin: "center center",
          willChange: "transform",
          minHeight: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        {Object.keys(lineMap).map(liStr => {
          const li = parseInt(liStr);
          const lineItems = lineMap[li];
          const hasVisible = lineItems.some(i => display[i.key] !== undefined);
          if (!hasVisible) return null;

          return (
            <div key={li} style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "7px 10px", marginBottom: "2px" }}>
              {lineItems.map(({ key, word }) => {
                const text = display[key];
                if (text === undefined) return null;
                const sz = SZ[word.size ?? "md"];
                const isResolved  = resolved.has(key);
                const isFlashing  = flashing.has(key);
                const isLast      = key === cursorKey;
                const isDisplay   = sz.fw >= 700;

                const glowShadow = isResolved && word.glow && word.color && !word.color.startsWith("rgba")
                  ? `0 0 18px ${word.color}80, 0 0 36px ${word.color}35, 0 0 2px ${word.color}`
                  : undefined;

                let anim: string | undefined;
                if (isFlashing)                  anim = "resolveFlash 0.52s ease-out both";
                else if (isResolved && word.chromatic) anim = "chromatic 3.2s ease-in-out infinite";

                return (
                  <span
                    key={key}
                    style={{
                      fontFamily: isDisplay ? "var(--font-display)" : "var(--font-body)",
                      fontWeight: sz.fw,
                      fontSize: sz.fs,
                      lineHeight: 1.15,
                      letterSpacing: sz.fw >= 700 ? "-0.02em" : "0",
                      color: word.color ?? "rgba(255,255,255,0.9)",
                      textShadow: glowShadow,
                      animation: anim,
                      position: "relative",
                      display: "inline-block",
                      transition: "text-shadow 0.3s ease",
                    }}
                  >
                    {/* Shimmer */}
                    {isResolved && word.shimmer && (
                      <span aria-hidden style={{
                        position: "absolute", inset: "0 -3px",
                        background: "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.32) 50%, transparent 75%)",
                        backgroundSize: "220% 100%",
                        animation: "shimmer 3s ease-in-out infinite",
                        mixBlendMode: "overlay", pointerEvents: "none", borderRadius: "2px",
                      }} />
                    )}

                    {/* Per-char render */}
                    {word.emoji ? text : text.split("").map((ch, ci) => {
                      const isReal = ch === word.text[ci];
                      return (
                        <span key={ci} style={{
                          color: isReal ? undefined : "rgba(168,85,247,0.65)",
                          fontFamily: isReal ? undefined : "monospace",
                          opacity: isReal ? undefined : 0.72,
                          transition: "color 0.04s",
                        }}>{ch}</span>
                      );
                    })}

                    {/* Cursor */}
                    {isLast && (
                      <span style={{
                        display: "inline-block", width: "2px", height: sz.fs,
                        background: "#a855f7",
                        opacity: showCursor ? 1 : 0, marginLeft: "3px", verticalAlign: "middle",
                        boxShadow: "0 0 8px #a855f7, 0 0 18px #a855f7",
                        transition: "opacity 0.08s", flexShrink: 0,
                      }} />
                    )}
                  </span>
                );
              })}
            </div>
          );
        })}

        {/* Idle cursor */}
        {Object.keys(display).length === 0 && (
          <span style={{
            display: "inline-block", width: "2px", height: "40px", background: "#a855f7",
            opacity: showCursor ? 1 : 0, boxShadow: "0 0 10px #a855f7, 0 0 20px #a855f7",
            transition: "opacity 0.1s",
          }} />
        )}
      </div>

      {/* Noise grain overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none", opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat", backgroundSize: "160px",
      }} />

      <style>{`
        @keyframes chromatic {
          0%   { text-shadow: -3px 0 rgba(255,0,100,0.7),  3px 0 rgba(0,200,255,0.7); }
          20%  { text-shadow: -6px 0 rgba(255,0,100,0.4),  6px 0 rgba(0,200,255,0.4), 0 0 28px currentColor; }
          50%  { text-shadow: -2px 0 rgba(255,0,100,0.75), 2px 0 rgba(0,200,255,0.75); }
          70%  { text-shadow: -5px 0 rgba(255,0,100,0.3),  5px 0 rgba(0,200,255,0.3), 0 0 20px currentColor; }
          100% { text-shadow: -3px 0 rgba(255,0,100,0.7),  3px 0 rgba(0,200,255,0.7); }
        }
        @keyframes resolveFlash {
          0%   { filter: brightness(1)   scale(1); }
          15%  { filter: brightness(3.2) scale(1.04); }
          40%  { filter: brightness(1.6) scale(1.01); }
          100% { filter: brightness(1)   scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: 220% center; }
          100% { background-position: -220% center; }
        }
        @keyframes livePulse {
          0%,100% { opacity: 0.4; }
          50%     { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REST OF PAGE
// ─────────────────────────────────────────────────────────────────────────────
const TIMELINE = [
  { year:"2017",        title:"Software Development Certificate",      org:"ICT Authority Kenya",                    type:"education", accent:"#7c3aed", desc:"First formal grounding in software engineering fundamentals. The start of everything." },
  { year:"2020",        title:"Cybersecurity & Ethical Hacking",       org:"Zalego Institute of Technology",         type:"education", accent:"#dc2626", desc:"Hands-on ethical hacking, penetration testing, and security fundamentals. CEH foundation begins." },
  { year:"2020–2023",   title:"BSc Information Technology",            org:"Kenyatta University",                    type:"education", accent:"#0891b2", desc:"Full degree covering software engineering, networks, databases, and systems. Built the theoretical backbone." },
  { year:"Apr–Sep 2022",title:"IT Intern",                             org:"Ministry of Foreign & Diaspora Affairs", type:"work",      accent:"#059669", desc:"Government infrastructure, network management, and systems support. First real-world deployment experience." },
  { year:"2024",        title:"Founded Makeja Homes",                  org:"Founding Fullstack Engineer",            type:"founding",  accent:"#7c3aed", desc:"Quit waiting for permission. Built a full production SaaS from zero — alone. 170+ units, KSH 1.5M/month." },
  { year:"2024–2025",   title:"Founder & Lead Engineer",               org:"ShanTech Agency",                        type:"founding",  accent:"#e11d48", desc:"12+ SME clients, 250K+ engagement views, full-stack delivery + CRM automation. Hired, managed, shipped." },
  { year:"2025",        title:"ISC2 CC · Oracle Cloud AI Foundations", org:"International Certifications",           type:"cert",      accent:"#d97706", desc:"Validated cloud and security knowledge with internationally recognised certifications." },
  { year:"2026",        title:"NSE Research Agent",                    org:"In Development",                         type:"building",  accent:"#d97706", desc:"AI-powered market intelligence for the Nairobi Securities Exchange. Decision support, not prediction." },
];
const STACK = [
  { cat:"Frontend",     accent:"#7c3aed", items:["TypeScript","Next.js 14","React","Tailwind CSS","Framer Motion"] },
  { cat:"Backend",      accent:"#0891b2", items:["Node.js","Java","Spring Boot","REST APIs","WebSockets"] },
  { cat:"Database",     accent:"#4ead6a", items:["PostgreSQL","Prisma ORM","MySQL","MongoDB","Neon"] },
  { cat:"Infrastructure",accent:"#d97706",items:["Vercel","VPS/Nginx","Docker","GitHub Actions","PM2"] },
  { cat:"Payments",     accent:"#e11d48", items:["Paystack","Stripe","M-Pesa Daraja","Resend","Twilio"] },
  { cat:"AI & Data",    accent:"#a855f7", items:["Python","Pandas","LLM APIs","LangChain","Financial APIs"] },
  { cat:"Security",     accent:"#dc2626", items:["OWASP","Pen Testing","fail2ban","JWT/OAuth2","SSL/TLS"] },
  { cat:"Design",       accent:"#059669", items:["Figma","InDesign","Sanity CMS","GoHighLevel","Canva"] },
];
const BEYOND = [
  { icon:"🎌", title:"Anime Head",        body:"Fullmetal Alchemist, Attack on Titan, Vinland Saga. The philosophy in these is real — don't argue." },
  { icon:"📖", title:"Editorial Designer", body:"Two volumes of Chill Minds Magazine — 72 pages of children's mental wellness. Designed solo, printed, distributed." },
  { icon:"📈", title:"Markets Watcher",   body:"NSE investor building the tool I always wished existed. Understanding money is understanding systems." },
  { icon:"🌍", title:"Nairobi → World",   body:"Building from Kenya, for Kenya and beyond. Proving world-class products ship from anywhere." },
];

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let c = 0;
        const t = setInterval(() => { c = Math.min(c + target / 40, target); setCount(Math.floor(c)); if (c >= target) clearInterval(t); }, 40);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <div ref={ref}>{count}{suffix}</div>;
}

export default function About() {
  const [activeType, setActiveType] = useState<string | null>(null);
  const filtered = activeType ? TIMELINE.filter(t => t.type === activeType) : TIMELINE;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <div style={{ borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

          {/* Left: copy */}
          <div style={{ paddingTop: "140px", padding: "140px 0 0 48px", display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--purple)", textTransform: "uppercase", marginBottom: "20px" }}>// Who I Am</div>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(48px,6vw,84px)", lineHeight: 0.9, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: "28px" }}>
                Levis.<br /><span style={{ color: "var(--purple)" }}>Kibirie.</span>
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--text-3)", lineHeight: 1.9, maxWidth: "420px", marginBottom: "20px" }}>
                Founding Fullstack Engineer based in Nairobi, Kenya. I build production systems that handle real money, real users, and real consequences — then I make them beautiful.
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--text-3)", lineHeight: 1.9, maxWidth: "420px", marginBottom: "36px" }}>
                I founded Makeja Homes — a property management SaaS processing KSH 1.5M/month across 170+ units. Built every line alone. That&apos;s the bar.
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a href="/work" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", background: "var(--text)", color: "white", padding: "12px 24px", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--purple)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--text)"; }}>
                  See My Work →
                </a>
                <a href="/#contact" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", background: "transparent", color: "var(--text-3)", padding: "12px 24px", textDecoration: "none", border: "1px solid var(--border)", transition: "all 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--text)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
                  Let&apos;s Talk
                </a>
              </div>
            </div>
            {/* Quick facts */}
            <div style={{ display: "flex", borderTop: "1px solid var(--border)", marginTop: "48px" }}>
              {[{ l: "Based in", v: "Nairobi, KE" }, { l: "Available", v: "Remotely" }, { l: "Response", v: "< 24 hrs" }].map((f, i) => (
                <div key={f.l} style={{ flex: 1, padding: "20px 24px", borderRight: i < 2 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--text-4)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>{f.l}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", color: "var(--text)" }}>{f.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: motion graphic */}
          <MotionGraphic />
        </div>
      </div>

      {/* ── NUMBERS ── */}
      <div style={{ background: "#0a0805", padding: "72px 48px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(124,58,237,0.6)", textTransform: "uppercase", marginBottom: "48px" }}>// By The Numbers</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {[
            { val: 170, suffix: "+",     label: "Units Managed",  accent: "#7c3aed" },
            { val: 1.5, suffix: "M KSH", label: "Monthly Volume", accent: "#4ead6a" },
            { val: 12,  suffix: "+",     label: "Agency Clients", accent: "#e11d48" },
            { val: 250, suffix: "K+",    label: "Engagements",    accent: "#d97706" },
            { val: 6,   suffix: "+",     label: "Years Building", accent: "#0891b2" },
          ].map(s => (
            <div key={s.label} style={{ background: "#0a0805", padding: "36px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${s.accent}, transparent)` }} />
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px,2.5vw,40px)", color: s.accent, lineHeight: 1, marginBottom: "8px" }}>
                <CountUp target={s.val} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <div style={{ background: "var(--bg)", padding: "72px 48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--purple)", textTransform: "uppercase", marginBottom: "10px" }}>// Journey</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1 }}>How I Got Here.</h2>
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {[{ k: null, l: "All" }, { k: "education", l: "Education" }, { k: "work", l: "Work" }, { k: "founding", l: "Founded" }, { k: "cert", l: "Certs" }, { k: "building", l: "Building" }].map(f => (
              <button key={String(f.k)} onClick={() => setActiveType(f.k)}
                style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 14px", background: activeType === f.k ? "var(--text)" : "transparent", border: `1px solid ${activeType === f.k ? "var(--text)" : "var(--border)"}`, color: activeType === f.k ? "white" : "var(--text-3)", cursor: "pointer", transition: "all 0.2s" }}>
                {f.l}
              </button>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", paddingLeft: "160px" }}>
          <div style={{ position: "absolute", left: "140px", top: 0, bottom: 0, width: "1px", background: "var(--border)" }} />
          {filtered.map((item, i) => (
            <div key={i} style={{ display: "flex", position: "relative" }}>
              <div style={{ position: "absolute", left: "-20px", top: "36px", width: "9px", height: "9px", borderRadius: "50%", background: item.accent, border: `2px solid var(--bg)`, boxShadow: `0 0 0 1px ${item.accent}` }} />
              <div style={{ position: "absolute", left: "-160px", top: "32px", textAlign: "right", width: "140px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-4)", letterSpacing: "0.08em" }}>{item.year}</div>
              </div>
              <div style={{ flex: 1, padding: "28px 0 28px 40px", borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "7px", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", color: item.accent, background: `${item.accent}12`, border: `1px solid ${item.accent}30`, padding: "3px 9px" }}>
                    {item.type === "education" ? "Education" : item.type === "work" ? "Work" : item.type === "founding" ? "Founded" : item.type === "cert" ? "Certified" : "Building"}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-4)" }}>{item.org}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "19px", color: "var(--text)", lineHeight: 1.2, marginBottom: "9px" }}>{item.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--text-3)", lineHeight: 1.85, maxWidth: "580px" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── STACK ── */}
      <div style={{ background: "#0a0805", padding: "72px 48px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(124,58,237,0.6)", textTransform: "uppercase", marginBottom: "12px" }}>// Full Stack</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-0.02em", color: "white", lineHeight: 1, marginBottom: "48px" }}>The Toolkit.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {STACK.map(cat => (
            <div key={cat.cat} style={{ background: "#0a0805", padding: "32px 28px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,${cat.accent},transparent)` }} />
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: cat.accent, marginBottom: "18px", opacity: 0.7 }}>{cat.cat}</div>
              {cat.items.map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "7px" }}>
                  <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: cat.accent, flexShrink: 0, opacity: 0.7 }} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── BEYOND ── */}
      <div style={{ background: "var(--bg)", padding: "72px 48px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--purple)", textTransform: "uppercase", marginBottom: "12px" }}>// Beyond the Code</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1, marginBottom: "48px" }}>The Full Picture.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px" }}>
          {BEYOND.map((b, i) => (
            <div key={b.title} style={{ background: i % 2 === 0 ? "#ffffff" : "var(--bg-2)", border: "1px solid var(--border)", padding: "32px 28px" }}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>{b.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "16px", color: "var(--text)", marginBottom: "10px" }}>{b.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--text-3)", lineHeight: 1.85 }}>{b.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ background: "#0a0805", padding: "80px 48px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(168,85,247,0.6)", textTransform: "uppercase", marginBottom: "16px" }}>// Open to Opportunities</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,5vw,60px)", lineHeight: 1, letterSpacing: "-0.02em", color: "white", marginBottom: "12px" }}>
          Available for the<br /><span style={{ color: "#a855f7" }}>right opportunity.</span>
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "rgba(255,255,255,0.4)", marginBottom: "36px" }}>
          Senior remote roles · Founding engineer positions · Long-term contracts
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/#contact" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", background: "#7c3aed", color: "white", padding: "15px 36px", textDecoration: "none", boxShadow: "0 0 32px rgba(124,58,237,0.35)", transition: "all 0.25s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "white"; (e.currentTarget as HTMLElement).style.color = "#7c3aed"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#7c3aed"; (e.currentTarget as HTMLElement).style.color = "white"; }}>
            Let&apos;s Work Together →
          </a>
          <a href="/work" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", background: "transparent", color: "rgba(255,255,255,0.5)", padding: "15px 36px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.25s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; }}>
            View My Work
          </a>
        </div>
      </div>
    </div>
  );
}
