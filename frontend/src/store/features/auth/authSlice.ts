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
      {
        payload: { user, token },
      }: PayloadAction<{
        token: string;
        user: {
          id: number;
          name: string;
          role: TRole;
        };
      }>
    ) => {
      state.isAuthenticated = true;
      // Set the token and role in cookies
      CookieService.setToken(token, 1);
      CookieService.setUser(
        { id: user.id, name: user.name, role: user.role },
        1
      );
    },

    logout: (state) => {
      state.isAuthenticated = false;
      CookieService.clearAllCookies();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
