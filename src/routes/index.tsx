import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { About } from "@/components/site/About";
import { Features } from "@/components/site/Features";
import { HowToJoin } from "@/components/site/HowToJoin";
import { Rules } from "@/components/site/Rules";
import { FinalCta } from "@/components/site/FinalCta";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Imperial Romania — GTA V FiveM Roleplay Server" },
      {
        name: "description",
        content:
          "Join Imperial Romania, an immersive GTA V FiveM roleplay server. Police, EMS, gangs, businesses and a living economy.",
      },
      { property: "og:title", content: "Imperial Romania — GTA V FiveM Roleplay" },
      {
        property: "og:description",
        content: "Your story. Your empire. Join Romania's most immersive FiveM roleplay city.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Features />
      <HowToJoin />
      <Rules />
      <FinalCta />
    </main>
  );
}
