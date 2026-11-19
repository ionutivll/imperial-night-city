import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import heroSunset from "@/assets/hero-sunset.jpg";
import { SERVER_INFO } from "@/lib/server-info";
import { Embers } from "./Embers";

export function FinalCta() {
  return (
    <section className="relative px-5 pb-28">
      <div className="reveal grain relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border px-8 py-20 text-center shadow-card">
        <img
          src={heroSunset}
          alt=""
          aria-hidden
          loading="lazy"
          width={1672}
          height={941}
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-lg"
        />
        <div className="absolute inset-0 bg-background/65" />
        <Embers count={12} />
        <div className="relative">
          <h2 className="font-display text-5xl leading-none md:text-8xl">
            {SERVER_INFO.isOpen ? (
              <>
                Ne vedem <span className="text-fire">în oraș.</span>
              </>
            ) : (
              <>
                Nu rata <span className="text-fire">lansarea.</span>
              </>
            )}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-foreground/80">
            {SERVER_INFO.isOpen
              ? "Serverul e deschis. Intră, fă-ți caracterul și scrie-ți povestea."
              : "Deschidem în decembrie. Intră pe Discord, ia-ți rolul și te anunțăm noi exact când. Ne vedem în oraș."}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            {SERVER_INFO.isOpen ? (
              <Button size="xl" variant="hero" asChild>
                <a href={SERVER_INFO.fivemUrl}>Conectează-te</a>
              </Button>
            ) : (
              <Button size="xl" variant="hero" asChild>
                <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
                  Intră pe Discord
                </a>
              </Button>
            )}
            <Button size="xl" variant="glass" asChild>
              <Link to="/wiki">Vezi wiki-ul</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
