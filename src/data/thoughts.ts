/**
 * Thoughts: Levo's own writing. Posts are MDX-free plain data so they can be
 * written fast and mirrored to Substack. Body is an array of blocks.
 * Only Levo writes these: drafts stay `status: "draft"` and never render in production.
 */
export type ThoughtTopic = "engineering" | "anime" | "founder" | "design" | "africa-tech" | "career";

export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "quote"; text: string; by?: string }
  | { t: "list"; items: string[] }
  | { t: "code"; lang: string; text: string }
  | { t: "image"; src: string; alt: string; w: number; h: number; caption?: string };

export type Thought = {
  slug: string;
  title: string;
  dek: string;            // one-line standfirst
  topic: ThoughtTopic;
  date: string;           // ISO yyyy-mm-dd
  minutes: number;
  status: "draft" | "published";
  cover?: { src: string; alt: string; w: number; h: number };
  substack?: string;      // canonical Substack URL once mirrored
  body: Block[];
};

export const TOPICS: { id: ThoughtTopic | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "engineering", label: "Engineering" },
  { id: "founder", label: "Founder notes" },
  { id: "design", label: "Design" },
  { id: "anime", label: "Anime" },
  { id: "africa-tech", label: "Africa tech" },
  { id: "career", label: "Career" },
];

export const SUBSTACK_URL: string | null = null; // TODO(levo): add once the Substack exists

/** Topics Levo plans to write. Shown as "coming soon" cards until a post is published. */
export const COMING: { title: string; topic: ThoughtTopic }[] = [
  { title: "Schema-per-tenant: the decision that shaped Makeja Homes", topic: "engineering" },
  { title: "What anime taught me about building in public", topic: "anime" },
  { title: "Shipping world-class products from Nairobi", topic: "africa-tech" },
];

export const THOUGHTS: Thought[] = [];
