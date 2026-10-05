# Writing a Thoughts post

Posts live as plain data in `src/data/thoughts.ts`. No MDX, no CMS. One object per post in the `THOUGHTS` array.

## 1. Add the post

1. Open `src/data/thoughts.ts`.
2. Copy the template below into the `THOUGHTS` array (anywhere; the site sorts by date, newest first).
3. Keep `status: "draft"` while writing. Drafts never render: no page, no card, no sitemap entry.
4. Flip to `status: "published"` when it is ready, then build and deploy.

If the post answers one of the `COMING` entries, remove that entry (a published post with the exact same title is also hidden from "Coming soon" automatically).

## 2. Fields

| Field | Required | Notes |
|---|---|---|
| `slug` | yes | URL: `/thoughts/<slug>`. Lowercase, hyphens, never change it after publishing. |
| `title` | yes | The headline. Keep it under about 70 characters so it fits on cards. |
| `dek` | yes | One-line standfirst under the title. Also the meta description (clipped to 155 characters). |
| `topic` | yes | One of `engineering`, `founder`, `design`, `anime`, `africa-tech`, `career`. Drives the filter chips and accent colour. |
| `date` | yes | Publish date, `yyyy-mm-dd`. |
| `minutes` | yes | Reading time. Rough rule: word count divided by 230, rounded up. |
| `status` | yes | `"draft"` or `"published"`. |
| `cover` | no | `{ src, alt, w, h }`. Put the file in `public/thoughts/` and use its real pixel size. Also used as the social share image. |
| `substack` | no | The Substack URL once mirrored. Shows an "Also on Substack" link on the post. |
| `body` | yes | An array of blocks (below). |

## 3. Block types

| Block | Shape | Renders as |
|---|---|---|
| Paragraph | `{ t: "p", text }` | Body text. The first paragraph gets a drop cap. |
| Heading | `{ t: "h", text }` | A section heading (h2) with a `#` marker. |
| Pull quote | `{ t: "quote", text, by? }` | A clay card with large type. `by` is optional attribution. |
| List | `{ t: "list", items: [] }` | Bulleted list with accent dots. |
| Code | `{ t: "code", lang, text }` | Code figure styled like the case study code. Use a template literal for multi-line code. |
| Image | `{ t: "image", src, alt, w, h, caption? }` | Framed image. `w` and `h` must be the file's real pixel size (no layout shift). |

Text is plain: no markdown, no HTML. Write in plain English, no em or en dashes, and avoid: elevate, unlock, seamless, leverage, delve, journey, game-changer, cutting-edge, robust, empower.

## 4. Template

```ts
{
  slug: "schema-per-tenant",
  title: "Schema-per-tenant: the decision that shaped Makeja Homes",
  dek: "Why every client company gets its own Postgres schema, and what that cost me.",
  topic: "engineering",
  date: "2026-10-20",
  minutes: 7,
  status: "draft",
  cover: { src: "/thoughts/schema-per-tenant.webp", alt: "Diagram of one database split into tenant schemas", w: 1600, h: 900 },
  // substack: "https://levo.substack.com/p/schema-per-tenant",
  body: [
    { t: "p", text: "Opening paragraph. Say the point in the first two sentences." },
    { t: "h", text: "The problem" },
    { t: "p", text: "..." },
    { t: "quote", text: "One line worth pulling out.", by: "Optional source" },
    { t: "list", items: ["First point", "Second point", "Third point"] },
    { t: "code", lang: "ts", text: `const db = getPrismaForRequest(request)
const rows = await db.$queryRawUnsafe("SELECT * FROM units")` },
    { t: "image", src: "/thoughts/schema-diagram.webp", alt: "What the image shows", w: 1600, h: 1000, caption: "Optional caption." },
    { t: "h", text: "What I would do differently" },
    { t: "p", text: "Close with the takeaway." },
  ],
},
```

## 5. Check before publishing

1. `npx next build` passes (a typo in a block shape fails the type check, which is the point).
2. Open `/thoughts` and `/thoughts/<slug>` and read it once on a phone width.
3. Images: real `w`/`h`, meaningful `alt`.

## 6. Mirror to Substack

The site is the original; Substack is the copy.

1. Publish on the site first.
2. In Substack, create a new post with the same title and the `dek` as the subtitle.
3. Paste the body. Headings, quotes, lists and code blocks map one to one in Substack's editor; upload images there.
4. At the end of the Substack post add: "First published at levikibirie.dev/thoughts/<slug>".
5. Copy the Substack post URL into the post's `substack` field and deploy. The post page then shows "Also on Substack". The page's canonical URL stays on the site.
6. Once the Substack publication exists, set `SUBSTACK_URL` in `src/data/thoughts.ts`. Every "Get new posts by email" CTA then becomes "Subscribe on Substack" and links there. Until then the CTA is a plain email link, never a fake form.
