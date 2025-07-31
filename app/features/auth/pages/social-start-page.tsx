import type { Route } from "./+types/social-start-page";
import { z } from "zod";
import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";

const paramsSchema = z.object({
  provider: z.enum(["google", "kakao"]),
});
export function meta() {
  return [
    { title: "소셜 로그인" },
    { name: "description", content: "소셜 로그인을 시작합니다" },
  ];
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { success, data } = paramsSchema.safeParse(params);
  if (!success) {
    return redirect("/auth/login");
  }
  const { provider } = data;
  const baseRedirectUrl = import.meta.env.VITE_REDIRECT_URL;
  const redirectTo = `${baseRedirectUrl}/auth/social/${provider}/complete`;

  const { client, headers } = makeSSRClient(request);
  const {
    data: { url },
    error,
  } = await client.auth.signInWithOAuth({
    //생성된 클라이언트를 통해서 인증작업
    provider,
    options: {
      redirectTo,
    },
  });
  if (url) {
    return redirect(url, { headers });
  }
  if (error) {
    throw error;
  }
};
// 이 쿠키는 브라우저가 Github과 로그인 과정을 시작했다는 걸 클라이언트에게 알려주는 역할
// Github에서 돌아왔을때 supabase client와 같은 기기에서 Github으로 로그인 과정을 시작했다는걸 알수있음.
// 같은 기기에서 로그인을 끝내기 위한 보안상의 이유
