import type { CSSProperties } from "react";
import { Check, MessageSquareText, Scale, Sparkles } from "lucide-react";

const principles = [
  {
    icon: Sparkles,
    title: "RP pus pe povești",
    text: "Personajul tău și deciziile lui contează mai mult decât cifrele din cont.",
  },
  {
    icon: MessageSquareText,
    title: "Staff care vorbește cu tine",
    text: "Vrem o comunitate în care poți întreba ceva fără să ți se închidă ușa în față.",
  },
  {
    icon: Scale,
    title: "Aceleași reguli pentru toți",
    text: "Fără favoriți și fără avantaje cumpărate. Jocul trebuie să rămână drept.",
  },
];

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-24 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative">
          <span className="text-outline pointer-events-none absolute -top-24 left-0 -z-10 select-none font-display text-[12rem] leading-none opacity-30" aria-hidden>
            RP
          </span>
          <p className="reveal font-display text-lg tracking-[0.35em] text-primary-glow">Despre Imperial</p>
          <h2
            className="reveal mt-4 font-display text-5xl leading-[0.95] md:text-7xl"
            style={{ "--delay": "100ms" } as CSSProperties}
          >
            Nu grăbim lansarea. <span className="text-vice">Grăbim doar mașinile.</span>
          </h2>
          <p
            className="reveal mt-6 text-lg leading-relaxed text-muted-foreground"
            style={{ "--delay": "180ms" } as CSSProperties}
          >
            Am jucat pe destule servere ca să știm ce ne place și ce ne scoate din minți. La Imperial facem lucrurile mai atent: roleplay pe bune, oameni de treabă și un oraș în care ai chef să revii.
          </p>
          <p
            className="reveal mt-4 text-lg leading-relaxed text-muted-foreground"
            style={{ "--delay": "240ms" } as CSSProperties}
          >
            Mai lucrăm la el. Între timp, poți intra pe Discord să ne cunoști și să vezi cum prinde viață orașul.
          </p>
        </div>

        <div
          className="reveal liquid-glass relative overflow-hidden rounded-[2rem] bg-card/35 p-6 md:p-9"
          style={{ "--delay": "160ms" } as CSSProperties}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-pink/15 blur-3xl" />
          <div className="relative flex items-center justify-between border-b border-border pb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Ce contează la noi</p>
            <span className="font-display text-2xl text-vice">01—03</span>
          </div>
          <div className="relative divide-y divide-border">
            {principles.map((principle, index) => (
              <div key={principle.title} className="flex gap-5 py-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-foreground/[0.07] text-primary-glow">
                  <principle.icon className="size-5" />
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-2xl tracking-wide">{principle.title}</h3>
                    <span className="font-display text-sm text-muted-foreground">0{index + 1}</span>
                  </div>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{principle.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative flex items-center gap-3 rounded-2xl bg-foreground/[0.06] px-5 py-4">
            <span className="grid size-7 place-items-center rounded-full bg-vice text-primary-foreground">
              <Check className="size-4" />
            </span>
            <p className="font-medium">Fără pay to win. Fără favorite.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
