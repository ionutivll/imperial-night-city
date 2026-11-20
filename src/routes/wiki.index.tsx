import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { WikiCard } from "@/components/site/WikiCard";
import { WIKI_CATEGORIES } from "@/lib/wiki";

export const Route = createFileRoute("/wiki/")({
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
            Wiki <span className="text-vice">Imperial</span>
          </>
        }
      >
        <p className="mx-auto max-w-xl text-lg text-foreground/75">
          Aici o să găsești tot despre server. Încă îl umplem, așa că mai trage cu ochiul din când în când.
        </p>
        <label className="liquid-glass mx-auto mt-8 flex max-w-lg items-center gap-3 rounded-full px-5 py-3.5">
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
              <WikiCard key={c.slug} c={c} i={i} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-lg text-muted-foreground">N-am găsit nimic. Încearcă altceva.</p>
        )}
      </section>
    </SiteShell>
  );
}
