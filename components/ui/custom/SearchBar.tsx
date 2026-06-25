import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/Input-Group";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => {
  return (
    <InputGroup className="absolute right-3 w-2/5 bg-white dark:bg-background border border-zinc-200 text-zinc-700 dark:text-foreground rounded pl-2 py-1 text-xs outline-none transition dark:border-border has-[input:focus-visible]:!border-zinc-400 has-[input:focus-visible]:!ring-1 has-[input:focus-visible]:!ring-zinc-400/20">
      <InputGroupInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          variant="window"
          className="hover:bg-zinc-200/50 dark:hover:bg-secondary rounded transition cursor-pointer"
          disabled
        >
          <Search className="size-3.5 text-zinc-400" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};
