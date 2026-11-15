import { useEffect, useState } from "react";

type Ember = { left: number; size: number; duration: number; delay: number; drift: number };

/** Floating sparks rising through the hero. Generated after mount to avoid hydration mismatch. */
export function Embers({ count = 28 }: { count?: number }) {
  const [embers, setEmbers] = useState<Ember[]>([]);
  useEffect(() => {
    setEmbers(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * -18,
        drift: -60 + Math.random() * 120,
      })),
    );
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {embers.map((e, i) => (
        <span
          key={i}
          className="ember"
          style={
            {
              left: `${e.left}%`,
              width: e.size,
              height: e.size,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
              "--drift": `${e.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
