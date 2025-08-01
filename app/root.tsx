import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigation,
} from "react-router";
import Navigation from "./components/navigation";
import type { Route } from "./+types/root";
import "./app.css";
import { makeSSRClient } from "./supa-client";
import { getUserProfileById } from "./features/users/queries";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='w-full bg-lightGray'>
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
      // 💡 프로필이 없음 = 탈퇴했거나 권한 없음
      await client.auth.signOut(); // 로그아웃
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
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const isLoggedIn = loaderData.user !== null;

  return (
    <div className='h-screen w-full'>
      {pathname.includes("/auth") ? null : (
        <Navigation
          username={loaderData.profile?.username}
          avatar={loaderData.profile?.avatar}
          name={loaderData.profile?.name}
          isLoggedIn={isLoggedIn}
        />
      )}
      <Outlet
        context={{
          isLoggedIn,
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
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
