import { RootState } from "@/store/store";
import cookieServices from "@/utils/cookieServices";
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";

const AuthLayout = () => {
  const path = useLocation().pathname;
  useNetworkStatus();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    const role = cookieServices.getUser()?.role;

    if (role === "admin" || role === "employee")
      return <Navigate to="/dashboard/bookings" replace />;
    if (role === "doctor") return <Navigate to="/doctor" replace />;
    return <Navigate to="/bookings" replace />;
  }

  return (
    <main className="auth-scroll-bar min-h-screen bg-[url(/images/login-bg.webp)] bg-no-repeat bg-right bg-cover flex justify-center items-center">
      <div
        className={`px-2 sm:container ${
          !path.includes("register") ? "md:max-w-3xl lg:max-w-7xl" : ""
        } w-full my-5 md:my-10`}
      >
        <motion.div className="bg-[#FFF] py-4 md:py-6 px-4 md:px-6 rounded-lg border border-sky-300 grid grid-cols-12 gap-6 shadow-xl">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="col-span-12 lg:col-span-7 order-2 lg:order-1 w-full flex flex-col items-center justify-center"
          >
            <Outlet />
            <Button className="bg-cyan-900 hover:bg-cyan-900/95 text-[#fff] h-auto w-auto p-0 mt-3">
              <Link
                to={"/"}
                className="py-2.5 px-4 flex justify-center items-center gap-2"
              >
                <Undo2 className="h-5 w-5" />
                الرجوع إالي الصفحة الرئيسية
              </Link>
            </Button>
          </motion.div>
          <motion.div
            className="col-span-12 lg:col-span-5 order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="max-w-sm flex justify-center items-center">
              <img
                src="/images/login.webp"
                alt="login"
                className="!w-[60%] md:!w-[90%] mx-auto"
                width={"60%"}
                height={"100%"}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};
export default AuthLayout;
