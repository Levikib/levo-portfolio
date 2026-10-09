import Link from "next/link";
import { ClayCard, SectionHeader, CtaBand, ClayButton } from "@/components/signal";
import { Underline, Squiggle, Star } from "@/components/signal/Doodles";
import { MAKEJA, CAREER, fmt, waLink } from "@/data/facts";
import "./about.css";

const STATS = [
  { v: fmt(MAKEJA.tenants), l: "tenants on Makeja Homes", a: "#ff8a1f" },
  { v: fmt(MAKEJA.units), l: "units managed", a: "#d4ff3a" },
  { v: fmt(CAREER.years), l: "years shipping", a: "#8b7cff" },
  { v: "12+", l: "SME clients through ShanTech", a: "#6fe7ff" },
];

const JOURNEY = [
  { year: "2017", tag: "Education", a: "#8b7cff", title: "Software Development Certificate", org: "ICT Authority Kenya", desc: "First formal grounding in software engineering. The start of everything." },
  { year: "2020", tag: "Education", a: "#6fe7ff", title: "Cybersecurity and pen testing", org: "Zalego Institute of Technology", desc: "Ethical hacking, penetration testing and security fundamentals. First security tools." },
  { year: "2020 to 2024", tag: "Education", a: "#6fe7ff", title: "BSc Information Technology", org: "Kenyatta University, Second Class Upper", desc: "Software engineering, networks, databases and systems architecture." },
  { year: "2022", tag: "Work", a: "#d4ff3a", title: "IT Intern", org: "Ministry of Foreign and Diaspora Affairs", desc: "Government infrastructure, network management and systems support." },
  { year: "2024", tag: "Founded", a: "#ff5e7a", title: "Founder, ShanTech Agency", org: "Digital agency, Kenya", desc: "12+ SME clients. Websites, funnels, ads and content that had to pay for themselves." },
  { year: "2024", tag: "Founded", a: "#ff8a1f", title: "Founder, Makeja Homes", org: "The Real Estate OS", desc: `A multi-tenant property platform built from zero. ${fmt(MAKEJA.tenants)} tenants and ${fmt(MAKEJA.units)} units on it.` },
  { year: "2025", tag: "Cert", a: "#ffc24a", title: "Oracle Cloud AI Foundations", org: "Oracle", desc: "Cloud and AI fundamentals, internationally certified." },
  { year: "2025", tag: "Built", a: "#4fe0a6", title: "Launched GhostNet", org: "Cybersecurity training platform", desc: "13 modules, 8 tools, a live leaderboard and an AI operator. Built from scratch." },
  { year: "2026", tag: "Building", a: "#8b7cff", title: "NSE Research Agent", org: "In development", desc: "AI market intelligence for the Nairobi Securities Exchange." },
];

const STACK = [
  { cat: "Frontend", a: "#8b7cff", items: ["TypeScript", "Next.js", "React", "Tailwind CSS", "GSAP"] },
  { cat: "Backend", a: "#6fe7ff", items: ["Node.js", "PostgreSQL", "Prisma", "REST APIs", "Supabase"] },
  { cat: "AI and data", a: "#d4ff3a", items: ["Python", "LLM APIs", "Groq", "Agents"] },
  { cat: "Payments", a: "#ff5e7a", items: ["Paystack", "M-Pesa Daraja", "Webhooks", "Reconciliation"] },
  { cat: "Infrastructure", a: "#ffc24a", items: ["Vercel", "Neon", "Docker", "GitHub Actions"] },
  { cat: "Design and brand", a: "#ff8a1f", items: ["Figma", "InDesign", "Typography", "Brand systems", "Veo"] },
];

const BEYOND = [
  { k: "01", title: "Anime", body: "Fullmetal Alchemist, Attack on Titan, Vinland Saga. The philosophy in these is real. Don't argue." },
  { k: "02", title: "Markets", body: "An NSE investor building the research tool he always wished existed." },
  { k: "03", title: "Editorial", body: "Designed Chill Minds Magazine, 72 pages. Printed, distributed, real." },
  { k: "04", title: "Nairobi to the world", body: "Proof that world-class products ship from anywhere. Including here." },
];

export default function About() {
  return (
    <main className="sp ab">
      <section className="sp-wrap ab-hero" aria-labelledby="about-title">
        <Star className="sp-float sp-hide-xs" style={{ position: "absolute", top: 120, right: "44%", width: 26 }} />
        <div className="ab-hero__grid">
          <div>
            <SectionHeader
              as="h1"
              id="about-title"
              eyebrow="$ whoami"
              title={<>Levis Kibirie.<br /><span className="ab-hero__alt">Call me Levo.</span></>}
              kicker="I build the product, design the brand and write the plan to sell it. Founder of Makeja Homes, The Real Estate OS. Based in Nairobi, working with anyone serious."
            />
            <Underline style={{ width: 240, height: 18, marginTop: 10 }} />
            <div className="cta-row ab-hero__ctas">
              <ClayButton href="/work" variant="primary" size="lg">See the work</ClayButton>
              <ClayButton href="/contact" variant="ghost" size="lg">Let&apos;s talk</ClayButton>
            </div>
          </div>
          <div className="ab-portrait">
            <div className="ab-portrait__frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/levo-avatar-present.webp" alt="Illustrated 3D character of Levis Kibirie presenting" width={726} height={768} />
            </div>
            <div className="sp-bubble sp-hand ab-portrait__bubble">less talk,<br />more ship.</div>
          </div>
        </div>

        <ul className="clay-grid clay-grid--4 ab-stats" style={{ listStyle: "none" }}>
          {STATS.map((s) => (
            <ClayCard as="li" key={s.l} accent={s.a} pad="sm">
              <span className="stat__bar" aria-hidden />
              <div className="stat__v">{s.v}</div>
              <div className="stat__l">{s.l}</div>
            </ClayCard>
          ))}
        </ul>
      </section>

      <section className="sp-wrap sp-section" aria-labelledby="ab-story">
        <div className="ab-story">
          <SectionHeader id="ab-story" eyebrow="$ cat story.md" title="The short version." />
          <div className="ab-story__body">
            <p>I started writing software in 2017 and never found a reason to stop. A degree in IT, a detour through security, then the part that actually taught me: shipping for clients who only paid when it worked.</p>
            <p>ShanTech Agency put me in front of 12+ Kenyan businesses that needed sites, ads and funnels to pay for themselves. Makeja Homes came from watching a property manager drown in paper leases, cash rent and missing records. So I built the system that fixes it.</p>
            <p>Today I run both sides of the table. The code, and the brand, positioning and growth plan around it. That is the whole point: no handoff where the idea gets lost.</p>
          </div>
        </div>
      </section>

      <section className="sp-wrap sp-section" aria-labelledby="ab-path">
        <SectionHeader id="ab-path" eyebrow="$ git log --reverse" title="How I got here." />
        <ol className="ab-path">
          {JOURNEY.map((j) => (
            <li key={j.title} className="ab-path__item" style={{ ["--accent" as string]: j.a }}>
              <span className="ab-path__node" aria-hidden />
              <ClayCard accent={j.a} pad="md" className="ab-path__card">
                <div className="clay-kicker"><span className="badge">{j.year}</span><span>{j.tag}</span></div>
                <h3 className="ab-path__title">{j.title}</h3>
                <div className="ab-path__org">{j.org}</div>
                <p className="clay-body">{j.desc}</p>
              </ClayCard>
            </li>
          ))}
        </ol>
      </section>

      <section className="sp-wrap sp-section" aria-labelledby="ab-stack">
        <SectionHeader id="ab-stack" eyebrow="$ cat package.json" title="The toolkit." kicker="Engineering on one hand, brand and design on the other. Same person, same standard." />
        <div className="clay-grid clay-grid--3 ab-stack">
          {STACK.map((s) => (
            <ClayCard key={s.cat} accent={s.a} pad="md">
              <div className="clay-kicker"><span className="ab-dot" style={{ background: s.a }} aria-hidden />{s.cat}</div>
              <div className="sp-chips" style={{ marginTop: 12 }}>
                {s.items.map((t) => <span key={t} className="sp-chip">{t}</span>)}
              </div>
            </ClayCard>
          ))}
        </div>
      </section>

      <section className="sp-wrap sp-section" aria-labelledby="ab-beyond">
        <Squiggle className="sp-hide-xs" style={{ position: "absolute", right: 0, top: 40, width: 140 }} />
        <SectionHeader id="ab-beyond" eyebrow="$ ls ~/beyond-the-code" title="Who I actually am." kicker={<>The opinions live in <Link href="/thoughts" className="ab-link">Takes</Link>. The rest is here.</>} />
        <div className="clay-grid clay-grid--4 ab-beyond">
          {BEYOND.map((b) => (
            <ClayCard key={b.title} pad="md">
              <div className="clay-kicker"><span className="badge">{b.k}</span></div>
              <h3 className="ab-path__title">{b.title}</h3>
              <p className="clay-body">{b.body}</p>
            </ClayCard>
          ))}
        </div>
      </section>

      <section className="sp-wrap sp-section" aria-label="Two sides">
        <div className="clay-grid clay-grid--2">
          <ClayCard href="/work" accent="#ff8a1f" pad="lg" aria-label="Technical case studies">
            <div className="clay-kicker"><span className="badge">01</span><span>Technical</span></div>
            <h3 className="clay-title">The builds</h3>
            <p className="clay-body">Architecture, decisions, real code and what I would do next.</p>
          </ClayCard>
          <ClayCard href="/creative" accent="#8b7cff" pad="lg" aria-label="Creative and strategy work">
            <div className="clay-kicker"><span className="badge">02</span><span>Creative and strategy</span></div>
            <h3 className="clay-title">The brand, the plan, the growth</h3>
            <p className="clay-body">Design, positioning and the strategy that sells what gets built.</p>
          </ClayCard>
        </div>
      </section>

      <section className="sp-wrap" style={{ paddingBottom: 96 }}>
        <CtaBand title="Open to the right room." body="Senior remote roles, serious builds, partners and investors. Replies within a day.">
          <ClayButton variant="dark" size="lg" href="/contact">Start a conversation</ClayButton>
          <ClayButton variant="ghost" size="lg" href={waLink("Hi Levo, I just read your About page.")} external>WhatsApp</ClayButton>
        </CtaBand>
      </section>
    </main>
  );
}
