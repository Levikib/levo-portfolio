"use client";
import { useState, useRef, useEffect, forwardRef } from "react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { ComponentType } from "react";

let HTMLFlipBookImpl: ComponentType<any> | null = null;

type Volume = {
  id: string;
  title: string;
  sub: string;
  accent: string;
  folder: string;
  pageCount: number;
  desc: string;
};

const VOLUMES: Volume[] = [
  {
    id: "vol1", title: "Vol. 1A", sub: "Addressing Daily Life Issues", accent: "#2e86c1", folder: "vol1", pageCount: 36,
    desc: "The foundations issue: understanding mental health, body image, autism, substance abuse, trauma, money, conflict resolution, and growing up in the digital age.",
  },
  {
    id: "vol2", title: "Vol. 1B", sub: "A Brighter Future", accent: "#e91e63", folder: "vol2", pageCount: 36,
    desc: "The relationships issue: self-esteem, family, love, grief, performance pressure, and building a vision for what comes next.",
  },
];

const ImagePage = forwardRef<HTMLDivElement, { src: string; num: number; priority?: boolean }>(({ src, num, priority }, ref) => (
  <div ref={ref} style={{ width: "100%", height: "100%", position: "relative", background: "#fff" }}>
    <Image
      src={src}
      alt={`Page ${num}`}
      fill
      sizes="(max-width: 700px) 300px, 380px"
      style={{ objectFit: "cover" }}
      priority={priority}
    />
  </div>
));
ImagePage.displayName = "ImagePage";

function VolumeReader({ vol }: { vol: Volume }) {
  const isMobile = useIsMobile();
  const bookRef = useRef<any>(null);
  const [page, setPage] = useState(0);
  const [ready, setReady] = useState(!!HTMLFlipBookImpl);
  const totalPages = vol.pageCount;

  useEffect(() => {
    if (HTMLFlipBookImpl) { setReady(true); return; }
    import("react-pageflip").then(mod => {
      HTMLFlipBookImpl = mod.default as ComponentType<any>;
      setReady(true);
    });
  }, []);

  if (!ready || !HTMLFlipBookImpl) {
    return (
      <div style={{ width: isMobile ? "300px" : "380px", height: isMobile ? "400px" : "507px", background: "var(--bg-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Loading reader…</span>
      </div>
    );
  }

  const HTMLFlipBook = HTMLFlipBookImpl;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <div style={{
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        borderRadius: "4px", overflow: "hidden",
      }}>
        <HTMLFlipBook
          ref={bookRef}
          width={isMobile ? 280 : 360}
          height={isMobile ? 398 : 511}
          size="stretch"
          minWidth={240} maxWidth={480}
          minHeight={341} maxHeight={682}
          showCover={true}
          usePortrait={isMobile}
          drawShadow={true}
          flippingTime={650}
          maxShadowOpacity={0.4}
          mobileScrollSupport={true}
          className="flipbook"
          style={{}}
          startPage={0}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          onFlip={(e: any) => setPage(e.data)}
        >
          {Array.from({ length: vol.pageCount }).map((_, i) => (
            <ImagePage key={i} src={`/editorial/${vol.folder}/page-${String(i + 1).padStart(2, "0")}.jpg`} num={i + 1} priority={i === 0} />
          ))}
        </HTMLFlipBook>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
          style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", background: "transparent", border: `1px solid ${vol.accent}50`, color: vol.accent, padding: "9px 16px", cursor: "pointer" }}
        >← Prev</button>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-3)", letterSpacing: "0.08em" }}>
          {page + 1} / {totalPages}
        </div>
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipNext()}
          style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", background: "transparent", border: `1px solid ${vol.accent}50`, color: vol.accent, padding: "9px 16px", cursor: "pointer" }}
        >Next →</button>
      </div>
    </div>
  );
}

export default function EditorialPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* HERO */}
      <div style={{ paddingTop: "120px", paddingBottom: "56px", paddingLeft: "clamp(20px,5vw,48px)", paddingRight: "clamp(20px,5vw,48px)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--purple)", textTransform: "uppercase", marginBottom: "16px" }}>// Editorial</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(36px,7vw,72px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: "20px" }}>
          Chill Minds<br /><span style={{ color: "var(--purple)" }}>Magazine.</span>
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--text-3)", maxWidth: "560px", lineHeight: 1.85 }}>
          A student-centered mental health magazine for teens and pre-teens, designed, illustrated, and laid out from a blank page. Two volumes, 72 pages, built alone. Read both online, free, right here.
        </p>
      </div>

      {/* VOLUMES */}
      {VOLUMES.map((vol, i) => (
        <div key={vol.id} style={{
          padding: "clamp(48px,7vw,80px) clamp(20px,5vw,48px)",
          background: i % 2 === 0 ? "var(--bg)" : "var(--bg-2)",
          borderBottom: "1px solid var(--border)",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: "40px", alignItems: "center" }} className="editorial-vol-grid">
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", color: vol.accent, textTransform: "uppercase", marginBottom: "12px" }}>{vol.title}</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px,3.5vw,40px)", color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "16px" }}>{vol.sub}</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", color: "var(--text-3)", lineHeight: 1.85, marginBottom: "24px", maxWidth: "440px" }}>
                {vol.desc}
              </p>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-4)", letterSpacing: "0.06em" }}>
                Drag a corner or use the arrows below the reader to turn pages →
              </div>
            </div>
            <VolumeReader vol={vol} />
          </div>
        </div>
      ))}

      {/* DOWNLOAD / STORE CTA */}
      <div style={{ background: "#0a0805", textAlign: "center", padding: "clamp(48px,8vw,80px) clamp(16px,4vw,48px)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(5,150,105,0.7)", textTransform: "uppercase", marginBottom: "16px" }}>// Want To Keep It?</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px,4.5vw,48px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "white", marginBottom: "16px" }}>
          Read free online.<br /><span style={{ color: "#34d399" }}>Own the print-ready PDF.</span>
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: "480px", margin: "0 auto 32px" }}>
          Both volumes are free to flip through here, full pages, no signup. If you want the high-resolution PDF to print or keep offline, that&apos;s in the Store.
        </p>
        <a href="/store" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", background: "#059669", color: "white", padding: "15px 32px", textDecoration: "none", display: "inline-block", boxShadow: "0 0 32px rgba(5,150,105,0.3)" }}>
          Get the PDF in Store →
        </a>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .editorial-vol-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
