import {
  Headphones,
  House,
  LibraryBig,
  Rocket,
  Search,
  type LucideProps,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { cn } from "~/lib/utils";

interface menuType {
  name: string;
  to: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  items?: {
    name: string;
    description: string;
    to: string;
  }[];
}

const menus: menuType[] = [
  {
    name: "Home",
    to: "/",
    icon: House,
  },
  {
    name: "Search",
    to: "/books",
    icon: Search,
    items: [
      {
        name: "도서 검색",
        description: "읽고 싶은 책을 찾아보세요",
        to: "/books",
      },
    ],
  },
  {
    name: "Library",
    to: "/library",
    icon: LibraryBig,
    items: [
      {
        name: "도서관 찾기",
        description: "책 소장 여부와 대출 가능 도서관을 확인해보세요",
        to: "/library",
      },
      {
        name: "인기 대출 도서 찾기",
        description: "도서관에서 가장 많이 빌려본 책들을 확인해보세요",
        to: "/library/top-borrowed",
      },
    ],
  },
  {
    name: "Playlists",
    to: "/playlists",
    icon: Headphones,
    items: [
      {
        name: "플레이리스트 보기",
        description: "책과 어울리는 플레이리스트를 즐겨보세요",
        to: "/playlists",
      },
      {
        name: "플레이리스트 등록",
        description: "직접 만든 플레이리스트를 공유해보세요",
        to: "/playlists/submit",
      },
    ],
  },

  {
    name: "Community",
    to: "/community",
    icon: Rocket,
    items: [
      {
        name: "둘러보기",
        description: "다른 사람들과 책과 음악을 나눠보세요",
        to: "/community",
      },
    ],
  },
];

export default function Menu() {
  const { pathname } = useLocation();
  const currentMenu = menus.find(
    ({ to }) => to !== "/" && (pathname === to || pathname.startsWith(to + "/"))
  );

  return (
    <div className="border-t border-borderGray/60">
      <div className="mx-auto max-w-screen-2xl px-lg">
        <nav aria-label="주 메뉴" className="py-1 md:hidden">
          <ul className="grid grid-cols-5 gap-1">
            {menus.map(({ name, to, icon: Icon }) => (
              <li key={to} className="min-w-0">
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-[0.65rem] font-medium hover:bg-lightGray",
                      isActive && "bg-lightGray font-bold text-main"
                    )
                  }
                >
                  <Icon size={17} aria-hidden="true" />
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
          {currentMenu?.items && currentMenu.items.length > 1 && (
            <div className="mt-1 flex flex-wrap gap-x-4 border-t border-borderGray/60 pt-1">
              {currentMenu.items.map(({ name, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  end
                  className={({ isActive }) =>
                    cn("py-2 text-sm", isActive && "font-bold text-main")
                  }
                >
                  {name}
                </NavLink>
              ))}
            </div>
          )}
        </nav>

        <NavigationMenu
          aria-label="주 메뉴"
          viewport={false}
          className="hidden py-2 md:block"
        >
          <NavigationMenuList>
            {menus.map(({ name, to, icon: Icon, items }) => (
              <NavigationMenuItem
                key={to}
                className="z-30 flex flex-1 items-center justify-center"
              >
                <NavigationMenuLink asChild>
                  <NavLink
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "flex flex-row items-center gap-2",
                        isActive && "font-bold text-main"
                      )
                    }
                  >
                    <Icon size={18} aria-hidden="true" />
                    {name}
                  </NavLink>
                </NavigationMenuLink>
                {items && items.length > 1 && (
                  <>
                    <NavigationMenuTrigger
                      aria-label={name + " 하위 메뉴"}
                      className="w-auto px-1"
                    />
                    <NavigationMenuContent>
                      <ul className="grid w-72 gap-1">
                        {items.map((item) => (
                          <li key={item.to}>
                            <NavigationMenuLink asChild>
                              <Link to={item.to}>
                                <span className="font-medium">{item.name}</span>
                                <p className="text-sm text-muted-foreground">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
