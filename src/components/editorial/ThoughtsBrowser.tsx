"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { Thought, ThoughtTopic } from "@/data/thoughts";
import { TOPICS } from "@/data/thoughts";
import { ClayCard } from "@/components/signal";
import { TOPIC_META, fmtDate } from "./meta";

type T = ThoughtTopic | "all";
const VALID = new Set(TOPICS.map((t) => t.id));
const readTopic = (): T => {
  const q = new URLSearchParams(window.location.search).get("topic");
  return q && VALID.has(q as T) ? (q as T) : "all";
};

function PostCard({ t, big }: { t: Thought; big?: boolean }) {
  const m = TOPIC_META[t.topic];
  return (
    <ClayCard href={`/thoughts/${t.slug}`} accent={m.accent} pad="none" className={`th-card${big ? " th-card--big" : ""}`} aria-label={`${t.title}. ${m.label}, ${t.minutes} minute read`}>
      {t.cover && (
        <div className="ed-frame ed-frame--card ed-frame--cover th-card__cover">
          <Image src={t.cover.src} alt={t.cover.alt} fill sizes={big ? "(max-width: 900px) 92vw, 640px" : "(max-width: 700px) 92vw, 380px"} />
        </div>
      )}
      <div className="th-card__body">
        <div className="ed-card__meta">
          <span className="ed-badge" style={{ "--accent": m.accent } as CSSProperties}>{m.label}</span>
          <span className="ed-card__client"><time dateTime={t.date}>{fmtDate(t.date)}</time> · {t.minutes} min</span>
        </div>
        {big ? <h2 className="th-card__title">{t.title}</h2> : <h3 className="th-card__title">{t.title}</h3>}
        <p className="ed-card__blurb">{t.dek}</p>
        <div className="clay-foot">
          {big && <span className="th-card__latest">Latest</span>}
          <span className="clay-fake-btn" aria-hidden>Read<i>→</i></span>
        </div>
      </div>
    </ClayCard>
  );
}

/** Topic chips, the latest post, uniform post cards and the "coming soon" list, all filtered together. */
export default function ThoughtsBrowser({ posts, coming }: { posts: Thought[]; coming: { title: string; topic: ThoughtTopic }[] }) {
  const [topic, setTopic] = useState<T>("all");
  useEffect(() => {
    setTopic(readTopic());
    const onPop = () => setTopic(readTopic());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const choose = (k: T) => {
    setTopic(k);
    const url = new URL(window.location.href);
    if (k === "all") url.searchParams.delete("topic"); else url.searchParams.set("topic", k);
    window.history.pushState(null, "", url.pathname + url.search);
  };

  const match = (x: { topic: ThoughtTopic }) => topic === "all" || x.topic === topic;
  const list = posts.filter(match);
  const soon = coming.filter(match);
  const [latest, ...rest] = list;
  const count = (id: T) => posts.filter((p) => id === "all" || p.topic === id).length + coming.filter((c) => id === "all" || c.topic === id).length;
  const label = TOPICS.find((t) => t.id === topic)?.label ?? "All";

  return (
    <>
      <div className="ed-filter" role="group" aria-label="Filter by topic">
        {TOPICS.map((t) => (
          <button key={t.id} type="button" className="ed-chip" aria-pressed={topic === t.id} onClick={() => choose(t.id)}>
            {t.label}
            <span className="ed-chip__n" aria-label={`${count(t.id)} items`}>{count(t.id)}</span>
          </button>
        ))}
      </div>
      <p className="ed-status" aria-live="polite">
        {list.length} published, {soon.length} coming{topic === "all" ? "" : ` in ${label}`}
      </p>

      {latest ? (
        <div className="th-latest"><PostCard t={latest} big /></div>
      ) : (
        <ClayCard pad="lg" className="th-empty">
          <div className="th-empty__copy">
            <div className="clay-kicker">$ ls ./thoughts{topic === "all" ? "" : `/${topic}`} <span className="clay-accent">0 published</span></div>
            <h2 className="th-empty__title">{posts.length === 0 ? "The first essays are on the way." : `Nothing published in ${label.toLowerCase()} yet.`}</h2>
            <p className="clay-body">
              {soon.length > 0
                ? "Below is what I plan to write first. Get them by email the day they go up."
                : "Pick another topic, or get new posts by email the day they go up."}
            </p>
            <div className="cta-row" style={{ marginTop: 20 }}>
              <a href="#subscribe" className="cbtn cbtn--primary cbtn--md"><span className="cbtn__label">Get new posts</span><span className="cbtn__icon" aria-hidden>↓</span></a>
            </div>
          </div>
          <div className="well th-term" aria-hidden>
            <div className="th-term__bar"><i /><i /><i /><span>~/thoughts</span></div>
            <pre>
              <span className="th-term__p">$</span> ls ./thoughts{topic === "all" ? "" : `/${topic}`}{"\n"}
              <span className="th-term__dim">total 0</span>{"\n"}
              <span className="th-term__p">$</span> cat ./thoughts/PLANNED{"\n"}
              {(soon.length ? soon : coming).map((c) => `· ${c.title}\n`).join("")}
              <span className="th-term__p">$</span> <span className="th-term__cur" />
            </pre>
          </div>
        </ClayCard>
      )}

      {rest.length > 0 && (
        <ul className="ed-grid th-grid" role="list">
          {rest.map((t) => <li key={t.slug}><PostCard t={t} /></li>)}
        </ul>
      )}

      {soon.length > 0 && (
        <div className="th-coming">
          <h2 className="ed-h2 th-coming__h">Coming soon</h2>
          <ul className="ed-grid th-grid" role="list">
            {soon.map((c) => {
              const m = TOPIC_META[c.topic];
              return (
                <li key={c.title}>
                  <ClayCard elevation="pressed" accent={m.accent} pad="lg" className="th-soon">
                    <div className="ed-card__meta">
                      <span className="ed-badge" style={{ "--accent": m.accent } as CSSProperties}>{m.label}</span>
                      <span className="th-soon__stamp">Coming soon</span>
                    </div>
                    <h3 className="th-card__title">{c.title}</h3>
                    <div className="clay-foot"><span className="th-soon__state"><i aria-hidden />Planned, not published yet</span></div>
                  </ClayCard>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
