import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroSunset from "@/assets/hero-sunset.jpg";
import { SERVER_INFO } from "@/lib/server-info";
import { Embers } from "./Embers";

export function FinalCta() {
  return (
    <section className="relative px-4 pb-24 pt-10 md:px-6 md:pb-32">
      <div className="reveal grain relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-border px-6 py-20 text-center shadow-card md:py-28">
        <img
          src={heroSunset}
          alt=""
          aria-hidden
          loading="lazy"
          width={1672}
          height={941}
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-[2px]"
        />
        <div className="absolute inset-0 bg-background/65" />
        <div className="absolute inset-0 bg-fade-bottom" />
        <Embers count={12} />
        <div className="relative mx-auto max-w-3xl">
          <p className="font-display text-lg tracking-[0.35em] text-primary-glow">Comunitatea se strânge acum</p>
          <h2 className="mt-4 font-display text-5xl leading-[0.95] md:text-8xl">
            {SERVER_INFO.isOpen ? (
              <>
                Ne vedem <span className="text-vice">în oraș.</span>
              </>
            ) : (
              <>
                Vrei să fii aici <span className="text-vice">din prima zi?</span>
              </>
            )}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-foreground/80">
            {SERVER_INFO.isOpen
              ? "Serverul este deschis. Intră, fă-ți personajul și începe să-i scrii povestea."
              : "Hai pe Discord, ia-ți rolul și stai aproape de noi până la lansare. Restul îl facem împreună în oraș."}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            {SERVER_INFO.isOpen ? (
              <Button size="xl" variant="hero" asChild>
                <a href={SERVER_INFO.fivemUrl}>Conectează-te</a>
              </Button>
            ) : (
              <Button size="xl" variant="hero" asChild>
                <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
                  Intră pe Discord <ArrowUpRight />
                </a>
              </Button>
            )}
            <Button size="xl" variant="glass" asChild>
              <Link to="/regulament">
                <BookOpen /> Vezi regulamentul
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
