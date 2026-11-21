const words = ["Roleplay", "Poliție", "SMURD", "Mafie", "Afaceri", "Mașini custom", "Case", "Curse", "Economie", "Evenimente"];

export function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-border bg-card/25 py-5">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((word, index) => (
          <span key={`${word}-${index}`} className="flex items-center gap-10 font-display text-2xl tracking-[0.12em] text-foreground/60 md:text-3xl">
            {word}
            <span className="text-vice">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
