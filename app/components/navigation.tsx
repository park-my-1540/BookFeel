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

export default function Navigation() {
  return (
    <div className='flex justify-center items-center h-15 border-b'>
      <div className='w-11/12 flex justify-between items-center'>
        <Title1>Book Feel</Title1>
        <div className='w-2/3 h-3/4 relative'>
          <BookSearch />
        </div>
        <div>
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
        </div>
      </div>
    </div>
  );
}
