import Navbar from "@/components/Navbar";
import PathIndicator from "@/components/dashboard/PathIndicator";
import Sidebar from "@/components/dashboard/Sidebar";
import { Outlet, ScrollRestoration } from "react-router-dom";

const DashboardLayout = () => {
  const routeNames = {
    dashboard: "العيادات",
    admin: "المزيد",
  };
  return (
    <div className="flex h-screen font-sans">
      <ScrollRestoration />
      {/* Sidebar */}
      <Sidebar
        links={[
          { name: "العيادات", path: "/dashboard" },
          { name: "المزيد", path: "/dashboard/admin" },
        ]}
      />
      {/* Main Content */}
      <main className="flex flex-1 h-full overflow-hidden bg-background">
        <div className="w-full h-full pt-[62px] lg:pt-0 overflow-y-auto custom-scrollbar">
          <Navbar
            dashboard
            links={[
              { name: "العيادات", path: "/dashboard" },
              { name: "المزيد", path: "/dashboard/admin" },
            ]}
          />
          <div className="container py-6">
            <PathIndicator routeNames={routeNames} />

            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
