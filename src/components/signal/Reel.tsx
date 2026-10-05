import Image from "next/image";
import type { Slot } from "@/data/media";

/**
 * Muted looping reel, an existing screenshot, or a styled clay screen holding
 * the project's number and name until the reel ships. Never a broken video.
 */
export default function Reel({ slot, alt, no, name }: { slot: Slot; alt: string; shot?: string; no?: string; name?: string }) {
  if (slot.ready) {
    return (
      <video autoPlay muted loop playsInline preload="none" poster={slot.poster} aria-label={alt}>
        <source src={slot.src} type="video/mp4" />
      </video>
    );
  }
  if (slot.fallback) {
    return <Image src={slot.fallback} alt={alt} fill sizes="(max-width: 900px) 100vw, 600px" style={{ objectFit: "cover", objectPosition: "top left" }} />;
  }
  return (
    <div className="screen__slot" data-slot={slot.src} aria-hidden>
      {no && <div className="screen__slot-no">{no}</div>}
      <div>
        {name && <div className="screen__slot-name">{name}</div>}
        <div className="screen__slot-meta"><i />reel in production</div>
      </div>
    </div>
  );
}
