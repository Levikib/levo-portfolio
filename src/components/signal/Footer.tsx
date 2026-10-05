import Link from "next/link";
import { SITE } from "@/data/facts";

export default function Footer() {
  return (
    <footer className="sp-footer">
      <div className="sp-wrap sp-footer__row">
        <div>© {new Date().getFullYear()} {SITE.name} · {SITE.city} → remote</div>
        <nav aria-label="Footer" style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          <Link href="/work">Work</Link>
          <a href={SITE.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${SITE.email}`}>Email</a>
        </nav>
        <div className="sp-mono" style={{ fontSize: 12 }}>type <span style={{ color: "var(--sp-lime)" }}>open makeja</span> in the terminal</div>
      </div>
    </footer>
  );
}
