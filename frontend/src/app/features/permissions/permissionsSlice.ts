import { IPermission } from "@/interfaces/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPermissionsState {
  permissions: IPermission[];
}

const initialState: IPermissionsState = {
  permissions: [],
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setPermissions(state, action: PayloadAction<IPermission[]>) {
      state.permissions = action.payload;
    },

    clearPermissions(state) {
      state.permissions = [];
    },
  },
});

export const { setPermissions, clearPermissions } = permissionsSlice.actions;
export default permissionsSlice.reducer;
