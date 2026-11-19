import { Button } from "@/components/ui/button";
import logo from "@/assets/imperial-romania-logo.png.asset.json";
import { SERVER_INFO } from "@/lib/server-info";
import { Embers } from "./Embers";

export function FinalCta() {
  return (
    <section className="relative px-5 pb-28">
      <div className="reveal grain relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-fire px-8 py-20 text-center shadow-glow">
        <Embers count={14} />
        <div className="absolute inset-0 bg-background/10" />
        <div className="relative">
          <h2 className="font-display text-5xl leading-none text-primary-foreground md:text-8xl">
            {SERVER_INFO.isOpen ? "Ne vedem în oraș." : "Nu rata lansarea."}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg font-medium text-primary-foreground/80">
            {SERVER_INFO.isOpen
              ? "Serverul e deschis. Intră, fă-ți caracterul și scrie-ți povestea."
              : "Deschidem în decembrie. Intră pe Discord, ia-ți rolul și te anunțăm noi exact când. Ne vedem în oraș."}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            {SERVER_INFO.isOpen ? (
              <Button size="xl" variant="inverse" asChild>
                <a href={SERVER_INFO.fivemUrl}>Conectează-te</a>
              </Button>
            ) : (
              <Button size="xl" variant="inverse" asChild>
                <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
                  Intră pe Discord
                </a>
              </Button>
            )}
            <Button size="xl" variant="inverseOutline" asChild>
              {SERVER_INFO.isOpen ? (
                <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
                  Discord
                </a>
              ) : (
                <a href="#rules">Vezi regulile</a>
              )}
            </Button>
          </div>
        </div>
      </div>

      <footer className="mx-auto mt-20 flex max-w-7xl flex-col items-center gap-4 border-t border-border pt-10 text-center md:flex-row md:justify-between md:text-left">
        <img src={logo.url} alt="Imperial Romania" className="h-16 w-auto" loading="lazy" />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Imperial Romania. Nu avem legătură cu Rockstar Games sau Take-Two Interactive.
        </p>
      </footer>
    </section>
  );
}
