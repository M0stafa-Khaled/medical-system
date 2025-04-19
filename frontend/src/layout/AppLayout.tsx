import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "@/components/Header";
import { ILink } from "@/interfaces";

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
