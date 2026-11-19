import { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCity from "@/assets/hero-city.jpg";
import logo from "@/assets/imperial-romania-logo.png.asset.json";
import { SERVER_INFO } from "@/lib/server-info";
import { Embers } from "./Embers";
import { LaunchDate } from "./LaunchDate";

export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (bgRef.current) bgRef.current.style.transform = `translateY(${y * 0.4}px) scale(1.1)`;
        if (logoRef.current) {
          logoRef.current.style.transform = `translateY(${y * 0.15}px)`;
          logoRef.current.style.opacity = String(Math.max(0, 1 - y / 700));
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="grain relative flex min-h-screen items-center justify-center overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 scale-110 will-change-transform">
        <img
          src={heroCity}
          alt="Oraș noaptea, luminat portocaliu"
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-background/45" />
      <div className="absolute inset-0 bg-radial-glow animate-glow-pulse" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-fade-bottom" />
      <Embers />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 pb-28 pt-28 text-center">
        <div ref={logoRef} className="will-change-transform">
          <img
            src={logo.url}
            alt="Logo Imperial Romania"
            className="animate-hero-in animate-float mx-auto w-[min(80vw,520px)] drop-shadow-[0_0_40px_var(--color-primary)]"
          />
        </div>

        {SERVER_INFO.isOpen ? null : (
          <div className="animate-hero-in mt-6" style={{ "--delay": "200ms" } as React.CSSProperties}>
            <LaunchDate />
          </div>
        )}

        <p
          className="animate-hero-in mt-6 font-display text-xl tracking-[0.35em] text-primary-glow md:text-2xl"
          style={{ "--delay": "300ms" } as React.CSSProperties}
        >
          GTA V · FiveM Roleplay
        </p>
        <h1
          className="animate-hero-in mt-2 font-display text-5xl leading-none md:text-7xl"
          style={{ "--delay": "450ms" } as React.CSSProperties}
        >
          {SERVER_INFO.isOpen ? (
            <>
              Orașul e <span className="text-fire">deschis.</span>
            </>
          ) : (
            <>
              Lucrăm la oraș. <span className="text-fire">Vine curând.</span>
            </>
          )}
        </h1>
        <p
          className="animate-hero-in mt-5 max-w-xl text-lg text-foreground/75"
          style={{ "--delay": "600ms" } as React.CSSProperties}
        >
          Un server de RP făcut de băieți care chiar joacă RP. Fără pay to win, fără staff care
          abuzează. Intră pe Discord ca să prinzi lansarea și să-ți faci whitelist-ul din timp.
        </p>

        <div
          className="animate-hero-in mt-9 flex flex-col gap-4 sm:flex-row"
          style={{ "--delay": "750ms" } as React.CSSProperties}
        >
          {SERVER_INFO.isOpen ? (
            <Button variant="hero" size="xl" asChild>
              <a href={SERVER_INFO.fivemUrl}>
                <Play className="fill-current" /> Joacă acum
              </a>
            </Button>
          ) : (
            <Button variant="hero" size="xl" asChild>
              <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
                Intră pe Discord
              </a>
            </Button>
          )}
          <Button variant="glass" size="xl" asChild>
            {SERVER_INFO.isOpen ? (
              <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
                Intră pe Discord
              </a>
            ) : (
              <a href="#features">Vezi ce găsești</a>
            )}
          </Button>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Mai jos"
        className="absolute bottom-8 left-1/2 z-10 flex h-11 w-7 -translate-x-1/2 justify-center rounded-full border-2 border-primary/60 pt-2"
      >
        <span className="animate-scroll-dot h-2 w-1 rounded-full bg-primary" />
      </a>
    </section>
  );
}
