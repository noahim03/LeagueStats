import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CounterpickForm from "@/components/CounterpickForm";
import { CounterResults } from "@/components/CounterResults";

export default function HomePage() {
  const [enemyChampion, setEnemyChampion] = useState<string | null>(null);
  const [lane, setLane] = useState<string>("mid");
  
  const handleFormSubmit = (enemyChampId: string, selectedLane: string) => {
    setEnemyChampion(enemyChampId);
    setLane(selectedLane);
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
            />
          </div>
          
          <div className="lg:col-span-2">
            <CounterResults 
              enemyChampionId={enemyChampion}
              enemyLane={lane}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
