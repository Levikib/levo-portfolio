/**
 * Media slots. Drop the file into /public at `src`, then flip `ready` to true.
 * Until then the site shows a labelled placeholder (or an existing screenshot),
 * never a broken video.
 */
export type Slot = { src: string; poster?: string; ready: boolean; fallback?: string; note: string };

export const HERO: Record<"loop" | "avatar", Slot> = {
  loop: { src: "/media/hero-orbit-1x1-6s.mp4", poster: "/media/hero-orbit-poster.webp", ready: false, note: "Veo loop: 3D centrepiece wrapped by the amber signal ribbon (1:1, 6s, muted)" },
  avatar: { src: "/media/levo-avatar.webp", ready: true, note: "3D cartoon avatar of Levo (Google AI Studio, 2026-10-09). Levo does NOT want his real photo in the hero." },
};

/** One reel per case study, keyed by project slug. */
export const REELS: Record<string, Slot> = {
  "makeja-homes": { src: "/reels/makeja-reel-16x9-10s.mp4", poster: "/reels/makeja-reel-16x9-10s.webp", ready: true, note: "Veo concept: property objects threaded by the signal ribbon, locking into four towers" },
  "mikono-creations": { src: "/reels/mikono-reel-9x16-8s.mp4", poster: "/reels/mikono-reel-9x16-8s.webp", ready: true, note: "Veo: phone with crocheted giraffe, elephant and lion" },
  "elatec-safety-systems": { src: "/reels/elatec-reel-16x9-8s.mp4", poster: "/reels/elatec-reel-16x9-8s.webp", ready: true, note: "Veo: laptop at dusk over a Nairobi rooftop with CCTV and solar" },
  "noevella-group": { src: "/reels/noevella-reel-16x9-8s.mp4", poster: "/reels/noevella-reel-16x9-8s.webp", ready: true, note: "Veo: laptop in a plum studio with gold stage light and confetti" },
  "levo-cli": { src: "/reels/levo-cli-reel-16x9-8s.mp4", poster: "/reels/levo-cli-reel-16x9-8s.webp", ready: true, note: "Veo: clay monitor and keyboard typing on their own" },
  ghostnet: { src: "/reels/ghostnet-reel-16x9-8s.mp4", poster: "/reels/ghostnet-reel-16x9-8s.webp", ready: true, note: "Veo: laptop in green digital rain" },
  // hookah-3d: hidden until the shader ships; its reel goes here then.
};
