import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import type { BookCardItem } from "~/features/books/type";
import { Button } from "../../../components/ui/button";

type ShoppingCartButtonProps = {
  book: BookCardItem;
  size?: "sm" | "lg";
  onSubmit: (book: BookCardItem) => void;
};

export default React.memo(function ShoppingCartButton({
  book,
  onSubmit,
}: ShoppingCartButtonProps) {
  return (
    <Button size="sm" variant={"default"} onClick={() => onSubmit(book)}>
      <FontAwesomeIcon icon={faCartShopping as IconProp} />
    </Button>
  );
});
