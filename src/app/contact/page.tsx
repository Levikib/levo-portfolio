import { ROUTE_META } from "@/lib/seo-routes";
import type { Metadata } from "next";
import { ClayCard, ClayButton, SectionHeader } from "@/components/signal";
import { Underline } from "@/components/signal/Doodles";
import LeadForm from "@/components/contact/LeadForm";
import { SITE, waLink } from "@/data/facts";

export const metadata: Metadata = ROUTE_META.contact;

const NEXT = [
  { n: "1", t: "You send this", d: "Two minutes. The questions change with who you are." },
  { n: "2", t: "I reply within a day", d: "A clear yes, a clear no, or the one question I need answered." },
  { n: "3", t: "We get on a call", d: "Only if it fits. No discovery theatre." },
];

export default function ContactPage() {
  return (
    <main className="sp" style={{ minHeight: "100vh" }}>
      <section className="sp-wrap cs-hero" style={{ paddingBottom: 28 }}>
        <SectionHeader
          as="h1"
          eyebrow="$ ./contact --levo"
          title="Let's talk."
          kicker="Builds, roles, partnerships, investment, press. Tell me who you are and what you need. You get a straight answer within a day."
        />
        <Underline style={{ width: 220, height: 18, marginTop: 10 }} />
      </section>

      <section className="sp-wrap contact-layout" aria-label="Contact form and direct channels" style={{ paddingBottom: 112 }}>
        <ClayCard pad="lg" className="contact-layout__form">
          <LeadForm source="contact" titleAs="h2" />
        </ClayCard>

        <aside className="contact-layout__side" aria-label="Direct channels">
          <ClayCard pad="lg" accent="#d4ff3a">
            <div className="clay-kicker"><span className="badge">direct</span><span>skip the form</span></div>
            <h2 className="clay-title">Rather just message?</h2>
            <p className="clay-body">Fine by me. Same person on the other end.</p>
            <div className="contact-layout__btns">
              <ClayButton variant="primary" href={waLink("Hi Levo, I found you through your site.")} external>WhatsApp</ClayButton>
              <ClayButton variant="ghost" href={`mailto:${SITE.email}`} icon="@">Email</ClayButton>
              <ClayButton variant="ghost" href={SITE.linkedin} external>LinkedIn</ClayButton>
            </div>
            <p className="contact-layout__email sp-mono">{SITE.email}</p>
          </ClayCard>

          <ClayCard pad="lg" accent="#ff8a1f">
            <div className="clay-kicker"><span className="badge">response</span></div>
            <p className="clay-title" style={{ fontSize: 30 }}>Within a day.</p>
            <p className="clay-body">{SITE.city}, {SITE.timezone}. Working with teams in any time zone.</p>
          </ClayCard>

          <ClayCard pad="lg" accent="#8b7cff">
            <div className="clay-kicker"><span className="badge">what happens next</span></div>
            <ol className="contact-layout__next">
              {NEXT.map((s) => (
                <li key={s.n}>
                  <span className="step__no" aria-hidden>{s.n}</span>
                  <div>
                    <strong>{s.t}</strong>
                    <span>{s.d}</span>
                  </div>
                </li>
              ))}
            </ol>
          </ClayCard>
        </aside>
      </section>

      <style>{`
        .contact-layout { display: grid; grid-template-columns: minmax(0, 1fr) minmax(280px, 360px); gap: 20px; align-items: start; }
        .contact-layout__side { display: grid; gap: 20px; position: sticky; top: 96px; }
        .contact-layout__btns { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
        .contact-layout__btns .cbtn { justify-content: space-between; }
        .contact-layout__email { margin-top: 14px; font-size: 12.5px; color: var(--sp-muted); overflow-wrap: anywhere; }
        .contact-layout__next { list-style: none; display: grid; gap: 16px; margin: 16px 0 0; padding: 0; }
        .contact-layout__next li { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 14px; align-items: start; }
        .contact-layout__next .step__no { width: 36px; height: 36px; font-size: 15px; }
        .contact-layout__next strong { display: block; font-family: var(--font-display), sans-serif; font-size: 16px; letter-spacing: -0.02em; }
        .contact-layout__next span:not(.step__no) { display: block; margin-top: 3px; font-size: 13.5px; line-height: 1.5; color: var(--sp-soft); }
        @media (max-width: 960px) {
          .contact-layout { grid-template-columns: minmax(0, 1fr); }
          .contact-layout__side { position: static; }
        }
        @media (max-width: 480px) {
          .contact-layout__form.clay { padding: 18px 14px; border-radius: var(--r-md); }
        }
      `}</style>
    </main>
  );
}
