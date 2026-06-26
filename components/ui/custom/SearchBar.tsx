"use client";

import type { Key } from "react";
import { Search } from "lucide-react";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from "@/components/ui/Autocomplete";
import { cn } from "@/lib/utils";

interface SearchBarProps<T extends { name: string }> {
  value: string;
  onChange: (value: string) => void;
  items: readonly T[];
  placeholder?: string;
  onSelect?: (item: T) => void;
  className?: string;
  inputClassName?: string;
  getItemKey?: (item: T) => Key;
  itemToStringValue?: (item: T) => string;
}

export function SearchBar<T extends { name: string }>({
  value,
  onChange,
  items,
  placeholder,
  onSelect,
  className,
  inputClassName,
  getItemKey,
  itemToStringValue,
}: SearchBarProps<T>) {
  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <Autocomplete
        value={value}
        onValueChange={onChange}
        items={items}
        itemToStringValue={itemToStringValue ?? ((item) => item.name)}
      >
        <div className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none z-10" />
          <AutocompleteInput
            placeholder={placeholder}
            showClear
            className={cn(
              "rounded border border-zinc-200 bg-white pl-9 pr-2 py-1 text-xs text-zinc-700 outline-none transition dark:border-border dark:bg-background dark:text-foreground focus-visible:border-zinc-400/20! focus-visible:ring-1 focus-visible:ring-zinc-400! disabled:cursor-not-allowed disabled:opacity-50 w-full",
              inputClassName,
            )}
          />
        </div>

        <AutocompleteContent>
          <AutocompleteEmpty>No results found.</AutocompleteEmpty>

          <AutocompleteList>
            {(item) => (
              <AutocompleteItem
                key={getItemKey ? getItemKey(item) : item.name}
                value={item}
                onClick={() => onSelect?.(item)}
              >
                {item.name}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    </div>
  );
}
