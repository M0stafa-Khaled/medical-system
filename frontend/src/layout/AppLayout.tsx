import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "@/components/Navbar";
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
    <div>
      <ScrollRestoration />
      <Navbar links={navLinks} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
