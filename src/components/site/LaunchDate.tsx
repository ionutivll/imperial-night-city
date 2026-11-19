import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Teaser only: the exact launch day stays hidden ("??"), month and year are public.
const MONTH = "12";
const YEAR = "2026";

function Tile({ char, secret, glitching }: { char: string; secret?: boolean; glitching?: boolean }) {
  return (
    <span
      className={cn(
        "border-fire relative grid h-14 w-10 place-items-center overflow-hidden rounded-lg bg-card/80 font-display text-4xl backdrop-blur-md md:h-16 md:w-12 md:text-5xl",
        secret ? "text-fire shadow-glow" : "text-foreground",
        glitching && "animate-glitch",
      )}
    >
      <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-background/60" />
      {char}
    </span>
  );
}

function Dot() {
  return <span className="mx-0.5 self-end pb-2 font-display text-4xl text-primary md:text-5xl">.</span>;
}

export function LaunchDate({ className }: { className?: string }) {
  const [day, setDay] = useState(["?", "?"]);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    let flicker: ReturnType<typeof setInterval> | undefined;
    let stop: ReturnType<typeof setTimeout> | undefined;
    const burst = () => {
      setGlitching(true);
      flicker = setInterval(() => {
        setDay([String(Math.floor(Math.random() * 4)), String(Math.floor(Math.random() * 10))]);
      }, 60);
      stop = setTimeout(() => {
        clearInterval(flicker);
        setDay(["?", "?"]);
        setGlitching(false);
      }, 700);
    };
    const first = setTimeout(burst, 1600);
    const loop = setInterval(burst, 3800);
    return () => {
      clearTimeout(first);
      clearInterval(loop);
      clearInterval(flicker);
      clearTimeout(stop);
    };
  }, []);

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary-glow">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-primary" />
        </span>
        Lansare oficială
      </span>
      <div className="flex items-center gap-1.5" aria-label={`Lansare: ziua secretă, luna ${MONTH}, ${YEAR}`}>
        <Tile char={day[0]!} secret glitching={glitching} />
        <Tile char={day[1]!} secret glitching={glitching} />
        <Dot />
        {MONTH.split("").map((c, i) => (
          <Tile key={`m${i}`} char={c} />
        ))}
        <Dot />
        {YEAR.split("").map((c, i) => (
          <Tile key={`y${i}`} char={c} />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">Ziua exactă? O aflați pe Discord.</span>
    </div>
  );
}
