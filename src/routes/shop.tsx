import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { ComingSoonNote } from "@/components/site/ComingSoonNote";
import { SHOP_CATEGORIES } from "@/lib/shop";
import { SERVER_INFO } from "@/lib/server-info";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop | Imperial Romania FiveM RP" },
      { name: "description", content: "Shop-ul Imperial Romania: VIP, vehicule, pachete și personalizare. Se deschide în curând." },
      { property: "og:title", content: "Shop | Imperial Romania" },
      { property: "og:description", content: "Shop-ul serverului Imperial Romania se deschide în curând." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Imperial Store"
        title={
          <>
            <span className="text-vice">Shop</span>
          </>
        }
      >
        <p className="mx-auto max-w-xl text-lg text-foreground/75">Aici o să fie tot ce ține de shop. Îl pregătim acum.</p>
      </PageHeader>

      <section className="mx-auto max-w-6xl px-5 pb-28">
        <div className="mx-auto max-w-3xl">
          <ComingSoonNote title="Se deschide în curând">
            Produsele și prețurile le anunțăm pe Discord. Până atunci, uite ce categorii pregătim.
          </ComingSoonNote>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SHOP_CATEGORIES.map((c, i) => (
            <article
              key={c.title}
              className="reveal liquid-glass group relative flex flex-col overflow-hidden rounded-2xl p-6"
              style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <div className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/25" style={{ "--shine-delay": `${i * 0.6}s` } as React.CSSProperties}>
                <c.icon className="size-7" />
              </div>
              <h2 className="mt-5 font-display text-3xl tracking-wide">{c.title}</h2>
              <p className="mt-1.5 text-muted-foreground">{c.text}</p>
              <span className="mt-auto flex items-center gap-2 pt-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <Lock className="size-3.5" /> În curând
              </span>
            </article>
          ))}
        </div>

        <div className="reveal mt-14 flex justify-center">
          <Button variant="hero" size="xl" asChild>
            <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
              Află primul pe Discord
            </a>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
