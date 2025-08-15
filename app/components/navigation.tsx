import { Heading1 } from "@/components/ui/Typography";
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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import Menu from "./layout/Menu";
import { useShoppingCart } from "~/features/shoppingcart/hooks/useShoppingCart";

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
  const { count } = useShoppingCart({ _isLoggedIn: isLoggedIn });
  return (
    <div className='border-b'>
      <div className='px-lg w-full flex justify-between items-center'>
        <Link to='/'>
          <Heading1>BookFeel</Heading1>
        </Link>

        <div className='relative w-3/6'>
          <BookSearch />
        </div>

        {isLoggedIn ? (
          <div className='flex items-center gap-4'>
            <Button asChild variant='ghost' className='hover:text-main'>
              <Link to='/shoppingcart'>
                <FontAwesomeIcon icon={faCartShopping as IconProp} size='lg' />
                {count}
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className='cursor-pointer'>
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
            <Button
              asChild
              variant='outline'
              className='bg-transparent border-main text-main text-md'
            >
              <Link to='/shoppingcart'>
                <FontAwesomeIcon icon={faCartShopping as IconProp} size='lg' />
                <span className='font-winky'>( {count} )</span>
              </Link>
            </Button>
          </div>
        )}
      </div>
      <Menu />
    </div>
  );
}
