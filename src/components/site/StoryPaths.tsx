import type { CSSProperties } from "react";
import { ArrowUpRight, Siren, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVER_INFO } from "@/lib/server-info";
import police from "@/assets/feature-police.jpg";
import gangs from "@/assets/feature-gangs.jpg";

const paths = [
  {
    icon: Siren,
    image: police,
    alt: "Mașini de poliție într-o urmărire prin oraș",
    eyebrow: "Partea legală",
    title: "Omul legii",
    text: "Începi de jos, înveți procedurile și ajungi să faci diferența în stradă. Fiecare tură poate deveni o poveste bună.",
    steps: ["Îți faci personajul", "Aplici și treci trainingul", "Ieși în teren și urci în grad"],
  },
  {
    icon: UsersRound,
    image: gangs,
    alt: "O gașcă lângă mașini clasice, noaptea",
    eyebrow: "Partea underground",
    title: "Viața pe stradă",
    text: "Pornești fără nume și îți construiești reputația. Alegi oamenii lângă care joci, dar ai grijă cui îți dai încrederea.",
    steps: ["Intri în cartier", "Îți alegi oamenii", "Îți scrii propria poveste"],
  },
];

export function StoryPaths() {
  return (
    <section id="drumuri" className="relative mx-auto max-w-[1440px] px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="reveal font-display text-lg tracking-[0.35em] text-primary-glow">Alege-ți drumul</p>
        <h2
          className="reveal mt-4 font-display text-5xl leading-[0.95] md:text-7xl"
          style={{ "--delay": "100ms" } as CSSProperties}
        >
          Legal sau ilegal. <span className="text-vice">Tu decizi.</span>
        </h2>
        <p
          className="reveal mx-auto mt-5 max-w-xl text-lg text-muted-foreground"
          style={{ "--delay": "180ms" } as CSSProperties}
        >
          Nu există un singur mod de a juca. Important e să intri în pielea personajului și să te ții de poveste.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {paths.map((path, index) => (
          <article
            key={path.title}
            className="reveal group relative min-h-[680px] overflow-hidden rounded-[2rem] shadow-card md:min-h-[760px]"
            style={{ "--delay": `${index * 140}ms` } as CSSProperties}
          >
            <img
              src={path.image}
              alt={path.alt}
              loading="lazy"
              width={1024}
              height={1280}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/5" />
            <div className="absolute inset-0 bg-vice opacity-0 mix-blend-soft-light transition-opacity duration-700 group-hover:opacity-25" />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 md:p-8">
              <span className="liquid-glass rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]">
                {path.eyebrow}
              </span>
              <span className="liquid-glass grid size-12 place-items-center rounded-full text-primary-glow">
                <path.icon className="size-5" />
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
              <div className="liquid-glass rounded-[1.6rem] bg-background/45 p-6 md:p-8">
                <h3 className="font-display text-5xl leading-none md:text-6xl">{path.title}</h3>
                <p className="mt-4 leading-relaxed text-foreground/75">{path.text}</p>
                <ol className="mt-6 space-y-3">
                  {path.steps.map((step, stepIndex) => (
                    <li key={step} className="flex items-center gap-4 border-t border-border pt-3">
                      <span className="font-display text-xl text-primary-glow">0{stepIndex + 1}</span>
                      <span className="font-medium text-foreground/90">{step}</span>
                    </li>
                  ))}
                </ol>
                <Button variant="glass" size="lg" className="mt-6 w-full justify-between px-5" asChild>
                  <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
                    Vrei pe drumul ăsta? Hai pe Discord
                    <ArrowUpRight />
                  </a>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
