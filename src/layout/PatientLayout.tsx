import Header from "@/components/shared/navbar/Header";
import { Outlet, ScrollRestoration } from "react-router";

const NAV_LINKS = [
  {
    name: "الصفحة الرئيسية",
    path: "/",
  },
  {
    name: "الملف الشخصي",
    path: "/profile",
  },
  {
    name: "الحجوزات",
    path: "/bookings",
  },
  {
    name: "مدفوعاتي",
    path: "/balances",
  },
];

const PatientLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <div className="bg-background">
        <Header links={NAV_LINKS} />
        <main className="container pt-16 pb-10">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default PatientLayout;
