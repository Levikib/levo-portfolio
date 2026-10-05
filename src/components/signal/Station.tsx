import type { Project } from "@/data/projects";
import { REELS } from "@/data/media";
import Reel from "./Reel";
import ClayCard from "./ClayCard";
import ClayButton from "./ClayButton";

export default function Station({ p, side, children }: { p: Project; side: "left" | "right"; children?: React.ReactNode }) {
  const slot = REELS[p.slug];
  const tall = p.reel.ratio === "9:16";
  return (
    <article data-station data-lit="false" className={`sp-station ${side === "right" ? "sp-station--right" : ""}`} aria-labelledby={`st-${p.slug}`} id={`station-${p.slug}`}>
      <span data-node className="sp-station__node" aria-hidden />
      <ClayCard accent={p.accent} pad="sm" className={`sp-station__media ${tall ? "sp-station__media--tall" : ""}`} style={{ padding: 12 }}>
        <div className={`screen ${tall ? "screen--tall" : ""}`}>
          {children ?? (slot ? <Reel slot={slot} alt={`${p.name} in action`} shot={p.reel.shot} no={p.station} name={p.name} /> : null)}
        </div>
      </ClayCard>
      <ClayCard accent={p.accent} pad="lg" className="sp-station__info">
        <div className="clay-kicker">
          <span className="badge">{p.station}</span>
          <span>{p.kind}</span>
        </div>
        <h3 id={`st-${p.slug}`} className="sp-station__name">{p.name}</h3>
        <p className="sp-station__tag">{p.tagline}</p>
        {p.stats.length > 0 && (
          <div className="sp-station__stats">
            {p.stats.slice(0, 4).map((s) => (
              <div key={s.label} className="well"><b>{s.value}</b><span>{s.label}</span></div>
            ))}
          </div>
        )}
        <div className="sp-chips" style={{ marginTop: p.stats.length ? 0 : 22 }}>
          {p.stack.slice(0, 5).map((t) => <span key={t} className="sp-chip">{t}</span>)}
        </div>
        <div className="cta-row sp-station__links">
          <ClayButton href={`/work/${p.slug}`} variant="primary" aria-label={`Read the ${p.name} case study`}>Read the case study</ClayButton>
          {p.live && <ClayButton href={p.live} external variant="ghost" aria-label={`Open the ${p.name} live site`}>Live site</ClayButton>}
        </div>
      </ClayCard>
    </article>
  );
}
