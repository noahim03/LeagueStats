// Use native fetch to avoid extra client dependencies

// Riot API Constants
const REGION = "na1"; // North America region
const LEAGUE_VERSION = "15.13.1"; // Update this as needed

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
    const response = await fetch(`${DATA_DRAGON_CHAMPION_URL}.json`);
    if (!response.ok) throw new Error(`Failed to fetch champions: ${response.status}`);
    const data = await response.json();
    return data.data;
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
    const response = await fetch(`${DATA_DRAGON_CHAMPION_URL}/${championId}.json`);
    if (!response.ok) throw new Error(`Failed to fetch champion ${championId}: ${response.status}`);
    const data = await response.json();
    return data.data[championId];
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
    const response = await fetch(DATA_DRAGON_ITEM_URL);
    if (!response.ok) throw new Error(`Failed to fetch items: ${response.status}`);
    const data = await response.json();
    return data.data;
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
    // Route through our server to keep the Riot API key on the server only
    const response = await fetch(`/api/riot/champion-mastery/${summonerId}/by-champion/${championId}`);
    if (!response.ok) throw new Error(`Failed to fetch mastery: ${response.status}`);
    return await response.json();
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

export function getItemImageByFile(fileName: string) {
  return `${DATA_DRAGON_BASE_URL}/${LEAGUE_VERSION}/img/item/${fileName}`;
}

/**
 * Get rune icon URL from its relative icon path in runesReforged.json
 */
export function getRuneIconUrl(iconRelativePath: string) {
  // Rune icons are served from an unversioned /cdn/img path
  return `${DATA_DRAGON_BASE_URL}/img/${iconRelativePath}`;
}

/**
 * Get all runes from Data Dragon
 */
export async function getAllRunes(patch = LEAGUE_VERSION) {
  try {
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/runesReforged.json`);
    if (!response.ok) throw new Error(`Failed to fetch runes: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching runes:', error);
    throw error;
  }
}
