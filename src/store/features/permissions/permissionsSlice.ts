import { IPermission } from "@/interfaces/auth/auth";
import { decryptData, encryptData } from "@/utils/encryptData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPermissionsState {
  permissions: IPermission[];
}
const initialState: IPermissionsState = {
  permissions: localStorage.getItem("permissions")
    ? decryptData(localStorage.getItem("permissions") || "")
    : [],
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setPermissions(state, action: PayloadAction<IPermission[]>) {
      state.permissions = action.payload;
      const encryptPermissions = encryptData(action.payload);
      localStorage.setItem("permissions", encryptPermissions);
    },

    clearPermissions(state) {
      state.permissions = [];
      localStorage.removeItem("permissions");
    },
  },
});

export const { setPermissions, clearPermissions } = permissionsSlice.actions;
export default permissionsSlice.reducer;
