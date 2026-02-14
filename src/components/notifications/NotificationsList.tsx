import NotificationCard from "./NotificationCard";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

const NotificationsList = () => {
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  return (
    <>
      {!notifications?.length ? (
        <p className="py-4 text-center text-gray-500">لا يوجد إشعارات</p>
      ) : (
        notifications?.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))
      )}
    </>
  );
};

export default NotificationsList;
