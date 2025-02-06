import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CookieService from "../../../utils/cookieServices";
import { TRole } from "../../../types";

interface IAuthState {
  isAuthenticated: boolean;
  role: TRole;
  token: string | null;
}

const initialState: IAuthState = {
  isAuthenticated: !!CookieService.getToken(),
  role: CookieService.getRole() || null,
  token: CookieService.getToken() || null,
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
      state.token = action.payload.token;
      state.role = action.payload.role;

      // Set the token and role in cookies
      CookieService.setToken(action.payload.token, 1);
      CookieService.setRole(action.payload.role, 1);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
      CookieService.clearAllCookies();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
