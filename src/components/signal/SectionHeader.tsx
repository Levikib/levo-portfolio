import type { ReactNode } from "react";

export type SectionHeaderProps = {
  /** Mono command-line label above the title, e.g. "$ ls ./work". */
  eyebrow: string;
  title: ReactNode;
  /** Optional supporting line under the title. */
  kicker?: ReactNode;
  /** id for the heading, so a <section aria-labelledby> can point at it. */
  id?: string;
  /** Heading level. Default "h2". Use "h1" once per page. */
  as?: "h1" | "h2";
  align?: "left" | "center";
  /** Optional hand-written marker note beside the title. */
  note?: string;
};

export default function SectionHeader({ eyebrow, title, kicker, id, as = "h2", align = "left", note }: SectionHeaderProps) {
  const H = as;
  return (
    <header className={`shead shead--${align}${as === "h1" ? " shead--h1" : ""}`}>
      <div className="shead__eyebrow"><span className="shead__dot" aria-hidden />{eyebrow}</div>
      <H id={id} className="shead__title">{title}</H>
      {note && <span className="shead__note" aria-hidden>{note}</span>}
      {kicker && <p className="shead__kicker">{kicker}</p>}
    </header>
  );
}
