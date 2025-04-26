import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IoIosNotifications } from "react-icons/io";
import NotificationsList from "./NotificationsList";
import NotificationSkeleton from "../ui/NotificationSkeleton";
import handleResErr from "@/utils/handleResponseError";
import { useReadAllNotifications } from "@/lib/react-query/notifications/notifications";
import cookieServices from "@/utils/cookieServices";

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
        <DropdownMenuTrigger className="relative h-9 w-9 bg-primary flex justify-center items-center rounded-md shadow transition-all duration-100 hover:bg-primary/90">
          <IoIosNotifications size={16} className="text-amber-400" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 min-h-5 rounded-full bg-red-500 flex justify-center items-center text-xs text-white">
              {unreadNotifications}
            </span>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          style={{ direction: "rtl" }}
          className="w-80 md:w-96 border-muted pb-0 py-0 max-h-[550px] overflow-y-auto custom-scrollbar px-0 mx-2 dark:bg-dark"
        >
          <DropdownMenuLabel className="py-3 px-4 flex justify-between items-center gap-2 font-normal text-base ">
            <h3 className="text-dark dark:text-white">الإشعارات</h3>
            <button
              className="text-xs hover:underline text-dark/90 dark:text-white/90"
              onClick={() => handleReadAllNotifications()}
            >
              تمييز الكل كمقروء
            </button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-dark/30 dark:bg-white/20 my-0" />
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
