import { apiRequest } from "@/lib/queryClient";

// Matchups cache
let matchupsCache: any[] | null = null;

export async function initializeMatchups() {
  try {
    // If we already have the data, return it
    if (matchupsCache) {
      return matchupsCache;
    }
    
    // Use hardcoded matchup data
    console.log("Using hardcoded matchups data");
    matchupsCache = mockMatchups;
    return mockMatchups;
  } catch (error) {
    console.error("Failed to initialize matchups:", error);
    // Fallback to hardcoded data
    matchupsCache = mockMatchups;
    return mockMatchups;
  }
}

// Mock matchup data for fallback
const mockMatchups = [
  // Darius matchups - Top lane
  {
    enemyChampionId: "darius",
    counterChampionId: "quinn",
    lane: "top",
    winRate: 56,
    difficulty: "medium",
    explanation: "Quinn can kite Darius with her range and use Vault to escape his pull."
  },
  {
    enemyChampionId: "darius",
    counterChampionId: "teemo",
    lane: "top",
    winRate: 54,
    difficulty: "easy",
    explanation: "Teemo can blind Darius and poke him from range while avoiding his pull."
  },
  {
    enemyChampionId: "darius",
    counterChampionId: "vayne",
    lane: "top",
    winRate: 52,
    difficulty: "hard",
    explanation: "Vayne outranges Darius and can use Condemn to keep distance from his pull."
  },
  
  // Viktor matchups - Mid lane
  {
    enemyChampionId: "viktor",
    counterChampionId: "malzahar",
    lane: "mid",
    winRate: 58,
    difficulty: "easy",
    explanation: "Suppression ultimate counters Viktor's mobility, and spell shield blocks his burst damage."
  },
  {
    enemyChampionId: "viktor",
    counterChampionId: "kassadin",
    lane: "mid",
    winRate: 55,
    difficulty: "medium",
    explanation: "Magic shield prevents Viktor's poke and can easily dodge his abilities with ultimate."
  },
  {
    enemyChampionId: "viktor",
    counterChampionId: "fizz",
    lane: "mid",
    winRate: 52,
    difficulty: "hard",
    explanation: "Playful/Trickster can dodge Viktor's entire combo and has high all-in potential."
  },
  
  // Yasuo matchups - Mid lane
  {
    enemyChampionId: "yasuo",
    counterChampionId: "annie",
    lane: "mid",
    winRate: 57,
    difficulty: "easy",
    explanation: "Point-and-click stun prevents Yasuo from dashing around and counters his mobility."
  },
  {
    enemyChampionId: "yasuo",
    counterChampionId: "malzahar",
    lane: "mid",
    winRate: 55,
    difficulty: "medium",
    explanation: "Ultimate suppression locks down Yasuo, and his shield blocks Yasuo's poke."
  },
  {
    enemyChampionId: "yasuo",
    counterChampionId: "ahri",
    lane: "mid",
    winRate: 51,
    difficulty: "hard",
    explanation: "Can charm Yasuo mid-dash, making it hard for him to engage safely."
  },
  
  // Jinx matchups - ADC lane
  {
    enemyChampionId: "jinx",
    counterChampionId: "kaisa",
    lane: "adc",
    winRate: 54,
    difficulty: "medium",
    explanation: "Kai'Sa can dive onto Jinx with her ultimate, bypassing her range advantage."
  },
  {
    enemyChampionId: "jinx",
    counterChampionId: "vayne",
    lane: "adc",
    winRate: 52,
    difficulty: "hard",
    explanation: "Vayne's invisibility lets her avoid Jinx's skillshots and outplay her in duels."
  },
  
  // Thresh matchups - Support lane
  {
    enemyChampionId: "thresh",
    counterChampionId: "leona",
    lane: "support",
    winRate: 55,
    difficulty: "medium",
    explanation: "Leona can engage on Thresh's ADC before he can react and has more reliable CC."
  },
  {
    enemyChampionId: "thresh",
    counterChampionId: "lux",
    lane: "support",
    winRate: 53,
    difficulty: "easy",
    explanation: "Lux can poke Thresh from safe distance and shield her ADC from his hooks."
  }
];

// Mock champion build data
export const mockChampionBuilds = [
  // Teemo builds
  {
    championId: "teemo",
    lane: "top",
    startingItems: [1056, 1004], // Doran's Ring, Faerie Charm
    coreItems: [6653, 3116, 3157], // Liandry's Anguish, Rylai's Crystal Scepter, Zhonya's Hourglass
    situationalItems: [3135, 4637, 4645, 3089] // Void Staff, Demonic Embrace, Shadowflame, Rabadon's Deathcap
  },
  
  // Quinn builds
  {
    championId: "quinn",
    lane: "top",
    startingItems: [1055, 1036], // Doran's Blade, Long Sword
    coreItems: [6671, 3031, 3036], // Galeforce, Infinity Edge, Lord Dominik's Regards
    situationalItems: [3046, 3139, 3153, 3085] // Phantom Dancer, Mercurial Scimitar, Blade of the Ruined King, Runaan's Hurricane
  },
  
  // Vayne builds
  {
    championId: "vayne",
    lane: "top",
    startingItems: [1055, 1036], // Doran's Blade, Long Sword
    coreItems: [6672, 3153, 3046], // Kraken Slayer, Blade of the Ruined King, Phantom Dancer
    situationalItems: [3031, 3033, 3139, 3094] // Infinity Edge, Mortal Reminder, Mercurial Scimitar, Rapid Firecannon
  },
  
  // Malzahar builds
  {
    championId: "malzahar",
    lane: "mid",
    startingItems: [1056, 1004], // Doran's Ring, Faerie Charm
    coreItems: [6653, 4637, 3157], // Liandry's Anguish, Demonic Embrace, Zhonya's Hourglass
    situationalItems: [3116, 3135, 4645, 3089] // Rylai's Crystal Scepter, Void Staff, Shadowflame, Rabadon's Deathcap
  },
  
  // Kassadin builds
  {
    championId: "kassadin",
    lane: "mid",
    startingItems: [1056, 1004], // Doran's Ring, Faerie Charm
    coreItems: [6655, 3100, 3089], // Luden's Tempest, Lich Bane, Rabadon's Deathcap
    situationalItems: [3157, 3135, 4645, 4629] // Zhonya's Hourglass, Void Staff, Shadowflame, Cosmic Drive
  },
  
  // Fizz builds
  {
    championId: "fizz",
    lane: "mid",
    startingItems: [1056, 1004], // Doran's Ring, Faerie Charm
    coreItems: [6655, 3100, 3157], // Luden's Tempest, Lich Bane, Zhonya's Hourglass
    situationalItems: [3089, 3135, 4645, 3115] // Rabadon's Deathcap, Void Staff, Shadowflame, Nashor's Tooth
  },
  
  // Ahri builds
  {
    championId: "ahri",
    lane: "mid",
    startingItems: [1056, 1004], // Doran's Ring, Faerie Charm
    coreItems: [6655, 3157, 3089], // Luden's Tempest, Zhonya's Hourglass, Rabadon's Deathcap
    situationalItems: [3135, 4645, 4629, 4628] // Void Staff, Shadowflame, Cosmic Drive, Horizon Focus
  },
  
  // Kaisa builds
  {
    championId: "kaisa",
    lane: "adc",
    startingItems: [1055, 1036], // Doran's Blade, Long Sword
    coreItems: [6672, 3046, 3115], // Kraken Slayer, Phantom Dancer, Nashor's Tooth
    situationalItems: [3031, 3089, 3135, 3139] // Infinity Edge, Rabadon's Deathcap, Void Staff, Mercurial Scimitar
  },
  
  // Leona builds
  {
    championId: "leona",
    lane: "support",
    startingItems: [1054, 1004], // Doran's Shield, Faerie Charm
    coreItems: [3001, 3143, 3071], // Abyssal Mask, Randuin's Omen, Black Cleaver
    situationalItems: [3065, 3026, 3179, 3084] // Spirit Visage, Guardian Angel, Umbral Glaive, Heartsteel
  },
  
  // Lux builds
  {
    championId: "lux",
    lane: "support",
    startingItems: [1056, 1004], // Doran's Ring, Faerie Charm
    coreItems: [6655, 3157, 3089], // Luden's Tempest, Zhonya's Hourglass, Rabadon's Deathcap
    situationalItems: [3116, 3135, 4645, 4628] // Rylai's Crystal Scepter, Void Staff, Shadowflame, Horizon Focus
  }
];
