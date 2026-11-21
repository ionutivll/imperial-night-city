import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { WikiDivider, WikiLayout } from "@/components/wiki/WikiLayout";
import { RULE_SECTIONS } from "@/lib/rules";
import { SERVER_INFO } from "@/lib/server-info";
import { WIKI_CATEGORIES } from "@/lib/wiki";

export const Route = createFileRoute("/wiki/")({
  head: () => ({
    meta: [
      { title: "Wiki | Imperial Romania FiveM RP" },
      { name: "description", content: "Wiki-ul Imperial Romania: regulament, joburi, facțiuni, mașini, case și comenzi. Tot ce trebuie să știi despre server." },
      { property: "og:title", content: "Wiki | Imperial Romania" },
      { property: "og:description", content: "Tot ce trebuie să știi despre serverul Imperial Romania, într-un singur loc." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WikiPage,
});

const pad = (n: number) => String(n).padStart(2, "0");

function WikiPage() {
  const others = WIKI_CATEGORIES.filter((c) => c.slug !== "regulament" && c.slug !== "primii-pasi");
  const topicCount = RULE_SECTIONS.reduce((n, s) => n + s.topics.length, 0);
  const stats = [
    { n: WIKI_CATEGORIES.length, label: "categorii" },
    { n: RULE_SECTIONS.length, label: "capitole" },
    { n: topicCount, label: "subiecte" },
  ];

  return (
    <SiteShell>
      <WikiLayout>
        <p className="eyebrow animate-hero-in">Imperial Romania</p>
        <div className="mt-3 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="animate-hero-in" style={{ "--delay": "100ms" } as React.CSSProperties}>
            <h1 className="font-display text-7xl leading-none md:text-8xl">Wiki</h1>
            <p className="mt-4 max-w-xl text-lg text-foreground/70">
              Regulamentul, ghidul pentru prima intrare, joburile și facțiunile din oraș. Dacă ești nou, începe cu primii pași.
            </p>
          </div>
          <div
            className="animate-hero-in flex w-max divide-x divide-border rounded-full border border-border bg-card/60"
            style={{ "--delay": "200ms" } as React.CSSProperties}
          >
            {stats.map((s) => (
              <p key={s.label} className="flex items-baseline gap-1.5 px-5 py-3">
                <span className="font-display text-2xl">{s.n}</span>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</span>
              </p>
            ))}
          </div>
        </div>

        <WikiDivider />

        {/* Start here */}
        <section className="reveal relative overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/[0.12] via-card/60 to-card/40 p-7 md:p-10">
          <div className="relative z-10 max-w-xl">
            <p className="eyebrow">Începe aici</p>
            <h2 className="mt-3 font-display text-4xl leading-none md:text-5xl">Cum intri prima oară</h2>
            <p className="mt-3 text-foreground/70">
              Tot ce-ți trebuie ca să intri pe Imperial: jocul, FiveM, Discord-ul și primele minute în oraș.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link
                to="/wiki/$slug"
                params={{ slug: "primii-pasi" }}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-display text-lg tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary-glow"
              >
                Începe ghidul <ArrowRight className="size-4" />
              </Link>
              <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary">
                Ai o întrebare? Scrie-ne pe Discord <ArrowRight className="size-4 text-primary" />
              </a>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 md:block" aria-hidden>
            <div className="grid size-56 place-items-center rounded-full border border-primary/20 bg-primary/[0.06]">
              <div className="grid size-36 place-items-center rounded-full border border-primary/30 bg-primary/10">
                <MapPin className="animate-float size-20 text-primary" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </section>

        {/* Regulament */}
        <section className="mt-12 grid gap-4 xl:grid-cols-[300px_1fr]">
          <div className="reveal flex flex-col rounded-2xl border border-border bg-card/60 p-7">
            <h2 className="font-display text-4xl leading-none">Regulament</h2>
            <p className="mt-3 text-foreground/70">Regulile orașului pe capitole. Textul final îl pune staff-ul în curând.</p>
            <p className="mt-5 flex items-baseline gap-1.5">
              <span className="font-display text-2xl">{RULE_SECTIONS.length}</span>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">capitole</span>
            </p>
            <Link
              to="/regulament/$sectiune"
              params={{ sectiune: "general" }}
              className="mt-6 inline-flex w-max items-center gap-2 rounded-lg border border-primary/50 px-4 py-2 font-display text-lg tracking-[0.1em] text-primary transition-colors hover:bg-primary/10 xl:mt-auto"
            >
              Regulament general <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {RULE_SECTIONS.map((s, i) => (
              <li key={s.slug} className="reveal" style={{ "--delay": `${(i % 2) * 70}ms` } as React.CSSProperties}>
                <Link
                  to="/regulament/$sectiune"
                  params={{ sectiune: s.slug }}
                  className="liquid-glass group flex h-full items-center gap-4 rounded-xl px-4 py-4 transition-colors hover:border-primary/40"
                >
                  <span className="w-6 shrink-0 text-sm tabular-nums text-muted-foreground">{pad(i + 1)}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xl tracking-wide">{s.title}</span>
                    <span className="block truncate text-sm text-muted-foreground">{s.short}</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Everything else */}
        <section className="mt-14">
          <p className="eyebrow">Restul wiki-ului</p>
          <h2 className="mt-2 font-display text-4xl leading-none">Viața în oraș</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {others.map((c, i) => (
              <li key={c.slug} className="reveal" style={{ "--delay": `${(i % 3) * 70}ms` } as React.CSSProperties}>
                <Link
                  to="/wiki/$slug"
                  params={{ slug: c.slug }}
                  className="liquid-glass group flex h-full flex-col rounded-xl p-5 transition-colors hover:border-primary/40"
                >
                  <span className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/25">
                      <c.icon className="size-5" />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      {c.status === "ready" ? "gata" : c.status === "writing" ? "se scrie" : "curând"}
                    </span>
                  </span>
                  <span className="mt-4 flex items-center gap-2 font-display text-2xl tracking-wide">
                    {c.title}
                    <ArrowRight className="size-4 text-primary opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </span>
                  <span className="mt-1 text-sm text-muted-foreground">{c.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </WikiLayout>
    </SiteShell>
  );
}
