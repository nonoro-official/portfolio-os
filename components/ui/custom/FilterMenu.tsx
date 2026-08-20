import { NavMenu } from "@/components/ui/custom/NavMenu";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterMenuProps {
  label: string;
  options: readonly string[];
  selected: readonly string[];
  onToggle: (value: string, checked: boolean) => void;
}

export function FilterMenu({
  label,
  options,
  selected,
  onToggle,
}: FilterMenuProps) {
  return (
    <NavMenu buttonName={label}>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <Label key={option} className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={selected.includes(option)}
              onCheckedChange={(checked) => onToggle(option, checked === true)}
            />
            {option}
          </Label>
        ))}
      </div>
    </NavMenu>
  );
}
