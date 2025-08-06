import { Title3, Caption } from "~/components/ui/Typography";
import { Card } from "~/components/ui/card";
import type { BookCardItem } from "../../type";

type Props = BookCardItem & { direction?: "col" | "row" };

export function BookCard({ direction = "col", ...props }: Props) {
  if (direction === "row") {
    return <RowCard {...props} />;
  }
  return <ColCard {...props} />;
}

function ColCard(props: BookCardItem) {
  return (
    <a href={props.link} target='_blank' className='block relative'>
      <Card className='bg-transparent border-none shadow-none relative'>
        <div className='flex flex-col gap-4'>
          <div className='w-full aspect-[2/3] shadow'>
            <img src={props.cover} alt={props.title} className='w-full' />
          </div>
          <div>
            <Title3>{props.title}</Title3>
            <Caption>{props.author}</Caption>
          </div>
        </div>
      </Card>
    </a>
  );
}

function RowCard(props: BookCardItem) {
  return (
    <a href={props.link} target='_blank' className='block relative'>
      <Card className='bg-transparent border-none shadow-none py-2 relative'>
        <div className='flex flex-row gap-4 items-center'>
          <div className='w-28 max-w-28 min-w-28 shadow'>
            <img
              src={props.cover}
              alt={props.title}
              className='w-full h-auto'
            />
          </div>
          <div>
            <Title3>{props.title}</Title3>
            <Caption>{props.author}</Caption>
          </div>
        </div>
      </Card>
    </a>
  );
}
