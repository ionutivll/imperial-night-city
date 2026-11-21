import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { ComingSoonNote } from "@/components/site/ComingSoonNote";
import { RULE_SECTIONS } from "@/lib/rules";
import { SERVER_INFO } from "@/lib/server-info";

export const Route = createFileRoute("/regulament/")({
  head: () => ({
    meta: [
      { title: "Regulament | Imperial Romania FiveM RP" },
      { name: "description", content: "Regulamentul Imperial Romania, pe categorii: general, termeni RP, jafuri, mafii, poliție, zone safe și sancțiuni." },
      { property: "og:title", content: "Regulament | Imperial Romania" },
      { property: "og:description", content: "Regulamentul serverului Imperial Romania, împărțit pe categorii. Citește-l înainte să intri în oraș." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegulamentPage,
});

function RegulamentPage() {
  return (
    <SiteShell>
      <WikiLayout>
        <nav className="animate-hero-in flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/wiki" className="transition-colors hover:text-primary">Wiki</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">Regulament</span>
        </nav>
        <h1 className="animate-hero-in mt-6 font-display text-6xl leading-none md:text-8xl" style={{ "--delay": "100ms" } as React.CSSProperties}>
          Regulament
        </h1>
        <p className="animate-hero-in mt-4 max-w-2xl text-lg text-foreground/70" style={{ "--delay": "180ms" } as React.CSSProperties}>
          Împărțit pe capitole, ca să găsești repede ce te interesează. „Nu știam” nu ține la staff.
        </p>

        <WikiDivider />

        <ComingSoonNote title="Îl scriem chiar acum">
          Staff-ul lucrează la varianta finală. Capitolele sunt gata, textul apare aici imediat ce e terminat.
        </ComingSoonNote>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {RULE_SECTIONS.map((s, i) => (
            <li key={s.slug} className="reveal" style={{ "--delay": `${(i % 2) * 70}ms` } as React.CSSProperties}>
              <Link
                to="/regulament/$sectiune"
                params={{ sectiune: s.slug }}
                className="liquid-glass group flex h-full flex-col rounded-xl p-5 transition-colors hover:border-primary/40"
              >
                <span className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/25">
                    <s.icon className="size-5" />
                  </span>
                  <span className="text-sm tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ml-auto text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {s.rules.length ? "gata" : "se scrie"}
                  </span>
                </span>
                <span className="mt-4 flex items-center gap-2 font-display text-2xl tracking-wide">
                  {s.title}
                  <ArrowRight className="size-4 text-primary opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                </span>
                <span className="mt-1 text-sm text-muted-foreground">{s.short}</span>
                <span className="mt-auto pt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.topics.length} situații</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="reveal mt-12">
          <Button variant="hero" size="xl" asChild>
            <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
              Întrebări? Discord
            </a>
          </Button>
        </div>
      </WikiLayout>
    </SiteShell>
  );
}
