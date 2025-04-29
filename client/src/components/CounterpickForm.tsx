import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import EnemyChampionPreview from "./EnemyChampionPreview";
import SearchableChampionSelect from "./SearchableChampionSelect";
import { Champion } from "@shared/schema";
import { 
  Crown, 
  TreePine, 
  Wand2, 
  Crosshair, 
  Heart, 
  Search 
} from "lucide-react";

// Form schema
const formSchema = z.object({
  enemyChampion: z.string().min(1, "Enemy champion is required"),
  lane: z.string().min(1, "Lane is required"),
  yourChampion: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

interface CounterpickFormProps {
  onSubmit: (enemyChampionId: string, lane: string, yourChampionId: string | null) => void;
  selectedEnemyChampion: string | null;
  selectedLane: string;
  selectedYourChampion: string | null;
}

export default function CounterpickForm({ 
  onSubmit, 
  selectedEnemyChampion,
  selectedLane,
  selectedYourChampion
}: CounterpickFormProps) {
  // Fetch champions data
  const { data: champions, isLoading: isLoadingChampions } = useQuery<Champion[]>({
    queryKey: ['/api/champions'],
  });
  
  // Set up form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enemyChampion: selectedEnemyChampion || "",
      lane: selectedLane || "mid",
      yourChampion: selectedYourChampion || ""
    }
  });
  
  // Selected enemy champion details
  const [enemyChampionDetails, setEnemyChampionDetails] = useState<Champion | null>(null);
  
  // Update form values when props change
  useEffect(() => {
    form.reset({
      enemyChampion: selectedEnemyChampion || "",
      lane: selectedLane || "mid",
      yourChampion: selectedYourChampion || ""
    });
  }, [selectedEnemyChampion, selectedLane, selectedYourChampion, form]);
  
  // Fetch enemy champion details when selected
  useEffect(() => {
    const enemyChampionId = form.watch("enemyChampion");
    if (enemyChampionId && champions) {
      const champion = champions.find(c => c.id === enemyChampionId);
      setEnemyChampionDetails(champion || null);
    } else {
      setEnemyChampionDetails(null);
    }
  }, [form.watch("enemyChampion"), champions, form]);
  
  // Handle form submission
  const handleSubmit = (values: FormValues) => {
    onSubmit(
      values.enemyChampion, 
      values.lane, 
      values.yourChampion && values.yourChampion !== "none" ? values.yourChampion : null
    );
  };
  
  // Lanes configuration
  const lanes = [
    { id: "top", name: "Top", icon: Crown },
    { id: "jungle", name: "Jungle", icon: TreePine },
    { id: "mid", name: "Mid", icon: Wand2 },
    { id: "adc", name: "Bot", icon: Crosshair },
    { id: "support", name: "Support", icon: Heart }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-lol-blue-dark border border-lol-gold-dark rounded-lg p-6 shadow-lg">
        <h3 className="font-lol-display text-xl mb-6 text-lol-gold">Select Enemy Champion</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Enemy Champion Select */}
            <FormField
              control={form.control}
              name="enemyChampion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Enemy Champion</FormLabel>
                  <FormControl>
                    <SearchableChampionSelect 
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Search for enemy champion..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Lane Select */}
            <FormField
              control={form.control}
              name="lane"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium">Lane</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      className="grid grid-cols-5 gap-2"
                    >
                      {lanes.map(lane => (
                        <div key={lane.id} className="lane-option">
                          <RadioGroupItem 
                            id={lane.id} 
                            value={lane.id} 
                            className="sr-only peer"
                          />
                          <label 
                            htmlFor={lane.id}
                            className="flex flex-col items-center justify-center p-2 cursor-pointer border border-lol-gold-dark rounded bg-lol-blue hover:bg-lol-blue-light peer-checked:border-lol-gold peer-checked:bg-lol-blue-light"
                          >
                            <lane.icon className="mb-1 text-lol-gold h-5 w-5" />
                            <span className="text-xs">{lane.name}</span>
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Your Champion (Optional) Select */}
            <FormField
              control={form.control}
              name="yourChampion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Your Champion (Optional)</FormLabel>
                  <FormControl>
                    <SearchableChampionSelect 
                      value={field.value || "none"}
                      onChange={field.onChange}
                      placeholder="Search for your champion..."
                      isOptional={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-lol-gold-dark hover:bg-lol-gold text-lol-gray-light transition-colors duration-200"
            >
              <Search className="mr-2 h-4 w-4" />
              Find Counters
            </Button>
          </form>
        </Form>
      </div>
      
      {/* Enemy Champion Preview */}
      {enemyChampionDetails && (
        <EnemyChampionPreview champion={enemyChampionDetails} lane={form.watch("lane")} />
      )}
    </div>
  );
}
