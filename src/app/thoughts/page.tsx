import type { Metadata } from "next";
import { ROUTE_META } from "@/lib/seo-routes";
import "../editorial.css";
import { COMING, SUBSTACK_URL, THOUGHTS } from "@/data/thoughts";
import { SITE, waLink } from "@/data/facts";
import { ClayButton, CtaBand, SectionHeader } from "@/components/signal";
import ThoughtsBrowser from "@/components/editorial/ThoughtsBrowser";
import { published, subscribeHref } from "@/components/editorial/meta";

export const metadata: Metadata = ROUTE_META.thoughts;

export default function ThoughtsPage() {
  const posts = published(THOUGHTS);
  const live = new Set(posts.map((p) => p.title.toLowerCase()));
  const coming = COMING.filter((c) => !live.has(c.title.toLowerCase()));

  return (
    <main className="sp ed th" style={{ minHeight: "100vh" }}>
      <section className="sp-wrap ed-hero th-hero" aria-labelledby="th-h1">
        <SectionHeader
          as="h1"
          id="th-h1"
          eyebrow="$ cat ./thoughts/*.md"
          title={<>Thoughts<span className="ed-dot" aria-hidden>.</span></>}
          kicker="Long-form notes on engineering, founding a company from Nairobi, design, anime and African tech. Written by me, from the work."
        />
        <div className="cta-row ed-hero__ctas">
          <ClayButton variant="primary" size="lg" href={subscribeHref()} external={!!SUBSTACK_URL} icon={SUBSTACK_URL ? undefined : "@"}>
            {SUBSTACK_URL ? "Subscribe on Substack" : "Get new posts by email"}
          </ClayButton>
          <ClayButton variant="ghost" size="lg" href="/work">Read the case studies</ClayButton>
        </div>
      </section>

      <section className="sp-wrap th-browse" aria-label="Posts">
        <ThoughtsBrowser posts={posts} coming={coming} />
      </section>

      <section id="subscribe" className="sp-wrap ed-end" aria-labelledby="th-cta">
        <CtaBand
          id="th-cta"
          tone="violet"
          eyebrow={SUBSTACK_URL ? "$ subscribe --substack" : "$ subscribe --email"}
          title={SUBSTACK_URL ? "Subscribe on Substack" : "Get new posts by email"}
          body={SUBSTACK_URL ? "Every post lands in your inbox. Free." : "No newsletter tool yet. Send one email and I will add you by hand, then mail you each new post."}
        >
          <ClayButton variant="dark" size="lg" href={subscribeHref()} external={!!SUBSTACK_URL} icon={SUBSTACK_URL ? undefined : "@"}>
            {SUBSTACK_URL ? "Subscribe" : "Email me to subscribe"}
          </ClayButton>
          <ClayButton variant="ghost" size="lg" href={waLink("Hi Levo, I read your Thoughts page and want to talk.")} external>WhatsApp</ClayButton>
        </CtaBand>
      </section>
    </main>
  );
}
