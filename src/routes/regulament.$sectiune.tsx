import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { ComingSoonNote } from "@/components/site/ComingSoonNote";
import { getRuleSection, RULE_SECTIONS } from "@/lib/rules";
import { cn } from "@/lib/utils";

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
      <PageHeader
        eyebrow={`Regulament · ${String(idx + 1).padStart(2, "0")}`}
        title={<span className="text-vice">{section.title}</span>}
      >
        <p className="mx-auto max-w-xl text-lg text-foreground/75">{section.short}</p>
      </PageHeader>

      <section className="mx-auto max-w-6xl px-5 pb-28">
        {/* Quick switch between sections */}
        <div className="reveal -mx-5 mb-10 overflow-x-auto px-5 pb-2">
          <div className="liquid-glass mx-auto flex w-max gap-1 rounded-full p-1 lg:w-auto lg:flex-wrap lg:justify-center lg:rounded-3xl">
            {RULE_SECTIONS.map((s) => (
              <Link
                key={s.slug}
                to="/regulament/$sectiune"
                params={{ sectiune: s.slug }}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
                  s.slug === slug ? "bg-vice text-primary-foreground shadow-glow" : "text-foreground/65 hover:bg-foreground/[0.07] hover:text-foreground",
                )}
              >
                <s.icon className="size-4" />
                {s.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          {section.rules.length ? (
            <ol className="space-y-4">
              {section.rules.map((r, i) => (
                <li
                  key={r.title}
                  className="reveal liquid-glass rounded-3xl p-6"
                  style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}
                >
                  <p className="flex items-center gap-4 font-display text-2xl tracking-wide">
                    <span className="text-vice">{String(i + 1).padStart(2, "0")}</span>
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
              <p className="reveal mt-12 font-display text-xl tracking-[0.3em] text-primary-glow">Ce o să găsești aici</p>
              <ul className="mt-4 space-y-3">
                {section.topics.map((t, i) => (
                  <li
                    key={t}
                    className="reveal liquid-glass flex items-center gap-4 rounded-2xl px-5 py-4"
                    style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}
                  >
                    <span className="font-display text-2xl text-vice">{String(i + 1).padStart(2, "0")}</span>
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
                className="liquid-glass group rounded-3xl p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> Înapoi
                </span>
                <span className="mt-1 block font-display text-2xl">{prev.title}</span>
              </Link>
            ) : (
              <Link to="/regulament" className="liquid-glass group rounded-3xl p-5 transition-transform duration-300 hover:-translate-y-1">
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
                className="liquid-glass group rounded-3xl p-5 text-right transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Următoarea <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="mt-1 block font-display text-2xl">{next.title}</span>
              </Link>
            ) : null}
          </nav>
        </div>
      </section>
    </SiteShell>
  );
}
