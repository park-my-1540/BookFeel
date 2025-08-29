import { Link, NavLink, Outlet, useOutletContext } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button, buttonVariants } from "~/components/ui/button";
import { Caption, Title1 } from "~/components/ui/Typography";
import { cn } from "~/lib/utils";
import { makeSSRClient } from "~/supa-client";
import { getUserProfile } from "../queries";
import type { Route } from "./+types/profile-layout";

export const loader = async ({
  request,
  params,
}: Route.LoaderArgs & { params: { username: string } }) => {
  const { client, headers } = makeSSRClient(request);
  const user = await getUserProfile(client, {
    username: params.username,
  });
  return { user };
};

export default function ProfileLayout({
  loaderData,
  params,
}: Route.ComponentProps) {
  const { isLoggedIn, username } = useOutletContext<{
    isLoggedIn: boolean;
    username?: string;
  }>();

  return (
    <div className="w-full px-lg py-sm ">
      <div className="flex items-center gap-6">
        <Avatar className="size-40">
          {loaderData.user.avatar ? (
            <AvatarImage src={loaderData.user.avatar} />
          ) : (
            <AvatarFallback className="text-2xl">
              {loaderData.user.name.charAt(0)}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="space-y-3">
          <div className="flex gap-4 items-center">
            <Title1>{loaderData.user.name}</Title1>

            {isLoggedIn && username == params.username ? (
              <Button variant="outline" asChild>
                <Link to="/my/settings">프로필 편집하기</Link>
              </Button>
            ) : null}
          </div>
          <div className="flex gap-2 items-center">
            <Caption>@{loaderData.user.username}</Caption>
          </div>
        </div>
      </div>
      <div className="flex gap-5 my-8">
        {[
          { label: "About", to: `/users/${loaderData.user.username}` },
          {
            label: "Playlists",
            to: `/users/${loaderData.user.username}/playlist`,
          },
          {
            label: "Orders",
            to: `/users/${loaderData.user.username}/order`,
          },
        ].map((item, index) => (
          <NavLink
            end
            key={`${index}-${item}`}
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "outline" }),
                isActive &&
                  "text-white bg-main hover:text-white hover:bg-main/90 "
              )
            }
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="w-full">
        <Outlet
          context={{
            isLoggedIn,
            bio: loaderData.user.bio,
            email: loaderData.user.email,
          }}
        />
      </div>
    </div>
  );
}
