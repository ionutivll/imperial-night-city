import type { ReactNode } from "react";
import logo from "@/assets/imperial-romania-logo.png.asset.json";
import { useRouterState } from "@tanstack/react-router";
import { useGlassLight } from "@/hooks/use-glass-light";
import { useReveal } from "@/hooks/use-reveal";
import { Navbar } from "./Navbar";

/** Shared page frame: blurred sunset background, top menu, footer, scroll-reveal. */
export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useReveal(pathname);
  useGlassLight();
  return (
    <main className="relative isolate min-h-screen overflow-x-clip">
      <div className="aurora" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <Navbar />
      {children}
      <footer className="mx-auto flex max-w-7xl flex-col items-center gap-4 border-t border-border px-5 py-10 text-center md:flex-row md:justify-between md:text-left">
        <img src={logo.url} alt="Imperial Romania" className="h-16 w-auto" loading="lazy" />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Imperial Romania. Nu avem legătură cu Rockstar Games sau Take-Two Interactive.
        </p>
      </footer>
    </main>
  );
}
