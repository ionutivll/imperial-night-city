import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { About } from "@/components/site/About";
import { Features } from "@/components/site/Features";
import { HowToJoin } from "@/components/site/HowToJoin";
import { Rules } from "@/components/site/Rules";
import { FinalCta } from "@/components/site/FinalCta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Imperial Romania | Server FiveM Roleplay GTA V" },
      {
        name: "description",
        content:
          "Imperial Romania, server românesc de FiveM roleplay pe GTA V. Poliție, SMURD, mafii, afaceri. Lansăm în curând, intră pe Discord.",
      },
      { property: "og:title", content: "Imperial Romania | FiveM Roleplay" },
      {
        property: "og:description",
        content: "Server românesc de RP pe GTA V. Lansăm în curând, intră pe Discord să prinzi deschiderea.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <Hero />
      <Marquee />
      <About />
      <Features />
      <HowToJoin />
      <Rules />
      <FinalCta />
    </SiteShell>
  );
}
