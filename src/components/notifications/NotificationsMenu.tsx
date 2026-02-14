import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../shared/components/ui/dropdown-menu";
import { IoIosNotifications } from "react-icons/io";
import NotificationsList from "./NotificationsList";
import NotificationSkeleton from "../../shared/components/ui/NotificationSkeleton";
import { handleResErr } from "@/shared/utils/handleResError";
import { useReadAllNotifications } from "@/shared/lib/react-query/notifications/notifications";
import cookieServices from "@/shared/utils/cookieServices";

const NotificationsMenu = () => {
  const token = cookieServices.getToken()!;
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { unreadNotifications, isLoading } = useSelector(
    (state: RootState) => state.notifications
  );

  const { mutateAsync: realAllNotifications } = useReadAllNotifications();
  const handleReadAllNotifications = async () => {
    try {
      await realAllNotifications(token);
    } catch (error) {
      handleResErr(error);
    }
  };
  const role = cookieServices.getUser()?.role;

  if (isAuthenticated && role !== "doctor")
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-primary hover:bg-primary/90 relative flex h-9 w-9 items-center justify-center rounded-md shadow-sm transition-all duration-100">
          <IoIosNotifications size={16} className="text-amber-400" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadNotifications}
            </span>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          style={{ direction: "rtl" }}
          className="border-muted custom-scrollbar dark:bg-dark mx-2 max-h-137.5 w-80 overflow-y-auto px-0 py-0 pb-0 md:w-96"
        >
          <DropdownMenuLabel className="flex items-center justify-between gap-2 px-4 py-3 text-base font-normal">
            <h3 className="text-dark dark:text-white">الإشعارات</h3>
            <button
              className="text-dark/90 text-xs hover:underline dark:text-white/90"
              onClick={() => handleReadAllNotifications()}
            >
              تمييز الكل كمقروء
            </button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-dark/30 my-0 dark:bg-white/20" />
          {isLoading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <NotificationSkeleton key={idx} />
            ))
          ) : (
            <NotificationsList />
          )}
          {/* <div className="dark:bg-dark">
            <button
              className="text-dark dark:text-white w-full py-3 text-center text-sm"
              onClick={() => setLimit((prev) => (prev += 10))}
            >
              عرض المزيد
            </button>
          </div> */}
        </DropdownMenuContent>
      </DropdownMenu>
    );
};

export default NotificationsMenu;
