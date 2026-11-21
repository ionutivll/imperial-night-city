import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, LayoutGrid, Search } from "lucide-react";
import { RULE_SECTIONS } from "@/lib/rules";
import { WIKI_CATEGORIES } from "@/lib/wiki";
import { cn } from "@/lib/utils";

// Ignore Romanian diacritics so "masini" finds "Mașini".
export const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

type Hit =
  | { kind: "wiki"; slug: string; title: string; sub: string }
  | { kind: "rule"; slug: string; title: string; sub: string };

function useSearch(q: string): Hit[] {
  return useMemo(() => {
    const t = norm(q.trim());
    if (!t) return [];
    const hits: Hit[] = [];
    for (const s of RULE_SECTIONS) {
      const topic = s.topics.find((x) => norm(x).includes(t));
      if (norm(`${s.title} ${s.short}`).includes(t) || topic) {
        hits.push({ kind: "rule", slug: s.slug, title: s.title, sub: topic ?? s.short });
      }
    }
    for (const c of WIKI_CATEGORIES) {
      if (c.slug === "regulament") continue;
      if (norm(`${c.title} ${c.text}`).includes(t)) hits.push({ kind: "wiki", slug: c.slug, title: c.title, sub: c.text });
    }
    return hits.slice(0, 8);
  }, [q]);
}

const itemCls = (active: boolean) =>
  cn(
    "group flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left font-display text-lg tracking-[0.08em] transition-colors duration-200",
    active ? "border-primary/60 bg-primary/10 text-foreground" : "border-transparent text-foreground/75 hover:bg-foreground/[0.04] hover:text-foreground",
  );

function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const path = pathname.replace(/\/$/, "") || "/";
  const [q, setQ] = useState("");
  const [rulesOpen, setRulesOpen] = useState(path.startsWith("/regulament"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const hits = useSearch(q);

  // "/" focuses the search, like on most docs sites.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="relative">
        <label className="flex items-center gap-3 rounded-lg border border-border bg-card/70 px-3.5 py-2.5 transition-colors focus-within:border-primary/60">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Caută în wiki"
            aria-label="Caută în wiki"
            className="w-full bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded border border-border px-1.5 text-xs text-muted-foreground lg:inline">/</kbd>
        </label>

        {q.trim() ? (
          <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-lg border border-border bg-card shadow-card">
            {hits.length ? (
              <ul className="max-h-80 overflow-y-auto py-1">
                {hits.map((h) => (
                  <li key={`${h.kind}-${h.slug}`}>
                    {h.kind === "rule" ? (
                      <Link to="/regulament/$sectiune" params={{ sectiune: h.slug }} onClick={() => setQ("")} className="block px-4 py-2.5 hover:bg-foreground/[0.05]">
                        <span className="eyebrow text-[10px]">Regulament</span>
                        <span className="block font-display text-lg tracking-wide">{h.title}</span>
                        <span className="block truncate text-sm text-muted-foreground">{h.sub}</span>
                      </Link>
                    ) : (
                      <Link to="/wiki/$slug" params={{ slug: h.slug }} onClick={() => setQ("")} className="block px-4 py-2.5 hover:bg-foreground/[0.05]">
                        <span className="eyebrow text-[10px]">Wiki</span>
                        <span className="block font-display text-lg tracking-wide">{h.title}</span>
                        <span className="block truncate text-sm text-muted-foreground">{h.sub}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-4 py-4 text-sm text-muted-foreground">N-am găsit nimic. Încearcă alt cuvânt.</p>
            )}
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => setMobileOpen((o) => !o)}
        aria-expanded={mobileOpen}
        className="mt-3 flex w-full items-center justify-between rounded-lg border border-border px-3.5 py-2.5 font-display text-lg tracking-[0.1em] lg:hidden"
      >
        Categorii
        <ChevronDown className={cn("size-5 transition-transform duration-300", mobileOpen && "rotate-180")} />
      </button>

      <nav className={cn("mt-3 rounded-xl border border-border p-2", mobileOpen ? "block" : "hidden lg:block")}>
        <ul className="space-y-1">
          <li>
            <Link to="/wiki" className={itemCls(path === "/wiki")}>
              <LayoutGrid className="size-5 text-primary" /> Toate paginile
            </Link>
          </li>
          {WIKI_CATEGORIES.map((c) =>
            c.slug === "regulament" ? (
              <li key={c.slug}>
                <button type="button" onClick={() => setRulesOpen((o) => !o)} aria-expanded={rulesOpen} className={itemCls(path.startsWith("/regulament"))}>
                  <c.icon className="size-5 text-primary" />
                  {c.title}
                  <span className="ml-auto font-sans text-xs text-muted-foreground">{RULE_SECTIONS.length}</span>
                  <ChevronDown className={cn("size-4 text-muted-foreground transition-transform duration-300", rulesOpen && "rotate-180")} />
                </button>
                <div className="expand" data-open={rulesOpen}>
                  <div>
                    <ul className="mb-1 ml-5 mt-1 space-y-0.5 border-l border-border pl-2">
                      {RULE_SECTIONS.map((s) => {
                        const active = path === `/regulament/${s.slug}`;
                        return (
                          <li key={s.slug}>
                            <Link
                              to="/regulament/$sectiune"
                              params={{ sectiune: s.slug }}
                              className={cn(
                                "block truncate rounded-md px-3 py-1.5 text-[15px] transition-colors",
                                active ? "bg-primary/10 text-primary" : "text-foreground/65 hover:text-foreground",
                              )}
                            >
                              {s.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </li>
            ) : (
              <li key={c.slug}>
                <Link to="/wiki/$slug" params={{ slug: c.slug }} className={itemCls(path === `/wiki/${c.slug}`)}>
                  <c.icon className="size-5 text-primary" />
                  <span className="truncate">{c.title}</span>
                  {c.status !== "ready" ? (
                    <span className="ml-auto shrink-0 font-sans text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      {c.status === "writing" ? "se scrie" : "curând"}
                    </span>
                  ) : null}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
    </aside>
  );
}

/** Docs-style frame for wiki pages: sticky category sidebar with search on the left, page on the right. */
export function WikiLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-28 pt-28 md:pt-32 lg:grid-cols-[280px_1fr] lg:gap-12">
      <Sidebar />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

/** Thin line with diamond ends, used under page titles. */
export function WikiDivider() {
  return (
    <div className="relative my-10 h-px bg-border" aria-hidden>
      <span className="absolute -left-1 -top-1 size-2 rotate-45 border border-primary/60 bg-background" />
      <span className="absolute -right-1 -top-1 size-2 rotate-45 border border-primary/60 bg-background" />
    </div>
  );
}
