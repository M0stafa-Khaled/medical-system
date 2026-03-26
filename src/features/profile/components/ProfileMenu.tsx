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
        <DropdownMenuContent className="w-52">
          <DropdownMenuLabel>حسابي</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to={role === "patient" ? "/patient/profile" : "/profile"}>
              الملف الشخصي
            </Link>
          </DropdownMenuItem>

          {role === "patient" && (
            <>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/patient/bookings">الحجوزات</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/patient/balances">مدفوعاتي</Link>
              </DropdownMenuItem>
            </>
          )}

          {role === "doctor" && (
            <>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/doctor">لوحة التحكم</Link>
              </DropdownMenuItem>
            </>
          )}

          {(role === "admin" || role === "employee") && (
            <>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/dashboard">لوحة التحكم</Link>
              </DropdownMenuItem>
              {canViewCompany && (
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/dashboard/settings">الإعدادات</Link>
                </DropdownMenuItem>
              )}
            </>
          )}
          <DropdownMenuItem asChild className="cursor-pointer">
            <LogoutButton
              className="w-full justify-start rounded-md border-none bg-transparent shadow-none"
              icon={false}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  return null;
};
