import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from 'lucide-react';

interface ChampionBuildDetailsProps {
  championId: string;
  lane: string;
}

export default function ChampionBuildDetails({ 
  championId, 
  lane 
}: ChampionBuildDetailsProps) {
  const [activeTab, setActiveTab] = useState("items");

  return (
    <div className="bg-lol-blue-light border border-lol-gold-dark rounded-lg p-5 mt-4">
      <h3 className="font-lol-display text-xl text-lol-gold mb-4">Champion Build Details</h3>
          
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
          <p className="text-center text-lol-gray py-4">No build data available.</p>
            </TabsContent>
            
            <TabsContent value="runes">
          <p className="text-center text-lol-gray py-4">No rune data available.</p>
            </TabsContent>
            
            <TabsContent value="summoners">
          <p className="text-center text-lol-gray py-4">No summoner spell data available.</p>
            </TabsContent>
          </Tabs>
    </div>
  );
}
