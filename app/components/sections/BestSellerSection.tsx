import { BookCard } from "~/features/books/components/BestPreviewCard/BookCard";
import type { BookCardItem } from "~/features/books/type";

export default function BestSellerSection({
  books,
}: {
  books: BookCardItem[];
}) {
  if (!Array.isArray(books)) return null;
  return (
    <div className='p-9 bg-white shadow-sm'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold'>Bestsellers</h2>
        <button className='text-sm text-gray-500 hover:underline'>
          View more
        </button>
      </div>
      <ol className='w-full'>
        {books.slice(0, 5).map((book) => (
          <BookCard
            direction='row'
            key={book.itemId}
            itemId={book.itemId}
            cover={book.cover}
            author={book.author}
            link={book.link}
            title={book.title}
            bestRank={book.bestRank}
          />
        ))}
      </ol>
    </div>
  );
}
