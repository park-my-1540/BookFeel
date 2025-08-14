import { useOutletContext } from "react-router";
import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `Profile: ${params.username}` },
];

export default function ProfilePage({}) {
  const { email, bio } = useOutletContext<{
    email: string;
    bio: string;
  }>();
  return (
    <div className='flex flex-col space-y-10 max-w-screen-md'>
      <div className='space-y-2'>
        <h4 className='text-lg font-bold'>Bio</h4>
        <p className='text-muted-foreground'>{bio}</p>
      </div>
      <div className='space-y-2'>
        <h4 className='text-lg font-bold'>Email</h4>
        <p className='text-muted-foreground'>{email}</p>
      </div>
    </div>
  );
}
