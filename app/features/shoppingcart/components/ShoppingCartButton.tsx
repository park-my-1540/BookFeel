import type { BookItem } from "~/features/books/type";
import { Button } from "../../../components/ui/button";
import { ShoppingCart } from "lucide-react";

type ShoppingCartButtonProps = {
  book: BookItem;
  size?: "sm" | "lg";
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
