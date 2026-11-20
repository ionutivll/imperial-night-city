import { BookOpen, Briefcase, Car, Footprints, HelpCircle, Home, Keyboard, Siren, Skull, Store, type LucideIcon } from "lucide-react";

export type WikiCategory = {
  slug: string;
  title: string;
  text: string;
  icon: LucideIcon;
  /** "writing" = being written right now, "soon" = planned */
  status: "ready" | "writing" | "soon";
};

// "regulament" opens /regulament; every other slug opens /wiki/$slug.
export const WIKI_CATEGORIES: WikiCategory[] = [
  { slug: "regulament", title: "Regulament", text: "Tot ce ai voie și n-ai voie pe server. Citește-l înainte să intri.", icon: BookOpen, status: "writing" },
  { slug: "primii-pasi", title: "Primii pași", text: "Ce faci după ce intri prima oară în oraș. Bani, job, telefon.", icon: Footprints, status: "soon" },
  { slug: "joburi", title: "Joburi", text: "Toate joburile legale, cât plătesc și cum te angajezi.", icon: Briefcase, status: "soon" },
  { slug: "politie-smurd", title: "Poliție & SMURD", text: "Cum aplici, ce grade sunt și cum merge treaba la facțiuni.", icon: Siren, status: "soon" },
  { slug: "mafii", title: "Mafii & Găști", text: "Teritorii, droguri, jafuri și cum merge ilegalul.", icon: Skull, status: "soon" },
  { slug: "afaceri", title: "Afaceri", text: "Cum îți deschizi o afacere și cum o ții pe profit.", icon: Store, status: "soon" },
  { slug: "masini", title: "Mașini", text: "Dealer, tuning, asigurare și ce faci dacă ți-o fură cineva.", icon: Car, status: "soon" },
  { slug: "case", title: "Case", text: "Cumperi, închiriezi, mobilezi. Tot aici.", icon: Home, status: "soon" },
  { slug: "comenzi", title: "Comenzi & taste", text: "Toate tastele și comenzile utile din joc.", icon: Keyboard, status: "soon" },
  { slug: "faq", title: "Întrebări frecvente", text: "Ce ne întreabă lumea cel mai des pe Discord.", icon: HelpCircle, status: "soon" },
];

export const getWikiCategory = (slug: string) => WIKI_CATEGORIES.find((c) => c.slug === slug);
