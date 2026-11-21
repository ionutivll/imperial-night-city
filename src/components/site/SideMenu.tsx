import { useEffect, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, ChevronDown, Home, Info, Library, ShoppingBag, X, type LucideIcon } from "lucide-react";
import logo from "@/assets/imperial-romania-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { RULE_SECTIONS } from "@/lib/rules";
import { SERVER_INFO } from "@/lib/server-info";
import { WIKI_CATEGORIES } from "@/lib/wiki";
import { cn } from "@/lib/utils";

type Group = "wiki" | "regulament" | null;

const rowCls =
  "group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left font-display text-2xl tracking-wide transition-all duration-300 hover:bg-foreground/[0.07]";

function RowIcon({ icon: Icon, active }: { icon: LucideIcon; active?: boolean }) {
  return (
    <span
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-xl transition-all duration-300 group-hover:scale-105",
        active ? "bg-primary text-primary-foreground" : "border border-border bg-foreground/[0.04] text-foreground/85",
      )}
    >
      <Icon className="size-5" />
    </span>
  );
}

function Soon() {
  return (
    <span className="ml-auto shrink-0 rounded-full bg-foreground/[0.07] px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
      curând
    </span>
  );
}

function Stagger({ i, children }: { i: number; children: ReactNode }) {
  return (
    <li
      className="animate-in fade-in slide-in-from-left-6 fill-mode-both duration-500"
      style={{ animationDelay: `${120 + i * 55}ms` }}
    >
      {children}
    </li>
  );
}

const subCls = (active: boolean) =>
  cn(
    "relative flex items-center gap-2.5 rounded-xl py-2 pl-4 pr-3 text-[15px] font-medium transition-colors duration-200 hover:bg-foreground/[0.06] hover:text-foreground",
    active ? "bg-foreground/[0.08] text-foreground" : "text-foreground/65",
  );

function ActiveBar({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "absolute -left-px top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full transition-all duration-300",
        active ? "bg-vice opacity-100" : "opacity-0",
      )}
    />
  );
}

/** Slide-in frosted menu with Wiki, Regulament (expands into sections) and Shop. */
export function SideMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [group, setGroup] = useState<Group>(null);

  useEffect(() => {
    if (!open) return;
    setGroup(pathname.startsWith("/regulament") ? "regulament" : pathname.startsWith("/wiki") ? "wiki" : null);
  }, [open, pathname]);

  const close = () => onOpenChange(false);
  const toggle = (g: Exclude<Group, null>) => setGroup((cur) => (cur === g ? null : g));
  const path = pathname.replace(/\/$/, "") || "/";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-background/70 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          className={cn(
            "glass-bar fixed inset-y-3 left-3 z-[70] flex w-[min(calc(100vw-1.5rem),380px)] flex-col rounded-2xl outline-none",
            "data-[state=open]:animate-in data-[state=open]:slide-in-from-left-10 data-[state=open]:fade-in-0 data-[state=open]:duration-500",
            "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left-10 data-[state=closed]:fade-out-0 data-[state=closed]:duration-300",
          )}
        >

          <div className="relative flex items-center justify-between px-5 pb-2 pt-5">
            <Link to="/" onClick={close} className="flex items-center">
              <img src={logo.url} alt="Imperial Romania" className="h-12 w-auto" />
            </Link>
            <Dialog.Close
              className="grid size-10 place-items-center rounded-xl border border-border bg-foreground/[0.04] text-foreground/80 transition-transform duration-300 hover:rotate-90 hover:text-foreground"
              aria-label="Închide meniul"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Meniu</Dialog.Title>
          <Dialog.Description className="sr-only">Wiki, regulament și shop</Dialog.Description>

          <nav className="relative flex-1 overflow-y-auto px-3 py-3">
            <ul className="space-y-1">
              <Stagger i={0}>
                <Link to="/" onClick={close} className={rowCls}>
                  <RowIcon icon={Home} active={path === "/"} /> Acasă
                </Link>
              </Stagger>
              <Stagger i={1}>
                <Link to="/" hash="about" onClick={close} className={rowCls}>
                  <RowIcon icon={Info} /> About
                </Link>
              </Stagger>

              <Stagger i={2}>
                <button type="button" onClick={() => toggle("wiki")} aria-expanded={group === "wiki"} className={rowCls}>
                  <RowIcon icon={Library} active={path.startsWith("/wiki")} /> Wiki
                  <ChevronDown className={cn("ml-auto size-5 text-muted-foreground transition-transform duration-300", group === "wiki" && "rotate-180")} />
                </button>
                <div className="expand" data-open={group === "wiki"}>
                  <div>
                    <div className="mb-2 ml-8 mt-1 space-y-0.5 border-l border-border pl-1">
                      <Link to="/wiki" onClick={close} className={subCls(path === "/wiki")}>
                        <ActiveBar active={path === "/wiki"} />
                        Toate categoriile
                      </Link>
                      {WIKI_CATEGORIES.filter((c) => c.slug !== "regulament").map((c) => (
                        <Link
                          key={c.slug}
                          to="/wiki/$slug"
                          params={{ slug: c.slug }}
                          onClick={close}
                          className={subCls(path === `/wiki/${c.slug}`)}
                        >
                          <ActiveBar active={path === `/wiki/${c.slug}`} />
                          <c.icon className="size-4 shrink-0 opacity-70" />
                          <span className="truncate">{c.title}</span>
                          {c.status === "soon" ? <Soon /> : null}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </Stagger>

              <Stagger i={3}>
                <button
                  type="button"
                  onClick={() => toggle("regulament")}
                  aria-expanded={group === "regulament"}
                  className={rowCls}
                >
                  <RowIcon icon={BookOpen} active={path.startsWith("/regulament")} /> Regulament
                  <ChevronDown
                    className={cn("ml-auto size-5 text-muted-foreground transition-transform duration-300", group === "regulament" && "rotate-180")}
                  />
                </button>
                <div className="expand" data-open={group === "regulament"}>
                  <div>
                    <div className="mb-2 ml-8 mt-1 space-y-0.5 border-l border-border pl-1">
                      <Link to="/regulament" onClick={close} className={subCls(path === "/regulament")}>
                        <ActiveBar active={path === "/regulament"} />
                        Prezentare
                      </Link>
                      {RULE_SECTIONS.map((s) => (
                        <Link
                          key={s.slug}
                          to="/regulament/$sectiune"
                          params={{ sectiune: s.slug }}
                          onClick={close}
                          className={subCls(path === `/regulament/${s.slug}`)}
                        >
                          <ActiveBar active={path === `/regulament/${s.slug}`} />
                          <s.icon className="size-4 shrink-0 opacity-70" />
                          <span className="truncate">{s.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </Stagger>

              <Stagger i={4}>
                <Link to="/shop" onClick={close} className={rowCls}>
                  <RowIcon icon={ShoppingBag} active={path === "/shop"} /> Shop
                  <Soon />
                </Link>
              </Stagger>
            </ul>
          </nav>

          <div className="relative space-y-3 border-t border-border p-5">
            <p className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Lansare oficială</span>
              <span className="font-display text-xl tracking-widest">
                <span className="text-vice">??</span>.12.2026
              </span>
            </p>
            <Button variant="hero" size="lg" className="w-full" asChild>
              <a href={SERVER_INFO.discordUrl} target="_blank" rel="noreferrer">
                Intră pe Discord
              </a>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
