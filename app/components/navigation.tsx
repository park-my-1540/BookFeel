import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { Title1 } from "@/components/ui/Typography";
import BookSearch from "@/features/search/components/SearchBarContainer";
import { Button } from "./ui/button";
import { Link } from "react-router";

export default function Navigation() {
  return (
    <div className='flex justify-center items-center h-15 border-b'>
      <div className='w-11/12 flex justify-between items-center'>
        <Title1 className='font-winky'>BookFeel</Title1>
        <div className='w-2/3 h-3/4 relative'>
          <BookSearch />
        </div>
        <div>
          <div className='flex items-center gap-4'>
            <Button asChild variant='outline'>
              <Link to='/auth/login'>로그인</Link>
            </Button>
            <Button asChild variant='default'>
              <Link to='/auth/join'>회원가입</Link>
            </Button>
          </div>
        </div>
        {/* <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Link</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div> */}
      </div>
    </div>
  );
}
