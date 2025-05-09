export interface Rune {
  id: string;
  name: string;
  description: string;
  path: "Precision" | "Domination" | "Sorcery" | "Resolve" | "Inspiration";
  slot: "keystone" | "primary" | "secondary";
  recommendedChampions: string[];
}

export const runes: Rune[] = [
  // Precision Keystones
  {
    id: "conqueror",
    name: "Conqueror",
    description: "Gain stacks of adaptive force when attacking enemy champions. At max stacks, heal for a portion of damage dealt.",
    path: "Precision",
    slot: "keystone",
    recommendedChampions: ["aatrox", "darius", "fiora", "irelia", "jax", "riven", "renekton"]
  },
  {
    id: "lethal-tempo",
    name: "Lethal Tempo",
    description: "Gain attack speed when attacking enemy champions. At max stacks, gain bonus attack range.",
    path: "Precision",
    slot: "keystone",
    recommendedChampions: ["jinx", "kogmaw", "tristana", "vayne", "yasuo", "yone"]
  },
  {
    id: "fleet-footwork",
    name: "Fleet Footwork",
    description: "Attacking and moving builds energy stacks. At 100 stacks, your next attack heals you and grants movement speed.",
    path: "Precision",
    slot: "keystone",
    recommendedChampions: ["caitlyn", "ezreal", "lucian", "sivir", "xayah"]
  },

  // Domination Keystones
  {
    id: "electrocute",
    name: "Electrocute",
    description: "Hitting a champion with 3 separate attacks or abilities within 3 seconds deals bonus adaptive damage.",
    path: "Domination",
    slot: "keystone",
    recommendedChampions: ["ahri", "akali", "fizz", "leblanc", "zed"]
  },
  {
    id: "dark-harvest",
    name: "Dark Harvest",
    description: "Damaging champions below 50% health deals bonus adaptive damage and permanently increases the damage.",
    path: "Domination",
    slot: "keystone",
    recommendedChampions: ["karthus", "kha'zix", "pyke", "shaco", "thresh"]
  },
  {
    id: "hail-of-blades",
    name: "Hail of Blades",
    description: "Gain 110% attack speed for your first 3 attacks against enemy champions.",
    path: "Domination",
    slot: "keystone",
    recommendedChampions: ["draven", "kalista", "rengar", "twitch", "varus"]
  },

  // Sorcery Keystones
  {
    id: "arcane-comet",
    name: "Arcane Comet",
    description: "Damaging an enemy champion with an ability sends a comet at their location.",
    path: "Sorcery",
    slot: "keystone",
    recommendedChampions: ["lux", "xerath", "ziggs", "zyra"]
  },
  {
    id: "phase-rush",
    name: "Phase Rush",
    description: "Hitting an enemy champion with 3 separate attacks or abilities grants movement speed and slow resistance.",
    path: "Sorcery",
    slot: "keystone",
    recommendedChampions: ["darius", "garen", "nasus", "olaf", "ryze"]
  },
  {
    id: "summon-aery",
    name: "Summon Aery",
    description: "Your attacks and abilities send Aery to a target, dealing damage to enemies or shielding allies.",
    path: "Sorcery",
    slot: "keystone",
    recommendedChampions: ["karma", "lulu", "nami", "soraka", "sona"]
  },

  // Resolve Keystones
  {
    id: "grasp-of-the-undying",
    name: "Grasp of the Undying",
    description: "Every 4 seconds, your next attack against a champion deals bonus damage, heals you, and permanently increases your health.",
    path: "Resolve",
    slot: "keystone",
    recommendedChampions: ["cho'gath", "malphite", "ornn", "poppy", "shen"]
  },
  {
    id: "aftershock",
    name: "Aftershock",
    description: "After immobilizing an enemy champion, gain bonus armor and magic resist, then deal damage around you.",
    path: "Resolve",
    slot: "keystone",
    recommendedChampions: ["alistar", "leona", "nautilus", "rakan", "thresh"]
  },
  {
    id: "guardian",
    name: "Guardian",
    description: "Guard allies you cast spells on and those that are very nearby. When you or a guarded ally would take damage, you both gain a shield.",
    path: "Resolve",
    slot: "keystone",
    recommendedChampions: ["braum", "janna", "lulu", "nami", "taric"]
  },

  // Inspiration Keystones
  {
    id: "glacial-augment",
    name: "Glacial Augment",
    description: "Your first attack against an enemy champion slows them. Slowing them with active items shoots a freeze ray at them.",
    path: "Inspiration",
    slot: "keystone",
    recommendedChampions: ["senna", "sion", "tahm-kench", "veigar"]
  },
  {
    id: "unsealed-spellbook",
    name: "Unsealed Spellbook",
    description: "Swap one of your equipped summoner spells to another one. The first swap is available at 6 minutes.",
    path: "Inspiration",
    slot: "keystone",
    recommendedChampions: ["bard", "ivern", "karma", "nidalee", "twisted-fate"]
  },
  {
    id: "first-strike",
    name: "First Strike",
    description: "Deal 10% more damage for 3 seconds when damaging an enemy champion before they damage you, and gain gold.",
    path: "Inspiration",
    slot: "keystone",
    recommendedChampions: ["gangplank", "jayce", "kassadin", "viktor", "vladimir"]
  }
]; 