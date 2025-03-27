import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
import { useLogout } from "@/lib/react-query/auth/auth";
import { AxiosError } from "axios";
import cookieServices from "@/utils/cookieServices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/features/auth/authSlice";
import { clearPermissions } from "@/store/features/permissions/permissionsSlice";
import Modal from "./shared/Modal";

const LogoutButton = ({ icon = true }: { icon?: boolean }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const token = cookieServices.getToken();
  const { mutateAsync: logoutUser, isPending } = useLogout();

  const logoutFromDashboard = async () => {
    try {
      await logoutUser(token as string);
      // ! Logout failed
      // * Logout Success
      dispatch(logout());
      dispatch(clearPermissions());
      navigate("/login", {
        replace: true,
      });
      toast.success("تم تسجيل الخروج");
    } catch (error) {
      const errorObj = error as AxiosError<{ message: string }>;
      if (errorObj.response?.data)
        toast.error(errorObj.response?.data.message || "هناك خطأ حاول لاحقا");
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isAuthenticated && (
        <Button
          onClick={() => setIsOpen(true)}
          variant={"destructive"}
          className={`${
            icon
              ? "h-9 w-9 px-0 py-0 font-bold"
              : "w-full h-auto py-3 flex justify-center items-center gap-2"
          }`}
        >
          <FiLogOut size={20} />
          {icon ? null : "تسجيل الخروج"}
        </Button>
      )}

      {/* Confirm Logout Modal */}
      <Modal
        description={{
          text: "هل انت متأكد من تسجيل الخروج؟",
          color: "text-red-700",
        }}
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onConfirm={logoutFromDashboard}
        confirmText="تسجيل الخروج"
        isLoading={isPending}
        title="تسجيل الخروج"
        onOpenChange={() => setIsOpen(!isOpen)}
        variant="destructive"
      />
    </>
  );
};

export default LogoutButton;
