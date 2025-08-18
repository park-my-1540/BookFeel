import type { BookItem } from "../../type";

type BookThumbnailProps = {
  book: BookItem;
  width?: number;
  height?: number;
  size?: "sm" | "lg";
};

const fallback =
  "https://search1.kakaocdn.net/thumb/C116x164.q85/?fname=http://search1.daumcdn.net/search/statics/common/img/noimg/4grid.png";

export default function BookThumbnail({
  book,
  width = 48,
  height = 68,
  size = "sm",
}: BookThumbnailProps) {
  return (
    <div className="relative" style={{ maxWidth: width, maxHeight: height }}>
      <img
        width={width}
        height={height}
        alt={book.title}
        className="size-full object-cover"
        src={book.cover === "" ? fallback : book.cover}
      />
    </div>
  );
}
