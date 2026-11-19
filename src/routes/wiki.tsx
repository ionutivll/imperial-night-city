import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { WIKI_CATEGORIES, type WikiCategory } from "@/lib/wiki";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/wiki")({
  head: () => ({
    meta: [
      { title: "Wiki | Imperial Romania FiveM RP" },
      { name: "description", content: "Wiki-ul Imperial Romania: regulament, joburi, factiuni, mașini, case și comenzi. Tot ce trebuie să știi despre server." },
      { property: "og:title", content: "Wiki | Imperial Romania" },
      { property: "og:description", content: "Tot ce trebuie să știi despre serverul Imperial Romania, într-un singur loc." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WikiPage,
});

const STATUS_LABEL: Record<WikiCategory["status"], string> = {
  ready: "Gata",
  writing: "Se scrie acum",
  soon: "În curând",
};

function CategoryCard({ c, i }: { c: WikiCategory; i: number }) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="grid size-14 place-items-center rounded-xl bg-fire text-primary-foreground shadow-glow transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
          <c.icon className="size-7" />
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest",
            c.status === "soon" ? "bg-foreground/5 text-muted-foreground" : "bg-primary/15 text-primary-glow",
          )}
        >
          {STATUS_LABEL[c.status]}
        </span>
      </div>
      <h2 className="mt-6 flex items-center gap-2 font-display text-3xl tracking-wide">
        {c.title}
        {c.to ? <ArrowUpRight className="size-6 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" /> : null}
      </h2>
      <p className="mt-2 text-muted-foreground">{c.text}</p>
    </>
  );
  const cls = cn(
    "reveal border-fire glass group block rounded-3xl p-7 transition-all duration-500",
    c.to ? "hover:-translate-y-2 hover:shadow-glow" : "opacity-80",
  );
  const style = { "--delay": `${(i % 3) * 90}ms` } as React.CSSProperties;
  return c.to ? (
    <Link to={c.to} className={cls} style={style}>
      {inner}
    </Link>
  ) : (
    <div className={cls} style={style}>
      {inner}
    </div>
  );
}

// Ignore Romanian diacritics so "masini" finds "Mașini".
const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function WikiPage() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const t = norm(q.trim());
    if (!t) return WIKI_CATEGORIES;
    return WIKI_CATEGORIES.filter((c) => norm(`${c.title} ${c.text}`).includes(t));
  }, [q]);

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Tot ce trebuie să știi"
        title={
          <>
            Wiki <span className="text-fire">Imperial</span>
          </>
        }
      >
        <p className="mx-auto max-w-xl text-lg text-foreground/75">
          Aici o să găsești tot despre server. Încă îl umplem, așa că mai trage cu ochiul din când în când.
        </p>
        <label className="glass mx-auto mt-8 flex max-w-lg items-center gap-3 rounded-full px-5 py-3 focus-within:border-primary/60">
          <Search className="size-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Caută în wiki..."
            aria-label="Caută în wiki"
            className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
          />
        </label>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-5 pb-28">
        {list.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c, i) => (
              <CategoryCard key={c.title} c={c} i={i} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-lg text-muted-foreground">N-am găsit nimic. Încearcă altceva.</p>
        )}
      </section>
    </SiteShell>
  );
}
