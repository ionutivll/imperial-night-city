import { BookOpen, Briefcase, Car, Footprints, HelpCircle, Home, Keyboard, Siren, Skull, Store, type LucideIcon } from "lucide-react";

export type WikiCategory = {
  title: string;
  text: string;
  icon: LucideIcon;
  /** "writing" = being written right now, "soon" = planned */
  status: "ready" | "writing" | "soon";
  to?: "/regulament";
};

export const WIKI_CATEGORIES: WikiCategory[] = [
  { title: "Regulament", text: "Tot ce ai voie și n-ai voie pe server. Citește-l înainte să intri.", icon: BookOpen, status: "writing", to: "/regulament" },
  { title: "Primii pași", text: "Ce faci după ce intri prima oară în oraș. Bani, job, telefon.", icon: Footprints, status: "soon" },
  { title: "Joburi", text: "Toate joburile legale, cât plătesc și cum te angajezi.", icon: Briefcase, status: "soon" },
  { title: "Poliție & SMURD", text: "Cum aplici, ce grade sunt și cum merge treaba la factiuni.", icon: Siren, status: "soon" },
  { title: "Mafii & Găști", text: "Teritorii, droguri, jafuri și regulile pentru ilegal.", icon: Skull, status: "soon" },
  { title: "Afaceri", text: "Cum îți deschizi o afacere și cum o ții pe profit.", icon: Store, status: "soon" },
  { title: "Mașini", text: "Dealer, tuning, asigurare și ce faci dacă ți-o fură cineva.", icon: Car, status: "soon" },
  { title: "Case", text: "Cumperi, închiriezi, mobilezi. Tot aici.", icon: Home, status: "soon" },
  { title: "Comenzi & taste", text: "Toate tastele și comenzile utile din joc.", icon: Keyboard, status: "soon" },
  { title: "Întrebări frecvente", text: "Ce ne întreabă lumea cel mai des pe Discord.", icon: HelpCircle, status: "soon" },
];
