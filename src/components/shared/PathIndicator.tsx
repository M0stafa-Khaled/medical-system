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
  const pathnames = location.pathname.split("/").filter(Boolean);
  // Filter out numeric segments and create a clean path array
  const cleanPathnames = pathnames.filter((segment) => isNaN(Number(segment)));
  // Create cumulative paths for navigation
  const cumulativePaths = cleanPathnames.map((_, index) => {
    const pathSegments = pathnames.slice(
      0,
      pathnames.indexOf(cleanPathnames[index]) + 1
    );
    return pathSegments.join("/");
  });

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {cleanPathnames.map((name, index) => {
            const isLast = index === cleanPathnames.length - 1;
            const arabicName =
              routeNames?.[name.toLowerCase()] || name.toLowerCase();
            const routeTo = `/${cumulativePaths[index]}`;
            return (
              <Fragment key={`${name}-${index}`}>
                <BreadcrumbItem className="text-black dark:text-white! text-sm!">
                  {isLast ? (
                    <BreadcrumbPage className="text-black! dark:text-white!">
                      {arabicName}
                    </BreadcrumbPage>
                  ) : (
                    <Link
                      className="text-black/80! dark:text-white/70!"
                      to={
                        [
                          "update",
                          "working-days",
                          "create",
                          "edit",
                          "add",
                        ].includes(routeTo.split("/").pop() || "")
                          ? "/dashboard"
                          : routeTo
                      }
                    >
                      {arabicName}
                    </Link>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator className="rotate-180" />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default PathIndicator;
