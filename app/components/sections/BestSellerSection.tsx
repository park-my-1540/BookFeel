import { BookCard } from "~/features/books/components/BestPreviewCard/BookCard";
import type { BookCardItem } from "~/features/books/type";
import { Title1 } from "../ui/Typography";

export default function BestSellerSection({
  books,
}: {
  books: BookCardItem[];
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-borderGray bg-white p-sm shadow-sm">
      <Title1 className="mb-3">Bestsellers</Title1>
      {books.length === 0 && <p>베스트셀러 목록을 불러오지 못했어요.</p>}
      <ol className="w-full divide-y divide-borderGray">
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
