import { apiRequest } from "@/lib/queryClient";

// Items cache
let itemsCache: any[] | null = null;

export async function initializeItems() {
  try {
    // If we already have the data, return it
    if (itemsCache) {
      return itemsCache;
    }
    
    // First check if we have our own API data
    const response = await apiRequest("GET", "/api/items?ids=1001,1004,1036,1037,1038,1052,1053,1054,1055,1056,1058,3001,3003,3006,3026,3028,3031,3033,3036,3040,3042,3046,3065,3071,3074,3085,3089,3091,3094,3100,3102,3115,3116,3135,3139,3142,3143,3153,3157,3179,4628,4629,4637,4645");
    const itemsData = await response.json();
    
    if (itemsData && itemsData.length > 0) {
      itemsCache = itemsData;
      return itemsData;
    }
    
    // If not, use hardcoded item data
    console.log("Using hardcoded item data since API is not available");
    itemsCache = mockItems;
    return mockItems;
  } catch (error) {
    console.error("Failed to initialize items:", error);
    // Fallback to hardcoded data
    itemsCache = mockItems;
    return mockItems;
  }
}

export async function getItems() {
  if (!itemsCache) {
    return initializeItems();
  }
  return itemsCache;
}

export async function getItemById(id: number) {
  const items = await getItems();
  return items.find(item => item.id === id);
}

// Mock item data for fallback
const mockItems = [
  {
    id: 1001,
    name: "Boots of Speed",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/1001.png",
    description: "+25 Movement Speed",
    stats: { moveSpeed: 25 }
  },
  {
    id: 1004,
    name: "Faerie Charm",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/1004.png",
    description: "+50% Base Mana Regen",
    stats: { manaRegen: 50 }
  },
  {
    id: 1036,
    name: "Long Sword",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/1036.png",
    description: "+10 Attack Damage",
    stats: { attackDamage: 10 }
  },
  {
    id: 1037,
    name: "Pickaxe",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/1037.png",
    description: "+25 Attack Damage",
    stats: { attackDamage: 25 }
  },
  {
    id: 1038,
    name: "B. F. Sword",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/1038.png",
    description: "+40 Attack Damage",
    stats: { attackDamage: 40 }
  },
  {
    id: 1052,
    name: "Amplifying Tome",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/1052.png",
    description: "+20 Ability Power",
    stats: { abilityPower: 20 }
  },
  {
    id: 1053,
    name: "Vampiric Scepter",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/1053.png",
    description: "+15 Attack Damage, +10% Life Steal",
    stats: { attackDamage: 15, lifeSteal: 10 }
  },
  {
    id: 1054,
    name: "Doran's Shield",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/1054.png",
    description: "+80 Health, Passive: Regenerate health over time",
    stats: { health: 80 }
  },
  {
    id: 1055,
    name: "Doran's Blade",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/1055.png",
    description: "+8 Attack Damage, +80 Health, +2.5% Life Steal",
    stats: { attackDamage: 8, health: 80, lifeSteal: 2.5 }
  },
  {
    id: 1056,
    name: "Doran's Ring",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/1056.png",
    description: "+15 Ability Power, +70 Health, +5 Mana per 5 seconds",
    stats: { abilityPower: 15, health: 70, manaRegen: 5 }
  },
  {
    id: 1058,
    name: "Needlessly Large Rod",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/1058.png",
    description: "+60 Ability Power",
    stats: { abilityPower: 60 }
  },
  {
    id: 3001,
    name: "Abyssal Mask",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3001.png",
    description: "+350 Health, +60 Magic Resist, +10 Ability Haste, Aura: Reduce nearby enemy champion Magic Resist",
    stats: { health: 350, magicResist: 60, abilityHaste: 10 }
  },
  {
    id: 3003,
    name: "Archangel's Staff",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3003.png",
    description: "+65 Ability Power, +500 Mana, +200 Health, +20 Ability Haste, Passive: Gain Ability Power based on Mana",
    stats: { abilityPower: 65, mana: 500, health: 200, abilityHaste: 20 }
  },
  {
    id: 3006,
    name: "Berserker's Greaves",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3006.png",
    description: "+35% Attack Speed, +45 Movement Speed",
    stats: { attackSpeed: 35, moveSpeed: 45 }
  },
  {
    id: 3026,
    name: "Guardian Angel",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3026.png",
    description: "+45 Attack Damage, +40 Armor, Passive: Upon taking lethal damage, revive with 50% Health and 30% Mana",
    stats: { attackDamage: 45, armor: 40 }
  },
  {
    id: 3031,
    name: "Infinity Edge",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3031.png",
    description: "+70 Attack Damage, +20% Critical Strike Chance, Passive: Critical strikes deal 175% damage instead of 200%",
    stats: { attackDamage: 70, critChance: 20 }
  },
  {
    id: 3033,
    name: "Mortal Reminder",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3033.png",
    description: "+20 Attack Damage, +25% Attack Speed, +20% Critical Strike Chance, Passive: Dealing physical damage applies Grievous Wounds to enemy champions",
    stats: { attackDamage: 20, attackSpeed: 25, critChance: 20 }
  },
  {
    id: 3036,
    name: "Lord Dominik's Regards",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3036.png",
    description: "+30 Attack Damage, +20% Critical Strike Chance, Passive: Deal bonus physical damage based on target's max Health, +30% Armor Penetration",
    stats: { attackDamage: 30, critChance: 20, armorPen: 30 }
  },
  {
    id: 3042,
    name: "Muramana",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3042.png",
    description: "+35 Attack Damage, +865 Mana, +15 Ability Haste, Passive: Basic attacks deal bonus physical damage and abilities deal bonus physical damage based on max Mana",
    stats: { attackDamage: 35, mana: 865, abilityHaste: 15 }
  },
  {
    id: 3046,
    name: "Phantom Dancer",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3046.png",
    description: "+20 Attack Damage, +25% Attack Speed, +20% Critical Strike Chance, +7% Movement Speed, Passive: Basic attacks grant ghosting and bonus movement speed",
    stats: { attackDamage: 20, attackSpeed: 25, critChance: 20, moveSpeed: 7 }
  },
  {
    id: 3071,
    name: "Black Cleaver",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3071.png",
    description: "+40 Attack Damage, +400 Health, +20 Ability Haste, Passive: Dealing physical damage to enemy champions reduces their Armor",
    stats: { attackDamage: 40, health: 400, abilityHaste: 20 }
  },
  {
    id: 3085,
    name: "Runaan's Hurricane",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3085.png",
    description: "+40% Attack Speed, +20% Critical Strike Chance, +7% Movement Speed, Passive: Basic attacks fire bolts at nearby enemies",
    stats: { attackSpeed: 40, critChance: 20, moveSpeed: 7 }
  },
  {
    id: 3089,
    name: "Rabadon's Deathcap",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3089.png",
    description: "+120 Ability Power, Passive: Increases your Ability Power by 35%",
    stats: { abilityPower: 120 }
  },
  {
    id: 3094,
    name: "Rapid Firecannon",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3094.png",
    description: "+35% Attack Speed, +20% Critical Strike Chance, +7% Movement Speed, Passive: Moving and attacking builds Energy stacks, which increase attack range",
    stats: { attackSpeed: 35, critChance: 20, moveSpeed: 7 }
  },
  {
    id: 3100,
    name: "Lich Bane",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3100.png",
    description: "+75 Ability Power, +8% Movement Speed, +15 Ability Haste, Passive: After using an ability, your next basic attack deals bonus damage",
    stats: { abilityPower: 75, moveSpeed: 8, abilityHaste: 15 }
  },
  {
    id: 3115,
    name: "Nashor's Tooth",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3115.png",
    description: "+100 Ability Power, +50% Attack Speed, Passive: Basic attacks deal additional magic damage on-hit",
    stats: { abilityPower: 100, attackSpeed: 50 }
  },
  {
    id: 3116,
    name: "Rylai's Crystal Scepter",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3116.png",
    description: "+75 Ability Power, +400 Health, Passive: Abilities slow enemies by 30% for 1 second",
    stats: { abilityPower: 75, health: 400 }
  },
  {
    id: 3135,
    name: "Void Staff",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3135.png",
    description: "+65 Ability Power, +40% Magic Penetration",
    stats: { abilityPower: 65, magicPen: 40 }
  },
  {
    id: 3139,
    name: "Mercurial Scimitar",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3139.png",
    description: "+40 Attack Damage, +20% Critical Strike Chance, +50 Magic Resist, Active: Removes all crowd control effects",
    stats: { attackDamage: 40, critChance: 20, magicResist: 50 }
  },
  {
    id: 3142,
    name: "Youmuu's Ghostblade",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3142.png",
    description: "+55 Attack Damage, +18 Lethality, +15 Ability Haste, Active: Gain Movement Speed for a short duration",
    stats: { attackDamage: 55, lethality: 18, abilityHaste: 15 }
  },
  {
    id: 3143,
    name: "Randuin's Omen",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3143.png",
    description: "+250 Health, +80 Armor, Passive: Reduces damage from critical strikes, Active: Slows nearby enemies",
    stats: { health: 250, armor: 80 }
  },
  {
    id: 3153,
    name: "Blade of the Ruined King",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3153.png",
    description: "+40 Attack Damage, +25% Attack Speed, +8% Life Steal, Passive: Basic attacks deal bonus damage based on target's current Health, Active: Steal Movement Speed",
    stats: { attackDamage: 40, attackSpeed: 25, lifeSteal: 8 }
  },
  {
    id: 3157,
    name: "Zhonya's Hourglass",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3157.png",
    description: "+65 Ability Power, +45 Armor, +10 Ability Haste, Active: Put yourself in stasis for 2.5 seconds (golden statue)",
    stats: { abilityPower: 65, armor: 45, abilityHaste: 10 }
  },
  {
    id: 3179,
    name: "Umbral Glaive",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3179.png",
    description: "+50 Attack Damage, +10 Lethality, +15 Ability Haste, Passive: Detect and disable enemy wards",
    stats: { attackDamage: 50, lethality: 10, abilityHaste: 15 }
  },
  {
    id: 4628,
    name: "Horizon Focus",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/4628.png",
    description: "+85 Ability Power, +15 Ability Haste, Passive: Damaging champions with abilities from over 700 range reveals them and increases your damage",
    stats: { abilityPower: 85, abilityHaste: 15 }
  },
  {
    id: 4629,
    name: "Cosmic Drive",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/4629.png",
    description: "+60 Ability Power, +30 Ability Haste, +5% Movement Speed, +200 Health, Passive: Damaging champions grants bonus Movement Speed",
    stats: { abilityPower: 60, abilityHaste: 30, moveSpeed: 5, health: 200 }
  },
  {
    id: 4637,
    name: "Demonic Embrace",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/4637.png",
    description: "+70 Ability Power, +350 Health, Passive: Abilities burn enemies for % max health damage, Convert bonus Health to Ability Power",
    stats: { abilityPower: 70, health: 350 }
  },
  {
    id: 4645,
    name: "Shadowflame",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/4645.png",
    description: "+100 Ability Power, +200 Health, Passive: Gain Magic Penetration against low Health targets and targets with shields",
    stats: { abilityPower: 100, health: 200 }
  },
  {
    id: 6653,
    name: "Liandry's Anguish",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/6653.png",
    description: "+80 Ability Power, +600 Mana, +20 Ability Haste, Passive: Deal bonus damage over time, gain bonus damage against high-health targets",
    stats: { abilityPower: 80, mana: 600, abilityHaste: 20 }
  },
  {
    id: 6655,
    name: "Luden's Tempest",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/6655.png",
    description: "+80 Ability Power, +600 Mana, +20 Ability Haste, +6 Magic Penetration, Passive: Damaging an enemy with an ability deals additional magic damage",
    stats: { abilityPower: 80, mana: 600, abilityHaste: 20, magicPen: 6 }
  },
  {
    id: 6671,
    name: "Galeforce",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/6671.png",
    description: "+60 Attack Damage, +20% Attack Speed, +20% Critical Strike Chance, Mythic Passive: Grants all other Legendary items +2% Movement Speed, Active: Dash and fire bullets at enemies",
    stats: { attackDamage: 60, attackSpeed: 20, critChance: 20 }
  },
  {
    id: 6672,
    name: "Kraken Slayer",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/6672.png",
    description: "+65 Attack Damage, +25% Attack Speed, +20% Critical Strike Chance, Mythic Passive: Grants all other Legendary items +10% Attack Speed, Passive: Every third attack deals true damage",
    stats: { attackDamage: 65, attackSpeed: 25, critChance: 20 }
  },
  {
    id: 6673,
    name: "Immortal Shieldbow",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/6673.png",
    description: "+55 Attack Damage, +20% Attack Speed, +20% Critical Strike Chance, +10% Life Steal, Mythic Passive: Grants all other Legendary items +5 Attack Damage and +50 Health, Passive: When taking damage that would reduce you below 30% Health, gain a shield",
    stats: { attackDamage: 55, attackSpeed: 20, critChance: 20, lifeSteal: 10 }
  },
  {
    id: 6675,
    name: "Navori Quickblades",
    imagePath: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/6675.png",
    description: "+60 Attack Damage, +20% Critical Strike Chance, +30 Ability Haste, Passive: Critical strikes reduce basic ability cooldowns",
    stats: { attackDamage: 60, critChance: 20, abilityHaste: 30 }
  }
];
