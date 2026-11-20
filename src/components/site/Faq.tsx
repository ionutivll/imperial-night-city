import type { CSSProperties } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowUpRight, MessageCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVER_INFO } from "@/lib/server-info";

const questions = [
  {
    question: "Când se deschide serverul?",
    answer: "Lansăm în decembrie 2026. Ziua exactă o anunțăm pe Discord atunci când suntem complet gata.",
  },
  {
    question: "Pot să joc acum?",
    answer: "Nu încă. Serverul este în dezvoltare, iar accesul se deschide la lansare. Până atunci poți intra pe Discord să vezi ce mai pregătim.",
  },
  {
    question: "Ce îmi trebuie ca să joc?",
    answer: "Ai nevoie de GTA V original pe PC și de clientul gratuit FiveM. Instalarea durează câteva minute, iar pașii sunt și pe pagina asta.",
  },
  {
    question: "Unde găsesc regulamentul?",
    answer: "Îl găsești în meniul lateral, la Regulament, împărțit pe categorii. Staff-ul lucrează acum la varianta finală și o publicăm aici când este gata.",
  },
  {
    question: "Cum îmi fac whitelist?",
    answer: "Intră pe Discord și urmărește canalul cu anunțuri. Acolo publicăm pașii pentru whitelist și perioadele de recrutare.",
  },
  {
    question: "Unde sunt Wiki și Shop?",
    answer: "Apasă pe butonul Meniu din bara de sus. Wiki, Regulament și Shop sunt toate în panoul care se deschide.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative mx-auto max-w-7xl px-5 py-24 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="reveal font-display text-lg tracking-[0.35em] text-primary-glow">Întrebări frecvente</p>
          <h2
            className="reveal mt-4 font-display text-5xl leading-[0.95] md:text-7xl"
            style={{ "--delay": "100ms" } as CSSProperties}
          >
            Dacă te-ai <span className="text-vice">întrebat</span> și tu.
          </h2>
          <p
            className="reveal mt-5 max-w-md text-lg leading-relaxed text-muted-foreground"
            style={{ "--delay": "180ms" } as CSSProperties}
          >
            Am strâns chestiile pe care lumea vrea să le știe înainte de lansare.
          </p>
          <div
            className="reveal liquid-glass mt-8 rounded-3xl p-6"
            style={{ "--delay": "240ms" } as CSSProperties}
          >
            <MessageCircle className="size-7 text-primary-glow" />
            <h3 className="mt-4 font-display text-3xl">Ai altă întrebare?</h3>
            <p className="mt-2 text-muted-foreground">Vorbește direct cu noi pe Discord. E mai simplu așa.</p>
            <Button variant="hero" size="lg" className="mt-5" asChild>
              <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
                Întreabă pe Discord <ArrowUpRight />
              </a>
            </Button>
          </div>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-3">
          {questions.map((item, index) => (
            <Accordion.Item
              key={item.question}
              value={`item-${index}`}
              className="reveal liquid-glass overflow-hidden rounded-2xl"
              style={{ "--delay": `${(index % 3) * 80}ms` } as CSSProperties}
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center gap-4 px-5 py-5 text-left md:px-6">
                  <span className="font-display text-xl text-primary-glow">0{index + 1}</span>
                  <span className="flex-1 text-lg font-semibold">{item.question}</span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-foreground/[0.07] transition-colors group-hover:bg-foreground/[0.12]">
                    <Plus className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-45" />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
                <p className="px-5 pb-6 pl-[3.75rem] leading-relaxed text-muted-foreground md:px-6 md:pl-[4.25rem]">
                  {item.answer}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
