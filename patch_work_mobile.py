#!/usr/bin/env python3
"""
Run from ~/levo-portfolio:
  python3 patch_work_mobile.py
"""
import sys

FILE = "src/app/work/page.tsx"

with open(FILE, "r") as f:
    src = f.read()

original = src  # keep for diff check

PATCHES = [
    # ── 1. Work page header — mobile padding ──────────────────────────────
    (
        'paddingTop:"140px", paddingBottom:"0", paddingLeft:"48px", paddingRight:"48px"',
        'paddingTop:"clamp(96px,12vw,140px)", paddingBottom:"0", paddingLeft:"clamp(20px,5vw,48px)", paddingRight:"clamp(20px,5vw,48px)"',
    ),
    # ── 2. ProjectCard — main 1fr 1fr grid → className ────────────────────
    (
        'display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"420px"',
        'display:"grid", minHeight:"420px"',
    ),
    # After previous patch, add className to that div. Target the wrapper:
    (
        '<div style={{ border:"1px solid var(--border)", overflow:"hidden", boxShadow:"0 2px 24px rgba(0,0,0,0.06)" }}\n      <div style={{ height:"3px"',
        '<div style={{ border:"1px solid var(--border)", overflow:"hidden", boxShadow:"0 2px 24px rgba(0,0,0,0.06)" }}\n      <div style={{ height:"3px"',
    ),
    # The actual wrapper for the two-col grid
    (
        '<div style={{ display:"grid", minHeight:"420px" }}>',
        '<div className="proj-main-grid" style={{ display:"grid", minHeight:"420px" }}>',
    ),
    # ── 3. Details panel — padding shrink on mobile ────────────────────────
    (
        'padding:"44px 48px", display:"flex", flexDirection:"column", justifyContent:"space-between"',
        'padding:"clamp(24px,4vw,44px) clamp(20px,4vw,48px)", display:"flex", flexDirection:"column", justifyContent:"space-between"',
    ),
    # ── 4. VizPanel — remove fixed minHeight on mobile via wrapper class ───
    (
        '{ background:p.vizBg, position:"relative", overflow:"hidden", minHeight:"420px" }',
        '{ background:p.vizBg, position:"relative", overflow:"hidden" }',
    ),
    # ── 5. Deep Dive expanded panel ────────────────────────────────────────
    (
        'background:`${p.accent}06`, borderTop:`1px solid ${p.accent}20`, padding:"36px 48px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"52px"',
        'background:`${p.accent}06`, borderTop:`1px solid ${p.accent}20`, padding:"clamp(20px,3vw,36px) clamp(20px,4vw,48px)", display:"grid", gap:"clamp(20px,3vw,52px)"',
    ),
    # Add className to deep dive
    (
        '{ background:`${p.accent}06`, borderTop:`1px solid ${p.accent}20`, padding:"clamp(20px,3vw,36px) clamp(20px,4vw,48px)", display:"grid", gap:"clamp(20px,3vw,52px)" }',
        '{ background:`${p.accent}06`, borderTop:`1px solid ${p.accent}20`, padding:"clamp(20px,3vw,36px) clamp(20px,4vw,48px)", display:"grid", gap:"clamp(20px,3vw,52px)" } className="proj-deep-grid"',
    ),
    # ── 6. LeadForm container padding ─────────────────────────────────────
    (
        'background:"#05020f", borderTop:"1px solid rgba(255,255,255,0.06)", padding:"80px 48px"',
        'background:"#05020f", borderTop:"1px solid rgba(255,255,255,0.06)", padding:"clamp(40px,6vw,80px) clamp(20px,4vw,48px)"',
    ),
    # ── 7. LeadForm 2-col input grids → className ─────────────────────────
    (
        'display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px"',
        'display:"grid", gap:"12px"',
    ),
    # ── 8. ServiceBand padding ────────────────────────────────────────────
    (
        'maxWidth:"1200px", margin:"0 auto", padding:"64px 48px"',
        'maxWidth:"1200px", margin:"0 auto", padding:"clamp(36px,5vw,64px) clamp(20px,4vw,48px)"',
    ),
    # ── 9. ServiceBand header flex — stack on mobile ──────────────────────
    (
        'display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"40px", gap:"24px"',
        'display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"40px", gap:"24px", flexWrap:"wrap"',
    ),
    # tagline — remove textAlign right so it flows on mobile
    (
        'maxWidth:"320px", textAlign:"right", lineHeight:1.7, fontStyle:"italic", flexShrink:0',
        'maxWidth:"320px", lineHeight:1.7, fontStyle:"italic"',
    ),
]

ok = 0
skipped = []
for old, new in PATCHES:
    if old in src:
        src = src.replace(old, new, 1)
        ok += 1
    else:
        skipped.append(old[:80])

# ── Inject CSS class block ────────────────────────────────────────────────────
STYLE_BLOCK = """
      <style>{`
        .proj-main-grid {
          grid-template-columns: 1fr;
          min-height: auto !important;
        }
        .proj-deep-grid {
          grid-template-columns: 1fr;
        }
        .form-col-2 {
          grid-template-columns: 1fr;
        }
        @media (min-width: 700px) {
          .proj-main-grid { grid-template-columns: 1fr 1fr; min-height: 420px !important; }
          .proj-deep-grid { grid-template-columns: 1fr 1fr; }
          .form-col-2     { grid-template-columns: 1fr 1fr; }
        }
      `}</style>"""

TARGET = '<div style={{ background:"var(--bg)", minHeight:"100vh" }}>'
if TARGET in src and STYLE_BLOCK not in src:
    src = src.replace(TARGET, TARGET + STYLE_BLOCK, 1)
    ok += 1

# ── Fix LeadForm input grids — add className ──────────────────────────────────
# After the gap:"12px" patches, add className to those divs
src = src.replace(
    '<div style={{ display:"grid", gap:"12px" }}>',
    '<div className="form-col-2" style={{ display:"grid", gap:"12px" }}>',
)

# ── Fix the deep-grid className position (JSX has style first then className) ─
# Need: className="..." style={{...}} not style={{...}} className="..."
src = src.replace(
    '} } className="proj-deep-grid"',
    '} }'
)
# Re-do: add className properly on the div
src = src.replace(
    '{expanded && (\n        <div style={{ background:`${p.accent}06`',
    '{expanded && (\n        <div className="proj-deep-grid" style={{ background:`${p.accent}06`',
)

with open(FILE, "w") as f:
    f.write(src)

print(f"\n✅ {ok} patches applied")
if skipped:
    print(f"\n⚠️  {len(skipped)} patches skipped (already applied or text changed):")
    for s in skipped:
        print(f"   - {s}...")

print("\n▶ Run:  git add . && git commit -m 'fix: mobile responsive work page' && git push")
