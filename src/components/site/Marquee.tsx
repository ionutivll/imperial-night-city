const words = ["Roleplay", "Police", "EMS", "Mafia", "Business", "Custom Cars", "Housing", "Racing", "Economy", "Events"];

export function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="relative -rotate-1 overflow-hidden border-y border-primary/30 bg-fire py-4 shadow-glow">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-3xl tracking-wider text-primary-foreground">
            {w}
            <span className="text-primary-foreground/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
