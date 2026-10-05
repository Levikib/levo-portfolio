/**
 * Media slots. Drop the file into /public at `src`, then flip `ready` to true.
 * Until then the site shows a labelled placeholder (or an existing screenshot),
 * never a broken video.
 */
export type Slot = { src: string; poster?: string; ready: boolean; fallback?: string; note: string };

export const HERO: Record<"loop" | "avatar", Slot> = {
  loop: { src: "/media/hero-orbit-1x1-6s.mp4", poster: "/media/hero-orbit-poster.webp", ready: false, note: "Veo loop: 3D centrepiece wrapped by the amber signal ribbon (1:1, 6s, muted)" },
  avatar: { src: "/media/levo-avatar.webp", ready: true, note: "Interim: real portrait supplied by Levo 2026-10-05. Replace with the clay avatar from docs/MEDIA-PROMPTS.md" },
};

/** One reel per case study, keyed by project slug. */
export const REELS: Record<string, Slot> = {
  "makeja-homes": { src: "/reels/makeja-dashboard-16x9-12s.mp4", ready: false, note: "CapCut screen recording (old screenshot removed: it showed outdated numbers)" },
  "mikono-creations": { src: "/reels/mikono-studio-9x16-10s.mp4", ready: false, note: "CapCut phone recording" },
  "elatec-safety-systems": { src: "/reels/elatec-projects-16x9-10s.mp4", ready: false, note: "CapCut screen recording" },
  "noevella-group": { src: "/reels/noevella-hero-16x9-8s.mp4", ready: false, note: "CapCut screen recording" },
  "core-banking": { src: "/reels/banking-abstract-16x9-8s.mp4", ready: false, note: "Veo abstract, no logos" },
  "levo-cli": { src: "/reels/levo-cli-16x9-10s.mp4", ready: false, note: "CapCut terminal recording" },
  ghostnet: { src: "/reels/ghostnet-16x9-8s.mp4", ready: false, fallback: "/work/ghostnet-screenshot.png", note: "CapCut screen recording" },
  "hookah-3d": { src: "/reels/hookah-16x9-8s.mp4", ready: false, fallback: "/work/hookah-screenshot.png", note: "CapCut screen recording" },
};
