export type ControlGroup = "De bază" | "Vehicul" | "FiveM & RP";

export type Control = {
  keys: string[];
  action: string;
  text: string;
  group: ControlGroup;
};

// Standard GTA V / FiveM controls plus the usual server binds. Final binds can change before launch.
export const CONTROLS: Control[] = [
  { keys: ["W", "A", "S", "D"], action: "Mișcare", text: "Deplasezi personajul în orice direcție.", group: "De bază" },
  { keys: ["Shift"], action: "Alergare", text: "Ține apăsat ca personajul să alerge.", group: "De bază" },
  { keys: ["Space"], action: "Salt", text: "Sari sau treci peste obstacole mici.", group: "De bază" },
  { keys: ["Ctrl"], action: "Furișare", text: "Te miști mai încet și mai puțin vizibil.", group: "De bază" },
  { keys: ["Q"], action: "Acoperire", text: "Te adăpostești lângă un perete sau un obiect.", group: "De bază" },
  { keys: ["V"], action: "Cameră", text: "Schimbi unghiul camerei sau perspectiva.", group: "De bază" },
  { keys: ["F"], action: "Intrare / ieșire", text: "Intri în vehicul sau cobori din el.", group: "Vehicul" },
  { keys: ["U"], action: "Încui vehiculul", text: "Încui sau descui vehiculul personal.", group: "Vehicul" },
  { keys: ["H"], action: "Faruri", text: "Aprinzi sau stingi farurile vehiculului.", group: "Vehicul" },
  { keys: ["Space"], action: "Frână de mână", text: "Folosești frâna de mână în timpul condusului.", group: "Vehicul" },
  { keys: ["F1"], action: "Meniul serverului", text: "Deschizi meniul principal și opțiunile rapide.", group: "FiveM & RP" },
  { keys: ["K"], action: "Telefon", text: "Deschizi telefonul personajului.", group: "FiveM & RP" },
  { keys: ["T"], action: "Chat", text: "Deschizi chat-ul și scrii o comandă sau un mesaj.", group: "FiveM & RP" },
  { keys: ["F8"], action: "Consolă FiveM", text: "Deschizi consola clientului FiveM.", group: "FiveM & RP" },
  { keys: ["Esc"], action: "Pauză", text: "Deschizi harta și meniul de setări.", group: "FiveM & RP" },
];

export const RP_COMMANDS = [
  { command: "/me", text: "Descrii o acțiune făcută de personaj.", example: "/me își scoate legitimația" },
  { command: "/do", text: "Descrii o situație sau rezultatul unei acțiuni.", example: "/do Ușa este încuiată?" },
  { command: "/ooc", text: "Spui ceva în afara personajului, când chiar e nevoie.", example: "/ooc revin imediat" },
];

export const CONTROL_GROUPS: Array<"Toate" | ControlGroup> = ["Toate", "De bază", "Vehicul", "FiveM & RP"];
