import { logout } from "@/app/features/auth/authSlice";
import { RootState } from "@/app/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FiLogOut } from "react-icons/fi";
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

const AuthButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState<boolean>(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const logoutFromDashboard = () => {
    setIsOpenLogoutModal(false);
    dispatch(logout());
    navigate("/login");
    toast.success("تم تسجيل الخروج");
  };

  return (
    <>
      {isAuthenticated ? (
        <Button
          onClick={() => setIsOpenLogoutModal(true)}
          variant={"destructive"}
          className="h-auto py-3 flex items-center justify-center gap-2 w-full lg:w-52 !text-base !font-normal"
        >
          تسجيل الخروج
          <FiLogOut size={20} />
        </Button>
      ) : (
        <>
          <Button className="bg-primary h-auto px-0 py-0 flex items-center justify-center gap-2 !border-danger w-full lg:w-52 !text-base">
            <Link to={"/login"} className="py-3 px-4">
              تسجيل الدخول
            </Link>
          </Button>
          <Button className="bg-cyan-600 hover:bg-cyan-600/90 text-white mt-3 lg:mt-0 h-auto px-0 py-0 flex items-center justify-center gap-2 !border-danger w-full lg:w-52 !text-base">
            <Link to="/register" className="py-3 px-4">
              تسجيل
            </Link>
          </Button>
        </>
      )}

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

export default AuthButtons;
