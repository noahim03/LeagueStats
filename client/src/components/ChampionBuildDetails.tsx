import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader2
} from 'lucide-react';

interface ChampionBuildDetailsProps {
  championId: string;
  lane: string;
}

export default function ChampionBuildDetails({ 
  championId, 
  lane 
}: ChampionBuildDetailsProps) {
  const [activeTab, setActiveTab] = useState("items");
  
  // Fetch champion details to get name
  const { data: champion, isLoading: isLoadingChampion } = useQuery({
    queryKey: [`/api/champions/${championId}`],
    enabled: !!championId
  });
  
  // Fetch build details
  const { data: buildData, isLoading: isLoadingBuild } = useQuery({
    queryKey: [`/api/builds/${championId}`, lane],
    enabled: !!championId && !!lane
  });
  
  const isLoading = isLoadingChampion || isLoadingBuild;

  return (
    <div className="bg-lol-blue-light border border-lol-gold-dark rounded-lg p-5 mt-4">
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-lol-gold" />
        </div>
      ) : champion ? (
        <>
          <h3 className="font-lol-display text-xl text-lol-gold mb-4">{champion.name} Build Details</h3>
          
          <Tabs defaultValue="items" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="border-b border-lol-gold-dark bg-transparent mb-4">
              <TabsTrigger
                value="items"
                className={`py-2 px-4 mr-4 focus:outline-none ${
                  activeTab === "items" ? 'text-lol-gold border-b-2 border-lol-gold' : 'text-lol-gray hover:text-lol-gold'
                }`}
              >
                Items
              </TabsTrigger>
              <TabsTrigger
                value="runes"
                className={`py-2 px-4 mr-4 focus:outline-none ${
                  activeTab === "runes" ? 'text-lol-gold border-b-2 border-lol-gold' : 'text-lol-gray hover:text-lol-gold'
                }`}
              >
                Runes
              </TabsTrigger>
              <TabsTrigger
                value="summoners"
                className={`py-2 px-4 focus:outline-none ${
                  activeTab === "summoners" ? 'text-lol-gold border-b-2 border-lol-gold' : 'text-lol-gray hover:text-lol-gold'
                }`}
              >
                Summoners
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="items">
              {buildData ? (
                <div className="item-builds">
                  {/* Starting Items */}
                  <div className="mb-6">
                    <h4 className="text-lol-gold mb-3 border-b border-lol-gold-dark pb-2">Starting Items</h4>
                    <div className="flex items-center">
                      {buildData.startingItems.map((item: any) => (
                        <div key={item.id} className="item-icon mr-2 relative group">
                          <img
                            src={item.imagePath}
                            alt={item.name}
                            className="w-12 h-12 rounded border border-lol-gold-dark transition-all duration-200 group-hover:scale-110"
                          />
                          <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 bg-lol-blue-dark border border-lol-gold-dark rounded p-2 w-48 z-10 mb-2 text-xs">
                            <p className="font-bold text-lol-gold mb-1">{item.name}</p>
                            <div dangerouslySetInnerHTML={{ __html: item.description }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Core Items */}
                  <div className="mb-6">
                    <h4 className="text-lol-gold mb-3 border-b border-lol-gold-dark pb-2">Core Items</h4>
                    <div className="flex flex-wrap">
                      {buildData.coreItems.map((item: any) => (
                        <div key={item.id} className="item-icon mr-2 mb-2 relative group">
                          <img
                            src={item.imagePath}
                            alt={item.name}
                            className="w-12 h-12 rounded border border-lol-gold-dark transition-all duration-200 group-hover:scale-110"
                          />
                          <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 bg-lol-blue-dark border border-lol-gold-dark rounded p-2 w-48 z-10 mb-2 text-xs">
                            <p className="font-bold text-lol-gold mb-1">{item.name}</p>
                            <div dangerouslySetInnerHTML={{ __html: item.description }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Situational Items */}
                  <div>
                    <h4 className="text-lol-gold mb-3 border-b border-lol-gold-dark pb-2">Situational Items</h4>
                    <div className="flex flex-wrap">
                      {buildData.situationalItems.map((item: any) => (
                        <div key={item.id} className="item-icon mr-2 mb-2 relative group">
                          <img
                            src={item.imagePath}
                            alt={item.name}
                            className="w-12 h-12 rounded border border-lol-gold-dark transition-all duration-200 group-hover:scale-110"
                          />
                          <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 bg-lol-blue-dark border border-lol-gold-dark rounded p-2 w-48 z-10 mb-2 text-xs">
                            <p className="font-bold text-lol-gold mb-1">{item.name}</p>
                            <div dangerouslySetInnerHTML={{ __html: item.description }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-lol-gray py-4">No build data available for this champion.</p>
              )}
            </TabsContent>
            
            <TabsContent value="runes">
              <div className="flex justify-center items-center py-8">
                <p className="text-lol-gray">Rune data will be available in a future update.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="summoners">
              <div className="flex justify-center items-center py-8">
                <p className="text-lol-gray">Summoner spell data will be available in a future update.</p>
              </div>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <p className="text-center text-lol-gray py-4">Champion not found.</p>
      )}
    </div>
  );
}
