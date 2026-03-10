import Nav from "@/components/layout/Nav";

const timeline = [
  { year: "2017", event: "Started software development formally", detail: "First certificate. First line of code that meant something.", color: "var(--purple)" },
  { year: "2020", event: "Cybersecurity & Ethical Hacking", detail: "Zalego Institute. Started thinking like an adversary.", color: "var(--forest)" },
  { year: "2022", event: "IT Intern — Ministry of Foreign Affairs", detail: "Government systems. Real stakes. Real infrastructure.", color: "var(--amber)" },
  { year: "2024", event: "Founded Makeja Homes", detail: "Built a production SaaS from scratch. 170+ units. KSH 1.5M/month.", color: "var(--purple)" },
  { year: "2024", event: "Launched ShanTech Agency", detail: "Full-service digital agency. SME growth through tech.", color: "var(--forest)" },
  { year: "2025", event: "ISC2 Certified in Cybersecurity (CC)", detail: "Global credential. Security thinking embedded in everything I build.", color: "var(--rose)" },
  { year: "2025", event: "Oracle Cloud Infrastructure AI Foundations", detail: "AI/ML fundamentals certified. Building intelligent systems.", color: "var(--amber)" },
  { year: "2026", event: "Going Global", detail: "Senior remote engineering roles. Nairobi → World.", color: "var(--purple)" },
];

const stack = [
  { category: "Frontend", items: ["TypeScript", "Next.js 14", "React", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Prisma ORM", "PostgreSQL", "REST APIs", "Webhooks"] },
  { category: "Infrastructure", items: ["VPS/Linux", "Nginx", "SSL/TLS", "Vercel", "Neon DB"] },
  { category: "Payments", items: ["Paystack API", "Webhook Verification", "Automated Billing"] },
  { category: "Design", items: ["Graphic Design", "Magazine Layout", "Brand Identity", "Typography"] },
  { category: "Security", items: ["ISC2 CC", "Ethical Hacking", "Oracle Cloud AI", "Cyber Fundamentals"] },
];

export default function About() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="pt-32 pb-24 px-8 md:px-12">

        {/* Header */}
        <div className="max-w-4xl mb-20">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--forest)", textTransform: "uppercase", marginBottom: "16px" }}>// About Me</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(48px,8vw,96px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: "32px" }}>
            The Human<br /><span style={{ color: "var(--purple)" }}>Behind the Code</span>
          </h1>
          <p style={{ fontSize: "18px", color: "var(--text-3)", lineHeight: 1.8, maxWidth: "600px" }}>
            I&apos;m Levis Kibirie — a fullstack engineer, SaaS founder, graphic designer, and creative from Nairobi, Kenya. I build systems that handle real money, design things people actually feel, and write about everything from technical deep-dives to why Attack on Titan is a masterpiece.
          </p>
        </div>

        {/* Two column — photo + bio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-start">
          <div>
            <img src="/levo.jpg" alt="Levis Kibirie" style={{ width: "100%", maxWidth: "400px", height: "480px", objectFit: "cover", objectPosition: "center 20%", borderRadius: "40% 60% 55% 45% / 45% 40% 60% 55%", boxShadow: "0 30px 80px rgba(26,92,46,0.15), 0 0 0 4px white, 0 0 0 6px rgba(124,58,237,0.2)" }} />
          </div>
          <div className="flex flex-col gap-8">
            {[
              { label: "The Engineer", color: "var(--purple)", text: "I build production systems that scale. Makeja Homes processes KSH 1.5M+ monthly through automated billing, webhooks, and a multi-tenant architecture I designed and built solo from scratch." },
              { label: "The Designer", color: "var(--forest)", text: "Design isn't decoration. I've designed full 36-page magazines, brand identities for real businesses, and digital products that communicate before a word is read. Chill Minds magazine is my proudest creative work." },
              { label: "The Human", color: "var(--amber)", text: "Nairobi-based. Forest-energy. I watch too much anime, have strong opinions about stories, and believe the best technology is built by people who also feel things deeply." },
            ].map(s => (
              <div key={s.label} className="bg-white border border-[var(--border)] p-6 rounded-sm" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", color: s.color, textTransform: "uppercase", marginBottom: "10px" }}>{s.label}</div>
                <p style={{ fontSize: "14px", color: "var(--text-3)", lineHeight: 1.8 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--purple)", textTransform: "uppercase", marginBottom: "16px" }}>// Journey</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,5vw,56px)", lineHeight: 1, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "48px" }}>8+ Years in Tech</h2>
          <div className="relative">
            <div className="absolute left-24 top-0 bottom-0 w-px bg-[var(--border)]" />
            <div className="flex flex-col gap-0">
              {timeline.map((item, i) => (
                <div key={i} className="grid grid-cols-[96px_1fr] gap-8 py-8 group">
                  <div className="text-right pr-6 pt-1 relative">
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "14px", color: item.color }}>{item.year}</div>
                    <div className="absolute right-0 top-2 w-3 h-3 rounded-full border-2 translate-x-1.5" style={{ background: "var(--bg)", borderColor: item.color }} />
                  </div>
                  <div className="pb-4 border-b border-[var(--border)] group-last:border-0">
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "18px", color: "var(--text)", marginBottom: "6px" }}>{item.event}</div>
                    <div style={{ fontSize: "13px", color: "var(--text-3)", lineHeight: 1.7 }}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stack */}
        <div className="mb-24">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--forest)", textTransform: "uppercase", marginBottom: "16px" }}>// Tech Stack</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,5vw,56px)", lineHeight: 1, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "48px" }}>What I Work With</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stack.map(s => (
              <div key={s.category} className="bg-white border border-[var(--border)] p-6 rounded-sm">
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", color: "var(--purple)", textTransform: "uppercase", marginBottom: "16px" }}>{s.category}</div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map(item => <span key={item} className="pill">{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Beyond code */}
        <div className="bg-white border border-[var(--border)] p-10 md:p-16 rounded-sm">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--amber)", textTransform: "uppercase", marginBottom: "16px" }}>// Beyond the Code</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", lineHeight: 1, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "32px" }}>Also, I&apos;m a Person</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: "📺", title: "Anime & Stories", desc: "Attack on Titan, Vinland Saga, storytelling that earns its weight." },
              { emoji: "🎬", title: "Cinema", desc: "Movies, shows, anything that moves people. Strong opinions, fully documented." },
              { emoji: "🌿", title: "Nature", desc: "Forest walks. The kind that reset your operating system." },
              { emoji: "🧠", title: "Mental Health Advocate", desc: "Chill Minds magazine started from a belief that kids deserve better." },
            ].map(item => (
              <div key={item.title} className="p-4 rounded-sm" style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{item.emoji}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "16px", color: "var(--text)", marginBottom: "8px" }}>{item.title}</div>
                <div style={{ fontSize: "13px", color: "var(--text-3)", lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
