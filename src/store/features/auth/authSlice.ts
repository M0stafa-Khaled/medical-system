import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import CookieService from "../../../utils/cookieServices";
import { TRole } from "../../../types";
import axiosAPI from "@/config/axios.config";
import { ICheckAuth, IPermission } from "@/features/auth/types";

interface IAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  emailVerified: boolean;
  accountStatus: boolean;
  permissions: IPermission[] | null;
}

const initialState: IAuthState = {
  isAuthenticated: !!CookieService.getToken(),
  isLoading: false,
  emailVerified: false,
  accountStatus: false,
  permissions: null,
};

export const checkAuth = createAsyncThunk<ICheckAuth, void>(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = CookieService.getToken();
      if (!token) throw new Error("No token");

      const res = await axiosAPI.post<ICheckAuth>(
        "/check-auth",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (_err) {
      return rejectWithValue("Unauthorized");
    }
  }
);
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
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        checkAuth.fulfilled,
        (state, action: PayloadAction<ICheckAuth>) => {
          state.isAuthenticated = action.payload.auth;
          state.emailVerified = action.payload.email_verified;
          state.accountStatus = action.payload.status;
          state.permissions = action.payload.permissions;
          state.isLoading = false;
        }
      )
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.accountStatus = false;
        state.emailVerified = false;
        state.permissions = null;
        CookieService.clearAllCookies();
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
