export default function ContactSection(){return(
  <section id="contact" className="relative z-10 px-8 md:px-12 py-32 text-center" style={{background:"var(--purple-pale)",borderTop:"1px solid var(--border)"}}>
    <div className="reveal">
      <div style={{fontFamily:"var(--font-mono)",fontSize:"10px",letterSpacing:"0.25em",color:"var(--purple)",textTransform:"uppercase",marginBottom:"32px"}}>{`// Let's Work Together`}</div>
      <h2 style={{fontFamily:"var(--font-display)",fontWeight:800,fontSize:"clamp(48px,9vw,110px)",lineHeight:0.95,letterSpacing:"-0.03em",marginBottom:"48px",color:"var(--text)"}}>
        Ready to<br/><span style={{color:"var(--purple)"}}>Hire Me?</span>
      </h2>
      <p className="text-sm max-w-md mx-auto mb-12 leading-relaxed" style={{color:"var(--text-3)"}}>Senior remote engineering roles · Founding engineer positions · Technical consulting</p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
        <a href="mailto:leviskibirie2110@gmail.com" className="btn-primary">Send Email →</a>
        <a href="https://linkedin.com/in/levis-kibirie-6bba13344" target="_blank" rel="noopener noreferrer" className="btn-secondary">LinkedIn</a>
        <a href="https://github.com/Levikib" target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub</a>
      </div>
    </div>
  </section>
);}
