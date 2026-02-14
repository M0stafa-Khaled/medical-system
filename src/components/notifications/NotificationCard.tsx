import { INotification } from "@/interfaces/notifications";
import { useReadNotification } from "@/shared/lib/react-query/notifications/notifications";
import cookieServices from "@/shared/utils/cookieServices";
import { getTimeAgo } from "@/shared/utils/getTimeAgo";
import { handleResErr } from "@/shared/utils/handleResError";
import { Link } from "react-router";

interface IProps {
  notification: INotification;
}

const NotificationCard = ({ notification }: IProps) => {
  const token = cookieServices.getToken()!;
  const role = cookieServices.getUser()?.role;
  const { mutateAsync: readNotification } = useReadNotification();

  const handleReadNotification = async (id: string) => {
    try {
      await readNotification({ token, id });
    } catch (error) {
      handleResErr(error);
    }
  };

  return (
    <div
      className={`border-primary/10 border-b p-3 ${
        notification.last_view
          ? "dark:bg-dark bg-white"
          : "bg-[#eae8ec] dark:bg-slate-900/90"
      }`}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="relative">
            <img
              src={notification.data.sender.image || "/images/avatar.svg"}
              alt={notification.data.sender.name}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            {!notification.last_view && (
              <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-blue-500" />
            )}
          </div>
          <h3 className="text-sm font-semibold text-wrap dark:text-white">
            {notification.data.sender.name}
          </h3>
        </div>
        <div className="space-y-3 pr-4">
          {/* Patient */}
          {role === "admin" || role === "employee" ? (
            notification.data.patient?.id ? (
              <Link
                to={`/dashboard/patients/${notification.data.patient.id}`}
                className="text-muted-foreground text-sm leading-relaxed font-medium dark:text-gray-400"
              >
                {notification.data.message}
              </Link>
            ) : notification.data.booking?.id ? (
              <Link
                to={`/dashboard/bookings/${notification.data.booking.id}`}
                className="text-muted-foreground text-sm leading-relaxed font-medium dark:text-gray-400"
              >
                {notification.data.message}
              </Link>
            ) : (
              <p className="text-muted-foreground text-sm leading-relaxed font-medium dark:text-gray-400">
                {notification.data.message}
              </p>
            )
          ) : (
            <p className="text-muted-foreground text-sm leading-relaxed font-medium dark:text-gray-400">
              {notification.data.message}
            </p>
          )}
          <div className="flex justify-between gap-2">
            {notification.last_view ? (
              <p className="text-muted-foreground text-left text-xs dark:text-gray-400">
                تم قراءة الإشعار {getTimeAgo(notification.last_view)}
              </p>
            ) : (
              <button
                className="text-dark/90 text-sm underline dark:text-white/90"
                onClick={() => handleReadNotification(notification.id)}
              >
                تمييز كمقروء
              </button>
            )}
            <p className="text-muted-foreground text-left text-xs dark:text-gray-400">
              {getTimeAgo(notification.created_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
