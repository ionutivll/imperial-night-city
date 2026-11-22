import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVER_INFO } from "@/lib/server-info";
import { cn } from "@/lib/utils";

const chapters = [
  {
    eyebrow: "Primul teaser",
    title: "Ceva se pregătește.",
    text: "Palmieri, apus și un oraș care abia așteaptă să prindă viață.",
  },
  {
    eyebrow: "Povestea ta",
    title: "Aici poți fi cine vrei.",
    text: "Legal sau ilegal, de la zero sau cu un plan mare. Alegerea e a ta.",
  },
  {
    eyebrow: "Ne vedem în oraș",
    title: "??.12.2026",
    text: "Până atunci, hai pe Discord și prinde toate noutățile de la lansare.",
  },
];

export function ScrollTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let activeChapter = 0;
    video.pause();

    const render = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));

      if (video.readyState >= 1 && Number.isFinite(video.duration)) {
        const time = progress * Math.max(0, video.duration - 0.08);
        if (Math.abs(video.currentTime - time) > 0.025) video.currentTime = time;
      }
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;

      const nextChapter = progress < 0.32 ? 0 : progress < 0.7 ? 1 : 2;
      if (nextChapter !== activeChapter) {
        activeChapter = nextChapter;
        setChapter(nextChapter);
      }
    };

    const requestRender = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    const onLoaded = () => {
      setReady(true);
      requestRender();
    };

    if (video.readyState >= 1) onLoaded();
    video.addEventListener("loadedmetadata", onLoaded);
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    render();

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} id="teaser" className="teaser-scroll relative h-[340svh] bg-background" aria-label="Teaser Imperial Romania">
      <div className="teaser-sticky sticky top-0 h-[100svh] min-h-[560px] overflow-hidden">
        <video
          ref={videoRef}
          className={cn("teaser-video absolute inset-0 h-full w-full object-cover transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")}
          muted
          playsInline
          preload="auto"
          poster="/media/imperial-teaser-poster.jpg"
          aria-label="Teaser cu palmieri la apus și personaje Imperial Romania"
        >
          <source src="/media/imperial-teaser.mp4" type="video/mp4" />
        </video>
        <img
          src="/media/imperial-teaser-poster.jpg"
          alt="Teaser Imperial Romania la apus"
          className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-700", ready ? "opacity-0" : "opacity-100")}
        />

        <div className="pointer-events-none absolute inset-0 bg-primary/20 mix-blend-color" />
        <div className="pointer-events-none absolute inset-0 bg-background/25" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/90 via-background/20 to-background/35" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/25 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/80 to-transparent" />

        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col px-5 pb-10 pt-28 md:px-10 md:pb-12">
          <div className="flex items-center justify-between gap-4 border-b border-foreground/15 pb-4">
            <p className="font-display text-lg tracking-[0.28em] text-foreground">Imperial Romania</p>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/65">
              <span className="size-1.5 rounded-full bg-primary" /> Teaser oficial · 00:11
            </p>
          </div>

          <div className="relative flex-1">
            {chapters.map((item, index) => (
              <div
                key={item.eyebrow}
                aria-hidden={chapter !== index}
                className={cn(
                  "absolute inset-x-0 bottom-16 max-w-3xl transition-all duration-700 ease-out md:bottom-10",
                  chapter === index ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0",
                )}
              >
                <p className="eyebrow">0{index + 1} / {item.eyebrow}</p>
                <h2 className={cn("mt-3 font-display leading-[0.88] tracking-wide", index === 2 ? "text-7xl text-primary md:text-9xl" : "text-6xl md:text-8xl")}>
                  {item.title}
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-foreground/80 md:text-xl">{item.text}</p>
                {index === 2 ? (
                  <Button variant="hero" size="xl" className="mt-7" asChild>
                    <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer" tabIndex={chapter === 2 ? 0 : -1}>
                      Intră pe Discord <ArrowUpRight />
                    </a>
                  </Button>
                ) : null}
              </div>
            ))}
          </div>

          <div className="flex items-end justify-between gap-5">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60">
              <ArrowDown className="size-4 text-primary" /> Derulează teaserul
            </div>
            <div className="flex items-center gap-2" aria-label={`Scena ${chapter + 1} din 3`}>
              {chapters.map((item, index) => (
                <span key={item.eyebrow} className={cn("h-1 rounded-full transition-all duration-500", chapter === index ? "w-10 bg-primary" : "w-4 bg-foreground/25")} />
              ))}
            </div>
          </div>
          <div className="absolute inset-x-5 bottom-0 h-0.5 overflow-hidden bg-foreground/10 md:inset-x-10">
            <div ref={progressRef} className="h-full origin-left scale-x-0 bg-primary will-change-transform" />
          </div>
        </div>
      </div>
    </section>
  );
}
