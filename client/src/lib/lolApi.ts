import axios from 'axios';
import { championMatchups } from "@shared/data/matchups";

// Riot API Constants
const RIOT_API_KEY = import.meta.env.VITE_RIOT_API_KEY;
if (!RIOT_API_KEY) {
  console.error("Riot API key not found. Please check your .env file.");
}
const REGION = "na1"; // North America region
const LEAGUE_VERSION = "13.24.1"; // Update this as needed

// DataDragon base URLs
const DATA_DRAGON_BASE_URL = "https://ddragon.leagueoflegends.com/cdn";
const DATA_DRAGON_CHAMPION_URL = `${DATA_DRAGON_BASE_URL}/${LEAGUE_VERSION}/data/en_US/champion`;
const DATA_DRAGON_ITEM_URL = `${DATA_DRAGON_BASE_URL}/${LEAGUE_VERSION}/data/en_US/item.json`;

// Riot API endpoints
const RIOT_API_BASE_URL = `https://${REGION}.api.riotgames.com/lol`;
const CHAMPION_MASTERY_ENDPOINT = `${RIOT_API_BASE_URL}/champion-mastery/v4/champion-masteries/by-summoner`;

/**
 * Get all champions from Data Dragon
 */
export async function getAllChampions() {
  try {
    const response = await axios.get(`${DATA_DRAGON_CHAMPION_URL}.json`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching champions:", error);
    throw error;
  }
}

/**
 * Get specific champion details from Data Dragon
 */
export async function getChampionDetails(championId: string) {
  try {
    const response = await axios.get(`${DATA_DRAGON_CHAMPION_URL}/${championId}.json`);
    return response.data.data[championId];
  } catch (error) {
    console.error(`Error fetching champion ${championId}:`, error);
    throw error;
  }
}

/**
 * Get all items from Data Dragon
 */
export async function getAllItems() {
  try {
    const response = await axios.get(DATA_DRAGON_ITEM_URL);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}

/**
 * Get champion mastery for a summoner
 */
export async function getChampionMastery(summonerId: string, championId: string) {
  try {
    const response = await axios.get(
      `${CHAMPION_MASTERY_ENDPOINT}/${summonerId}/by-champion/${championId}`,
      {
        headers: {
          "X-Riot-Token": RIOT_API_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching champion mastery for ${championId}:`, error);
    throw error;
  }
}

/**
 * Get champion image URL
 */
export function getChampionImageUrl(championId: string) {
  return `${DATA_DRAGON_BASE_URL}/${LEAGUE_VERSION}/img/champion/${championId}.png`;
}

/**
 * Get champion splash art URL
 */
export function getChampionSplashUrl(championId: string, skinNum = 0) {
  return `${DATA_DRAGON_BASE_URL}/img/champion/splash/${championId}_${skinNum}.jpg`;
}

/**
 * Get item image URL
 */
export function getItemImageUrl(itemId: number) {
  return `${DATA_DRAGON_BASE_URL}/${LEAGUE_VERSION}/img/item/${itemId}.png`;
}

/**
 * Get champion matchup data
 */
export async function getChampionMatchups(championId: string, lane: string) {
  try {
    // Return static matchup data from our predefined matchups
    return championMatchups[championId]?.[lane] || [];
  } catch (error) {
    console.error(`Error fetching matchups for ${championId}:`, error);
    return [];
  }
}

// Mock matchup data for development
function getMockMatchupData(championId: string, lane: string) {
  const mockData = {
    "darius": {
      "top": [
        { championId: "quinn", winRate: 56, difficulty: "medium" },
        { championId: "teemo", winRate: 54, difficulty: "easy" },
        { championId: "vayne", winRate: 52, difficulty: "hard" },
        { championId: "kayle", winRate: 51, difficulty: "medium" },
        { championId: "malphite", winRate: 50, difficulty: "easy" }
      ]
    },
    "yasuo": {
      "mid": [
        { championId: "annie", winRate: 57, difficulty: "easy" },
        { championId: "malzahar", winRate: 55, difficulty: "medium" },
        { championId: "ahri", winRate: 51, difficulty: "hard" },
        { championId: "lissandra", winRate: 50, difficulty: "medium" },
        { championId: "fizz", winRate: 49, difficulty: "hard" }
      ]
    },
    "jinx": {
      "adc": [
        { championId: "kaisa", winRate: 54, difficulty: "medium" },
        { championId: "vayne", winRate: 52, difficulty: "hard" },
        { championId: "tristana", winRate: 51, difficulty: "medium" },
        { championId: "lucian", winRate: 50, difficulty: "medium" },
        { championId: "ezreal", winRate: 49, difficulty: "easy" }
      ]
    }
  };

  return mockData[championId as keyof typeof mockData]?.[lane as keyof typeof mockData[keyof typeof mockData]] || [];
}
