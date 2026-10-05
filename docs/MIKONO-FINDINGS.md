# Mikono Creations: case-study fact-check and findings

Principal-engineer pass over the `mikono-creations` entry in `src/data/projects.ts`, done 2026-10-05 against the local clone `/home/claude/levikib/mikono-creations` (read-only, single commit `77fee0a`, 2026-10-05, 1,238 tracked files). Every verdict cites `file:line` in that repo unless it says otherwise.

Legend: **TRUE** = code or committed report confirms it. **PARTIAL** = true but overstated or needs a qualifier. **FALSE** = the repo contradicts it. **UNVERIFIED** = not provable from the repo. **OUTDATED** = was true, no longer is.

Commands run (no network, no writes to the repo; `git status` clean afterwards):

- `find app -name page.tsx | wc -l` = 51
- `find components -name '*.tsx' | wc -l` = 132 (69 top level, 63 in `card/ cart/ enquiry/ filters/ fx/ gallery/ helpers/ legal/ studio/ wizard/`)
- `grep -c '^  t("' data/studio/orderTypes.ts` = 29
- `node scripts/photo-coverage.mjs --source` = "88 of 88 supplied files appear on the site. UNUSED (0)"
- Unit tests: `test-whatsapp` 58, `test-checkout` 73, `test-enquiry` 18, `test-studio` 99, `test-helpers` 46 = **294 passing**
- `node scripts/qa-copy.mjs` = `hits=0 TODO=0`; `node scripts/tokens-check.mjs` exit 0

---

## 1. Verification table

| Claim in projects.ts | Verdict | Evidence |
|---|---|---|
| 51 route templates | TRUE | `find app -name page.tsx` = 51. No `route.ts` handlers (static first, no API). |
| **79 components** | **FALSE** | 132 `.tsx` files under `components/` (plus 11 `.ts` helpers, 149 files total). 69 at top level alone. Source of 79 is `docs/ENGINEERING-AUDIT.md:43` (portfolio repo), written before the code was visible. Use **132 component files**. |
| 88/88 client photos used | PARTIAL | 88 is 87 photos **plus 1 video** (`strategy/gates/phase1-media-gate.md:6`; `media/manifest/merged.json` last ids `img-087.jpg`, `vid-001.mp4`). Coverage scan: 88 of 88 used (`scripts/photo-coverage.mjs`, run with `--source`). Say "88/88 supplied photos and video". |
| "used and labelled correctly" (results) | PARTIAL | Labels for 44 unclear images are majority votes, and the client "corrects at review" (`strategy/07-BUILD-DECISIONS.md:12` R6; `phase1-media-gate.md:26`). "Correctly" is not proven. |
| 47 journal posts | TRUE | `content/journal/index.ts:1-3` (10 legacy + 12 + 12 + 13); `content/journal/images.generated.json` has 47 keys. |
| **23 order types** | **FALSE** | 29: `data/studio/orderTypes.ts:36` comment "29 types", 29 `t(...)` entries at :37-67. `strategy/stage2/studio/DATA-MODEL.md:484` "order types 29". `README.md:23` still says 23 (stale, fix it there too). |
| Gift finder, size finder, safari family builder | TRUE | `app/gifts/finder/page.tsx`, `app/size-finder/page.tsx`, `app/build-a-family/page.tsx` |
| Animation budget 4 phone / 6 desktop | TRUE, needs detail | `components/fx/engine/index.ts:65-69`: `tier === "lite" ? 2 : phone ? 4 : 6`, phone = `innerWidth < 900`, minus 2 after slow frames (:212-216). |
| Budget "set before first paint" | PARTIAL | The **tier** (off / still / lite / full) is set before first paint by an inline head script (`public/splash-gate.js:1, 14-28`). The **budget number** is computed by the engine after the document is parsed (`engine/index.ts:1-2, 65-69`). Say "tier chosen before first paint". |
| Visible Animals on/off switch | TRUE | `components/fx/AnimalsBar.tsx:7, 43-44` (`role="switch"`, in every footer) |
| Reduced-motion users get a still site | TRUE | `components/fx/engine/tier.ts:4, 32-33` (`still` tier) |
| "layout never shifts" | UNVERIFIED | No CLS gate result says zero for the current build; the 2026-10-05 perf gate errored (`strategy/gates/mobile/summary-2026-10-05.md`). Drop it. |
| `pricesConfirmed` flag | TRUE | `data/facts.ts:4-5` `export const pricesConfirmed = false;` |
| Shows "Price on request" | PARTIAL | Cart lines say "Price on request" (`components/CartLines.tsx:42-44`). Product cards and pages say **"Ask for price"** (`components/ProductCard.tsx:41`, `app/shop/[slug]/page.tsx:126`). |
| Build validates every product once the flag flips | TRUE | `lib/catalogue.ts:147-151` throws `pricesConfirmed is true but no price for: ...`. Four price states P0 to P3 in `lib/pricing.ts:2-7, 36-59`. |
| WhatsApp order with a reference number | TRUE | `lib/whatsapp.ts:91-105` (`MK-YYMMDD-XXXX`, Nairobi date, unbiased random), `:136` first line `Order ref:`. |
| Three verifiers after every rendering step | TRUE | `strategy/00-CHARTER.md:32, 45-50`; reports `strategy/gates/phase4/`, `phase5/`, `phase6/` (visual, content-media, functional-a11y in each). |
| **SEO crawl of 121 pages, zero blocking issues** | **FALSE** | `strategy/21-seo-sweep.md:7-14`: "the 135-URL crawl table is NOT done"; the crawler `strategy/seo/seo-check.mjs:6` is "NOT executed"; section 12 "Crawl output" is empty (`21-seo-sweep.md:401-402`). The number 121 appears nowhere as a page count. Remove. |
| Supports 25+ women | TRUE (client fact) | Client brief fact confirmed by owner ruling `strategy/07-BUILD-DECISIONS.md:8` (R2); `lib/site.ts:5`. Not provable from code, but it is the client's published claim. |
| Brief was 5 WhatsApp zips | TRUE | `media/manifest/index.json`: 88 entries, 5 distinct `zip` ids, original names "WhatsApp Image 2026-09-29 ...". |
| Seven stockists | TRUE | `lib/site.ts:27-35` (7 outlets) |
| "No prices, no catalogue, no labels" | PARTIAL | Prices and delivery fees: TRUE (`00-CHARTER.md:53`). "No catalogue, no labels": UNVERIFIED wording. |
| Client forbade bright colours | TRUE | `00-CHARTER.md:16` rule 4, chroma cap OKLCH 0.13 |
| Wanted the site to feel alive | TRUE | `strategy/08-business-audit.md:1, 7` (owner rated energy low, "from 3 to 7"). Do not quote the score publicly, see section 4. |
| Customers buy through WhatsApp | TRUE | `00-CHARTER.md:9` |
| 8 analysts | TRUE | `00-CHARTER.md:37` "8 media agents"; `media/manifest/batch-1.json` to `batch-8.json` |
| Blind cross-checks | TRUE | `phase1-media-gate.md:9-11` (two agents re-labelled 60 images; 44 of 60 exact agreement) |
| 5-way vote | TRUE | `phase1-media-gate.md:26` (5 deciders on 44 unclear images); `media/manifest/decide-1.json` to `decide-5.json`, `decisions.json` (44 entries) |
| Six reports then an audit | TRUE | `strategy/01` to `06`; `strategy/gates/phase2-audit.md:5-16` |
| Audit "defaulted to FAIL" | PARTIAL | `phase2-audit.md:3` "Default stance: NEEDS WORK". Overall verdict was FAIL (`:15`). Say "defaulted to NEEDS WORK and failed the set". |
| 19 contradictions | TRUE | `phase2-audit.md:34-52` (C1 to C19); `07-BUILD-DECISIONS.md:3` |
| One binding decisions file | TRUE | `07-BUILD-DECISIONS.md:1-3` (D1 to D40 plus owner rulings R1 to R10) |
| Two real prototypes (dark glass vs daylight clay) | TRUE | `strategy/12-futuristic-design-system.md:3` (static HTML with real photos, screenshotted with Playwright), `:30-44`; `strategy/design-lab/a.html`, `b.html`. Screenshots are not committed. |
| Blur too costly on low-end Android, too dark for kids | TRUE | `12-futuristic-design-system.md:35` |
| Multi-step wizard ending in prefilled WhatsApp | TRUE | `lib/orderForm.ts:62-69` (7 step ids), `lib/whatsapp.ts:292-312` |
| Living layer: cast, scroll thread, find-the-herd game on one engine | TRUE | `engine/index.ts:6-14`; `data/living/game.json` 12 finds; 59 SVG sprites in `public/fx/cast`, `cast2` |
| "hand-drawn animals" (summary) | UNVERIFIED | Sprites are SVG files built by `scripts/build-cast.mjs`; nothing records how they were drawn. Say "illustrated". |
| Stack: Next.js | TRUE | `package.json`: next 16.3.8, react 19.2.8, tailwindcss ^4 |
| Stack: static responsive image pipeline | TRUE | `scripts/build-images.mjs:1-10`; `next.config.ts:45-49` custom loader |
| Stack: "90 orchestrated agent calls" | UNVERIFIED | No record in the repo. Source is `docs/ENGINEERING-AUDIT.md:43` (portfolio). `docs/STRATEGY.md:133` already flags the wording. Drop from `stack` (it is not a technology). |
| Scripted gates: copy bans, palette contrast, duplicate media, photo coverage, mobile layout and performance | TRUE (scripts exist) | `scripts/qa-copy.mjs`, `tokens-check.mjs`, `check-duplicate-media.mjs`, `photo-coverage.mjs`, `scripts/mobile-qa/*.mjs`. **Caveat:** latest mobile summary is FAIL (layout 9 critical, 34 high; interactions and perf ERROR), `strategy/gates/mobile/summary-2026-10-05.md:3-10`. Width gate PASS, 0 of 366 runs failing (`width-2026-10-05.md:3`). Do not imply the mobile gates pass. |
| Became the Foundation Build Playbook | UNVERIFIED in repo | Not referenced in the Mikono repo. Supplied by Levo; keep as his claim. |
| Next: "Commit the codebase to GitHub" | OUTDATED | Repo is pushed (commit `77fee0a`). Remove, and remove the placeholder. |
| When: 2026 | TRUE | Commit date 2026-10-05; gate reports dated 2026-10-01 to 2026-10-05. |

Extra numbers verified for the rewrite: 30 products (`data/catalogue.generated.json`, `products.length`), 5 categories (`app/shop/*-animals`, `dolls`, `wall-art`), 16 draft legal documents (`content/legal/`, `README.md:26`), 280 source images to 2,391 WebP variants at 11 widths (`data/imageManifest.generated.json`; `build-images.mjs:21`), quick brief 3 steps and full brief up to 11 (`data/studio.ts:32-33`), 294 unit tests passing.

---

## 2. The six strongest engineering implementations

### 2.1 WhatsApp order builder with a URL length guard and collision-safe references

Every order and custom brief becomes a plain-text WhatsApp message with a reference like `MK-261005-7KQ2`. If the encoded `wa.me` link would be too long, the builder steps down from full to compact to short, and the customer gets the full text copied to paste after.

**Why a hiring manager cares:** it shows the engineer designed for the real failure mode of a link-based checkout (silent truncation on long URLs) and for real people reading references aloud on the phone (no 0/O/1/I/L, no modulo bias).

`lib/whatsapp.ts:89-104`
```ts
const REF_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"; // no 0, O, 1, I, L

/** Reference like MK-261001-7KQ2. Date is Africa/Nairobi (UTC+3, no daylight saving). */
export function generateRef(prefix = "MK", now: Date = new Date(), randomBytes?: (n: number) => Uint8Array): string {
  const t = new Date(now.getTime() + 3 * 3600 * 1000);
  // …
  const rnd = randomBytes ?? ((n: number) => globalThis.crypto.getRandomValues(new Uint8Array(n)));
  let out = "";
  while (out.length < 4) {
    for (const b of rnd(8)) {
      if (b < 248 && out.length < 4) out += REF_ALPHABET[b % 31]; // 248 = 31 * 8, avoids modulo bias
    }
  }
  return `${prefix}-${yy}${mm}${dd}-${out}`;
}
```

`lib/whatsapp.ts:85, 300-312`
```ts
export const URL_BUDGET = 2000;
// …
/** Picks the longest level whose encoded URL fits the budget. fullText is always the full message for copying. */
export function planOrderSend(number: string | undefined, o: OrderMsg): SendPlan {
  const fullText = buildOrderMessage(o, "full");
  const levels: Level[] = ["full", "compact", "short"];
  let last: SendPlan | null = null;
  for (const level of levels) {
    const text = level === "full" ? fullText : buildOrderMessage(o, level);
    const url = buildWaUrl(number, text);
    last = { level, text, fullText, url, tooLong: false, pasteRest: level !== "full" };
    if (!url || url.length <= URL_BUDGET) return last;
  }
  return { ...(last as SendPlan), tooLong: true };
}
```
The Studio has a four-level version that adds a "tight" one-line-per-piece step (`lib/studio/message.ts:183-196`).

### 2.2 Animation engine with device tiers set before first paint and a self-throttling budget

An inline head script picks the animal tier (off, still, lite, full) from the visitor's switch, reduced motion, Save-Data, connection and device memory before anything paints. A standalone engine then lets only the best N animals move (4 on a phone, 6 on desktop, 2 on weak devices) and cuts that by 2 for the session if it sees three slow frames in two seconds.

**Why a hiring manager cares:** it is performance engineering for low-end Android in Kenya, with graceful degradation and accessibility built into the architecture rather than bolted on, and the server markup is never touched by the engine so hydration cannot mismatch (`engine/index.ts:3-4`).

`public/splash-gate.js:20-28`
```js
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var saver = !!cn.saveData || /(^|-)2g$/.test(cn.effectiveType || "");
    var weak = /(^|-)3g$/.test(cn.effectiveType || "") || (n.deviceMemory && n.deviceMemory <= 2) || (n.hardwareConcurrency && n.hardwareConcurrency <= 2) || (n.deviceMemory && n.deviceMemory <= 4 && n.hardwareConcurrency && n.hardwareConcurrency <= 4);
    if (choice === "off") tier = "off";
    else if (reduced) tier = "still";
    else if (saver) tier = choice === "on" ? "lite" : "off";
    else if (weak) tier = "lite";
    d.setAttribute("data-fx", tier);
    d.setAttribute("data-animals", tier === "off" ? "off" : "on");
```

`components/fx/engine/index.ts:65-69, 212-216`
```ts
function setBudget() {
  const phone = innerWidth < 900;
  budget = tier === "lite" ? 2 : phone ? 4 : 6;
  try { if (sessionStorage.getItem("mk-fx-slow")) budget = Math.max(1, budget - 2); } catch { /* storage blocked */ }
}
// …
  if (!force && lastT && dt > 100 && motionOK()) {
    slowFrames = slowFrames.filter((t) => now - t < 2000);
    slowFrames.push(now);
    if (slowFrames.length >= 3) { try { sessionStorage.setItem("mk-fx-slow", "1"); } catch { /* storage blocked */ } setBudget(); soon(0); slowFrames = []; }
  }
```

### 2.3 Static responsive image pipeline replacing a billed runtime optimiser

When Vercel's image optimiser hit the plan limit, the build was changed to pre-render every photo with sharp into WebP at up to 11 widths (280 sources to 2,391 variants), never upscaling, converting ICC to sRGB, and pruning orphans. A custom `next/image` loader maps each request to the nearest pre-built width and caps at 640 px under Save-Data.

**Why a hiring manager cares:** a production cost incident turned into a cheaper, faster design with zero runtime cost, incremental builds and a data-saver mode, without changing any page code.

`scripts/build-images.mjs:1, 19-22`
```js
// Static responsive image pipeline. Replaces Vercel's runtime image optimiser (plan limit hit, 402).
// …
// The spec steps are 320, 480, 640, 960, 1280 and 1600. 160 and 240 serve thumbnails and category circles (44 to 112 css px);
// 400, 560 and 800 close the gaps so a 2-column phone card (about 130 css px) or a rail card (about 196) does not jump a whole step.
const WIDTHS = [160, 240, 320, 400, 480, 560, 640, 800, 960, 1280, 1600];
const WEBP = { quality: 76, effort: 5 };
```

`lib/imageLoader.ts:12, 15-18, 20-27`
```ts
const LITE_MAX = 640;
// …
export const variantPath = (src: string, w: number) => {
  const rel = src.startsWith("/media/") ? src.slice("/media/".length) : "_root" + src;
  return `/media-opt/${rel.replace(/\.[^./]+$/, "")}-${w}.webp`;
};

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  const have = widths[src];
  if (!have || have.length === 0) return src;
  const lite = typeof globalThis !== "undefined" && (globalThis as { __mkLite?: boolean }).__mkLite === true;
  const want = lite ? Math.min(width, LITE_MAX) : width;
  const w = have.find((x) => x >= want) ?? have[have.length - 1];
  return variantPath(src, w);
}
```

### 2.4 Custom Studio data model with flag-driven progressive disclosure

The Studio's 29 order types are data, not code: each carries flags such as `bulk`, `business`, `logo`, `gentle` and `reference`. Pure functions read those flags to decide which steps and sections appear (business details only for business work, proof of rights only when a logo is likely, gentler copy for remembrance pieces).

**Why a hiring manager cares:** a 14-step form that only asks what matters is a hard product problem; modelling it as typed data plus pure predicates makes it testable (99 Studio tests) and lets the owner remove an order type without touching UI code.

`data/studio/orderTypes.ts:36-37, 47, 49, 51`
```ts
/** 29 types. The owner removes any she will not take. */
export const orderTypes: OrderTypeDef[] = [
  // …
  t("mascot", "A mascot for a business or school", "A character that stands for you", "business", "lion", { business: true, logo: true, suggestBase: ["character"], suggestCustomer: "business" }),
  // …
  t("hotel-lodge", "Hotel and lodge amenities", "For guest rooms and gift shops", "business", "store", { business: true, bulk: true, suggestCustomer: "lodge_hotel" }),
  // …
  t("school-classroom", "School or ECD classroom sets", "Sets for a classroom or a centre", "community", "people", { business: true, bulk: true, suggestCustomer: "school" }),
```

`lib/studio/flow.ts:8, 17, 24, 38-41`
```ts
export const wantsBusiness = (b: Brief) => isBusinessCustomer(b) || hasType(b, (t) => !!t.business);
// …
export const isBulk = (b: Brief) => hasType(b, (t) => !!t.bulk) || b.pieces.some((p) => !!qtyBands.find((x) => x.id === p.qtyBand)?.bulk) || totalCount(b) >= BULK_FROM;
// …
export const mayHaveLogo = (b: Brief) => hasLogoFinish(b) || hasType(b, (t) => !!t.logo) || b.pieces.some((p) => p.baseId === "character");
// …
export function activeSteps(path: PathMode, b: Brief): StepId[] {
  if (path === "quick") return quickSteps;
  return fullSteps.filter((s) => s !== "business" || wantsBusiness(b));
}
```

### 2.5 Honest pricing: one flag, four price states, and a build that refuses missing prices

No price was supplied, so nothing is invented. A single flag drives four explicit price states, a total is never shown or estimated before every line and the delivery fee are known, and the catalogue module throws at build time if the flag is turned on while any product lacks a price.

**Why a hiring manager cares:** it encodes a business rule ("no fake prices") as a type-checked state machine and a fail-fast build guard, so a future edit cannot ship a half-priced store.

`lib/pricing.ts:2-7`
```ts
// Four states, from the one flag pricesConfirmed and the fees:
//   P0  prices not confirmed: every line is "price on request". No figure of any kind is shown.
//   P1  prices confirmed, but some lines have no price: known line totals only, no subtotal.
//   P2  every line priced, delivery cost not known yet: lines and subtotal, total reads "plus delivery".
//   P3  every line priced and delivery known (or pickup): lines, subtotal, delivery, total.
// A total is never shown, and never estimated, before P3.
```

`lib/catalogue.ts:147-151`
```ts
// R7: when prices are confirmed every product must have one.
if (pricesConfirmed) {
  const missing = products.filter((p) => p.priceKes == null).map((p) => p.slug);
  if (missing.length) throw new Error(`pricesConfirmed is true but no price for: ${missing.join(", ")}`);
}
```

### 2.6 Privacy rules written as tests

The data-protection decisions (no child data, KRA PIN only in the outgoing message, a fixed key set on the order object, a 90-day device profile) are enforced by unit tests that write to a fake `localStorage` and grep what was stored.

**Why a hiring manager cares:** privacy by design that survives refactors. A reviewer can see the Kenya Data Protection Act reasoning (`strategy/07-BUILD-DECISIONS.md:44` D16) turned into assertions that fail CI.

`scripts/test-whatsapp.mjs:251-261`
```js
t("the KRA PIN is in the message but never in a draft", () => {
  const form = { ...F.emptyForm, customerTypes: ["shop"], name: "Amina", phone: "0712345678", businessName: "Savanna Gifts", kraPin: "A123456789B", paymentNote: "x" };
  const ticks = { ...F.noTicks, terms_acknowledged: true };
  const msg = F.toOrderMsg(form, [{ sku: "a-b-s", name: "A", colourLabel: "B", size: "S", qty: 1 }], "MK-261001-AAAA", ticks, "", "", C.CONSENT_VERSION);
  assert.ok(W.buildOrderMessage(msg, "full").includes("KRA PIN: A123456789B"));
  const full = W.buildOrderMessage(msg, "full");
  F.writeDraft({ step: "review", skipGift: false, skipAbout: false, form, ref: "MK-261001-AAAA", sent: { message: full, text: full, level: "full", at: 1 } });
  const raw = mem.get(F.DRAFT_KEY);
  assert.ok(raw && !raw.includes("A123456789B") && !raw.includes("kraPin"), "draft has no PIN");
  const back = F.readDraft();
  assert.equal(back.form.kraPin, "");
});
```

`scripts/test-studio.mjs:218-222`
```js
t("no child data keywords among stored fields or option ids", () => {
  const keys = Object.keys(S.emptyBrief()).concat(Object.keys(S.newPiece("x")), Object.keys(S.emptyContact()));
  for (const k of keys) assert.ok(!/child|kid|age\b|birthYear|school|surname|dob/i.test(k), k);
  for (const o of [...D.orderTypes, ...D.occasions]) assert.ok(!/\bage\b|years old/i.test(o.label), o.label);
});
```

### Also notable (not in the top six)

- **Charter rules as build gates.** `package.json` `prebuild` runs `qa:copy` (dash and banned-phrase scan, `scripts/qa-copy.mjs:9-19`) and `qa:living` (choreography check, `scripts/check-living.mjs:1-3`). `scripts/tokens-check.mjs:7-28` enforces the OKLCH chroma cap of 0.13 and 50+ WCAG AA contrast pairs.
- **Mobile QA suite.** `scripts/mobile-qa/` (layout, interactions, width, perf, INP, inclusive forms) across 11 viewports, with a parallel runner that warns timing numbers are inflated unless run with `--perf-solo` (`run-all.mjs:7-9`). Width gate passes 366 of 366 runs; layout gate currently fails.
- **Checkout spec.** `strategy/16-checkout-spec.md` (cart model `mk.cart.v2`, price states, wizard v2) is the spec `lib/pricing.ts:1` cites by section.

---

## 3. Corrections to make in projects.ts

1. `79` components -> **132** component files.
2. `23` order types -> **29**.
3. Remove "SEO crawl of 121 pages with zero blocking issues". The crawl was never run.
4. Remove "90 orchestrated agent calls" from `stack`.
5. "88/88 client photos" -> "88/88 supplied photos and video"; drop "labelled correctly".
6. "set before first paint" -> the **tier** is set before first paint; the budget is applied by the engine.
7. "Price on request" -> product pages say "Ask for price"; the cart says "Price on request".
8. "defaulted to FAIL" -> "defaulted to NEEDS WORK and failed the set".
9. Drop "hand-drawn" and "layout never shifts".
10. Remove the GitHub `next` item and the `placeholders` entry; the repo is public now.
11. Outside this file: `README.md:23` in the Mikono repo says 23 order types; `docs/ENGINEERING-AUDIT.md:43` in the portfolio carries 79 / 23 / 90.

---

## 4. Publication risks

The Mikono repo is public at `github.com/Levikib/mikono-creations`, so these are risks for the repo as well as for the excerpts.

| Item | Where | Risk | Action |
|---|---|---|---|
| Local machine path with username and Claude scratchpad | `scripts/mobile-qa/width.mjs:7` (`/tmp/claude-1000/-home-shannara-mikono-creations/...`); the same pattern in `inclusive.mjs`, `interactions.mjs`, `layout.mjs`, `perf.mjs`, `speed-inp.mjs`, `speed-routes.mjs`, `strategy/card-lab/*.mjs` | Leaks the local username and tooling layout; scripts do not run on another machine | Do not excerpt these lines. Consider reading `PLAYWRIGHT_PATH` from env. |
| Business phone | `lib/site.ts:14-15` `+254 724 592 115` | Public business number, shown on the live site | Fine. Not used in any excerpt above. |
| Founder full name | `lib/site.ts:7`; `07-BUILD-DECISIONS.md:8` | Public on the live site by owner ruling R2 | Fine, but the case study does not need it. |
| Client's internal rating ("3 out of 10 for energy") | `strategy/08-business-audit.md:7` | The client's private opinion of the first build | Do not quote in the case study. The rewrite says "asked for a site that felt more alive". |
| Test fixture PII | `scripts/test-*.mjs` (e.g. `0712 345 678`, `0722000111`, KRA PIN `A123456789B`, "Amina", "Joy") | Fake values in the standard Safaricom test style; no real person | Safe. The 2.6 excerpt contains only fixture values. |
| Original WhatsApp file names with timestamps | `media/manifest/index.json` | Shows when the client sent media; low risk | Do not excerpt. |
| Photos of children and makers | `public/media/**` | Client confirmed rights (`00-CHARTER.md:24` rule 10, R1), but the portfolio is a different use | Use product-only stills in the reel and screenshots unless the client agrees. |
| Draft legal pack and "I am not a lawyer" notes | `content/legal/*`, `strategy/18-legal-internal.md:3` | Drafts with placeholders, live on the site | Do not present them as reviewed legal documents. The rewrite says "draft". |
| Failing mobile gate reports | `strategy/gates/mobile/summary-2026-10-05.md` | A reviewer who opens the repo sees FAIL | The case study must not claim the mobile gates pass. The rewrite claims only the width gate result. |
| Secrets | none found | Grep for `sk_live`, `AKIA`, `ghp_`, private key blocks, `VERCEL_TOKEN`, `.env*` in tracked files: 0 hits. The phase 6 verifier grepped client bundles too (`phase6/functional-a11y-verifier.md:120`). | None needed. |
| Email addresses | `content/legal/privacy.ts:16`, `strategy/17-data-protection-plan.md:19` (ODPC regulator addresses only) | Public regulator addresses | Fine. No client personal email in the repo. |

---

## 5. Replacement object

Type-checked against `Project` with `tsc --noEmit --strict` (scratch copy). It contains no em or en dashes and none of the banned words. The tagline is 12 words and the summary is 43.

```ts
  {
    slug: "mikono-creations",
    station: "02",
    name: "Mikono Creations",
    kind: "Client · Craft e-commerce",
    accent: "#E8B04B",
    tagline: "A handmade animal shop whose checkout writes the WhatsApp order for you.",
    summary:
      "A full store for a Nairobi craft business that supports 25+ women: 30 animals, a custom-order studio with 29 order types, gift and size finders, a budgeted animal layer, and a checkout that writes a referenced WhatsApp order sized to fit the link.",
    live: "https://mikono-creations.vercel.app",
    repo: "https://github.com/Levikib/mikono-creations",
    role: "Strategy, design and full build, run as a multi-agent pipeline with audit gates",
    when: "2026",
    stack: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS 4", "sharp (build-time WebP pipeline)", "WhatsApp deep links", "Playwright (mobile QA scripts)", "Vercel"],
    stats: [
      { value: "51", label: "route templates" },
      { value: "29", label: "custom order types" },
      { value: "88/88", label: "supplied photos and video used" },
      { value: "294", label: "unit tests passing" },
    ],
    problem: [
      "The brief arrived as 5 WhatsApp zips: 87 photos, 1 video, a logo, seven stockists and a founder story. Prices, delivery fees and centimetre sizes were not supplied.",
      "The client ruled out bright colours in the interface for a children's brand, then asked for a site that felt more alive.",
      "Kenyan customers buy through WhatsApp, not card checkout, and much of the work is custom: mascots, corporate gifts, pet lookalikes, classroom sets.",
    ],
    architecture: [
      { name: "Media intelligence", detail: "Every file got a stable id. 8 analyst agents labelled them, two blind passes re-labelled 60, and 5 independent deciders voted on the 44 unclear ones." },
      { name: "Strategy", detail: "Six strategy reports, then an audit that found 19 contradictions between them, then one binding decisions file of 40 rulings that overrides them all." },
      { name: "Storefront", detail: "30 animals in 5 categories, colour and size variants, a cart, and an order wizard that ends in a prefilled WhatsApp message with an MK-YYMMDD-XXXX reference." },
      { name: "Studio", detail: "A 3-step quick brief or a full brief of up to 11 steps. 29 order types carry flags that decide which questions appear. Multi-piece orders, plus gift finder, size finder and a safari family builder." },
      { name: "Living layer", detail: "59 SVG sprites, a scroll thread and a 12-find herd game. The server renders every animal as still HTML; a standalone engine only sets data attributes, so hydration never disagrees." },
      { name: "Images", detail: "A build step turns 280 source images into 2,391 WebP variants at up to 11 widths. A custom next/image loader picks the nearest one, so no runtime optimiser is billed." },
      { name: "Content and trust", detail: "47 journal posts from four sources normalised into one model, 16 draft legal documents, and consent-gated analytics." },
    ],
    decisions: [
      {
        title: "Two real prototypes before choosing a look",
        why: "A dark glass direction and a daylight clay direction were both built as static pages with the real photos and screenshotted at phone and desktop sizes.",
        tradeoff: "Daylight clay won: heavy backdrop blur is the costliest effect on low-end Android, and dark was the wrong first impression for a children's brand.",
      },
      {
        title: "No invented prices",
        why: "One pricesConfirmed flag drives four price states, so no total is shown or estimated until every line and the delivery fee are known. The catalogue throws at build time if the flag is on and any product lacks a price.",
        tradeoff: "Every product reads 'Ask for price' until the client supplies prices, which costs some conversion.",
      },
      {
        title: "Motion with a budget",
        why: "An inline head script picks the animal tier before first paint from the visitor's switch, reduced motion, Save-Data and device memory. The engine then lets at most 4 animals move on a phone, 6 on desktop, 2 on weak devices.",
        tradeoff: "Fewer flourishes. If the engine sees slow frames it cuts the budget by 2 for the session, and an Animals switch in every footer turns it off.",
      },
      {
        title: "Pre-built images instead of a runtime optimiser",
        why: "The hosted image optimiser hit its plan limit, so every photo is now resized once at build time and served as static WebP.",
        tradeoff: "Builds take longer as the photo set grows, so variants are incremental and AVIF stays opt-in.",
      },
    ],
    code: [
      {
        file: "lib/whatsapp.ts",
        caption: "A wa.me link breaks when it gets too long, so the order message steps down from full to compact to short until the encoded URL fits, and the full text is kept for the customer to paste.",
        code: `export const URL_BUDGET = 2000;
// …
/** Picks the longest level whose encoded URL fits the budget. fullText is always the full message for copying. */
export function planOrderSend(number: string | undefined, o: OrderMsg): SendPlan {
  const fullText = buildOrderMessage(o, "full");
  const levels: Level[] = ["full", "compact", "short"];
  let last: SendPlan | null = null;
  for (const level of levels) {
    const text = level === "full" ? fullText : buildOrderMessage(o, level);
    const url = buildWaUrl(number, text);
    last = { level, text, fullText, url, tooLong: false, pasteRest: level !== "full" };
    if (!url || url.length <= URL_BUDGET) return last;
  }
  return { ...(last as SendPlan), tooLong: true };
}`,
      },
      {
        file: "components/fx/engine/index.ts",
        caption: "Only the best few animals may move at once. The budget depends on screen and device tier, and drops for the rest of the session after three slow frames.",
        code: `function setBudget() {
  const phone = innerWidth < 900;
  budget = tier === "lite" ? 2 : phone ? 4 : 6;
  try { if (sessionStorage.getItem("mk-fx-slow")) budget = Math.max(1, budget - 2); } catch { /* storage blocked */ }
}
// …
  if (!force && lastT && dt > 100 && motionOK()) {
    slowFrames = slowFrames.filter((t) => now - t < 2000);
    slowFrames.push(now);
    if (slowFrames.length >= 3) { try { sessionStorage.setItem("mk-fx-slow", "1"); } catch { /* storage blocked */ } setBudget(); soon(0); slowFrames = []; }
  }`,
      },
      {
        file: "lib/imageLoader.ts",
        caption: "A custom next/image loader maps each request to the nearest pre-built WebP width, and caps at 640 px when the visitor has Save-Data on.",
        code: `const LITE_MAX = 640;
// …
export const variantPath = (src: string, w: number) => {
  const rel = src.startsWith("/media/") ? src.slice("/media/".length) : "_root" + src;
  return \`/media-opt/\${rel.replace(/\\.[^./]+$/, "")}-\${w}.webp\`;
};

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  const have = widths[src];
  if (!have || have.length === 0) return src;
  const lite = typeof globalThis !== "undefined" && (globalThis as { __mkLite?: boolean }).__mkLite === true;
  const want = lite ? Math.min(width, LITE_MAX) : width;
  const w = have.find((x) => x >= want) ?? have[have.length - 1];
  return variantPath(src, w);
}`,
      },
      {
        file: "scripts/test-whatsapp.mjs",
        caption: "Privacy rules are tests: a business's KRA PIN goes into the WhatsApp message but must never reach the draft saved on the device.",
        code: `t("the KRA PIN is in the message but never in a draft", () => {
  const form = { ...F.emptyForm, customerTypes: ["shop"], name: "Amina", phone: "0712345678", businessName: "Savanna Gifts", kraPin: "A123456789B", paymentNote: "x" };
  const ticks = { ...F.noTicks, terms_acknowledged: true };
  const msg = F.toOrderMsg(form, [{ sku: "a-b-s", name: "A", colourLabel: "B", size: "S", qty: 1 }], "MK-261001-AAAA", ticks, "", "", C.CONSENT_VERSION);
  assert.ok(W.buildOrderMessage(msg, "full").includes("KRA PIN: A123456789B"));
  const full = W.buildOrderMessage(msg, "full");
  F.writeDraft({ step: "review", skipGift: false, skipAbout: false, form, ref: "MK-261001-AAAA", sent: { message: full, text: full, level: "full", at: 1 } });
  const raw = mem.get(F.DRAFT_KEY);
  assert.ok(raw && !raw.includes("A123456789B") && !raw.includes("kraPin"), "draft has no PIN");
  const back = F.readDraft();
  assert.equal(back.form.kraPin, "");
});`,
      },
    ],
    qa: [
      "Three independent verifiers (visual, content and media, function and accessibility) at every rendering phase, with their reports committed to the repo.",
      "294 unit tests across checkout, WhatsApp messages, enquiries, the studio and helpers, including privacy rules: no child data fields, and the KRA PIN never stored on the device.",
      "Build gates: a copy scan for dashes and banned phrases, a choreography check for the animal layer, and an OKLCH chroma cap of 0.13 with WCAG AA contrast pairs.",
      "Playwright mobile scripts for layout, interactions, width and performance across 11 viewports; the width gate passes all 366 page and width runs.",
    ],
    results: [
      "All 88 supplied files (87 photos, 1 video) appear on the site; the 44 unclear species were settled by vote for the client to confirm at review.",
      "Live with 51 route templates, 30 animals, 47 journal posts and a custom studio that turns any brief into one WhatsApp message.",
      "The process became the Foundation Build Playbook used for later client sites.",
    ],
    next: [
      "Switch on prices and product offer markup once the client confirms them.",
      "Clear the open critical and high findings from the latest mobile layout gate.",
      "Run the SEO crawler against the live site and fix what it finds.",
      "Have a Kenyan advocate review the 16 draft legal documents before launch.",
    ],
    reel: { file: "reels/mikono-studio-9x16-10s.mp4", ratio: "9:16", seconds: 10, shot: "Phone: build a custom animal in the studio, then the WhatsApp order opens." },
  },
```
