export interface Matchup {
  championId: string;
  winRate: number;
  difficulty: "Easy" | "Medium" | "Hard";
  explanation: string;
}

export interface ChampionMatchups {
  [championId: string]: {
    [lane: string]: Matchup[];
  };
}

export const championMatchups: ChampionMatchups = {
  "aatrox": {
    "top": [
      {
        championId: "fiora",
        winRate: 54.2,
        difficulty: "Hard",
        explanation: "Fiora's mobility and parry make it difficult for Aatrox to land his Q sweet spots. She can also out-sustain him in extended trades."
      },
      {
        championId: "irelia",
        winRate: 53.8,
        difficulty: "Hard",
        explanation: "Irelia's mobility allows her to dodge Aatrox's Q sweet spots, and she can out-trade him in all-ins."
      },
      {
        championId: "jax",
        winRate: 52.9,
        difficulty: "Medium",
        explanation: "Jax's Counter Strike can block Aatrox's auto attacks and Q damage, making it hard for Aatrox to win trades."
      },
      {
        championId: "riven",
        winRate: 52.1,
        difficulty: "Medium",
        explanation: "Riven's mobility and shield allow her to dodge Aatrox's Q sweet spots and win short trades."
      },
      {
        championId: "renekton",
        winRate: 51.8,
        difficulty: "Medium",
        explanation: "Renekton's early game burst and sustain make it difficult for Aatrox to win trades before level 6."
      }
    ]
  },
  "ahri": {
    "mid": [
      {
        championId: "kassadin",
        winRate: 54.5,
        difficulty: "Hard",
        explanation: "Kassadin's magic resistance and mobility make it difficult for Ahri to land her charm and burst him down."
      },
      {
        championId: "fizz",
        winRate: 53.9,
        difficulty: "Hard",
        explanation: "Fizz's mobility and untargetability make it hard for Ahri to land her skillshots and burst him down."
      },
      {
        championId: "leblanc",
        winRate: 53.2,
        difficulty: "Hard",
        explanation: "Leblanc's mobility and burst damage make it difficult for Ahri to trade effectively."
      },
      {
        championId: "zed",
        winRate: 52.8,
        difficulty: "Medium",
        explanation: "Zed's mobility and burst damage make it hard for Ahri to survive all-ins, especially after level 6."
      },
      {
        championId: "yasuo",
        winRate: 52.1,
        difficulty: "Medium",
        explanation: "Yasuo's wind wall can block Ahri's charm and Q, making it difficult for her to trade effectively."
      }
    ]
  },
  "darius": {
    "top": [
      {
        championId: "vayne",
        winRate: 55.2,
        difficulty: "Hard",
        explanation: "Vayne's range and mobility make it difficult for Darius to get in range to stack his passive."
      },
      {
        championId: "kayle",
        winRate: 54.8,
        difficulty: "Hard",
        explanation: "Kayle's range and ultimate make it difficult for Darius to all-in her, especially after level 6."
      },
      {
        championId: "quinn",
        winRate: 54.3,
        difficulty: "Hard",
        explanation: "Quinn's range and mobility make it difficult for Darius to get in range to trade effectively."
      },
      {
        championId: "teemo",
        winRate: 53.9,
        difficulty: "Medium",
        explanation: "Teemo's range and blind make it difficult for Darius to stack his passive and win trades."
      },
      {
        championId: "gnar",
        winRate: 53.2,
        difficulty: "Medium",
        explanation: "Gnar's range and mobility in mini form make it difficult for Darius to get in range, while mega form can out-tank him."
      }
    ]
  },
  "yasuo": {
    "mid": [
      {
        championId: "annie",
        winRate: 54.7,
        difficulty: "Hard",
        explanation: "Annie's point-and-click stun and burst damage make it difficult for Yasuo to trade effectively."
      },
      {
        championId: "malzahar",
        winRate: 54.2,
        difficulty: "Hard",
        explanation: "Malzahar's silence and ultimate make it difficult for Yasuo to use his mobility and wind wall effectively."
      },
      {
        championId: "lissandra",
        winRate: 53.8,
        difficulty: "Hard",
        explanation: "Lissandra's crowd control and burst damage make it difficult for Yasuo to trade effectively."
      },
      {
        championId: "akali",
        winRate: 53.1,
        difficulty: "Medium",
        explanation: "Akali's mobility and burst damage make it difficult for Yasuo to trade effectively, especially after level 6."
      },
      {
        championId: "fizz",
        winRate: 52.7,
        difficulty: "Medium",
        explanation: "Fizz's mobility and burst damage make it difficult for Yasuo to trade effectively, especially after level 6."
      }
    ]
  },
  "jinx": {
    "adc": [
      {
        championId: "draven",
        winRate: 54.3,
        difficulty: "Hard",
        explanation: "Draven's early game damage and catch axes mechanic make it difficult for Jinx to trade effectively."
      },
      {
        championId: "lucian",
        winRate: 53.9,
        difficulty: "Hard",
        explanation: "Lucian's mobility and burst damage make it difficult for Jinx to trade effectively in the early game."
      },
      {
        championId: "jhin",
        winRate: 53.2,
        difficulty: "Medium",
        explanation: "Jhin's long range and burst damage make it difficult for Jinx to trade effectively."
      },
      {
        championId: "caitlyn",
        winRate: 52.8,
        difficulty: "Medium",
        explanation: "Caitlyn's range and trap placement make it difficult for Jinx to trade effectively."
      },
      {
        championId: "vayne",
        winRate: 52.1,
        difficulty: "Medium",
        explanation: "Vayne's mobility and true damage make it difficult for Jinx to trade effectively in extended fights."
      }
    ]
  },
  "fiora": {
    "top": [
      { championId: "malphite", winRate: 55, difficulty: "Easy", explanation: "Malphite can poke Fiora safely and build armor to counter her damage." },
      { championId: "quinn", winRate: 53, difficulty: "Medium", explanation: "Quinn can harass Fiora from range and escape her all-ins." },
      { championId: "kennen", winRate: 52, difficulty: "Medium", explanation: "Kennen can poke Fiora and stun her if she tries to engage." },
      { championId: "teemo", winRate: 51, difficulty: "Easy", explanation: "Teemo can blind Fiora and poke her from range." },
      { championId: "jayce", winRate: 50, difficulty: "Hard", explanation: "Jayce can poke Fiora and switch forms to escape her all-ins." }
    ]
  },
  "irelia": {
    "top": [
      { championId: "malphite", winRate: 57, difficulty: "Easy", explanation: "Malphite can build armor and poke Irelia safely." },
      { championId: "fiora", winRate: 54, difficulty: "Medium", explanation: "Fiora can parry Irelia's stun and outduel her in extended trades." },
      { championId: "jax", winRate: 52, difficulty: "Medium", explanation: "Jax can counter Irelia's auto attacks and outscale her." },
      { championId: "sett", winRate: 51, difficulty: "Medium", explanation: "Sett can trade effectively with Irelia and has strong all-in potential." },
      { championId: "renekton", winRate: 50, difficulty: "Hard", explanation: "Renekton can burst Irelia and sustain through her damage." }
    ]
  },
  "zed": {
    "mid": [
      { championId: "malzahar", winRate: 58, difficulty: "Easy", explanation: "Malzahar's ultimate prevents Zed from using his shadows effectively." },
      { championId: "lissandra", winRate: 56, difficulty: "Medium", explanation: "Lissandra can root Zed and escape his ultimate with her own." },
      { championId: "annie", winRate: 54, difficulty: "Medium", explanation: "Annie can stun Zed and burst him down before he can react." },
      { championId: "ahri", winRate: 52, difficulty: "Hard", explanation: "Ahri can charm Zed and escape his all-ins with her ultimate." },
      { championId: "fizz", winRate: 50, difficulty: "Hard", explanation: "Fizz can dodge Zed's abilities and burst him down." }
    ]
  },
  "leblanc": {
    "mid": [
      { championId: "malzahar", winRate: 59, difficulty: "Easy", explanation: "Malzahar's ultimate prevents LeBlanc from using her mobility." },
      { championId: "lissandra", winRate: 57, difficulty: "Medium", explanation: "Lissandra can root LeBlanc and escape her burst with her ultimate." },
      { championId: "annie", winRate: 55, difficulty: "Medium", explanation: "Annie can stun LeBlanc and burst her down before she can react." },
      { championId: "ahri", winRate: 53, difficulty: "Hard", explanation: "Ahri can charm LeBlanc and escape her burst with her ultimate." },
      { championId: "fizz", winRate: 51, difficulty: "Hard", explanation: "Fizz can dodge LeBlanc's abilities and burst her down." }
    ]
  },
  "yone": {
    "mid": [
      { championId: "malzahar", winRate: 58, difficulty: "Easy", explanation: "Malzahar's ultimate prevents Yone from using his E and R effectively." },
      { championId: "lissandra", winRate: 56, difficulty: "Medium", explanation: "Lissandra can root Yone and escape his all-ins with her ultimate." },
      { championId: "annie", winRate: 54, difficulty: "Medium", explanation: "Annie can stun Yone and burst him down before he can react." },
      { championId: "ahri", winRate: 52, difficulty: "Hard", explanation: "Ahri can charm Yone and escape his all-ins with her ultimate." },
      { championId: "fizz", winRate: 50, difficulty: "Hard", explanation: "Fizz can dodge Yone's abilities and burst him down." }
    ]
  },
  "caitlyn": {
    "adc": [
      { championId: "vayne", winRate: 56, difficulty: "Hard", explanation: "Vayne can outduel Caitlyn in the late game." },
      { championId: "kaisa", winRate: 54, difficulty: "Medium", explanation: "Kai'Sa can burst Caitlyn down before she can scale." },
      { championId: "tristana", winRate: 52, difficulty: "Medium", explanation: "Tristana can jump on Caitlyn and burst her down." },
      { championId: "lucian", winRate: 51, difficulty: "Medium", explanation: "Lucian can burst Caitlyn down in the early game." },
      { championId: "ezreal", winRate: 50, difficulty: "Easy", explanation: "Ezreal can poke Caitlyn from range and escape her all-ins." }
    ]
  },
  "jhin": {
    "adc": [
      { championId: "kaisa", winRate: 55, difficulty: "Medium", explanation: "Kai'Sa can burst Jhin down before he can scale." },
      { championId: "vayne", winRate: 53, difficulty: "Hard", explanation: "Vayne can outduel Jhin in the late game." },
      { championId: "tristana", winRate: 52, difficulty: "Medium", explanation: "Tristana can jump on Jhin and burst him down." },
      { championId: "lucian", winRate: 51, difficulty: "Medium", explanation: "Lucian can burst Jhin down in the early game." },
      { championId: "ezreal", winRate: 50, difficulty: "Easy", explanation: "Ezreal can poke Jhin from range and escape his all-ins." }
    ]
  },
  "thresh": {
    "support": [
      { championId: "leona", winRate: 56, difficulty: "Medium", explanation: "Leona can engage on Thresh and lock him down." },
      { championId: "nautilus", winRate: 54, difficulty: "Medium", explanation: "Nautilus can hook Thresh and lock him down." },
      { championId: "alistar", winRate: 52, difficulty: "Medium", explanation: "Alistar can engage on Thresh and lock him down." },
      { championId: "braum", winRate: 51, difficulty: "Easy", explanation: "Braum can block Thresh's hooks and protect his ADC." },
      { championId: "morgana", winRate: 50, difficulty: "Easy", explanation: "Morgana can shield Thresh's hooks and root him." }
    ]
  },
  "leona": {
    "support": [
      { championId: "morgana", winRate: 58, difficulty: "Easy", explanation: "Morgana can shield Leona's engage and root her." },
      { championId: "alistar", winRate: 56, difficulty: "Medium", explanation: "Alistar can engage on Leona and lock her down." },
      { championId: "nautilus", winRate: 54, difficulty: "Medium", explanation: "Nautilus can hook Leona and lock her down." },
      { championId: "braum", winRate: 52, difficulty: "Easy", explanation: "Braum can block Leona's engage and protect his ADC." },
      { championId: "thresh", winRate: 50, difficulty: "Medium", explanation: "Thresh can hook Leona and lock her down." }
    ]
  },
  "lux": {
    "support": [
      { championId: "leona", winRate: 57, difficulty: "Medium", explanation: "Leona can engage on Lux and lock her down." },
      { championId: "nautilus", winRate: 55, difficulty: "Medium", explanation: "Nautilus can hook Lux and lock her down." },
      { championId: "alistar", winRate: 53, difficulty: "Medium", explanation: "Alistar can engage on Lux and lock her down." },
      { championId: "braum", winRate: 52, difficulty: "Easy", explanation: "Braum can block Lux's abilities and protect his ADC." },
      { championId: "thresh", winRate: 51, difficulty: "Medium", explanation: "Thresh can hook Lux and lock her down." }
    ]
  }
}; 