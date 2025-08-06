import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { Heading1, Title1 } from "@/components/ui/Typography";
import BookSearch from "@/features/search/components/SearchBarContainer";
import { Button } from "./ui/button";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "~/lib/utils";

const menus = [
  {
    name: "Playlists",
    to: "/playlists",
    items: [
      {
        name: "리더보드",
        description: "커뮤니티의 상위 제품을 확인해보세요",
        to: "/products/leaderboards",
      },
      {
        name: "카테고리",
        description: "커뮤니티의 다양한 카테고리를 살펴보세요",
        to: "/products/categories",
      },
      {
        name: "검색",
        description: "원하는 제품을 검색해보세요",
        to: "/products/search",
      },
      {
        name: "제품 등록",
        description: "커뮤니티에 제품을 등록해보세요",
        to: "/playlists/submit",
      },
      {
        name: "제품 홍보",
        description: "제품을 커뮤니티에 홍보해보세요",
        to: "/products/promote",
      },
    ],
  },
];

export default function Navigation({
  isLoggedIn,
  username,
  avatar,
  name,
}: {
  isLoggedIn: boolean;
  username: string;
  avatar: string;
  name: string;
}) {
  return (
    <div className='flex justify-center items-center h-15 border-b'>
      <div className='w-11/12 flex justify-between items-center'>
        <Link to='/'>
          <Heading1>BookFeel</Heading1>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                {menu.items ? (
                  <>
                    <Link to={menu.to} prefetch='intent'>
                      <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent>
                      <ul className='grid w-[400px] font-light gap-3 p-4 grid-cols-2'>
                        {menu.items?.map((item) => (
                          <NavigationMenuItem
                            key={item.name}
                            className={cn(
                              "select-none rounded-md transition-colors focus:bg-accent hover:bg-accent",
                              item.to === "/products/promote" &&
                                "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                              item.to === "/products/submit" &&
                                "bg-primary/10 hover:bg-primary/20 focus:bg-primary/20"
                            )}
                          >
                            <NavigationMenuLink asChild>
                              <Link
                                className='p-3 space-y-1 block loading-none no-underline outline-none'
                                to={item.to}
                              >
                                <span className='text-sm font-medium leading-none'>
                                  {item.name}
                                </span>
                                <p className='text-sm text-muted-foreground'>
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
                  <Link to={menu.to}>{menu.name}</Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className='relative w-3/6'>
          <BookSearch />
        </div>
        {isLoggedIn ? (
          <div className='flex items-center gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  {avatar ? (
                    <AvatarImage src={avatar} />
                  ) : (
                    <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel className='flex flex-col'>
                  <span className='font-normal'>{name}</span>
                  <span className='text-xs text-muted-foreground'>
                    @{username}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild className='cursor-pointer'>
                    <Link to='/my/profile'>
                      <UserIcon className='w-4 h-4 mr-2' />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className='cursor-pointer'>
                    <Link to='/my/settings'>
                      <SettingsIcon className='w-4 h-4 mr-2' />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className='cursor-pointer'>
                  <Link to='/auth/logout'>
                    <LogOutIcon className='w-4 h-4 mr-2' />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className='flex items-center gap-4'>
            <Button asChild variant='outline'>
              <Link to='/auth/login'>로그인</Link>
            </Button>
            <Button asChild variant='default'>
              <Link to='/auth/join'>회원가입</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
