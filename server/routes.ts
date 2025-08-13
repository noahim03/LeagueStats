import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";
import { z } from "zod";
import { laneSchema } from "@shared/schema";

// Riot API region and version constants
const RIOT_API_KEY = process.env.RIOT_API_KEY || "";
const RIOT_API_REGION = "na1"; // North America region
const LEAGUE_VERSION = "13.24.1"; // Update this as needed

// Middleware to check if Riot API key is provided
const checkRiotApiKey = (req: Request, res: Response, next: Function) => {
  if (!RIOT_API_KEY) {
    res.status(500).json({ message: "Riot API key not configured" });
    return;
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up API routes with /api prefix
  
  // Get all champions endpoint
  app.get("/api/champions", async (req: Request, res: Response) => {
    try {
      const champions = await storage.getAllChampions();
      res.json(champions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch champions", error: String(error) });
    }
  });
  
  // Get champion by ID endpoint
  app.get("/api/champions/:id", async (req: Request, res: Response) => {
    try {
      const champion = await storage.getChampionById(req.params.id);
      if (!champion) {
        return res.status(404).json({ message: "Champion not found" });
      }
      res.json(champion);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch champion", error: String(error) });
    }
  });
  
  // Get matchups by enemy champion and lane
  app.get("/api/matchups", async (req: Request, res: Response) => {
    try {
      const enemyChampionId = req.query.enemyChampionId?.toString();
      const lane = req.query.lane?.toString();
      
      if (!enemyChampionId || !lane) {
        return res.status(400).json({ message: "enemyChampionId and lane are required" });
      }
      
      // Validate lane parameter
      try {
        laneSchema.parse(lane);
      } catch (error) {
        return res.status(400).json({ message: "Invalid lane parameter" });
      }
      
      const matchups = await storage.getMatchupsByEnemyAndLane(enemyChampionId, lane as any);
      
      // For each matchup, get the champion details
      const result = await Promise.all(matchups.map(async (matchup) => {
        const counterChampion = await storage.getChampionById(matchup.counterChampionId);
        return {
          ...matchup,
          counterChampion
        };
      }));
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch matchups", error: String(error) });
    }
  });
  
  // Get items by ID
  app.get("/api/items", async (req: Request, res: Response) => {
    try {
      const itemIds = req.query.ids?.toString().split(",").map(id => parseInt(id));
      
      if (!itemIds || !itemIds.length) {
        return res.status(400).json({ message: "Item IDs are required" });
      }
      
      const items = await storage.getItemsById(itemIds);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch items", error: String(error) });
    }
  });
  
  // Get champion build
  app.get("/api/builds/:championId", async (req: Request, res: Response) => {
    try {
      const championId = req.params.championId;
      const lane = req.query.lane?.toString();
      
      if (!lane) {
        return res.status(400).json({ message: "lane parameter is required" });
      }
      
      // Validate lane parameter
      try {
        laneSchema.parse(lane);
      } catch (error) {
        return res.status(400).json({ message: "Invalid lane parameter" });
      }
      
      const build = await storage.getChampionBuild(championId, lane as any);
      
      if (!build) {
        return res.status(404).json({ message: "Build not found" });
      }
      
      // Get item details
      const startingItems = await storage.getItemsById(build.startingItems);
      const coreItems = await storage.getItemsById(build.coreItems);
      const situationalItems = await storage.getItemsById(build.situationalItems);
      
      res.json({
        ...build,
        startingItems,
        coreItems,
        situationalItems
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch build", error: String(error) });
    }
  });
  
  // Riot API proxy endpoint - Get champion data
  app.get("/api/riot/champions", checkRiotApiKey, async (req: Request, res: Response) => {
    try {
      const response = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${LEAGUE_VERSION}/data/en_US/champion.json`
      );
      
      res.json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        res.status(error.response?.status || 500).json({ 
          message: "Failed to fetch from Riot API", 
          error: error.response?.data || error.message 
        });
      } else {
        res.status(500).json({ message: "Failed to fetch from Riot API", error: String(error) });
      }
    }
  });
  
  // Riot API proxy endpoint - Get specific champion data
  app.get("/api/riot/champions/:id", checkRiotApiKey, async (req: Request, res: Response) => {
    try {
      const response = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${LEAGUE_VERSION}/data/en_US/champion/${req.params.id}.json`
      );
      
      res.json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        res.status(error.response?.status || 500).json({ 
          message: "Failed to fetch from Riot API", 
          error: error.response?.data || error.message 
        });
      } else {
        res.status(500).json({ message: "Failed to fetch from Riot API", error: String(error) });
      }
    }
  });
  
  // Riot API proxy endpoint - Get item data
  app.get("/api/riot/items", checkRiotApiKey, async (req: Request, res: Response) => {
    try {
      const response = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${LEAGUE_VERSION}/data/en_US/item.json`
      );
      
      res.json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        res.status(error.response?.status || 500).json({ 
          message: "Failed to fetch from Riot API", 
          error: error.response?.data || error.message 
        });
      } else {
        res.status(500).json({ message: "Failed to fetch from Riot API", error: String(error) });
      }
    }
  });

  // Riot API proxy endpoint - Champion Mastery by summoner and champion
  app.get("/api/riot/champion-mastery/:summonerId/by-champion/:championId", checkRiotApiKey, async (req: Request, res: Response) => {
    try {
      const { summonerId, championId } = req.params;
      const url = `https://${RIOT_API_REGION}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/by-champion/${championId}`;
      const response = await axios.get(url, {
        headers: { "X-Riot-Token": RIOT_API_KEY }
      });
      res.json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        res.status(error.response?.status || 500).json({ 
          message: "Failed to fetch from Riot API", 
          error: error.response?.data || error.message 
        });
      } else {
        res.status(500).json({ message: "Failed to fetch from Riot API", error: String(error) });
      }
    }
  });
  
  const httpServer = createServer(app);

  return httpServer;
}
