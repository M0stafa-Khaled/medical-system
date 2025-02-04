import Navbar from "@/components/Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <ScrollRestoration />
      <Navbar links={[{ name: "الصفحة الرئيسية", path: "/" }]} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
