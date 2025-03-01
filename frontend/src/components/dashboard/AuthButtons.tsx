import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { toast } from "react-toastify";
import { useLogout } from "@/lib/react-query/auth";
import { AxiosError } from "axios";
import cookieServices from "@/utils/cookieServices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { logout } from "@/app/features/auth/authSlice";
import { motion } from "framer-motion";
import { navItemsVariants } from "@/animations/navbarAnimations";

const AuthButtons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState<boolean>(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const token = cookieServices.getToken();
  const { mutateAsync: logoutUser } = useLogout();

  const logoutFromDashboard = async () => {
    try {
      await logoutUser(token as string);
      // ! Logout failed
      // * Logout Success
      dispatch(logout());
      navigate("/login");
      toast.success("تم تسجيل الخروج");
    } catch (error) {
      const errorObj = error as AxiosError<{ message: string }>;
      toast.error(errorObj.response?.data.message || "هناك خطأ حاول لاحقا");
    } finally {
      setIsOpenLogoutModal(false);
    }
  };

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

      {/* Confirm Logout Modal */}
      <AlertDialog
        open={isOpenLogoutModal}
        onOpenChange={() => setIsOpenLogoutModal((prev) => !prev)}
      >
        <AlertDialogContent className="border-muted !z-[1000] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black dark:text-white text-start">
              تسجيل الخروج
            </AlertDialogTitle>
            <AlertDialogDescription className="text-start !my-3">
              هل انت متاكد من
              <span className="font-medium text-black dark:text-white">
                تسجيل الخروج
              </span>
              ؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="text-start !justify-start gap-2">
            <AlertDialogCancel className="bg-primary hover:bg-primary/90 hover:text-white text-white dark:text-black">
              إلغاء
            </AlertDialogCancel>
            <Button
              onClick={logoutFromDashboard}
              variant={"destructive"}
              color="red"
            >
              تسجيل الخروج
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AuthButtons;
