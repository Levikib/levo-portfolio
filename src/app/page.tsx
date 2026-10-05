import Link from "next/link";
import Hero from "@/components/signal/Hero";
import SignalPath from "@/components/signal/SignalPath";
import Station from "@/components/signal/Station";
import Terminal from "@/components/sections/Terminal";
import { Star, Squiggle } from "@/components/signal/Doodles";
import { PROJECTS } from "@/data/projects";
import { SITE, waLink } from "@/data/facts";

const STEPS = [
  { n: "01 · strategy", t: "Brief to binding decisions", d: "Business, SEO, content and design plans run in parallel, then one audit reconciles them into a single decisions file." },
  { n: "02 · build", t: "Two prototypes, one direction", d: "Real prototypes are tested on cheap phones before a page ships. The loser is kept as evidence of why." },
  { n: "03 · verify", t: "Three QA gates, every round", d: "Visual, content and accessibility checks run by scripts and independent reviewers, not by opinion." },
];

export default function Home() {
  return (
    <main className="sp">
      <Hero />

      <section className="sp-wrap" aria-labelledby="path-title" style={{ paddingTop: 40 }}>
        <div style={{ textAlign: "center", position: "relative" }}>
          <div className="sp-eyebrow">$ follow --signal</div>
          <h2 id="path-title" className="sp-display sp-h2">Idea to shipped,<br />one stop at a time.</h2>
          <Star style={{ position: "absolute", top: 0, right: "12%", width: 34 }} />
        </div>
        <SignalPath>
          {PROJECTS.map((p, i) => (
            <Station key={p.slug} p={p} side={i % 2 ? "right" : "left"}>
              {p.slug === "levo-cli" ? (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 18, textAlign: "center" }}>
                  <a href="#terminal" className="sp-mono" style={{ color: "var(--sp-lime)", fontSize: 15 }}>
                    levo@nairobi:~$ <span style={{ color: "var(--sp-paper)" }}>open makeja</span>
                    <br /><span style={{ color: "var(--sp-muted)", fontSize: 12 }}>try the live terminal below ↓</span>
                  </a>
                </div>
              ) : undefined}
            </Station>
          ))}
        </SignalPath>
      </section>

      <Terminal />

      <section className="sp-section sp-wrap" aria-labelledby="build-title">
        <div className="sp-eyebrow">$ man levo-build</div>
        <h2 id="build-title" className="sp-display sp-h2">How a site gets built here.</h2>
        <Squiggle style={{ width: 140, marginTop: 10 }} />
        <div className="sp-steps">
          {STEPS.map((s) => (
            <div key={s.n} className="sp-step"><b>{s.n}</b><h3>{s.t}</h3><p>{s.d}</p></div>
          ))}
        </div>
      </section>

      <section id="contact" className="sp-wrap" style={{ paddingBottom: 110 }} aria-labelledby="contact-title">
        <div className="sp-cta">
          <div>
            <div className="sp-mono" style={{ fontSize: 14 }}>$ ./hire --levo</div>
            <h2 id="contact-title" className="sp-display" style={{ marginTop: 10 }}>Got something worth building? Let&apos;s talk this week.</h2>
            <p style={{ marginTop: 14, fontSize: 16 }}>Senior remote roles and contract builds. Replies within a day, {SITE.timezone}.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="sp-btn sp-btn--dark" href={waLink("Hi Levo, I saw your portfolio and want to talk about a project.")} target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="sp-btn sp-btn--line" href={`mailto:${SITE.email}`}>Email</a>
            <Link className="sp-btn sp-btn--line" href="/work">Case studies</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
