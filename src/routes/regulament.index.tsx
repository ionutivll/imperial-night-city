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
      <PageHeader
        eyebrow="Wiki · Regulament"
        title={
          <>
            Regulamentul <span className="text-vice">serverului</span>
          </>
        }
      >
        <p className="mx-auto max-w-xl text-lg text-foreground/75">
          Împărțit pe categorii, ca să găsești repede ce te interesează. „Nu știam” nu ține la staff.
        </p>
      </PageHeader>

      <section className="mx-auto max-w-6xl px-5 pb-28">
        <div className="mx-auto max-w-3xl">
          <ComingSoonNote title="Îl scriem chiar acum">
            Staff-ul lucrează la varianta finală. Categoriile sunt gata, textul apare aici imediat ce e terminat.
          </ComingSoonNote>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RULE_SECTIONS.map((s, i) => (
            <Link
              key={s.slug}
              to="/regulament/$sectiune"
              params={{ sectiune: s.slug }}
              className="reveal liquid-glass group flex flex-col rounded-[1.75rem] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow"
              style={{ "--delay": `${(i % 3) * 90}ms` } as React.CSSProperties}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="grid size-14 place-items-center rounded-2xl bg-vice text-primary-foreground shadow-glow transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <s.icon className="size-7" />
                </div>
                <span className="font-display text-4xl text-foreground/15 transition-colors duration-500 group-hover:text-foreground/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-5 flex items-center gap-2 font-display text-3xl tracking-wide">
                {s.title}
                <ArrowUpRight className="size-6 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </h2>
              <p className="mt-1.5 text-muted-foreground">{s.short}</p>
              <div className="mt-auto flex items-center justify-between pt-6 text-xs font-semibold uppercase tracking-widest">
                <span className="text-muted-foreground">{s.topics.length} situații</span>
                <span className="rounded-full bg-primary/15 px-3 py-1 text-primary-glow">
                  {s.rules.length ? "Gata" : "Se scrie"}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="reveal mt-14 flex justify-center">
          <Button variant="hero" size="xl" asChild>
            <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
              Întrebări? Discord
            </a>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
