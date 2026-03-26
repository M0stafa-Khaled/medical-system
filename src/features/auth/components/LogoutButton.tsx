import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../../shared/components/ui/button";
import { useLogout } from "@/features/auth/queriesAndMutations";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { logout } from "@/app/store/features/auth/authSlice";
import { handleResErr } from "@/shared/utils/handleResError";
import Swal from "sweetalert2";
import { LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";

export const LogoutButton = ({
  icon = true,
  className,
}: {
  icon?: boolean;
  className?: string;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const { mutateAsync: logoutUser, isPending } = useLogout();

  const handleLogout = async () => {
    try {
      const { message, status } = await logoutUser();
      // ! Logout failed
      if (!status)
        return Swal.fire({
          title: "حدث خطأ",
          icon: "error",
          text: message,
        });

      // * Logout Success
      dispatch(logout());
      navigate("/login", {
        replace: true,
      });
      Swal.fire({
        title: "تم تسجيل الخروج بنجاح",
        icon: "success",
      });
    } catch (error) {
      handleResErr(error);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isAuthenticated && (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button
              size={icon ? "icon" : "default"}
              onClick={() => setIsOpen(true)}
              variant={"outline"}
              className={`cursor-pointer ${
                icon
                  ? "btn-destructive h-9 w-9 rounded-full px-0 py-0 font-bold"
                  : ""
              } ${className}`}
            >
              <LogOut size={20} />
              {icon ? null : "تسجيل الخروج"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-xl">
            <AlertDialogHeader className="gap-4">
              <AlertDialogTitle className="text-center">
                تسجيل الخروج
              </AlertDialogTitle>
              <AlertDialogDescription>
                هل انت متأكد من{" "}
                <span className="font-medium">تسجيل الخروج</span>؟
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={isPending}
                className="bg-slate-100! text-slate-900! hover:bg-slate-200/70! hover:text-slate-900!"
              >
                إلغاء
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500/15! text-red-500! hover:bg-red-500/10! hover:text-red-800!"
                onClick={handleLogout}
                disabled={isPending}
              >
                تسجيل الخروج
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
