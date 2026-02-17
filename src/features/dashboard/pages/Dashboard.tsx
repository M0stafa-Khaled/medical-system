import cookieServices from "@/shared/utils/cookieServices";
import { TRole } from "@/shared/types";
import { DashboardHeader } from "../components/DashboardHeader";
import { MetricsCards } from "../components/MetricsCards";
import AdminChartsList from "../components/admin/AdminChartsList";
import { EmployeeChartsList } from "../components/employee/EmployeeChartsList";

const Dashboard = () => {
  const user = cookieServices.getUser();
  const role = user?.role as TRole;

  return (
    <div className="animate-in fade-in duration-500">
      <DashboardHeader />

      <>
        {role === "admin" && <MetricsCards />}
        {role === "admin" ? <AdminChartsList /> : <EmployeeChartsList />}
      </>
    </div>
  );
};

export default Dashboard;
