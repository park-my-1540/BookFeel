import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
export default function SelectPair({
  name,
  required,
  label,
  description,
  placeholder,
  options,
  defaultValue,
}: {
  label: string;
  description?: string;
  name: string;
  required?: boolean;
  placeholder: string;
  defaultValue?: string;
  options: {
    label: string;
    value: string;
  }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className='space-y-2 flex flex-col '>
      <label
        className='flex flex-col gap-1'
        htmlFor={name}
        onClick={() => setOpen(!open)}
      >
        {label}
        <small className='text-muted-foreground'>{description}</small>
      </label>
      <Select
        name={name}
        required={required}
        open={open}
        onOpenChange={setOpen}
        defaultValue={defaultValue}
      >
        <SelectTrigger className='bg-white w-1/3 py-2 h-5'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
