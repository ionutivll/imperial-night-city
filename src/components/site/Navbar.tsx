import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import logo from "@/assets/imperial-romania-logo.png.asset.json";
import { SERVER_INFO } from "@/lib/server-info";
import { cn } from "@/lib/utils";
import { SideMenu } from "./SideMenu";

type NavItem = { label: string; to: "/" | "/regulament"; hash?: string };

const links: NavItem[] = [
  { label: "About", to: "/", hash: "about" },
  { label: "Regulament", to: "/regulament" },
];

/** Two-line "burger" that opens the side menu. */
function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Deschide meniul"
      className="group flex h-11 items-center gap-3 rounded-xl border border-border bg-foreground/[0.04] pl-3.5 pr-3.5 transition-colors duration-300 hover:border-primary/50 md:pr-5"
    >
      <span className="flex w-5 flex-col gap-[5px]">
        <span className="h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 group-hover:w-3" />
        <span className="h-0.5 w-3 rounded-full bg-vice transition-all duration-300 group-hover:w-5" />
      </span>
      <span className="hidden font-display text-lg tracking-widest md:inline">Meniu</span>
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (l: NavItem) => !l.hash && pathname.startsWith(l.to);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5">
      <div
        className={cn(
          "mx-auto max-w-6xl rounded-2xl border border-transparent transition-all duration-500",
          scrolled ? "glass-bar py-2" : "py-3",
        )}
      >
        <nav className="flex items-center justify-between gap-3 px-2 md:px-3">
          <div className="flex items-center gap-3">
            <MenuButton onClick={() => setOpen(true)} />
            <Link to="/" className="flex items-center">
              <img
                src={logo.url}
                alt="Imperial Romania"
                className={cn("w-auto transition-all duration-500", scrolled ? "h-10" : "h-12")}
              />
            </Link>
          </div>

          <ul className="hidden items-center gap-2 md:flex">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  {...(l.hash ? { hash: l.hash } : {})}
                  className={cn(
                    "relative block px-4 py-1.5 font-display text-lg tracking-[0.12em] transition-colors duration-300 hover:text-primary",
                    isActive(l) ? "text-primary" : "text-foreground/75",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <Button variant="hero" size="lg" className="h-11 px-5 md:px-7" asChild>
            <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
              <span className="sm:hidden">Discord</span>
              <span className="hidden sm:inline">Intră pe Discord</span>
            </a>
          </Button>
        </nav>
      </div>
      <SideMenu open={open} onOpenChange={setOpen} />
    </header>
  );
}
