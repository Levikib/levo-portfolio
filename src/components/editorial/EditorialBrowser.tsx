"use client";
import { useEffect, useState } from "react";
import type { EditorialItem, EditorialKind } from "@/data/editorial";
import { EDITORIAL_KINDS } from "@/data/editorial";
import { ClayButton, ClayCard } from "@/components/signal";
import { waLink } from "@/data/facts";
import EdCard from "./EdCard";

type K = EditorialKind | "all";
const VALID = new Set(EDITORIAL_KINDS.map((k) => k.id));

function readKind(): K {
  const q = new URLSearchParams(window.location.search).get("kind");
  return q && VALID.has(q as K) ? (q as K) : "all";
}

/**
 * Filter chips + uniform grid. The filter lives in ?kind= so a filtered view
 * can be shared. Server render shows everything; the URL is applied on mount.
 */
export default function EditorialBrowser({ items }: { items: EditorialItem[] }) {
  const [kind, setKind] = useState<K>("all");

  useEffect(() => {
    const k = readKind();
    setKind(k);
    // a shared filtered link (or the old /store redirect) should land on the results
    if (k !== "all" && !window.location.hash) {
      requestAnimationFrame(() => document.getElementById("browse")?.scrollIntoView({ block: "start" }));
    }
    const onPop = () => setKind(readKind());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const choose = (k: K) => {
    setKind(k);
    const url = new URL(window.location.href);
    if (k === "all") url.searchParams.delete("kind");
    else url.searchParams.set("kind", k);
    window.history.pushState(null, "", url.pathname + url.search + "#browse");
  };

  const counts = Object.fromEntries(EDITORIAL_KINDS.map((k) => [k.id, k.id === "all" ? items.length : items.filter((i) => i.kind === k.id).length]));
  const shown = kind === "all" ? items : items.filter((i) => i.kind === kind);
  const label = EDITORIAL_KINDS.find((k) => k.id === kind)?.label ?? "Everything";

  return (
    <>
      <div className="ed-filter" role="group" aria-label="Filter by kind of work">
        {EDITORIAL_KINDS.map((k) => (
          <button
            key={k.id}
            type="button"
            className="ed-chip"
            aria-pressed={kind === k.id}
            onClick={() => choose(k.id)}
          >
            {k.label}
            <span className="ed-chip__n" aria-label={`${counts[k.id]} items`}>{counts[k.id]}</span>
          </button>
        ))}
      </div>
      <p className="ed-status" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "piece" : "pieces"}{kind === "all" ? "" : ` in ${label}`}
      </p>

      {shown.length > 0 ? (
        <ul className="ed-grid" role="list">
          {shown.map((item, i) => (
            <li key={item.slug}><EdCard item={item} priority={i < 3 && kind === "all"} /></li>
          ))}
        </ul>
      ) : (
        <ClayCard elevation="pressed" pad="lg" className="ed-empty">
          <div className="clay-kicker">$ ls ./editorial --kind={kind} <span className="clay-accent">0 results</span></div>
          <h3 className="ed-empty__title">Nothing in {label.toLowerCase()} yet.</h3>
          <p className="clay-body">
            {kind === "product"
              ? "No digital products are for sale right now. If you want one of the templates or systems behind this work, ask and I will tell you what is ready."
              : "This shelf is empty for now. Everything else is one tap away."}
          </p>
          <div className="cta-row" style={{ marginTop: 20 }}>
            <button type="button" className="cbtn cbtn--primary cbtn--md" onClick={() => choose("all")}>
              <span className="cbtn__label">See everything</span><span className="cbtn__icon" aria-hidden>↺</span>
            </button>
            <ClayButton variant="ghost" href={waLink(`Hi Levo, I am interested in ${label.toLowerCase()} from your Editorial page.`)} external>Ask on WhatsApp</ClayButton>
          </div>
        </ClayCard>
      )}
    </>
  );
}
