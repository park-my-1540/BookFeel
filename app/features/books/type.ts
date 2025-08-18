export type TargetParams = "title" | "person" | "publisher";
export type FetchBooksParams = {
  query: string;
  target?: TargetParams;
};

// 전체 API 응답 타입
export type BookItemResponse = {
  id: string;
  url: string;
  title: string;
  author: string;
  publisher: string;
  cover: string;
  price: number;
  sale_price: number;
  contents?: string;
  description?: string;
  datetime: Date;
  isbn: string;
  status: string;
  translators: string[];
};

export type FetchBooksResponse = {
  documents: BookItemResponse[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
};

export type BookItem = BookSummary | BookDetail;

export type BookSummary = Pick<
  BookItemResponse,
  "id" | "title" | "author" | "price" | "sale_price" | "cover" | "isbn"
>;
export type BookDetail = BookSummary & Pick<BookItemResponse, "contents">;

/**
 * BestSeller
 */
export type BookRankingResponse = {
  item?: BookCardItem[];
};
export type BookCardItem = {
  itemId: string;
  cover: string;
  title: string;
  bestRank?: string;
  author: string;
  priceSales?: number;
  priceStandard?: number;
  contents?: string;
};
