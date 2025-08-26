import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import Navigation from "./components/navigation";
import { getUserProfileById } from "./features/users/queries";
import { makeSSRClient } from "./supa-client";

export const meta: Route.MetaFunction = () => [
  { title: "BookFeel" },
  {
    name: "description",
    content:
      "오늘의 감정에 맞는 책을 찾고, 음악 플레이리스트와 함께 즐겨보세요. Bookfeel이 당신의 독서 경험을 더 특별하게 만듭니다",
  },
  { property: "og:title", content: "BookFeel" },
  {
    property: "og:description",
    content:
      "오늘의 감정에 맞는 책을 찾고, 음악 플레이리스트와 함께 즐겨보세요. Bookfeel이 당신의 독서 경험을 더 특별하게 만듭니다",
  },
  { property: "og:url", content: "https://book-feel.vercel.app/" },
  {
    property: "og:image",
    content: "https://book-feel.vercel.app/thumbnail.png",
  },
  { property: "og:type", content: "website" },
];

export const links: Route.LinksFunction = () => [
  {
    rel: "icon",
    href: "/icon.png", // public 폴더에 favicon.ico 두기
    type: "image/x-icon",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="w-full bg-lightGray">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);

  const {
    data: { user },
  } = await client.auth.getUser();
  if (user && user.id) {
    const profile = await getUserProfileById(client, { id: user.id });
    if (!profile) {
      await client.auth.signOut();
      return;
    }
    return { user, profile };
  }
  return {
    user: null,
    profile: null,
  };
};

export default function App({ loaderData }: Route.ComponentProps) {
  const { pathname } = useLocation();
  const isLoggedIn = loaderData?.user !== null;

  return (
    <div className="h-screen w-full">
      {pathname.includes("/auth") ? null : (
        <Navigation
          username={loaderData?.profile?.username}
          avatar={loaderData?.profile?.avatar}
          name={loaderData?.profile?.name}
          isLoggedIn={isLoggedIn}
        />
      )}
      <Outlet
        context={{
          isLoggedIn,
          userId: loaderData?.user?.id,
          username: loaderData?.profile?.username,
          name: loaderData?.profile?.name,
          avatar: loaderData?.profile?.avatar,
        }}
      />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
