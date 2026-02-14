import { RootState } from "@/app/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { FaUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import cookieServices from "@/shared/utils/cookieServices";
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/enums/permissions";

export const ProfileMenu = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const role = cookieServices.getUser()?.role;

  const canViewCompany = useHasPermission(PERMISSIONS.COMPANY_INFO);

  if (isAuthenticated)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-primary hover:bg-primary/90 flex h-9 w-9 items-center justify-center rounded-md shadow-sm transition-all duration-100">
          <FaUser size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>حسابي</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/30 dark:bg-black/30" />
          <DropdownMenuItem>
            <Link to="/profile" className="block h-full w-full py-1">
              الملف الشخصي
            </Link>
          </DropdownMenuItem>

          {role === "patient" && (
            <>
              <DropdownMenuItem>
                <Link to="/bookings" className="block h-full w-full py-1">
                  الحجوزات
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/balances" className="block h-full w-full py-1">
                  مدفوعاتي
                </Link>
              </DropdownMenuItem>
            </>
          )}

          {role === "doctor" && (
            <>
              <DropdownMenuItem>
                <Link to="/doctor" className="block h-full w-full py-1">
                  لوحة التحكم
                </Link>
              </DropdownMenuItem>
            </>
          )}

          {(role === "admin" || role === "employee") && (
            <>
              <DropdownMenuItem>
                <Link to="/dashboard" className="block h-full w-full py-1">
                  لوحة التحكم
                </Link>
              </DropdownMenuItem>
              {canViewCompany && (
                <DropdownMenuItem>
                  <Link
                    to="/dashboard/settings"
                    className="block h-full w-full py-1"
                  >
                    الإعدادات
                  </Link>
                </DropdownMenuItem>
              )}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  return null;
};
