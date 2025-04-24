import NotificationCard from "./NotificationCard";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const NotificationsList = () => {
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  return (
    <>
      {!notifications?.length ? (
        <p className="text-gray-500 text-center py-4">لا يوجد إشعارات</p>
      ) : (
        notifications?.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))
      )}
    </>
  );
};

export default NotificationsList;
