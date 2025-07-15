import Link from "next/link";
import { usePathname } from "next/navigation";
import { Body1 } from "@/components/ui/Typography";

const tabItems = [
  { label: "도서 검색", to: "/" },
  { label: "내가 찜한 책", to: "/wishlist" },
];

export default function Tab() {
  const pathname = usePathname();

  return (
    <div className='flex gap-10'>
      {tabItems.map(({ label, to }) => {
        const isActive = pathname === to;

        return (
          <Link
            key={to}
            href={to}
            className={
              isActive ? "border-b-2 border-primary" : "text-textSubtitle"
            }
          >
            <Body1>{label}</Body1>
          </Link>
        );
      })}
    </div>
  );
}
