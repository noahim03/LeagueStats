import { useState, useEffect } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from '@/lib/supabaseClient';

interface SearchableChampionSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onFindCounters?: () => void;
}

export default function SearchableChampionSelect({
  value,
  onChange,
  placeholder = "Select a champion",
  className,
  onFindCounters
}: SearchableChampionSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [champions, setChampions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        console.log('Starting to fetch champions from Supabase...');
        const { data, error } = await supabase
          .from('Champions')
          .select('*');

        if (error) {
          console.error('Supabase error:', error);
          setError(error.message);
          return;
        }

        console.log('Supabase response:', { data, error });
        
        if (!data || data.length === 0) {
          console.log('No data received from Supabase');
          setError('No champions found in database');
          return;
        }

        console.log('First champion:', data[0]);
        console.log('Total champions:', data.length);
        setChampions(data);
      } catch (err) {
        console.error('Error fetching champions:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchChampions();
  }, []);

  console.log('Current state:', {
    champions: champions.length,
    searchQuery,
    loading,
    error
  });

  const filteredChampions = champions.filter(champion => {
    const searchLower = searchQuery.toLowerCase();
    const nameLower = champion.apiname?.toLowerCase() || '';
    const matches = nameLower.includes(searchLower);
    console.log(`Searching for "${searchLower}" in "${nameLower}": ${matches}`);
    return matches;
  });

  console.log('Filtered results:', filteredChampions);

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between bg-lol-blue border border-lol-gold-dark text-lol-gray-light", className)}
          >
            {value || placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full min-w-[340px] p-0 bg-gray-800 border-lol-gold-dark">
          <Command className="bg-gray-800">
            <div className="relative">
              <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-white">
                <div className="absolute left-0 w-2 h-2 bg-gray-800 rounded-full -translate-y-1/2"></div>
                <div className="absolute right-0 w-2 h-2 bg-gray-800 rounded-full -translate-y-1/2"></div>
              </div>
              <CommandInput 
                placeholder="Search champion..." 
                onValueChange={setSearchQuery}
                className="text-gray-200 bg-gray-800 border-0"
              />
            </div>
            <CommandEmpty className="py-6 text-center text-gray-400 bg-gray-800">
              {loading ? "Loading champions..." : "No champion found."}
            </CommandEmpty>
            <CommandGroup className="max-h-[320px] overflow-y-auto bg-gray-800">
              {filteredChampions.map((champion) => (
                <CommandItem
                  key={champion.id}
                  value={champion.apiname}
                  onSelect={() => {
                    onChange(champion.apiname);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 hover:bg-gray-700 focus:bg-gray-700 text-gray-200 bg-gray-800 h-10"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === champion.apiname ? "opacity-100 text-lol-gold" : "opacity-0"
                    )}
                  />
                  {champion.apiname}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {/* Removed Find Counters button */}
    </div>
  );
}