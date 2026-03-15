import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import CookieService from "@/shared/utils/cookieServices";
import { TRole } from "@/shared/types";
import axiosAPI from "@/shared/lib/axios";
import { ICheckAuth, IPermission } from "@/features/auth/types";
import { IProfile, IProfileRes } from "@/features/profile/types";

interface IAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  emailVerified: boolean;
  accountStatus: boolean;
  permissions: IPermission[] | null;
  user: IProfile | null;
}

const initialState: IAuthState = {
  isAuthenticated: !!CookieService.getToken(),
  isLoading: false,
  emailVerified: false,
  accountStatus: false,
  permissions: null,
  user: null,
};

export const checkAuth = createAsyncThunk<ICheckAuth, void>(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosAPI.post<ICheckAuth>("/check-auth");
      return res.data;
    } catch {
      return rejectWithValue("Unauthorized");
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosAPI.get("/me");
      return res.data as IProfileRes;
    } catch {
      return rejectWithValue(null);
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
      state.user = null;
      state.permissions = null;
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
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.permissions = null;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
