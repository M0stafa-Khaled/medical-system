import { Outlet, ScrollRestoration } from "react-router-dom";
import { ILink } from "@/interfaces";
import Header from "@/components/shared/navbar/Header";

const AppLayout = () => {
  const navLinks: ILink[] = [
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
