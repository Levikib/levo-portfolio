#!/usr/bin/env python3
"""
Run from ~/levo-portfolio:
  python3 patch_about_mobile.py
"""

FILE = "src/app/about/page.tsx"

with open(FILE, "r") as f:
    src = f.read()

PATCHES = [
    # ── 1. Main 2-col layout (text + motion graphic) ──────────────────────
    # Line 369: gridTemplateColumns:"1fr 1fr"
    (
        'style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>',
        'className="about-main-grid" style={{ display:"grid" }}>',
    ),
    # ── 2. Left text panel padding — too much on mobile ───────────────────
    # Line 372: padding:"140px 0 0 48px"
    (
        'padding:"140px 0 0 48px", display:"flex", flexDirection:"column"',
        'padding:"clamp(88px,12vw,140px) clamp(20px,4vw,48px) clamp(40px,5vw,80px)", display:"flex", flexDirection:"column"',
    ),
    # ── 3. Stats strip — repeat(5,1fr) → responsive ───────────────────────
    # Line 418
    (
        'display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"1px", background:"rgba(255,255,255,0.06)"',
        'display:"grid", gap:"1px", background:"rgba(255,255,255,0.06)"',
    ),
    # Add className to that div
    (
        '<div style={{ display:"grid", gap:"1px", background:"rgba(255,255,255,0.06)" }}>',
        '<div className="about-stats-grid" style={{ display:"grid", gap:"1px", background:"rgba(255,255,255,0.06)" }}>',
    ),
    # ── 4. Timeline grid — 120px 1fr → responsive ─────────────────────────
    # Line 459
    (
        'display:"grid", gridTemplateColumns:"120px 1fr", position:"relative"',
        'display:"grid", gridTemplateColumns:"80px 1fr", position:"relative"',
    ),
    # ── 5. Skills grid — repeat(4,1fr) → responsive ───────────────────────
    # Line 486 (skills/tools)
    (
        'display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", background:"rgba(255,255,255,0.06)"',
        'display:"grid", gap:"1px", background:"rgba(255,255,255,0.06)"',
    ),
    # Add className
    (
        '<div style={{ display:"grid", gap:"1px", background:"rgba(255,255,255,0.06)" }}>',
        '<div className="about-skills-grid" style={{ display:"grid", gap:"1px", background:"rgba(255,255,255,0.06)" }}>',
    ),
    # ── 6. Certs grid — repeat(4,1fr) → responsive ────────────────────────
    # Line 506
    (
        'display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px"',
        'display:"grid", gap:"12px"',
    ),
    # Add className
    (
        '<div style={{ display:"grid", gap:"12px" }}>',
        '<div className="about-certs-grid" style={{ display:"grid", gap:"12px" }}>',
    ),
    # ── 7. Motion graphic panel — fix left padding on mobile ──────────────
    # Line 251: padding:"56px 48px 48px 110px"
    (
        'padding:"56px 48px 48px 110px"',
        'padding:"clamp(36px,4vw,56px) clamp(20px,4vw,48px) clamp(36px,4vw,48px) clamp(24px,8vw,110px)"',
    ),
    # ── 8. Bottom facts strip — flex row → wrap on mobile ─────────────────
    # Line 400: display:"flex", borderTop
    (
        'display:"flex", borderTop:"1px solid var(--border)", marginTop:"48px"',
        'display:"flex", flexWrap:"wrap", borderTop:"1px solid var(--border)", marginTop:"clamp(28px,4vw,48px)"',
    ),
    # Each fact item — min width so they wrap
    (
        'key={f.l} style={{ flex:1, padding:"20px 24px", borderRight:i<2?"1px solid var(--border)":"none"',
        'key={f.l} style={{ flex:"1 1 120px", padding:"clamp(14px,2vw,20px) clamp(16px,2vw,24px)", borderRight:i<2?"1px solid var(--border)":"none"',
    ),
    # ── 9. Section padding wrapper ────────────────────────────────────────
    (
        'style={{ background:"var(--bg)", minHeight:"100vh" }}>',
        'style={{ background:"var(--bg)", minHeight:"100vh", overflowX:"hidden" }}>',
    ),
]

ok = 0
skipped = []
for old, new in PATCHES:
    count = src.count(old)
    if count > 0:
        src = src.replace(old, new, 1)
        ok += 1
    else:
        skipped.append(old[:90])

# ── Inject CSS block ──────────────────────────────────────────────────────────
STYLE = """
      <style>{`
        .about-main-grid {
          grid-template-columns: 1fr;
        }
        .about-stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        .about-skills-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        .about-certs-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 640px) {
          .about-stats-grid  { grid-template-columns: repeat(3, 1fr); }
          .about-skills-grid { grid-template-columns: repeat(3, 1fr); }
          .about-certs-grid  { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 900px) {
          .about-main-grid   { grid-template-columns: 1fr 1fr; }
          .about-stats-grid  { grid-template-columns: repeat(5, 1fr); }
          .about-skills-grid { grid-template-columns: repeat(4, 1fr); }
          .about-certs-grid  { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>"""

TARGET = 'style={{ background:"var(--bg)", minHeight:"100vh", overflowX:"hidden" }}>'
if TARGET in src and STYLE.strip() not in src:
    src = src.replace(TARGET, TARGET + STYLE, 1)
    ok += 1

with open(FILE, "w") as f:
    f.write(src)

print(f"\n✅ {ok} patches applied")
if skipped:
    print(f"\n⚠️  {len(skipped)} skipped:")
    for s in skipped:
        print(f"   - {s}...")

print("\n▶  git add . && git commit -m 'fix: about page fully mobile responsive' && git push")
