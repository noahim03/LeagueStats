import { useState } from "react";
import { Champion, champions } from "@shared/data/champions";
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

  // Filter champions based on search query
  const filteredChampions = champions.filter(champion => 
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
          {value ? (
            champions.find(champion => champion.id === value)?.name || placeholder
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-gray-800 border-lol-gold-dark">
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
            No champion found.
          </CommandEmpty>
          <CommandGroup className="max-h-60 overflow-y-auto bg-gray-800">
            {isOptional && (
              <CommandItem
                value="none"
                onSelect={() => {
                  onChange("none");
                  setOpen(false);
                }}
                className="flex items-center gap-2 hover:bg-gray-700 focus:bg-gray-700 text-gray-200 bg-gray-800"
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
            {filteredChampions.map((champion) => (
              <CommandItem
                key={champion.id}
                value={champion.id}
                onSelect={() => {
                  onChange(champion.id);
                  setOpen(false);
                }}
                className="flex items-center gap-2 hover:bg-gray-700 focus:bg-gray-700 text-gray-200 bg-gray-800"
              >
                <div className="flex items-center gap-2 w-full">
                  <div>
                    <p className="text-sm font-medium">{champion.name}</p>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === champion.id ? "opacity-100 text-lol-gold" : "opacity-0"
                    )}
                  />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}