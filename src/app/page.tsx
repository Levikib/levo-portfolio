import Hero from "@/components/signal/Hero";
import SignalPath from "@/components/signal/SignalPath";
import Station from "@/components/signal/Station";
import Terminal from "@/components/sections/Terminal";
import { ClayCard, ClayButton, SectionHeader } from "@/components/signal";
import { Star, Squiggle } from "@/components/signal/Doodles";
import TwoSides from "@/components/signal/TwoSides";
import { PROJECTS } from "@/data/projects";
import { SITE, waLink } from "@/data/facts";
import LeadForm from "@/components/contact/LeadForm";

const STEPS = [
  { n: "1", a: "#ff8a1f", k: "strategy", t: "Brief to binding decisions", d: "Business, SEO, content and design plans run in parallel, then one audit reconciles them into a single decisions file." },
  { n: "2", a: "#d4ff3a", k: "build", t: "Two prototypes, one direction", d: "Real prototypes are tested on cheap phones before a page ships. The loser is kept as evidence of why." },
  { n: "3", a: "#8b7cff", k: "verify", t: "Three QA gates, every round", d: "Visual, content and accessibility checks run by scripts and independent reviewers, not by opinion." },
];

export default function Home() {
  return (
    <main className="sp">
      <Hero />

      <section className="sp-wrap" aria-labelledby="path-title" style={{ paddingTop: 112 }}>
        <div style={{ position: "relative" }}>
          <SectionHeader
            align="center"
            eyebrow="$ follow --signal"
            id="path-title"
            title={<>Idea to shipped,<br />one stop at a time.</>}
            kicker={`${PROJECTS.length} builds, each lit as the signal reaches it. Every stop opens into a full case study.`}
          />
          <Star className="sp-hide-xs" style={{ position: "absolute", top: 0, right: "10%", width: 34 }} />
        </div>
        <SignalPath>
          {PROJECTS.map((p, i) => (
            <Station key={p.slug} p={p} side={i % 2 ? "right" : "left"} />
          ))}
          <div className="sp-path__end">
            <div className="cta-row" style={{ justifyContent: "center" }}>
              <ClayButton href="/work" variant="signal" size="lg">Browse every case study</ClayButton>
              <ClayButton href="#contact" variant="ghost" size="lg">Start a conversation</ClayButton>
            </div>
          </div>
        </SignalPath>
      </section>
      <TwoSides />

      <section className="sp-section sp-wrap" aria-labelledby="term-title" style={{ paddingBottom: 40 }}>
        <SectionHeader
          eyebrow="$ ./levo-cli"
          id="term-title"
          title="Drive the site from a shell."
          kicker="A real command parser that reads the same facts file as every page. Type help to see the commands, use the arrow keys for history and Tab to complete."
          note="it works!"
        />
      </section>
      <div className="sp-term-shell sp-wrap">
        <Terminal />
      </div>
      <div className="sp-wrap">
        <div className="sp-section__cta" style={{ marginTop: 24 }}>
          <p>Prefer reading to typing? The full builds are one click away.</p>
          <ClayButton href="/work/levo-cli" variant="ghost">How the terminal is built</ClayButton>
        </div>
      </div>

      <section className="sp-section sp-wrap" aria-labelledby="build-title">
        <SectionHeader eyebrow="$ man levo-build" id="build-title" title="How a site gets built here." />
        <Squiggle style={{ width: 140, marginTop: 14 }} />
        <ol className="clay-grid clay-grid--3" style={{ listStyle: "none", marginTop: 40 }}>
          {STEPS.map((s) => (
            <ClayCard as="li" key={s.n} accent={s.a} pad="lg">
              <div className="clay-kicker"><span className="step__no">{s.n}</span><span>{s.k}</span></div>
              <h3 className="clay-title step__title" style={{ fontSize: 26, marginTop: 22 }}>{s.t}</h3>
              <p className="clay-body">{s.d}</p>
            </ClayCard>
          ))}
        </ol>
        <div className="sp-section__cta">
          <p>Need a site that takes real orders? This is the process you get.</p>
          <ClayButton href={waLink("Hi Levo, I want to talk about a build.")} external variant="primary">Talk about a build</ClayButton>
        </div>
      </section>

      <section id="contact" className="sp-wrap lf-home" style={{ paddingBottom: 112 }} aria-labelledby="contact-title">
        <div className="lf-home__intro">
          <SectionHeader
            eyebrow="$ ./contact --levo"
            id="contact-title"
            title="Got something worth building? Tell me."
            kicker={`Clients, recruiters, partners, investors, press. Pick your lane, answer a few sharp questions, and get a reply within a day, ${SITE.timezone}.`}
          />
          <div className="lf-home__direct">
            <span className="sp-eyebrow">Rather skip the form?</span>
            <div className="cta-row">
              <ClayButton variant="ghost" href={waLink("Hi Levo, I saw your portfolio and want to talk.")} external>WhatsApp</ClayButton>
              <ClayButton variant="ghost" href={`mailto:${SITE.email}`} icon="@">Email</ClayButton>
              <ClayButton variant="ghost" href={SITE.linkedin} external>LinkedIn</ClayButton>
            </div>
          </div>
        </div>
        <ClayCard pad="lg" className="lf-home__card" accent="#d4ff3a">
          <LeadForm compact source="home" />
        </ClayCard>
      </section>
    </main>
  );
}
