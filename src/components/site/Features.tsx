import type { CSSProperties } from "react";
import { ArrowUpRight, Briefcase, Car, Home, Mic, Shield, Trophy } from "lucide-react";
import { Link } from "@tanstack/react-router";
import police from "@/assets/feature-police.jpg";
import gangs from "@/assets/feature-gangs.jpg";
import business from "@/assets/feature-business.jpg";

const showcase = [
  {
    image: police,
    tag: "Facțiuni legale",
    title: "Poliție & SMURD",
    text: "Intri în poliție sau la SMURD, faci training și urci în grad. Dispecerat, intervenții și ture care nu se repetă la fel.",
    slug: "politie-smurd",
  },
  {
    image: gangs,
    tag: "Underground",
    title: "Mafii & găști",
    text: "Îți faci gașca, îți construiești numele și intri în lumea ilegală. Fiecare alianță și fiecare greșeală are consecințe.",
    slug: "mafii",
  },
  {
    image: business,
    tag: "Economie",
    title: "Afaceri & proprietăți",
    text: "De la primul job la propriul business, alegi cât de departe ajungi. Banii se fac prin joc, nu prin scurtături.",
    slug: "afaceri",
  },
];

const extras = [
  { icon: Car, title: "Mașini custom", text: "Îți alegi mașina și o modifici să fie a ta." },
  { icon: Home, title: "Case", text: "Un loc al tău, nu doar un punct pe hartă." },
  { icon: Mic, title: "Voce în joc", text: "Vorbești cu oamenii din jur, natural." },
  { icon: Briefcase, title: "Joburi", text: "Legal sau riscant, tu îți alegi drumul." },
  { icon: Trophy, title: "Evenimente", text: "Seri și activități cu toată comunitatea." },
  { icon: Shield, title: "Staff prezent", text: "Deschizi un ticket și vorbești cu un om." },
];

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-radial-glow" />
      <div className="relative mx-auto max-w-7xl px-5">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="reveal font-display text-lg tracking-[0.35em] text-primary-glow">Ce găsești în oraș</p>
            <h2
              className="reveal mt-4 font-display text-5xl leading-[0.95] md:text-7xl"
              style={{ "--delay": "100ms" } as CSSProperties}
            >
              O poveste nu e de ajuns. <span className="text-vice">Fă-ți trei.</span>
            </h2>
          </div>
          <p className="reveal max-w-sm text-lg text-muted-foreground" style={{ "--delay": "180ms" } as CSSProperties}>
            Poți fi cine vrei. Mai jos ai doar câteva locuri de unde poți începe.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {showcase.map((feature, index) => (
            <article
              key={feature.title}
              className="reveal liquid-glass group overflow-hidden rounded-2xl bg-card/35"
              style={{ "--delay": `${index * 120}ms` } as CSSProperties}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <span className="liquid-glass absolute left-5 top-5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
                  {feature.tag}
                </span>
                <span className="absolute bottom-4 right-5 font-display text-5xl text-foreground/80">0{index + 1}</span>
              </div>
              <div className="p-6 md:p-7">
                <h3 className="font-display text-4xl">{feature.title}</h3>
                <p className="mt-3 min-h-20 leading-relaxed text-muted-foreground">{feature.text}</p>
                <Link
                  to="/wiki/$slug"
                  params={{ slug: feature.slug }}
                  className="mt-5 inline-flex items-center gap-2 font-display text-xl tracking-wide text-primary-glow transition-colors hover:text-foreground"
                >
                  Detalii în wiki <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {extras.map((extra, index) => (
            <div
              key={extra.title}
              className="reveal group flex items-center gap-4 rounded-2xl border border-border bg-card/35 p-5 transition-colors duration-300 hover:bg-card/60"
              style={{ "--delay": `${(index % 3) * 80}ms` } as CSSProperties}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-foreground/[0.07] text-primary-glow transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                <extra.icon className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-2xl tracking-wide">{extra.title}</h3>
                <p className="text-sm text-muted-foreground">{extra.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
