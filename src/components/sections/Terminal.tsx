"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

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
  ║  Modules     13    total      ║
  ║  Lab Steps   243   guided     ║
  ║  XP Economy  5450  points     ║
  ║  Tools       9     standalone ║
  ║  GHOST Agent ●ONLINE          ║
  ╚═══════════════════════════════╝`;

const SKILLS_ASCII = `
  FRONTEND  ████████████████████  95%
  PAYMENTS  ███████████████████░  90%
  BACKEND   █████████████████░░░  88%
  DESIGN    ████████████████░░░░  85%
  AI/LLM    ███████████████░░░░░  82%
  INFRA     ███████████████░░░░░  78%
  SECURITY  ██████████████░░░░░░  75%`;

const NSE_ASCII = `
  ╔═══════════════════════════════╗
  ║   NSE RESEARCH AGENT · DEV    ║
  ╠═══════════════════════════════╣
  ║  Status      IN DEVELOPMENT   ║
  ║  Launch      Q2 2026          ║
  ║  Indicators  10+   technical  ║
  ║  Analysis    AI    summarised ║
  ╚═══════════════════════════════╝`;

const SHANTECH_ASCII = `
  ╔═══════════════════════════════╗
  ║   SHANTECH AGENCY · 2024–25   ║
  ╠═══════════════════════════════╣
  ║  Clients     12+   SMEs       ║
  ║  Engagement  250K+ views      ║
  ║  Traffic     +35%  lift       ║
  ║  Leads       3×    volume     ║
  ╚═══════════════════════════════╝`;

const CHILLMINDS_ASCII = `
  ╔═══════════════════════════════╗
  ║   CHILL MINDS MAGAZINE        ║
  ╠═══════════════════════════════╣
  ║  Volumes     2      published ║
  ║  Pages       72     total     ║
  ║  Ownership   100%   design    ║
  ║  Audience    Kids   wellness  ║
  ╚═══════════════════════════════╝`;

const HOOKAH_ASCII = `
  ╔═══════════════════════════════╗
  ║   HOOKAH · 3D EXPERIENCE      ║
  ╠═══════════════════════════════╣
  ║  Hero Model  GLB   Draco      ║
  ║  Flavours    25    orbiting   ║
  ║  Disassembly 7     parts      ║
  ║  Payments    Paystack ✓LIVE   ║
  ╚═══════════════════════════════╝`;

const HELP_GROUPS: { label: string; color: string; items: { cmd: string; desc: string }[] }[] = [
  {
    label: "PROJECTS", color: "#a855f7",
    items: [
      { cmd: "projects", desc: "→  List every project" },
      { cmd: "makeja", desc: "→  Makeja Homes live stats" },
      { cmd: "ghostnet", desc: "→  GhostNet platform stats" },
      { cmd: "nse", desc: "→  NSE Research Agent stats" },
      { cmd: "shantech", desc: "→  ShanTech Agency stats" },
      { cmd: "chillminds", desc: "→  Chill Minds Magazine stats" },
      { cmd: "hookah", desc: "→  Hookah 3D experience stats" },
    ],
  },
  {
    label: "ABOUT ME", color: "#10b981",
    items: [
      { cmd: "whoami", desc: "→  Who is Levis?" },
      { cmd: "about", desc: "→  Extended bio" },
      { cmd: "timeline", desc: "→  Career journey, 2017 → now" },
      { cmd: "skills", desc: "→  Skill proficiency overview" },
      { cmd: "stack", desc: "→  Full tech stack" },
      { cmd: "beyond", desc: "→  Outside the terminal" },
    ],
  },
  {
    label: "CONNECT", color: "#d97706",
    items: [
      { cmd: "contact", desc: "→  Get in touch" },
      { cmd: "socials", desc: "→  Social + code links" },
      { cmd: "hire", desc: "→  Scroll to the contact form" },
    ],
  },
  {
    label: "SYSTEM", color: "rgba(255,255,255,0.4)",
    items: [
      { cmd: "neofetch", desc: "→  System info card" },
      { cmd: "history", desc: "→  Command history" },
      { cmd: "man <cmd>", desc: "→  Manual page for a command" },
      { cmd: "ls / pwd / date", desc: "→  The usual suspects" },
      { cmd: "clear", desc: "→  Clear terminal" },
    ],
  },
];

const MAN_PAGES: Record<string, string[]> = {
  makeja: [
    "  MAKEJA(1)                 User Commands                MAKEJA(1)",
    "",
    "  NAME",
    "         makeja: print Makeja Homes production stats",
    "",
    "  DESCRIPTION",
    "         Multi-tenant residential property management SaaS.",
    "         Built from zero: architecture, payment flows, automation.",
    "         Live since 2024. 247+ active tenants, KSH 1.5M/month",
    "         processed through Paystack webhooks.",
    "",
    "  SEE ALSO",
    "         ghostnet(1), stack(1), projects(1)",
  ],
  ghostnet: [
    "  GHOSTNET(1)                User Commands               GHOSTNET(1)",
    "",
    "  NAME",
    "         ghostnet: print GhostNet platform stats",
    "",
    "  DESCRIPTION",
    "         Full-stack cybersecurity research & training platform.",
    "         13 modules (concept page + interactive lab each), 243",
    "         guided lab steps, ~5,450 XP economy with a 5-tier rank",
    "         system, 9 standalone tools, live leaderboard, and GHOST",
    "         Agent, a Groq llama-3.3-70b assistant embedded in-app.",
    "         Module pages are open to browse; labs and the agent",
    "         require a free account.",
    "",
    "  SEE ALSO",
    "         makeja(1), stack(1), projects(1)",
  ],
  hire: [
    "  HIRE(1)                    User Commands                   HIRE(1)",
    "",
    "  NAME",
    "         hire: scroll to the contact form",
    "",
    "  SYNOPSIS",
    "         hire",
    "         hire levis",
  ],
};

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
  "  Levis Kibirie: Fullstack Engineer · SaaS Founder · Designer",
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

const SOCIALS_LINES = [
  "  GitHub     github.com/Levikib",
  "  LinkedIn   linkedin.com/in/levis-kibirie-6bba13344",
  "  Email      leviskibirie2110@gmail.com",
  "  WhatsApp   +254 723 819 934",
  "",
  "  Makeja Homes   makejahomes.co.ke",
  "  GhostNet       ghostnet-pi.vercel.app",
  "  Hookah         hookah-website-two.vercel.app",
];

const PROJECTS_LINES = [
  "  01  Makeja Homes         Live · SaaS         247+ tenants, KSH 1.5M/mo",
  "  02  GhostNet             Live · EdTech       13 modules, 243 lab steps, 5,450 XP",
  "  03  NSE Research Agent   In Dev · AI Tool    Nairobi Securities Exchange intel",
  "  04  ShanTech Agency      2024–25 · Agency    12+ clients, 250K+ engagements",
  "  05  Chill Minds Magazine Published · Design  2 volumes, 72 pages",
  "  06  Hookah Rental       Live · 3D           GLB hero model, 25 flavours, Paystack",
  "",
  "  Run a project name to see its stats. e.g. `ghostnet`, `makeja`, `hookah`",
];

const TIMELINE_LINES = [
  "  2017        Software Development Certificate, ICT Authority Kenya",
  "  2020        Cybersecurity & Pen Testing, Zalego Institute of Technology",
  "  2020–2024   BSc Information Technology, Kenyatta University (2nd Upper)",
  "  Apr 2022    IT Intern, Ministry of Foreign & Diaspora Affairs",
  "  May 2024    Founder, ShanTech Agency",
  "  2024        Founder, Makeja Homes",
  "  2025        Oracle Cloud AI Foundations certification",
  "  2025        Launched GhostNet",
  "  2026        Building NSE Research Agent",
];

const BEYOND_LINES = [
  "  🎌  Anime      FMA, Attack on Titan, Vinland Saga. Don't argue.",
  "  📈  Markets    NSE investor building the tool I always wished existed.",
  "  📖  Editorial  Designed Chill Minds Magazine, 72 pages, printed & distributed.",
  "  🌍  Nairobi    Proving world-class products ship from anywhere.",
];

const ABOUT_LINES = [
  "  Founding Fullstack Engineer from Nairobi, Kenya.",
  "  I build production systems that handle real money and real users,",
  "  then I make them look good.",
  "",
  "  8+ years in tech: from a first certificate in 2017, through a BSc in",
  "  IT, into founding two live products. Makeja Homes moves real rent",
  "  money every month. GhostNet teaches cybersecurity through a live,",
  "  gamified platform I built myself: backend, frontend, and the",
  "  in-app AI agent.",
  "",
  "  Also a designer. Chill Minds Magazine, 72 pages, two volumes,",
  "  100% design ownership, proves the eye isn't separate from the code.",
  "",
  "  Run `timeline` for the full journey, `stack` for the toolbox.",
];

function processCommand(raw: string, commandHistory: string[]): Line[] {
  const cmd = raw.trim().toLowerCase();
  const out: Line[] = [];

  if (cmd === "help" || cmd === "") {
    out.push({ type: "output", text: "  Available commands, grouped. Type `man <cmd>` for details on some.", color: "rgba(255,255,255,0.5)" });
    for (const g of HELP_GROUPS) {
      out.push({ type: "blank", text: "" });
      out.push({ type: "output", text: `  ${g.label}`, color: g.color });
      for (const h of g.items) {
        out.push({ type: "output", text: `    ${h.cmd.padEnd(17)}${h.desc}`, color: undefined });
      }
    }
  } else if (cmd === "makeja") {
    out.push({ type: "output", text: MAKEJA_ASCII, color: "#a855f7" });
    out.push({ type: "blank", text: "" });
    out.push({ type: "output", text: "  ● Live in production since 2024. KSH flows daily.", color: "#4ead6a" });
  } else if (cmd === "ghostnet") {
    out.push({ type: "output", text: GHOSTNET_ASCII, color: "#10b981" });
    out.push({ type: "blank", text: "" });
    out.push({ type: "output", text: "  ● Live at ghostnet-pi.vercel.app. GHOST Agent is online.", color: "#10b981" });
  } else if (cmd === "nse") {
    out.push({ type: "output", text: NSE_ASCII, color: "#d97706" });
    out.push({ type: "blank", text: "" });
    out.push({ type: "output", text: "  ● In development. Decision support, not prediction.", color: "#d97706" });
  } else if (cmd === "shantech") {
    out.push({ type: "output", text: SHANTECH_ASCII, color: "#e11d48" });
    out.push({ type: "blank", text: "" });
    out.push({ type: "output", text: "  ● Completed 2024–2025. Kenyan SMEs, measurable results.", color: "#e11d48" });
  } else if (cmd === "chillminds") {
    out.push({ type: "output", text: CHILLMINDS_ASCII, color: "#059669" });
    out.push({ type: "blank", text: "" });
    out.push({ type: "output", text: "  ● Vol. 1A & 1B published. Printed and distributed.", color: "#059669" });
  } else if (cmd === "hookah") {
    out.push({ type: "output", text: HOOKAH_ASCII, color: "#9d5cf5" });
    out.push({ type: "blank", text: "" });
    out.push({ type: "output", text: "  ● Live at hookah-website-two.vercel.app. 3D hero, live Paystack checkout.", color: "#9d5cf5" });
  } else if (cmd === "projects") {
    out.push({ type: "output", text: "  // All Projects", color: "#a855f7" });
    out.push({ type: "blank", text: "" });
    for (const l of PROJECTS_LINES) {
      out.push({ type: "output", text: l, color: l.startsWith("  Run") ? "rgba(255,255,255,0.35)" : undefined });
    }
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
  } else if (cmd === "about") {
    out.push({ type: "output", text: "  // Levis Kibirie", color: "#10b981" });
    out.push({ type: "blank", text: "" });
    for (const l of ABOUT_LINES) {
      out.push({ type: "output", text: l, color: l.startsWith("  Run") ? "rgba(255,255,255,0.35)" : undefined });
    }
  } else if (cmd === "timeline" || cmd === "journey") {
    out.push({ type: "output", text: "  // Career Timeline: 2017 → Now", color: "#0891b2" });
    out.push({ type: "blank", text: "" });
    for (const l of TIMELINE_LINES) {
      out.push({ type: "output", text: l, color: undefined });
    }
  } else if (cmd === "beyond") {
    out.push({ type: "output", text: "  // Beyond the Code", color: "#a855f7" });
    out.push({ type: "blank", text: "" });
    for (const l of BEYOND_LINES) {
      out.push({ type: "output", text: l, color: undefined });
    }
  } else if (cmd === "contact") {
    out.push({ type: "blank", text: "" });
    for (const l of CONTACT_LINES) {
      out.push({ type: "output", text: l, color: l.includes("@") || l.includes(".com") || l.includes("+254") ? "#a855f7" : undefined });
    }
  } else if (cmd === "socials" || cmd === "social" || cmd === "links") {
    out.push({ type: "output", text: "  // Find Me Online", color: "#a855f7" });
    out.push({ type: "blank", text: "" });
    for (const l of SOCIALS_LINES) {
      out.push({ type: "output", text: l, color: l.includes(".com") || l.includes(".co.ke") || l.includes("+254") ? "#4ead6a" : undefined });
    }
  } else if (cmd === "neofetch") {
    const info = [
      ["OS", "Levis Kibirie OS v2.0 (Nairobi)"],
      ["Host", "Portfolio, Next.js 14"],
      ["Uptime", "8+ years in tech"],
      ["Projects", "6 (3 live, 1 in dev, 2 completed)"],
      ["Languages", "TypeScript, Python, SQL"],
      ["Shell", "levis@portfolio:~$"],
      ["Terminal", "GhostNet-inspired, custom-built"],
      ["Stack", "Next.js · Supabase · Groq · Paystack"],
      ["Status", "● Available for work"],
    ];
    const art = [
      "    ▲    ",
      "   ▲▲▲   ",
      "  ▲▲▲▲▲  ",
      " ▲▲▲▲▲▲▲ ",
      "▲▲▲▲▲▲▲▲▲",
      "  ██ ██  ",
      "  ██ ██  ",
      "  ██ ██  ",
      "▄▄██▄██▄▄",
    ];
    const maxArt = art.length;
    for (let i = 0; i < Math.max(maxArt, info.length); i++) {
      const artPart = (art[i] ?? "").padEnd(11, " ");
      const infoPart = info[i] ? `${info[i][0].padEnd(10)}${info[i][1]}` : "";
      out.push({ type: "output", text: `  ${artPart}${infoPart}`, color: i < maxArt ? "#a855f7" : undefined });
    }
  } else if (cmd === "history") {
    if (commandHistory.length === 0) {
      out.push({ type: "output", text: "  No commands run yet.", color: "rgba(255,255,255,0.35)" });
    } else {
      out.push({ type: "output", text: "  // Command History", color: "rgba(255,255,255,0.5)" });
      out.push({ type: "blank", text: "" });
      [...commandHistory].reverse().forEach((c, i) => {
        out.push({ type: "output", text: `  ${String(i + 1).padStart(3)}  ${c}`, color: "rgba(255,255,255,0.5)" });
      });
    }
  } else if (cmd.startsWith("man ")) {
    const topic = cmd.slice(4).trim();
    const page = MAN_PAGES[topic];
    if (page) {
      for (const l of page) out.push({ type: "output", text: l, color: l.startsWith("  " + topic.toUpperCase()) ? "#4ead6a" : undefined });
    } else {
      out.push({ type: "error", text: `  No manual entry for ${topic || "(nothing)"}.`, color: "#e11d48" });
      out.push({ type: "output", text: "  Try: man makeja, man ghostnet, man hire", color: "rgba(255,255,255,0.35)" });
    }
  } else if (cmd.startsWith("echo ")) {
    out.push({ type: "output", text: `  ${raw.trim().slice(5)}`, color: "rgba(255,255,255,0.7)" });
  } else if (cmd === "clear" || cmd === "cls") {
    return [{ type: "blank", text: "__CLEAR__" }];
  } else if (cmd === "ls" || cmd === "dir") {
    out.push({ type: "output", text: "  makeja/    ghostnet/   nse-agent/   shantech/   chill-minds/   hookah/", color: "#4ead6a" });
  } else if (cmd === "pwd") {
    out.push({ type: "output", text: "  /home/levis/portfolio/projects", color: "rgba(255,255,255,0.5)" });
  } else if (cmd === "date") {
    out.push({ type: "output", text: `  ${new Date().toUTCString()}`, color: "rgba(255,255,255,0.5)" });
  } else if (cmd === "whoami --verbose" || cmd === "sudo whoami") {
    out.push({ type: "output", text: "  root", color: "#e11d48" });
    out.push({ type: "output", text: "  (you wish, try `whoami` instead)", color: "rgba(255,255,255,0.35)" });
  } else if (cmd === "sudo" || cmd.startsWith("sudo ")) {
    out.push({ type: "output", text: "  Nice try. You don't have sudo here.", color: "#e11d48" });
  } else if (cmd === "hire levis" || cmd === "hire") {
    out.push({ type: "blank", text: "" });
    out.push({ type: "output", text: "  Great choice. Scrolling to contact form...", color: "#4ead6a" });
    out.push({ type: "blank", text: "__HIRE__" });
  } else if (cmd === "exit" || cmd === "quit") {
    out.push({ type: "output", text: "  There is no exit from greatness.", color: "#d97706" });
  } else {
    out.push({ type: "error", text: `  command not found: ${cmd}, try 'help'`, color: "#e11d48" });
  }

  return out;
}

const BOOT_SEQUENCE = [
  { text: "Initializing Levis Kibirie OS v2.0...", color: "rgba(255,255,255,0.3)" },
  { text: "Loading projects: makeja ✓  ghostnet ✓  nse ✓  shantech ✓  chillminds ✓  hookah ✓", color: "#4ead6a" },
  { text: "Mounting skills: typescript ✓  nextjs ✓  supabase ✓  groq ✓", color: "#a855f7" },
  { text: "System ready. Type 'help' to get started.\n", color: "#d97706" },
];

const TAB_COMPLETE_CMDS = [
  "help","projects","makeja","ghostnet","nse","shantech","chillminds","hookah",
  "whoami","about","timeline","skills","stack","beyond",
  "contact","socials","hire levis","neofetch","history","man ",
  "clear","ls","pwd","date",
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
  const isMobile = useIsMobile();
  const monoSize = isMobile ? "11px" : "13px";
  const prompt = isMobile ? "levis:~$" : PROMPT;

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

  // Scroll only inside the output div, never the page
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const submit = useCallback(() => {
    const cmd = input.trim();
    if (!cmd) return;

    const result = processCommand(cmd, history);

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
  }, [input, history]);

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
      const match = TAB_COMPLETE_CMDS.find(c => c.startsWith(input.toLowerCase()));
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
            style={{ padding:"16px 16px 8px", minHeight: isMobile ? "200px" : "280px", maxHeight: isMobile ? "320px" : "420px", overflowY:"auto", overflowX:"auto", fontFamily:"'Courier New', monospace", fontSize:monoSize, lineHeight:"1.7", cursor:"text" }}
          >
            {visible && lines.map((l, i) => {
              if (l.type === "blank") return <div key={i} style={{ height:"4px" }} />;
              if (l.type === "input") return (
                <div key={i} style={{ display:"flex", gap:"8px", marginBottom:"2px" }}>
                  <span style={{ color:"#10b981", flexShrink:0, userSelect:"none" }}>{prompt}</span>
                  <span style={{ color:"white" }}>{l.text}</span>
                </div>
              );
              return (
                <div key={i} style={{ color: l.color ?? "rgba(255,255,255,0.65)", whiteSpace:"pre", fontFamily:"'Courier New', monospace", fontSize:monoSize }}>{l.text}</div>
              );
            })}
          </div>

          {/* Input row */}
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", padding:"10px 16px 14px", display:"flex", alignItems:"center", gap:"8px", background:"rgba(0,0,0,0.2)" }}>
            <span style={{ fontFamily:"'Courier New', monospace", fontSize:monoSize, color:"#10b981", flexShrink:0, userSelect:"none" }}>{prompt}</span>
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
                fontFamily:"'Courier New', monospace", fontSize:monoSize, color:"white",
                caretColor:"#10b981",
              }}
            />
          </div>
        </div>

        {/* Quick-fire buttons */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", marginTop:"16px" }}>
          {["help","projects","makeja","ghostnet","nse","shantech","chillminds","hookah","skills","timeline","whoami","socials","neofetch","contact"].map(cmd => (
            <button key={cmd}
              onClick={() => { setInput(cmd); setTimeout(() => { setInput(""); setLines(prev => [...prev, { type:"input", text:cmd }, ...processCommand(cmd, history), { type:"blank", text:"" }]); setHistory(prev => [cmd, ...prev.slice(0, 49)]); }, 10); }}
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
