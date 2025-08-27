import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

export default function BreadComp({
  link,
}: {
  link: {
    to: string;
    name: string;
  }[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {link.map((menu, index) => (
          <BreadcrumbItem>
            {index !== 0 ? <BreadcrumbSeparator /> : null}
            <BreadcrumbLink asChild>
              <Link to={menu.to}>{menu.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
