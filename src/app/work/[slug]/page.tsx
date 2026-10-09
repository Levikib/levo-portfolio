import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS, getProject } from "@/data/projects";
import type { Project } from "@/data/projects";
import { ID, OG_DEFAULT, abs, breadcrumbs, describe, graph, ldJson, pageMetadata, personRef } from "@/lib/seo";
import { REELS } from "@/data/media";
import { SITE, waLink } from "@/data/facts";
import Reel from "@/components/signal/Reel";
import { ClayCard, ClayButton, CtaBand } from "@/components/signal";
import { Underline } from "@/components/signal/Doodles";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

/** OG/schema image: the project's landscape reel poster when ready, else the site card. */
function imageOf(p: Project) {
  const r = REELS[p.slug];
  return r?.ready && r.poster && p.reel.ratio === "16:9"
    ? { url: r.poster, width: 1280, height: 720 }
    : { url: OG_DEFAULT.url, width: OG_DEFAULT.width, height: OG_DEFAULT.height };
}

function describeProject(p: Project) {
  return describe(`${p.name}: ${p.tagline} ${p.summary}`);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  const img = imageOf(p);
  return pageMetadata({
    title: `${p.name} case study`,
    description: describeProject(p),
    path: `/work/${p.slug}`,
    type: "article",
    section: "Case studies",
    tags: [p.kind, ...p.stack],
    images: [{ ...img, alt: `${p.name} case study by Levis Kibirie` }],
    keywords: [p.name, `${p.name} case study`, ...p.kind.split("·").map((x) => x.trim()), ...p.stack],
  });
}

/** Case study JSON-LD: the page is a TechArticle about the product, plus breadcrumbs. */
function caseStudyLd(p: Project) {
  const path = `/work/${p.slug}`;
  const url = abs(path);
  const img = abs(imageOf(p).url);
  const isClient = p.kind.startsWith("Client");
  const product = isClient
    ? {
        "@type": "WebSite",
        name: p.name,
        ...(p.live ? { url: p.live } : {}),
        description: p.tagline,
        creator: { "@id": ID.person },
      }
    : {
        "@type": "SoftwareApplication",
        name: p.name,
        ...(p.live ? { url: p.live } : {}),
        ...(p.repo ? { codeRepository: p.repo } : {}),
        description: p.tagline,
        applicationCategory: p.slug === "makeja-homes" ? "BusinessApplication" : "DeveloperApplication",
        operatingSystem: "Web",
        creator: { "@id": ID.person },
        ...(p.slug === "makeja-homes" ? { publisher: { "@id": ID.makeja } } : {}),
      };
  return graph(
    {
      "@type": "TechArticle",
      "@id": `${url}#article`,
      url,
      headline: `${p.name} case study: ${p.tagline}`.slice(0, 110),
      description: describeProject(p),
      image: img,
      inLanguage: "en-KE",
      author: personRef,
      publisher: { "@id": ID.person },
      isPartOf: { "@id": ID.website },
      mainEntityOfPage: url,
      articleSection: p.kind,
      keywords: [p.name, ...p.stack].join(", "),
      about: product,
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    breadcrumbs([
      { name: "Case studies", path: "/work" },
      { name: p.name, path },
    ]),
  );
}

function Block({ no, title, children }: { no: string; title: string; children: React.ReactNode }) {
  const id = `b-${no}`;
  return (
    <section className="cs-block" aria-labelledby={id}>
      <div className="cs-block__label"><span>{no}</span><h2 id={id}>{title}</h2></div>
      <div>{children}</div>
    </section>
  );
}

function List({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ClayCard accent={accent} pad="lg">
      <ul className="cs-list">{items.map((x) => <li key={x}>{x}</li>)}</ul>
    </ClayCard>
  );
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  const i = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
  const slot = REELS[p.slug];
  const tall = p.reel.ratio === "9:16";

  // Blocks are a reading sequence, so they are numbered in order of appearance.
  const blocks: { title: string; node: React.ReactNode }[] = [];
  blocks.push({ title: "The problem", node: <List items={p.problem} accent={p.accent} /> });
  blocks.push({
    title: "Architecture",
    node: (
      <div className="cs-arch">
        {p.architecture.map((l, k) => (
          <ClayCard key={l.name} accent={p.accent} pad="sm">
            {k > 0 && <span className="cs-arch__wire" aria-hidden />}
            <b>{l.name}</b><span className="d">{l.detail}</span>
          </ClayCard>
        ))}
      </div>
    ),
  });
  if (p.decisions.length) blocks.push({
    title: "Key decisions",
    node: (
      <div className="clay-grid clay-grid--2 cs-decisions">
        {p.decisions.map((d, k) => (
          <ClayCard key={d.title} accent={p.accent} pad="md" className="cs-decision">
            <div className="clay-kicker"><span className="badge">{String(k + 1).padStart(2, "0")}</span></div>
            <h3>{d.title}</h3>
            <p className="clay-body">{d.why}</p>
            <div className="well cs-tradeoff"><strong>Tradeoff</strong>{d.tradeoff}</div>
          </ClayCard>
        ))}
      </div>
    ),
  });
  if (p.code.length) blocks.push({
    title: "Real code",
    node: p.code.map((c) => (
      <ClayCard as="figure" key={c.file} accent={p.accent} pad="none" className="cs-code">
        <div className="cs-code__head"><span><span className="cs-code__dots" aria-hidden><i /><i /><i /></span>{c.file}</span><span className="clay-accent">excerpt</span></div>
        <pre className="well" tabIndex={0} aria-label={`Code excerpt from ${c.file}`}><code>{c.code}</code></pre>
        <figcaption className="cap">{c.caption}</figcaption>
      </ClayCard>
    )),
  });
  if (p.qa.length) blocks.push({ title: "How it was verified", node: <List items={p.qa} accent={p.accent} /> });
  if (p.results.length) blocks.push({ title: "Results", node: <List items={p.results} accent={p.accent} /> });
  if (p.next.length) blocks.push({ title: "What I'd do next", node: <List items={p.next} accent={p.accent} /> });

  return (
    <main className="sp" style={{ minHeight: "100vh", ["--accent" as string]: p.accent }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(caseStudyLd(p)) }} />
      <article className="sp-wrap">
        <header className="cs-hero">
          <ClayButton href="/work" variant="ghost" icon="←">All case studies</ClayButton>
          <div className="clay-kicker" style={{ marginTop: 32 }}>
            <span className="badge">{p.station}</span><span>{p.kind}</span>
          </div>
          <h1 className="cs-title">{p.name}</h1>
          <Underline color={p.accent} style={{ width: "min(420px, 70%)", height: 18 }} />
          <p className="cs-summary">{p.summary}</p>
          <div className="cta-row cs-hero__ctas">
            {p.live && <ClayButton href={p.live} external variant="signal">Open the live site</ClayButton>}
            {p.repo && <ClayButton href={p.repo} external variant={p.live ? "ghost" : "signal"}>Read the source</ClayButton>}
            <ClayButton href="#cs-cta" variant={p.live || p.repo ? "ghost" : "signal"} icon="↓">Talk about this build</ClayButton>
          </div>

          <dl className="clay-grid clay-grid--4 cs-meta">
            <ClayCard pad="sm" accent={p.accent}><dt>Role</dt><dd>{p.role}</dd></ClayCard>
            <ClayCard pad="sm" accent={p.accent}><dt>When</dt><dd>{p.when}</dd></ClayCard>
            <ClayCard pad="sm" accent={p.accent}><dt>Stack</dt><dd>{p.stack.slice(0, 4).join(", ")}</dd></ClayCard>
            <ClayCard pad="sm" accent={p.accent}><dt>Links</dt><dd style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live site ↗</a>}
              {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">Source ↗</a>}
              {!p.repo && <span style={{ color: "var(--sp-muted)" }}>{p.repoNote ?? "Private"}</span>}
            </dd></ClayCard>
          </dl>

          {p.stats.length > 0 && (
            <ul className="clay-grid clay-grid--4 cs-stats" style={{ listStyle: "none" }}>
              {p.stats.map((s) => (
                <ClayCard as="li" key={s.label} pad="sm" accent={p.accent}>
                  <span className="stat__bar" aria-hidden />
                  <div className="stat__v clay-accent">{s.value}</div>
                  <div className="stat__l">{s.label}</div>
                </ClayCard>
              ))}
            </ul>
          )}
        </header>

        {slot && (
          <ClayCard accent={p.accent} pad="sm" className="cs-reel" style={{ padding: 12, maxWidth: tall ? 420 : undefined }}>
            <div className={`screen ${tall ? "screen--portrait" : "screen--wide"}`}>
              <Reel slot={slot} alt={`${p.name} in action`} shot={p.reel.shot} no={p.station} name={p.name} />
            </div>
          </ClayCard>
        )}

        {blocks.map((b, k) => (
          <Block key={b.title} no={String(k + 1).padStart(2, "0")} title={b.title}>{b.node}</Block>
        ))}

        {p.placeholders && p.placeholders.length > 0 && process.env.NODE_ENV !== "production" && (
          <Block no="··" title="To fill in">
            <div className="cs-todo">{p.placeholders.map((x) => <div key={x}>• {x}</div>)}</div>
          </Block>
        )}

        <div className="cs-end">
          <section aria-labelledby="cs-cta" id="cs-cta-wrap">
            <CtaBand
              id="cs-cta"
              eyebrow={`$ ./hire --re ${p.slug}`}
              title={`Want a build like ${p.name}?`}
              body={`Senior remote roles and contract builds. Replies within a day, ${SITE.timezone}.`}
            >
              <ClayButton variant="dark" size="lg" href={waLink(`Hi Levo, I read the ${p.name} case study and want to talk.`)} external>WhatsApp</ClayButton>
              <ClayButton variant="ghost" size="lg" href={`mailto:${SITE.email}?subject=${encodeURIComponent(`About ${p.name}`)}`} icon="@">Email</ClayButton>
            </CtaBand>
          </section>

          <nav aria-label="More case studies" className="clay-grid clay-grid--2">
            <ClayCard href={`/work/${prev.slug}`} accent={prev.accent} pad="md">
              <div className="clay-kicker"><span className="badge">{prev.station}</span><span>Previous</span></div>
              <div className="clay-title" style={{ fontSize: 30 }}>{prev.name}</div>
              <div className="clay-foot"><span className="clay-fake-btn">Read<i aria-hidden>←</i></span></div>
            </ClayCard>
            <ClayCard href={`/work/${next.slug}`} accent={next.accent} pad="md">
              <div className="clay-kicker"><span className="badge">{next.station}</span><span>Next</span></div>
              <div className="clay-title" style={{ fontSize: 30 }}>{next.name}</div>
              <div className="clay-foot"><span className="clay-fake-btn">Read<i aria-hidden>→</i></span></div>
            </ClayCard>
          </nav>
        </div>
      </article>
    </main>
  );
}
