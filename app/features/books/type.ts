export type TargetParams = "title" | "person" | "publisher";
export type FetchBooksParams = {
  query: string;
  page?: number;
  size?: number;
  target?: TargetParams;
};

// 전체 API 응답 타입
export type BookItemResponse = {
  id: string;
  url: string;
  title: string;
  authors: string[];
  publisher: string;
  thumbnail: string;
  price: number;
  sale_price: number;
  contents: string;
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
  "id" | "title" | "authors" | "price" | "sale_price" | "thumbnail" | "url"
>;
export type BookDetail = BookSummary & Pick<BookItemResponse, "contents">;
