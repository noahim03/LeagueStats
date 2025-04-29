interface EnemyChampionPreviewProps {
  champion: {
    id: string;
    name: string;
    title: string;
    imagePath: string;
    roles: string[];
  };
  lane: string;
}

export default function EnemyChampionPreview({ champion, lane }: EnemyChampionPreviewProps) {
  // Map lane to display name
  const laneDisplayNames: Record<string, string> = {
    top: "Top",
    jungle: "Jungle",
    mid: "Mid",
    adc: "Bot",
    support: "Support"
  };

  return (
    <div className="mt-6 bg-lol-blue-dark border border-lol-gold-dark rounded-lg p-6 shadow-lg">
      <h3 className="font-lol-display text-xl mb-4 text-lol-gold">Enemy Champion</h3>
      <div className="flex items-center">
        <img 
          src={champion.imagePath} 
          alt={champion.name} 
          className="w-20 h-20 object-cover rounded-full border-2 border-lol-gold"
        />
        <div className="ml-4">
          <h4 className="text-xl font-bold">{champion.name}</h4>
          <p className="text-lol-gray">{champion.title}</p>
          <div className="flex mt-2">
            <span className="bg-lol-blue-light px-2 py-1 rounded text-xs mr-2">
              {laneDisplayNames[lane] || lane}
            </span>
            {champion.roles.map((role, index) => (
              <span key={index} className="bg-lol-blue-light px-2 py-1 rounded text-xs mr-2">
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
