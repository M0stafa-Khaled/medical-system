import Navbar from "@/features/dashboard/components/navbar/Navbar";
import Sidebar from "@/features/dashboard/components/Sidebar";
import { ILink } from "@/shared/types";
import { BookMarkedIcon, HomeIcon, UserRoundSearch } from "lucide-react";
import { GiMedicinePills } from "react-icons/gi";
import { TbReportAnalytics, TbReportMedical } from "react-icons/tb";
import { MdMedication } from "react-icons/md";
import { Outlet, ScrollRestoration } from "react-router";
import { ROUTES_NAME } from "@/shared/constants";

const DoctorLayout = () => {
  const NAV_LINKS: ILink[] = [
    {
      name: ROUTES_NAME.dashboard,
      path: "/doctor",
      icon: <HomeIcon size={18} />,
    },
    {
      name: ROUTES_NAME.bookings,
      path: "/doctor/bookings",
      icon: <BookMarkedIcon size={18} />,
    },

    // Dosages
    {
      name: ROUTES_NAME.dosages,
      path: "/doctor/dosages",
      icon: <GiMedicinePills size={18} />,
    },

    // Prescriptions
    {
      name: ROUTES_NAME.prescriptions,
      path: "/doctor/prescriptions",
      icon: <TbReportMedical size={18} />,
    },

    // Drugs
    {
      name: ROUTES_NAME.drugs,
      path: "/doctor/drugs",
      icon: <MdMedication size={18} />,
    },
    // Analytics
    {
      name: ROUTES_NAME.analysis,
      path: "/doctor/analysis",
      icon: <TbReportAnalytics size={18} />,
    },
    // Scans
    {
      name: ROUTES_NAME.scans,
      path: "/doctor/scans",
      icon: <UserRoundSearch size={18} />,
    },
  ];

  return (
    <div className="bg-foreground flex">
      <ScrollRestoration />
      <div className="fixed inset-y-0 right-0">
        <Sidebar links={NAV_LINKS} />
      </div>
      <div className="bg-background border-border flex min-h-screen flex-1 flex-col overflow-hidden lg:mr-67.5 lg:rounded-tr-[36px] lg:rounded-br-[36px] lg:border-r">
        <div className="container">
          <Navbar links={NAV_LINKS} dashboard />
          <main className="bg-background mt-20 flex-1 lg:mt-6">
            <div className="my-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DoctorLayout;
