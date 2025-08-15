import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { togglePlaylistUpvote } from "../queries";
import type { Route } from "./+types/playlist-upvote-page";

export async function action({ request, params }: Route.ActionArgs) {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);

  await togglePlaylistUpvote(client, {
    playlistId: params.playlistId,
    userId,
  });
}
