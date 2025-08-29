import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { Link, redirect, useOutletContext } from "react-router";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Body1, Title1 } from "~/components/ui/Typography";
import { useShoppingCart } from "~/features/shoppingcart/hooks/useShoppingCart";
import { getUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import { createOrders } from "../mutations";
import type { Route } from "./+types/payment-success-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "구매 완료" }];
};

const paramsSchema = z.object({
  paymentType: z.string(),
  orderId: z.string().uuid(),
  paymentKey: z.string(),
  amount: z.coerce.number(),
});

const TOSS_SECRET_KEY = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data, error } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );

  if (!success) {
    return new Response(null, { status: 400 });
  }

  const encryptedSecretKey =
    "Basic " + Buffer.from(TOSS_SECRET_KEY + ":").toString("base64");

  const { client } = makeSSRClient(request);
  const userId = await getUserId(client);
  /**
   * secret key 값에 클론을 붙이고 그걸 base64문자열로 변환
   * 클라이언트, github등 외부에 노출되면 안되기 때문
   * 시크릿 키를 이용하면 Toss 웹사이트와 통신 할 수 있음
   */

  const response = await fetch(
    "https://api.tosspayments.com/v1/payments/confirm",
    {
      method: "POST",
      headers: {
        Authorization: encryptedSecretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: data.orderId,
        paymentKey: data.paymentKey,
        amount: data.amount,
      }),
    }
  );
  const responseData = await response.json();
  const metadata = responseData.metadata;

  if (!metadata) {
    return redirect(`/shoppingcart`);
  }

  let payMethod = "";
  switch (responseData.method) {
    case "카드":
      payMethod = `${responseData.card?.cardType ?? ""}카드`;
      break;
    case "간편결제": // 카카오페이, 네이버페이, 토스페이, 페이코
      payMethod = responseData.easyPay?.provider ?? "간편결제";
      break;
    default:
      payMethod = responseData.method; // fallback
  }

  if (userId) {
    await createOrders(client, {
      userId,
      total_price: metadata.total_price,
      title: metadata.title,
      cover_url: metadata.cover_url,
      method: payMethod,
    });
  }

  return { ...metadata };
};

/**
 * 중요 : 사용자가 실제로 결제한 프로모션 일수와 계산이 맞는지 metadata로 확인
 * payments 테이블을 만들어 db에 저장해두는것도 ... vat, currency, metadata
 * TODO : 호스트 생긴 후에 cron job 만들기
 * 날마다 체크하며 해당 일자인 경우 is_Promoted : true 해서 프로모트인거 노출시키기
 */

export default function PromoteSuccessPage({
  loaderData,
}: Route.ComponentProps) {
  const { isLoggedIn } = useOutletContext<{ isLoggedIn: boolean }>();
  const { clearCart } = useShoppingCart({ _isLoggedIn: isLoggedIn });
  useEffect(() => {
    clearCart();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-[var(--header-h)] text-center p-4">
      <CheckCircle className="text-green-500 mb-4" size={72} />
      <Title1 className="my-5">결제가 완료되었습니다!</Title1>
      <Body1 className="mb-5 text-textSubtitle">
        주문해주셔서 감사합니다. 주문 내역은 이메일로 발송됩니다.
      </Body1>

      <Button asChild size={"lg"} className="py-6">
        <Link to="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  );
}
