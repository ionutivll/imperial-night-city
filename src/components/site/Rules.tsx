import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const rules = [
  { title: "Rămâi în caracter", text: "RP-ul e pe primul loc. Chestiile OOC le zici pe Discord sau pe /ooc, nu în mijlocul scenei." },
  { title: "Fără RDM / VDM", text: "Nu omori și nu calci oameni cu mașina fără motiv de RP. Orice conflict are nevoie de o poveste în spate." },
  { title: "Ține la viața ta", text: "Joacă de parcă ai o singură viață. Dacă ai o armă la cap, nu faci pe eroul." },
  { title: "Fără metagaming", text: "Ce afli de pe stream sau de pe Discord nu folosești în joc. Simplu." },
  { title: "Respect", text: "Fără toxicitate, hărțuire sau rasism. Nici în joc, nici pe Discord." },
];

export function Rules() {
  return (
    <section id="rules" className="relative mx-auto max-w-4xl px-5 py-28">
      <div className="text-center">
        <p className="reveal font-display text-xl tracking-[0.3em] text-primary">Ca să ne înțelegem</p>
        <h2 className="reveal mt-3 font-display text-5xl md:text-7xl" style={{ "--delay": "100ms" } as React.CSSProperties}>
          Regulile <span className="text-fire">de bază</span>
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
        Regulamentul complet e pe Discord. Citește-l înainte să intri, serios.
      </p>
    </section>
  );
}
