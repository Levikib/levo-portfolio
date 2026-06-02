const items = [
  { text:"TypeScript",       color:"#0ea5e9" },{ text:"·",color:"rgba(3,105,161,0.3)" },
  { text:"Next.js 14",       color:"#06b6d4" },{ text:"·",color:"rgba(3,105,161,0.3)" },
  { text:"SaaS Founder",     color:"#7c3aed" },{ text:"·",color:"rgba(3,105,161,0.3)" },
  { text:"Paystack",         color:"#0369a1" },{ text:"·",color:"rgba(3,105,161,0.3)" },
  { text:"PostgreSQL",       color:"#0ea5e9" },{ text:"·",color:"rgba(3,105,161,0.3)" },
  { text:"Makeja Homes",     color:"#7c3aed" },{ text:"·",color:"rgba(3,105,161,0.3)" },
  { text:"GhostNet",         color:"#06b6d4" },{ text:"·",color:"rgba(3,105,161,0.3)" },
  { text:"Akili Markets",    color:"#f59e0b" },{ text:"·",color:"rgba(3,105,161,0.3)" },
  { text:"Three.js / R3F",   color:"#0ea5e9" },{ text:"·",color:"rgba(3,105,161,0.3)" },
  { text:"Nairobi → World",  color:"#0369a1" },{ text:"·",color:"rgba(3,105,161,0.3)" },
  { text:"Groq llama-3.3",   color:"#a855f7" },{ text:"·",color:"rgba(3,105,161,0.3)" },
  { text:"FastAPI",          color:"#06b6d4" },{ text:"·",color:"rgba(3,105,161,0.3)" },
  { text:"Binance Futures",  color:"#f59e0b" },{ text:"·",color:"rgba(3,105,161,0.3)" },
];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div style={{
      position: "relative", zIndex: 10, overflow: "hidden",
      borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
      padding: "14px 0",
      background: "linear-gradient(135deg, rgba(240,248,255,0.95) 0%, rgba(224,242,254,0.95) 100%)",
      backdropFilter: "blur(8px)",
    }}>
      {/* Water shimmer overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, var(--bg) 0%, transparent 8%, transparent 92%, var(--bg) 100%)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ display: "flex", width: "max-content", animation: "marquee 32s linear infinite" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            padding: "0 20px", whiteSpace: "nowrap",
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
            color: item.color,
          }}>{item.text}</span>
        ))}
      </div>
    </div>
  );
}
