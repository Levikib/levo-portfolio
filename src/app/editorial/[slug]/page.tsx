import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import "../../editorial.css";
import { EDITORIAL, EDITORIAL_KINDS } from "@/data/editorial";
import type { Media } from "@/data/editorial";
import { SITE, waLink } from "@/data/facts";
import { ClayButton, ClayCard, CtaBand } from "@/components/signal";
import Frame from "@/components/editorial/Frame";
import EdCard from "@/components/editorial/EdCard";
import { KIND_META, clip, mediaCount, pageSrc, stillOf, volOf } from "@/components/editorial/meta";

const get = (slug: string) => EDITORIAL.find((i) => i.slug === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return EDITORIAL.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = get(params.slug);
  if (!item) return {};
  const og = stillOf(item.cover);
  const title = `${item.title}, ${KIND_META[item.kind].label.toLowerCase()} for ${item.client}`;
  const description = clip(item.blurb);
  const url = `${SITE.url}/editorial/${item.slug}`;
  const images = og ? [{ url: og.src, width: og.w, height: og.h, alt: item.title }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${item.title} | Levis Kibirie`, description, url, images },
    twitter: { card: "summary_large_image", title: `${item.title} | Levis Kibirie`, description, images: og ? [og.src] : undefined },
  };
}

function PageGrid({ m, title }: { m: Extract<Media, { type: "pages" }>; title: string }) {
  const vol = volOf(m);
  return (
    <div>
      <div className="ed-pages__head">
        <p className="ed-pages__note">All {m.count} pages. Tap any page to open the reader there.</p>
        <ClayButton variant="violet" href={`/editorial/read/${vol}`}>Open the reader</ClayButton>
      </div>
      <ol className="ed-pages" role="list">
        {Array.from({ length: m.count }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            <Link href={`/editorial/read/${vol}?p=${n}`} className="ed-page" aria-label={`${title}, open page ${n} in the reader`}>
              <Image src={pageSrc(m, n)} alt="" width={m.w} height={m.h} sizes="(max-width: 700px) 30vw, 140px" loading="lazy" />
              <span className="ed-page__n" aria-hidden>{String(n).padStart(2, "0")}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function EditorialItemPage({ params }: { params: { slug: string } }) {
  const item = get(params.slug);
  if (!item) notFound();
  const k = KIND_META[item.kind];
  const idx = EDITORIAL.indexOf(item);
  const prev = EDITORIAL[(idx - 1 + EDITORIAL.length) % EDITORIAL.length];
  const next = EDITORIAL[(idx + 1) % EDITORIAL.length];
  const gallery = item.gallery ?? [];
  const pageSets = [item.cover, ...gallery].filter((m): m is Extract<Media, { type: "pages" }> => m.type === "pages");
  const visuals = gallery.filter((m): m is Exclude<Media, { type: "pages" }> => m.type !== "pages");
  const related = [
    ...EDITORIAL.filter((i) => i !== item && i.kind === item.kind),
    ...EDITORIAL.filter((i) => i !== item && i.kind !== item.kind && i.client === item.client),
  ].filter((i) => i !== prev && i !== next).slice(0, 3);
  const stageTall = item.cover.w / item.cover.h < 1.2;

  return (
    <main className="sp ed" style={{ minHeight: "100vh", "--accent": k.accent } as CSSProperties}>
      <article>
        <header className="sp-wrap ed-detail__hero">
          <nav aria-label="Breadcrumb" className="ed-crumbs">
            <Link href="/editorial">Editorial</Link>
            <span aria-hidden>/</span>
            <Link href={`/editorial?kind=${item.kind}`}>{EDITORIAL_KINDS.find((x) => x.id === item.kind)?.label}</Link>
          </nav>
          <div className={`ed-detail__grid${stageTall ? " ed-detail__grid--tall" : ""}`}>
            <div className="ed-detail__copy">
              <div className="ed-card__meta">
                <span className="ed-badge" style={{ "--accent": k.accent } as CSSProperties}>{k.label}</span>
                <span className="ed-card__client">{item.client} · {item.year}</span>
              </div>
              <h1 className="ed-detail__title">{item.title}</h1>
              <p className="ed-detail__blurb">{item.blurb}</p>
              <dl className="ed-detail__meta">
                <div className="well"><dt>Client</dt><dd>{item.client}</dd></div>
                <div className="well"><dt>Year</dt><dd>{item.year}</dd></div>
                <div className="well"><dt>Kind</dt><dd>{k.label}</dd></div>
                <div className="well"><dt>{item.tools.length ? "Tools" : "Media"}</dt><dd>{item.tools.length ? item.tools.join(", ") : mediaCount(item)}</dd></div>
                {item.price && <div className="well"><dt>Price</dt><dd>{item.price}</dd></div>}
              </dl>
              <div className="cta-row ed-detail__ctas">
                {item.cta ? (
                  <ClayButton variant="primary" size="lg" href={item.cta.href}>{item.cta.label}</ClayButton>
                ) : (
                  <ClayButton variant="primary" size="lg" href={waLink(`Hi Levo, I saw "${item.title}" on your site and want something like it.`)} external>Want one like this?</ClayButton>
                )}
                {(visuals.length > 0 || pageSets.length > 0) && <ClayButton variant="ghost" size="lg" href="#gallery" icon="↓">Gallery</ClayButton>}
              </div>
            </div>
            <div className="ed-stage">
              <ClayCard pad="none" elevation="raised" accent={k.accent} className="ed-stage__card">
                <Frame media={item.cover} title={item.title} ratio="natural" mode="stage" priority sizes="(max-width: 900px) 92vw, 720px" />
              </ClayCard>
            </div>
          </div>
        </header>

        {(visuals.length > 0 || pageSets.length > 0) && (
          <section id="gallery" className="sp-wrap ed-gallery" aria-labelledby="ed-gallery-h">
            <h2 id="ed-gallery-h" className="ed-h2">Gallery</h2>
            {pageSets.map((m) => <PageGrid key={m.folder} m={m} title={item.title} />)}
            {visuals.length > 0 && (
              <ul className={`ed-gallery__grid${visuals.length === 1 ? " ed-gallery__grid--one" : ""}`} role="list">
                {visuals.map((m) => (
                  <li key={m.src}>
                    <ClayCard as="figure" pad="none" accent={k.accent} className="ed-gallery__item">
                      <Frame media={m} title={item.title} ratio="natural" mode="stage" sizes="(max-width: 900px) 92vw, 600px" />
                      <figcaption>{m.alt}</figcaption>
                    </ClayCard>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {related.length > 0 && (
          <section className="sp-wrap ed-related" aria-labelledby="ed-related-h">
            <div className="ed-featured__head">
              <h2 id="ed-related-h" className="ed-h2">More like this</h2>
              <ClayButton variant="ghost" href={`/editorial?kind=${item.kind}`}>All {EDITORIAL_KINDS.find((x) => x.id === item.kind)?.label.toLowerCase()}</ClayButton>
            </div>
            <ul className="ed-grid" role="list">
              {related.map((r) => <li key={r.slug}><EdCard item={r} /></li>)}
            </ul>
          </section>
        )}

        <nav className="sp-wrap ed-pn" aria-label="More editorial work">
          <ClayCard href={`/editorial/${prev.slug}`} accent={KIND_META[prev.kind].accent} className="ed-pn__card" aria-label={`Previous: ${prev.title}`}>
            <span className="clay-kicker">← Previous · {KIND_META[prev.kind].label}</span>
            <span className="ed-pn__title">{prev.title}</span>
          </ClayCard>
          <ClayCard href={`/editorial/${next.slug}`} accent={KIND_META[next.kind].accent} className="ed-pn__card ed-pn__card--next" aria-label={`Next: ${next.title}`}>
            <span className="clay-kicker">Next · {KIND_META[next.kind].label} →</span>
            <span className="ed-pn__title">{next.title}</span>
          </ClayCard>
        </nav>
      </article>

      <section className="sp-wrap ed-end" aria-labelledby="ed-cta">
        <CtaBand
          id="ed-cta"
          tone="lime"
          eyebrow="$ ./commission --design"
          title="Need design like this?"
          body="Design and build from one person, so the brand and the product never drift apart."
        >
          <ClayButton variant="dark" size="lg" href={waLink(`Hi Levo, I saw "${item.title}" and need design like this.`)} external>WhatsApp</ClayButton>
          <ClayButton variant="ghost" size="lg" href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Design like ${item.title}`)}`} icon="@">Email</ClayButton>
          <ClayButton variant="ghost" size="lg" href="/editorial">All editorial</ClayButton>
        </CtaBand>
      </section>
    </main>
  );
}

