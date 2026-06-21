import type { Player } from "@/lib/types";

// Sample squad data for a representative subset of teams (enough to
// populate team pages, player pages, and search meaningfully without
// hand-writing all 48 x ~26 player squads for Step 1). Photo URLs use
// a neutral placeholder avatar service (no API key, no licensing
// concerns) rather than real photos, since real player photography
// is copyrighted and player headshots from a real provider should
// be wired in during Step 3.

function avatar(seed: string): string {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear`;
}

export const players: Player[] = [
  // Argentina
  { id: "p-arg-1", slug: "lionel-messi", fullName: "Lionel Andrés Messi", knownAs: "Messi", photoUrl: avatar("L Messi"), nationalTeamId: "t-arg", nationalTeamName: "Argentina", clubName: "Inter Miami CF", clubCountry: "USA", position: "RW", shirtNumber: 10, dateOfBirth: "1987-06-24", heightCm: 170, goals: 13, assists: 8, appearances: 26, yellowCards: 6, redCards: 0, isCaptain: true },
  { id: "p-arg-2", slug: "julian-alvarez", fullName: "Julián Álvarez", knownAs: "Álvarez", photoUrl: avatar("J Alvarez"), nationalTeamId: "t-arg", nationalTeamName: "Argentina", clubName: "Atlético Madrid", clubCountry: "Spain", position: "ST", shirtNumber: 9, dateOfBirth: "2000-01-31", heightCm: 170, goals: 7, assists: 4, appearances: 18, yellowCards: 3, redCards: 0, isCaptain: false },
  { id: "p-arg-3", slug: "emiliano-martinez", fullName: "Emiliano Martínez", knownAs: "Dibu Martínez", photoUrl: avatar("E Martinez"), nationalTeamId: "t-arg", nationalTeamName: "Argentina", clubName: "Aston Villa", clubCountry: "England", position: "GK", shirtNumber: 23, dateOfBirth: "1992-09-02", heightCm: 195, goals: 0, assists: 0, appearances: 22, yellowCards: 4, redCards: 0, isCaptain: false },

  // Brazil
  { id: "p-bra-1", slug: "vinicius-junior", fullName: "Vinícius José Paixão de Oliveira Júnior", knownAs: "Vinícius Júnior", photoUrl: avatar("Vinicius Jr"), nationalTeamId: "t-bra", nationalTeamName: "Brazil", clubName: "Real Madrid", clubCountry: "Spain", position: "LW", shirtNumber: 7, dateOfBirth: "2000-07-12", heightCm: 176, goals: 11, assists: 9, appearances: 24, yellowCards: 5, redCards: 0, isCaptain: false },
  { id: "p-bra-2", slug: "rodrygo", fullName: "Rodrygo Silva de Goes", knownAs: "Rodrygo", photoUrl: avatar("Rodrygo"), nationalTeamId: "t-bra", nationalTeamName: "Brazil", clubName: "Real Madrid", clubCountry: "Spain", position: "RW", shirtNumber: 11, dateOfBirth: "2001-01-09", heightCm: 174, goals: 6, assists: 5, appearances: 19, yellowCards: 2, redCards: 0, isCaptain: false },
  { id: "p-bra-3", slug: "alisson-becker", fullName: "Alisson Ramsés Becker", knownAs: "Alisson", photoUrl: avatar("Alisson Becker"), nationalTeamId: "t-bra", nationalTeamName: "Brazil", clubName: "Liverpool", clubCountry: "England", position: "GK", shirtNumber: 1, dateOfBirth: "1992-10-02", heightCm: 191, goals: 0, assists: 0, appearances: 28, yellowCards: 1, redCards: 0, isCaptain: true },

  // France
  { id: "p-fra-1", slug: "kylian-mbappe", fullName: "Kylian Mbappé Lottin", knownAs: "Mbappé", photoUrl: avatar("K Mbappe"), nationalTeamId: "t-fra", nationalTeamName: "France", clubName: "Real Madrid", clubCountry: "Spain", position: "ST", shirtNumber: 10, dateOfBirth: "1998-12-20", heightCm: 178, goals: 18, assists: 6, appearances: 27, yellowCards: 3, redCards: 0, isCaptain: true },
  { id: "p-fra-2", slug: "ousmane-dembele", fullName: "Ousmane Dembélé", knownAs: "Dembélé", photoUrl: avatar("O Dembele"), nationalTeamId: "t-fra", nationalTeamName: "France", clubName: "Paris Saint-Germain", clubCountry: "France", position: "RW", shirtNumber: 11, dateOfBirth: "1997-05-15", heightCm: 178, goals: 9, assists: 7, appearances: 21, yellowCards: 4, redCards: 0, isCaptain: false },

  // England
  { id: "p-eng-1", slug: "harry-kane", fullName: "Harry Edward Kane", knownAs: "Kane", photoUrl: avatar("Harry Kane"), nationalTeamId: "t-eng", nationalTeamName: "England", clubName: "Bayern Munich", clubCountry: "Germany", position: "ST", shirtNumber: 9, dateOfBirth: "1993-07-28", heightCm: 188, goals: 15, assists: 5, appearances: 25, yellowCards: 2, redCards: 0, isCaptain: true },
  { id: "p-eng-2", slug: "jude-bellingham", fullName: "Jude Victor William Bellingham", knownAs: "Bellingham", photoUrl: avatar("Jude Bellingham"), nationalTeamId: "t-eng", nationalTeamName: "England", clubName: "Real Madrid", clubCountry: "Spain", position: "CAM", shirtNumber: 10, dateOfBirth: "2003-06-29", heightCm: 186, goals: 10, assists: 8, appearances: 22, yellowCards: 5, redCards: 1, isCaptain: false },

  // Spain
  { id: "p-esp-1", slug: "lamine-yamal", fullName: "Lamine Yamal Nasraoui Ebana", knownAs: "Lamine Yamal", photoUrl: avatar("Lamine Yamal"), nationalTeamId: "t-esp", nationalTeamName: "Spain", clubName: "FC Barcelona", clubCountry: "Spain", position: "RW", shirtNumber: 19, dateOfBirth: "2007-07-13", heightCm: 180, goals: 8, assists: 10, appearances: 20, yellowCards: 2, redCards: 0, isCaptain: false },
  { id: "p-esp-2", slug: "rodri", fullName: "Rodrigo Hernández Cascante", knownAs: "Rodri", photoUrl: avatar("Rodri"), nationalTeamId: "t-esp", nationalTeamName: "Spain", clubName: "Manchester City", clubCountry: "England", position: "CDM", shirtNumber: 16, dateOfBirth: "1996-06-22", heightCm: 191, goals: 4, assists: 6, appearances: 24, yellowCards: 6, redCards: 0, isCaptain: true },

  // Portugal
  { id: "p-por-1", slug: "cristiano-ronaldo", fullName: "Cristiano Ronaldo dos Santos Aveiro", knownAs: "Ronaldo", photoUrl: avatar("C Ronaldo"), nationalTeamId: "t-por", nationalTeamName: "Portugal", clubName: "Al Nassr FC", clubCountry: "Saudi Arabia", position: "ST", shirtNumber: 7, dateOfBirth: "1985-02-05", heightCm: 187, goals: 9, assists: 3, appearances: 23, yellowCards: 3, redCards: 0, isCaptain: true },

  // Germany
  { id: "p-ger-1", slug: "jamal-musiala", fullName: "Jamal Musiala", knownAs: "Musiala", photoUrl: avatar("Jamal Musiala"), nationalTeamId: "t-ger", nationalTeamName: "Germany", clubName: "Bayern Munich", clubCountry: "Germany", position: "CAM", shirtNumber: 14, dateOfBirth: "2003-02-26", heightCm: 184, goals: 11, assists: 9, appearances: 23, yellowCards: 2, redCards: 0, isCaptain: false },

  // Netherlands
  { id: "p-ned-1", slug: "cody-gakpo", fullName: "Cody Mathès Gakpo", knownAs: "Gakpo", photoUrl: avatar("Cody Gakpo"), nationalTeamId: "t-ned", nationalTeamName: "Netherlands", clubName: "Liverpool", clubCountry: "England", position: "LW", shirtNumber: 8, dateOfBirth: "1999-05-07", heightCm: 189, goals: 9, assists: 6, appearances: 21, yellowCards: 1, redCards: 0, isCaptain: false },

  // Morocco
  { id: "p-mar-1", slug: "achraf-hakimi", fullName: "Achraf Hakimi Mouh", knownAs: "Hakimi", photoUrl: avatar("Achraf Hakimi"), nationalTeamId: "t-mar", nationalTeamName: "Morocco", clubName: "Paris Saint-Germain", clubCountry: "France", position: "RB", shirtNumber: 2, dateOfBirth: "1998-11-04", heightCm: 181, goals: 5, assists: 7, appearances: 25, yellowCards: 4, redCards: 0, isCaptain: true },

  // USA
  { id: "p-usa-1", slug: "christian-pulisic", fullName: "Christian Mate Pulisic", knownAs: "Pulisic", photoUrl: avatar("Christian Pulisic"), nationalTeamId: "t-usa", nationalTeamName: "United States", clubName: "AC Milan", clubCountry: "Italy", position: "RW", shirtNumber: 10, dateOfBirth: "1998-09-18", heightCm: 177, goals: 7, assists: 5, appearances: 22, yellowCards: 3, redCards: 0, isCaptain: true },

  // Mexico
  { id: "p-mex-1", slug: "santiago-gimenez", fullName: "Santiago Giménez", knownAs: "Santi Giménez", photoUrl: avatar("Santiago Gimenez"), nationalTeamId: "t-mex", nationalTeamName: "Mexico", clubName: "AC Milan", clubCountry: "Italy", position: "ST", shirtNumber: 11, dateOfBirth: "2001-04-18", heightCm: 186, goals: 6, assists: 2, appearances: 16, yellowCards: 1, redCards: 0, isCaptain: false },

  // Belgium
  { id: "p-bel-1", slug: "kevin-de-bruyne", fullName: "Kevin De Bruyne", knownAs: "De Bruyne", photoUrl: avatar("Kevin De Bruyne"), nationalTeamId: "t-bel", nationalTeamName: "Belgium", clubName: "Napoli", clubCountry: "Italy", position: "CAM", shirtNumber: 7, dateOfBirth: "1991-06-28", heightCm: 181, goals: 6, assists: 11, appearances: 26, yellowCards: 4, redCards: 0, isCaptain: true },

  // Croatia
  { id: "p-cro-1", slug: "luka-modric", fullName: "Luka Modrić", knownAs: "Modrić", photoUrl: avatar("Luka Modric"), nationalTeamId: "t-cro", nationalTeamName: "Croatia", clubName: "AC Milan", clubCountry: "Italy", position: "CM", shirtNumber: 10, dateOfBirth: "1985-09-09", heightCm: 172, goals: 3, assists: 6, appearances: 27, yellowCards: 3, redCards: 0, isCaptain: true },
];

export function getPlayerBySlug(slug: string): Player | undefined {
  return players.find((p) => p.slug === slug);
}

export function getPlayersByTeam(teamId: string): Player[] {
  return players.filter((p) => p.nationalTeamId === teamId);
}
