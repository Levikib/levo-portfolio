import { PROJECTS } from "@/data/projects";
import { ClayCard, SectionHeader, CtaBand, ClayButton } from "@/components/signal";
import { Underline } from "@/components/signal/Doodles";
import { SITE, waLink } from "@/data/facts";

export default function WorkIndex() {
  return (
    <main className="sp" style={{ minHeight: "100vh" }}>
      <section className="sp-wrap cs-hero">
        <SectionHeader
          as="h1"
          eyebrow="$ ls ./work --all"
          title="Case studies"
          kicker="Each one covers the problem, the architecture, the decisions and their tradeoffs, real code, how it was verified, and what I would do next."
        />
        <Underline style={{ width: 260, height: 18, marginTop: 10 }} />
      </section>

      <section className="sp-wrap" aria-label="All case studies" style={{ paddingBottom: 72 }}>
        <ul className="clay-grid clay-grid--2" style={{ listStyle: "none" }}>
          {PROJECTS.map((p) => (
            <li key={p.slug} style={{ display: "flex" }}>
              <ClayCard href={`/work/${p.slug}`} accent={p.accent} pad="lg" className="work-card" style={{ width: "100%" }} aria-label={`${p.name}: read the case study`}>
                <div className="clay-kicker"><span className="badge">{p.station}</span><span>{p.kind}</span></div>
                <h2 className="clay-title">{p.name}</h2>
                <p className="clay-body" style={{ fontSize: 17 }}>{p.tagline}</p>
                {p.stats.length > 0 && (
                  <div className="work-card__stats">
                    {p.stats.slice(0, 2).map((s) => (
                      <div key={s.label} className="well"><b>{s.value}</b><span>{s.label}</span></div>
                    ))}
                  </div>
                )}
                <div className="clay-foot">
                  <div className="sp-chips">
                    {p.stack.slice(0, 3).map((t) => <span key={t} className="sp-chip">{t}</span>)}
                  </div>
                  <span className="clay-fake-btn" aria-hidden>Read<i>→</i></span>
                </div>
              </ClayCard>
            </li>
          ))}
        </ul>
      </section>

      <section className="sp-wrap" style={{ paddingBottom: 112 }} aria-labelledby="work-cta">
        <CtaBand
          id="work-cta"
          tone="signal"
          title="Seen enough? Let's build the next one."
          body={`Senior remote roles and contract builds. Replies within a day, ${SITE.timezone}.`}
        >
          <ClayButton variant="dark" size="lg" href={waLink("Hi Levo, I read your case studies and want to talk.")} external>WhatsApp</ClayButton>
          <ClayButton variant="ghost" size="lg" href={`mailto:${SITE.email}`} icon="@">Email</ClayButton>
          <ClayButton variant="ghost" size="lg" href={SITE.github} external>GitHub</ClayButton>
        </CtaBand>
      </section>
    </main>
  );
}
