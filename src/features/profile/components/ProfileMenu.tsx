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
import useHasPermission from "@/shared/hooks/useHasPermission";
import { PERMISSIONS } from "@/shared/enums/permissions";
import { buttonVariants } from "@/shared/components/ui/button";
import { LogoutButton } from "@/features/auth";

export const ProfileMenu = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const role = user?.user?.role;

  const canViewCompany = useHasPermission(PERMISSIONS.COMPANY_INFO);

  if (isAuthenticated)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className={buttonVariants({
            size: "icon",
            variant: "outline",
            className: "btn-primary rounded-full!",
          })}
        >
          <FaUser />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-card w-56">
          <DropdownMenuLabel>حسابي</DropdownMenuLabel>
          <DropdownMenuSeparator />
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
          <DropdownMenuItem asChild className="cursor-pointer">
            <LogoutButton
              className="w-full justify-start rounded-md border-none bg-transparent"
              icon={false}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  return null;
};
