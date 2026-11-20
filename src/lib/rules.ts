import { Car, Gavel, Landmark, MessagesSquare, ShieldCheck, ShieldHalf, Siren, Skull, type LucideIcon } from "lucide-react";

export type Rule = { title: string; text: string };

export type RuleSection = {
  slug: string;
  title: string;
  short: string;
  icon: LucideIcon;
  /** Situations this section will cover. Shown as placeholders until the text arrives. */
  topics: string[];
  /** Final text from the staff. Empty = section still being written. */
  rules: Rule[];
};

// Structure only. The staff sends the final regulament text later; fill `rules` then.
export const RULE_SECTIONS: RuleSection[] = [
  {
    slug: "general",
    title: "Regulament General",
    short: "Ce se aplică la toată lumea, oriunde pe server.",
    icon: ShieldCheck,
    topics: ["Comportament pe server", "Limbaj și respect", "Nume și caracter", "Bug-uri și exploit-uri", "Programe interzise"],
    rules: [],
  },
  {
    slug: "termeni-rp",
    title: "Termeni RP",
    short: "RDM, VDM, MG, PG și restul. Ce înseamnă și de ce iei ban.",
    icon: MessagesSquare,
    topics: ["RDM / VDM", "Metagaming", "Powergaming", "Fear RP", "New Life Rule", "Combat logging"],
    rules: [],
  },
  {
    slug: "jafuri",
    title: "Regulament Jafuri",
    short: "Magazine, bijuterii, bănci. Când, cum și cu câți.",
    icon: Landmark,
    topics: ["Jaf la magazin", "Jaf la bijuterie", "Jaf la bancă", "Minim de polițiști", "Ostatici și negocieri", "Urmărirea de după"],
    rules: [],
  },
  {
    slug: "mafii",
    title: "Mafii & Găști",
    short: "Teritorii, războaie, droguri și tot ce ține de ilegal.",
    icon: Skull,
    topics: ["Cum îți faci o mafie", "Teritorii și războaie", "Droguri și arme", "Răpiri", "Limită de membri"],
    rules: [],
  },
  {
    slug: "politie-smurd",
    title: "Poliție & SMURD",
    short: "Reguli pentru facțiunile legale și pentru cine are treabă cu ele.",
    icon: Siren,
    topics: ["Aplicări și grade", "Arestări și amenzi", "Urmăriri", "Corupție", "Reguli SMURD"],
    rules: [],
  },
  {
    slug: "zone-safe",
    title: "Zone safe",
    short: "Unde nu ai voie să faci scandal, punct.",
    icon: ShieldHalf,
    topics: ["Spital", "Secția de poliție", "Garaje publice", "Locuri de spawn"],
    rules: [],
  },
  {
    slug: "vehicule",
    title: "Vehicule & Curse",
    short: "Condus, curse ilegale, furturi de mașini.",
    icon: Car,
    topics: ["Condus realist", "Curse ilegale", "Furt de mașini", "Vehicule de facțiune"],
    rules: [],
  },
  {
    slug: "sanctiuni",
    title: "Staff & Sancțiuni",
    short: "Cum faci report, ce pățești și cum contești.",
    icon: Gavel,
    topics: ["Cum faci un report", "Warn, kick, ban", "Contestații", "Ticket pe Discord"],
    rules: [],
  },
];


export const getRuleSection = (slug: string) => RULE_SECTIONS.find((s) => s.slug === slug);
