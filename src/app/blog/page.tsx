"use client";
const posts = [
  { title: "Building a SaaS in Public: What 2 Years Taught Me", category: "Engineering", date: "Mar 2026", accent: "var(--purple)", excerpt: "The real story behind Makeja Homes — the wins, the 3am debugging sessions, the moments I almost quit, and why I didn't.", readTime: "8 min", tags: ["SaaS", "Next.js", "Lessons"] },
  { title: "Why Attack on Titan is the Greatest Piece of Fiction Ever Made", category: "Anime & Stories", date: "Feb 2026", accent: "var(--rose)", excerpt: "A fully unhinged, completely defensible argument. The ending was perfect. I will die on this hill.", readTime: "6 min", tags: ["Anime", "AoT", "Storytelling"] },
  { title: "Nairobi's Tech Scene is About to Explode", category: "Thoughts", date: "Jan 2026", accent: "var(--forest)", excerpt: "M-Pesa democratised finance. AI is democratising software. What happens when both forces collide in one city with a generation that refuses to accept limits?", readTime: "5 min", tags: ["Nairobi", "Africa", "Tech"] },
  { title: "Designing Chill Minds: Building a Magazine for Kids' Mental Health", category: "Design", date: "Dec 2025", accent: "var(--amber)", excerpt: "Why I started a children's mental wellness magazine. The design process, the challenges, and what I learned about communicating complex topics simply.", readTime: "7 min", tags: ["Design", "Magazine", "Mental Health"] },
  { title: "The Imposter Syndrome Playbook: For Engineers Who've Actually Built Things", category: "Engineering", date: "Nov 2025", accent: "var(--purple)", excerpt: "You built a system that processes millions of shillings. You debugged production at 2am. You are not an imposter. Here's how to internalize that.", readTime: "5 min", tags: ["Career", "Mindset", "Engineering"] },
  { title: "VPS Over Vercel: When and Why to Self-Host", category: "Engineering", date: "Oct 2025", accent: "var(--forest)", excerpt: "Moved Makeja Homes from Vercel to a self-managed VPS with Nginx and SSL. Here's every decision, every tradeoff, and what I'd do differently.", readTime: "10 min", tags: ["DevOps", "VPS", "Nginx"] },
];

export default function Blog() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="pt-32 pb-24 px-8 md:px-12">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", color: "var(--amber)", textTransform: "uppercase", marginBottom: "16px" }}>// Thoughts & Writing</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(48px,8vw,96px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: "16px" }}>
          The Blog
        </h1>
        <p style={{ fontSize: "16px", color: "var(--text-3)", maxWidth: "500px", lineHeight: 1.8, marginBottom: "64px" }}>
          Engineering deep-dives. Anime takes. Movie opinions nobody asked for. Notes on building things in Africa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <article key={i} className="group bg-white border border-[var(--border)] p-8 relative overflow-hidden cursor-pointer" style={{ transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)", boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(124,58,237,0.12)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 20px rgba(0,0,0,0.04)"; }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: post.accent }} />
              <div className="flex justify-between items-center mb-6">
                <span style={{ background: `color-mix(in srgb, ${post.accent} 12%, white)`, color: post.accent, fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 10px" }}>{post.category}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-4)" }}>{post.readTime} read</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "18px", lineHeight: 1.3, color: "var(--text)", marginBottom: "12px" }}>{post.title}</h2>
              <p style={{ fontSize: "13px", color: "var(--text-3)", lineHeight: 1.7, marginBottom: "20px" }}>{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map(t => <span key={t} className="pill text-xs">{t}</span>)}
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-4)" }}>{post.date}</span>
              </div>
              <div className="mt-5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: post.accent, letterSpacing: "0.1em" }}>Read →</div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
