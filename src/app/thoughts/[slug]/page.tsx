import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import "../../editorial.css";
import { SUBSTACK_URL, THOUGHTS } from "@/data/thoughts";
import type { Block } from "@/data/thoughts";
import { SITE, waLink } from "@/data/facts";
import { ClayButton, ClayCard, CtaBand } from "@/components/signal";
import { TOPIC_META, clip, fmtDate, published, subscribeHref } from "@/components/editorial/meta";

const posts = () => published(THOUGHTS);
const get = (slug: string) => posts().find((t) => t.slug === slug);

/** Only published posts get a route. With zero posts this returns [] and every slug 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return posts().map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const t = get(params.slug);
  if (!t) return {};
  const url = `${SITE.url}/thoughts/${t.slug}`;
  const description = clip(t.dek);
  const images = t.cover ? [{ url: t.cover.src, width: t.cover.w, height: t.cover.h, alt: t.cover.alt }] : [{ url: "/og-image.png", width: 1200, height: 630 }];
  return {
    title: t.title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", title: t.title, description, url, publishedTime: t.date, authors: [SITE.name], images },
    twitter: { card: "summary_large_image", title: t.title, description, images: images.map((i) => i.url) },
  };
}

function Render({ b, accent, i }: { b: Block; accent: string; i: number }) {
  switch (b.t) {
    case "p":
      return <p>{b.text}</p>;
    case "h":
      return <h2 id={`s-${i}`}>{b.text}</h2>;
    case "quote":
      return (
        <ClayCard as="figure" accent={accent} pad="lg" className="th-quote">
          <blockquote><p>{b.text}</p></blockquote>
          {b.by && <figcaption>{b.by}</figcaption>}
        </ClayCard>
      );
    case "list":
      return <ul className="cs-list th-list">{b.items.map((x, j) => <li key={j}>{x}</li>)}</ul>;
    case "code":
      return (
        <ClayCard as="figure" accent={accent} pad="none" className="cs-code th-code">
          <div className="cs-code__head"><span><span className="cs-code__dots" aria-hidden><i /><i /><i /></span>{b.lang}</span></div>
          <pre className="well" tabIndex={0} aria-label={`${b.lang} code`}><code>{b.text}</code></pre>
          <div style={{ height: 12 }} />
        </ClayCard>
      );
    case "image":
      return (
        <figure className="th-figure">
          <div className="th-figure__frame"><Image src={b.src} alt={b.alt} width={b.w} height={b.h} sizes="(max-width: 800px) 92vw, 760px" /></div>
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      );
  }
}

export default function ThoughtPage({ params }: { params: { slug: string } }) {
  const t = get(params.slug);
  if (!t) notFound();
  const m = TOPIC_META[t.topic];
  const list = posts();
  const i = list.indexOf(t);
  const newer = i > 0 ? list[i - 1] : null;
  const older = i < list.length - 1 ? list[i + 1] : null;
  const substack = t.substack ?? null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: t.title,
    description: t.dek,
    datePublished: t.date,
    author: { "@type": "Person", name: SITE.name, url: SITE.url },
    url: `${SITE.url}/thoughts/${t.slug}`,
    ...(t.cover ? { image: `${SITE.url}${t.cover.src}` } : {}),
  };

  return (
    <main className="sp ed th" style={{ minHeight: "100vh", "--accent": m.accent } as CSSProperties}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="th-article">
        <header className="sp-wrap th-article__head">
          <nav aria-label="Breadcrumb" className="ed-crumbs">
            <Link href="/thoughts">Thoughts</Link>
            <span aria-hidden>/</span>
            <Link href={`/thoughts?topic=${t.topic}`}>{m.label}</Link>
          </nav>
          <div className="ed-card__meta">
            <span className="ed-badge" style={{ "--accent": m.accent } as CSSProperties}>{m.label}</span>
            <span className="ed-card__client"><time dateTime={t.date}>{fmtDate(t.date)}</time> · {t.minutes} min read</span>
          </div>
          <h1 className="th-article__title">{t.title}</h1>
          <p className="th-article__dek">{t.dek}</p>
          <div className="th-article__by">
            <span>By {SITE.name}</span>
            {substack && <a href={substack} target="_blank" rel="noreferrer" className="th-article__sub">Also on Substack ↗</a>}
          </div>
          {t.cover && (
            <ClayCard pad="none" accent={m.accent} className="th-article__cover">
              <Image src={t.cover.src} alt={t.cover.alt} width={t.cover.w} height={t.cover.h} priority sizes="(max-width: 1000px) 92vw, 960px" />
            </ClayCard>
          )}
        </header>

        <div className="sp-wrap">
          <div className="th-prose">
            {t.body.map((b, j) => <Render key={j} b={b} accent={m.accent} i={j} />)}
          </div>
        </div>

        <footer className="sp-wrap th-article__foot">
          <div className="th-prose th-endmark" aria-hidden>✦ ✦ ✦</div>
          {(newer || older) && (
            <nav className="ed-pn" aria-label="More posts">
              {older ? (
                <ClayCard href={`/thoughts/${older.slug}`} accent={TOPIC_META[older.topic].accent} className="ed-pn__card" aria-label={`Older post: ${older.title}`}>
                  <span className="clay-kicker">← Older · {TOPIC_META[older.topic].label}</span>
                  <span className="ed-pn__title">{older.title}</span>
                </ClayCard>
              ) : <span />}
              {newer ? (
                <ClayCard href={`/thoughts/${newer.slug}`} accent={TOPIC_META[newer.topic].accent} className="ed-pn__card ed-pn__card--next" aria-label={`Newer post: ${newer.title}`}>
                  <span className="clay-kicker">Newer · {TOPIC_META[newer.topic].label} →</span>
                  <span className="ed-pn__title">{newer.title}</span>
                </ClayCard>
              ) : <span />}
            </nav>
          )}
        </footer>
      </article>

      <section className="sp-wrap ed-end" aria-labelledby="th-cta">
        <CtaBand
          id="th-cta"
          tone="violet"
          eyebrow={SUBSTACK_URL ? "$ subscribe --substack" : "$ subscribe --email"}
          title={SUBSTACK_URL ? "Get the next one on Substack" : "Get the next post by email"}
          body="Or, if this post is close to a problem you have right now, talk to me."
        >
          <ClayButton variant="dark" size="lg" href={subscribeHref()} external={!!SUBSTACK_URL} icon={SUBSTACK_URL ? undefined : "@"}>{SUBSTACK_URL ? "Subscribe" : "Email me to subscribe"}</ClayButton>
          <ClayButton variant="ghost" size="lg" href={waLink(`Hi Levo, I read "${t.title}" and want to talk.`)} external>WhatsApp</ClayButton>
          <ClayButton variant="ghost" size="lg" href="/thoughts">All posts</ClayButton>
        </CtaBand>
      </section>
    </main>
  );
}
