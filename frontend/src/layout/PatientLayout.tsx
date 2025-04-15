import Header from "@/components/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";

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
    name: "المدفوعات السابقة",
    path: "/balances",
  },
];

const PatientLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <div className="bg-background">
        <Header links={NAV_LINKS} />
        <main className="pt-16 pb-10 container">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default PatientLayout;
