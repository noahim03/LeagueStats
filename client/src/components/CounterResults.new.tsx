interface CounterResultsProps {
  enemyChampionId: string | null;
  enemyLane: string;
}

export function CounterResults({ enemyChampionId, enemyLane }: CounterResultsProps) {
  return (
    <div className="bg-lol-blue-dark border border-lol-gold-dark rounded-lg p-6">
      <h2 className="text-xl font-semibold text-lol-gold mb-4">Counter Picks</h2>
      <div className="p-4 text-center text-gray-400">
        Select a champion and lane to see counter picks.
      </div>
    </div>
  );
} 