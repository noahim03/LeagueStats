export interface Item {
  id: string;
  name: string;
  description: string;
  category: "Tank" | "Fighter" | "Mage" | "Assassin" | "Marksman" | "Support" | "Consumable" | "Boots" | "Jungle";
  stats: {
    health?: number;
    armor?: number;
    magicResist?: number;
    attackDamage?: number;
    abilityPower?: number;
    attackSpeed?: number;
    criticalStrike?: number;
    cooldownReduction?: number;
    mana?: number;
    manaRegen?: number;
    healthRegen?: number;
    movementSpeed?: number;
    lethality?: number;
    magicPenetration?: number;
    armorPenetration?: number;
    lifeSteal?: number;
    spellVamp?: number;
    tenacity?: number;
  };
  price: number;
  tier: 1 | 2 | 3 | 4 | 5;
  buildPath?: string[];
}

export const items: Item[] = [
  // Tank Items
  {
    id: "sunfire-aegis",
    name: "Sunfire Aegis",
    description: "Grants health, armor, and magic resist. Deals magic damage to nearby enemies.",
    category: "Tank",
    stats: {
      health: 500,
      armor: 30,
      magicResist: 30
    },
    price: 3200,
    tier: 3,
    buildPath: ["bamis-cinder", "wardens-mail", "null-magic-mantle"]
  },
  {
    id: "thornmail",
    name: "Thornmail",
    description: "Reflects damage back to attackers and applies grievous wounds.",
    category: "Tank",
    stats: {
      armor: 60,
      health: 350
    },
    price: 2700,
    tier: 3,
    buildPath: ["wardens-mail", "bramble-vest"]
  },

  // Fighter Items
  {
    id: "trinity-force",
    name: "Trinity Force",
    description: "Grants attack damage, attack speed, and ability haste. Empowers next attack after using an ability.",
    category: "Fighter",
    stats: {
      attackDamage: 35,
      attackSpeed: 30,
      health: 300,
      mana: 300,
      cooldownReduction: 20
    },
    price: 3333,
    tier: 3,
    buildPath: ["sheen", "phage", "stinger"]
  },
  {
    id: "divine-sunderer",
    name: "Divine Sunderer",
    description: "Deals bonus damage based on target's maximum health and heals for a portion of the damage dealt.",
    category: "Fighter",
    stats: {
      attackDamage: 40,
      health: 400,
      cooldownReduction: 20
    },
    price: 3300,
    tier: 3,
    buildPath: ["sheen", "kindlegem", "caulfields-warhammer"]
  },

  // Mage Items
  {
    id: "ludens-tempest",
    name: "Luden's Tempest",
    description: "Deals bonus magic damage and grants movement speed after using abilities.",
    category: "Mage",
    stats: {
      abilityPower: 80,
      mana: 600,
      cooldownReduction: 20,
      magicPenetration: 6
    },
    price: 3200,
    tier: 3,
    buildPath: ["lost-chapter", "blasting-wand"]
  },
  {
    id: "rabadons-deathcap",
    name: "Rabadon's Deathcap",
    description: "Increases ability power by 35%.",
    category: "Mage",
    stats: {
      abilityPower: 120
    },
    price: 3600,
    tier: 3,
    buildPath: ["needlessly-large-rod", "needlessly-large-rod"]
  },

  // Assassin Items
  {
    id: "duskblade-of-draktharr",
    name: "Duskblade of Draktharr",
    description: "Grants invisibility after killing an enemy champion.",
    category: "Assassin",
    stats: {
      attackDamage: 55,
      lethality: 18,
      cooldownReduction: 20
    },
    price: 3100,
    tier: 3,
    buildPath: ["serrated-dirk", "caulfields-warhammer"]
  },
  {
    id: "youmuus-ghostblade",
    name: "Youmuu's Ghostblade",
    description: "Grants movement speed and attack speed when activated.",
    category: "Assassin",
    stats: {
      attackDamage: 55,
      lethality: 18,
      cooldownReduction: 15
    },
    price: 3000,
    tier: 3,
    buildPath: ["serrated-dirk", "caulfields-warhammer"]
  },

  // Marksman Items
  {
    id: "infinity-edge",
    name: "Infinity Edge",
    description: "Increases critical strike damage by 35%.",
    category: "Marksman",
    stats: {
      attackDamage: 70,
      criticalStrike: 20
    },
    price: 3400,
    tier: 3,
    buildPath: ["bf-sword", "cloak-of-agility", "cloak-of-agility"]
  },
  {
    id: "kraken-slayer",
    name: "Kraken Slayer",
    description: "Every third attack deals bonus true damage.",
    category: "Marksman",
    stats: {
      attackDamage: 65,
      attackSpeed: 25,
      criticalStrike: 20
    },
    price: 3400,
    tier: 3,
    buildPath: ["noonquiver", "cloak-of-agility", "cloak-of-agility"]
  },

  // Support Items
  {
    id: "ardent-censer",
    name: "Ardent Censer",
    description: "Empowers allies with attack speed and on-hit magic damage when shielded or healed.",
    category: "Support",
    stats: {
      abilityPower: 60,
      manaRegen: 100,
      cooldownReduction: 10
    },
    price: 2300,
    tier: 3,
    buildPath: ["forbidden-idol", "amplifying-tome"]
  },
  {
    id: "mikaels-blessing",
    name: "Mikael's Blessing",
    description: "Removes all crowd control effects from an ally and heals them.",
    category: "Support",
    stats: {
      magicResist: 50,
      manaRegen: 100,
      cooldownReduction: 20
    },
    price: 2300,
    tier: 3,
    buildPath: ["chalice-of-harmony", "forbidden-idol"]
  }
]; 