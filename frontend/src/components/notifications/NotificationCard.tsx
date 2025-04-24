import { INotification } from "@/interfaces/notifications";
import { useReadNotification } from "@/lib/react-query/notifications/notifications";
import cookieServices from "@/utils/cookieServices";
import { getTimeAgo } from "@/utils/getTimeAgo";
import handleResErr from "@/utils/handleResponseError";
import { Link } from "react-router-dom";

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
      className={`p-3 border-b border-primary/10 ${
        notification.last_view
          ? "bg-[#fff] dark:bg-dark"
          : "bg-[#eae8ec] dark:bg-dark/50"
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
              className="object-cover rounded-full"
            />
            {!notification.last_view && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
            )}
          </div>
          <h3 className="font-semibold text-wrap text-sm dark:text-white">
            {notification.data.sender.name}
          </h3>
        </div>
        <div className="pr-4 space-y-3">
          {/* Patient */}
          {role === "admin" || role === "employee" ? (
            notification.data.patient?.id ? (
              <Link
                to={`/dashboard/patients/${notification.data.patient.id}`}
                className="text-sm text-muted-foreground dark:text-gray-400 font-medium leading-relaxed"
              >
                {notification.data.message}
              </Link>
            ) : notification.data.booking?.id ? (
              <Link
                to={`/dashboard/bookings/${notification.data.booking.id}`}
                className="text-sm text-muted-foreground dark:text-gray-400 font-medium leading-relaxed"
              >
                {notification.data.message}
              </Link>
            ) : (
              <p className="text-sm text-muted-foreground dark:text-gray-400 font-medium leading-relaxed">
                {notification.data.message}
              </p>
            )
          ) : (
            <p className="text-sm text-muted-foreground dark:text-gray-400 font-medium leading-relaxed">
              {notification.data.message}
            </p>
          )}
          <div className="flex justify-between gap-2">
            {notification.last_view ? (
              <p className="text-xs text-muted-foreground dark:text-gray-400 text-left">
                تم قراءة الإشعار {getTimeAgo(notification.last_view)}
              </p>
            ) : (
              <button
                className="text-sm underline text-dark/90 dark:text-white/90"
                onClick={() => handleReadNotification(notification.id)}
              >
                تمييز كمقروء
              </button>
            )}
            <p className="text-xs text-muted-foreground dark:text-gray-400 text-left">
              {getTimeAgo(notification.created_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
