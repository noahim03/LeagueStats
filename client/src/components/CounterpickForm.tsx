import { useState, useEffect } from "react";
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
import SearchableChampionSelect from "./SearchableChampionSelect";
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
  lane: z.string().min(1, "Lane is required")
});

type FormValues = z.infer<typeof formSchema>;

interface CounterpickFormProps {
  onSubmit: (enemyChampionId: string, lane: string) => void;
  selectedEnemyChampion: string | null;
  selectedLane: string;
}

export default function CounterpickForm({ 
  onSubmit, 
  selectedEnemyChampion,
  selectedLane
}: CounterpickFormProps) {
  // Set up form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enemyChampion: selectedEnemyChampion || "",
      lane: selectedLane || "mid"
    }
  });
  
  // Update form values when props change
  useEffect(() => {
    form.reset({
      enemyChampion: selectedEnemyChampion || "",
      lane: selectedLane || "mid"
    });
  }, [selectedEnemyChampion, selectedLane, form]);
  
  // Handle form submission
  const handleSubmit = (values: FormValues) => {
    onSubmit(
      values.enemyChampion, 
      values.lane
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
    <div className="space-y-6 mt-10">
      <div className="bg-lol-blue-dark border border-lol-gold-dark rounded-lg p-6 shadow-lg outline outline-2 outline-white">
        {/* Make the main section title bigger */}
        <h3 className="font-lol-display text-2xl mb-6 text-lol-gold">Select Enemy Champion</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Enemy Champion Select */}
            <FormField
              control={form.control}
              name="enemyChampion"
              render={({ field }) => (
                <FormItem>
                  {/* Make the 'Enemy Champion' and 'Lane' labels bigger */}
                  <FormLabel className="font-medium text-lg">Enemy Champion</FormLabel>
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
                  {/* Make the 'Enemy Champion' and 'Lane' labels bigger */}
                  <FormLabel className="font-medium text-lg mt-6">Lane</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      className="grid grid-cols-5 gap-2 mt-1"
                    >
                      {lanes.map(lane => {
                        const isSelected = field.value === lane.id;
                        return (
                        <div key={lane.id} className="lane-option">
                          <RadioGroupItem 
                            id={lane.id} 
                            value={lane.id} 
                            className="peer"
                          />
                          <label 
                            htmlFor={lane.id}
                              className={
                                `group flex flex-col items-center justify-center p-2 cursor-pointer border border-lol-gold-dark rounded transition-colors
                                ${isSelected ? "bg-white border-lol-gold" : "bg-transparent"}
                                hover:bg-white hover:border-lol-gold`
                              }
                            >
                              <span className={`mb-1 flex items-center justify-center h-8 w-8 rounded-full border-2 border-white transition-colors ${isSelected ? "text-black" : "text-lol-gold"} group-hover:text-black`}>
                                <lane.icon className="h-5 w-5 transition-colors" />
                              </span>
                              <span className={`text-xs transition-colors ${isSelected ? "text-black" : ""} group-hover:text-black`}>{lane.name}</span>
                          </label>
                        </div>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                  {/* Add Find Counters button here */}
                  <Button 
                    type="submit" 
                    className="w-full bg-white hover:bg-gray-200 text-black font-bold mt-4 border border-lol-gold-dark shadow"
                  >
                    Find Counters
                  </Button>
                </FormItem>
              )}
            />
            
          </form>
        </Form>
      </div>
    </div>
  );
}
