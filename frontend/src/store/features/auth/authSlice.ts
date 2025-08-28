import axiosAPI from "@/config/axios.config";
import { IAuthUser, ICheckAuth } from "@/interfaces/auth/auth";
import cookieServices from "@/utils/cookieServices";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  isAuthenticated: boolean;
  verified: boolean;
  user: IAuthUser | null;
  status: boolean;
  loading: boolean;
}

// 🔹 Thunk to check authentication
export const checkAuth = createAsyncThunk<ICheckAuth, void>(
  "/check-auth",
  async (_, { rejectWithValue }) => {
    try {
      const token = cookieServices.getToken();
      if (!token) throw new Error("No token");

      const { data } = await axiosAPI.post<ICheckAuth>(
        "/check-auth",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (_err) {
      return rejectWithValue("Unauthorized");
    }
  }
);

const initialState: IAuthState = {
  isAuthenticated: !!cookieServices.getToken(),
  verified: false,
  user: null,
  status: false,
  loading: false,
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
        user: IAuthUser;
      }>
    ) => {
      state.isAuthenticated = true;
      state.user = user;
      cookieServices.setToken(token, 1);
    }, // 🔹 Logout action
    logout: (state) => {
      state.isAuthenticated = false;
      state.verified = false;
      state.user = null;
      cookieServices.clearAllCookies();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        checkAuth.fulfilled,
        (state, action: PayloadAction<ICheckAuth>) => {
          state.loading = false;
          state.isAuthenticated = action.payload.auth;
          state.verified = action.payload.email_verified;
          state.status = action.payload.status;
        }
      )
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.verified = false;
        state.user = null;
        state.status = false;
        cookieServices.clearAllCookies();
      });
  },
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
