import { Heading1 } from "@/components/ui/Typography";
import BookSearch from "@/features/search/components/SearchBarContainer";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LogOutIcon, ReceiptText, SettingsIcon, UserIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useCartCount } from "~/store/countStore";
import Menu from "./layout/Menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
  const count = useCartCount((s) => s.count);
  const { pathname } = useLocation();
  return (
    <header className="border-b border-borderGray bg-white">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-wrap items-center justify-between gap-x-2 px-lg lg:gap-x-4 py-3 md:min-h-20 md:flex-nowrap">
        <Link to="/" className="shrink-0">
          <Heading1 className="text-xl sm:text-2xl">BookFeel</Heading1>
        </Link>

        {pathname === "/" ? (
          <div className="relative z-20 order-3 w-full pt-2 md:order-none md:w-auto md:max-w-xl md:flex-1 md:pt-0">
            <BookSearch />
          </div>
        ) : null}

        {isLoggedIn ? (
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="font-Mont bg-transparent border-main text-main text-md hover:bg-main hover:text-white"
            >
              <Link to="/shoppingcart" aria-label={`장바구니 ${count}개`}>
                <FontAwesomeIcon icon={faCartShopping as IconProp} size="lg" />
                {count}
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  {avatar ? (
                    <AvatarImage src={avatar} />
                  ) : (
                    <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="flex flex-col">
                  <span className="font-normal">{name}</span>
                  <span className="text-xs text-muted-foreground">
                    @{username}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/my/order">
                      <ReceiptText className="w-4 h-4 mr-2" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/my/profile">
                      <UserIcon className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/my/settings">
                      <SettingsIcon className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/auth/logout">
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Button asChild size="sm">
              <Link to="/auth/login">
                <span className="font-Mont">Login</span>
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/auth/join">
                <span className="font-Mont">Join</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="font-Mont bg-transparent border-main text-main text-md hover:bg-main hover:text-white"
            >
              <Link to="/shoppingcart" aria-label={`장바구니 ${count}개`}>
                <FontAwesomeIcon icon={faCartShopping as IconProp} size="lg" />
                {count}
              </Link>
            </Button>
          </div>
        )}
      </div>
      <Menu />
    </header>
  );
}
