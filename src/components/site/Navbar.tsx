import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/imperial-romania-logo.png.asset.json";
import { SERVER_INFO } from "@/lib/server-info";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#join", label: "How to Join" },
  { href: "#rules", label: "Rules" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-border bg-background/75 py-2 backdrop-blur-xl" : "py-5",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2">
          <img
            src={logo.url}
            alt="Imperial Romania"
            className={cn("w-auto transition-all duration-500", scrolled ? "h-10" : "h-14")}
          />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative font-display text-lg tracking-wider text-foreground/80 transition-colors hover:text-primary"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-fire transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button variant="hero" size="lg" asChild>
            <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
              Join Discord
            </a>
          </Button>
        </div>

        <button
          className="text-foreground md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
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
        <ul className="flex flex-col gap-4 border-t border-border bg-background/95 px-5 py-6 backdrop-blur-xl">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl tracking-wider text-foreground hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
          <Button variant="hero" size="lg" asChild>
            <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
              Join Discord
            </a>
          </Button>
        </ul>
      </div>
    </header>
  );
}
