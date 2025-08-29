import {
  loadTossPayments,
  type TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";
import { useCallback, useEffect, useMemo, useRef } from "react";

type Options = {
  userId: string | null; // 로그인 사용자의 id (없으면 게스트)
  total: number;
};

function sessionCustomerKey() {
  const k = sessionStorage.getItem("anon_ck");
  if (k) return k;
  const n = `anonymous-${crypto.randomUUID()}`;
  sessionStorage.setItem("anon_ck", n);
  return n;
}
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export function useTossPayment({ userId, total }: Options) {
  const totalRef = useRef(0);
  const widgetsRef = useRef<TossPaymentsWidgets | null>(null);
  const customerKey = useMemo(
    () =>
      userId ?? (typeof window === "undefined" ? null : sessionCustomerKey()),
    [userId]
  );
  useEffect(() => {
    totalRef.current = Math.max(0, Math.round(Number(total || 0)));
    if (widgetsRef.current) {
      widgetsRef.current.setAmount({
        value: totalRef.current,
        currency: "KRW",
      });
    }
  }, [total]);
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const toss = await loadTossPayments(clientKey);
      if (cancelled || !customerKey) return;
      const widgets = toss.widgets({ customerKey });
      widgetsRef.current = widgets;
      await widgets.setAmount({ value: totalRef.current, currency: "KRW" });
      await widgets.renderPaymentMethods({ selector: "#toss-payment-methods" });
      await widgets.renderAgreement({ selector: "#toss-payment-agreement" });
    })();

    return () => {
      cancelled = true;
    };
  }, [customerKey]);

  // 결제 요청 함수
  const requestPay = useCallback(
    async (args: {
      orderId?: string;
      orderName: string;
      customerEmail?: string;
      customerName?: string;
      successUrl: string;
      failUrl: string;
      metadata?: Record<string, unknown>;
    }) => {
      if (!widgetsRef.current)
        throw new Error("Toss 위젯이 아직 초기화되지 않았습니다.");

      const {
        orderId = crypto.randomUUID(),
        orderName,
        customerEmail,
        customerName,
        successUrl,
        failUrl,
        metadata,
      } = args;

      try {
        await widgetsRef.current.setAmount({
          value: totalRef.current,
          currency: "KRW",
        });
        await widgetsRef.current.requestPayment({
          orderId,
          orderName,
          customerEmail,
          customerName,
          successUrl,
          failUrl,
          metadata,
        });

        return { data: { requested: true, orderId }, error: null };
      } catch (error) {
        return { data: null, error: error };
      }
    },
    []
  );

  return {
    widgets: widgetsRef, // 필요 시 직접 접근 가능
    requestPay,
  };
}
