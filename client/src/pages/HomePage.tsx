import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CounterpickForm from "@/components/CounterpickForm";
import CounterResults from "@/components/CounterResults";
import { Champion } from "@shared/schema";
import { Matchup } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  // State for the selected enemy champion and lane
  const [enemyChampion, setEnemyChampion] = useState<string | null>(null);
  const [lane, setLane] = useState<string>("mid");
  const [yourChampion, setYourChampion] = useState<string | null>(null);
  
  // Selected champion for detailed build view
  const [selectedCounterChampion, setSelectedCounterChampion] = useState<string | null>(null);
  
  // Fetch counter data when enemy champion and lane are selected
  const { data: counterData, isLoading, error } = useQuery({
    queryKey: ['/api/matchups', enemyChampion, lane],
    enabled: !!enemyChampion && !!lane,
  });
  
  const handleFormSubmit = (enemyChampId: string, selectedLane: string, yourChampId: string | null) => {
    setEnemyChampion(enemyChampId);
    setLane(selectedLane);
    setYourChampion(yourChampId);
    
    // Reset selected counter champion when form is submitted
    setSelectedCounterChampion(null);
  };
  
  const handleSelectCounterChampion = (championId: string) => {
    setSelectedCounterChampion(championId);
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
              counterData={counterData}
              loading={isLoading}
              error={error}
              selectedChampionId={selectedCounterChampion}
              onSelectChampion={handleSelectCounterChampion}
              lane={lane}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
