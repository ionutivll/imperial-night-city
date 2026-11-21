import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChevronRight, Lock } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { WikiDivider, WikiLayout } from "@/components/wiki/WikiLayout";
import { ComingSoonNote } from "@/components/site/ComingSoonNote";
import { getRuleSection, RULE_SECTIONS } from "@/lib/rules";

export const Route = createFileRoute("/regulament/$sectiune")({
  loader: ({ params }) => {
    const section = getRuleSection(params.sectiune);
    if (!section) throw notFound();
    return { slug: section.slug };
  },
  head: ({ loaderData }) => {
    const s = loaderData ? getRuleSection(loaderData.slug) : undefined;
    const title = s ? `${s.title} | Imperial Romania` : "Regulament | Imperial Romania";
    const desc = s ? `${s.title} pe Imperial Romania: ${s.short}` : "Regulamentul serverului Imperial Romania.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(s ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: SectionPage,
});

function SectionPage() {
  const { slug } = Route.useLoaderData();
  const idx = RULE_SECTIONS.findIndex((s) => s.slug === slug);
  const section = RULE_SECTIONS[idx]!;
  const prev = RULE_SECTIONS[idx - 1];
  const next = RULE_SECTIONS[idx + 1];

  return (
    <SiteShell>
      <WikiLayout>
        <nav className="animate-hero-in flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/wiki" className="transition-colors hover:text-primary">Wiki</Link>
          <ChevronRight className="size-3.5" />
          <Link to="/regulament" className="transition-colors hover:text-primary">Regulament</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">{section.title}</span>
        </nav>
        <p className="eyebrow animate-hero-in mt-6">Capitolul {String(idx + 1).padStart(2, "0")}</p>
        <div className="animate-hero-in mt-3 flex items-center gap-4" style={{ "--delay": "100ms" } as React.CSSProperties}>
          <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/25">
            <section.icon className="size-7" />
          </span>
          <h1 className="font-display text-5xl leading-none md:text-7xl">{section.title}</h1>
        </div>
        <p className="animate-hero-in mt-4 max-w-2xl text-lg text-foreground/70" style={{ "--delay": "180ms" } as React.CSSProperties}>
          {section.short}
        </p>

        <WikiDivider />

        <div className="max-w-3xl">
          {section.rules.length ? (
            <ol className="space-y-4">
              {section.rules.map((r, i) => (
                <li
                  key={r.title}
                  className="reveal liquid-glass rounded-xl p-6"
                  style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}
                >
                  <p className="flex items-center gap-4 font-display text-2xl tracking-wide">
                    <span className="text-primary">{String(i + 1).padStart(2, "0")}</span>
                    {r.title}
                  </p>
                  <p className="mt-2 text-muted-foreground">{r.text}</p>
                </li>
              ))}
            </ol>
          ) : (
            <>
              <ComingSoonNote title="Textul vine curând">
                Secțiunea asta e în lucru la staff. Mai jos vezi ce situații o să acopere.
              </ComingSoonNote>
              <p className="eyebrow reveal mt-12">Ce o să găsești aici</p>
              <ul className="mt-4 space-y-3">
                {section.topics.map((t, i) => (
                  <li
                    key={t}
                    className="reveal liquid-glass flex items-center gap-4 rounded-xl px-5 py-4"
                    style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}
                  >
                    <span className="w-8 shrink-0 text-sm tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-2xl tracking-wide">{t}</span>
                    <Lock className="ml-auto size-4 text-muted-foreground" />
                  </li>
                ))}
              </ul>
            </>
          )}

          <nav className="reveal mt-14 grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link
                to="/regulament/$sectiune"
                params={{ sectiune: prev.slug }}
                className="liquid-glass group rounded-xl p-5 transition-colors hover:border-primary/40"
              >
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> Înapoi
                </span>
                <span className="mt-1 block font-display text-2xl">{prev.title}</span>
              </Link>
            ) : (
              <Link to="/regulament" className="liquid-glass group rounded-xl p-5 transition-colors hover:border-primary/40">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> Înapoi
                </span>
                <span className="mt-1 block font-display text-2xl">Toate categoriile</span>
              </Link>
            )}
            {next ? (
              <Link
                to="/regulament/$sectiune"
                params={{ sectiune: next.slug }}
                className="liquid-glass group rounded-xl p-5 text-right transition-colors hover:border-primary/40"
              >
                <span className="flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Următoarea <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="mt-1 block font-display text-2xl">{next.title}</span>
              </Link>
            ) : null}
          </nav>
        </div>
      </WikiLayout>
    </SiteShell>
  );
}
