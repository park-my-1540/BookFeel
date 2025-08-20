import { getLoggedInUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import { togglePostpvote } from "../mutations";
import type { Route } from "./+types/post-page";

export async function action({ request, params }: Route.ActionArgs) {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);

  await togglePostpvote(client, {
    postId: params.postId,
    userId,
  });
}
