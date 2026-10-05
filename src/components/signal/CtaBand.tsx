import type { ReactNode } from "react";
import { SITE, waLink } from "@/data/facts";
import ClayButton from "./ClayButton";

export type CtaBandProps = {
  title: ReactNode;
  /** Mono line above the title. Default "$ ./hire --levo". */
  eyebrow?: string;
  body?: ReactNode;
  /** Clay colour of the slab. Default "lime". */
  tone?: "lime" | "signal" | "violet";
  /** Buttons. Defaults to WhatsApp, Email and Case studies. Use ClayButton variant="dark" | "ghost" on coloured slabs. */
  children?: ReactNode;
  id?: string;
  /** Heading level. Default "h2". */
  as?: "h2" | "h3";
};

/** Full-width clay slab that ends a page or a section. */
export default function CtaBand({ title, eyebrow = "$ ./hire --levo", body, tone = "lime", children, id, as = "h2" }: CtaBandProps) {
  const H = as;
  return (
    <div className={`ctaband ctaband--${tone}`}>
      <div className="ctaband__copy">
        <div className="ctaband__eyebrow">{eyebrow}</div>
        <H id={id} className="ctaband__title">{title}</H>
        {body && <p className="ctaband__body">{body}</p>}
      </div>
      <div className="ctaband__actions">
        {children ?? (
          <>
            <ClayButton variant="dark" href={waLink("Hi Levo, I saw your portfolio and want to talk.")} external>WhatsApp</ClayButton>
            <ClayButton variant="ghost" href={`mailto:${SITE.email}`} icon="@">Email</ClayButton>
            <ClayButton variant="ghost" href="/work">Case studies</ClayButton>
          </>
        )}
      </div>
    </div>
  );
}
