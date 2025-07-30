import type { Route } from "./+types/social-complete-page";
import { redirect } from "react-router";
// import { makeSSRClient } from "~/supa-client";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  // const { success, data } = paramsSchema.safeParse(params);
  // if (!success) {
  //   return redirect("/auth/login");
  // }
  // const url = new URL(request.url);
  // const code = url.searchParams.get("code");
  // if (!code) {
  //   return redirect("/auth/login");
  // }
  // const { client, headers } = makeSSRClient(request);
  // const { error } = await client.auth.exchangeCodeForSession(code);
  // /**
  //  * 사용자를 Github으로 보낸 다음, 사용자가 그것을 수락하면
  //  * Github이 우리를 위해 코드를 생성해줌. code=....
  //  * 이 코드는 완료페이지의 URL에 포함되어 우리에게 줌. 이 코드를 가져와서 사용자로 교환
  //  * 코드를 세션으로 교환하기만 하면 됨.
  //  *
  //  * header도 넘겨야하는데 코드와 세션을 교환하면, 사용자를 바로 로그인 시킴
  //  */
  // if (error) {
  //   throw error;
  // }
  // return redirect("/", { headers });
};
