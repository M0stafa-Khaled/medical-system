import { RootState } from "@/store/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cookieServices from "@/utils/cookieServices";

const ProfileMenu = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const role = cookieServices.getUser()?.role;

  if (isAuthenticated)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="h-9 w-9 bg-primary flex justify-center items-center rounded-md shadow transition-all duration-100 hover:bg-primary/90">
          <FaUser size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          style={{ direction: "rtl" }}
          className="w-56 border-muted bg-primary text-white dark:text-black"
        >
          <DropdownMenuLabel>حسابي</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/30 dark:bg-black/30" />
          <DropdownMenuItem>
            <Link to="/profile" className="block w-full h-full py-2">
              الملف الشخصي
            </Link>
          </DropdownMenuItem>

          {role === "patient" && (
            <>
              <DropdownMenuItem>
                <Link to="/bookings" className="block w-full h-full py-2">
                  الحجوزات
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/balances" className="block w-full h-full py-2">
                  مدفوعاتي
                </Link>
              </DropdownMenuItem>
            </>
          )}

          {(role === "admin" || role === "employee") && (
            <DropdownMenuItem>
              <Link to="/settings" className="block w-full h-full py-2">
                الإعدادات
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  return null;
};

export default ProfileMenu;
