import { apiRequest } from "@/lib/queryClient";

// Runes data types
export interface RunePath {
  id: number;
  name: string;
  icon: string;
}

export interface Rune {
  id: number;
  name: string;
  icon: string;
  description: string;
  pathId: number;
}

export interface RuneSet {
  primaryPathId: number;
  primaryRunes: number[];
  secondaryPathId: number;
  secondaryRunes: number[];
  statRunes: number[];
}

export interface ChampionRunes {
  championId: string;
  lane: string;
  runeSets: RuneSet[];
}

// Rune paths
export const runePaths: RunePath[] = [
  { id: 8000, name: "Precision", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png" },
  { id: 8100, name: "Domination", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png" },
  { id: 8200, name: "Sorcery", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png" },
  { id: 8300, name: "Inspiration", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7203_Inspiration.png" },
  { id: 8400, name: "Resolve", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png" }
];

// Precision runes
export const precisionRunes: Rune[] = [
  // Keystones
  { id: 8005, name: "Press the Attack", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png", description: "Hitting an enemy champion 3 consecutive times makes them vulnerable, dealing bonus damage and increasing damage they take from all sources.", pathId: 8000 },
  { id: 8008, name: "Lethal Tempo", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png", description: "After attacking a champion, gain attack speed. Attacking while at max attack speed temporarily increases your attack speed cap.", pathId: 8000 },
  { id: 8021, name: "Fleet Footwork", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png", description: "Moving and attacking generates Energized stacks. At full stacks, your next attack heals you and grants movement speed.", pathId: 8000 },
  { id: 8010, name: "Conqueror", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Conqueror/Conqueror.png", description: "Damaging enemy champions stacks Adaptive Force. At max stacks, heal for a portion of damage dealt to champions.", pathId: 8000 },
  
  // Slot 1
  { id: 9101, name: "Overheal", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Overheal/Overheal.png", description: "Excess healing on you becomes a shield.", pathId: 8000 },
  { id: 9111, name: "Triumph", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Triumph/Triumph.png", description: "Champion takedowns restore health and grant bonus gold.", pathId: 8000 },
  { id: 8009, name: "Presence of Mind", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png", description: "Champion takedowns restore mana or energy and increase energy regeneration.", pathId: 8000 },
  
  // Slot 2
  { id: 9104, name: "Legend: Alacrity", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png", description: "Takedowns on enemies grant permanent Attack Speed.", pathId: 8000 },
  { id: 9105, name: "Legend: Tenacity", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LegendTenacity/LegendTenacity.png", description: "Takedowns on enemies grant permanent Tenacity.", pathId: 8000 },
  { id: 9103, name: "Legend: Bloodline", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png", description: "Takedowns on enemies grant permanent Life Steal.", pathId: 8000 },
  
  // Slot 3
  { id: 8014, name: "Coup de Grace", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png", description: "Deal more damage to low health enemy champions.", pathId: 8000 },
  { id: 8017, name: "Cut Down", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/CutDown/CutDown.png", description: "Deal more damage to champions with more max health than you.", pathId: 8000 },
  { id: 8299, name: "Last Stand", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LastStand/LastStand.png", description: "Deal more damage to champions while you are low on health.", pathId: 8000 }
];

// Domination runes
export const dominationRunes: Rune[] = [
  // Keystones
  { id: 8112, name: "Electrocute", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Electrocute/Electrocute.png", description: "Hitting a champion with 3 separate attacks or abilities within 3 seconds deals bonus adaptive damage.", pathId: 8100 },
  { id: 8124, name: "Predator", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Predator/Predator.png", description: "Add an active effect to your boots that grants a large movement speed boost and causes your next attack or ability to deal bonus adaptive damage.", pathId: 8100 },
  { id: 8128, name: "Dark Harvest", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png", description: "Damaging a low health enemy champion deals adaptive damage and harvests a soul from them.", pathId: 8100 },
  { id: 9923, name: "Hail of Blades", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png", description: "Gain a large amount of attack speed for the first 3 attacks made against enemy champions.", pathId: 8100 },

  // Slot 1
  { id: 8126, name: "Cheap Shot", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/CheapShot/CheapShot.png", description: "Deal bonus true damage to enemy champions with impaired movement or actions.", pathId: 8100 },
  { id: 8139, name: "Taste of Blood", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/TasteOfBlood/TasteOfBlood.png", description: "Heal when you damage an enemy champion.", pathId: 8100 },
  { id: 8143, name: "Sudden Impact", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png", description: "Gain Lethality and Magic Penetration after using a dash, leap, blink, teleport, or emerging from stealth.", pathId: 8100 },

  // Slot 2
  { id: 8136, name: "Zombie Ward", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/ZombieWard/ZombieWard.png", description: "When you kill an enemy ward, a friendly Zombie Ward is raised in its place. Gain Adaptive Force for each Zombie Ward active.", pathId: 8100 },
  { id: 8120, name: "Ghost Poro", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/GhostPoro/GhostPoro.png", description: "When your wards expire, they leave behind a Ghost Poro. The Ghost Poro grants vision and Adaptive Force while active.", pathId: 8100 },
  { id: 8138, name: "Eyeball Collection", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png", description: "Collect eyeballs for champion takedowns. Gain Adaptive Force per eyeball collected.", pathId: 8100 },

  // Slot 3
  { id: 8135, name: "Treasure Hunter", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/TreasureHunter/TreasureHunter.png", description: "Gain bonus gold for each unique enemy champion you kill.", pathId: 8100 },
  { id: 8134, name: "Ingenious Hunter", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/IngeniousHunter/IngeniousHunter.png", description: "Gain Item Ability Haste for each unique enemy champion you kill.", pathId: 8100 },
  { id: 8105, name: "Relentless Hunter", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png", description: "Gain out-of-combat Movement Speed for each unique enemy champion you kill.", pathId: 8100 },
  { id: 8106, name: "Ultimate Hunter", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png", description: "Gain Ultimate Ability Haste for each unique enemy champion you kill.", pathId: 8100 }
];

// Sorcery runes
export const sorceryRunes: Rune[] = [
  // Keystones
  { id: 8214, name: "Summon Aery", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/SummonAery/SummonAery.png", description: "Your attacks and abilities send Aery to a target, damaging enemies or shielding allies.", pathId: 8200 },
  { id: 8229, name: "Arcane Comet", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png", description: "Damaging a champion with an ability hurls a damaging comet at their location.", pathId: 8200 },
  { id: 8230, name: "Phase Rush", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png", description: "Hitting an enemy champion with 3 separate attacks or abilities grants a burst of Movement Speed.", pathId: 8200 },

  // Slot 1
  { id: 8224, name: "Nullifying Orb", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/NullifyingOrb/NullifyingOrb.png", description: "Gain a magic damage shield when taken to low health by magic damage.", pathId: 8200 },
  { id: 8226, name: "Manaflow Band", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png", description: "Hitting an enemy champion with an ability permanently increases your maximum mana by 25, up to 250 mana. After reaching 250 bonus mana, restore 1% of your missing mana every 5 seconds.", pathId: 8200 },
  { id: 8275, name: "Nimbus Cloak", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/NimbusCloak/NimbusCloak.png", description: "After casting a Summoner Spell, gain Movement Speed that lasts for 2.5s.", pathId: 8200 },

  // Slot 2
  { id: 8210, name: "Transcendence", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/Transcendence/Transcendence.png", description: "Gain Ability Haste as you level up. At max level, gain bonus AP or AD, on takedown.", pathId: 8200 },
  { id: 8234, name: "Celerity", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/Celerity/Celerity.png", description: "Movement Speed bonuses are 7% more effective on you and gain 1% Movement Speed.", pathId: 8200 },
  { id: 8233, name: "Absolute Focus", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/AbsoluteFocus/AbsoluteFocus.png", description: "While above 70% health, gain extra adaptive force.", pathId: 8200 },

  // Slot 3
  { id: 8237, name: "Scorch", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/Scorch/Scorch.png", description: "Your next ability hit burns champions, dealing extra damage.", pathId: 8200 },
  { id: 8232, name: "Waterwalking", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/Waterwalking/Waterwalking.png", description: "Gain Movement Speed and Adaptive Force when in the river.", pathId: 8200 },
  { id: 8236, name: "Gathering Storm", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png", description: "Gain increasing amounts of Adaptive Force every 10 min.", pathId: 8200 }
];

// Resolve runes
export const resolveRunes: Rune[] = [
  // Keystones
  { id: 8437, name: "Grasp of the Undying", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png", description: "Every 4s in combat, your next attack on a champion deals bonus magic damage, heals you, and permanently grants you health.", pathId: 8400 },
  { id: 8439, name: "Aftershock", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png", description: "After immobilizing an enemy champion, increase your Armor and Magic Resist. Then explode, dealing magic damage to nearby enemies.", pathId: 8400 },
  { id: 8465, name: "Guardian", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/Guardian/Guardian.png", description: "Guard allies you cast spells on and those that are very nearby. If you or a guarded ally would take damage, you're both granted a shield.", pathId: 8400 },

  // Slot 1
  { id: 8446, name: "Demolish", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/Demolish/Demolish.png", description: "Charge up a powerful attack against a tower while near it. The charged attack deals massive damage.", pathId: 8400 },
  { id: 8463, name: "Font of Life", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/FontOfLife/FontOfLife.png", description: "Impaired movement on enemy champions marks them. Your allies heal when attacking champions you've marked.", pathId: 8400 },
  { id: 8401, name: "Shield Bash", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/MirrorShell/MirrorShell.png", description: "Whenever you gain a shield, your next basic attack against a champion deals bonus adaptive damage.", pathId: 8400 },

  // Slot 2
  { id: 8429, name: "Conditioning", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/Conditioning/Conditioning.png", description: "After 12 min gain bonus Armor and Magic Resist and increase your Armor and Magic Resist by 5%.", pathId: 8400 },
  { id: 8444, name: "Second Wind", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/SecondWind/SecondWind.png", description: "After taking damage from an enemy champion, heal over time. Healing is increased for melee champions.", pathId: 8400 },
  { id: 8473, name: "Bone Plating", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/BonePlating/BonePlating.png", description: "After taking damage from an enemy champion, the next 3 spells or attacks you receive from them deal less damage.", pathId: 8400 },

  // Slot 3
  { id: 8451, name: "Overgrowth", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/Overgrowth/Overgrowth.png", description: "Gain permanent max health when minions or monsters die near you.", pathId: 8400 },
  { id: 8453, name: "Revitalize", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/Revitalize/Revitalize.png", description: "Heals and shields you cast or receive are 5% stronger, increased to 10% when the target is below 40% health.", pathId: 8400 },
  { id: 8242, name: "Unflinching", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/Unflinching/Unflinching.png", description: "Gain Tenacity and Slow Resistance. Gain additional Tenacity and Slow Resistance when you cast a Summoner Spell.", pathId: 8400 }
];

// Inspiration runes
export const inspirationRunes: Rune[] = [
  // Keystones
  { id: 8351, name: "Glacial Augment", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png", description: "Immobilizing an enemy champion creates a freeze field that slows other enemies around them. Your attacks slow champions, increasing the potency based on their proximity to you.", pathId: 8300 },
  { id: 8360, name: "Unsealed Spellbook", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png", description: "Swap one of your equipped Summoner Spells to a new, single use, Summoner Spell. Each unique Summoner Spell you swap to permanently decreases your swap cooldown.", pathId: 8300 },
  { id: 8358, name: "First Strike", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png", description: "When you strike a champion, if you were the first one to do so, deal bonus damage and gain gold.", pathId: 8300 },

  // Slot 1
  { id: 8306, name: "Hextech Flashtraption", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/HextechFlashtraption/HextechFlashtraption.png", description: "While Flash is on cooldown, it is replaced by Hexflash. Hexflash allows you to dash over walls by holding down Flash and then using Left-Click to dash to a new location.", pathId: 8300 },
  { id: 8304, name: "Magical Footwear", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png", description: "You get free Slightly Magical Footwear at 12 min, but you cannot buy boots before then. For each takedown you acquire, the boots arrive 45s sooner.", pathId: 8300 },
  { id: 8313, name: "Perfect Timing", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/PerfectTiming/PerfectTiming.png", description: "Start the game with a Commencing Stopwatch that transforms into a Stopwatch after 14 min. Each takedown you acquire reduces this timer by 120s.", pathId: 8300 },

  // Slot 2
  { id: 8321, name: "Future's Market", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/FuturesMarket/FuturesMarket.png", description: "You can enter debt to buy items. The lending fee is 50 gold per item, plus 5 gold per minute of game time.", pathId: 8300 },
  { id: 8316, name: "Minion Dematerializer", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/MinionDematerializer/MinionDematerializer.png", description: "Start the game with 3 Minion Dematerializers. Killing minions with the item gives permanent bonus damage to that type of minion.", pathId: 8300 },
  { id: 8345, name: "Biscuit Delivery", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/BiscuitDelivery/BiscuitDelivery.png", description: "Gain a Total Biscuit of Everlasting Will at 2 min, 4 min, 6 min, and 8 min. Biscuits restore health and mana and increase your max mana permanently.", pathId: 8300 },

  // Slot 3
  { id: 8347, name: "Cosmic Insight", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png", description: "Gain 10 Summoner Spell Haste, 10 Item Haste, and 5 Ability Haste.", pathId: 8300 },
  { id: 8410, name: "Approach Velocity", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/ApproachVelocity/ApproachVelocity.png", description: "Gain 15% movement speed when moving toward a nearby allied champion that is movement impaired or toward a nearby enemy champion that you impaired.", pathId: 8300 },
  { id: 8352, name: "Time Warp Tonic", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/TimeWarpTonic/TimeWarpTonic.png", description: "Potions, biscuits, and timewarp tonic effects restore health and/or mana immediately. Gain 5% Movement Speed while under the effect of a potion or biscuit.", pathId: 8300 }
];

// Stats runes
export const statRunes: Rune[] = [
  // Adaptive Force
  { id: 5001, name: "Adaptive Force", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsAdaptiveForceIcon.png", description: "+9 Adaptive Force", pathId: 0 },
  
  // Attack Speed
  { id: 5002, name: "Attack Speed", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsAttackSpeedIcon.png", description: "+10% Attack Speed", pathId: 0 },
  
  // Ability Haste
  { id: 5003, name: "Ability Haste", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsCDRScalingIcon.png", description: "+8 Ability Haste", pathId: 0 },

  // Armor
  { id: 5004, name: "Armor", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsArmorIcon.png", description: "+6 Armor", pathId: 0 },
  
  // Magic Resist
  { id: 5005, name: "Magic Resist", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsMagicResIcon.png", description: "+8 Magic Resist", pathId: 0 },
  
  // Health
  { id: 5006, name: "Health", icon: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsHealthScalingIcon.png", description: "+15-140 Health (based on level)", pathId: 0 }
];

// All runes combined
export const allRunes: Rune[] = [
  ...precisionRunes,
  ...dominationRunes,
  ...sorceryRunes,
  ...resolveRunes,
  ...inspirationRunes,
  ...statRunes
];

// Rune path by ID
export const getRunePathById = (id: number): RunePath | undefined => {
  return runePaths.find(path => path.id === id);
};

// Rune by ID
export const getRuneById = (id: number): Rune | undefined => {
  return allRunes.find(rune => rune.id === id);
};

// Mock champion rune data
export const mockChampionRunes: ChampionRunes[] = [
  // Darius Counters
  {
    championId: "quinn",
    lane: "top",
    runeSets: [
      {
        primaryPathId: 8100, // Domination
        primaryRunes: [8112, 8126, 8138, 8135], // Electrocute, Cheap Shot, Eyeball Collection, Treasure Hunter
        secondaryPathId: 8000, // Precision
        secondaryRunes: [9111, 8014], // Triumph, Coup de Grace
        statRunes: [5005, 5008, 5002] // Adaptive Force, Armor, Attack Speed
      }
    ]
  },
  {
    championId: "teemo",
    lane: "top",
    runeSets: [
      {
        primaryPathId: 8200, // Sorcery
        primaryRunes: [8229, 8226, 8210, 8237], // Arcane Comet, Manaflow Band, Transcendence, Scorch
        secondaryPathId: 8000, // Precision
        secondaryRunes: [9111, 8014], // Triumph, Coup de Grace
        statRunes: [5001, 5004, 5002] // Adaptive Force, Armor, Attack Speed
      }
    ]
  },
  {
    championId: "vayne",
    lane: "top",
    runeSets: [
      {
        primaryPathId: 8000, // Precision
        primaryRunes: [8005, 9111, 9104, 8014], // Press the Attack, Triumph, Legend: Alacrity, Coup de Grace
        secondaryPathId: 8200, // Sorcery
        secondaryRunes: [8226, 8233], // Manaflow Band, Absolute Focus
        statRunes: [5001, 5004, 5002] // Adaptive Force, Armor, Attack Speed
      }
    ]
  },
  
  // Viktor Counters
  {
    championId: "malzahar",
    lane: "mid",
    runeSets: [
      {
        primaryPathId: 8200, // Sorcery
        primaryRunes: [8229, 8226, 8210, 8237], // Arcane Comet, Manaflow Band, Transcendence, Scorch
        secondaryPathId: 8300, // Inspiration
        secondaryRunes: [8304, 8347], // Magical Footwear, Cosmic Insight
        statRunes: [5001, 5004, 5007] // Adaptive Force, Armor, Magic Resist
      }
    ]
  },
  {
    championId: "kassadin",
    lane: "mid",
    runeSets: [
      {
        primaryPathId: 8000, // Precision
        primaryRunes: [8010, 9111, 9104, 8299], // Conqueror, Triumph, Legend: Alacrity, Last Stand
        secondaryPathId: 8200, // Sorcery
        secondaryRunes: [8226, 8210], // Manaflow Band, Transcendence
        statRunes: [5001, 5004, 5007] // Adaptive Force, Armor, Magic Resist
      }
    ]
  },
  {
    championId: "fizz",
    lane: "mid",
    runeSets: [
      {
        primaryPathId: 8100, // Domination
        primaryRunes: [8112, 8139, 8138, 8106], // Electrocute, Taste of Blood, Eyeball Collection, Ultimate Hunter
        secondaryPathId: 8200, // Sorcery
        secondaryRunes: [8210, 8236], // Transcendence, Gathering Storm
        statRunes: [5001, 5004, 5007] // Adaptive Force, Armor, Magic Resist
      }
    ]
  },
  
  // Yasuo Counters
  {
    championId: "annie",
    lane: "mid",
    runeSets: [
      {
        primaryPathId: 8200, // Sorcery
        primaryRunes: [8229, 8226, 8210, 8237], // Arcane Comet, Manaflow Band, Transcendence, Scorch
        secondaryPathId: 8100, // Domination
        secondaryRunes: [8126, 8106], // Cheap Shot, Ultimate Hunter
        statRunes: [5001, 5004, 5007] // Adaptive Force, Armor, Magic Resist
      }
    ]
  },
  {
    championId: "malzahar",
    lane: "mid",
    runeSets: [
      {
        primaryPathId: 8200, // Sorcery
        primaryRunes: [8229, 8226, 8210, 8237], // Arcane Comet, Manaflow Band, Transcendence, Scorch
        secondaryPathId: 8300, // Inspiration
        secondaryRunes: [8304, 8347], // Magical Footwear, Cosmic Insight
        statRunes: [5001, 5004, 5007] // Adaptive Force, Armor, Magic Resist
      }
    ]
  },
  {
    championId: "ahri",
    lane: "mid",
    runeSets: [
      {
        primaryPathId: 8100, // Domination
        primaryRunes: [8112, 8139, 8138, 8106], // Electrocute, Taste of Blood, Eyeball Collection, Ultimate Hunter
        secondaryPathId: 8200, // Sorcery
        secondaryRunes: [8226, 8210], // Manaflow Band, Transcendence
        statRunes: [5001, 5004, 5007] // Adaptive Force, Armor, Magic Resist
      }
    ]
  },
  
  // Jinx Counters
  {
    championId: "kaisa",
    lane: "adc",
    runeSets: [
      {
        primaryPathId: 8000, // Precision
        primaryRunes: [8008, 9111, 9104, 8014], // Lethal Tempo, Triumph, Legend: Alacrity, Coup de Grace
        secondaryPathId: 8100, // Domination
        secondaryRunes: [8139, 8135], // Taste of Blood, Treasure Hunter
        statRunes: [5001, 5004, 5002] // Adaptive Force, Armor, Attack Speed
      }
    ]
  },
  {
    championId: "vayne",
    lane: "adc",
    runeSets: [
      {
        primaryPathId: 8000, // Precision
        primaryRunes: [8008, 9111, 9104, 8014], // Lethal Tempo, Triumph, Legend: Alacrity, Coup de Grace
        secondaryPathId: 8200, // Sorcery
        secondaryRunes: [8226, 8233], // Manaflow Band, Absolute Focus
        statRunes: [5001, 5004, 5002] // Adaptive Force, Armor, Attack Speed
      }
    ]
  },
  
  // Thresh Counters
  {
    championId: "leona",
    lane: "support",
    runeSets: [
      {
        primaryPathId: 8400, // Resolve
        primaryRunes: [8439, 8463, 8444, 8453], // Aftershock, Font of Life, Second Wind, Revitalize
        secondaryPathId: 8300, // Inspiration
        secondaryRunes: [8304, 8347], // Magical Footwear, Cosmic Insight
        statRunes: [5001, 5004, 5007] // Adaptive Force, Armor, Magic Resist
      }
    ]
  },
  {
    championId: "lux",
    lane: "support",
    runeSets: [
      {
        primaryPathId: 8200, // Sorcery
        primaryRunes: [8214, 8226, 8210, 8237], // Summon Aery, Manaflow Band, Transcendence, Scorch
        secondaryPathId: 8300, // Inspiration
        secondaryRunes: [8304, 8347], // Magical Footwear, Cosmic Insight
        statRunes: [5001, 5004, 5007] // Adaptive Force, Armor, Magic Resist
      }
    ]
  }
];

// Get champion runes by champion ID and lane
export const getChampionRunes = (championId: string, lane: string): RuneSet[] | undefined => {
  const championRune = mockChampionRunes.find(rune => rune.championId === championId && rune.lane === lane);
  return championRune?.runeSets;
};