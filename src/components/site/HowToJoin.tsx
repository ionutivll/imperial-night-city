import { useState } from "react";
import { Check, Copy, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVER_INFO } from "@/lib/server-info";

const lastStep = SERVER_INFO.isOpen
  ? { title: "Te conectezi", text: "Apeși F8 în FiveM și dai paste la comanda de mai jos." }
  : { title: "Aștepți lansarea", text: "Deschidem în decembrie. IP-ul îl dăm pe Discord în ziua lansării." };

const steps = [
  { title: "Ai GTA V", text: "Îți trebuie GTA V original pe PC. Pe crack nu merge." },
  { title: "Pui FiveM", text: "Îl iei de pe fivem.net și îl legi de contul tău." },
  { title: "Intri pe Discord", text: "Citești regulile și îți faci whitelist-ul." },
  lastStep,
];

export function HowToJoin() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(SERVER_INFO.connectAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="join" className="relative mx-auto max-w-7xl px-5 py-28">
      <div className="text-center">
        <p className="reveal font-display text-xl tracking-[0.3em] text-primary">
          {SERVER_INFO.isOpen ? "Patru pași" : "Pregătește-te de acum"}
        </p>
        <h2 className="reveal mt-3 font-display text-5xl md:text-7xl" style={{ "--delay": "100ms" } as React.CSSProperties}>
          Cum <span className="text-fire">intri</span>
        </h2>
      </div>

      <div className="relative mt-16 grid gap-6 md:grid-cols-4">
        <div className="absolute left-0 right-0 top-10 hidden h-px bg-fire opacity-40 md:block" />
        {steps.map((s, i) => (
          <div key={s.title} className="reveal relative text-center" style={{ "--delay": `${i * 150}ms` } as React.CSSProperties}>
            <div className="relative mx-auto grid size-20 place-items-center rounded-full bg-fire font-display text-4xl text-primary-foreground shadow-glow transition-transform duration-500 hover:scale-110">
              {i + 1}
            </div>
            <h3 className="mt-6 font-display text-3xl">{s.title}</h3>
            <p className="mt-2 text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>

      <div className="reveal mx-auto mt-16 max-w-2xl" style={{ "--delay": "300ms" } as React.CSSProperties}>
        {SERVER_INFO.isOpen ? (
          <button
            onClick={copy}
            className="border-fire group flex w-full items-center justify-between gap-4 rounded-2xl bg-card px-6 py-5 text-left shadow-card transition-all duration-300 hover:shadow-glow"
          >
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Consola F8</div>
              <code className="font-mono text-lg text-primary-glow md:text-xl">{SERVER_INFO.connectAddress}</code>
            </div>
            <span className="flex items-center gap-2 font-display text-lg tracking-wider text-primary">
              {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
              {copied ? "Copiat!" : "Copiază"}
            </span>
          </button>
        ) : (
          <div className="border-fire flex flex-col items-center justify-between gap-4 rounded-2xl bg-card px-6 py-5 shadow-card sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="grid size-11 place-items-center rounded-xl bg-accent text-primary">
                <Lock className="size-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">IP server</div>
                <div className="font-display text-2xl tracking-wide text-foreground">Îl primești pe Discord la lansare</div>
              </div>
            </div>
            <Button variant="hero" size="lg" asChild>
              <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
                Intră pe Discord
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
