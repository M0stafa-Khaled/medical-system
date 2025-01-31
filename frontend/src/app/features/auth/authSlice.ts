import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CookieService from "../../../utils/cookieServices";

interface IAuthState {
  isAuthenticated: boolean;
  role: string | null; // * 'admin' OR 'employee'
  token: string | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  role: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; role: string }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.role = action.payload.role;

      // Set the token and role in cookies
      CookieService.setToken(action.payload.token);
      CookieService.setRole(action.payload.role);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
      // Remove the token and role from cookies
      CookieService.clearAllCookies();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
