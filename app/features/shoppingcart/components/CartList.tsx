import { Trash2 } from "lucide-react";
import PriceTag from "~/components/ui/pricetag";
import { Caption, Title3 } from "~/components/ui/Typography";
import type { BookCardItem } from "~/features/books/type";

type CartListProps = {
  item: BookCardItem;
  handleRemove: (id: string) => void;
};
export default function CartList({ item, handleRemove }: CartListProps) {
  return (
    <div key={item.itemId} className="flex gap-8 py-4 border-b">
      <img src={item.cover} alt={item.title} className="w-24 h-auto" />
      <div className="flex-1">
        <Title3>{item.title}</Title3>
        <Caption>{item.author}</Caption>
      </div>
      <PriceTag
        priceSales={item.priceSales}
        priceStandard={item.priceStandard}
      />
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleRemove(item.itemId)}
          className="text-textSubtitle hover:text-red-500"
        >
          <Trash2 className="text-textSubtitle" size={20} />
        </button>
      </div>
    </div>
  );
}
