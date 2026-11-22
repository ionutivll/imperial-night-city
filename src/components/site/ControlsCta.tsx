import { ArrowRight, Keyboard } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ControlsCta() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-8">
      <div className="reveal group relative overflow-hidden rounded-2xl border border-border bg-card/35 p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
        <div className="flex items-start gap-5">
          <span className="grid size-13 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/25">
            <Keyboard className="size-6" />
          </span>
          <div>
            <p className="eyebrow">Ghid rapid</p>
            <h2 className="mt-1 font-display text-3xl tracking-wide md:text-4xl">Nu trebuie să ghicești tastele.</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">Mișcare, telefon, chat și comenzi RP. Le ai pe toate într-o singură pagină.</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between gap-5 md:mt-0 md:justify-end">
          <div className="hidden items-center gap-1.5 sm:flex" aria-hidden>
            {["F1", "K", "T", "F8"].map((key) => (
              <kbd key={key} className="grid size-10 place-items-center rounded-lg border border-foreground/15 bg-foreground/[0.05] font-sans text-xs font-semibold shadow-[0_3px_0_oklch(1_0_0/8%)]">{key}</kbd>
            ))}
          </div>
          <Link to="/taste" className="inline-flex shrink-0 items-center gap-2 font-display text-xl tracking-wide text-primary transition-colors hover:text-foreground">
            Vezi ghidul <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
