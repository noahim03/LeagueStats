import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Champion } from "@shared/schema";
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

interface SearchableChampionSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  isOptional?: boolean;
}

export default function SearchableChampionSelect({
  value,
  onChange,
  placeholder = "Select a champion",
  className,
  isOptional = false
}: SearchableChampionSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch champions data
  const { data: champions, isLoading } = useQuery<Champion[]>({
    queryKey: ['/api/champions'],
  });

  // Filter champions based on search query
  const filteredChampions = champions?.filter(champion => 
    champion.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between bg-lol-blue border border-lol-gold-dark text-lol-gray-light", className)}
        >
          {value && champions ? (
            champions.find(champion => champion.id === value)?.name || placeholder
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-lol-blue-dark border-lol-gold-dark">
        <Command className="bg-transparent">
          <CommandInput 
            placeholder="Search champion..." 
            onValueChange={setSearchQuery}
            className="text-lol-gray-light"
          />
          <CommandEmpty className="py-6 text-center text-lol-gray">
            No champion found.
          </CommandEmpty>
          <CommandGroup className="max-h-60 overflow-y-auto">
            {isOptional && (
              <CommandItem
                value="none"
                onSelect={() => {
                  onChange("none");
                  setOpen(false);
                }}
                className="flex items-center gap-2 hover:bg-lol-blue focus:bg-lol-blue-light text-lol-gray-light"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === "none" ? "opacity-100 text-lol-gold" : "opacity-0"
                  )}
                />
                None
              </CommandItem>
            )}
            {isLoading ? (
              <CommandItem disabled className="text-lol-gray py-2">
                Loading champions...
              </CommandItem>
            ) : (
              filteredChampions?.map((champion) => (
                <CommandItem
                  key={champion.id}
                  value={champion.id}
                  onSelect={() => {
                    onChange(champion.id);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 hover:bg-lol-blue focus:bg-lol-blue-light text-lol-gray-light"
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={champion.imagePath} 
                        alt={champion.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{champion.name}</p>
                      <p className="text-xs text-lol-gray">{champion.roles.join(', ')}</p>
                    </div>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === champion.id ? "opacity-100 text-lol-gold" : "opacity-0"
                      )}
                    />
                  </div>
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}