import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Heading1 } from "~/components/ui/Typography";
import BookNoResult from "~/features/books/components/BookNoResult";
import { OrderCard } from "~/features/orders/component/OrderCard";
import { getOrders } from "~/features/orders/queries";
import type { Order } from "~/features/orders/type";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "../queries";
import type { Route } from "./+types/profile-order-page";

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `주문내역 - ${params.username}` },
];
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const orders = await getOrders(client, {
    userId,
  });

  return { orders };
};
type OrdersProps = {
  loaderData: { orders: Order[] };
};
export default function ProfilePlaylistPage({
  loaderData,
}: Omit<Route.ComponentProps, "loaderData"> & OrdersProps) {
  return (
    <div className="w-full pb-md">
      <Heading1 className="mt-10 mb-5">주문/배송 조회</Heading1>

      {!loaderData?.orders?.length ? (
        <BookNoResult message="주문내역이 없습니다." />
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-gray border-t-2 border-borderGray">
              <TableHead className="text-center">주문일자</TableHead>
              <TableHead className="text-center w-[300px]">주문상품</TableHead>
              <TableHead className="text-center">구매가</TableHead>
              <TableHead className="text-center">결제방법</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loaderData?.orders.map((invoice: Order) => (
              <OrderCard
                key={invoice.id}
                id={invoice.id}
                created_at={invoice.created_at}
                cover_url={invoice.cover_url}
                title={invoice.title}
                total_price={invoice.total_price}
                method={invoice.method}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
