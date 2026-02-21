import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

import { IoIosNotifications } from "react-icons/io";
import NotificationsList from "./NotificationsList";
import NotificationSkeleton from "../../../shared/components/ui/NotificationSkeleton";
import { handleResErr } from "@/shared/utils/handleResError";
import { useReadAllNotifications } from "@/features/notifications/queriesAndMutations";
import cookieServices from "@/shared/utils/cookieServices";
import { buttonVariants } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/shared/components/ui/dropdown-menu";

const NotificationsMenu = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { unreadNotifications, isLoading } = useSelector(
    (state: RootState) => state.notifications
  );

  const { mutateAsync: realAllNotifications } = useReadAllNotifications();
  const handleReadAllNotifications = async () => {
    try {
      await realAllNotifications();
    } catch (error) {
      handleResErr(error);
    }
  };
  const role = cookieServices.getUser()?.role;

  if (isAuthenticated && role !== "doctor")
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className={buttonVariants({
            size: "icon",
            variant: "outline",
            className:
              "rounded-full! border border-yellow-500/30! bg-yellow-500/10! text-yellow-500! hover:bg-yellow-500/20! dark:bg-yellow-500/20! dark:hover:bg-yellow-500/30!",
          })}
        >
          <IoIosNotifications className="text-yellow-400" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadNotifications}
            </span>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          style={{ direction: "rtl" }}
          className="border-muted custom-scrollbar bg-card mx-2 max-h-137.5 w-80 overflow-y-auto px-0 py-0 pb-0 md:w-96"
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
