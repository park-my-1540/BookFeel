import { format, startOfWeek } from "date-fns";
import { Loader2 } from "lucide-react";
import { useNavigation } from "react-router";
import BreadComp from "~/components/common/BreadComp";
import { Heading2 } from "~/components/ui/Typography";
import { BookCard } from "~/features/books/components/BestPreviewCard/BookCard";
import { getValue } from "~/util/util";
import Filter from "../components/Filter";
import { fetchBorrowItemSrch, type LoanBook } from "../services/fetchLibrary";
import type { Route } from "./+types/top-borrowed-page";

export const loader = async ({
  request,
}: Route.LoaderArgs): Promise<LoaderData> => {
  const today = new Date();
  const startDate = startOfWeek(today, { weekStartsOn: 1 });
  const endDate = today;
  const list = await fetchBorrowItemSrch({
    startDt: format(startDate, "yyyy-MM-dd"),
    endDt: format(endDate, "yyyy-MM-dd"),
  });
  return { list };
};

export const action = async ({
  request,
}: Route.ActionArgs): Promise<LoaderData> => {
  const formData = await request.formData();
  const age = getValue(formData.get("age") as string);
  const gender = getValue(formData.get("gender") as string);
  const subject = getValue(formData.get("subject") as string);
  const region = getValue(formData.get("region") as string);
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const list = await fetchBorrowItemSrch({
    ...(age !== "all" ? { age } : undefined),
    ...(gender !== "all" ? { gender } : undefined),
    ...(subject !== "all" ? { subject } : undefined),
    ...(region !== "all" ? { region } : undefined),
    ...(startDate ? { startDt: startDate } : undefined),
    ...(endDate ? { endDt: endDate } : undefined),
  });
  return { list };
};
type LoaderData = {
  list: LoanBook[];
};
export default function LoanExplorerPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  const list = actionData?.list ?? loaderData?.list ?? [];
  return (
    <>
      <div className="w-full  px-lg pt-sm pb-lg">
        <BreadComp
          link={[
            { to: "/library", name: "Library" },
            { to: "/top-borrowed", name: "인기 대출 도서" },
          ]}
        />
        <Heading2>인기 대출 도서</Heading2>
        <Filter />
        <div>
          {isSubmitting ? (
            <div className="flex items-center justify-center w-full min-h-[500px]">
              <Loader2 className="mr-2 h-10 w-10 animate-spin text-main" />
            </div>
          ) : (
            <div className="w-full space-y-2 pt-md px-md">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-16 min-h-[500px]">
                {list.map((book) => (
                  <BookCard
                    key={book.itemId}
                    itemId={book.itemId}
                    cover={book.cover}
                    author={book.author}
                    isbn={book.isbn}
                    title={book.title}
                    bestRank={book.bestRank}
                    loanCount={book.loanCount}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
