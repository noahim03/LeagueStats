import { useState } from 'react';
import { RuneSet, getRunePathById, getRuneById } from '@/data/runes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RunesDisplayProps {
  runeSets: RuneSet[];
}

export default function RunesDisplay({ runeSets }: RunesDisplayProps) {
  const [activeTab, setActiveTab] = useState("0");
  
  if (!runeSets || runeSets.length === 0) {
    return (
      <div className="text-center text-lol-gray py-6">
        <p>No rune data available for this champion and lane.</p>
      </div>
    );
  }

  return (
    <div className="runes-display">
      {runeSets.length > 1 && (
        <Tabs defaultValue="0" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="0" className="text-sm">Primary Build</TabsTrigger>
            <TabsTrigger value="1" className="text-sm">Alternative Build</TabsTrigger>
          </TabsList>
        </Tabs>
      )}
      
      {runeSets.map((runeSet, index) => (
        <TabsContent key={index} value={index.toString()} className={activeTab === index.toString() ? 'block' : 'hidden'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Path */}
            <div className="rune-path primary-path bg-lol-blue-light p-4 rounded-lg border border-lol-gold-dark">
              <div className="flex items-center mb-3">
                {getRunePathById(runeSet.primaryPathId) && (
                  <img 
                    src={getRunePathById(runeSet.primaryPathId)?.icon} 
                    alt={getRunePathById(runeSet.primaryPathId)?.name} 
                    className="w-8 h-8 mr-2"
                  />
                )}
                <h4 className="text-lg text-lol-gold font-medium">
                  {getRunePathById(runeSet.primaryPathId)?.name || 'Primary Path'}
                </h4>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {/* Primary Keystone */}
                {runeSet.primaryRunes.length > 0 && getRuneById(runeSet.primaryRunes[0]) && (
                  <div className="rune keystone bg-lol-blue p-2 rounded border border-lol-gold">
                    <div className="flex items-center">
                      <img 
                        src={getRuneById(runeSet.primaryRunes[0])?.icon} 
                        alt={getRuneById(runeSet.primaryRunes[0])?.name} 
                        className="w-10 h-10 mr-2"
                      />
                      <div>
                        <h5 className="text-lol-gold font-medium">{getRuneById(runeSet.primaryRunes[0])?.name}</h5>
                        <p className="text-xs text-lol-gray-light">{getRuneById(runeSet.primaryRunes[0])?.description}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Other Primary Runes */}
                <div className="other-runes">
                  {runeSet.primaryRunes.slice(1).map((runeId, i) => (
                    getRuneById(runeId) && (
                      <div key={i} className="rune bg-lol-blue p-2 rounded border border-lol-gold-dark mb-2">
                        <div className="flex items-center">
                          <img 
                            src={getRuneById(runeId)?.icon} 
                            alt={getRuneById(runeId)?.name} 
                            className="w-8 h-8 mr-2"
                          />
                          <div>
                            <h5 className="text-white text-sm">{getRuneById(runeId)?.name}</h5>
                            <p className="text-xs text-lol-gray-light">{getRuneById(runeId)?.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
            
            {/* Secondary Path */}
            <div className="rune-path secondary-path bg-lol-blue-light p-4 rounded-lg border border-lol-gold-dark">
              <div className="flex items-center mb-3">
                {getRunePathById(runeSet.secondaryPathId) && (
                  <img 
                    src={getRunePathById(runeSet.secondaryPathId)?.icon} 
                    alt={getRunePathById(runeSet.secondaryPathId)?.name} 
                    className="w-8 h-8 mr-2"
                  />
                )}
                <h4 className="text-lg text-lol-gold font-medium">
                  {getRunePathById(runeSet.secondaryPathId)?.name || 'Secondary Path'}
                </h4>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {/* Secondary Runes */}
                {runeSet.secondaryRunes.map((runeId, i) => (
                  getRuneById(runeId) && (
                    <div key={i} className="rune bg-lol-blue p-2 rounded border border-lol-gold-dark mb-2">
                      <div className="flex items-center">
                        <img 
                          src={getRuneById(runeId)?.icon} 
                          alt={getRuneById(runeId)?.name} 
                          className="w-8 h-8 mr-2"
                        />
                        <div>
                          <h5 className="text-white text-sm">{getRuneById(runeId)?.name}</h5>
                          <p className="text-xs text-lol-gray-light">{getRuneById(runeId)?.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                ))}
                
                {/* Stat Runes */}
                <div className="stat-runes mt-4">
                  <h5 className="text-lol-gold text-sm mb-2">Stat Shards</h5>
                  <div className="flex gap-2">
                    {runeSet.statRunes.map((runeId, i) => (
                      getRuneById(runeId) && (
                        <div key={i} className="stat-rune bg-lol-blue p-1 rounded border border-lol-gold-dark">
                          <img 
                            src={getRuneById(runeId)?.icon} 
                            alt={getRuneById(runeId)?.name} 
                            title={getRuneById(runeId)?.name}
                            className="w-6 h-6"
                          />
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rune-recommendation mt-4 bg-lol-blue-dark p-3 rounded border border-lol-gold-dark">
            <p className="text-sm text-lol-gold-light italic">
              <span className="font-bold">Pro Tip:</span> These runes work well against immobile champions, providing burst damage and sustained poke.
            </p>
          </div>
        </TabsContent>
      ))}
    </div>
  );
}