import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RulesList } from "./RulesList";

export function Rules() {
  return (
    <section id="rules" className="relative mx-auto max-w-4xl px-5 py-28">
      <div className="text-center">
        <p className="reveal font-display text-xl tracking-[0.3em] text-primary">Ca să ne înțelegem</p>
        <h2 className="reveal mt-3 font-display text-5xl md:text-7xl" style={{ "--delay": "100ms" } as React.CSSProperties}>
          Regulile <span className="text-fire">de bază</span>
        </h2>
      </div>
      <div className="mt-12">
        <RulesList />
      </div>
      <div className="reveal mt-10 flex justify-center">
        <Button variant="glass" size="xl" asChild>
          <Link to="/regulament">
            Tot regulamentul <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
