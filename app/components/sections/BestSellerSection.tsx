import { BookCard } from "~/features/books/components/BestPreviewCard/BookCard";
import type { BookCardItem } from "~/features/books/type";
import { Title1 } from "../ui/Typography";

export default function BestSellerSection({
  books,
}: {
  books: BookCardItem[];
}) {
  if (!Array.isArray(books)) return null;
  return (
    <div className="p-sm bg-white shadow-sm">
      <Title1 className="mb-3">Bestsellers</Title1>
      <ol className="w-full">
        {books.slice(0, 5).map((book) => (
          <BookCard
            direction="row"
            key={book.itemId}
            itemId={book.itemId}
            cover={book.cover}
            author={book.author}
            title={book.title}
            bestRank={book.bestRank}
            priceSales={book.priceSales}
            priceStandard={book.priceStandard}
          />
        ))}
      </ol>
    </div>
  );
}
