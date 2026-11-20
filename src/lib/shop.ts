import { Car, Crown, Gift, Sparkles, type LucideIcon } from "lucide-react";

export type ShopCategory = { title: string; text: string; icon: LucideIcon };

// Placeholder categories. Real items and prices come from the owner later.
export const SHOP_CATEGORIES: ShopCategory[] = [
  { title: "VIP", text: "Pachetele VIP și ce primești cu ele.", icon: Crown },
  { title: "Vehicule", text: "Mașini și motoare pe care nu le găsești la dealer.", icon: Car },
  { title: "Pachete", text: "Pachete de start și oferte la lansare.", icon: Gift },
  { title: "Personalizare", text: "Plăcuțe, haine și alte chestii doar pentru tine.", icon: Sparkles },
];
