import {
  createBrowserClient,
  parseCookieHeader,
  createServerClient,
  serializeCookieHeader,
} from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export const browserClient = createBrowserClient<any>(
  "https://spmbavubrdyesqqcfeim.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwbWJhdnVicmR5ZXNxcWNmZWltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzg3Mzg4MCwiZXhwIjoyMDY5NDQ5ODgwfQ.c5_I9-WqlhZpz22PpPg1kX96OWYPhaad21Da8-5-2Uo"
);

export const makeSSRClient = (request: Request) => {
  const headers = new Headers();
  const serverSideClient = createServerClient<any, "public">(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = parseCookieHeader(
            request.headers.get("Cookie") ?? ""
          );
          return cookies.map((cookie) => ({
            ...cookie,
            value: cookie.value ?? "",
          }));
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options)
            );
          });
        }, // 여기서 받은 쿠키들을 유저에게 전달할 응답을 붙여주기만 하면 됨
      },
    }
  );

  return {
    client: serverSideClient,
    headers,
  };
};

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // 서비스 롤 키

export const adminClient = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
  },
});
