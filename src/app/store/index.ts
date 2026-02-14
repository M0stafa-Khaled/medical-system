import { configureStore } from "@reduxjs/toolkit";
import permissionsSlice from "./features/permissions/permissionsSlice";
import notificationsSlice from "./features/notifications/notificationSlice";
import authSlice from "./features/auth/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
  reducer: {
    auth: authSlice,
    permissions: permissionsSlice,
    notifications: notificationsSlice,
  },
});

// Define types for useSelector and useDispatch hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
