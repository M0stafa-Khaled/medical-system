import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { FiLogOut } from "react-icons/fi";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { toast } from "react-toastify";
import { useLogout } from "@/lib/react-query/auth";
import { AxiosError } from "axios";
import cookieServices from "@/utils/cookieServices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { logout } from "@/app/features/auth/authSlice";

const LogoutIconButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState<boolean>(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const token = cookieServices.getToken();
  const { mutateAsync: logoutUser } = useLogout();

  const logoutFromDashboard = async () => {
    try {
      await logoutUser(token as string);
      // ! Logout Field
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
      {isAuthenticated && (
        <Button
          onClick={() => setIsOpenLogoutModal(true)}
          variant={"destructive"}
          className="h-9 w-9 px-0 py-0 font-bold"
        >
          <FiLogOut size={20} />
        </Button>
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
              هل انت متاكد من{" "}
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

export default LogoutIconButton;
