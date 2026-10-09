import { ROUTE_META } from "@/lib/seo-routes";
import type { Metadata } from "next";
import "../editorial.css";
import "./creative.css";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { EDITORIAL, type EditorialItem } from "@/data/editorial";
import { SITE, waLink } from "@/data/facts";
import { BRAND_SYSTEMS, CREATIVE_HERO, CREATIVE_SECTIONS, DESIGN_PICKS, GROWTH, PRINCIPLES, STRATEGY } from "@/data/creative";
import { ClayButton, ClayCard, CtaBand, SectionHeader } from "@/components/signal";
import EdCard from "@/components/editorial/EdCard";

const TITLE = "Creative & Strategy: brand, design and business strategy";
const DESC = "The other half of the work: brand systems, design and motion, business strategy and growth by Levis Kibirie, for Makeja Homes, ShanTech Agency clients and more.";

export const metadata: Metadata = ROUTE_META.creative;

const v = (o: Record<string, string | number>) => o as CSSProperties;
const sectionOf = (id: string) => CREATIVE_SECTIONS.find((s) => s.id === id)!;

export default function CreativePage() {
  const picks = DESIGN_PICKS.map((s) => EDITORIAL.find((i) => i.slug === s)).filter((i): i is EditorialItem => !!i);
  const pages = EDITORIAL.reduce((n, i) => n + [i.cover, ...(i.gallery ?? [])].reduce((m, x) => m + (x.type === "pages" ? x.count : 0), 0), 0);
  const brands = new Set(EDITORIAL.map((i) => i.client).filter((c) => c !== "Various" && c !== "Personal")).size;

  const index = CREATIVE_SECTIONS.map((s) => ({ ...s, anchor: `#${s.id}` }));

  return (
    <main className="sp cr" style={{ minHeight: "100vh" }}>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="sp-wrap cr-hero" aria-labelledby="cr-h1">
        <div className="cr-hero__grid">
          <header className="cr-hero__copy">
            <div className="shead__eyebrow"><span className="shead__dot" aria-hidden />{CREATIVE_HERO.eyebrow}</div>
            <h1 id="cr-h1" className="cr-hero__title">
              {CREATIVE_HERO.title}
              <span className="cr-hero__sub">{CREATIVE_HERO.subtitle}</span>
            </h1>
            <p className="cr-hero__kicker">{CREATIVE_HERO.kicker}</p>
            <div className="cta-row cr-hero__ctas">
              <ClayButton variant="signal" size="lg" href="/contact">Let&apos;s talk</ClayButton>
              <ClayButton variant="ghost" size="lg" href="#brand" icon="↓">See the work</ClayButton>
            </div>
          </header>

          <aside className="cr-hero__side" aria-label="At a glance">
            <dl className="cr-stats">
              <div className="well"><dt>editorial pieces</dt><dd>{EDITORIAL.length}</dd></div>
              <div className="well"><dt>magazine pages</dt><dd>{pages}</dd></div>
              <div className="well"><dt>brands in the gallery</dt><dd>{brands}</dd></div>
              <div className="well"><dt>SME clients, ShanTech</dt><dd>12+</dd></div>
            </dl>
            <span className="cr-hero__note sp-hand" aria-hidden>both halves, one person</span>
          </aside>
        </div>

        <nav className="cr-index" aria-label="On this page">
          {index.map((s, i) => (
            <a key={s.id} href={s.anchor} className="cr-index__item" style={v({ "--acc": s.accent })}>
              <span className="cr-index__n">0{i + 1}</span>
              <span className="cr-index__glyph" aria-hidden>{s.glyph}</span>
              <span className="cr-index__label">{s.label}</span>
            </a>
          ))}
        </nav>
      </section>

      {/* ─── Design & Motion ──────────────────────────────────────────────── */}
      <section id="design" className="sp-section sp-wrap cr-sec" aria-labelledby="cr-design" style={v({ "--acc": sectionOf("design").accent })}>
        <SectionHeader
          eyebrow="$ ls ./editorial --featured"
          id="cr-design"
          title="Design & Motion."
          kicker="Magazines laid out page by page, launch films directed for real products, and campaign art that ships. Every piece was made for a real brand."
        />
        <ul className="ed-grid cr-design__grid" role="list">
          {picks.map((item) => (
            <li key={item.slug}><EdCard item={item} /></li>
          ))}
        </ul>
        <div className="sp-section__cta">
          <p>{EDITORIAL.length} pieces in the gallery: magazines, films, identities, posters and proposals.</p>
          <ClayButton href="/editorial" variant="ghost">Open the Editorial gallery</ClayButton>
        </div>
      </section>

      {/* ─── Brand systems ────────────────────────────────────────────────── */}
      <section id="brand" className="sp-section sp-wrap cr-sec" aria-labelledby="cr-brand">
        <SectionHeader
          eyebrow="$ cat ./brands/*.system"
          id="cr-brand"
          title="Brand systems that hold up."
          kicker="A logo is a file. A brand system is the set of decisions that makes a poster, a dashboard and a WhatsApp message all feel like the same company."
          note="taste is a system"
        />
        <ul className="cr-brands" role="list">
          {BRAND_SYSTEMS.map((b, i) => (
            <li key={b.name} className={i === 0 ? "cr-brands__lead" : undefined}>
              <ClayCard href={b.href} accent={b.accent} pad="none" className="cr-brand" aria-label={`${b.name}: ${b.cta}`}>
                <span className={`cr-media cr-media--${b.image.fit ?? "cover"}`}>
                  {b.image.fit === "contain" && <Image className="cr-media__blur" src={b.image.src} alt="" fill sizes="200px" aria-hidden />}
                  <Image className="cr-media__img" src={b.image.src} alt={b.image.alt} fill sizes={i === 0 ? "(max-width: 900px) 92vw, 640px" : "(max-width: 900px) 92vw, 400px"} />
                </span>
                <span className="cr-brand__body">
                  <span className="clay-kicker"><span className="clay-accent">●</span>{b.tag}</span>
                  <h3 className="clay-title cr-brand__name">{b.name}</h3>
                  <span className="clay-body cr-brand__what">{b.what}</span>
                  <ul className="cr-points">
                    {b.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                  <span className="clay-foot"><span className="clay-fake-btn" aria-hidden>{b.cta}<i>→</i></span></span>
                </span>
              </ClayCard>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── Business strategy ────────────────────────────────────────────── */}
      <section id="strategy" className="sp-section sp-wrap cr-sec" aria-labelledby="cr-strategy">
        <div className="cr-strategy">
          <div className="cr-strategy__lead">
            <SectionHeader eyebrow={STRATEGY.eyebrow} id="cr-strategy" title={STRATEGY.title} kicker={STRATEGY.kicker} />
            <div className="cr-os" aria-label="Makeja Homes positioning">
              <span className="cr-os__tag">Makeja Homes</span>
              <p className="cr-os__title">The Real Estate OS.</p>
              <p className="cr-os__line">One platform for everything property.</p>
              <div className="cr-os__pillars" aria-label="Three pillars">
                <span>Manage</span><span>Find</span><span>Build</span>
              </div>
            </div>
          </div>
          <ol className="cr-moves">
            {STRATEGY.moves.map((m) => (
              <ClayCard as="li" key={m.n} pad="lg" accent="#d4ff3a" className="cr-move">
                <span className="cr-move__n" aria-hidden>{m.n}</span>
                <h3 className="clay-title cr-move__title">{m.title}</h3>
                <p className="clay-body">{m.body}</p>
              </ClayCard>
            ))}
          </ol>
        </div>
        <div className="sp-section__cta">
          <p>The engineering behind the same product is a full case study.</p>
          <ClayButton href="/work/makeja-homes" variant="ghost">Read the Makeja case study</ClayButton>
        </div>
      </section>

      {/* ─── Growth & marketing ───────────────────────────────────────────── */}
      <section id="growth" className="sp-section sp-wrap cr-sec" aria-labelledby="cr-growth">
        <SectionHeader eyebrow={GROWTH.eyebrow} id="cr-growth" title={GROWTH.title} kicker={GROWTH.kicker} />
        <ul className="cr-growth" role="list">
          {GROWTH.items.map((g, i) => (
            <ClayCard as="li" key={g.title} pad="lg" accent={["#6fe7ff", "#ff8a1f", "#d4ff3a", "#8b7cff"][i % 4]} className="cr-grow">
              <span className="clay-kicker"><span className="cr-grow__tag clay-accent">#{g.tag}</span></span>
              <h3 className="clay-title cr-grow__title">{g.title}</h3>
              <p className="clay-body">{g.body}</p>
            </ClayCard>
          ))}
        </ul>
        <div className="sp-section__cta">
          <p>See the films, posters and identities this produced.</p>
          <ClayButton href="/editorial?kind=social" variant="ghost">Social and motion work</ClayButton>
        </div>
      </section>

      {/* ─── How I think ──────────────────────────────────────────────────── */}
      <section className="sp-wrap cr-think" aria-labelledby="cr-think">
        <Link href="/thoughts" className="cr-think__slab">
          <span className="cr-think__head">
            <span className="cr-think__eyebrow">$ how --i-think</span>
            <h2 id="cr-think" className="cr-think__title">How I think</h2>
          </span>
          <ul className="cr-think__list">
            {PRINCIPLES.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <span className="cr-think__go">Read the takes<i aria-hidden>→</i></span>
        </Link>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section className="sp-wrap cr-end" aria-labelledby="cr-cta">
        <CtaBand
          id="cr-cta"
          tone="violet"
          eyebrow="$ ./hire --both-halves"
          title="Need the product built and sold?"
          body={`Brand, positioning and launch content for products that also need serious engineering. One person, both halves. Replies within a day, ${SITE.timezone}.`}
        >
          <ClayButton variant="dark" size="lg" href="/contact">Let&apos;s talk</ClayButton>
          <ClayButton variant="ghost" size="lg" href={waLink("Hi Levo, I saw your Creative & Strategy page and want to talk.")} external>WhatsApp</ClayButton>
          <ClayButton variant="ghost" size="lg" href="/work">Technical side</ClayButton>
        </CtaBand>
      </section>
    </main>
  );
}
