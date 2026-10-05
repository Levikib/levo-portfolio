import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../../../editorial.css";
import { EDITORIAL } from "@/data/editorial";
import { SITE, waLink } from "@/data/facts";
import { ClayButton, ClayCard, CtaBand } from "@/components/signal";
import Reader from "@/components/editorial/Reader";
import { KIND_META, clip, pagesOf, volOf } from "@/components/editorial/meta";

/** Every page set in the Editorial data becomes a reader route, keyed by its folder name. */
function volumes() {
  return EDITORIAL.flatMap((item) => pagesOf(item).map((m) => ({ vol: volOf(m), item, m })));
}
const getVol = (vol: string) => volumes().find((x) => x.vol === vol);

export const dynamicParams = false;

export function generateStaticParams() {
  return volumes().map(({ vol }) => ({ vol }));
}

export function generateMetadata({ params }: { params: { vol: string } }): Metadata {
  const v = getVol(params.vol);
  if (!v) return {};
  const url = `${SITE.url}/editorial/read/${v.vol}`;
  const description = clip(`Read ${v.item.title} online, all ${v.m.count} pages, free. ${v.item.blurb}`);
  const cover = `${v.m.folder}/page-01.${v.m.ext}`;
  return {
    title: `Read ${v.item.title}`,
    description,
    alternates: { canonical: url },
    openGraph: { title: `Read ${v.item.title} | Levis Kibirie`, description, url, images: [{ url: cover, width: v.m.w, height: v.m.h }] },
  };
}

export default function ReadPage({ params }: { params: { vol: string } }) {
  const v = getVol(params.vol);
  if (!v) notFound();
  const others = volumes().filter((x) => x.vol !== v.vol);
  const accent = KIND_META[v.item.kind].accent;

  return (
    <main className="sp ed ed-read" style={{ minHeight: "100vh", ["--accent" as string]: accent }}>
      <section className="sp-wrap ed-read__head" aria-labelledby="ed-read-h1">
        <nav aria-label="Breadcrumb" className="ed-crumbs">
          <Link href="/editorial">Editorial</Link>
          <span aria-hidden>/</span>
          <Link href={`/editorial/${v.item.slug}`}>{v.item.title}</Link>
        </nav>
        <div className="ed-read__titlebar">
          <div>
            <div className="clay-kicker"><span className="ed-badge">{KIND_META[v.item.kind].label}</span>{v.item.client} · {v.item.year} · {v.m.count} pages</div>
            <h1 id="ed-read-h1" className="ed-read__title">{v.item.title}</h1>
          </div>
          <div className="cta-row">
            <ClayButton variant="ghost" href={`/editorial/${v.item.slug}`}>About this issue</ClayButton>
          </div>
        </div>
      </section>

      <section className="sp-wrap" aria-label={`${v.item.title} reader`}>
        <Reader v={{ vol: v.vol, title: v.item.title, folder: v.m.folder, count: v.m.count, ext: v.m.ext, w: v.m.w, h: v.m.h }} />
      </section>

      {others.length > 0 && (
        <section className="sp-wrap ed-read__more" aria-labelledby="ed-read-more">
          <h2 id="ed-read-more" className="ed-h2">Keep reading</h2>
          <ul className="ed-read__others" role="list">
            {others.map((o) => (
              <li key={o.vol}>
                <ClayCard href={`/editorial/read/${o.vol}`} accent={accent} pad="sm" className="ed-read__other" aria-label={`Read ${o.item.title}`}>
                  <span className="clay-kicker">{o.item.client} · {o.item.year} · {o.m.count} pages</span>
                  <span className="ed-pn__title">{o.item.title}</span>
                  <span className="clay-body">{o.item.blurb}</span>
                  <span className="clay-foot"><span className="clay-fake-btn">Read it<i>→</i></span></span>
                </ClayCard>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="sp-wrap ed-end" aria-labelledby="ed-cta">
        <CtaBand
          id="ed-cta"
          tone="violet"
          eyebrow="$ ./commission --print"
          title="Need a magazine, report or brochure?"
          body="Concept, layout, type and illustration direction, delivered print-ready and readable online like this one."
        >
          <ClayButton variant="dark" size="lg" href={waLink(`Hi Levo, I read ${v.item.title} and need a publication designed.`)} external>WhatsApp</ClayButton>
          <ClayButton variant="ghost" size="lg" href={`mailto:${SITE.email}?subject=${encodeURIComponent("Publication design")}`} icon="@">Email</ClayButton>
          <ClayButton variant="ghost" size="lg" href="/editorial">All editorial</ClayButton>
        </CtaBand>
      </section>
    </main>
  );
}
