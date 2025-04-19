import Header from "@/components/Header";
import PathIndicator from "@/components/dashboard/PathIndicator";
import Sidebar from "@/components/dashboard/Sidebar";

import { ILink } from "@/interfaces";
import { HomeIcon, UserRoundSearch } from "lucide-react";
import { GiMedicinePills } from "react-icons/gi";
import { TbReportAnalytics, TbReportMedical } from "react-icons/tb";
import { MdMedication } from "react-icons/md";
import { Outlet, ScrollRestoration } from "react-router-dom";
import ROUTES_NAME from "@/constants/routesName";
import { useGetUserProfile } from "@/lib/react-query/profile/profile";
import cookieServices from "@/utils/cookieServices";

const DoctorLayout = () => {
  const NAV_LINKS: ILink[] = [
    {
      name: ROUTES_NAME.dashboard,
      path: "/doctor",
      icon: <HomeIcon size={18} />,
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
      name: ROUTES_NAME.analytics,
      path: "/doctor/analytics",
      icon: <TbReportAnalytics size={18} />,
    },
    // Scans
    {
      name: ROUTES_NAME.scans,
      path: "/doctor/scans",
      icon: <UserRoundSearch size={18} />,
    },
  ];

  const token = cookieServices.getToken()!;
  const { data: doctor } = useGetUserProfile(token);
  console.log(doctor?.data);

  return (
    <div className="flex bg-foreground">
      <ScrollRestoration />
      <div className="fixed inset-y-0 right-0">
        <Sidebar links={NAV_LINKS} />
      </div>
      <div className="bg-background min-h-screen flex-1 flex flex-col overflow-hidden lg:mr-[270px] lg:border-r border-primary/30 lg:dark:border-primary/20 lg:rounded-tr-[36px] lg:rounded-br-[36px]">
        <div className="container">
          <Header links={NAV_LINKS} dashboard />
          <main className="flex-1 mt-20 lg:mt-6 bg-background">
            <PathIndicator routeNames={ROUTES_NAME} />
            <div className="my-5">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DoctorLayout;
