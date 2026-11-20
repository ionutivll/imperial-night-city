import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RULE_SECTIONS } from "@/lib/rules";

export function Rules() {
  return (
    <section id="rules" className="relative mx-auto max-w-6xl px-5 py-28">
      <div className="text-center">
        <p className="reveal font-display text-xl tracking-[0.3em] text-primary">Ca să ne înțelegem</p>
        <h2 className="reveal mt-3 font-display text-5xl md:text-7xl" style={{ "--delay": "100ms" } as React.CSSProperties}>
          Regulamentul <span className="text-vice">vine pe categorii</span>
        </h2>
        <p className="reveal mx-auto mt-4 max-w-xl text-lg text-muted-foreground" style={{ "--delay": "180ms" } as React.CSSProperties}>
          Staff-ul îl termină acum. Uite din ce o să fie făcut.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
        {RULE_SECTIONS.map((s, i) => (
          <Link
            key={s.slug}
            to="/regulament/$sectiune"
            params={{ sectiune: s.slug }}
            className="reveal liquid-glass group flex items-center gap-3 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            style={{ "--delay": `${(i % 4) * 70}ms` } as React.CSSProperties}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-vice text-primary-foreground transition-transform duration-300 group-hover:-rotate-6">
              <s.icon className="size-5" />
            </span>
            <span className="font-display text-lg leading-tight tracking-wide md:text-xl">{s.title}</span>
          </Link>
        ))}
      </div>
      <div className="reveal mt-10 flex justify-center">
        <Button variant="glass" size="xl" asChild>
          <Link to="/regulament">
            Vezi regulamentul <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
