import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model (keeping original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Champion model
export const champions = pgTable("champions", {
  id: text("id").primaryKey(), // Champion ID from Riot API
  name: text("name").notNull(),
  title: text("title").notNull(),
  imagePath: text("image_path").notNull(),
  roles: text("roles").array().notNull(),
});

export const insertChampionSchema = createInsertSchema(champions);
export type InsertChampion = z.infer<typeof insertChampionSchema>;
export type Champion = typeof champions.$inferSelect;

// Matchup model
export const matchups = pgTable("matchups", {
  id: serial("id").primaryKey(),
  enemyChampionId: text("enemy_champion_id").notNull().references(() => champions.id),
  counterChampionId: text("counter_champion_id").notNull().references(() => champions.id),
  lane: text("lane").notNull(),
  winRate: integer("win_rate").notNull(),
  difficulty: text("difficulty").notNull(),
  explanation: text("explanation").notNull()
});

export const insertMatchupSchema = createInsertSchema(matchups).omit({ id: true });
export type InsertMatchup = z.infer<typeof insertMatchupSchema>;
export type Matchup = typeof matchups.$inferSelect;

// Item model
export const items = pgTable("items", {
  id: integer("id").primaryKey(), // Item ID from Riot API
  name: text("name").notNull(),
  imagePath: text("image_path").notNull(),
  description: text("description").notNull(),
  stats: jsonb("stats").notNull()
});

export const insertItemSchema = createInsertSchema(items);
export type InsertItem = z.infer<typeof insertItemSchema>;
export type Item = typeof items.$inferSelect;

// Champion builds model
export const championBuilds = pgTable("champion_builds", {
  id: serial("id").primaryKey(),
  championId: text("champion_id").notNull().references(() => champions.id),
  lane: text("lane").notNull(),
  startingItems: integer("starting_items").array().notNull(),
  coreItems: integer("core_items").array().notNull(),
  situationalItems: integer("situational_items").array().notNull()
});

export const insertChampionBuildSchema = createInsertSchema(championBuilds).omit({ id: true });
export type InsertChampionBuild = z.infer<typeof insertChampionBuildSchema>;
export type ChampionBuild = typeof championBuilds.$inferSelect;

// Lane types
export const laneSchema = z.enum(["top", "jungle", "mid", "adc", "support"]);
export type Lane = z.infer<typeof laneSchema>;

// Counter difficulty types
export const difficultySchema = z.enum(["easy", "medium", "hard"]);
export type Difficulty = z.infer<typeof difficultySchema>;
