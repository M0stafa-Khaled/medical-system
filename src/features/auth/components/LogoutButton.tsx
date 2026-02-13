import { lazy, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../../components/ui/button";
import { FiLogOut } from "react-icons/fi";
import { useLogout } from "@/features/auth/queriesAndMutations";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/features/auth/authSlice";
import { clearPermissions } from "@/store/features/permissions/permissionsSlice";
import handleResErr from "@/utils/handleResponseError";
import Swal from "sweetalert2";

const Modal = lazy(() => import("@/components/shared/Modal"));

export const LogoutButton = ({ icon = true }: { icon?: boolean }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const { mutateAsync: logoutUser, isPending } = useLogout();

  const logoutFromDashboard = async () => {
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
      dispatch(clearPermissions());
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
        <Button
          onClick={() => setIsOpen(true)}
          variant={"destructive"}
          className={`${
            icon
              ? "btn-destructive h-9 w-9 rounded-full px-0 py-0 font-bold"
              : "flex h-auto w-full items-center justify-center gap-2 py-3"
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
