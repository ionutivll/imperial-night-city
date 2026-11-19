import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/imperial-romania-logo.png.asset.json";
import { SERVER_INFO } from "@/lib/server-info";
import { cn } from "@/lib/utils";

type NavItem = { label: string; to: "/" | "/regulament" | "/wiki"; hash?: string };

const links: NavItem[] = [
  { label: "About", to: "/", hash: "about" },
  { label: "Regulament", to: "/regulament" },
  { label: "Wiki", to: "/wiki" },
];

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
          "mx-auto max-w-6xl rounded-full transition-all duration-500",
          scrolled || open ? "glass py-2 shadow-card" : "border border-transparent py-3",
          open && "rounded-3xl",
        )}
      >
        <nav className="flex items-center justify-between pl-4 pr-3 md:pl-6">
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <img
              src={logo.url}
              alt="Imperial Romania"
              className={cn("w-auto transition-all duration-500", scrolled ? "h-10" : "h-12")}
            />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  {...(l.hash ? { hash: l.hash } : {})}
                  className={cn(
                    "relative block rounded-full px-5 py-2 font-display text-lg tracking-wider transition-colors duration-300 hover:bg-foreground/5 hover:text-foreground",
                    isActive(l) ? "bg-foreground/10 text-foreground" : "text-foreground/70",
                  )}
                >
                  {l.label}
                  {isActive(l) ? (
                    <span className="absolute inset-x-5 -bottom-0.5 h-0.5 rounded-full bg-fire" />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Button variant="hero" size="lg" asChild>
              <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
                Intră pe Discord
              </a>
            </Button>
          </div>

          <button
            className="p-2 text-foreground md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
          >
            {open ? <X className="size-7" /> : <Menu className="size-7" />}
          </button>
        </nav>

        <div
          className={cn(
            "overflow-hidden transition-all duration-500 md:hidden",
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <ul className="flex flex-col gap-4 px-6 pb-6 pt-4">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  {...(l.hash ? { hash: l.hash } : {})}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "font-display text-3xl tracking-wider hover:text-primary",
                    isActive(l) ? "text-fire" : "text-foreground",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <Button variant="hero" size="lg" asChild>
              <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
                Intră pe Discord
              </a>
            </Button>
          </ul>
        </div>
      </div>
    </header>
  );
}
