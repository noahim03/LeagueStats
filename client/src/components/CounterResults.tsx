import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { getAllChampions, getChampionImageUrl, getAllRunes, getAllItems, getItemImageUrl, getRuneIconUrl, getItemImageByFile } from '@/lib/lolApi';
import { Loader2 } from 'lucide-react';
import { coreRunes, coreItems } from '@/lib/coreBuildsTemplate';

interface CounterResultsProps {
  enemyChampionId: string | null;
  enemyLane: string;
}

export function CounterResults({ enemyChampionId, enemyLane }: CounterResultsProps) {
  const [counterPicks, setCounterPicks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // default to false
  const [championName, setChampionName] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [championImageId, setChampionImageId] = useState<string | null>(null);
  const [allChampions, setAllChampions] = useState<any>(null);
  const [allRunes, setAllRunes] = useState<any[]>([]);
  const [allItems, setAllItems] = useState<any>(null);

  useEffect(() => {
    // Fetch runes and items once on mount
    (async () => {
      try {
        const runes = await getAllRunes();
        setAllRunes(runes);
        const items = await getAllItems();
        setAllItems(items);
      } catch (e) {
        setAllRunes([]);
        setAllItems(null);
      }
    })();
  }, []);

  useEffect(() => {
    // If no champion is selected, reset state and do not fetch
    if (!enemyChampionId) {
      setCounterPicks([]);
      setLoading(false);
      setChampionName(null);
      setChampionImageId(null);
      setAllChampions(null);
      setShowResult(true); // immediately show 'no counters found'
      return;
    }

    setShowResult(false);
    setLoading(true);
    const fetchCounterPicks = async () => {
      // Fetch champion name from Data Dragon
      try {
        const allChampionsData = await getAllChampions();
        setAllChampions(allChampionsData);
        let foundName = null;
        let foundImageId = null;
        for (const champKey in allChampionsData) {
          const champ = allChampionsData[champKey];
          if (
            champ.id === enemyChampionId ||
            champ.key === enemyChampionId ||
            champ.name === enemyChampionId ||
            champKey === enemyChampionId
          ) {
            foundName = champ.name;
            foundImageId = champ.id;
            break;
          }
        }
        setChampionName(foundName || enemyChampionId);
        setChampionImageId(foundImageId || enemyChampionId);
      } catch (e) {
        setChampionName(enemyChampionId);
        setChampionImageId(enemyChampionId);
        setAllChampions(null);
      }

      console.log('Querying for apiname:', enemyChampionId);
      const { data, error } = await supabase
        .from('Champions')
        .select('*')
        .eq('apiname', enemyChampionId);

      if (error) {
        console.error('Error fetching counter picks:', error);
      } else {
        setCounterPicks(data);
        console.log('Supabase counterPicks:', data);
      }
      setLoading(false);
      setTimeout(() => setShowResult(true), 3000);
    };

    fetchCounterPicks();
  }, [enemyChampionId, enemyLane]);

  // If no champion is selected, show 'No counter picks found' immediately
  if (!enemyChampionId) {
    return (
      <div className="text-center text-lol-gray py-6 pl-6">
        <div className="bg-lol-blue-dark border border-lol-gold-dark rounded-lg p-6 mt-4">
          <h2 className="text-xl font-semibold text-lol-gold mb-4">Top Counter Picks</h2>
          <div className="text-lol-gray">No counter picks found</div>
        </div>
      </div>
    );
  }

  if (loading || !showResult) {
    return (
      <div className="flex flex-col items-center justify-center text-lol-gray py-6 pl-6">
        <Loader2 className="animate-spin h-10 w-10 mb-4 text-lol-gold" />
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  if (!counterPicks || counterPicks.length === 0) {
    return (
      <div className="text-center text-lol-gray py-6 pl-6">
        {championName && (
          <>
            {championImageId && (
              <img
                src={getChampionImageUrl(championImageId)}
                alt={championName}
                className="mx-auto mb-4 w-24 h-24 rounded-full border-2 border-lol-gold object-cover bg-lol-blue-dark"
              />
            )}
            <div className="text-4xl font-extrabold text-lol-gold mb-4">{championName}</div>
            <div className="text-2xl font-bold text-lol-gold mb-4">{enemyLane.charAt(0).toUpperCase() + enemyLane.slice(1)}</div>
            <div className="bg-lol-blue-dark border border-lol-gold-dark rounded-lg p-6 mt-4">
              <h2 className="text-xl font-semibold text-lol-gold mb-4">Top Counter Picks</h2>
              <div className="text-lol-gray">No counter picks found.</div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Get the 'weak' column from the first result (assuming one row per champ)
  const weakChampions = counterPicks[0]?.weak
    ? (counterPicks[0].weak as string).split(',').map((s: string) => s.trim())
    : [];

  // Helper to get image ID from champion name
  function getImageIdForChampion(name: string): string | null {
    if (!allChampions) return null;
    for (const champKey in allChampions) {
      const champ = allChampions[champKey];
      if (
        champ.id === name ||
        champ.key === name ||
        champ.name === name ||
        champ.apiname === name ||
        champKey === name
      ) {
        return champ.id;
      }
    }
    return null;
  }

  function getChampionPrimaryTag(championId: string | null): string | null {
    if (!championId || !allChampions) return null;
    const champ = (allChampions as any)[championId];
    if (!champ || !Array.isArray(champ.tags) || champ.tags.length === 0) return null;
    return champ.tags[0];
  }

  // Role-based default core runes/items (fallbacks)
  const defaultCoreRunesByTag: Record<string, number[]> = {
    Tank: [8437, 8463, 8444, 8453, 8345, 8352], // Aftershock page
    Fighter: [8010, 9111, 9104, 8014, 8401, 8345], // Conqueror page + secondary
    Mage: [8112, 8126, 8138, 8135, 8345, 8369], // Electrocute/First Strike mix
    Marksman: [8008, 9111, 9104, 8014, 8345, 8451], // Lethal Tempo + secondary
    Assassin: [8112, 8126, 8138, 8135, 8345, 8451], // Electrocute + secondary
    Support: [8465, 8463, 8473, 8453, 8345, 8352], // Guardian + secondary
  };

  const defaultCoreItemsByTag: Record<string, number[]> = {
    Tank: [3068, 3075, 4401, 3193, 3047, 3143], // Sunfire, Thornmail, FoN, Gargoyle, Plated, Randuin
    Fighter: [6630, 3071, 6333, 3053, 3047, 3156], // Goredrinker, Cleaver, Death's Dance, Sterak's, Plated, Maw
    Mage: [6653, 3157, 3089, 4645, 3020, 3165], // Liandry, Zhonya, Rabadon, Shadowflame, Sorc, Morello
    Marksman: [6672, 3031, 6675, 3046, 3006, 3036], // Kraken, IE, Navori, Phantom, Berserker, LDR
    Assassin: [6692, 3142, 6691, 3814, 3158, 6695], // Eclipse, Youmuu, Duskblade, Edge of Night, Ionian, Serpent's
    Support: [3190, 3107, 3222, 2065, 3117, 3109], // Locket, Redemption, Mikael, Shurelya, Mobility, Knight's Vow
  };

  // coreRunes and coreItems are imported from '@/lib/coreBuildsTemplate'

  // Helper to find rune by ID
  function findRuneById(id: number, allRunes: any[]): any | null {
    for (const tree of allRunes) {
      for (const slot of tree.slots) {
        for (const rune of slot.runes) {
          if (rune.id === id) return rune;
        }
      }
    }
    return null;
  }

  return (
    <div className="text-lol-gray py-6 pl-6 flex flex-col items-center gap-8">
      {/* Top Counter Picks below in a single row */}
      <div className="bg-lol-blue-dark rounded-lg p-6 w-full max-w-5xl flex flex-col items-center">
        <h2 className="text-xl font-semibold text-lol-gold mb-2 text-center">Top Counter Picks</h2>
        {Array.isArray(weakChampions) && weakChampions.length > 0 ? (
          <div className="flex flex-row flex-nowrap justify-center items-start gap-8 overflow-x-auto">
            {weakChampions.map((champ, index) => {
              const champImageId = getImageIdForChampion(champ);
              const runeKey = champImageId || champ;
              const itemKey = champImageId || champ;
              const primaryTag = getChampionPrimaryTag(champImageId);
              return (
                <div key={index} className="flex flex-col items-center w-48">
                  {champImageId ? (
                    <img
                      src={getChampionImageUrl(champImageId)}
                      alt={champ}
                      className="w-20 h-20 rounded-full border-2 border-lol-gold object-cover bg-lol-blue-dark mb-2"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full border-2 border-lol-gold bg-lol-blue-dark mb-2 flex items-center justify-center text-xs text-lol-gold">No Image</div>
                  )}
                  <span className="text-base font-semibold text-lol-gold text-center mb-2">{champ}</span>
                  {/* Runes Section */}
                  <div className="w-full mb-2">
                    <div className="text-sm text-lol-gold font-bold mb-1 text-center">Runes</div>
                    {allRunes && allRunes.length > 0 ? (
                      <div className="flex flex-row flex-wrap gap-2 justify-center">
                        {(
                          coreRunes[runeKey]
                            ? coreRunes[runeKey].slice(0, 6)
                            : (primaryTag && defaultCoreRunesByTag[primaryTag])
                              ? defaultCoreRunesByTag[primaryTag].slice(0, 6)
                              : []
                        ).map((runeId: number) => {
                          const rune = findRuneById(runeId, allRunes);
                          return rune ? (
                            <div key={rune.id} className="flex flex-col items-center">
                              <img src={getRuneIconUrl(rune.icon)} alt={rune.name} className="w-7 h-7" />
                              <span className="text-[10px] text-lol-gold text-center w-14 truncate">{rune.name}</span>
                            </div>
                          ) : null;
                        })}
                        {!coreRunes[runeKey] && !(primaryTag && defaultCoreRunesByTag[primaryTag]) && (
                          <div className="text-xs text-lol-gray text-center w-full">No core runes configured.</div>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs text-lol-gray">No runes data</div>
                    )}
                  </div>
                  {/* Items Section */}
                  <div className="w-full">
                    <div className="text-sm text-lol-gold font-bold mb-1 text-center">Items</div>
                    {allItems ? (
                      <div className="flex flex-row flex-wrap gap-2 justify-center">
                        {(
                          coreItems[itemKey]
                            ? coreItems[itemKey].slice(0, 6)
                            : (primaryTag && defaultCoreItemsByTag[primaryTag])
                              ? defaultCoreItemsByTag[primaryTag].slice(0, 6)
                              : []
                        ).map((itemId: number) => {
                          const item = allItems[itemId] || allItems[String(itemId)];
                          return item ? (
                            <div key={item.id} className="flex flex-col items-center">
                              <img src={item.image?.full ? getItemImageByFile(item.image.full) : getItemImageUrl(item.id)} alt={item.name} className="w-8 h-8" />
                              <span className="text-[10px] text-lol-gold text-center w-14 truncate">{item.name}</span>
                            </div>
                          ) : null;
                        })}
                        {!coreItems[itemKey] && !(primaryTag && defaultCoreItemsByTag[primaryTag]) && (
                          <div className="text-xs text-lol-gray text-center w-full">No core items configured.</div>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs text-lol-gray">No items data</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-lol-gray">No counter picks found.</div>
        )}
      </div>
    </div>
  );
}
