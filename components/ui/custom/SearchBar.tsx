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
} from "@/components/ui/autocomplete";
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
    <div
      className={cn(
        "relative w-full bg-zinc-50 dark:bg-background border border-zinc-200 dark:border-border rounded-lg flex items-center shadow-sm text-zinc-400 select-none transition-all focus-within:border-zinc-400 dark:focus-within:border-zinc-500",
        className,
      )}
    >
      <Autocomplete
        value={value}
        onValueChange={onChange}
        items={items}
        itemToStringValue={itemToStringValue ?? ((item) => item.name)}
      >
        <div className="relative flex items-center w-full h-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none z-10" />
          <AutocompleteInput
            placeholder={placeholder}
            showClear
            className={cn(
              "w-full bg-transparent border-none pl-9 pr-4 py-2 text-sm outline-none transition focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400",
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
