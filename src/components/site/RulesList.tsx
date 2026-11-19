import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BASIC_RULES } from "@/lib/rules";

export function RulesList() {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {BASIC_RULES.map((r, i) => (
        <AccordionItem
          key={r.title}
          value={r.title}
          className="reveal border-fire glass rounded-2xl border-0 px-6"
          style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
        >
          <AccordionTrigger className="font-display text-2xl tracking-wide hover:text-primary hover:no-underline">
            <span className="flex items-center gap-4">
              <span className="text-fire">{String(i + 1).padStart(2, "0")}</span>
              {r.title}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">{r.text}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
