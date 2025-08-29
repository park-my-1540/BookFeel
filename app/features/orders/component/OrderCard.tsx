import { TableCell, TableRow } from "@/components/ui/table";
import { DateTime } from "luxon";

export function OrderCard({
  id,
  created_at,
  cover_url,
  title,
  total_price,
  method,
}: Order) {
  return (
    <TableRow key={id}>
      <TableCell className="text-center font-mangoBold">
        <p className="text-textSecondary">
          {DateTime.fromISO(created_at).toFormat("yyyy-MM-dd")}
        </p>
        <p className="text-destructive">Y{id}</p>
      </TableCell>
      <TableCell className="text-center font-medium">
        <div className="flex gap-8 items-center">
          <div className="w-[90px]">
            <div className="thumb">
              <img src={cover_url} alt={title} className="shadow-lg" />
            </div>
          </div>
          <div className="w-[60%] text-start">
            <p className="text-base font-mangoBold">{title}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center font-medium">
        <span className="text-main font-mangoBold">
          {total_price.toLocaleString()}
        </span>{" "}
        원
      </TableCell>
      <TableCell className="text-center">{method}</TableCell>
    </TableRow>
  );
}
