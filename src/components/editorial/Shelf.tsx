import Link from "next/link";
import type { CSSProperties } from "react";
import type { EditorialItem } from "@/data/editorial";
import Frame from "./Frame";
import { KIND_META, itemHref } from "./meta";

/**
 * The featured shelf: each featured piece stands at its true proportions on its
 * own lit clay plinth, in one row that scrolls sideways with snap. Arrows: <ShelfControls target="ed-shelf-row" />.
 */
export default function Shelf({ items }: { items: EditorialItem[] }) {
  return (
    <div className="ed-shelf">
      <ul id="ed-shelf-row" className="ed-shelf__row" role="list" aria-label="Featured pieces" tabIndex={0}>
        {items.map((item, i) => {
          const k = KIND_META[item.kind];
          const m = item.cover;
          return (
            <li key={item.slug} className="ed-shelf__item" style={{ "--accent": k.accent, "--ar": `${m.w} / ${m.h}`, "--i": i } as CSSProperties}>
              <Link href={itemHref(item)} className="ed-shelf__link" aria-label={`${item.title}, ${k.label.toLowerCase()}. ${k.verb}`}>
                <div className="ed-shelf__piece">
                  <Frame media={m} title={item.title} ratio="natural" sizes="(max-width: 700px) 60vw, 320px" priority={i < 3} />
                </div>
                <div className="ed-shelf__plinth">
                  <span className="ed-shelf__kind">{k.label}</span>
                  <span className="ed-shelf__title">{item.title}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
