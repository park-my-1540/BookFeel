import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default function AvatarUser({ avatar, fallback }) {
  console.log(avatar);
  return (
    <Avatar className='cursor-pointer'>
      {avatar ? (
        <AvatarImage src={avatar} />
      ) : (
        <AvatarFallback>{fallback}</AvatarFallback>
      )}
    </Avatar>
  );
}
