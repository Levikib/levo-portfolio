"use client";
import "./nav.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { PROJECTS } from "@/data/projects";
import { EDITORIAL } from "@/data/editorial";
import { COMING, THOUGHTS } from "@/data/thoughts";
import { CREATIVE_SECTIONS } from "@/data/creative";
import { waLink } from "@/data/facts";
import { KIND_META, TOPIC_META, fmtDate, mediaCount, published, stillOf } from "@/components/editorial/meta";
import ClayButton from "./ClayButton";

/* ─── Menu model ───────────────────────────────────────────────────────────── */
type MenuId = "work" | "creative" | "takes";
type TopItem =
  | { kind: "mega"; id: MenuId; label: string; match: string[] }
  | { kind: "link"; id: string; label: string; href: string; match: string[] };

const TOP: TopItem[] = [
  { kind: "mega", id: "work", label: "Work", match: ["/work"] },
  { kind: "mega", id: "creative", label: "Creative & Strategy", match: ["/creative", "/editorial"] },
  { kind: "mega", id: "takes", label: "Takes", match: ["/thoughts"] },
  { kind: "link", id: "about", label: "About", href: "/about", match: ["/about"] },
];
const MEGAS = TOP.filter((t): t is Extract<TopItem, { kind: "mega" }> => t.kind === "mega");

const GROUPS = [
  { label: "Products I founded", slugs: ["makeja-homes", "levo-cli"] },
  { label: "Client builds", slugs: ["mikono-creations", "elatec-safety-systems", "noevella-group"] },
  { label: "Lab", slugs: ["ghostnet"] },
].map((g) => ({ ...g, projects: g.slugs.map((s) => PROJECTS.find((p) => p.slug === s)).filter((p): p is (typeof PROJECTS)[number] => !!p) }));

const FEATURED_ED = EDITORIAL.find((i) => i.featured && i.kind === "magazine") ?? EDITORIAL.find((i) => i.featured) ?? EDITORIAL[0];
const FEATURED_STILL = FEATURED_ED ? stillOf(FEATURED_ED.cover) : null;
const POSTS = published(THOUGHTS).slice(0, 3);

const OPEN_DELAY = 90;
const CLOSE_DELAY = 220;

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const isMouse = (e: ReactPointerEvent) => e.pointerType === "mouse" || e.pointerType === "pen";
const matches = (path: string, m: string[]) => m.some((x) => path === x || path.startsWith(`${x}/`));
const v = (o: Record<string, string | number>) => o as CSSProperties;

function Caret() {
  return (
    <svg className="nv-caret" aria-hidden width="10" height="10" viewBox="0 0 10 10">
      <path d="M1.5 3.5 5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState<MenuId | null>(null);
  const [sheet, setSheet] = useState(false);
  const [acc, setAcc] = useState<MenuId | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [stageH, setStageH] = useState(0);

  const zoneRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const indRef = useRef<HTMLSpanElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const openRef = useRef<MenuId | null>(null);
  const pinned = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const hoverKey = useRef<string | null>(null);
  const openedAtY = useRef(0);

  const activeKey = TOP.find((t) => matches(pathname, t.match))?.id ?? null;

  /* ─── Sliding indicator ──────────────────────────────────────────────────── */
  const place = useCallback((key: string | null) => {
    const ind = indRef.current;
    if (!ind) return;
    const el = key ? itemRefs.current[key] : null;
    if (!el) { ind.dataset.show = "false"; return; }
    const snap = ind.dataset.show !== "true";
    if (snap) ind.dataset.snap = "true";
    ind.style.width = `${el.offsetWidth}px`;
    ind.style.transform = `translate3d(${el.offsetLeft}px, -50%, 0)`;
    if (snap) { void ind.offsetWidth; ind.dataset.snap = "false"; }
    ind.dataset.show = "true";
  }, []);
  const settle = useCallback(() => place(hoverKey.current ?? openRef.current ?? activeKey), [place, activeKey]);

  useIsoLayoutEffect(() => { settle(); }, [settle, open]);
  useEffect(() => {
    const onResize = () => settle();
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(settle).catch(() => {});
    return () => window.removeEventListener("resize", onResize);
  }, [settle]);

  /* ─── Open / close ───────────────────────────────────────────────────────── */
  const clear = () => { if (timer.current) window.clearTimeout(timer.current); timer.current = undefined; };
  const set = (id: MenuId | null) => {
    openRef.current = id;
    if (id) openedAtY.current = window.scrollY;
    setOpen(id);
  };
  const close = useCallback(() => { clear(); pinned.current = false; openRef.current = null; setOpen(null); }, []);

  const enterMega = (id: MenuId) => (e: ReactPointerEvent) => {
    hoverKey.current = id; settle();
    if (!isMouse(e)) return;
    clear();
    if (openRef.current === id) return;
    if (openRef.current) { pinned.current = false; set(id); return; }
    timer.current = window.setTimeout(() => { pinned.current = false; set(id); }, OPEN_DELAY);
  };
  const enterPlain = (key: string) => (e: ReactPointerEvent) => {
    hoverKey.current = key; settle();
    if (!isMouse(e) || !openRef.current || pinned.current) return;
    clear();
    timer.current = window.setTimeout(close, 120);
  };
  const leaveList = () => { hoverKey.current = null; settle(); };
  const leaveZone = (e: ReactPointerEvent) => {
    if (!isMouse(e)) return;
    clear();
    if (pinned.current || !openRef.current) return;
    timer.current = window.setTimeout(close, CLOSE_DELAY);
  };
  const enterZone = (e: ReactPointerEvent) => { if (isMouse(e) && openRef.current) clear(); };

  const onTopClick = (id: MenuId) => {
    clear();
    if (openRef.current === id) {
      if (pinned.current) close(); else pinned.current = true;
      return;
    }
    pinned.current = true;
    set(id);
  };

  const focusFirstIn = (id: MenuId) =>
    requestAnimationFrame(() => panelRefs.current[id]?.querySelector<HTMLElement>("a")?.focus());

  const onTopKey = (key: string) => (e: ReactKeyboardEvent<HTMLElement>) => {
    const list = Array.from(listRef.current?.querySelectorAll<HTMLElement>(".nv-top") ?? []);
    const i = list.findIndex((b) => b.dataset.key === key);
    const go = (n: number) => list[(n + list.length) % list.length]?.focus();
    if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
    else if (e.key === "Home") { e.preventDefault(); go(0); }
    else if (e.key === "End") { e.preventDefault(); go(list.length - 1); }
    else if (e.key === "ArrowDown" && MEGAS.some((m) => m.id === key)) {
      e.preventDefault();
      clear(); pinned.current = true; set(key as MenuId);
      focusFirstIn(key as MenuId);
    }
  };

  const onPanelKey = (id: MenuId) => (e: ReactKeyboardEvent<HTMLElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const links = Array.from(panelRefs.current[id]?.querySelectorAll<HTMLElement>("a") ?? []);
    const i = links.indexOf(document.activeElement as HTMLElement);
    if (i < 0) return;
    e.preventDefault();
    if (e.key === "ArrowUp" && i === 0) { itemRefs.current[id]?.focus(); return; }
    links[(i + (e.key === "ArrowDown" ? 1 : -1) + links.length) % links.length]?.focus();
  };

  /* Panel stage height follows the open panel, so switching menus morphs the card. */
  useIsoLayoutEffect(() => {
    if (!open) return;
    const measure = () => setStageH(panelRefs.current[open]?.offsetHeight ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open]);

  /* Escape, outside press, scroll. */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (zoneRef.current && !zoneRef.current.contains(e.target as Node)) close(); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const id = openRef.current;
      const inside = zoneRef.current?.contains(document.activeElement);
      close();
      if (inside && id) itemRefs.current[id]?.focus();
    };
    const onScroll = () => { if (Math.abs(window.scrollY - openedAtY.current) > 80) close(); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open, close]);

  /* Scrolled state for the bar. */
  useEffect(() => {
    let raf = 0;
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24)); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  /* Route change closes everything. */
  useEffect(() => { close(); setSheet(false); setAcc(null); hoverKey.current = null; }, [pathname, close]);
  useEffect(() => () => clear(), []);

  /* ─── Mobile sheet: scroll lock, Escape, focus loop, auto close on desktop ── */
  useEffect(() => {
    if (!sheet) return;
    const body = document.body;
    const prev = body.style.overflow;
    body.style.overflow = "hidden";
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSheet(false); burgerRef.current?.focus(); return; }
      if (e.key !== "Tab") return;
      const items = [burgerRef.current, ...Array.from(sheetRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [])]
        .filter((el): el is HTMLElement => !!el && el.offsetParent !== null && getComputedStyle(el).visibility !== "hidden");
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const mq = window.matchMedia("(min-width: 901px)");
    const onMq = () => { if (mq.matches) setSheet(false); };
    document.addEventListener("keydown", onKey);
    mq.addEventListener?.("change", onMq);
    return () => {
      body.style.overflow = prev;
      lenis?.start();
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener?.("change", onMq);
    };
  }, [sheet]);

  const closeAll = () => { close(); setSheet(false); };

  /* ─── Render ─────────────────────────────────────────────────────────────── */
  return (
    <header className="nv" data-scrolled={scrolled} data-open={!!open} data-sheet={sheet}>
      <div ref={zoneRef} className="nv__zone" onPointerLeave={leaveZone} onPointerEnter={enterZone}
        onBlur={(e) => {
          const next = e.relatedTarget as Node | null;
          if (openRef.current && next && !e.currentTarget.contains(next)) close();
        }}>
        <nav aria-label="Main" className="nv__bar">
          <Link href="/" className="nv-brand" aria-label="Levis Kibirie, home" onPointerEnter={enterPlain("brand")} onPointerLeave={leaveList}>
            <span className="nv-brand__key" aria-hidden><span>&gt;</span><i>_</i></span>
            <span className="nv-brand__word" aria-hidden>levo<span className="nv-brand__at">@nairobi</span></span>
          </Link>

          <div className="nv__links" onPointerLeave={leaveList}>
          <span ref={indRef} className="nv-ind" aria-hidden data-show="false" />
          <ul ref={listRef} className="nv__list">
            {TOP.map((t) => {
              const current = activeKey === t.id;
              if (t.kind === "link") {
                return (
                  <li key={t.id} onPointerEnter={enterPlain(t.id)}>
                    <Link
                      ref={(el) => { itemRefs.current[t.id] = el; }}
                      href={t.href}
                      data-key={t.id}
                      className="nv-top"
                      aria-current={pathname === t.href ? "page" : current ? "true" : undefined}
                      onFocus={() => { hoverKey.current = t.id; settle(); }}
                      onKeyDown={onTopKey(t.id)}
                    >
                      <span className="nv-top__label">{t.label}</span>
                    </Link>
                  </li>
                );
              }
              return (
                <li key={t.id} onPointerEnter={enterMega(t.id)}>
                  <button
                    ref={(el) => { itemRefs.current[t.id] = el; }}
                    type="button"
                    data-key={t.id}
                    id={`nv-btn-${t.id}`}
                    className="nv-top"
                    aria-expanded={open === t.id}
                    aria-controls={`nv-panel-${t.id}`}
                    aria-current={current ? "true" : undefined}
                    onClick={() => onTopClick(t.id)}
                    onFocus={() => { hoverKey.current = t.id; settle(); }}
                    onKeyDown={onTopKey(t.id)}
                  >
                    <span className="nv-top__label">{t.label}</span>
                    <Caret />
                  </button>
                </li>
              );
            })}
          </ul>
          </div>

          <div className="nv__end">
            <span onPointerEnter={enterPlain("cta")} onPointerLeave={leaveList} className="nv-cta-wrap">
              <ClayButton href="/contact" variant="signal" className="nv-cta">Let&apos;s talk</ClayButton>
            </span>
            <button
              ref={burgerRef}
              type="button"
              className="nv-burger"
              aria-expanded={sheet}
              aria-controls="nv-sheet"
              aria-label={sheet ? "Close menu" : "Open menu"}
              onClick={() => setSheet((s) => !s)}
            >
              <span /><span /><span />
            </button>
          </div>
        </nav>

        {/* ─── Desktop mega ─────────────────────────────────────────────────── */}
        <div className="nv-mega" data-open={!!open}>
          <div className="nv-mega__card" style={{ height: open ? stageH : undefined }}>
            {/* Work */}
            <div
              ref={(el) => { panelRefs.current.work = el; }}
              id="nv-panel-work"
              className="nv-panel nv-panel--work"
              data-open={open === "work"}
              aria-labelledby="nv-btn-work"
              role="region"
              onKeyDown={onPanelKey("work")}
            >
              {[[GROUPS[0], GROUPS[2]], [GROUPS[1]]].map((col, ci) => (
                <div key={ci} className="nv-col">
                  {col.map((g, gi) => (
                    <div key={g.label} className="nv-group">
                      <p className="nv-group__head" style={v({ "--i": ci * 3 + gi * 2 })}>{g.label}</p>
                      <ul>
                        {g.projects.map((p, pi) => (
                          <li key={p.slug} style={v({ "--i": ci * 3 + gi * 2 + pi + 1 })}>
                            <Link href={`/work/${p.slug}`} className="nv-row" style={v({ "--acc": p.accent })} onClick={closeAll}>
                              <span className="nv-row__dot" aria-hidden />
                              <span className="nv-row__text"><b>{p.name}</b><small>{p.tagline}</small></span>
                              <span className="nv-row__arrow" aria-hidden>→</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <Link href="/work" className="nv-feature" style={v({ "--i": 6, "--acc": "#ff8a1f" })} onClick={closeAll}>
                <span className="nv-feature__media" aria-hidden>
                  <Image src="/reels/makeja-reel-16x9-10s.webp" alt="" fill sizes="300px" />
                </span>
                <span className="nv-feature__body">
                  <span className="nv-kicker">$ ls ./work</span>
                  <b className="nv-feature__title">Every case study, in depth</b>
                  <small>{PROJECTS.length} builds. Architecture, decisions and real code.</small>
                  <span className="nv-pill">All case studies<i aria-hidden>→</i></span>
                </span>
              </Link>
            </div>

            {/* Creative & Strategy */}
            <div
              ref={(el) => { panelRefs.current.creative = el; }}
              id="nv-panel-creative"
              className="nv-panel nv-panel--creative"
              data-open={open === "creative"}
              aria-labelledby="nv-btn-creative"
              role="region"
              onKeyDown={onPanelKey("creative")}
            >
              <div className="nv-intro" style={v({ "--i": 0 })}>
                <span className="nv-kicker">$ cd ./creative</span>
                <p className="nv-intro__title">The other half of the work.</p>
                <p className="nv-intro__text">Design, brand, strategy and growth for the products I build and the brands I work with.</p>
                <Link href="/creative" className="nv-more" onClick={closeAll}>Creative &amp; Strategy overview<i aria-hidden>→</i></Link>
              </div>
              <ul className="nv-tiles">
                {CREATIVE_SECTIONS.map((s, i) => (
                  <li key={s.id} style={v({ "--i": i + 1 })}>
                    <Link href={s.href} className="nv-tile" style={v({ "--acc": s.accent })} onClick={closeAll}>
                      <span className="nv-tile__glyph" aria-hidden>{s.glyph}</span>
                      <span className="nv-row__text"><b>{s.label}</b><small>{s.blurb}</small></span>
                    </Link>
                  </li>
                ))}
              </ul>
              {FEATURED_ED && (
                <Link href={`/editorial/${FEATURED_ED.slug}`} className="nv-feature nv-feature--ed" style={v({ "--i": 5, "--acc": KIND_META[FEATURED_ED.kind].accent })} onClick={closeAll}>
                  <span className="nv-feature__media nv-feature__media--object" aria-hidden>
                    {FEATURED_STILL && (
                      <>
                        <Image className="nv-feature__blur" src={FEATURED_STILL.src} alt="" fill sizes="120px" />
                        <span className="nv-feature__obj" style={{ aspectRatio: `${FEATURED_STILL.w} / ${FEATURED_STILL.h}` }}>
                          <Image src={FEATURED_STILL.src} alt="" fill sizes="140px" />
                        </span>
                      </>
                    )}
                  </span>
                  <span className="nv-feature__body">
                    <span className="nv-kicker">Featured · {KIND_META[FEATURED_ED.kind].label}</span>
                    <b className="nv-feature__title">{FEATURED_ED.title}</b>
                    <small>{mediaCount(FEATURED_ED)}</small>
                  </span>
                </Link>
              )}
            </div>

            {/* Takes */}
            <div
              ref={(el) => { panelRefs.current.takes = el; }}
              id="nv-panel-takes"
              className="nv-panel nv-panel--takes"
              data-open={open === "takes"}
              aria-labelledby="nv-btn-takes"
              role="region"
              onKeyDown={onPanelKey("takes")}
            >
              <div className="nv-intro" style={v({ "--i": 0 })}>
                <span className="nv-kicker">$ cat ./takes</span>
                <p className="nv-intro__title">Takes.</p>
                <p className="nv-intro__text">Opinions on building, business and Nairobi tech. Short, direct, from the work.</p>
                <Link href="/thoughts" className="nv-more" onClick={closeAll}>All takes<i aria-hidden>→</i></Link>
              </div>
              {POSTS.length > 0 ? (
                <ul className="nv-posts">
                  {POSTS.map((p, i) => (
                    <li key={p.slug} style={v({ "--i": i + 1 })}>
                      <Link href={`/thoughts/${p.slug}`} className="nv-row" style={v({ "--acc": TOPIC_META[p.topic].accent })} onClick={closeAll}>
                        <span className="nv-row__dot" aria-hidden />
                        <span className="nv-row__text"><b>{p.title}</b><small>{TOPIC_META[p.topic].label} · {fmtDate(p.date)} · {p.minutes} min</small></span>
                        <span className="nv-row__arrow" aria-hidden>→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="nv-soon" style={v({ "--i": 1 })}>
                  <p className="nv-soon__lead">First takes dropping soon.</p>
                  <ul>
                    {COMING.map((c, i) => (
                      <li key={c.title} className="nv-soon__item" style={v({ "--i": i + 2, "--acc": TOPIC_META[c.topic].accent })}>
                        <span className="nv-row__dot" aria-hidden />
                        <span>{c.title}</span>
                        <em>soon</em>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Mobile sheet ─────────────────────────────────────────────────────── */}
      <div
        ref={sheetRef}
        id="nv-sheet"
        className="nv-sheet"
        data-open={sheet}
        role="dialog"
        aria-label="Site menu"
        aria-hidden={!sheet}
      >
        <div className="nv-sheet__scroll" data-lenis-prevent>
          <p className="nv-sheet__eyebrow">$ menu --all</p>
          {MEGAS.map((m, mi) => {
            const isOpen = acc === m.id;
            return (
              <div key={m.id} className="nv-acc" style={v({ "--i": mi })} data-open={isOpen}>
                <button
                  type="button"
                  className="nv-acc__head"
                  id={`nv-acc-btn-${m.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`nv-acc-${m.id}`}
                  aria-current={activeKey === m.id ? "true" : undefined}
                  onClick={() => setAcc(isOpen ? null : m.id)}
                >
                  <span>{m.label}</span>
                  <span className="nv-acc__plus" aria-hidden />
                </button>
                <div id={`nv-acc-${m.id}`} className="nv-acc__body" role="region" aria-labelledby={`nv-acc-btn-${m.id}`}>
                  <div className="nv-acc__inner">
                    {m.id === "work" && (
                      <>
                        {GROUPS.map((g) => (
                          <div key={g.label} className="nv-acc__group">
                            <p className="nv-group__head">{g.label}</p>
                            {g.projects.map((p) => (
                              <Link key={p.slug} href={`/work/${p.slug}`} className="nv-mrow" style={v({ "--acc": p.accent })} onClick={closeAll}>
                                <span className="nv-row__dot" aria-hidden />
                                <span className="nv-row__text"><b>{p.name}</b><small>{p.kind}</small></span>
                              </Link>
                            ))}
                          </div>
                        ))}
                        <Link href="/work" className="nv-more" onClick={closeAll}>All case studies<i aria-hidden>→</i></Link>
                      </>
                    )}
                    {m.id === "creative" && (
                      <>
                        {CREATIVE_SECTIONS.map((s) => (
                          <Link key={s.id} href={s.href} className="nv-mrow" style={v({ "--acc": s.accent })} onClick={closeAll}>
                            <span className="nv-tile__glyph" aria-hidden>{s.glyph}</span>
                            <span className="nv-row__text"><b>{s.label}</b><small>{s.blurb}</small></span>
                          </Link>
                        ))}
                        <Link href="/creative" className="nv-more" onClick={closeAll}>Creative &amp; Strategy overview<i aria-hidden>→</i></Link>
                      </>
                    )}
                    {m.id === "takes" && (
                      <>
                        {POSTS.length > 0 ? POSTS.map((p) => (
                          <Link key={p.slug} href={`/thoughts/${p.slug}`} className="nv-mrow" style={v({ "--acc": TOPIC_META[p.topic].accent })} onClick={closeAll}>
                            <span className="nv-row__dot" aria-hidden />
                            <span className="nv-row__text"><b>{p.title}</b><small>{TOPIC_META[p.topic].label} · {p.minutes} min</small></span>
                          </Link>
                        )) : (
                          <p className="nv-acc__note">Opinions on building, business and Nairobi tech. First takes dropping soon.</p>
                        )}
                        <Link href="/thoughts" className="nv-more" onClick={closeAll}>Go to Takes<i aria-hidden>→</i></Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {TOP.filter((t): t is Extract<TopItem, { kind: "link" }> => t.kind === "link").map((t, i) => (
            <Link key={t.id} href={t.href} className="nv-acc__head nv-acc__link" style={v({ "--i": MEGAS.length + i })}
              aria-current={pathname === t.href ? "page" : undefined} onClick={closeAll}>
              <span>{t.label}</span>
              <span aria-hidden>→</span>
            </Link>
          ))}
        </div>
        <div className="nv-sheet__foot">
          <ClayButton href="/contact" variant="signal" size="lg" className="nv-sheet__cta">Let&apos;s talk</ClayButton>
          <ClayButton href={waLink("Hi Levo, I saw your portfolio and want to talk.")} external variant="ghost" size="lg" className="nv-sheet__wa">WhatsApp</ClayButton>
        </div>
      </div>
    </header>
  );
}
