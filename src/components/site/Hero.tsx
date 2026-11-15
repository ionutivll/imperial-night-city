import { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCity from "@/assets/hero-city.jpg";
import logo from "@/assets/imperial-romania-logo.png.asset.json";
import { SERVER_INFO } from "@/lib/server-info";
import { Embers } from "./Embers";

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
          alt="Night city skyline glowing orange"
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-background/45" />
      <div className="absolute inset-0 bg-radial-glow animate-glow-pulse" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-fade-bottom" />
      <Embers />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 pt-24 text-center">
        <div ref={logoRef} className="will-change-transform">
          <img
            src={logo.url}
            alt="Imperial Romania logo"
            className="animate-hero-in animate-float mx-auto w-[min(88vw,620px)] drop-shadow-[0_0_40px_var(--color-primary)]"
          />
        </div>

        <p
          className="animate-hero-in mt-4 font-display text-2xl tracking-[0.35em] text-primary-glow md:text-3xl"
          style={{ "--delay": "300ms" } as React.CSSProperties}
        >
          GTA V · FiveM Roleplay
        </p>
        <h1
          className="animate-hero-in mt-3 font-display text-5xl leading-none md:text-7xl"
          style={{ "--delay": "450ms" } as React.CSSProperties}
        >
          Your story. <span className="text-fire">Your empire.</span>
        </h1>
        <p
          className="animate-hero-in mt-5 max-w-xl text-lg text-foreground/75"
          style={{ "--delay": "600ms" } as React.CSSProperties}
        >
          Romania's most immersive roleplay city. Build a business, wear the badge, or rule the
          streets — every choice writes history.
        </p>

        <div
          className="animate-hero-in mt-9 flex flex-col gap-4 sm:flex-row"
          style={{ "--delay": "750ms" } as React.CSSProperties}
        >
          <Button variant="hero" size="xl" asChild>
            <a href={SERVER_INFO.fivemUrl}>
              <Play className="fill-current" /> Play Now
            </a>
          </Button>
          <Button variant="glass" size="xl" asChild>
            <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
              Join the Discord
            </a>
          </Button>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 z-10 flex h-11 w-7 -translate-x-1/2 justify-center rounded-full border-2 border-primary/60 pt-2"
      >
        <span className="animate-scroll-dot h-2 w-1 rounded-full bg-primary" />
      </a>
    </section>
  );
}
