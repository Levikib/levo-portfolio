import Link from "next/link";
import type { Project } from "@/data/projects";
import { REELS } from "@/data/media";
import Reel from "./Reel";

export default function Station({ p, side, children }: { p: Project; side: "left" | "right"; children?: React.ReactNode }) {
  const slot = REELS[p.slug];
  const tall = p.reel.ratio === "9:16";
  return (
    <article data-station className={`sp-station ${side === "right" ? "sp-station--right" : ""}`} aria-labelledby={`st-${p.slug}`} id={`station-${p.slug}`}>
      <span data-node className="sp-station__node" aria-hidden />
      <div className={`sp-station__media ${tall ? "sp-station__media--tall" : ""}`}>
        {children ?? (slot ? <Reel slot={slot} alt={`${p.name} in action`} shot={p.reel.shot} /> : null)}
      </div>
      <div>
        <div className="sp-station__no">
          <em style={{ background: p.accent }}>{p.station}</em>
          <span>{p.kind}</span>
        </div>
        <h3 id={`st-${p.slug}`} className="sp-display sp-station__name">{p.name}</h3>
        <p className="sp-station__tag">{p.tagline}</p>
        {p.stats.length > 0 && (
          <div className="sp-station__stats">
            {p.stats.slice(0, 4).map((s) => (
              <div key={s.label}><b>{s.value}</b><span>{s.label}</span></div>
            ))}
          </div>
        )}
        <div className="sp-chips">
          {p.stack.slice(0, 5).map((t) => <span key={t} className="sp-chip">{t}</span>)}
        </div>
        <div className="sp-station__links">
          <Link href={`/work/${p.slug}`} className="sp-btn sp-btn--ghost">Read the case study →</Link>
          {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="sp-btn sp-btn--ghost" style={{ borderStyle: "dashed" }}>Live site ↗</a>}
        </div>
      </div>
    </article>
  );
}
