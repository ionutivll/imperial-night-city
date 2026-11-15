import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const rules = [
  { title: "Stay in character", text: "Roleplay comes first. Out-of-character talk belongs in Discord or /ooc, not in the middle of a scene." },
  { title: "No RDM / VDM", text: "Never kill or run over players without a valid roleplay reason. Every conflict needs a story behind it." },
  { title: "Value your life", text: "Act as if your character has one life. Fear weapons, respect threats and don't take reckless risks." },
  { title: "No metagaming", text: "Information you learn outside the game (streams, Discord) can't be used in character." },
  { title: "Respect everyone", text: "Zero tolerance for toxicity, harassment or discrimination — in game and in our community." },
];

export function Rules() {
  return (
    <section id="rules" className="relative mx-auto max-w-4xl px-5 py-28">
      <div className="text-center">
        <p className="reveal font-display text-xl tracking-[0.3em] text-primary">Keep it real</p>
        <h2 className="reveal mt-3 font-display text-5xl md:text-7xl" style={{ "--delay": "100ms" } as React.CSSProperties}>
          Core <span className="text-fire">rules</span>
        </h2>
      </div>
      <Accordion type="single" collapsible className="mt-12 space-y-4">
        {rules.map((r, i) => (
          <AccordionItem
            key={r.title}
            value={r.title}
            className="reveal border-fire rounded-2xl border-0 bg-card px-6"
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
      <p className="reveal mt-8 text-center text-muted-foreground">
        The full rulebook lives on our Discord — read it before you connect.
      </p>
    </section>
  );
}
