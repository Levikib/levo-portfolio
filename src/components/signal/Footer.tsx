import Link from "next/link";
import Socials from "./Socials";
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
            <Link href="/creative">Creative &amp; Strategy</Link>
            <Link href="/thoughts">Takes</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <Socials size="sm" />
          <div className="sp-mono" style={{ fontSize: 12 }}>type <span style={{ color: "var(--sp-lime)" }}>open makeja</span> in the terminal</div>
        </ClayCard>
      </div>
    </footer>
  );
}
