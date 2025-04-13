import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "@/components/Header";
import cookieServices from "@/utils/cookieServices";
import { useMemo } from "react";
import { ILink } from "@/interfaces";

const AppLayout = () => {
  const role = cookieServices.getUser()?.role;

  const navLinks: ILink[] = useMemo(
    () => [
      ...(["admin", "employee"].includes(role!)
        ? [
            {
              name: "لوحة التحكم",
              path: "/dashboard",
            },
          ]
        : []),
      {
        name: "الرئيسية",
        path: "/",
      },
    ],
    [role]
  );

  return (
    <>
      <ScrollRestoration />
      <Header links={navLinks} />
      <Outlet />
    </>
  );
};

export default AppLayout;
