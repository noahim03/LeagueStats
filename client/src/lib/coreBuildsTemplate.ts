// Template for core runes and items for each champion
// Use champion names as they appear in Data Dragon (e.g., 'Poppy', 'Fiora', 'Yasuo', 'Yone')
// Fill in the rune and item IDs for each champion you want to support
// Get rune IDs from Data Dragon runesReforged.json or sites like u.gg/op.gg
// Get item IDs from Data Dragon item.json or sites like u.gg/op.gg

export const coreRunes: Record<string, number[]> = {
  // Example: Poppy (Top)
  Poppy: [8437, 8463, 8444, 8453, 8345, 8352], // Aftershock, Font of Life, Second Wind, Unflinching, Biscuit Delivery, Approach Velocity
  // Example: Fiora (Top)
  Fiora: [8005, 9111, 9104, 8014, 8345, 8352], // Press the Attack, Triumph, Legend: Alacrity, Last Stand, Biscuit Delivery, Approach Velocity
  // Example: Yasuo (Mid/Top)
  Yasuo: [8008, 9111, 9104, 8014, 8345, 8401], // Lethal Tempo, Triumph, Legend: Alacrity, Last Stand, Biscuit Delivery, Magical Footwear
  // Example: Yone (Mid/Top)
  Yone: [8008, 9111, 9104, 8014, 8345, 8401], // Lethal Tempo, Triumph, Legend: Alacrity, Last Stand, Biscuit Delivery, Magical Footwear
  // Add more champions below:
  // ChampionName: [runeId1, runeId2, ...],
};

export const coreItems: Record<string, number[]> = {
  // Example: Poppy (Top)
  Poppy: [3068, 3047, 3075, 4401, 3193], // Sunfire Aegis, Plated Steelcaps, Thornmail, Force of Nature, Gargoyle Stoneplate
  // Example: Fiora (Top)
  Fiora: [6630, 3071, 3047, 6333, 3074], // Goredrinker, Black Cleaver, Plated Steelcaps, Death's Dance, Ravenous Hydra
  // Example: Yasuo (Mid/Top)
  Yasuo: [3031, 3006, 6673, 3091, 3072], // Infinity Edge, Berserker's Greaves, Immortal Shieldbow, Wit's End, Bloodthirster
  // Example: Yone (Mid/Top)
  Yone: [3031, 3006, 6673, 3091, 3072], // Infinity Edge, Berserker's Greaves, Immortal Shieldbow, Wit's End, Bloodthirster
  // Add more champions below:
  // ChampionName: [itemId1, itemId2, ...],
}; 