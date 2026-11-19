import { Car, Home, Mic, Briefcase, Trophy, Shield } from "lucide-react";
import police from "@/assets/feature-police.jpg";
import gangs from "@/assets/feature-gangs.jpg";
import business from "@/assets/feature-business.jpg";

const showcase = [
  { img: police, tag: "Lege", title: "Poliție & SMURD", text: "Intri în poliție sau la SMURD, faci training, urci în grad. Dispecerat pe bune, nu doar sirene." },
  { img: gangs, tag: "Underground", title: "Mafie & Găști", text: "Îți faci gașca, iei teritoriu, faci bani murdari. Doar ai grijă cine te vinde." },
  { img: business, tag: "Economie", title: "Afaceri", text: "Deschizi dealer auto, club sau service. Economia e făcută să nu se strice după o săptămână." },
];

const extras = [
  { icon: Car, title: "Mașini custom", text: "Sute de mașini alese de noi, le tunezi cum vrei." },
  { icon: Home, title: "Case", text: "Îți iei casă, o mobilezi și o faci a ta." },
  { icon: Mic, title: "Voce în joc", text: "Vorbești pe proximitate, plus stații radio." },
  { icon: Briefcase, title: "Joburi", text: "De la tirist la avocat, ai de unde alege." },
  { icon: Trophy, title: "Evenimente", text: "Curse, jafuri și seri cu toată comunitatea, săptămânal." },
  { icon: Shield, title: "Staff ok", text: "Staff care chiar te ajută, nu te ignoră pe ticket." },
];

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-radial-glow blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5">
        <div className="text-center">
          <p className="reveal font-display text-xl tracking-[0.3em] text-primary">Ce găsești pe server</p>
          <h2 className="reveal mt-3 font-display text-5xl md:text-7xl" style={{ "--delay": "100ms" } as React.CSSProperties}>
            Fă ce vrei. <span className="text-fire">Pe bune.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {showcase.map((f, i) => (
            <article
              key={f.title}
              className="reveal group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-card"
              style={{ "--delay": `${i * 150}ms` } as React.CSSProperties}
            >
              <img
                src={f.img}
                alt={f.title}
                loading="lazy"
                width={1024}
                height={1280}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-0 bg-fire opacity-0 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-40" />
              <div className="absolute inset-x-0 bottom-0 p-7 transition-transform duration-500 group-hover:-translate-y-2">
                <span className="inline-block rounded-full bg-fire px-3 py-1 font-display text-sm tracking-widest text-primary-foreground">
                  {f.tag}
                </span>
                <h3 className="mt-3 font-display text-4xl">{f.title}</h3>
                <p className="mt-2 max-h-0 overflow-hidden text-foreground/80 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                  {f.text}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {extras.map((e, i) => (
            <div
              key={e.title}
              className="reveal border-fire group flex gap-5 rounded-2xl bg-card/70 p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:bg-accent"
              style={{ "--delay": `${(i % 3) * 100}ms` } as React.CSSProperties}
            >
              <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-fire text-primary-foreground shadow-glow transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                <e.icon className="size-7" />
              </div>
              <div>
                <h3 className="font-display text-2xl tracking-wide">{e.title}</h3>
                <p className="text-muted-foreground">{e.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
