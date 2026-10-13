/**
 * Thoughts: Levo's own writing. Posts are MDX-free plain data so they can be
 * written fast and mirrored to Substack. Body is an array of blocks.
 * Only Levo writes these: drafts stay `status: "draft"` and never render in production.
 */
export type ThoughtTopic =
  | "life" | "anime" | "films" | "books" | "games" | "politics" | "fun-facts" | "2am"
  | "engineering" | "founder" | "design" | "africa-tech" | "career";

/** Credit for a free-licence image (Unsplash etc.). Shown under the image. */
export type Credit = { name: string; href: string; source: string };

export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "quote"; text: string; by?: string }
  | { t: "list"; items: string[] }
  | { t: "code"; lang: string; text: string }
  | { t: "image"; src: string; alt: string; w: number; h: number; caption?: string; credit?: Credit }
  | { t: "note"; text: string };

export type Thought = {
  slug: string;
  title: string;
  dek: string;            // one-line standfirst
  topic: ThoughtTopic;
  date: string;           // ISO yyyy-mm-dd
  minutes: number;
  status: "draft" | "published";
  cover?: { src: string; alt: string; w: number; h: number; credit?: Credit };
  /** Ongoing series, e.g. { name: "One Piece and me", part: 1 } */
  series?: { name: string; part: number };
  substack?: string;      // canonical Substack URL once mirrored
  body: Block[];
};

export const TOPICS: { id: ThoughtTopic | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "life", label: "Life & lessons" },
  { id: "anime", label: "Anime" },
  { id: "films", label: "Films" },
  { id: "books", label: "Books" },
  { id: "games", label: "Games" },
  { id: "politics", label: "Politics" },
  { id: "fun-facts", label: "Fun facts" },
  { id: "2am", label: "2 a.m. thoughts" },
  { id: "engineering", label: "Engineering" },
  { id: "founder", label: "Founder notes" },
  { id: "design", label: "Design" },
  { id: "africa-tech", label: "Africa tech" },
  { id: "career", label: "Career" },
];

export const SUBSTACK_URL: string | null = null; // TODO(levo): add once the Substack exists

/** Topics Levo plans to write. Shown as "coming soon" cards until a post is published. */
export const COMING: { title: string; topic: ThoughtTopic }[] = [
  { title: "Schema-per-tenant: the decision that shaped Makeja Homes", topic: "engineering" },
  { title: "One Piece and me, part 2: Marineford and the price of a dream", topic: "anime" },
  { title: "Shipping world-class products from Nairobi", topic: "africa-tech" },
];

import { onePieceRobin } from "./posts/one-piece-robin";

/** Newest first. Each post lives in its own file under src/data/posts/. */
export const THOUGHTS: Thought[] = [onePieceRobin];
