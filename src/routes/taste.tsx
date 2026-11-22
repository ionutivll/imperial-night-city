import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Info, Keyboard, Mouse, Search, TerminalSquare } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { CONTROLS, CONTROL_GROUPS, RP_COMMANDS, type ControlGroup } from "@/lib/controls";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/taste")({
  head: () => ({
    meta: [
      { title: "Taste & comenzi | Imperial Romania" },
      { name: "description", content: "Ghidul cu tastele GTA V și FiveM și comenzile RP utile pe Imperial Romania." },
      { property: "og:title", content: "Taste & comenzi | Imperial Romania" },
      { property: "og:description", content: "Toate tastele și comenzile RP, explicate simplu." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ControlsPage,
});

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function ControlsPage() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<"Toate" | ControlGroup>("Toate");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (event.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const term = normalize(query.trim());
    return CONTROLS.filter((control) => {
      const inGroup = group === "Toate" || control.group === group;
      const matches = !term || normalize(`${control.keys.join(" ")} ${control.action} ${control.text}`).includes(term);
      return inGroup && matches;
    });
  }, [group, query]);

  return (
    <SiteShell>
      <PageHeader eyebrow="Ghid de joc" title={<>Taste <span className="text-vice">& comenzi</span></>}>
        <p className="mx-auto max-w-2xl text-lg text-foreground/75">De la primii pași până la comenzile RP. Cauți o tastă sau alegi categoria și gata.</p>
      </PageHeader>

      <section className="mx-auto max-w-6xl px-5 pb-28">
        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-border bg-card/35 p-5 md:p-6">
            <label className="flex items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-3 transition-colors focus-within:border-primary/60">
              <Search className="size-5 shrink-0 text-primary" />
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Caută o tastă sau o acțiune..."
                aria-label="Caută în ghidul de taste"
                className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden rounded-md border border-border px-2 py-1 text-xs text-muted-foreground sm:block">/</kbd>
            </label>
            <div className="mt-4 flex flex-wrap gap-2" aria-label="Filtrează tastele">
              {CONTROL_GROUPS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setGroup(item)}
                  aria-pressed={group === item}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                    group === item ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-5 rounded-2xl border border-primary/20 bg-primary/[0.06] p-5">
            <Info className="size-6 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-foreground/75">Sunt bind-urile uzuale. Le putem ajusta până la lansare, iar unele se pot schimba din setările FiveM.</p>
          </div>
        </div>

        <div className="mt-10 flex items-end justify-between gap-4 border-b border-border pb-5">
          <div>
            <p className="eyebrow">Controlul personajului</p>
            <h2 className="mt-2 font-display text-4xl tracking-wide md:text-5xl">Tastele pe care le folosești</h2>
          </div>
          <span className="shrink-0 font-display text-2xl text-muted-foreground">{filtered.length.toString().padStart(2, "0")}</span>
        </div>

        {filtered.length ? (
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {filtered.map((control) => (
              <article key={`${control.group}-${control.action}`} className="group flex min-h-32 items-center gap-5 rounded-2xl border border-border bg-card/30 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-card/55">
                <div className="flex min-w-24 shrink-0 flex-wrap justify-center gap-1.5">
                  {control.keys.map((key) => (
                    <kbd key={key} className="grid min-w-11 place-items-center rounded-lg border border-foreground/15 bg-foreground/[0.06] px-2.5 py-3 font-sans text-sm font-bold text-foreground shadow-[0_4px_0_oklch(1_0_0/8%)] transition-colors group-hover:border-primary/45 group-hover:text-primary">{key}</kbd>
                  ))}
                </div>
                <div className="min-w-0 border-l border-border pl-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">{control.group}</p>
                  <h3 className="mt-1 font-display text-2xl tracking-wide">{control.action}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{control.text}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-border px-6 py-14 text-center">
            <Keyboard className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-4 font-display text-3xl">N-am găsit tasta asta.</p>
            <button type="button" onClick={() => { setQuery(""); setGroup("Toate"); }} className="mt-3 text-primary hover:underline">Resetează căutarea</button>
          </div>
        )}

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="flex items-center gap-3">
              <TerminalSquare className="size-6 text-primary" />
              <h2 className="font-display text-4xl tracking-wide">Comenzi RP uzuale</h2>
            </div>
            <div className="mt-5 overflow-hidden rounded-2xl border border-border">
              {RP_COMMANDS.map((item) => (
                <article key={item.command} className="grid gap-3 border-b border-border bg-card/30 p-5 last:border-b-0 md:grid-cols-[100px_1fr] md:items-center md:gap-5">
                  <code className="w-fit rounded-lg bg-primary/10 px-3 py-2 font-mono text-lg font-semibold text-primary">{item.command}</code>
                  <div>
                    <p>{item.text}</p>
                    <code className="mt-1 block text-sm text-muted-foreground">{item.example}</code>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-card/35 p-6">
            <Mouse className="size-7 text-primary" />
            <h3 className="mt-4 font-display text-3xl">Mai întâi, regulile.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Comenzile te ajută, dar roleplay-ul bun începe cu regulamentul citit.</p>
            <Link to="/regulament" className="mt-5 inline-flex items-center gap-2 font-display text-xl tracking-wide text-primary hover:text-foreground">
              Deschide regulamentul <ArrowRight className="size-4" />
            </Link>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
