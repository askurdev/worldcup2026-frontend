import type { Team } from "@/lib/types";

// Real 48-team, 12-group composition confirmed at the FIFA Final Draw
// (Dec 5, 2025, Kennedy Center, Washington DC), cross-checked against
// FIFA.com, ESPN, UEFA.com, and Sky Sports. FIFA rankings and coach
// names are illustrative placeholders, not verified live data —
// these should be replaced once a real provider (e.g. API-Football)
// is wired in during Step 3.
//
// Flag images use FlagCDN (flagcdn.com), a free public flag CDN —
// no API key required, safe to hotlink for this purpose.

function flag(iso2: string): string {
  return `https://flagcdn.com/w160/${iso2.toLowerCase()}.png`;
}

export const teams: Team[] = [
  // Group A
  { id: "t-mex", slug: "mexico", name: "Mexico", shortName: "Mexico", fifaCode: "MEX", flagUrl: flag("mx"), group: "A", confederation: "CONCACAF", coachName: "Javier Aguirre", fifaRanking: 14, isHost: true },
  { id: "t-rsa", slug: "south-africa", name: "South Africa", shortName: "S. Africa", fifaCode: "RSA", flagUrl: flag("za"), group: "A", confederation: "CAF", coachName: "Hugo Broos", fifaRanking: 60, isHost: false },
  { id: "t-kor", slug: "south-korea", name: "South Korea", shortName: "S. Korea", fifaCode: "KOR", flagUrl: flag("kr"), group: "A", confederation: "AFC", coachName: "Hong Myung-bo", fifaRanking: 22, isHost: false },
  { id: "t-cze", slug: "czechia", name: "Czechia", shortName: "Czechia", fifaCode: "CZE", flagUrl: flag("cz"), group: "A", confederation: "UEFA", coachName: "Ivan Hasek", fifaRanking: 39, isHost: false },

  // Group B
  { id: "t-can", slug: "canada", name: "Canada", shortName: "Canada", fifaCode: "CAN", flagUrl: flag("ca"), group: "B", confederation: "CONCACAF", coachName: "Jesse Marsch", fifaRanking: 28, isHost: true },
  { id: "t-bih", slug: "bosnia-and-herzegovina", name: "Bosnia and Herzegovina", shortName: "Bosnia", fifaCode: "BIH", flagUrl: flag("ba"), group: "B", confederation: "UEFA", coachName: "Sergej Barbarez", fifaRanking: 47, isHost: false },
  { id: "t-qat", slug: "qatar", name: "Qatar", shortName: "Qatar", fifaCode: "QAT", flagUrl: flag("qa"), group: "B", confederation: "AFC", coachName: "Julen Lopetegui", fifaRanking: 35, isHost: false },
  { id: "t-sui", slug: "switzerland", name: "Switzerland", shortName: "Switzerland", fifaCode: "SUI", flagUrl: flag("ch"), group: "B", confederation: "UEFA", coachName: "Murat Yakin", fifaRanking: 18, isHost: false },

  // Group C
  { id: "t-bra", slug: "brazil", name: "Brazil", shortName: "Brazil", fifaCode: "BRA", flagUrl: flag("br"), group: "C", confederation: "CONMEBOL", coachName: "Carlo Ancelotti", fifaRanking: 5, isHost: false },
  { id: "t-mar", slug: "morocco", name: "Morocco", shortName: "Morocco", fifaCode: "MAR", flagUrl: flag("ma"), group: "C", confederation: "CAF", coachName: "Walid Regragui", fifaRanking: 12, isHost: false },
  { id: "t-hai", slug: "haiti", name: "Haiti", shortName: "Haiti", fifaCode: "HAI", flagUrl: flag("ht"), group: "C", confederation: "CONCACAF", coachName: "Sébastien Migné", fifaRanking: 85, isHost: false },
  { id: "t-sco", slug: "scotland", name: "Scotland", shortName: "Scotland", fifaCode: "SCO", flagUrl: flag("gb-sct"), group: "C", confederation: "UEFA", coachName: "Steve Clarke", fifaRanking: 33, isHost: false },

  // Group D
  { id: "t-usa", slug: "united-states", name: "United States", shortName: "USA", fifaCode: "USA", flagUrl: flag("us"), group: "D", confederation: "CONCACAF", coachName: "Mauricio Pochettino", fifaRanking: 16, isHost: true },
  { id: "t-par", slug: "paraguay", name: "Paraguay", shortName: "Paraguay", fifaCode: "PAR", flagUrl: flag("py"), group: "D", confederation: "CONMEBOL", coachName: "Gustavo Alfaro", fifaRanking: 40, isHost: false },
  { id: "t-aus", slug: "australia", name: "Australia", shortName: "Australia", fifaCode: "AUS", flagUrl: flag("au"), group: "D", confederation: "AFC", coachName: "Tony Popovic", fifaRanking: 26, isHost: false },
  { id: "t-tur", slug: "turkiye", name: "Türkiye", shortName: "Türkiye", fifaCode: "TUR", flagUrl: flag("tr"), group: "D", confederation: "UEFA", coachName: "Vincenzo Montella", fifaRanking: 24, isHost: false },

  // Group E
  { id: "t-ger", slug: "germany", name: "Germany", shortName: "Germany", fifaCode: "GER", flagUrl: flag("de"), group: "E", confederation: "UEFA", coachName: "Julian Nagelsmann", fifaRanking: 11, isHost: false },
  { id: "t-cuw", slug: "curacao", name: "Curaçao", shortName: "Curaçao", fifaCode: "CUW", flagUrl: flag("cw"), group: "E", confederation: "CONCACAF", coachName: "Dick Advocaat", fifaRanking: 82, isHost: false },
  { id: "t-civ", slug: "cote-divoire", name: "Côte d'Ivoire", shortName: "Côte d'Ivoire", fifaCode: "CIV", flagUrl: flag("ci"), group: "E", confederation: "CAF", coachName: "Emerse Faé", fifaRanking: 32, isHost: false },
  { id: "t-ecu", slug: "ecuador", name: "Ecuador", shortName: "Ecuador", fifaCode: "ECU", flagUrl: flag("ec"), group: "E", confederation: "CONMEBOL", coachName: "Sebastián Beccacece", fifaRanking: 27, isHost: false },

  // Group F
  { id: "t-ned", slug: "netherlands", name: "Netherlands", shortName: "Netherlands", fifaCode: "NED", flagUrl: flag("nl"), group: "F", confederation: "UEFA", coachName: "Ronald Koeman", fifaRanking: 7, isHost: false },
  { id: "t-jpn", slug: "japan", name: "Japan", shortName: "Japan", fifaCode: "JPN", flagUrl: flag("jp"), group: "F", confederation: "AFC", coachName: "Hajime Moriyasu", fifaRanking: 17, isHost: false },
  { id: "t-tun", slug: "tunisia", name: "Tunisia", shortName: "Tunisia", fifaCode: "TUN", flagUrl: flag("tn"), group: "F", confederation: "CAF", coachName: "Sami Trabelsi", fifaRanking: 44, isHost: false },
  { id: "t-swe", slug: "sweden", name: "Sweden", shortName: "Sweden", fifaCode: "SWE", flagUrl: flag("se"), group: "F", confederation: "UEFA", coachName: "Jon Dahl Tomasson", fifaRanking: 30, isHost: false },

  // Group G
  { id: "t-bel", slug: "belgium", name: "Belgium", shortName: "Belgium", fifaCode: "BEL", flagUrl: flag("be"), group: "G", confederation: "UEFA", coachName: "Rudi Garcia", fifaRanking: 9, isHost: false },
  { id: "t-egy", slug: "egypt", name: "Egypt", shortName: "Egypt", fifaCode: "EGY", flagUrl: flag("eg"), group: "G", confederation: "CAF", coachName: "Hossam Hassan", fifaRanking: 34, isHost: false },
  { id: "t-irn", slug: "iran", name: "IR Iran", shortName: "Iran", fifaCode: "IRN", flagUrl: flag("ir"), group: "G", confederation: "AFC", coachName: "Amir Ghalenoei", fifaRanking: 20, isHost: false },
  { id: "t-nzl", slug: "new-zealand", name: "New Zealand", shortName: "New Zealand", fifaCode: "NZL", flagUrl: flag("nz"), group: "G", confederation: "OFC", coachName: "Darren Bazeley", fifaRanking: 91, isHost: false },

  // Group H
  { id: "t-esp", slug: "spain", name: "Spain", shortName: "Spain", fifaCode: "ESP", flagUrl: flag("es"), group: "H", confederation: "UEFA", coachName: "Luis de la Fuente", fifaRanking: 1, isHost: false },
  { id: "t-cpv", slug: "cabo-verde", name: "Cabo Verde", shortName: "Cabo Verde", fifaCode: "CPV", flagUrl: flag("cv"), group: "H", confederation: "CAF", coachName: "Pedro 'Bubista' Leitão", fifaRanking: 70, isHost: false },
  { id: "t-ksa", slug: "saudi-arabia", name: "Saudi Arabia", shortName: "Saudi Arabia", fifaCode: "KSA", flagUrl: flag("sa"), group: "H", confederation: "AFC", coachName: "Hervé Renard", fifaRanking: 56, isHost: false },
  { id: "t-uru", slug: "uruguay", name: "Uruguay", shortName: "Uruguay", fifaCode: "URU", flagUrl: flag("uy"), group: "H", confederation: "CONMEBOL", coachName: "Marcelo Bielsa", fifaRanking: 13, isHost: false },

  // Group I
  { id: "t-fra", slug: "france", name: "France", shortName: "France", fifaCode: "FRA", flagUrl: flag("fr"), group: "I", confederation: "UEFA", coachName: "Didier Deschamps", fifaRanking: 2, isHost: false },
  { id: "t-sen", slug: "senegal", name: "Senegal", shortName: "Senegal", fifaCode: "SEN", flagUrl: flag("sn"), group: "I", confederation: "CAF", coachName: "Pape Thiaw", fifaRanking: 19, isHost: false },
  { id: "t-irq", slug: "iraq", name: "Iraq", shortName: "Iraq", fifaCode: "IRQ", flagUrl: flag("iq"), group: "I", confederation: "AFC", coachName: "Graham Arnold", fifaRanking: 58, isHost: false },
  { id: "t-nor", slug: "norway", name: "Norway", shortName: "Norway", fifaCode: "NOR", flagUrl: flag("no"), group: "I", confederation: "UEFA", coachName: "Ståle Solbakken", fifaRanking: 36, isHost: false },

  // Group J
  { id: "t-arg", slug: "argentina", name: "Argentina", shortName: "Argentina", fifaCode: "ARG", flagUrl: flag("ar"), group: "J", confederation: "CONMEBOL", coachName: "Lionel Scaloni", fifaRanking: 1, isHost: false },
  { id: "t-alg", slug: "algeria", name: "Algeria", shortName: "Algeria", fifaCode: "ALG", flagUrl: flag("dz"), group: "J", confederation: "CAF", coachName: "Vladimir Petković", fifaRanking: 38, isHost: false },
  { id: "t-aut", slug: "austria", name: "Austria", shortName: "Austria", fifaCode: "AUT", flagUrl: flag("at"), group: "J", confederation: "UEFA", coachName: "Ralf Rangnick", fifaRanking: 23, isHost: false },
  { id: "t-jor", slug: "jordan", name: "Jordan", shortName: "Jordan", fifaCode: "JOR", flagUrl: flag("jo"), group: "J", confederation: "AFC", coachName: "Jamal Sellami", fifaRanking: 63, isHost: false },

  // Group K
  { id: "t-por", slug: "portugal", name: "Portugal", shortName: "Portugal", fifaCode: "POR", flagUrl: flag("pt"), group: "K", confederation: "UEFA", coachName: "Roberto Martínez", fifaRanking: 6, isHost: false },
  { id: "t-uzb", slug: "uzbekistan", name: "Uzbekistan", shortName: "Uzbekistan", fifaCode: "UZB", flagUrl: flag("uz"), group: "K", confederation: "AFC", coachName: "Fabio Cannavaro", fifaRanking: 55, isHost: false },
  { id: "t-col", slug: "colombia", name: "Colombia", shortName: "Colombia", fifaCode: "COL", flagUrl: flag("co"), group: "K", confederation: "CONMEBOL", coachName: "Néstor Lorenzo", fifaRanking: 15, isHost: false },
  { id: "t-cod", slug: "congo-dr", name: "DR Congo", shortName: "DR Congo", fifaCode: "COD", flagUrl: flag("cd"), group: "K", confederation: "CAF", coachName: "Sébastien Desabre", fifaRanking: 65, isHost: false },

  // Group L
  { id: "t-eng", slug: "england", name: "England", shortName: "England", fifaCode: "ENG", flagUrl: flag("gb-eng"), group: "L", confederation: "UEFA", coachName: "Thomas Tuchel", fifaRanking: 4, isHost: false },
  { id: "t-cro", slug: "croatia", name: "Croatia", shortName: "Croatia", fifaCode: "CRO", flagUrl: flag("hr"), group: "L", confederation: "UEFA", coachName: "Zlatko Dalić", fifaRanking: 10, isHost: false },
  { id: "t-gha", slug: "ghana", name: "Ghana", shortName: "Ghana", fifaCode: "GHA", flagUrl: flag("gh"), group: "L", confederation: "CAF", coachName: "Otto Addo", fifaRanking: 62, isHost: false },
  { id: "t-pan", slug: "panama", name: "Panama", shortName: "Panama", fifaCode: "PAN", flagUrl: flag("pa"), group: "L", confederation: "CONCACAF", coachName: "Thomas Christiansen", fifaRanking: 31, isHost: false },
];

export function getTeamById(id: string): Team | undefined {
  return teams.find((t) => t.id === id);
}

export function getTeamBySlug(slug: string): Team | undefined {
  return teams.find((t) => t.slug === slug);
}

export function getTeamsByGroup(group: string): Team[] {
  return teams.filter((t) => t.group === group);
}

export const groupNames = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"] as const;
