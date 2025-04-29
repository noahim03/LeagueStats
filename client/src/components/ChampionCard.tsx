import { InfoIcon } from 'lucide-react';

interface ChampionCardProps {
  champion: {
    id: string;
    name: string;
    title: string;
    imagePath: string;
    roles: string[];
  };
  winRate: number;
  difficulty: "easy" | "medium" | "hard";
  explanation: string;
  onViewBuild: () => void;
  isSelected: boolean;
}

export default function ChampionCard({
  champion,
  winRate,
  difficulty,
  explanation,
  onViewBuild,
  isSelected
}: ChampionCardProps) {
  // Map difficulty to color
  const difficultyColor = {
    easy: "text-green-500",
    medium: "text-yellow-500",
    hard: "text-red-500"
  };
  
  // Map difficulty to text
  const difficultyText = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard"
  };

  return (
    <div 
      className={`champion-card bg-lol-blue rounded-lg overflow-hidden border ${isSelected ? 'border-lol-gold' : 'border-lol-gold-dark'} transition-all duration-200 hover:translate-y-[-5px] hover:shadow-lg`}
    >
      <div className="relative">
        <img 
          src={champion.imagePath}
          alt={champion.name} 
          className="w-full h-40 object-cover" 
        />
        <div className="absolute top-0 right-0 bg-lol-gold text-lol-blue-dark px-2 py-1 text-sm font-bold">
          {winRate}% WR
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-lg mb-1">{champion.name}</h4>
        <p className="text-sm text-lol-gray mb-3">
          Counter Difficulty: <span className={difficultyColor[difficulty]}>
            {difficultyText[difficulty]}
          </span>
        </p>
        
        <h5 className="text-lol-gold text-sm mb-2">Why it works:</h5>
        <p className="text-sm mb-3">{explanation}</p>
        
        <div className="mt-3">
          <button 
            className="text-lol-gold hover:underline text-sm flex items-center"
            onClick={onViewBuild}
          >
            <InfoIcon className="mr-1 h-4 w-4" /> 
            View Build Details
          </button>
        </div>
      </div>
    </div>
  );
}
