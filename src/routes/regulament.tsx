import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { RulesList } from "@/components/site/RulesList";
import { SERVER_INFO } from "@/lib/server-info";

export const Route = createFileRoute("/regulament")({
  head: () => ({
    meta: [
      { title: "Regulament | Imperial Romania FiveM RP" },
      { name: "description", content: "Regulamentul serverului Imperial Romania. Regulile de bază pentru RP, până apare varianta completă." },
      { property: "og:title", content: "Regulament | Imperial Romania" },
      { property: "og:description", content: "Regulile serverului Imperial Romania. Citește-le înainte să intri în oraș." },
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
            Regulamentul <span className="text-fire">serverului</span>
          </>
        }
      >
        <p className="mx-auto max-w-xl text-lg text-foreground/75">
          Citește-l înainte să intri. „Nu știam” nu ține la staff.
        </p>
      </PageHeader>

      <section className="mx-auto max-w-4xl px-5 pb-28">
        <div className="reveal glass flex items-start gap-4 rounded-2xl p-5">
          <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-fire text-primary-foreground">
            <PenLine className="size-5" />
          </div>
          <div>
            <p className="font-display text-2xl tracking-wide">Îl scriem chiar acum</p>
            <p className="text-muted-foreground">
              Regulamentul complet e în lucru și apare aici cât de curând. Până atunci, astea sunt regulile de bază.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <RulesList />
        </div>

        <div className="reveal mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="glass" size="xl" asChild>
            <Link to="/wiki">
              <ArrowLeft /> Înapoi la wiki
            </Link>
          </Button>
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
