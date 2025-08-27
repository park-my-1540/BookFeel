import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

type Props = {
  name: string; // form 필드명 (startDt / endDt)
  placeholder?: string;
  defaultValue?: string; // "yyyy-MM-dd"
  value: Date | undefined; // "yyyy-MM-dd"
  onChange?: (d: Date | undefined) => void;
};

export function DatePickerField({ name, value, onChange, placeholder }: Props) {
  const [open, setOpen] = React.useState(false);
  const display = value ? format(value, "yyyy-MM-dd") : "Select a day";

  return (
    <div className="inline-flex">
      <input type="hidden" name={name} value={display} disabled={!value} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="w-48 justify-between font-normal"
          >
            {display || placeholder}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            disabled={{ after: new Date() }}
            selected={value}
            captionLayout="dropdown"
            onSelect={(d) => {
              onChange?.(d);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
