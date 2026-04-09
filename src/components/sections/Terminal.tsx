"use client";
import { useState, useEffect, useRef, useCallback } from "react";

type Line = { type: "input" | "output" | "error" | "blank"; text: string; color?: string };

const PROMPT = "levis@portfolio:~$";

const MAKEJA_ASCII = `
  ╔═══════════════════════════════╗
  ║   MAKEJA HOMES · DASHBOARD    ║
  ╠═══════════════════════════════╣
  ║  Tenants     247+  ▓▓▓▓▓▓▓░  ║
  ║  Monthly     KSH 1.5M  ✓     ║
  ║  Uptime      100%   ●LIVE    ║
  ║  Units       260    managed  ║
  ╚═══════════════════════════════╝`;

const GHOSTNET_ASCII = `
  ╔═══════════════════════════════╗
  ║     GHOSTNET · ACTIVE         ║
  ╠═══════════════════════════════╣
  ║  Modules     13    complete   ║
  ║  Lab Steps   243   guided     ║
  ║  XP Economy  5450  points     ║
  ║  Live Tools  9     hacking    ║
  ║  GHOST AI    ●ONLINE          ║
  ╚═══════════════════════════════╝`;

const SKILLS_ASCII = `
  FRONTEND  ████████████████████  95%
  PAYMENTS  ███████████████████░  90%
  BACKEND   █████████████████░░░  88%
  DESIGN    ████████████████░░░░  85%
  AI/LLM    ███████████████░░░░░  82%
  INFRA     ███████████████░░░░░  78%
  SECURITY  ██████████████░░░░░░  75%`;

const HELP_LINES = [
  { cmd: "makeja", desc: "→  Makeja Homes live stats" },
  { cmd: "ghostnet", desc: "→  GhostNet platform stats" },
  { cmd: "skills", desc: "→  Skill proficiency overview" },
  { cmd: "stack", desc: "→  Full tech stack" },
  { cmd: "contact", desc: "→  Get in touch" },
  { cmd: "whoami", desc: "→  Who is Levis?" },
  { cmd: "clear", desc: "→  Clear terminal" },
];

const STACK_LINES = [
  "  Languages   TypeScript · Python · SQL",
  "  Frontend    Next.js 14 · React · Tailwind · GSAP",
  "  Backend     Node.js · Prisma ORM · PostgreSQL",
  "  AI / LLM    Groq llama-3.3-70b · Supabase AI",
  "  Realtime    Supabase Realtime · WebSockets",
  "  Payments    Paystack · Webhooks · Resend",
  "  Infra       VPS · Nginx · Vercel · Docker · CI/CD",
  "  Security    OWASP · Pen Testing · Secure Architecture · Auth",
  "  Design      Figma · InDesign · Typography Systems",
];

const WHOAMI_LINES = [
  "  Levis Kibirie — Fullstack Engineer · SaaS Founder · Designer",
  "  Based in Nairobi, Kenya. 8+ years in tech.",
  "",
  "  Built Makeja Homes from scratch: 247+ tenants, KSH 1.5M/mo.",
  "  Built GhostNet: cybersec platform with AI, 13 modules, 9 tools.",
  "  GhostNet builder · Pen tester · Forbes Africa ready.",
  "",
  "  Open to: senior remote engineering, SaaS collabs, interesting problems.",
];

const CONTACT_LINES = [
  "  Email     leviskibirie2110@gmail.com",
  "  LinkedIn  linkedin.com/in/levis-kibirie-6bba13344",
  "  GitHub    github.com/Levikib",
  "  WhatsApp  +254 723 819 934",
  "",
  "  Response time: < 24 hours · Usually same day (EAT UTC+3)",
];

function processCommand(raw: string): Line[] {
  const cmd = raw.trim().toLowerCase();
  const out: Line[] = [];

  if (cmd === "help" || cmd === "") {
    out.push({ type: "output", text: "  Available commands:", color: "rgba(255,255,255,0.5)" });
    out.push({ type: "blank", text: "" });
    for (const h of HELP_LINES) {
      out.push({ type: "output", text: `  ${h.cmd.padEnd(12)}${h.desc}`, color: undefined });
    }
  } else if (cmd === "makeja") {
    out.push({ type: "output", text: MAKEJA_ASCII, color: "#a855f7" });
    out.push({ type: "blank", text: "" });
    out.push({ type: "output", text: "  ● Live in production since 2024. KSH flows daily.", color: "#4ead6a" });
  } else if (cmd === "ghostnet") {
    out.push({ type: "output", text: GHOSTNET_ASCII, color: "#10b981" });
    out.push({ type: "blank", text: "" });
    out.push({ type: "output", text: "  ● Live at ghostnet-pi.vercel.app — GHOST AI is online.", color: "#10b981" });
  } else if (cmd === "skills") {
    out.push({ type: "output", text: SKILLS_ASCII, color: "#a855f7" });
    out.push({ type: "blank", text: "" });
    out.push({ type: "output", text: "  Run `stack` for full technology breakdown.", color: "rgba(255,255,255,0.35)" });
  } else if (cmd === "stack") {
    out.push({ type: "output", text: "  // Full Tech Stack\n", color: "#d97706" });
    for (const l of STACK_LINES) {
      out.push({ type: "output", text: l, color: undefined });
    }
  } else if (cmd === "whoami") {
    out.push({ type: "blank", text: "" });
    for (const l of WHOAMI_LINES) {
      out.push({ type: "output", text: l, color: l.startsWith("  Built") ? "#a855f7" : l.startsWith("  Open") ? "#4ead6a" : undefined });
    }
  } else if (cmd === "contact") {
    out.push({ type: "blank", text: "" });
    for (const l of CONTACT_LINES) {
      out.push({ type: "output", text: l, color: l.includes("@") || l.includes(".com") || l.includes("+254") ? "#a855f7" : undefined });
    }
  } else if (cmd === "clear") {
    return [{ type: "blank", text: "__CLEAR__" }];
  } else if (cmd === "ls" || cmd === "dir") {
    out.push({ type: "output", text: "  makeja/    ghostnet/   nse-agent/   shantech/   chill-minds/", color: "#4ead6a" });
  } else if (cmd === "pwd") {
    out.push({ type: "output", text: "  /home/levis/portfolio/projects", color: "rgba(255,255,255,0.5)" });
  } else if (cmd === "date") {
    out.push({ type: "output", text: `  ${new Date().toUTCString()}`, color: "rgba(255,255,255,0.5)" });
  } else if (cmd === "sudo" || cmd.startsWith("sudo ")) {
    out.push({ type: "output", text: "  Nice try. You don't have sudo here.", color: "#e11d48" });
  } else if (cmd === "hire levis" || cmd === "hire") {
    out.push({ type: "blank", text: "" });
    out.push({ type: "output", text: "  Great choice. Scrolling to contact form...", color: "#4ead6a" });
    out.push({ type: "blank", text: "__HIRE__" });
  } else if (cmd === "exit" || cmd === "quit") {
    out.push({ type: "output", text: "  There is no exit from greatness.", color: "#d97706" });
  } else {
    out.push({ type: "error", text: `  command not found: ${cmd} — try 'help'`, color: "#e11d48" });
  }

  return out;
}

const BOOT_SEQUENCE = [
  { text: "Initializing Levis Kibirie OS v2.0...", color: "rgba(255,255,255,0.3)" },
  { text: "Loading projects: makeja ✓  ghostnet ✓  nse ✓", color: "#4ead6a" },
  { text: "Mounting skills: typescript ✓  nextjs ✓  supabase ✓  groq ✓", color: "#a855f7" },
  { text: "System ready. Type 'help' to get started.\n", color: "#d97706" },
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [booted, setBooted] = useState(false);
  const [visible, setVisible] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Boot sequence fires only when user scrolls to this section
  // rootMargin keeps it from triggering while the section is off-screen at load
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !booted) {
        setVisible(true);
        setBooted(true);
        let i = 0;
        const addLine = () => {
          if (i >= BOOT_SEQUENCE.length) return;
          const bl = BOOT_SEQUENCE[i];
          setLines(prev => [...prev, { type: "output", text: bl.text, color: bl.color }]);
          i++;
          setTimeout(addLine, 280);
        };
        setTimeout(addLine, 200);
      }
    }, { threshold: 0.2, rootMargin: "0px 0px -80px 0px" });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [booted]);

  // Scroll only inside the output div — never the page
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const submit = useCallback(() => {
    const cmd = input.trim();
    if (!cmd) return;

    const result = processCommand(cmd);

    if (result[0]?.text === "__CLEAR__") {
      setLines([]);
      setInput("");
      setHistIdx(-1);
      return;
    }

    const scrollHire = result.some(l => l.text === "__HIRE__");
    const filtered = result.filter(l => l.text !== "__HIRE__");

    setLines(prev => [
      ...prev,
      { type: "input", text: cmd },
      ...filtered,
      { type: "blank", text: "" },
    ]);
    setHistory(prev => [cmd, ...prev.slice(0, 49)]);
    setHistIdx(-1);
    setInput("");

    if (scrollHire) {
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 800);
    }
  }, [input]);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { submit(); return; }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? "" : history[idx]);
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const cmds = ["help","makeja","ghostnet","skills","stack","whoami","contact","clear","hire levis"];
      const match = cmds.find(c => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <section ref={sectionRef} id="terminal"
      className="relative overflow-hidden"
      style={{ background: "#010508", padding: "80px clamp(16px,4vw,48px)" }}
    >
      {/* Scanline overlay */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,100,0.015) 2px, rgba(0,255,100,0.015) 4px)", pointerEvents:"none", zIndex:1 }} />
      {/* Green glow */}
      <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translateX(-50%)", width:"700px", height:"400px", background:"radial-gradient(ellipse, rgba(16,185,129,0.05) 0%, transparent 65%)", filter:"blur(60px)", pointerEvents:"none" }} />

      <div className="relative z-10" style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Section header */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"rgba(16,185,129,0.7)", textTransform:"uppercase", marginBottom:"10px" }}>// Interactive</div>
          <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(28px,4vw,48px)", lineHeight:1, letterSpacing:"-0.02em", color:"white" }}>
            Try the Terminal
          </div>
          <p style={{ fontFamily:"var(--font-mono)", fontSize:"11px", color:"rgba(255,255,255,0.25)", marginTop:"10px", letterSpacing:"0.05em" }}>
            Type <span style={{ color:"#10b981" }}>help</span> to see commands. Use <span style={{ color:"#a855f7" }}>↑↓</span> for history. Tab to autocomplete.
          </p>
        </div>

        {/* Terminal window */}
        <div
          style={{ background:"#0d1117", border:"1px solid rgba(16,185,129,0.2)", boxShadow:"0 0 60px rgba(16,185,129,0.08), 0 0 120px rgba(16,185,129,0.04)", overflow:"hidden" }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title bar */}
          <div style={{ background:"#161b22", borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"12px 16px", display:"flex", alignItems:"center", gap:"8px" }}>
            <div style={{ width:"12px", height:"12px", borderRadius:"50%", background:"#ff5f56" }} />
            <div style={{ width:"12px", height:"12px", borderRadius:"50%", background:"#ffbd2e" }} />
            <div style={{ width:"12px", height:"12px", borderRadius:"50%", background:"#27c93f" }} />
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"11px", color:"rgba(255,255,255,0.3)", marginLeft:"12px", letterSpacing:"0.08em" }}>levis@portfolio:~</span>
            <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:"6px" }}>
              <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#10b981", boxShadow:"0 0 6px #10b981", animation:"blink 2s ease-in-out infinite" }} />
              <span style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"rgba(16,185,129,0.7)", letterSpacing:"0.12em" }}>LIVE</span>
            </div>
          </div>

          {/* Output area */}
          <div
            ref={outputRef}
            style={{ padding:"20px 20px 8px", minHeight:"280px", maxHeight:"420px", overflowY:"auto", fontFamily:"'Courier New', monospace", fontSize:"13px", lineHeight:"1.75", cursor:"text" }}
          >
            {visible && lines.map((l, i) => {
              if (l.type === "blank") return <div key={i} style={{ height:"4px" }} />;
              if (l.type === "input") return (
                <div key={i} style={{ display:"flex", gap:"8px", marginBottom:"2px" }}>
                  <span style={{ color:"#10b981", flexShrink:0, userSelect:"none" }}>{PROMPT}</span>
                  <span style={{ color:"white" }}>{l.text}</span>
                </div>
              );
              return (
                <div key={i} style={{ color: l.color ?? "rgba(255,255,255,0.65)", whiteSpace:"pre-wrap", fontFamily:"'Courier New', monospace" }}>{l.text}</div>
              );
            })}
          </div>

          {/* Input row */}
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", padding:"12px 20px 16px", display:"flex", alignItems:"center", gap:"10px", background:"rgba(0,0,0,0.2)" }}>
            <span style={{ fontFamily:"'Courier New', monospace", fontSize:"13px", color:"#10b981", flexShrink:0, userSelect:"none" }}>{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="type a command..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              style={{
                flex:1, background:"transparent", border:"none", outline:"none",
                fontFamily:"'Courier New', monospace", fontSize:"13px", color:"white",
                caretColor:"#10b981",
              }}
            />
          </div>
        </div>

        {/* Quick-fire buttons */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", marginTop:"16px" }}>
          {["help","makeja","ghostnet","skills","whoami","contact"].map(cmd => (
            <button key={cmd}
              onClick={() => { setInput(cmd); setTimeout(() => { setInput(""); setLines(prev => [...prev, { type:"input", text:cmd }, ...processCommand(cmd), { type:"blank", text:"" }]); }, 10); }}
              style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", background:"rgba(16,185,129,0.05)", border:"1px solid rgba(16,185,129,0.18)", color:"rgba(16,185,129,0.7)", padding:"6px 14px", cursor:"pointer", transition:"all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(16,185,129,0.12)"; (e.currentTarget as HTMLElement).style.color="#10b981"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(16,185,129,0.05)"; (e.currentTarget as HTMLElement).style.color="rgba(16,185,129,0.7)"; }}
            >{cmd}</button>
          ))}
        </div>
      </div>
    </section>
  );
}
