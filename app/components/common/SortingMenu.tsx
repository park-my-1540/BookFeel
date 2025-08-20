import { ChevronDownIcon } from "lucide-react";
import { useSearchParams } from "react-router";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { SORT_OPTIONS_MAP } from "~/features/contants";
export default function SortingDropMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <span className="text-sm capitalize">
          {SORT_OPTIONS_MAP.get(sorting)}
        </span>
        <ChevronDownIcon className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {[...SORT_OPTIONS_MAP.entries()].map(([key, value]) => (
          <DropdownMenuCheckboxItem
            className="capitalize cursor-pointer"
            onCheckedChange={(checked: boolean) => {
              if (checked) {
                searchParams.set("sorting", key);
                setSearchParams(searchParams);
              }
            }}
            key={key}
          >
            {value}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
