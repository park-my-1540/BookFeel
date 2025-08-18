import {
  Headphones,
  House,
  LibraryBig,
  Rocket,
  Search,
  type LucideProps,
} from "lucide-react";
import { Link, useLocation } from "react-router";
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
  return (
    <div className="flex justify-start items-center py-3 px-lg border-t shadow-sm border-borderGray">
      <NavigationMenu>
        <NavigationMenuList>
          {menus.map((menu) => (
            <NavigationMenuItem key={menu.name} className="w-40">
              {menu.items ? (
                <>
                  <LinkMenu menu={menu} trigger={true} />
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] font-light gap-3 p-4 grid-cols-2">
                      {menu.items?.map((item) => (
                        <NavigationMenuItem key={item.name}>
                          <NavigationMenuLink asChild>
                            <Link to={item.to}>
                              <span className="text-md font-medium leading-none">
                                {item.name}
                              </span>
                              <p className="text-md text-muted-foreground">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <LinkMenu menu={menu} />
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const LinkMenu = ({
  menu,
  trigger = false,
}: {
  menu: menuType;
  trigger?: boolean;
}) => {
  const { pathname } = useLocation();
  const isActive = pathname === menu.to;
  const Icon = menu.icon;

  const content = (
    <span className="flex gap-2 items-center text-lg font-medium leading-none py-2 hover:text-main">
      {Icon && <Icon size={18} />}
      {menu.name}
    </span>
  );
  return (
    <Link
      to={menu.to}
      className={cn(isActive ? "text-main font-mangoBold" : "")}
    >
      {trigger ? (
        <NavigationMenuTrigger>{content}</NavigationMenuTrigger>
      ) : (
        content
      )}
    </Link>
  );
};
