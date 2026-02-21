import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "@/features/notifications/types";

interface INotificationsState {
  notifications: INotification[];
  unreadNotifications: number;
  isLoading: boolean;
}

const initialState: INotificationsState = {
  notifications: [],
  unreadNotifications: 0,
  isLoading: false,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (
      state,
      payload: PayloadAction<{
        notifications: INotification[];
        unreadNotifications: number;
        isLoading: boolean;
      }>
    ) => {
      state.unreadNotifications = payload.payload.unreadNotifications;
      state.notifications = payload.payload.notifications;
      state.isLoading = payload.payload.isLoading;
    },
  },
});

export const { setNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
