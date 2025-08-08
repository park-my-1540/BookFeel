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
import { House, Youtube, type LucideProps } from "lucide-react";

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
    name: "Playlists",
    to: "/playlists",
    icon: Youtube,
    items: [
      {
        name: "상세",
        description: "다양한 플레이리스트를 확인해보세요",
        to: "/playlists",
      },
      {
        name: "플레이리스트 등록",
        description: "플레이리스트를 등록해보세요",
        to: "/playlists/submit",
      },
    ],
  },
];

export default function Menu() {
  return (
    <div className='flex justify-start items-center py-3 px-lg border border-borderGray'>
      <NavigationMenu>
        <NavigationMenuList>
          {menus.map((menu) => (
            <NavigationMenuItem key={menu.name} className='w-40'>
              {menu.items ? (
                <>
                  <LinkMenu menu={menu} trigger={true} />
                  <NavigationMenuContent>
                    <ul className='grid w-[400px] font-light gap-3 p-4 grid-cols-2'>
                      {menu.items?.map((item) => (
                        <NavigationMenuItem key={item.name}>
                          <NavigationMenuLink asChild>
                            <Link to={item.to}>
                              <span className='text-md font-medium leading-none'>
                                {item.name}
                              </span>
                              <p className='text-md text-muted-foreground'>
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
    <span className='flex gap-2 items-center text-lg font-medium leading-none py-2'>
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
