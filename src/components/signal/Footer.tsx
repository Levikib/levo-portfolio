import Link from "next/link";
import { SITE } from "@/data/facts";
import ClayCard from "./ClayCard";

export default function Footer() {
  return (
    <footer className="sp-footer">
      <div className="sp-wrap">
        <ClayCard pad="none" className="sp-footer__bar">
          <div>© {new Date().getFullYear()} {SITE.name}, {SITE.city}, working remote</div>
          <nav aria-label="Footer" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/work">Work</Link>
            <a href={SITE.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={`mailto:${SITE.email}`}>Email</a>
          </nav>
          <div className="sp-mono" style={{ fontSize: 12 }}>type <span style={{ color: "var(--sp-lime)" }}>open makeja</span> in the terminal</div>
        </ClayCard>
      </div>
    </footer>
  );
}
