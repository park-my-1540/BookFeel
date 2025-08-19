import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./button";

type Props = {
  isExpanded: boolean;
  className?: string;
  onClick?: () => void;
};

export default function DetailToggleButton({
  isExpanded,
  onClick,
  className,
}: Props) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn("bg-white", className)}
    >
      {isExpanded ? (
        <ChevronUp size={25} className="text-textPrimary" />
      ) : (
        <ChevronDown size={25} className="text-textPrimary" />
      )}
    </Button>
  );
}
