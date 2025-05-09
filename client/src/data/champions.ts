import { apiRequest } from "@/lib/queryClient";
import { Champion } from "@shared/data/champions";
// Champions cache
let championsCache: any[] | null = null;

export async function initializeChampions() {
  try {
    // If we already have the data, return it
    if (championsCache) {
      return championsCache;
    }
    
    // First check if we have our own API data
    const response = await apiRequest("GET", "/api/champions");
    const championsData = await response.json();
    
    if (championsData && championsData.length > 0) {
      championsCache = championsData;
      return championsData;
    }
    
    // If not, use hardcoded champion data
    console.log("Using hardcoded champion data since API is not available");
    championsCache = mockChampions;
    return mockChampions;
  } catch (error) {
    console.error("Failed to initialize champions:", error);
    // Fallback to hardcoded data
    championsCache = mockChampions;
    return mockChampions;
  }
}

export async function getChampions() {
  if (!championsCache) {
    return initializeChampions();
  }
  return championsCache;
}

export async function getChampionById(id: string) {
  const champions = await getChampions();
  return champions.find((champion: Champion) => champion.id === id);
}

// Mock champion data for fallback
const mockChampions = [
  {
    id: "darius",
    name: "Darius",
    title: "the Hand of Noxus",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_0.jpg",
    roles: ["Fighter", "Tank"]
  },
  {
    id: "aatrox",
    name: "Aatrox",
    title: "the Darkin Blade",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg",
    roles: ["Fighter", "Tank"]
  },
  {
    id: "viktor",
    name: "Viktor",
    title: "the Machine Herald",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Viktor_0.jpg",
    roles: ["Mage"]
  },
  {
    id: "yasuo",
    name: "Yasuo",
    title: "the Unforgiven",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg",
    roles: ["Fighter", "Assassin"]
  },
  {
    id: "jinx",
    name: "Jinx",
    title: "the Loose Cannon",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg",
    roles: ["Marksman"]
  },
  {
    id: "thresh",
    name: "Thresh",
    title: "the Chain Warden",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_0.jpg",
    roles: ["Support", "Fighter"]
  },
  {
    id: "ahri",
    name: "Ahri",
    title: "the Nine-Tailed Fox",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg",
    roles: ["Mage", "Assassin"]
  },
  {
    id: "akali",
    name: "Akali",
    title: "the Rogue Assassin",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg",
    roles: ["Assassin"]
  },
  {
    id: "lux",
    name: "Lux",
    title: "the Lady of Luminosity",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg",
    roles: ["Mage", "Support"]
  },
  {
    id: "zed",
    name: "Zed",
    title: "the Master of Shadows",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zed_0.jpg",
    roles: ["Assassin"]
  },
  {
    id: "kaisa",
    name: "Kai'Sa",
    title: "Daughter of the Void",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_0.jpg",
    roles: ["Marksman"]
  },
  {
    id: "leona",
    name: "Leona",
    title: "the Radiant Dawn",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Leona_0.jpg",
    roles: ["Tank", "Support"]
  },
  {
    id: "malzahar",
    name: "Malzahar",
    title: "the Prophet of the Void",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Malzahar_0.jpg",
    roles: ["Mage"]
  },
  {
    id: "kassadin",
    name: "Kassadin",
    title: "the Void Walker",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kassadin_0.jpg",
    roles: ["Assassin", "Mage"]
  },
  {
    id: "fizz",
    name: "Fizz",
    title: "the Tidal Trickster",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fizz_0.jpg",
    roles: ["Assassin", "Fighter"]
  },
  {
    id: "teemo",
    name: "Teemo",
    title: "the Swift Scout",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Teemo_0.jpg",
    roles: ["Marksman", "Assassin"]
  },
  {
    id: "quinn",
    name: "Quinn",
    title: "Demacia's Wings",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Quinn_0.jpg",
    roles: ["Marksman", "Assassin"]
  },
  {
    id: "vayne",
    name: "Vayne",
    title: "the Night Hunter",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vayne_0.jpg",
    roles: ["Marksman", "Assassin"]
  }
];
