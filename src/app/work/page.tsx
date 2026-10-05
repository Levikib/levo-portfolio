import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { Underline } from "@/components/signal/Doodles";

export default function WorkIndex() {
  return (
    <main className="sp" style={{ minHeight: "100vh" }}>
      <section className="sp-wrap cs-hero">
        <div className="sp-eyebrow">$ ls ./work --all</div>
        <h1 className="sp-display cs-title">Case studies</h1>
        <Underline style={{ width: 260, height: 18 }} />
        <p className="cs-prose" style={{ maxWidth: 640, marginTop: 18 }}>
          <span style={{ fontSize: 19, color: "#d8d2c7" }}>Each one covers the problem, the architecture, the decisions and their tradeoffs, real code, how it was verified, and what I would do next.</span>
        </p>
      </section>
      <section className="sp-wrap" style={{ paddingBottom: 110 }}>
        <ol style={{ listStyle: "none", borderTop: "1px solid var(--sp-line)" }}>
          {PROJECTS.map((p) => (
            <li key={p.slug} style={{ borderBottom: "1px solid var(--sp-line)" }}>
              <Link href={`/work/${p.slug}`} style={{ display: "grid", gridTemplateColumns: "60px minmax(0,1fr) auto", gap: 20, alignItems: "center", padding: "26px 0" }}>
                <span className="sp-mono" style={{ color: p.accent, fontSize: 14 }}>{p.station}</span>
                <span>
                  <span className="sp-display" style={{ display: "block", fontSize: "clamp(28px,4vw,46px)", fontWeight: 700, lineHeight: 1 }}>{p.name}</span>
                  <span style={{ display: "block", color: "var(--sp-muted)", marginTop: 8, fontSize: 15 }}>{p.kind} · {p.tagline}</span>
                </span>
                <span aria-hidden className="sp-mono" style={{ fontSize: 22 }}>→</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
