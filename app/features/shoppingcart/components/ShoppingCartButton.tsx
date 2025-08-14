import type { BookCardItem } from "~/features/books/type";
import { Button } from "../../../components/ui/button";
import { ShoppingCart } from "lucide-react";

type ShoppingCartButtonProps = {
  book: BookCardItem;
  size?: "sm" | "lg";
  onSubmit: (book: BookCardItem) => void;
};

export default function ShoppingCartButton({
  book,
  onSubmit,
}: ShoppingCartButtonProps) {
  return (
    <Button size={"sm"} variant={"outline"} onClick={() => onSubmit(book)}>
      <ShoppingCart />
    </Button>
  );
}
