import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default function AvatarUser({
  avatar,
  fallback,
}: {
  avatar: string;
  fallback: string;
}) {
  return (
    <Avatar className="cursor-pointer">
      {avatar ? (
        <AvatarImage src={avatar} />
      ) : (
        <AvatarFallback>{fallback}</AvatarFallback>
      )}
    </Avatar>
  );
}
