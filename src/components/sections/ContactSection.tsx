"use client";
import { useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function IceCrystal() {
  const { scene } = useGLTF("/models/ice-crystal.glb");
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.15;
    ref.current.rotation.x = Math.sin(t * 0.4) * 0.06;
  });
  return (
    <Float speed={0.9} rotationIntensity={0.12} floatIntensity={0.5}>
      <primitive ref={ref} object={scene} scale={1.5} position={[0, -0.2, 0]} />
    </Float>
  );
}

import { useRef } from "react";

const CONTACT_TYPES = [
  { val: "hire",    label: "Work Together", icon: "💼", desc: "Senior engineering role",   accent: "#0369a1", rgb: "3,105,161" },
  { val: "collab",  label: "Collaborate",   icon: "🤝", desc: "Build something together", accent: "#7c3aed", rgb: "124,58,237" },
  { val: "project", label: "Commission",    icon: "🎯", desc: "Custom project",           accent: "#06b6d4", rgb: "6,182,212" },
  { val: "just",    label: "Say Hi",        icon: "👋", desc: "Just connect",             accent: "#f59e0b", rgb: "245,158,11" },
];

export default function ContactSection() {
  const [form,   setForm]   = useState({ name: "", email: "", message: "", type: "hire" });
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) setStatus("sent"); else setStatus("error");
    } catch { setStatus("error"); }
  };

  const selected = CONTACT_TYPES.find(t => t.val === form.type)!;

  return (
    <section id="contact" style={{ background: "var(--bg-2)", position: "relative", overflow: "hidden" }}>

      {/* Ice refraction ambient */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "900px", height: "300px", background: "radial-gradient(ellipse, rgba(3,105,161,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: 0, right: "5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(3,105,161,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 10, padding: "80px clamp(24px,5vw,64px) 80px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.2em", color: "var(--border-2)", textTransform: "uppercase" }}>Scene 06 — Ice Crystallization</span>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--ocean)", textTransform: "uppercase", marginBottom: "16px", marginTop: "12px" }}>// Get In Touch</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(36px,6vw,80px)", lineHeight: 0.92, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: "16px" }}>
            Let&apos;s Build<br /><span style={{ color: "var(--ocean)" }}>Something Real.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--text-3)", maxWidth: "440px", margin: "0 auto", lineHeight: 1.8 }}>
            Open to senior remote engineering roles, SaaS collaborations, and problems worth solving.
          </p>
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 340px", gap: "1px", background: "var(--border)" }} className="contact-grid">

          {/* LEFT — Form with glass morphism */}
          <div style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", overflow: "hidden" }}>

            {/* Intent selector */}
            <div style={{ background: "var(--abyss)", padding: "24px 28px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "14px" }}>What brings you here?</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "8px" }} className="intent-grid">
                {CONTACT_TYPES.map(opt => (
                  <button key={opt.val} onClick={() => setForm(f => ({ ...f, type: opt.val }))}
                    style={{ background: form.type === opt.val ? `rgba(${opt.rgb},0.18)` : "rgba(255,255,255,0.04)", border: `1px solid ${form.type === opt.val ? `rgb(${opt.rgb})` : "rgba(255,255,255,0.08)"}`, padding: "14px 10px", cursor: "pointer", transition: "all 0.2s", textAlign: "left" }}
                  >
                    <div style={{ fontSize: "18px", marginBottom: "6px" }}>{opt.icon}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "12px", color: form.type === opt.val ? `rgb(${opt.rgb})` : "rgba(255,255,255,0.6)", marginBottom: "2px" }}>{opt.label}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Fields */}
            {status === "sent" ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 28px", textAlign: "center" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🌊</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "24px", color: "var(--text)", marginBottom: "8px" }}>Message received.</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--text-3)" }}>I&apos;ll reply within 24 hours.</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "28px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }} className="field-grid">
                  {[{ key: "name", placeholder: "Your Name", type: "text" }, { key: "email", placeholder: "your@email.com", type: "email" }].map(field => (
                    <input key={field.key} type={field.type} placeholder={field.placeholder}
                      value={(form as Record<string, string>)[field.key]}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      style={{ background: "rgba(255,255,255,0.8)", border: "1px solid var(--border)", padding: "13px 16px", fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--text)", outline: "none", width: "100%", transition: "border 0.2s" }}
                      onFocus={e => e.target.style.borderColor = "var(--ocean)"}
                      onBlur={e => e.target.style.borderColor = "var(--border)"}
                    />
                  ))}
                </div>
                <textarea placeholder={`Tell me about the ${selected.desc.toLowerCase()}...`} rows={5} value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ background: "rgba(255,255,255,0.8)", border: "1px solid var(--border)", padding: "13px 16px", fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--text)", outline: "none", resize: "vertical", width: "100%", transition: "border 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "var(--ocean)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"}
                />
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  <button onClick={handleSubmit} disabled={status === "sending"} className="btn-primary"
                    style={{ opacity: status === "sending" ? 0.7 : 1 }}>
                    {status === "sending" ? "Sending..." : "Send Message →"}
                  </button>
                  {status === "error" && <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--rose)" }}>Failed — email kibirielevis@gmail.com</span>}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Ice Crystal 3D + info */}
          <div style={{ background: "var(--abyss)", display: "flex", flexDirection: "column" }}>

            {/* Crystal scene */}
            <div style={{ height: "200px", position: "relative", borderBottom: "1px solid rgba(6,182,212,0.1)" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 80%, rgba(6,182,212,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
              <Canvas camera={{ position: [0, 1, 4], fov: 45 }} style={{ background: "transparent" }} gl={{ alpha: true }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[3, 5, 3]} intensity={1} color="#bae6fd" />
                <pointLight position={[-2, 2, 2]} intensity={0.6} color="#7c3aed" />
                <Suspense fallback={null}>
                  <IceCrystal />
                </Suspense>
              </Canvas>
              <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-mono)", fontSize: "7px", letterSpacing: "0.2em", color: "rgba(6,182,212,0.4)", textTransform: "uppercase", whiteSpace: "nowrap" }}>Ice Crystal · Precision</div>
            </div>

            {/* Contact info */}
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: "4px", paddingBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Connect</div>

              {[
                { label: "Email", value: "kibirielevis@gmail.com", href: "mailto:kibirielevis@gmail.com", accent: "#0ea5e9", rgb: "14,165,233", icon: "✉" },
                { label: "LinkedIn", value: "/in/levis-kibirie", href: "https://linkedin.com/in/levis-kibirie-6bba13344", accent: "#7c3aed", rgb: "124,58,237", icon: "in" },
                { label: "GitHub", value: "github.com/Levikib", href: "https://github.com/Levikib", accent: "rgba(255,255,255,0.7)", rgb: "255,255,255", icon: "</>" },
              ].map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", textDecoration: "none", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.2s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `rgba(${item.rgb},0.08)`; el.style.borderColor = `rgba(${item.rgb},0.2)`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.03)"; el.style.borderColor = "rgba(255,255,255,0.05)"; }}
                >
                  <div style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", background: `rgba(${item.rgb},0.1)`, border: `1px solid rgba(${item.rgb},0.2)`, fontFamily: "var(--font-mono)", fontSize: "10px", color: item.accent, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: "2px" }}>{item.label}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: item.accent }}>{item.value}</div>
                  </div>
                  <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.15)", fontSize: "12px" }}>→</span>
                </a>
              ))}

              <div style={{ background: "rgba(3,105,161,0.1)", border: "1px solid rgba(3,105,161,0.2)", padding: "14px", marginTop: "4px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: "6px" }}>Location</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "16px" }}>🌍</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px", color: "var(--ocean-light)" }}>Nairobi, Kenya</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(14,165,233,0.6)", letterSpacing: "0.1em" }}>→ REMOTE WORLDWIDE</div>
                  </div>
                </div>
              </div>

              <div style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", padding: "16px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "80px", height: "80px", background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)", filter: "blur(20px)" }} />
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: "6px" }}>Response</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "32px", color: "#a855f7", lineHeight: 1, marginBottom: "4px" }}>&lt; 24hrs</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>EAT (UTC+3) · Same day usually</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid { grid-template-columns: 1fr 340px; }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) { .intent-grid { grid-template-columns: repeat(2,1fr) !important; } .field-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

useGLTF.preload("/models/ice-crystal.glb");
