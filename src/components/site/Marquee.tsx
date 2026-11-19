const words = ["Roleplay", "Poliție", "SMURD", "Mafie", "Afaceri", "Mașini custom", "Case", "Curse", "Economie", "Evenimente"];

export function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="glass relative -rotate-1 overflow-hidden border-x-0 py-4">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-3xl tracking-wider text-foreground/85">
            {w}
            <span className="text-fire">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
