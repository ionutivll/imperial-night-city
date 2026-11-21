import type { ReactNode } from "react";
import { PenLine } from "lucide-react";

/** Glass notice for pages whose content is still being written. */
export function ComingSoonNote({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="reveal liquid-glass flex items-start gap-4 rounded-3xl p-5 md:p-6">
      <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/25">
        <PenLine className="size-5" />
      </div>
      <div>
        <p className="font-display text-2xl tracking-wide md:text-3xl">{title}</p>
        <p className="mt-1 text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}
