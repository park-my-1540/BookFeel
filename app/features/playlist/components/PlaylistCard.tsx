import { Title1, Caption } from "~/components/ui/Typography";
import { Card, CardContent } from "~/components/ui/card";
interface PlaylistCardProps {
  url: string;
  title: string;
  author: string;
  upvotes: number;
}
export function PlaylistCard({
  url,
  title,
  author,
  upvotes,
}: PlaylistCardProps) {
  return (
    <Card>
      <CardContent>
        <div className='flex flex-row'>
          <div className='w-full relative pb-[56.25%]'>
            <iframe
              src={url}
              title={title}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
              className='absolute top-0 left-0 w-full h-full'
            ></iframe>
          </div>
        </div>
        <div className='pt-5'>
          <Title1>{title}</Title1>
          <Caption>{author}</Caption>
        </div>
      </CardContent>
    </Card>
  );
}
