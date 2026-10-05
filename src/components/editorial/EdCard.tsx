import type { CSSProperties } from "react";
import type { EditorialItem } from "@/data/editorial";
import { ClayCard } from "@/components/signal";
import Frame from "./Frame";
import { KIND_META, itemHref, mediaCount } from "./meta";

/** The one Editorial card: 4:3 frame, kind badge, client and year, title, blurb, tools, CTA. */
export default function EdCard({ item, priority, headingLevel = "h3" }: { item: EditorialItem; priority?: boolean; headingLevel?: "h2" | "h3" }) {
  const k = KIND_META[item.kind];
  const H = headingLevel;
  const count = mediaCount(item);
  return (
    <ClayCard
      href={itemHref(item)}
      accent={k.accent}
      pad="none"
      className="ed-card"
      aria-label={`${item.title}, ${k.label.toLowerCase()} for ${item.client}, ${item.year}. ${k.verb}`}
    >
      <Frame media={item.cover} title={item.title} sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 380px" priority={priority} />
      <div className="ed-card__body">
        <div className="ed-card__meta">
          <span className="ed-badge" style={{ "--accent": k.accent } as CSSProperties}>{k.label}</span>
          <span className="ed-card__client">{item.client} · {item.year}</span>
        </div>
        <H className="ed-card__title">{item.title}</H>
        <p className="ed-card__blurb">{item.blurb}</p>
        <div className="clay-foot ed-card__foot">
          <div className="sp-chips ed-card__chips">
            {item.price && <span className="sp-chip ed-chip--price">{item.price}</span>}
            {item.tools.slice(0, 2).map((t) => <span key={t} className="sp-chip">{t}</span>)}
            {count && <span className="sp-chip ed-chip--count">{count}</span>}
          </div>
          <span className="clay-fake-btn" aria-hidden>{k.verb}<i>→</i></span>
        </div>
      </div>
    </ClayCard>
  );
}
