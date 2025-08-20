import {
  createBrowserClient,
  createServerClient,
  parseCookieHeader,
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
    "https://spmbavubrdyesqqcfeim.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwbWJhdnVicmR5ZXNxcWNmZWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NzM4ODAsImV4cCI6MjA2OTQ0OTg4MH0.pW1iPtRK3jB7sAkBwKULabcilxBZl96CmbyMrqStu0c",
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

export const adminClient = createClient(
  "https://spmbavubrdyesqqcfeim.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwbWJhdnVicmR5ZXNxcWNmZWltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzg3Mzg4MCwiZXhwIjoyMDY5NDQ5ODgwfQ.c5_I9-WqlhZpz22PpPg1kX96OWYPhaad21Da8-5-2Uo",
  {
    auth: {
      persistSession: false,
    },
  }
);
