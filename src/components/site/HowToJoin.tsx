import { useState, type CSSProperties } from "react";
import { ArrowUpRight, Check, Copy, Download, Gamepad2, Lock, MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVER_INFO } from "@/lib/server-info";

export function HowToJoin() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(SERVER_INFO.connectAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      icon: Gamepad2,
      title: "Ai GTA V pe PC",
      text: "Îți trebuie varianta originală a jocului. Dacă o ai deja, treci direct la pasul doi.",
      action: "Vezi GTA V pe Steam",
      href: "https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/",
    },
    {
      icon: Download,
      title: "Instalezi FiveM",
      text: "Clientul este gratuit și se instalează peste GTA V. Descarcă-l doar de pe site-ul oficial.",
      action: "Descarcă FiveM",
      href: "https://fivem.net/",
    },
    SERVER_INFO.isOpen
      ? {
          icon: MessagesSquare,
          title: "Intri în oraș",
          text: "Deschide FiveM, apasă F8 și folosește comanda de conectare de mai jos.",
          action: "Conectează-te",
          href: SERVER_INFO.fivemUrl,
        }
      : {
          icon: MessagesSquare,
          title: "Vii pe Discord",
          text: "Acolo afli primul când deschidem, cum faci whitelist și când încep recrutările la facțiuni.",
          action: "Intră pe Discord",
          href: SERVER_INFO.discordUrl,
        },
  ];

  return (
    <section id="join" className="relative mx-auto max-w-7xl px-5 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="reveal font-display text-lg tracking-[0.35em] text-primary-glow">
          {SERVER_INFO.isOpen ? "Trei pași și ești aici" : "Pregătește-te din timp"}
        </p>
        <h2
          className="reveal mt-4 font-display text-5xl leading-[0.95] md:text-7xl"
          style={{ "--delay": "100ms" } as CSSProperties}
        >
          Cum intri în <span className="text-vice">oraș</span>
        </h2>
        <p className="reveal mt-5 text-lg text-muted-foreground" style={{ "--delay": "180ms" } as CSSProperties}>
          Nu ai nevoie de cinci tutoriale și trei programe. Doar de astea.
        </p>
      </div>

      <div className="relative mt-14 grid gap-5 md:grid-cols-3">
        <div className="absolute left-[16%] right-[16%] top-12 hidden h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent md:block" />
        {steps.map((step, index) => (
          <article
            key={step.title}
            className="reveal liquid-glass relative flex flex-col rounded-2xl bg-card/35 p-6 md:p-8"
            style={{ "--delay": `${index * 120}ms` } as CSSProperties}
          >
            <div className="flex items-center justify-between">
              <span className="grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/25">
                <step.icon className="size-7" />
              </span>
              <span className="text-outline font-display text-7xl">0{index + 1}</span>
            </div>
            <h3 className="mt-8 font-display text-4xl">{step.title}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{step.text}</p>
            <Button variant="glass" size="lg" className="mt-7 w-full justify-between px-5" asChild>
              <a
                href={step.href}
                {...(step.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {step.action} <ArrowUpRight />
              </a>
            </Button>
          </article>
        ))}
      </div>

      <div className="reveal mx-auto mt-8 max-w-4xl" style={{ "--delay": "260ms" } as CSSProperties}>
        {SERVER_INFO.isOpen ? (
          <button
            onClick={copy}
            className="liquid-glass group flex w-full items-center justify-between gap-4 rounded-2xl bg-card/45 px-6 py-5 text-left transition-transform duration-300 hover:-translate-y-1"
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
          <div className="liquid-glass flex flex-col items-center justify-between gap-4 rounded-2xl bg-card/35 px-6 py-5 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-foreground/[0.07] text-primary-glow">
                <Lock className="size-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Adresa serverului</div>
                <div className="font-display text-2xl tracking-wide">O publicăm pe Discord la lansare</div>
              </div>
            </div>
            <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-glow">
              În curând
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
