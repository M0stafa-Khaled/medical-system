import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import cookieServices from "@/utils/cookieServices";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { motion } from "framer-motion";
import { navItemsVariants } from "@/animations/navbarAnimations";
const AuthButtons = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const token = cookieServices.getToken();

  return (
    <>
      {!isAuthenticated && !token && (
        <>
          <motion.div
            variants={navItemsVariants}
            className="w-full lg:!w-40 px-3 lg:px-0"
          >
            <Button className="bg-primary h-auto px-0 py-0 flex items-center justify-center gap-2 !border-danger w-full">
              <Link to={"/login"} className="p-3">
                تسجيل الدخول
              </Link>
            </Button>
          </motion.div>
          <motion.div
            variants={navItemsVariants}
            className="w-full lg:!w-40 px-3 lg:px-0"
          >
            <Button className="bg-cyan-600 hover:bg-cyan-600/90 text-white mt-3 lg:mt-0 h-auto px-0 py-0 flex items-center justify-center gap-2 !border-danger w-full">
              <Link to="/register" className="p-3">
                تسجيل
              </Link>
            </Button>
          </motion.div>
        </>
      )}
    </>
  );
};

export default AuthButtons;
