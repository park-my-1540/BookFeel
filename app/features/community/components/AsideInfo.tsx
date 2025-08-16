import { DateTime } from "luxon";
import AvatarUser from "~/components/common/AvatarUser";

export default function AsideInfo({
  avatar,
  author,
  created_at,
}: {
  avatar: string;
  author: string;
  created_at: string;
}) {
  return (
    <aside className='col-span-2 space-y-5 border rounded-lg shadow-sm p-5'>
      <div className='flex gap-5'>
        <AvatarUser avatar={avatar} fallback={author[0]} />
        <div className='flex flex-col'>
          <h4 className='text-lg font-medium'>{author}</h4>
          <span>🚀 Joined {DateTime.fromISO(created_at).toRelative()} </span>
        </div>
      </div>
    </aside>
  );
}
