import { RootState } from "@/store/store";
import cookieServices from "@/utils/cookieServices";
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
const AuthLayout = () => {
  useNetworkStatus();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    const role = cookieServices.getUser()?.role;

    if (role === "admin" || role === "employee")
      return <Navigate to="/dashboard" replace />;
    if (role === "doctor") return <Navigate to="/doctor" replace />;
    return <Navigate to="/" replace />;
  }

  return (
    <main className="auth-scroll-bar min-h-screen bg-[url(/login-bg.png)] bg-no-repeat bg-right bg-cover flex justify-center items-center">
      <div className="container max-w-7xl w-full my-10">
        <motion.div className="bg-[#FFF] py-4 md:py-6 px-4 md:px-6 rounded-lg border border-sky-300 flex flex-col-reverse md:flex-row justify-between items-center gap-6 shadow-xl">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex-1 w-full flex flex-col items-center justify-center"
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
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="max-w-sm">
              <img
                src="/login.jpg"
                alt="login"
                className="w-[60%] md:w-[90%] mx-auto"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};
export default AuthLayout;
