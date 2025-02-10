import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react/jsx-runtime";

interface IProps {
  routeNames?: { [key: string]: string };
}

const PathIndicator = ({ routeNames }: IProps) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const arabicName = routeNames?.[name] || name;

              return (
                <Fragment key={name}>
                  <BreadcrumbItem className="text-black dark:!text-white !text-sm">
                    {isLast  ? (
                      <BreadcrumbPage className="!text-black dark:!text-white">
                        {arabicName}
                      </BreadcrumbPage>
                    ) : (
                      <Link
                        className="!text-black/80 dark:!text-white/70"
                        to={
                          routeTo === "/dashboard/doctors/update"
                            ? "/dashboard/doctors"
                            : routeTo
                        }
                      >
                        {arabicName}
                      </Link>
                    )}
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator className="rotate-180" />
                  )}
                </Fragment>
              );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default PathIndicator;
