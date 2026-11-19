import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 24, suffix: "/7", label: "Online după lansare" },
  { value: 150, suffix: "+", label: "Scripturi custom" },
  { value: 40, suffix: "+", label: "Joburi legale și ilegale" },
  { value: 300, suffix: "+", label: "Mașini custom" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1800;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-28">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="reveal font-display text-xl tracking-[0.3em] text-primary">Despre noi</p>
          <h2 className="reveal mt-3 font-display text-5xl leading-[0.95] md:text-7xl" style={{ "--delay": "100ms" } as React.CSSProperties}>
            Nu e încă un server <br />
            <span className="text-fire">copy-paste.</span>
          </h2>
          <p className="reveal mt-6 text-lg leading-relaxed text-muted-foreground" style={{ "--delay": "200ms" } as React.CSSProperties}>
            Am jucat pe o grămadă de servere românești și ne-am săturat de aceleași scripturi luate
            de pe net, de staff care te banează că i-ai zis ceva și de economii stricate din prima
            săptămână. Așa că ne facem noi serverul, cum ni l-am fi dorit. Lucrăm la el de ceva
            vreme și mai e puțin.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="reveal border-fire group rounded-2xl bg-card p-7 shadow-card transition-transform duration-500 hover:-translate-y-2"
              style={{ "--delay": `${i * 120}ms` } as React.CSSProperties}
            >
              <div className="font-display text-6xl text-fire">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
