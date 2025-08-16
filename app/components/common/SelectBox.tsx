import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Body2Bold } from "@components/ui/Typography";
import { useState } from "react";
import type { TargetParams } from "~/features/books/type";

type selectProps = {
  name: string;
  placeholder?: string;
  value: string;
  className?: string;
  onChange: (value: TargetParams) => void;
  options: {
    key: string;
    value: string;
    label: string;
  }[];
};

export default function SelectBox({
  name,
  value,
  placeholder = "",
  className = "",
  options,
  onChange,
}: selectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Select
      name={name}
      open={open}
      value={value}
      onOpenChange={setOpen}
      onValueChange={onChange}
    >
      <SelectTrigger className={`${className} border-b shadow-none`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.key} value={option.value}>
              <Body2Bold>{option.label}</Body2Bold>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
