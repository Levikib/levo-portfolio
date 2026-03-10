"use client";
import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// GLYPH SET — cycles through these during scramble
// ─────────────────────────────────────────────────────────────────────────────
const GLYPHS = "ΛΨΩΦΞΣΔΘΠアイウエオカキクケコサシスセタチツテト日月火水木金土0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%<>[]{}|\\";
const rg = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
interface WordDef {
  text: string;
  color?: string;
  size?: "xxs"|"xs"|"sm"|"md"|"lg"|"xl"|"xxl";
  glow?: boolean;
  chromatic?: boolean;
  shimmer?: boolean;
  emoji?: boolean;
}
interface LineDef { lineIdx: number; words: WordDef[]; pauseAfter: number; }
interface TimelineItem {
  key: string;
  lineIdx: number;
  word: WordDef;
  startTime: number;
  charMs: number;
  duration: number;
}
interface Particle {
  x:number; y:number; vx:number; vy:number;
  color:string; r:number; alpha:number; life:number; maxLife:number;
}
interface Stream { x:number; y:number; chars:string[]; speed:number; alpha:number; }
interface CanvasState {
  particles: Particle[];
  streams: Stream[];
  scanY: number;
  scanOffset: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// SCRIPT
// ─────────────────────────────────────────────────────────────────────────────
const SCRIPT: LineDef[] = [
  { lineIdx: 0, words: [
    { text:"Hi,",   color:"rgba(255,255,255,0.92)", size:"xxl" },
    { text:"I'm",   color:"rgba(255,255,255,0.92)", size:"xxl" },
    { text:"Levis", color:"#a855f7", size:"xxl", glow:true, chromatic:true, shimmer:true },
    { text:"👋",    size:"xxl", emoji:true },
  ], pauseAfter: 820 },

  { lineIdx: 1, words: [
    { text:"Welcome to my little corner of the internet.", color:"rgba(255,255,255,0.26)", size:"xs" },
  ], pauseAfter: 680 },

  { lineIdx: 2, words: [
    { text:"Let's talk", color:"rgba(255,255,255,0.65)", size:"lg" },
  ], pauseAfter: 180 },

  { lineIdx: 3, words: [
    { text:"tech.",       color:"#7c3aed", size:"xl", glow:true, chromatic:true },
    { text:"Anime.",      color:"#e11d48", size:"xl", glow:true },
    { text:"Shows.",      color:"#d97706", size:"xl", glow:true },
    { text:"Life.",       color:"#4ead6a", size:"xl", glow:true },
    { text:"Philosophy.", color:"#0891b2", size:"xl", glow:true },
    { text:"Politics.",   color:"#a855f7", size:"xl", glow:true, chromatic:true },
  ], pauseAfter: 380 },

  { lineIdx: 4, words: [
    { text:"You name it.", color:"rgba(255,255,255,0.26)", size:"xs" },
  ], pauseAfter: 1100 },

  { lineIdx: 5, words: [
    { text:"But also —", color:"rgba(255,255,255,0.15)", size:"xxs" },
  ], pauseAfter: 500 },

  { lineIdx: 6, words: [
    { text:"I",       color:"white",   size:"xxl" },
    { text:"build",   color:"white",   size:"xxl" },
    { text:"things.", color:"#a855f7", size:"xxl", glow:true, shimmer:true, chromatic:true },
  ], pauseAfter: 580 },

  { lineIdx: 7, words: [
    { text:"Real things.",          color:"rgba(255,255,255,0.72)", size:"lg" },
    { text:"That move real money.", color:"#4ead6a", size:"lg", glow:true },
  ], pauseAfter: 680 },

  { lineIdx: 8, words: [
    { text:"From Nairobi, Kenya.", color:"rgba(255,255,255,0.36)", size:"sm" },
    { text:"To the world.",       color:"#a855f7", size:"xxl", glow:true, shimmer:true, chromatic:true },
    { text:"🌍",                  size:"xl", emoji:true },
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
      const charMs = 38;
      const duration = word.emoji ? 60 : word.text.length * charMs + 80;
      items.push({ key:`${line.lineIdx}-${wi}`, lineIdx:line.lineIdx, word, startTime:cursor, charMs, duration });
      cursor += duration + (word.emoji ? 20 : 55);
    }
    cursor += line.pauseAfter;
  }
  return { items, totalTime: cursor + 300 };
}

// ─────────────────────────────────────────────────────────────────────────────
// CANVAS HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const PCOLS = ["#a855f7","#7c3aed","#e11d48","#d97706","#4ead6a","#0891b2","rgba(255,255,255,0.5)"];

function hexToRgba(hex: string, a: number): string {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

function mkParticles(w:number, h:number): Particle[] {
  return Array.from({length:32}, () => ({
    x:Math.random()*w, y:Math.random()*h,
    vx:(Math.random()-0.5)*0.5, vy:(Math.random()-0.5)*0.5,
    color:PCOLS[Math.floor(Math.random()*PCOLS.length)],
    r:Math.random()*1.5+0.4, alpha:Math.random()*0.45+0.1,
    life:Math.random()*300, maxLife:300+Math.random()*300,
  }));
}

function mkStreams(w:number, h:number): Stream[] {
  return Array.from({length:7}, () => ({
    x:Math.random()*w, y:Math.random()*-200,
    chars:Array.from({length:22}, rg),
    speed:0.4+Math.random()*0.9, alpha:0.02+Math.random()*0.04,
  }));
}

function drawCanvas(canvas:HTMLCanvasElement, cs:CanvasState) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0,0,W,H);

  // GRID
  ctx.strokeStyle = "rgba(168,85,247,0.045)";
  ctx.lineWidth = 0.5;
  for (let x=0; x<W; x+=40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
  for (let y=0; y<H; y+=40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

  // DATA STREAMS
  ctx.font = "9px 'Courier New', monospace";
  for (const s of cs.streams) {
    s.y += s.speed;
    if (Math.random()<0.025) s.chars[Math.floor(Math.random()*s.chars.length)] = rg();
    if (s.y > H+260) { s.y=-260; s.x=Math.random()*W; }
    for (let i=0; i<s.chars.length; i++) {
      const a = s.alpha * (1-i/s.chars.length) * (i===0?2.8:1);
      ctx.fillStyle = `rgba(168,85,247,${a})`;
      ctx.fillText(s.chars[i], s.x, s.y-i*11);
    }
  }

  // PARTICLES + CONNECTIONS
  const pts = cs.particles;
  for (const p of pts) {
    p.x+=p.vx; p.y+=p.vy; p.life++;
    if (p.life>p.maxLife) {
      p.x=Math.random()*W; p.y=Math.random()*H;
      p.vx=(Math.random()-0.5)*0.5; p.vy=(Math.random()-0.5)*0.5;
      p.color=PCOLS[Math.floor(Math.random()*PCOLS.length)];
      p.alpha=Math.random()*0.45+0.1; p.life=0; p.maxLife=300+Math.random()*300;
    }
    if (p.x<0||p.x>W) p.vx*=-1;
    if (p.y<0||p.y>H) p.vy*=-1;
    const fade = Math.sin((p.life/p.maxLife)*Math.PI);
    const col = p.color.startsWith("rgba") ? p.color : hexToRgba(p.color, p.alpha*fade);
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = col; ctx.fill();
    for (const q of pts) {
      if (q===p) continue;
      const d = Math.hypot(p.x-q.x, p.y-q.y);
      if (d<85) {
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
        ctx.strokeStyle = `rgba(168,85,247,${(1-d/85)*0.07*fade})`;
        ctx.lineWidth=0.5; ctx.stroke();
      }
    }
  }

  // SCAN BEAM
  cs.scanY = (cs.scanY+0.75)%(H+50)-25;
  const sg = ctx.createLinearGradient(0,cs.scanY-28,0,cs.scanY+28);
  sg.addColorStop(0,"rgba(168,85,247,0)"); sg.addColorStop(0.5,"rgba(168,85,247,0.055)"); sg.addColorStop(1,"rgba(168,85,247,0)");
  ctx.fillStyle=sg; ctx.fillRect(0,cs.scanY-28,W,56);

  // SCANLINES
  cs.scanOffset = (cs.scanOffset+0.22)%3;
  for (let y=cs.scanOffset; y<H; y+=3) { ctx.fillStyle="rgba(0,0,0,0.12)"; ctx.fillRect(0,y,W,1); }

  // VIGNETTE
  const vg = ctx.createRadialGradient(W/2,H/2,H*0.25,W/2,H/2,H*0.85);
  vg.addColorStop(0,"rgba(0,0,0,0)"); vg.addColorStop(1,"rgba(0,0,0,0.6)");
  ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);
}

// ─────────────────────────────────────────────────────────────────────────────
// FONT SIZE MAP
// ─────────────────────────────────────────────────────────────────────────────
const SZ: Record<string,{fs:string;fw:number;lh:string}> = {
  xxs: {fs:"9px",  fw:400, lh:"1.2"},
  xs:  {fs:"11px", fw:400, lh:"1.4"},
  sm:  {fs:"13px", fw:400, lh:"1.5"},
  md:  {fs:"15px", fw:500, lh:"1.4"},
  lg:  {fs:"21px", fw:700, lh:"1.2"},
  xl:  {fs:"28px", fw:800, lh:"1.1"},
  xxl: {fs:"38px", fw:800, lh:"1.0"},
};

// ─────────────────────────────────────────────────────────────────────────────
// MOTION GRAPHIC COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function MotionGraphic() {
  const [display,    setDisplay]    = useState<Record<string,string>>({});
  const [resolved,   setResolved]   = useState<Set<string>>(new Set());
  const [flashing,   setFlashing]   = useState<Set<string>>(new Set());
  const [showCursor, setShowCursor] = useState(true);
  const [cursorKey,  setCursorKey]  = useState("");

  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const panelRef     = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);
  const internal     = useRef({
    seqStart: 0 as number,
    rafId: 0 as number,
    items: [] as TimelineItem[],
    totalTime: 0,
    cs: { particles:[] as Particle[], streams:[] as Stream[], scanY:-40, scanOffset:0 } as CanvasState,
    mouseX:0.5, mouseY:0.5,
    tiltX:0, tiltY:0,
    lastUpdate:0,
    prevResolved: new Set<string>(),
  });

  useEffect(() => {
    const iv = internal.current;
    const { items, totalTime } = buildTimeline();
    iv.items = items; iv.totalTime = totalTime;
    iv.seqStart = performance.now();

    // Init canvas
    const canvas = canvasRef.current!;
    const { width:W, height:H } = canvas.getBoundingClientRect();
    canvas.width = W; canvas.height = H;
    iv.cs.particles = mkParticles(W,H);
    iv.cs.streams   = mkStreams(W,H);
    iv.cs.scanY     = -40;

    // Cursor blink
    const blinkId = setInterval(() => setShowCursor(c=>!c), 530);

    // RAF loop
    const loop = (now:number) => {
      const elapsed = now - iv.seqStart;

      // 1. Canvas — every frame
      drawCanvas(canvas, iv.cs);

      // 2. Tilt — every frame, direct DOM
      if (textRef.current) {
        const tx = (iv.mouseY-0.5)*-8, ty = (iv.mouseX-0.5)*8;
        iv.tiltX += (tx-iv.tiltX)*0.055;
        iv.tiltY += (ty-iv.tiltY)*0.055;
        textRef.current.style.transform = `perspective(820px) rotateX(${iv.tiltX}deg) rotateY(${iv.tiltY}deg)`;
      }

      // 3. Text state — throttled ~30fps
      if (now - iv.lastUpdate >= 33) {
        iv.lastUpdate = now;
        if (elapsed <= iv.totalTime) {
          const newDisplay:Record<string,string> = {};
          const newResolved = new Set<string>();
          const newFlash = new Set<string>();
          let lastKey = "";

          for (const item of iv.items) {
            const t = elapsed - item.startTime;
            if (t < 0) continue;
            lastKey = item.key;
            if (item.word.emoji) {
              newDisplay[item.key] = item.word.text;
              newResolved.add(item.key);
              continue;
            }
            const charsResolved = Math.min(item.word.text.length, Math.floor(t/item.charMs));
            if (charsResolved >= item.word.text.length) {
              newDisplay[item.key] = item.word.text;
              newResolved.add(item.key);
              if (!iv.prevResolved.has(item.key)) newFlash.add(item.key);
            } else {
              newDisplay[item.key] = item.word.text.slice(0,charsResolved)
                + Array.from({length:item.word.text.length-charsResolved},rg).join("");
            }
          }

          iv.prevResolved = newResolved;
          setDisplay(newDisplay);
          setResolved(newResolved);
          setCursorKey(lastKey);
          if (newFlash.size>0) {
            setFlashing(newFlash);
            setTimeout(() => setFlashing(new Set()), 520);
          }
        } else {
          // Restart loop
          setTimeout(() => {
            setDisplay({}); setResolved(new Set()); setFlashing(new Set()); setCursorKey("");
            iv.prevResolved = new Set(); iv.seqStart = performance.now();
          }, 600);
        }
      }

      iv.rafId = requestAnimationFrame(loop);
    };
    iv.rafId = requestAnimationFrame(loop);
    return () => { clearInterval(blinkId); cancelAnimationFrame(iv.rafId); };
  }, []);

  const onMouseMove = (e:React.MouseEvent<HTMLDivElement>) => {
    const r = panelRef.current?.getBoundingClientRect();
    if (!r) return;
    internal.current.mouseX = (e.clientX-r.left)/r.width;
    internal.current.mouseY = (e.clientY-r.top)/r.height;
  };
  const onMouseLeave = () => { internal.current.mouseX=0.5; internal.current.mouseY=0.5; };

  // Group items into lines for render
  const allItems = internal.current.items;
  const lineMap: Record<number,TimelineItem[]> = {};
  for (const item of allItems) {
    if (!lineMap[item.lineIdx]) lineMap[item.lineIdx] = [];
    lineMap[item.lineIdx].push(item);
  }

  return (
    <div
      ref={panelRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ background:"#0a0805", position:"relative", overflow:"hidden", minHeight:"540px",
               display:"flex", flexDirection:"column", justifyContent:"center",
               borderLeft:"1px solid rgba(255,255,255,0.04)" }}
    >
      {/* Canvas */}
      <canvas ref={canvasRef}
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:1 }} />

      {/* Ambient glows */}
      <div style={{ position:"absolute", top:"-80px", right:"-60px", width:"450px", height:"450px",
        background:"radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)",
        filter:"blur(90px)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", bottom:"-40px", left:"15%", width:"320px", height:"320px",
        background:"radial-gradient(circle, rgba(78,173,106,0.08), transparent 70%)",
        filter:"blur(80px)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", top:"30%", left:"20%", width:"200px", height:"200px",
        background:"radial-gradient(circle, rgba(232,29,72,0.05), transparent 70%)",
        filter:"blur(60px)", pointerEvents:"none", zIndex:0 }} />

      {/* LEFT EDGE BLEND — dissolves panel into cream */}
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"130px",
        background:"linear-gradient(to right, #faf7f0 0%, rgba(250,247,240,0.85) 20%, rgba(250,247,240,0.3) 60%, transparent 100%)",
        zIndex:8, pointerEvents:"none" }} />

      {/* Terminal chrome */}
      <div style={{ position:"absolute", top:16, left:"136px", right:20, display:"flex",
        alignItems:"center", justifyContent:"space-between", zIndex:9 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"7px" }}>
          <div style={{ display:"flex", gap:"5px" }}>
            {["#e11d48","#d97706","#4ead6a"].map(c=>(
              <div key={c} style={{ width:"8px", height:"8px", borderRadius:"50%", background:c, opacity:0.65 }} />
            ))}
          </div>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"rgba(255,255,255,0.16)", letterSpacing:"0.1em" }}>
            levo.sh — about.tsx
          </span>
        </div>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"rgba(168,85,247,0.4)", letterSpacing:"0.1em",
          animation:"livePulse 2s ease-in-out infinite" }}>
          ● LIVE
        </span>
      </div>

      {/* 3D tilt text container */}
      <div ref={textRef} style={{ position:"relative", zIndex:9, padding:"60px 48px 48px 120px",
        transformOrigin:"center center", willChange:"transform",
        minHeight:"400px", display:"flex", flexDirection:"column", justifyContent:"center", gap:"6px" }}>

        {Object.keys(lineMap).map(liStr => {
          const li = parseInt(liStr);
          const lineItems = lineMap[li];
          const hasVisible = lineItems.some(i=>display[i.key]!==undefined);
          if (!hasVisible) return null;
          return (
            <div key={li} style={{ display:"flex", flexWrap:"wrap", alignItems:"baseline", gap:"7px 10px", marginBottom:"2px" }}>
              {lineItems.map(({ key, word }) => {
                const text = display[key];
                if (text===undefined) return null;
                const sz = SZ[word.size ?? "md"];
                const isResolved = resolved.has(key);
                const isFlashing = flashing.has(key);
                const isLast = key===cursorKey;
                const isDisplay = sz.fw >= 700;

                // Glow shadow
                const glowShadow = isResolved && word.glow && word.color && !word.color.startsWith("rgba")
                  ? `0 0 18px ${word.color}80, 0 0 36px ${word.color}35, 0 0 2px ${word.color}`
                  : undefined;

                // Animation
                let anim: string|undefined;
                if (isFlashing) anim = "resolveFlash 0.52s ease-out both";
                else if (isResolved && word.chromatic) anim = "chromatic 3.2s ease-in-out infinite";

                return (
                  <span key={key} style={{
                    fontFamily: isDisplay ? "var(--font-display)" : "var(--font-body)",
                    fontWeight: sz.fw, fontSize: sz.fs, lineHeight: sz.lh,
                    letterSpacing: sz.fw>=700 ? "-0.02em" : "0",
                    color: word.color ?? "rgba(255,255,255,0.75)",
                    textShadow: glowShadow,
                    animation: anim,
                    position:"relative", display:"inline-block",
                    transition:"text-shadow 0.3s ease",
                  }}>
                    {/* Shimmer */}
                    {isResolved && word.shimmer && (
                      <span aria-hidden style={{ position:"absolute", inset:"0 -3px",
                        background:"linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.32) 50%, transparent 75%)",
                        backgroundSize:"220% 100%", animation:"shimmer 3s ease-in-out infinite",
                        mixBlendMode:"overlay", pointerEvents:"none", borderRadius:"2px" }} />
                    )}
                    {/* Per-char render */}
                    {word.emoji ? text : text.split("").map((ch,ci) => {
                      const isReal = ch === word.text[ci];
                      return (
                        <span key={ci} style={{
                          color: isReal ? undefined : "rgba(168,85,247,0.6)",
                          fontFamily: isReal ? undefined : "monospace",
                          opacity: isReal ? undefined : 0.7,
                          transition:"color 0.04s",
                          display:"inline-block",
                          transform: isReal ? undefined : `translateY(${(Math.random()-0.5)*1.5}px)`,
                        }}>{ch}</span>
                      );
                    })}
                    {/* Cursor */}
                    {isLast && (
                      <span style={{ display:"inline-block", width:"2px",
                        height:sz.fs, background:"#a855f7",
                        opacity:showCursor?1:0, marginLeft:"3px", verticalAlign:"middle",
                        boxShadow:"0 0 8px #a855f7, 0 0 18px #a855f7",
                        transition:"opacity 0.08s", flexShrink:0 }} />
                    )}
                  </span>
                );
              })}
            </div>
          );
        })}

        {/* Idle cursor before start */}
        {Object.keys(display).length===0 && (
          <span style={{ display:"inline-block", width:"2px", height:"40px", background:"#a855f7",
            opacity:showCursor?1:0, boxShadow:"0 0 10px #a855f7, 0 0 20px #a855f7", transition:"opacity 0.1s" }} />
        )}
      </div>

      {/* Noise grain */}
      <div style={{ position:"absolute", inset:0, zIndex:10, pointerEvents:"none", opacity:0.028,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat:"repeat", backgroundSize:"160px" }} />

      <style>{`
        @keyframes chromatic {
          0%   { text-shadow: -3px 0 rgba(255,0,100,0.7),  3px 0 rgba(0,200,255,0.7); }
          20%  { text-shadow: -6px 0 rgba(255,0,100,0.4),  6px 0 rgba(0,200,255,0.4), 0 0 28px currentColor; }
          50%  { text-shadow: -2px 0 rgba(255,0,100,0.75), 2px 0 rgba(0,200,255,0.75); }
          70%  { text-shadow: -5px 0 rgba(255,0,100,0.3),  5px 0 rgba(0,200,255,0.3), 0 0 20px currentColor; }
          100% { text-shadow: -3px 0 rgba(255,0,100,0.7),  3px 0 rgba(0,200,255,0.7); }
        }
        @keyframes resolveFlash {
          0%   { filter:brightness(1)   scale(1); }
          15%  { filter:brightness(3.2) scale(1.04); }
          40%  { filter:brightness(1.6) scale(1.01); }
          100% { filter:brightness(1)   scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: 220% center; }
          100% { background-position: -220% center; }
        }
        @keyframes livePulse {
          0%,100% { opacity:0.4; }
          50%     { opacity:1; }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REST OF PAGE
// ─────────────────────────────────────────────────────────────────────────────
const TIMELINE = [
  { year:"2017",       title:"Software Development Certificate",      org:"ICT Authority Kenya",                    type:"education", accent:"#7c3aed", desc:"First formal grounding in software engineering fundamentals. The start of everything." },
  { year:"2020",       title:"Cybersecurity & Ethical Hacking",       org:"Zalego Institute of Technology",         type:"education", accent:"#dc2626", desc:"Hands-on ethical hacking, penetration testing, and security fundamentals. CEH foundation begins." },
  { year:"2020–2023",  title:"BSc Information Technology",            org:"Kenyatta University",                    type:"education", accent:"#0891b2", desc:"Full degree covering software engineering, networks, databases, and systems. Built the theoretical backbone." },
  { year:"Apr–Sep 2022",title:"IT Intern",                            org:"Ministry of Foreign & Diaspora Affairs", type:"work",      accent:"#059669", desc:"Government infrastructure, network management, and systems support. First real-world deployment experience." },
  { year:"2024",       title:"Founded Makeja Homes",                  org:"Founding Fullstack Engineer",            type:"founding",  accent:"#7c3aed", desc:"Quit waiting for permission. Built a full production SaaS from zero — alone. 170+ units, KSH 1.5M/month." },
  { year:"2024–2025",  title:"Founder & Lead Engineer",               org:"ShanTech Agency",                        type:"founding",  accent:"#e11d48", desc:"12+ SME clients, 250K+ engagement views, full-stack delivery + CRM automation. Hired, managed, shipped." },
  { year:"2025",       title:"ISC2 CC · Oracle Cloud AI Foundations", org:"International Certifications",           type:"cert",      accent:"#d97706", desc:"Validated cloud and security knowledge with internationally recognised certifications." },
  { year:"2026",       title:"NSE Research Agent",                    org:"In Development",                         type:"building",  accent:"#d97706", desc:"AI-powered market intelligence for the Nairobi Securities Exchange. Decision support, not prediction." },
];
const STACK = [
  {cat:"Frontend",    accent:"#7c3aed",items:["TypeScript","Next.js 14","React","Tailwind CSS","Framer Motion"]},
  {cat:"Backend",     accent:"#0891b2",items:["Node.js","Java","Spring Boot","REST APIs","WebSockets"]},
  {cat:"Database",    accent:"#4ead6a",items:["PostgreSQL","Prisma ORM","MySQL","MongoDB","Neon"]},
  {cat:"Infrastructure",accent:"#d97706",items:["Vercel","VPS/Nginx","Docker","GitHub Actions","PM2"]},
  {cat:"Payments",    accent:"#e11d48",items:["Paystack","Stripe","M-Pesa Daraja","Resend","Twilio"]},
  {cat:"AI & Data",   accent:"#a855f7",items:["Python","Pandas","LLM APIs","LangChain","Financial APIs"]},
  {cat:"Security",    accent:"#dc2626",items:["OWASP","Pen Testing","fail2ban","JWT/OAuth2","SSL/TLS"]},
  {cat:"Design",      accent:"#059669",items:["Figma","InDesign","Sanity CMS","GoHighLevel","Canva"]},
];
const BEYOND = [
  {icon:"🎌",title:"Anime Head",       body:"Fullmetal Alchemist, Attack on Titan, Vinland Saga. The philosophy in these is real — don't argue."},
  {icon:"📖",title:"Editorial Designer",body:"Two volumes of Chill Minds Magazine — 72 pages of children's mental wellness. Designed solo, printed, distributed."},
  {icon:"📈",title:"Markets Watcher",  body:"NSE investor building the tool I always wished existed. Understanding money is understanding systems."},
  {icon:"🌍",title:"Nairobi → World",  body:"Building from Kenya, for Kenya and beyond. Proving world-class products ship from anywhere."},
];

function CountUp({target,suffix=""}:{target:number;suffix?:string}) {
  const [count,setCount]=useState(0); const ref=useRef<HTMLDivElement>(null); const started=useRef(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!started.current){started.current=true;let c=0;const t=setInterval(()=>{c=Math.min(c+target/40,target);setCount(Math.floor(c));if(c>=target)clearInterval(t);},40);}},{threshold:0.5});
    if(ref.current)obs.observe(ref.current); return()=>obs.disconnect();
  },[target]);
  return <div ref={ref}>{count}{suffix}</div>;
}

export default function About() {
  const [activeType,setActiveType]=useState<string|null>(null);
  const filtered=activeType?TIMELINE.filter(t=>t.type===activeType):TIMELINE;

  return (
    <div style={{background:"var(--bg)",minHeight:"100vh"}}>

      {/* HERO */}
      <div style={{borderBottom:"1px solid var(--border)"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
          {/* Left */}
          <div style={{paddingTop:"140px",padding:"140px 0 0 48px",display:"flex",flexDirection:"column"}}>
            <div style={{flex:1}}>
              <div style={{fontFamily:"var(--font-mono)",fontSize:"10px",letterSpacing:"0.25em",color:"var(--purple)",textTransform:"uppercase",marginBottom:"20px"}}>//&#32;Who I Am</div>
              <h1 style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"clamp(48px,6vw,84px)",lineHeight:0.9,letterSpacing:"-0.03em",color:"var(--text)",marginBottom:"28px"}}>
                Levis.<br/><span style={{color:"var(--purple)"}}>Kibirie.</span>
              </h1>
              <p style={{fontFamily:"var(--font-body)",fontSize:"15px",color:"var(--text-3)",lineHeight:1.9,maxWidth:"420px",marginBottom:"20px"}}>
                Founding Fullstack Engineer based in Nairobi, Kenya. I build production systems that handle real money, real users, and real consequences — then I make them beautiful.
              </p>
              <p style={{fontFamily:"var(--font-body)",fontSize:"15px",color:"var(--text-3)",lineHeight:1.9,maxWidth:"420px",marginBottom:"36px"}}>
                I founded Makeja Homes — a property management SaaS processing KSH 1.5M/month across 170+ units. Built every line alone. That&apos;s the bar.
              </p>
              <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
                <a href="/work" style={{fontFamily:"var(--font-mono)",fontSize:"10px",letterSpacing:"0.12em",textTransform:"uppercase",background:"var(--text)",color:"white",padding:"12px 24px",textDecoration:"none",transition:"all 0.2s"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="var(--purple)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="var(--text)";}}>
                  See My Work →
                </a>
                <a href="/#contact" style={{fontFamily:"var(--font-mono)",fontSize:"10px",letterSpacing:"0.12em",textTransform:"uppercase",background:"transparent",color:"var(--text-3)",padding:"12px 24px",textDecoration:"none",border:"1px solid var(--border)",transition:"all 0.2s"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="var(--text)";(e.currentTarget as HTMLElement).style.borderColor="var(--text)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="var(--text-3)";(e.currentTarget as HTMLElement).style.borderColor="var(--border)";}}>
                  Let&apos;s Talk
                </a>
              </div>
            </div>
            <div style={{display:"flex",borderTop:"1px solid var(--border)",marginTop:"48px"}}>
              {[{l:"Based in",v:"Nairobi, KE"},{l:"Available",v:"Remotely"},{l:"Response",v:"< 24 hrs"}].map((f,i)=>(
                <div key={f.l} style={{flex:1,padding:"20px 24px",borderRight:i<2?"1px solid var(--border)":"none"}}>
                  <div style={{fontFamily:"var(--font-mono)",fontSize:"8px",color:"var(--text-4)",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:"4px"}}>{f.l}</div>
                  <div style={{fontFamily:"var(--font-display)",fontWeight:700,fontSize:"15px",color:"var(--text)"}}>{f.v}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Right: motion graphic */}
          <MotionGraphic />
        </div>
      </div>

      {/* NUMBERS */}
      <div style={{background:"#0a0805",padding:"72px 48px",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
        <div style={{fontFamily:"var(--font-mono)",fontSize:"10px",letterSpacing:"0.25em",color:"rgba(124,58,237,0.6)",textTransform:"uppercase",marginBottom:"48px"}}>//&#32;By The Numbers</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"1px",background:"rgba(255,255,255,0.06)"}}>
          {[{val:170,suffix:"+",label:"Units Managed",accent:"#7c3aed"},{val:1.5,suffix:"M KSH",label:"Monthly Volume",accent:"#4ead6a"},{val:12,suffix:"+",label:"Agency Clients",accent:"#e11d48"},{val:250,suffix:"K+",label:"Engagements",accent:"#d97706"},{val:6,suffix:"+",label:"Years Building",accent:"#0891b2"}].map(s=>(
            <div key={s.label} style={{background:"#0a0805",padding:"36px 24px",textAlign:"center",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",bottom:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,${s.accent},transparent)`}}/>
              <div style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"clamp(26px,2.5vw,40px)",color:s.accent,lineHeight:1,marginBottom:"8px"}}><CountUp target={s.val} suffix={s.suffix}/></div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:"9px",color:"rgba(255,255,255,0.3)",letterSpacing:"0.12em",textTransform:"uppercase"}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <div style={{background:"var(--bg)",padding:"72px 48px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"48px",flexWrap:"wrap",gap:"16px"}}>
          <div>
            <div style={{fontFamily:"var(--font-mono)",fontSize:"10px",letterSpacing:"0.25em",color:"var(--purple)",textTransform:"uppercase",marginBottom:"10px"}}>//&#32;Journey</div>
            <h2 style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"clamp(32px,4vw,52px)",letterSpacing:"-0.02em",color:"var(--text)",lineHeight:1}}>How I Got Here.</h2>
          </div>
          <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
            {[{k:null,l:"All"},{k:"education",l:"Education"},{k:"work",l:"Work"},{k:"founding",l:"Founded"},{k:"cert",l:"Certs"},{k:"building",l:"Building"}].map(f=>(
              <button key={String(f.k)} onClick={()=>setActiveType(f.k)}
                style={{fontFamily:"var(--font-mono)",fontSize:"9px",letterSpacing:"0.1em",textTransform:"uppercase",padding:"6px 14px",background:activeType===f.k?"var(--text)":"transparent",border:`1px solid ${activeType===f.k?"var(--text)":"var(--border)"}`,color:activeType===f.k?"white":"var(--text-3)",cursor:"pointer",transition:"all 0.2s"}}>{f.l}
              </button>
            ))}
          </div>
        </div>
        <div style={{position:"relative",paddingLeft:"160px"}}>
          <div style={{position:"absolute",left:"140px",top:0,bottom:0,width:"1px",background:"var(--border)"}}/>
          {filtered.map((item,i)=>(
            <div key={i} style={{display:"flex",position:"relative"}}>
              <div style={{position:"absolute",left:"-20px",top:"36px",width:"9px",height:"9px",borderRadius:"50%",background:item.accent,border:`2px solid var(--bg)`,boxShadow:`0 0 0 1px ${item.accent}`}}/>
              <div style={{position:"absolute",left:"-160px",top:"32px",textAlign:"right",width:"140px"}}>
                <div style={{fontFamily:"var(--font-mono)",fontSize:"10px",color:"var(--text-4)",letterSpacing:"0.08em"}}>{item.year}</div>
              </div>
              <div style={{flex:1,padding:"28px 0 28px 40px",borderBottom:i<filtered.length-1?"1px solid var(--border)":"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"7px",flexWrap:"wrap"}}>
                  <span style={{fontFamily:"var(--font-mono)",fontSize:"8px",letterSpacing:"0.12em",textTransform:"uppercase",color:item.accent,background:`${item.accent}12`,border:`1px solid ${item.accent}30`,padding:"3px 9px"}}>
                    {item.type==="education"?"Education":item.type==="work"?"Work":item.type==="founding"?"Founded":item.type==="cert"?"Certified":"Building"}
                  </span>
                  <span style={{fontFamily:"var(--font-mono)",fontSize:"9px",color:"var(--text-4)"}}>{item.org}</span>
                </div>
                <h3 style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"19px",color:"var(--text)",lineHeight:1.2,marginBottom:"9px"}}>{item.title}</h3>
                <p style={{fontFamily:"var(--font-body)",fontSize:"13px",color:"var(--text-3)",lineHeight:1.85,maxWidth:"580px"}}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STACK */}
      <div style={{background:"#0a0805",padding:"72px 48px",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
        <div style={{fontFamily:"var(--font-mono)",fontSize:"10px",letterSpacing:"0.25em",color:"rgba(124,58,237,0.6)",textTransform:"uppercase",marginBottom:"12px"}}>//&#32;Full Stack</div>
        <h2 style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"clamp(32px,4vw,52px)",letterSpacing:"-0.02em",color:"white",lineHeight:1,marginBottom:"48px"}}>The Toolkit.</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1px",background:"rgba(255,255,255,0.06)"}}>
          {STACK.map(cat=>(
            <div key={cat.cat} style={{background:"#0a0805",padding:"32px 28px",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,${cat.accent},transparent)`}}/>
              <div style={{fontFamily:"var(--font-mono)",fontSize:"9px",letterSpacing:"0.15em",textTransform:"uppercase",color:cat.accent,marginBottom:"18px",opacity:0.7}}>{cat.cat}</div>
              {cat.items.map(item=>(
                <div key={item} style={{display:"flex",alignItems:"center",gap:"9px",marginBottom:"7px"}}>
                  <div style={{width:"4px",height:"4px",borderRadius:"50%",background:cat.accent,flexShrink:0,opacity:0.7}}/>
                  <span style={{fontFamily:"var(--font-body)",fontSize:"13px",color:"rgba(255,255,255,0.65)"}}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* BEYOND */}
      <div style={{background:"var(--bg)",padding:"72px 48px"}}>
        <div style={{fontFamily:"var(--font-mono)",fontSize:"10px",letterSpacing:"0.25em",color:"var(--purple)",textTransform:"uppercase",marginBottom:"12px"}}>//&#32;Beyond the Code</div>
        <h2 style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"clamp(32px,4vw,52px)",letterSpacing:"-0.02em",color:"var(--text)",lineHeight:1,marginBottom:"48px"}}>The Full Picture.</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"12px"}}>
          {BEYOND.map((b,i)=>(
            <div key={b.title} style={{background:i%2===0?"#ffffff":"var(--bg-2)",border:"1px solid var(--border)",padding:"32px 28px"}}>
              <div style={{fontSize:"32px",marginBottom:"16px"}}>{b.icon}</div>
              <h3 style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"16px",color:"var(--text)",marginBottom:"10px"}}>{b.title}</h3>
              <p style={{fontFamily:"var(--font-body)",fontSize:"12px",color:"var(--text-3)",lineHeight:1.85}}>{b.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{background:"#0a0805",padding:"80px 48px",textAlign:"center",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
        <div style={{fontFamily:"var(--font-mono)",fontSize:"10px",letterSpacing:"0.25em",color:"rgba(168,85,247,0.6)",textTransform:"uppercase",marginBottom:"16px"}}>//&#32;Open to Opportunities</div>
        <h2 style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"clamp(32px,5vw,60px)",lineHeight:1,letterSpacing:"-0.02em",color:"white",marginBottom:"12px"}}>
          Available for the<br/><span style={{color:"#a855f7"}}>right opportunity.</span>
        </h2>
        <p style={{fontFamily:"var(--font-body)",fontSize:"15px",color:"rgba(255,255,255,0.4)",marginBottom:"36px"}}>Senior remote roles · Founding engineer positions · Long-term contracts</p>
        <div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"}}>
          <a href="/#contact" style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"12px",letterSpacing:"0.1em",textTransform:"uppercase",background:"#7c3aed",color:"white",padding:"15px 36px",textDecoration:"none",boxShadow:"0 0 32px rgba(124,58,237,0.35)",transition:"all 0.25s"}}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="white";(e.currentTarget as HTMLElement).style.color="#7c3aed";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#7c3aed";(e.currentTarget as HTMLElement).style.color="white";}}>
            Let&apos;s Work Together →
          </a>
          <a href="/work" style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"12px",letterSpacing:"0.1em",textTransform:"uppercase",background:"transparent",color:"rgba(255,255,255,0.5)",padding:"15px 36px",textDecoration:"none",border:"1px solid rgba(255,255,255,0.12)",transition:"all 0.25s"}}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="white";(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.4)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.5)";(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.12)";}}>
            View My Work
          </a>
        </div>
      </div>
    </div>
  );
}
