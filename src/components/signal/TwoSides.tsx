import "./two-sides.css";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { EDITORIAL } from "@/data/editorial";
import { CREATIVE_SECTIONS } from "@/data/creative";
import SectionHeader from "./SectionHeader";

const pages = EDITORIAL.reduce((n, i) => n + [i.cover, ...(i.gallery ?? [])].reduce((m, x) => m + (x.type === "pages" ? x.count : 0), 0), 0);

const TECH_POINTS = ["Multi-tenant SaaS and data isolation", "Payments, tax and accounting integrations", "AI assistants wired to live data"];
const TECH_CHIPS = ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Groq"];

/** Home entry point: the two sides of the work, plus Takes. Server rendered. */
export default function TwoSides() {
  return (
    <section className="sp-section sp-wrap two" aria-labelledby="two-title">
      <SectionHeader
        eyebrow="$ ls ./levo --sides"
        id="two-title"
        title="Two sides. One standard."
        kicker="I build the product, then I make it look right and get it in front of the people who need it."
      />

      <div className="two__grid">
        <Link href="/work" className="two-card two-card--tech" aria-labelledby="two-tech-t" aria-describedby="two-tech-d">
          <span className="two-card__top">
            <span className="two-card__tag">$ side --technical</span>
            <span className="two-card__count"><b>{PROJECTS.length}</b> case studies</span>
          </span>
          <span className="two-card__glyph" aria-hidden>{"</>"}</span>
          <h3 id="two-tech-t" className="two-card__title">Technical</h3>
          <p id="two-tech-d" className="two-card__body">Products and client builds taken from schema to launch, with the architecture, decisions and real code on show.</p>
          <ul className="two-card__list">
            {TECH_POINTS.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <span className="two-card__foot">
            <span className="two-card__chips" aria-hidden>{TECH_CHIPS.map((c) => <span key={c}>{c}</span>)}</span>
            <span className="two-card__go">See the work<i aria-hidden>→</i></span>
          </span>
        </Link>

        <Link href="/creative" className="two-card two-card--creative" aria-labelledby="two-cr-t" aria-describedby="two-cr-d">
          <span className="two-card__top">
            <span className="two-card__tag">$ side --creative</span>
            <span className="two-card__count"><b>{EDITORIAL.length}</b> pieces · <b>{pages}</b> pages</span>
          </span>
          <span className="two-card__glyph" aria-hidden>✦</span>
          <h3 id="two-cr-t" className="two-card__title">Creative &amp; Strategy</h3>
          <p id="two-cr-d" className="two-card__body">Brand systems, design and motion, positioning and growth. Knowing what to build and how to sell it.</p>
          <ul className="two-card__list">
            {CREATIVE_SECTIONS.slice(1).map((s) => <li key={s.id}>{s.label}: {s.blurb.charAt(0).toLowerCase() + s.blurb.slice(1)}</li>)}
          </ul>
          <span className="two-card__foot">
            <span className="two-card__chips" aria-hidden>{CREATIVE_SECTIONS.map((s) => <span key={s.id}>{s.label}</span>)}</span>
            <span className="two-card__go">See this side<i aria-hidden>→</i></span>
          </span>
        </Link>

        <Link href="/thoughts" className="two-takes" aria-labelledby="two-tk-t">
          <span className="two-takes__tag">$ cat ./takes</span>
          <span className="two-takes__copy">
            <h3 id="two-tk-t" className="two-takes__title">Takes</h3>
            <span className="two-takes__body">Opinions on building, business and Nairobi tech.</span>
          </span>
          <span className="two-card__go">Read the takes<i aria-hidden>→</i></span>
        </Link>
      </div>
    </section>
  );
}
