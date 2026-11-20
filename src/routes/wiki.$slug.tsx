import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { ComingSoonNote } from "@/components/site/ComingSoonNote";
import { WikiCard } from "@/components/site/WikiCard";
import { getWikiCategory, WIKI_CATEGORIES } from "@/lib/wiki";
import { SERVER_INFO } from "@/lib/server-info";

export const Route = createFileRoute("/wiki/$slug")({
  loader: ({ params }) => {
    if (params.slug === "regulament") throw redirect({ to: "/regulament" });
    const c = getWikiCategory(params.slug);
    if (!c) throw notFound();
    return { slug: c.slug };
  },
  head: ({ loaderData }) => {
    const c = loaderData ? getWikiCategory(loaderData.slug) : undefined;
    const title = c ? `${c.title} | Wiki Imperial Romania` : "Wiki | Imperial Romania";
    const desc = c ? c.text : "Wiki-ul serverului Imperial Romania.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(c ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: WikiCategoryPage,
});

function WikiCategoryPage() {
  const { slug } = Route.useLoaderData();
  const c = getWikiCategory(slug)!;
  const others = WIKI_CATEGORIES.filter((o) => o.slug !== slug).slice(0, 3);

  return (
    <SiteShell>
      <PageHeader eyebrow="Wiki" title={<span className="text-vice">{c.title}</span>}>
        <p className="mx-auto max-w-xl text-lg text-foreground/75">{c.text}</p>
      </PageHeader>

      <section className="mx-auto max-w-6xl px-5 pb-28">
        <div className="mx-auto max-w-3xl">
          <ComingSoonNote title="Pagina asta vine curând">
            O scriem acum. Dacă ai o întrebare până atunci, dă-ne un mesaj pe Discord.
          </ComingSoonNote>
          <div className="reveal mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="glass" size="xl" asChild>
              <Link to="/wiki">
                <ArrowLeft /> Înapoi la wiki
              </Link>
            </Button>
            <Button variant="hero" size="xl" asChild>
              <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
                Întreabă pe Discord
              </a>
            </Button>
          </div>
        </div>

        <p className="reveal mt-20 text-center font-display text-xl tracking-[0.3em] text-primary-glow">Mai vezi și</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o, i) => (
            <WikiCard key={o.slug} c={o} i={i} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
