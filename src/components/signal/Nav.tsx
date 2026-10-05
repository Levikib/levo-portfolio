"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/data/projects";

const GROUPS = [
  { label: "Products I founded", slugs: ["makeja-homes", "levo-cli"] },
  { label: "Client builds", slugs: ["mikono-creations", "elatec-safety-systems", "noevella-group"] },
  { label: "Systems and lab", slugs: ["core-banking", "ghostnet", "hookah-3d"] },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !(t as HTMLElement).closest?.("[data-mega-toggle]")) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [open]);

  const bySlug = (s: string) => PROJECTS.find((p) => p.slug === s)!;

  return (
    <header className="sp-nav">
      <nav aria-label="Main" className="sp-nav__bar">
        <Link href="/" className="sp-nav__brand">levo<span style={{ color: "var(--sp-signal)" }}>@</span>nairobi:~$</Link>
        <div className="sp-nav__links">
          <button
            type="button"
            data-mega-toggle
            className="sp-nav__link"
            aria-expanded={open}
            aria-controls="sp-mega"
            onClick={() => setOpen((v) => !v)}
          >
            Work
            <svg aria-hidden width="10" height="10" viewBox="0 0 10 10" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}><path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
          </button>
          <Link href="/#terminal" className="sp-nav__link sp-hide-sm">Terminal</Link>
          <Link href="/editorial" className="sp-nav__link sp-hide-sm">Editorial</Link>
          <Link href="/blog" className="sp-nav__link sp-hide-sm">Writing</Link>
          <Link href="/#contact" className="sp-nav__cta">Hire me</Link>
        </div>
      </nav>

      {open && (
        <div id="sp-mega" ref={panelRef} className="sp-mega">
          {GROUPS.map((g) => (
            <div key={g.label} className="sp-mega__col">
              <div className="sp-eyebrow" style={{ fontSize: 11, marginBottom: 8 }}>{g.label}</div>
              {g.slugs.map((s) => {
                const p = bySlug(s);
                return (
                  <Link key={s} href={`/work/${s}`} className="sp-mega__item" onClick={() => setOpen(false)}>
                    <strong>{p.name}</strong>
                    <span>{p.kind}</span>
                  </Link>
                );
              })}
            </div>
          ))}
          <Link href="/work" className="sp-mega__feature" onClick={() => setOpen(false)}>
            <div className="sp-eyebrow" style={{ color: "var(--sp-signal)" }}>$ ls ./work</div>
            <div className="sp-display" style={{ fontSize: 26, fontWeight: 700, marginTop: 8 }}>Every case study, in depth →</div>
            <div style={{ color: "var(--sp-muted)", fontSize: 14, marginTop: 6 }}>Architecture, decisions and real code.</div>
          </Link>
        </div>
      )}
    </header>
  );
}
