"use client";
import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

// ── GALAXY MOTION GRAPHIC ─────────────────────────────────────────────────────
function MotionGraphic() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);
  const tiltRef      = useRef({ tx:0, ty:0, cx:0, cy:0 });

  const SCRIPT = [
    { words:["Hi,","I'm","Levis","👋"],                             sizes:["lg","lg","xxl","xxl"] },
    { words:["Welcome","to","my","little","corner..."],             sizes:["sm","sm","sm","md","md"] },
    { words:["Let's","talk"],                                       sizes:["xl","xl"] },
    { words:["tech.","Anime.","Shows.","Life."],                    sizes:["md","md","md","md"] },
    { words:["Philosophy.","Travelling.","Meditation."],            sizes:["sm","sm","sm"] },
    { words:["You","name","it."],                                   sizes:["lg","lg","lg"] },
    { words:["But","also","—"],                                     sizes:["md","md","lg"] },
    { words:["I","build","things."],                                sizes:["xl","xxl","xxl"] },
    { words:["Real","things.","That","move","real","money."],       sizes:["lg","lg","md","md","lg","lg"] },
    { words:["From","Nairobi,","Kenya.","To","the","world.","🌍"], sizes:["sm","lg","lg","sm","sm","xl","xl"] },
  ];
  const GLYPHS = "αβγδεζηθλμνξπστφψωАБВГДЕЖЗИКЛМНОПРСТУФЦЧШЩЪЫЬЭЮЯ日月火水木金土山川田人口目耳手足";
  const SZ: Record<string,{size:string;weight:string}> = {
    sm:  {size:"13px",weight:"400"},
    md:  {size:"17px",weight:"700"},
    lg:  {size:"22px",weight:"800"},
    xl:  {size:"28px",weight:"800"},
    xxl: {size:"36px",weight:"800"},
  };

  // Mouse tilt (desktop only)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || window.innerWidth <= 768) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tiltRef.current.tx = ((e.clientX-r.left)/r.width -0.5)*14;
      tiltRef.current.ty = ((e.clientY-r.top)/r.height-0.5)*-10;
    };
    const onLeave = () => { tiltRef.current.tx=0; tiltRef.current.ty=0; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove",onMove); el.removeEventListener("mouseleave",onLeave); };
  }, []);

  // Tilt RAF
  useEffect(() => {
    const el = containerRef.current;
    if (!el || window.innerWidth <= 768) return;
    let raf: number;
    const tick = () => {
      const t = tiltRef.current;
      t.cx += (t.tx-t.cx)*0.055;
      t.cy += (t.ty-t.cy)*0.055;
      el.style.transform = `perspective(820px) rotateX(${t.cy}deg) rotateY(${t.cx}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Galaxy canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const resize = () => { canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight; };
    resize();

    const isMob = window.innerWidth <= 768;
    interface Star { x:number;y:number;r:number;op:number;phase:number;speed:number; }
    const stars: Star[] = Array.from({length:isMob?70:180},()=>({
      x:Math.random()*canvas.width, y:Math.random()*canvas.height,
      r:Math.random()*1.5+0.3, op:Math.random()*0.6+0.2,
      phase:Math.random()*Math.PI*2, speed:Math.random()*0.02+0.005,
    }));
    interface Cloud {cx:number;cy:number;rx:number;ry:number;color:string;alpha:number;phase:number;speed:number;}
    const clouds: Cloud[] = [
      {cx:0.75,cy:0.25,rx:0.35,ry:0.25,color:"#7c3aed",alpha:0.08,phase:0,speed:0.004},
      {cx:0.15,cy:0.65,rx:0.28,ry:0.22,color:"#1a5c2e",alpha:0.06,phase:1,speed:0.003},
      {cx:0.85,cy:0.75,rx:0.22,ry:0.18,color:"#e11d48",alpha:0.04,phase:2,speed:0.005},
      {cx:0.45,cy:0.10,rx:0.18,ry:0.14,color:"#0891b2",alpha:0.05,phase:3,speed:0.003},
      {cx:0.55,cy:0.85,rx:0.20,ry:0.16,color:"#d97706",alpha:0.04,phase:1.5,speed:0.004},
    ];
    let t = 0;
    const draw = () => {
      t += 0.016;
      const W=canvas.width, H=canvas.height;
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle="#05020f"; ctx.fillRect(0,0,W,H);
      clouds.forEach(c => {
        const pulse=1+Math.sin(t*c.speed*10+c.phase)*0.12;
        const g=ctx.createRadialGradient(c.cx*W,c.cy*H,0,c.cx*W,c.cy*H,Math.max(c.rx*W,c.ry*H)*pulse);
        g.addColorStop(0,c.color+Math.floor(c.alpha*255).toString(16).padStart(2,"0"));
        g.addColorStop(1,c.color+"00");
        ctx.fillStyle=g;
        ctx.beginPath(); ctx.ellipse(c.cx*W,c.cy*H,c.rx*W*pulse,c.ry*H*pulse,0,0,Math.PI*2); ctx.fill();
      });
      stars.forEach(s => {
        const op=s.op*(0.7+0.3*Math.sin(t*s.speed*30+s.phase));
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${op})`; ctx.fill();
        if (s.r>1) { ctx.beginPath(); ctx.arc(s.x,s.y,s.r*2.5,0,Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${op*0.08})`; ctx.fill(); }
      });
      for (let y=0;y<H;y+=4) { ctx.fillStyle="rgba(0,0,0,0.03)"; ctx.fillRect(0,y,W,1); }
      const vig=ctx.createRadialGradient(W/2,H/2,H*0.3,W/2,H/2,H*0.85);
      vig.addColorStop(0,"transparent"); vig.addColorStop(1,"rgba(0,0,0,0.55)");
      ctx.fillStyle=vig; ctx.fillRect(0,0,W,H);
      animId=requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Text scramble
  useEffect(() => {
    const container = textRef.current;
    if (!container) return;
    let cancelled = false;
    const scramble = async () => {
      while (!cancelled) {
        for (const line of SCRIPT) {
          if (cancelled) return;
          container.innerHTML = "";
          const lineEl = document.createElement("div");
          lineEl.style.cssText = "display:flex;flex-wrap:wrap;gap:6px 10px;justify-content:center;";
          const spans: HTMLSpanElement[] = line.words.map((word, i) => {
            const s = document.createElement("span");
            const sz = SZ[line.sizes[i]??"md"];
            s.style.cssText = `font-family:var(--font-display);font-weight:${sz.weight};font-size:${sz.size};color:rgba(255,255,255,0.12);white-space:nowrap;`;
            s.textContent = word;
            lineEl.appendChild(s);
            return s;
          });
          container.appendChild(lineEl);
          for (let wi = 0; wi < line.words.length; wi++) {
            if (cancelled) return;
            const span = spans[wi];
            const target = line.words[wi];
            const isEmoji = /\p{Emoji}/u.test(target);
            const FRAMES = isEmoji ? 0 : 12;
            for (let f = 0; f <= FRAMES; f++) {
              if (cancelled) return;
              if (f < FRAMES) {
                const scrambled = target.split("").map((ch,ci) =>
                  ci < Math.floor((ci/target.length)*f*1.5) ? ch : GLYPHS[Math.floor(Math.random()*GLYPHS.length)]
                ).join("");
                span.textContent = scrambled;
                span.style.color = "rgba(200,150,255,0.55)";
                span.style.textShadow = "2px 0 #ff4444,-2px 0 #4444ff";
              } else {
                span.textContent = target;
                span.style.color = "rgba(255,255,255,0.92)";
                span.style.textShadow = "0 0 20px rgba(168,85,247,0.8)";
                span.style.filter = "brightness(3.2)";
                setTimeout(() => { span.style.filter="none"; span.style.textShadow="none"; }, 80);
              }
              await new Promise(r => setTimeout(r, 38));
            }
          }
          await new Promise(r => setTimeout(r, 900));
        }
        await new Promise(r => setTimeout(r, 700));
      }
    };
    scramble();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} style={{ position:"relative", height:"100%", minHeight:"380px", background:"#05020f", overflow:"hidden", borderLeft:"1px solid rgba(168,85,247,0.12)", transformStyle:"preserve-3d" }}>
      <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"32px", background:"rgba(0,0,0,0.5)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", padding:"0 14px", gap:"8px", zIndex:2, borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        {["#ff5f57","#febc2e","#28c840"].map((c,i)=><div key={i} style={{ width:"10px", height:"10px", borderRadius:"50%", background:c }}/>)}
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.12em", marginLeft:"8px" }}>levo.sh — about.tsx</span>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:"6px" }}>
          <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#4ead6a", animation:"blink 2s ease-in-out infinite" }}/>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"rgba(78,173,106,0.7)", letterSpacing:"0.1em" }}>LIVE</span>
        </div>
      </div>
      <div style={{ position:"absolute", inset:0, zIndex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"48px 28px 28px" }}>
        <div ref={textRef} style={{ textAlign:"center", lineHeight:1.5, maxWidth:"320px" }}/>
      </div>
    </div>
  );
}

// ── DATA ──────────────────────────────────────────────────────────────────────
const TIMELINE = [
  { year:"2017",      event:"First code — Software Development Certificate",             accent:"#7c3aed" },
  { year:"2020",      event:"Cybersecurity & Ethical Hacking — Zalego Institute",        accent:"#e11d48" },
  { year:"2020–2023", event:"BSc Information Technology — Kenyatta University",          accent:"#0891b2" },
  { year:"Apr 2022",  event:"IT Intern — Ministry of Foreign & Diaspora Affairs",        accent:"#059669" },
  { year:"Apr 2024",  event:"Founded Makeja Homes — solo SaaS, zero to production",     accent:"#7c3aed" },
  { year:"May 2024",  event:"Founded ShanTech Agency — 12+ SME clients",                accent:"#d97706" },
  { year:"2025",      event:"ISC² CC + Oracle Cloud Infrastructure AI Foundations",      accent:"#a855f7" },
  { year:"2026",      event:"NSE Research Agent — AI market tool, in development",      accent:"#4ead6a" },
];
const STACK = [
  {label:"TypeScript",icon:"⬡",color:"#3178c6"},{label:"Next.js 14",icon:"◆",color:"#ffffff"},
  {label:"React",icon:"◎",color:"#61dafb"},{label:"Node.js",icon:"⬢",color:"#339933"},
  {label:"PostgreSQL",icon:"◈",color:"#336791"},{label:"Prisma ORM",icon:"◇",color:"#5a67d8"},
  {label:"Python",icon:"◉",color:"#f7c948"},{label:"Docker",icon:"⬡",color:"#2496ed"},
  {label:"Paystack",icon:"◆",color:"#011b33"},{label:"Resend",icon:"◎",color:"#7c3aed"},
  {label:"InDesign",icon:"▣",color:"#ff3366"},{label:"GoHighLevel",icon:"⬢",color:"#f97316"},
];
const BEYOND = [
  {icon:"🍜",label:"Food",desc:"Running Shan's Delights"},{icon:"📺",label:"Anime",desc:"AoT, Vinland, Jujutsu"},
  {icon:"🎬",label:"Film",desc:"Nolan, Villeneuve, A24"},{icon:"📚",label:"Philosophy",desc:"Stoicism, Taoism"},
  {icon:"🧘",label:"Meditation",desc:"Daily practice"},{icon:"✈️",label:"Travelling",desc:"Next: Japan"},
  {icon:"📈",label:"Markets",desc:"NSE retail investor"},{icon:"💪",label:"Fitness",desc:"Consistent routine"},
];
const NUMBERS = [
  {val:"170+",label:"Units Managed",accent:"#7c3aed"},{val:"1.5M",label:"KSH Monthly Volume",accent:"#d97706"},
  {val:"12+",label:"Agency Clients",accent:"#e11d48"},{val:"250K+",label:"Engagement Views",accent:"#4ead6a"},
  {val:"72",label:"Magazine Pages",accent:"#0891b2"},{val:"6+",label:"Years in Tech",accent:"#a855f7"},
];

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function About() {
  const isMobile = useIsMobile();
  const px = isMobile ? "20px" : "56px";

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>

      {/* HERO SPLIT */}
      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", minHeight:isMobile?"auto":"100vh" }}>
        {/* Left: bio */}
        <div style={{ padding:isMobile?"100px 20px 48px":"120px 56px 56px", display:"flex", flexDirection:"column", justifyContent:"center", borderRight:isMobile?"none":"1px solid var(--border)" }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"var(--purple)", textTransform:"uppercase", marginBottom:"20px" }}>// About</div>
          <h1 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(38px,6vw,72px)", lineHeight:0.9, letterSpacing:"-0.03em", color:"var(--text)", marginBottom:"28px" }}>
            Levis<br /><span style={{ color:"var(--purple)" }}>Kibirie.</span>
          </h1>
          <p style={{ fontFamily:"var(--font-body)", fontSize:"15px", color:"var(--text-3)", lineHeight:1.9, maxWidth:"480px", marginBottom:"28px" }}>
            Fullstack Engineer and full product delivery specialist based in Nairobi, Kenya. I build complete systems — architecture, design, payments, deployment, strategy — from first commit to live production.
          </p>
          <p style={{ fontFamily:"var(--font-body)", fontSize:"14px", color:"var(--text-3)", lineHeight:1.9, maxWidth:"440px", marginBottom:"36px" }}>
            Founder of Makeja Homes (KSH 1.5M/month, built solo). Founder of ShanTech Agency (12+ clients). Before the code — I designed a 72-page magazine.
          </p>
          {/* Quick facts */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0", borderTop:"1px solid var(--border)", borderLeft:"1px solid var(--border)" }}>
            {[
              {icon:"📍",label:"Location",val:"Nairobi, Kenya"},
              {icon:"💼",label:"Status",val:"Open to Remote Roles"},
              {icon:"🕐",label:"Timezone",val:"EAT (UTC+3)"},
              {icon:"⚡",label:"Response",val:"Within 24h"},
            ].map(f => (
              <div key={f.label} style={{ flex:"1 1 50%", minWidth:"120px", padding:"14px 16px", borderRight:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"var(--text-4)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"5px" }}>{f.icon} {f.label}</div>
                <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"12px", color:"var(--text)" }}>{f.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: galaxy */}
        <div style={{ minHeight:isMobile?"360px":"auto", borderTop:isMobile?"1px solid rgba(168,85,247,0.12)":"none" }}>
          <MotionGraphic />
        </div>
      </div>

      {/* BY THE NUMBERS */}
      <div style={{ background:"#0a0805", padding:`48px ${px}`, borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(255,255,255,0.3)", textTransform:"uppercase", marginBottom:"32px" }}>// By the Numbers</div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(6,1fr)", gap:"1px", background:"rgba(255,255,255,0.04)" }}>
          {NUMBERS.map(n => (
            <div key={n.label} style={{ background:"#0a0805", padding:isMobile?"20px 16px":"28px 24px", textAlign:"center" }}>
              <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:isMobile?"28px":"36px", color:n.accent, lineHeight:1, marginBottom:"8px" }}>{n.val}</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.1em", textTransform:"uppercase", lineHeight:1.4 }}>{n.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <div style={{ background:"var(--bg)", padding:`48px ${px}`, borderTop:"1px solid var(--border)" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"var(--text-4)", textTransform:"uppercase", marginBottom:"40px" }}>// Timeline</div>
        <div style={{ position:"relative", paddingLeft:isMobile?"80px":"100px" }}>
          <div style={{ position:"absolute", left:isMobile?"60px":"76px", top:0, bottom:0, width:"1px", background:"var(--border)" }}/>
          {TIMELINE.map((item,i) => (
            <div key={i} style={{ position:"relative", marginBottom:"32px", paddingBottom:"32px", borderBottom:i<TIMELINE.length-1?"1px solid var(--border)":"none" }}>
              <div style={{ position:"absolute", left:isMobile?"-80px":"-100px", width:isMobile?"68px":"88px", textAlign:"right", paddingRight:"16px", top:"4px" }}>
                <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:item.accent, letterSpacing:"0.08em", whiteSpace:"nowrap" }}>{item.year}</span>
              </div>
              <div style={{ position:"absolute", left:"-8px", top:"6px", width:"15px", height:"15px", borderRadius:"50%", background:`${item.accent}20`, border:`2px solid ${item.accent}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:item.accent }}/>
              </div>
              <div style={{ fontFamily:"var(--font-body)", fontSize:"14px", color:"var(--text)", lineHeight:1.5 }}>{item.event}</div>
            </div>
          ))}
        </div>
      </div>

      {/* STACK */}
      <div style={{ background:"var(--bg-2)", padding:`48px ${px}`, borderTop:"1px solid var(--border)" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"var(--text-4)", textTransform:"uppercase", marginBottom:"32px" }}>// Stack</div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(4,1fr)", gap:"8px" }}>
          {STACK.map(s => (
            <div key={s.label} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"16px", background:"var(--bg)", border:"1px solid var(--border)", transition:"all 0.18s" }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=s.color;(e.currentTarget as HTMLElement).style.background=`${s.color}08`;}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--border)";(e.currentTarget as HTMLElement).style.background="var(--bg)";}}>
              <span style={{ color:s.color, fontSize:"18px", flexShrink:0 }}>{s.icon}</span>
              <span style={{ fontFamily:"var(--font-body)", fontSize:"13px", color:"var(--text)", fontWeight:500 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BEYOND */}
      <div style={{ background:"var(--bg)", padding:`48px ${px}`, borderTop:"1px solid var(--border)" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"var(--text-4)", textTransform:"uppercase", marginBottom:"32px" }}>// Beyond the Code</div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(4,1fr)", gap:"8px" }}>
          {BEYOND.map(b => (
            <div key={b.label} style={{ padding:"20px", background:"var(--bg-2)", border:"1px solid var(--border)" }}>
              <div style={{ fontSize:"24px", marginBottom:"10px" }}>{b.icon}</div>
              <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"14px", color:"var(--text)", marginBottom:"4px" }}>{b.label}</div>
              <div style={{ fontFamily:"var(--font-body)", fontSize:"12px", color:"var(--text-3)" }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background:"#0a0805", padding:`48px ${px}`, borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", flexDirection:isMobile?"column":"row", justifyContent:"space-between", alignItems:isMobile?"flex-start":"center", gap:"32px" }}>
        <div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(124,58,237,0.6)", textTransform:"uppercase", marginBottom:"12px" }}>// Let&apos;s Build Something</div>
          <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(24px,4vw,48px)", lineHeight:1, letterSpacing:"-0.02em", color:"white" }}>
            Ready to work together?<br /><span style={{ color:"#a855f7" }}>Let&apos;s talk.</span>
          </h2>
        </div>
        <div style={{ display:"flex", flexDirection:isMobile?"row":"column", gap:"10px", flexWrap:"wrap" }}>
          <a href="/#contact" style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", background:"#7c3aed", color:"white", padding:"14px 28px", textDecoration:"none", whiteSpace:"nowrap", boxShadow:"0 0 24px rgba(124,58,237,0.35)", transition:"all 0.2s", flex:isMobile?"1":"none", textAlign:"center" }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="white";(e.currentTarget as HTMLElement).style.color="#7c3aed";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="#7c3aed";(e.currentTarget as HTMLElement).style.color="white";}}>
            Let&apos;s Work →
          </a>
          <a href="https://linkedin.com/in/levis-kibirie-6bba13344" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", background:"transparent", color:"rgba(255,255,255,0.4)", padding:"14px 28px", textDecoration:"none", border:"1px solid rgba(255,255,255,0.1)", whiteSpace:"nowrap", transition:"all 0.2s", flex:isMobile?"1":"none", textAlign:"center" }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="white";(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.4)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.4)";(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.1)";}}>
            LinkedIn ↗
          </a>
        </div>
      </div>

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  );
}
