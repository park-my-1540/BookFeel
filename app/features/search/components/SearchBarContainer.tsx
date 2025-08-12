import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import SearchDetailFilter from "@/features/search/components/SearchDetailFilter";
import SearchInput from "@/features/search/components/SearchInput";
import { X } from "lucide-react";
import { Button } from "~/components/ui/button";

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button className='absolute top-5 right-5' onClick={onClick}>
      <X className='w-6 h-6 text-textSecondary' />
    </button>
  );
}

// popover 분리 컴포넌트
function PopoverComponent() {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (value: boolean) => setOpen(value);
  const handleClose = () => setOpen(false);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant='outline'>상세검색</Button>
      </PopoverTrigger>
      <PopoverContent
        className='py-10 px-5 space-y-5 w-[360px]'
        sideOffset={15}
      >
        <CloseButton onClick={handleClose} />
        <SearchDetailFilter onClose={handleClose} />
      </PopoverContent>
    </Popover>
  );
}

export default function SearchBarContainer() {
  return (
    <div className='relative flex flex-row w-full justify-between items-center gap-6 flex-1 my-6 z-10'>
      <SearchInput />
      <div className='flex-shrink-0'>
        <PopoverComponent />
      </div>
    </div>
  );
}
