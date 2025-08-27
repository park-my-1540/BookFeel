import type { BookItemResponse } from "~/features/books/type";

export function isEmpty(value: unknown): boolean {
  if (value == null) return true; // null 또는 undefined
  if (typeof value === "object") {
    return Object.keys(value).length === 0; // 객체 또는 배열이 비어있는지 확인
  }
  if (typeof value === "string") {
    return value.trim().length === 0; // 빈 문자열 확인
  }
  return false;
}

export function formatKrCurrency(amount: number | string): string {
  const num = typeof amount === "string" ? parseInt(amount, 10) : amount;
  if (isNaN(num)) return "0원";
  return `${num.toLocaleString("ko-KR")}원`;
}

export function generateId(book: BookItemResponse): string {
  if (book.isbn) return book.isbn?.trim().split(" ")[0];

  const raw = `${book.title}-${book.author}-${book.publisher}`;
  return raw.replace(/\s+/g, "").toLowerCase();
}

export function getValue(v: FormDataEntryValue | null) {
  if (typeof v !== "string") return undefined;
  return v.split("-")[1]; // "age-all" → "all"
}
