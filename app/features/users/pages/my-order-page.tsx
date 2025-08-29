import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";
import { getUserProfileById } from "../queries";
import type { Route } from "./+types/my-profile-page";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();
  if (user) {
    const profile = await getUserProfileById(client, { id: user.id });
    return redirect(`/users/${encodeURIComponent(profile.username)}/order`);
  }
  return redirect("/auth/login");
};

export default function MyProfilePage() {
  return <div>Profile</div>;
}
