import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CounterpickForm from "@/components/CounterpickForm";
import { CounterResults } from "@/components/CounterResults";
import { Champion } from "@shared/data/champions";
import { Matchup } from "@shared/data/matchups";
import { useQuery } from "@tanstack/react-query";
import { getChampionMatchups } from "@/lib/lolApi";

export default function HomePage() {
  // State for the selected enemy champion and lane
  const [enemyChampion, setEnemyChampion] = useState<string | null>(null);
  const [lane, setLane] = useState<string>("mid");
  const [yourChampion, setYourChampion] = useState<string | null>(null);
  
  // Selected champion for detailed build view
  const [selectedCounterChampion, setSelectedCounterChampion] = useState<string | null>(null);
  
  // Fetch matchup data when enemy champion and lane are selected
  const { data: matchupData, isLoading, error } = useQuery({
    queryKey: ["matchups", enemyChampion, lane],
    queryFn: () => getChampionMatchups(enemyChampion || "", lane),
    enabled: !!enemyChampion && !!lane,
  });
  
  const handleFormSubmit = (enemyChampId: string, selectedLane: string, yourChampId: string | null) => {
    console.log("Form submitted with:", { enemyChampId, selectedLane, yourChampId }); // Debug log
    setEnemyChampion(enemyChampId);
    setLane(selectedLane);
    setYourChampion(yourChampId);
    setSelectedCounterChampion(null);
  };
  
  const handleSelectCounterChampion = (champion: Champion) => {
    console.log("Selected counter champion:", champion); // Debug log
    setSelectedCounterChampion(champion.id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-lol-blue-dark to-lol-blue text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <HeroSection />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CounterpickForm 
              onSubmit={handleFormSubmit} 
              selectedEnemyChampion={enemyChampion}
              selectedLane={lane}
              selectedYourChampion={yourChampion}
            />
          </div>
          
          <div className="lg:col-span-2">
            <CounterResults 
              enemyChampionId={enemyChampion}
              enemyLane={lane}
              onSelectChampion={handleSelectCounterChampion}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
