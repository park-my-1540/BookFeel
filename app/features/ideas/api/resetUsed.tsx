import { adminClient } from "~/supa-client";
import { resetUsedGemini } from "../mutaions";
import type { Route } from "./+types/resetUsed";

export const action = async ({ request }: Route.ActionArgs) => {
  //   endpoint 보호
  if (request.method !== "POST") {
    return new Response(null, { status: 404 });
  }

  //   필요한 헤더 있는지
  const headers = request.headers.get("Bookfeel-Api-Version");
  if (!headers || headers !== "Bookfeel-Api-Version") {
    return new Response("Unauthorized", { status: 401 });
  }
  await resetUsedGemini(adminClient);
  return Response.json({ ok: true });
};
