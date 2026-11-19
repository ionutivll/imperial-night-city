import type { ReactNode } from "react";
import heroSunset from "@/assets/hero-sunset.jpg";

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden pb-16 pt-40 md:pt-48">
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_45%,transparent)]">
        <img
          src={heroSunset}
          alt=""
          aria-hidden
          width={1672}
          height={941}
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-md"
        />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0 bg-fade-top" />
      </div>
      <div className="relative mx-auto max-w-5xl px-5 text-center">
        <p className="animate-hero-in font-display text-xl tracking-[0.35em] text-primary-glow">
          {eyebrow}
        </p>
        <h1
          className="animate-hero-in mt-3 font-display text-6xl leading-none md:text-8xl"
          style={{ "--delay": "120ms" } as React.CSSProperties}
        >
          {title}
        </h1>
        {children ? (
          <div
            className="animate-hero-in mt-5"
            style={{ "--delay": "240ms" } as React.CSSProperties}
          >
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}
