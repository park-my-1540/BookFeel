import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import type { MouseEventHandler } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "../ui/button";
export default function CardInDelete({
  isUsers,
  remove,
  update,
}: {
  isUsers: boolean;
  remove: MouseEventHandler<HTMLButtonElement>;
  update: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <>
      {isUsers ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon2"}
              className="border-none text-textSubtitle absolute bottom-[37%] right-0"
            >
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild className="cursor-pointer">
              <button type="button" onClick={remove}>
                <Trash2 className="w-4 h-4 mr-2" />
                삭제
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <button type="button" onClick={update}>
                <Pencil className="w-4 h-4 mr-2" />
                수정
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </>
  );
}
