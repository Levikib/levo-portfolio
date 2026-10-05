import Image from "next/image";
import type { Media } from "@/data/editorial";
import LoopVideo from "./LoopVideo";
import { altOf, fitOf, stillOf } from "./meta";

type Props = {
  media: Media;
  title: string;
  sizes: string;
  /** "card": hover/in-view film. "stage": in-view film with a pause button. */
  mode?: "card" | "stage";
  priority?: boolean;
  /** Frame ratio class. Cards are always 4:3 so every card lines up. */
  ratio?: "card" | "stage" | "natural";
};

/**
 * A recessed glass frame holding one piece of media. Landscape media fills it;
 * portrait and square media stand inside it as a lit object over a blurred
 * reflection of itself, so a magazine cover and a 16:9 film share one frame.
 */
export default function Frame({ media, title, sizes, mode = "card", priority, ratio = "card" }: Props) {
  const still = stillOf(media);
  const fit = ratio === "natural" ? "cover" : fitOf(media);
  const alt = altOf(media, title);
  const style = ratio === "natural" ? { aspectRatio: `${media.w} / ${media.h}` } : undefined;

  const inner =
    media.type === "video" ? (
      <LoopVideo src={media.src} poster={media.poster} alt={media.alt} sizes={sizes} mode={mode} priority={priority} />
    ) : still ? (
      <Image src={still.src} alt={alt} fill sizes={sizes} priority={priority} />
    ) : null;

  return (
    <div className={`ed-frame ed-frame--${ratio} ed-frame--${fit}`} style={style}>
      {fit === "object" && still && (
        <div className="ed-frame__glow" aria-hidden>
          <Image src={still.src} alt="" fill sizes="200px" />
        </div>
      )}
      {fit === "object" ? (
        <div className={`ed-object${media.type === "video" ? " ed-object--device" : ""}${media.type === "pages" ? " ed-object--print" : ""}`} style={{ aspectRatio: `${media.w} / ${media.h}` }}>
          {inner}
        </div>
      ) : (
        inner
      )}
    </div>
  );
}
