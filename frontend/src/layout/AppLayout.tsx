import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "@/components/Header";
import cookieServices from "@/utils/cookieServices";

const AppLayout = () => {
  const role = cookieServices.getRole();

  const navLinks = [
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
  ];

  return (
    <>
      <ScrollRestoration />
      <Header links={navLinks} />
      <Outlet />
    </>
  );
};

export default AppLayout;
