"use client";
import { useState } from "react";

const contactTypes = [
  { val:"hire", label:"Work Together", icon:"💼", desc:"Senior engineering role", accent:"#7c3aed", accentBg:"rgba(124,58,237,0.08)", accentBorder:"rgba(124,58,237,0.2)" },
  { val:"collab", label:"Collaborate", icon:"🤝", desc:"Build something together", accent:"#2d7a45", accentBg:"rgba(45,122,69,0.08)", accentBorder:"rgba(45,122,69,0.2)" },
  { val:"project", label:"Commission", icon:"🎯", desc:"Custom project", accent:"#d97706", accentBg:"rgba(217,119,6,0.08)", accentBorder:"rgba(217,119,6,0.2)" },
  { val:"just", label:"Say Hi", icon:"👋", desc:"Just connect", accent:"#e11d48", accentBg:"rgba(225,29,72,0.08)", accentBorder:"rgba(225,29,72,0.2)" },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name:"", email:"", message:"", type:"hire" });
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  const handleSubmit = async () => {
    if (!form.name||!form.email||!form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
      if (res.ok) setStatus("sent"); else setStatus("error");
    } catch { setStatus("error"); }
  };

  const selectedType = contactTypes.find(t => t.val===form.type)!;

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background:"var(--bg-2)" }}>

      {/* Subtle purple glow top-center */}
      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"800px", height:"300px", background:"radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 70%)", pointerEvents:"none", zIndex:0 }} />

      {/* Dot grid — very faint */}
      <div style={{ position:"absolute", inset:0, zIndex:0, backgroundImage:"radial-gradient(rgba(124,58,237,0.07) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />

      <div className="relative z-10 px-8 md:px-12 pt-28 pb-24">

        {/* Header */}
        <div className="text-center mb-16">
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"0.25em", color:"var(--purple)", textTransform:"uppercase", marginBottom:"16px" }}>// Get In Touch</div>
          <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(40px,7vw,88px)", lineHeight:0.92, letterSpacing:"-0.03em", color:"var(--text)", marginBottom:"20px" }}>
            Let&apos;s Build<br /><span style={{ color:"var(--purple)" }}>Something Real</span>
          </h2>
          <p style={{ fontSize:"15px", color:"var(--text-3)", maxWidth:"420px", margin:"0 auto", lineHeight:1.8 }}>
            Open to senior remote engineering roles, SaaS collaborations, and digital projects that actually matter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 max-w-6xl mx-auto">

          {/* LEFT — Form */}
          <div className="glass-strong rounded-sm overflow-hidden">

            {/* Intent selector — distinct dark strip */}
            <div style={{ background:"var(--text)", padding:"24px 28px" }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.25em", color:"rgba(255,255,255,0.4)", textTransform:"uppercase", marginBottom:"14px" }}>What brings you here?</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {contactTypes.map(opt => (
                  <button key={opt.val} onClick={() => setForm(f => ({...f, type:opt.val}))}
                    style={{
                      background: form.type===opt.val ? opt.accentBg.replace("0.08","0.2") : "rgba(255,255,255,0.05)",
                      border: `1px solid ${form.type===opt.val ? opt.accent : "rgba(255,255,255,0.1)"}`,
                      padding:"14px 12px", cursor:"pointer", transition:"all 0.25s", textAlign:"left",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.08)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background=form.type===opt.val?opt.accentBg.replace("0.08","0.2"):"rgba(255,255,255,0.05)"}
                  >
                    <div style={{ fontSize:"20px", marginBottom:"6px" }}>{opt.icon}</div>
                    <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"13px", color:form.type===opt.val?opt.accent:"rgba(255,255,255,0.75)", marginBottom:"3px" }}>{opt.label}</div>
                    <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"rgba(255,255,255,0.35)", letterSpacing:"0.05em" }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Form fields — cream/light */}
            {status==="sent" ? (
              <div className="flex flex-col items-center justify-center py-20 text-center px-8">
                <div style={{ fontSize:"52px", marginBottom:"16px" }}>🌿</div>
                <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"26px", color:"var(--text)", marginBottom:"8px" }}>Message received.</div>
                <div style={{ fontFamily:"var(--font-body)", fontSize:"14px", color:"var(--text-3)" }}>I&apos;ll get back to you within 24 hours.</div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 p-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[{key:"name",placeholder:"Your Name",type:"text"},{key:"email",placeholder:"your@email.com",type:"email"}].map(field => (
                    <input key={field.key} type={field.type} placeholder={field.placeholder}
                      value={(form as Record<string,string>)[field.key]}
                      onChange={e => setForm(f => ({...f,[field.key]:e.target.value}))}
                      style={{ background:"rgba(255,255,255,0.7)", border:"1px solid var(--border)", padding:"14px 16px", fontFamily:"var(--font-body)", fontSize:"14px", color:"var(--text)", outline:"none", transition:"border 0.2s", width:"100%" }}
                      onFocus={e => e.target.style.borderColor="var(--purple)"}
                      onBlur={e => e.target.style.borderColor="var(--border)"}
                    />
                  ))}
                </div>
                <textarea placeholder={`Tell me about the ${selectedType.desc.toLowerCase()}...`} rows={5} value={form.message}
                  onChange={e => setForm(f => ({...f,message:e.target.value}))}
                  style={{ background:"rgba(255,255,255,0.7)", border:"1px solid var(--border)", padding:"14px 16px", fontFamily:"var(--font-body)", fontSize:"14px", color:"var(--text)", outline:"none", resize:"vertical", transition:"border 0.2s", width:"100%" }}
                  onFocus={e => e.target.style.borderColor="var(--purple)"}
                  onBlur={e => e.target.style.borderColor="var(--border)"}
                />
                <div className="flex items-center gap-4">
                  <button onClick={handleSubmit} disabled={status==="sending"}
                    style={{ background:"var(--purple)", color:"white", fontFamily:"var(--font-display)", fontWeight:700, fontSize:"13px", letterSpacing:"0.08em", textTransform:"uppercase", padding:"15px 32px", border:"none", cursor:"pointer", opacity:status==="sending"?0.7:1, transition:"all 0.2s", boxShadow:"0 4px 20px rgba(124,58,237,0.25)" }}
                    onMouseEnter={e => { (e.currentTarget.style.background="#5b21b6"); }}
                    onMouseLeave={e => { (e.currentTarget.style.background="var(--purple)"); }}
                  >{status==="sending"?"Sending...":"Send Message →"}</button>
                  {status==="error" && <div style={{ fontFamily:"var(--font-mono)", fontSize:"11px", color:"var(--rose)" }}>Failed. Email: leviskibirie2110@gmail.com</div>}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Info */}
          <div className="flex flex-col gap-3" style={{ background:"rgba(10,8,5,0.97)", border:"1px solid rgba(124,58,237,0.2)", padding:"24px" }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.25em", color:"rgba(255,255,255,0.3)", textTransform:"uppercase", marginBottom:"8px", paddingBottom:"12px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>Connect with me</div>

            {[
              { label:"Email", value:"leviskibirie2110@gmail.com", href:"mailto:leviskibirie2110@gmail.com", accent:"#a855f7", accentRgb:"168,85,247", icon:"✉" },
              { label:"LinkedIn", value:"/in/levis-kibirie", href:"https://linkedin.com/in/levis-kibirie-6bba13344", accent:"#4ead6a", accentRgb:"78,173,106", icon:"in" },
              { label:"GitHub", value:"github.com/Levikib", href:"https://github.com/Levikib", accent:"rgba(255,255,255,0.8)", accentRgb:"255,255,255", icon:"<>" },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4"
                style={{ textDecoration:"none", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", transition:"all 0.25s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background=`rgba(${item.accentRgb},0.08)`; (e.currentTarget as HTMLElement).style.borderColor=`rgba(${item.accentRgb},0.25)`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.03)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.06)"; }}
              >
                <div style={{ width:"38px", height:"38px", display:"flex", alignItems:"center", justifyContent:"center", background:`rgba(${item.accentRgb},0.1)`, border:`1px solid rgba(${item.accentRgb},0.2)`, fontFamily:"var(--font-mono)", fontSize:"12px", color:item.accent, flexShrink:0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(255,255,255,0.3)", textTransform:"uppercase", marginBottom:"3px" }}>{item.label}</div>
                  <div style={{ fontFamily:"var(--font-body)", fontSize:"13px", color:item.accent, fontWeight:500 }}>{item.value}</div>
                </div>
                <div style={{ marginLeft:"auto", color:"rgba(255,255,255,0.2)", fontSize:"14px" }}>→</div>
              </a>
            ))}

            {/* Location */}
            <div style={{ background:"rgba(45,122,69,0.1)", border:"1px solid rgba(77,173,106,0.2)", padding:"16px", marginTop:"4px" }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(255,255,255,0.3)", textTransform:"uppercase", marginBottom:"8px" }}>Location</div>
              <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <span style={{ fontSize:"20px" }}>🌍</span>
                <div>
                  <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"15px", color:"#4ead6a" }}>Nairobi, Kenya</div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"rgba(78,173,106,0.7)", letterSpacing:"0.1em" }}>→ REMOTE WORLDWIDE</div>
                </div>
              </div>
            </div>

            {/* Response time */}
            <div style={{ background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.25)", padding:"20px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:"-20px", right:"-20px", width:"100px", height:"100px", background:"radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)", filter:"blur(20px)" }} />
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(255,255,255,0.3)", textTransform:"uppercase", marginBottom:"8px" }}>Response time</div>
              <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"38px", color:"#a855f7", lineHeight:1, marginBottom:"4px" }}>&lt; 24hrs</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.08em" }}>Usually same day · EAT (UTC+3)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
