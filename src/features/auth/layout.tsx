import { RootState } from "@/app/store";
import cookieServices from "@/shared/utils/cookieServices";
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet, useLocation } from "react-router";
import useNetworkStatus from "@/shared/hooks/useNetworkStatus";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { Undo2 } from "lucide-react";

const AuthLayout = () => {
  const path = useLocation().pathname;
  useNetworkStatus();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    const role = cookieServices.getUser()?.role;
    // Admin & Employee
    if (role === "admin" || role === "employee")
      return <Navigate to="/dashboard" replace />;
    // Doctor
    if (role === "doctor") return <Navigate to="/doctor" replace />;
    // Patient
    return <Navigate to="/bookings" replace />;
  }

  return (
    <main className="auth-scroll-bar flex min-h-screen items-center justify-center bg-[url(/images/auth-bg.webp)] bg-cover bg-right bg-no-repeat">
      <div
        className={`px-2 sm:container ${
          !path.includes("register") ? "md:max-w-3xl lg:max-w-7xl" : ""
        } my-5 w-full md:my-10`}
      >
        <motion.div className="grid grid-cols-12 gap-6 rounded-lg border border-sky-300 bg-[#FFF] px-4 py-4 shadow-xl md:px-6 md:py-6">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="order-2 col-span-12 flex w-full flex-col items-center justify-center lg:order-1 lg:col-span-8"
          >
            <Outlet />
            <Button variant={"link"} asChild>
              <Link to={"/"} className="flex items-center gap-2">
                <Undo2 className="h-5 w-5" />
                الرجوع إالي الصفحة الرئيسية
              </Link>
            </Button>
          </motion.div>
          <motion.div
            className="order-1 col-span-12 flex justify-center lg:order-2 lg:col-span-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="flex max-w-sm items-center justify-center">
              <img
                src="/images/auth.webp"
                alt="login"
                className="mx-auto w-56! md:w-80!"
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
