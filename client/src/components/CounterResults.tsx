import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ChampionCard from "./ChampionCard";
import ChampionBuildDetails from "./ChampionBuildDetails";
import { 
  AlertCircle,
  ArrowDownAZ,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CounterResultsProps {
  counterData: any;
  loading: boolean;
  error: Error | null;
  selectedChampionId: string | null;
  onSelectChampion: (championId: string) => void;
  lane: string;
}

export default function CounterResults({ 
  counterData, 
  loading, 
  error, 
  selectedChampionId, 
  onSelectChampion,
  lane
}: CounterResultsProps) {
  // Sort state
  const [sortBy, setSortBy] = useState<"winRate" | "difficulty">("winRate");
  
  // Sort the counter champions
  const sortedCounters = counterData ? [...counterData].sort((a, b) => {
    if (sortBy === "winRate") {
      return b.winRate - a.winRate;
    } else {
      // Sort by difficulty (easy -> medium -> hard)
      const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
      return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
    }
  }) : [];

  return (
    <div className="bg-lol-blue-dark border border-lol-gold-dark rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-lol-display text-xl text-lol-gold">Recommended Counters</h3>
        
        {/* Filters */}
        {counterData && counterData.length > 0 && (
          <div className="flex">
            <Button 
              variant={sortBy === "winRate" ? "default" : "outline"}
              size="sm"
              className={`mr-2 ${sortBy === "winRate" ? "bg-lol-blue-light border-lol-gold text-lol-gold" : "bg-lol-blue text-lol-gray border-lol-gray-dark hover:bg-lol-blue-light hover:text-lol-gold hover:border-lol-gold"}`}
              onClick={() => setSortBy("winRate")}
            >
              <ArrowDownAZ className="mr-1 h-4 w-4" />
              Win Rate
            </Button>
            <Button 
              variant={sortBy === "difficulty" ? "default" : "outline"}
              size="sm"
              className={`${sortBy === "difficulty" ? "bg-lol-blue-light border-lol-gold text-lol-gold" : "bg-lol-blue text-lol-gray border-lol-gray-dark hover:bg-lol-blue-light hover:text-lol-gold hover:border-lol-gold"}`}
              onClick={() => setSortBy("difficulty")}
            >
              <ArrowUpDown className="mr-1 h-4 w-4" />
              Difficulty
            </Button>
          </div>
        )}
      </div>
      
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center p-8">
          <div className="h-12 w-12 rounded-full border-4 border-lol-gold-dark border-t-lol-gold animate-spin"></div>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <Card className="border-red-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-500">
              <AlertCircle className="h-5 w-5" />
              <p>Failed to load counter data. Please try again.</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Empty state */}
      {!loading && !error && (!counterData || counterData.length === 0) && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-lol-gray">
              Select an enemy champion and lane to see counter recommendations.
            </p>
          </CardContent>
        </Card>
      )}
      
      {/* Champions Grid */}
      {!loading && !error && counterData && counterData.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            {sortedCounters.map((counter: any) => (
              <ChampionCard 
                key={counter.counterChampionId}
                champion={counter.counterChampion}
                winRate={counter.winRate}
                difficulty={counter.difficulty}
                explanation={counter.explanation}
                onViewBuild={() => onSelectChampion(counter.counterChampionId)}
                isSelected={selectedChampionId === counter.counterChampionId}
              />
            ))}
          </div>
          
          {/* Champion Build Details */}
          {selectedChampionId && (
            <ChampionBuildDetails championId={selectedChampionId} lane={lane} />
          )}
        </>
      )}
    </div>
  );
}
