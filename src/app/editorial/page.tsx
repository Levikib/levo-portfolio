import type { Metadata } from "next";
import { ROUTE_META } from "@/lib/seo-routes";
import "../editorial.css";
import { EDITORIAL } from "@/data/editorial";
import { SITE, waLink } from "@/data/facts";
import { ClayButton, CtaBand, Marquee, SectionHeader } from "@/components/signal";
import Shelf from "@/components/editorial/Shelf";
import ShelfControls from "@/components/editorial/ShelfControls";
import EditorialBrowser from "@/components/editorial/EditorialBrowser";
import { KIND_META } from "@/components/editorial/meta";

export const metadata: Metadata = ROUTE_META.editorial;

export default function EditorialPage() {
  const featured = EDITORIAL.filter((i) => i.featured);
  const clients = Array.from(new Set(EDITORIAL.map((i) => i.client)));
  const kinds = Array.from(new Set(EDITORIAL.map((i) => KIND_META[i.kind].label)));
  const pages = EDITORIAL.reduce((n, i) => n + [i.cover, ...(i.gallery ?? [])].reduce((m, x) => m + (x.type === "pages" ? x.count : 0), 0), 0);
  const films = EDITORIAL.reduce((n, i) => n + [i.cover, ...(i.gallery ?? [])].filter((x) => x.type === "video").length, 0);

  return (
    <main className="sp ed" style={{ minHeight: "100vh" }}>
      <section className="sp-wrap ed-hero" aria-labelledby="ed-h1">
        <div className="ed-hero__grid">
          <SectionHeader
            as="h1"
            id="ed-h1"
            eyebrow="$ ls ./editorial"
            title={<>Editorial<span className="ed-dot" aria-hidden>.</span></>}
            kicker="The design side of the work: magazines laid out page by page, films directed for product launches, identities and campaign art. Everything here shipped for a real brand."
            note="made by hand + machine"
          />
          <dl className="ed-hero__stats">
            <div className="well"><dt>pieces</dt><dd>{EDITORIAL.length}</dd></div>
            <div className="well"><dt>magazine pages</dt><dd>{pages}</dd></div>
            <div className="well"><dt>films</dt><dd>{films}</dd></div>
            <div className="well"><dt>brands</dt><dd>{clients.length}</dd></div>
          </dl>
        </div>
        <div className="cta-row ed-hero__ctas">
          <ClayButton variant="primary" size="lg" href="#browse" icon="↓">Browse the work</ClayButton>
          <ClayButton variant="ghost" size="lg" href="/editorial/read/vol1">Read Chill Minds</ClayButton>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="sp-wrap ed-featured" aria-labelledby="ed-featured">
          <div className="ed-featured__head">
            <div>
              <h2 id="ed-featured" className="ed-h2">On the shelf</h2>
              <p className="ed-featured__note">Featured pieces at their true proportions. Films play on hover, or as they scroll into view on a phone.</p>
            </div>
            <ShelfControls target="ed-shelf-row" />
          </div>
          <Shelf items={featured} />
        </section>
      )}

      <div className="ed-marquee"><Marquee tone="violet" items={[...kinds, ...clients]} /></div>

      <section id="browse" className="sp-wrap ed-browse" aria-labelledby="ed-all">
        <SectionHeader eyebrow="$ find ./editorial -type f" id="ed-all" title="All work" kicker="Filter by kind. The filter is in the link, so you can share a view." />
        <EditorialBrowser items={EDITORIAL} />
      </section>

      <section className="sp-wrap ed-end" aria-labelledby="ed-cta">
        <CtaBand
          id="ed-cta"
          tone="signal"
          eyebrow="$ ./commission --design"
          title="Need design like this?"
          body={`Magazines, launch films, identities and campaign art for brands that also need the product built. Replies within a day, ${SITE.timezone}.`}
        >
          <ClayButton variant="dark" size="lg" href={waLink("Hi Levo, I saw your Editorial work and need design like this.")} external>WhatsApp</ClayButton>
          <ClayButton variant="ghost" size="lg" href={`mailto:${SITE.email}?subject=${encodeURIComponent("Design project")}`} icon="@">Email</ClayButton>
          <ClayButton variant="ghost" size="lg" href="/work">Case studies</ClayButton>
        </CtaBand>
      </section>
    </main>
  );
}
