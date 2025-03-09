import { IClinic } from "@/interfaces/clinic";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IDoctorClinicsState {
  clinics: IClinic[];
}
const initialState: IDoctorClinicsState = {
  clinics: [],
};

const doctorClinicsSlice = createSlice({
  name: "doctorClinics",
  initialState,
  reducers: {
    setDoctorClinics: (state, action: PayloadAction<IClinic[]>) => {
      state.clinics = action.payload;
    },
  },
});
export const { setDoctorClinics } = doctorClinicsSlice.actions;
export default doctorClinicsSlice.reducer;
