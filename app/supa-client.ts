import {
  createBrowserClient,
  parseCookieHeader,
  createServerClient,
  serializeCookieHeader,
} from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export const browserClient = createBrowserClient<any>(
  "https://qjoeryjpfwehhavniipi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqb2VyeWpwZndlaGhhdm5paXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyOTY1MzIsImV4cCI6MjA2MDg3MjUzMn0.NWmMSU_swrc5LyVxlI3OWxjTkL54UAwI4XeUtPJxxIg"
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
