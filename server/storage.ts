import { 
  users, type User, type InsertUser,
  champions, type Champion, type InsertChampion,
  matchups, type Matchup, type InsertMatchup,
  items, type Item, type InsertItem,
  championBuilds, type ChampionBuild, type InsertChampionBuild,
  type Lane
} from "@shared/schema";

// Storage interface for CRUD operations
export interface IStorage {
  // User operations (keeping original)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Champion operations
  getAllChampions(): Promise<Champion[]>;
  getChampionById(id: string): Promise<Champion | undefined>;
  
  // Matchup operations
  getMatchupsByEnemyAndLane(enemyChampionId: string, lane: Lane): Promise<Matchup[]>;
  
  // Item operations
  getItemsById(ids: number[]): Promise<Item[]>;
  
  // Build operations
  getChampionBuild(championId: string, lane: Lane): Promise<ChampionBuild | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private champions: Map<string, Champion>;
  private matchups: Matchup[];
  private items: Map<number, Item>;
  private championBuilds: ChampionBuild[];
  currentId: number;

  constructor() {
    this.users = new Map();
    this.champions = new Map();
    this.matchups = [];
    this.items = new Map();
    this.championBuilds = [];
    this.currentId = 1;
  }

  // User methods (keeping original)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Champion methods
  async getAllChampions(): Promise<Champion[]> {
    return Array.from(this.champions.values());
  }
  
  async getChampionById(id: string): Promise<Champion | undefined> {
    return this.champions.get(id);
  }
  
  // Helper to initialize champion data
  initializeChampions(championsData: Champion[]): void {
    championsData.forEach(champion => {
      this.champions.set(champion.id, champion);
    });
  }
  
  // Matchup methods
  async getMatchupsByEnemyAndLane(enemyChampionId: string, lane: Lane): Promise<Matchup[]> {
    return this.matchups.filter(
      matchup => matchup.enemyChampionId === enemyChampionId && matchup.lane === lane
    );
  }
  
  // Helper to initialize matchup data
  initializeMatchups(matchupsData: Matchup[]): void {
    this.matchups = matchupsData;
  }
  
  // Item methods
  async getItemsById(ids: number[]): Promise<Item[]> {
    return ids.map(id => this.items.get(id)).filter(Boolean) as Item[];
  }
  
  // Helper to initialize item data
  initializeItems(itemsData: Item[]): void {
    itemsData.forEach(item => {
      this.items.set(item.id, item);
    });
  }
  
  // Build methods
  async getChampionBuild(championId: string, lane: Lane): Promise<ChampionBuild | undefined> {
    return this.championBuilds.find(
      build => build.championId === championId && build.lane === lane
    );
  }
  
  // Helper to initialize champion build data
  initializeChampionBuilds(buildsData: ChampionBuild[]): void {
    this.championBuilds = buildsData;
  }
}

export const storage = new MemStorage();
