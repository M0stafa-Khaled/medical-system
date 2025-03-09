import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import permissionsSlice from "./features/permissions/permissionsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    permissions: permissionsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
