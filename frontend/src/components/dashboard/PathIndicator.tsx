import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

interface IProps {
  // routes: string[];
  routeNames?: { [key: string]: string };
}

const PathIndicator = ({ routeNames }: IProps) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb>
      {!pathnames.length && (
        <BreadcrumbItem>
          <BreadcrumbLink
            className="text-black dark:!text-white !text-sm"
            as={Link}
            to="/"
          >
            {routeNames?.["dashboard"]}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const arabicName = routeNames?.[name] || name; // تحويل الاسم إلى عربي

        return (
          <BreadcrumbItem key={name} className="text-black dark:!text-white">
            {isLast ? (
              <BreadcrumbLink
                as={Link}
                to={routeTo}
                fontWeight="semibold"
                className="!text-sm"
              >
                {arabicName}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbLink
                className="!text-black/80 dark:!text-white/70 !text-sm"
                as={Link}
                to={routeTo}
              >
                {arabicName}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default PathIndicator;
