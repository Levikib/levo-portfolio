import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS, getProject } from "@/data/projects";
import { REELS } from "@/data/media";
import { SITE } from "@/data/facts";
import Reel from "@/components/signal/Reel";
import { Underline } from "@/components/signal/Doodles";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  return {
    title: `${p.name} case study`,
    description: p.summary,
    alternates: { canonical: `${SITE.url}/work/${p.slug}` },
    openGraph: { title: `${p.name} | Levis Kibirie`, description: p.tagline, url: `${SITE.url}/work/${p.slug}` },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="cs-block">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  const i = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const slot = REELS[p.slug];

  return (
    <main className="sp" style={{ minHeight: "100vh" }}>
      <article className="sp-wrap">
        <header className="cs-hero">
          <Link href="/work" className="sp-eyebrow">← all case studies</Link>
          <div className="sp-station__no" style={{ marginTop: 26 }}>
            <em style={{ background: p.accent }}>{p.station}</em><span>{p.kind}</span>
          </div>
          <h1 className="sp-display cs-title">{p.name}</h1>
          <Underline color={p.accent} style={{ width: "min(420px, 70%)", height: 18 }} />
          <p style={{ fontSize: "clamp(20px, 2.4vw, 28px)", lineHeight: 1.35, maxWidth: 820, marginTop: 18 }}>{p.summary}</p>

          <dl className="cs-meta">
            <div><dt>Role</dt><dd>{p.role}</dd></div>
            <div><dt>When</dt><dd>{p.when}</dd></div>
            <div><dt>Stack</dt><dd>{p.stack.slice(0, 4).join(", ")}</dd></div>
            <div><dt>Links</dt><dd style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {p.live && <a href={p.live} target="_blank" rel="noreferrer" style={{ color: "var(--sp-signal)" }}>Live site ↗</a>}
              {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" style={{ color: "var(--sp-signal)" }}>Source ↗</a>}
              {!p.live && !p.repo && <span style={{ color: "var(--sp-muted)" }}>Private</span>}
            </dd></div>
          </dl>

          {p.stats.length > 0 && (
            <div className="sp-stats" style={{ borderTop: 0, marginTop: 28 }}>
              {p.stats.map((s) => (
                <div key={s.label}><div className="sp-stat__v" style={{ color: p.accent }}>{s.value}</div><div className="sp-stat__l">{s.label}</div></div>
              ))}
            </div>
          )}
        </header>

        {slot && (
          <div className="sp-station__media" style={{ aspectRatio: p.reel.ratio === "9:16" ? "9 / 16" : "16 / 9", maxWidth: p.reel.ratio === "9:16" ? 420 : undefined, margin: "0 auto 60px" }}>
            <Reel slot={slot} alt={`${p.name} in action`} shot={p.reel.shot} />
          </div>
        )}

        <Block title="The problem">
          <div className="cs-prose"><ul>{p.problem.map((x) => <li key={x}>{x}</li>)}</ul></div>
        </Block>

        <Block title="Architecture">
          <div className="cs-arch">
            {p.architecture.map((l) => (
              <div key={l.name} className="cs-arch__row"><b style={{ color: p.accent }}>{l.name}</b><span>{l.detail}</span></div>
            ))}
          </div>
        </Block>

        {p.decisions.length > 0 && (
          <Block title="Key decisions">
            <div className="cs-decisions">
              {p.decisions.map((d) => (
                <div key={d.title} className="cs-decision">
                  <h3>{d.title}</h3>
                  <p>{d.why}</p>
                  <p><strong style={{ color: "var(--sp-paper)" }}>Tradeoff:</strong> {d.tradeoff}</p>
                </div>
              ))}
            </div>
          </Block>
        )}

        {p.code.length > 0 && (
          <Block title="Real code">
            {p.code.map((c) => (
              <figure key={c.file} className="cs-code">
                <figcaption className="cs-code__head"><span>{c.file}</span><span style={{ color: p.accent }}>excerpt</span></figcaption>
                <pre><code>{c.code}</code></pre>
                <p>{c.caption}</p>
              </figure>
            ))}
          </Block>
        )}

        {p.qa.length > 0 && (
          <Block title="How it was verified">
            <div className="cs-prose"><ul>{p.qa.map((x) => <li key={x}>{x}</li>)}</ul></div>
          </Block>
        )}

        {p.results.length > 0 && (
          <Block title="Results">
            <div className="cs-prose"><ul>{p.results.map((x) => <li key={x}>{x}</li>)}</ul></div>
          </Block>
        )}

        {p.next.length > 0 && (
          <Block title="What I'd do next">
            <div className="cs-prose"><ul>{p.next.map((x) => <li key={x}>{x}</li>)}</ul></div>
          </Block>
        )}

        {p.placeholders && p.placeholders.length > 0 && process.env.NODE_ENV !== "production" && (
          <Block title="To fill in">
            <div className="cs-todo">{p.placeholders.map((x) => <div key={x}>• {x}</div>)}</div>
          </Block>
        )}

        <nav className="cs-next" aria-label="Next case study">
          <Link href="/work" className="sp-btn sp-btn--ghost">← All case studies</Link>
          <Link href={`/work/${next.slug}`} className="sp-btn sp-btn--primary">Next: {next.name} →</Link>
        </nav>
      </article>
    </main>
  );
}
