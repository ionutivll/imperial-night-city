import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { WikiCategory } from "@/lib/wiki";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<WikiCategory["status"], string> = {
  ready: "Gata",
  writing: "Se scrie acum",
  soon: "În curând",
};

const cardCls =
  "reveal liquid-glass group flex h-full flex-col rounded-[1.75rem] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow";

export function WikiCard({ c, i }: { c: WikiCategory; i: number }) {
  const style = { "--delay": `${(i % 3) * 90}ms` } as React.CSSProperties;
  const inner = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="grid size-14 place-items-center rounded-2xl bg-vice text-primary-foreground shadow-glow transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
          <c.icon className="size-7" />
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest",
            c.status === "soon" ? "bg-foreground/[0.07] text-muted-foreground" : "bg-primary/15 text-primary-glow",
          )}
        >
          {STATUS_LABEL[c.status]}
        </span>
      </div>
      <h2 className="mt-5 flex items-center gap-2 font-display text-3xl tracking-wide">
        {c.title}
        <ArrowUpRight className="size-6 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
      </h2>
      <p className="mt-1.5 text-muted-foreground">{c.text}</p>
    </>
  );
  return c.slug === "regulament" ? (
    <Link to="/regulament" className={cardCls} style={style}>
      {inner}
    </Link>
  ) : (
    <Link to="/wiki/$slug" params={{ slug: c.slug }} className={cardCls} style={style}>
      {inner}
    </Link>
  );
}
