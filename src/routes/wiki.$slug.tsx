import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { ComingSoonNote } from "@/components/site/ComingSoonNote";
import { WikiDivider, WikiLayout } from "@/components/wiki/WikiLayout";
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
  const pages = WIKI_CATEGORIES.filter((o) => o.slug !== "regulament");
  const idx = pages.findIndex((o) => o.slug === slug);
  const prev = idx > 0 ? pages[idx - 1] : undefined;
  const next = idx < pages.length - 1 ? pages[idx + 1] : undefined;

  return (
    <SiteShell>
      <WikiLayout>
        <nav className="animate-hero-in flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/wiki" className="transition-colors hover:text-primary">Wiki</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">{c.title}</span>
        </nav>
        <div className="animate-hero-in mt-6 flex items-center gap-4" style={{ "--delay": "100ms" } as React.CSSProperties}>
          <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/25">
            <c.icon className="size-7" />
          </span>
          <h1 className="font-display text-6xl leading-none md:text-7xl">{c.title}</h1>
        </div>
        <p className="animate-hero-in mt-4 max-w-2xl text-lg text-foreground/70" style={{ "--delay": "180ms" } as React.CSSProperties}>
          {c.text}
        </p>

        <WikiDivider />

        <ComingSoonNote title="Pagina asta vine curând">
          O scriem acum. Dacă ai o întrebare până atunci,{" "}
          <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer" className="text-primary underline-offset-4 hover:underline">
            dă-ne un mesaj pe Discord
          </a>
          .
        </ComingSoonNote>

        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link to="/wiki/$slug" params={{ slug: prev.slug }} className="liquid-glass group rounded-xl p-5 transition-colors hover:border-primary/40">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <ArrowLeft className="size-3.5" /> Înapoi
              </span>
              <span className="mt-1 block font-display text-2xl tracking-wide group-hover:text-primary">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to="/wiki/$slug" params={{ slug: next.slug }} className="liquid-glass group rounded-xl p-5 text-right transition-colors hover:border-primary/40">
              <span className="flex items-center justify-end gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Următoarea <ArrowRight className="size-3.5" />
              </span>
              <span className="mt-1 block font-display text-2xl tracking-wide group-hover:text-primary">{next.title}</span>
            </Link>
          ) : null}
        </div>
      </WikiLayout>
    </SiteShell>
  );
}
