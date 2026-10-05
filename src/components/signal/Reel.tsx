import Image from "next/image";
import type { Slot } from "@/data/media";

/** Muted looping reel, an existing screenshot, or a labelled slot. Never a broken video. */
export default function Reel({ slot, alt, shot }: { slot: Slot; alt: string; shot?: string }) {
  if (slot.ready) {
    return (
      <video autoPlay muted loop playsInline preload="none" poster={slot.poster} aria-label={alt}>
        <source src={slot.src} type="video/mp4" />
      </video>
    );
  }
  if (slot.fallback) {
    return <Image src={slot.fallback} alt={alt} fill sizes="(max-width: 900px) 100vw, 600px" style={{ objectFit: "cover" }} />;
  }
  return (
    <div className="sp-station__slot">
      <div style={{ color: "var(--sp-signal)", marginBottom: 6 }}>[ REEL SLOT ]</div>
      <div>{slot.src.replace(/^\//, "")}</div>
      {shot && <div style={{ marginTop: 6, maxWidth: 320 }}>{shot}</div>}
    </div>
  );
}
