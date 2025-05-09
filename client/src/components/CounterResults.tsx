import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getChampionMatchups } from "@/lib/lolApi";
import { Champion } from "@shared/data/champions";
import { Matchup } from "@shared/data/matchups";

interface CounterResultsProps {
  enemyChampionId: string | null;
  enemyLane: string;
  onSelectChampion: (champion: Champion) => void;
}

export function CounterResults({ enemyChampionId, enemyLane, onSelectChampion }: CounterResultsProps) {
  const { data: matchups, isLoading, error } = useQuery({
    queryKey: ["matchups", enemyChampionId, enemyLane],
    queryFn: () => getChampionMatchups(enemyChampionId || "", enemyLane),
    enabled: !!enemyChampionId && !!enemyLane,
  });

  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-400">
        Loading counter picks...
      </div>
    );
  }

  if (error) {
    console.error("Error loading matchups:", error);
    return (
      <div className="p-4 text-center text-red-500">
        Error loading counter picks. Please try again.
      </div>
    );
  }

  if (!matchups || matchups.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        No counter picks found for this champion and lane combination.
      </div>
    );
  }

  return (
    <div className="bg-lol-blue-dark border border-lol-gold-dark rounded-lg p-6">
      <h2 className="text-xl font-semibold text-lol-gold mb-4">Top 5 Counters</h2>
      <div className="space-y-3">
        {matchups.map((matchup: Matchup) => (
          <div
            key={matchup.championId}
            className="bg-lol-blue rounded-lg p-4 hover:bg-lol-blue-light transition-colors cursor-pointer"
            onClick={() => onSelectChampion({ 
              id: matchup.championId, 
              name: matchup.championId, 
              key: matchup.championId,
              roles: ["Fighter"], // Default role
              primaryLane: "Top" // Default lane
            })}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-medium text-white capitalize">
                  {matchup.championId}
                </span>
                <span className={`px-2 py-1 rounded text-sm ${
                  matchup.difficulty === "Easy" ? "bg-green-500/20 text-green-400" :
                  matchup.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-red-500/20 text-red-400"
                }`}>
                  {matchup.difficulty}
                </span>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-lol-gold">
                  {matchup.winRate}% Win Rate
                </div>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              {matchup.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
