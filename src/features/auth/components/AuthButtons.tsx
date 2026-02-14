import { Link } from "react-router";
import cookieServices from "@/shared/utils/cookieServices";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { motion } from "framer-motion";
import { navItemsVariants } from "@/animations/navbarAnimations";
import { Button } from "@/shared/components/ui/button";

export const AuthButtons = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const token = cookieServices.getToken();

  return (
    <>
      {!isAuthenticated && !token && (
        <>
          <motion.div
            variants={navItemsVariants}
            className="w-full px-3 lg:w-40! lg:px-0"
          >
            <Button
              className="bg-primary border-danger! flex h-auto w-full items-center justify-center gap-2 px-0 py-0"
              name="تسجيل الدخول"
            >
              <Link to={"/login"} className="px-3 py-2.5">
                تسجيل الدخول
              </Link>
            </Button>
          </motion.div>
          <motion.div
            variants={navItemsVariants}
            className="w-full px-3 lg:w-40! lg:px-0"
          >
            <Button
              className="border-danger! mt-3 flex h-auto w-full items-center justify-center gap-2 bg-cyan-600 px-0 py-0 text-white hover:bg-cyan-600/90 lg:mt-0"
              name="تسجيل حساب جديد"
            >
              <Link to="/register" className="px-3 py-2.5">
                تسجيل
              </Link>
            </Button>
          </motion.div>
        </>
      )}
    </>
  );
};
