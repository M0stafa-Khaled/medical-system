import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import permissionsSlice from "./features/permissions/permissionsSlice";
import doctorClinicsSlice from "./features/doctorClinics/doctorClinicsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    permissions: permissionsSlice,
    doctorClinics: doctorClinicsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
