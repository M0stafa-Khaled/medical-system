import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CookieService from "../../../utils/cookieServices";
import { TRole } from "../../../types";

interface IAuthState {
  isAuthenticated: boolean;
}

const initialState: IAuthState = {
  isAuthenticated: !!CookieService.getToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        token: string;
        role: TRole;
      }>
    ) => {
      state.isAuthenticated = true;

      // Set the token and role in cookies
      CookieService.setToken(action.payload.token, 1);
      CookieService.setRole(action.payload.role, 1);
    },
    logout: (state) => {
      console.log("logout");
      state.isAuthenticated = false;
      CookieService.clearAllCookies();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
