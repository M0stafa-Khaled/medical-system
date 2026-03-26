import axiosAPI from "@/shared/lib/axios";
import type { IClinicsRes } from "../dashboard/clinics/types";
import type { IBookingsRes } from "../dashboard/bookings/types";
import type { IChartRes, IGetWithParams, IStatusMsg } from "@/shared/types";
import {
  ICreatePrescription,
  IPrescription,
  IPrescriptionsRes,
  IUpdatePrescription,
} from "../dashboard/prescriptions/types";
import { IDoctorWidgetRes } from "./types";

export const getDoctorClinics = async (): Promise<IClinicsRes> =>
  (await axiosAPI.get("doctor-clinics")).data;

export const getDoctorBookings = async ({
  clinicId,
}: {
  clinicId: string;
}): Promise<IBookingsRes> => (await axiosAPI.get(`/${clinicId}/bookings`)).data;

export const getDoctorWidgets = async (): Promise<IDoctorWidgetRes> =>
  (await axiosAPI.get("/widgets/doctor")).data;

export const getDoctorBookingsChart = async ({
  filter,
}: IGetWithParams): Promise<IChartRes> =>
  (
    await axiosAPI.get("/charts/doctor/bookings", {
      params: { ...(filter && { filter }) },
    })
  ).data;

export const getDoctorPrescriptionsChart = async ({
  filter,
}: IGetWithParams): Promise<IChartRes> =>
  (
    await axiosAPI.get("/charts/doctor/prescriptions", {
      params: { ...(filter && { filter }) },
    })
  ).data;

export const getDoctorTransactionsChart = async ({
  filter,
}: IGetWithParams): Promise<IChartRes> =>
  (
    await axiosAPI.get("/charts/doctor/transactions", {
      params: { ...(filter && { filter }) },
    })
  ).data;

export const getAllDoctorPrescriptions = async ({
  filter,
  page,
  sort,
}: IGetWithParams): Promise<IPrescriptionsRes> =>
  (
    await axiosAPI.get("/patients-prescriptions", {
      params: { page, ...(filter && { filter }), sort },
    })
  ).data;

export const getDoctorPrescriptionById = async ({
  id,
}: {
  id: string;
}): Promise<{ status: boolean; message: string; data: IPrescription }> =>
  (await axiosAPI.get(`/patients-prescriptions/${id}`)).data;

export const createDoctorPrescription = async (
  prescription: ICreatePrescription
): Promise<IStatusMsg> => {
  const formData = new FormData();
  if (prescription.booking_id)
    formData.append("booking_id", prescription.booking_id);
  if (prescription.patient_id)
    formData.append("patient_id", prescription.patient_id);
  if (prescription.clinic_id)
    formData.append("clinic_id", prescription.clinic_id);
  if (prescription.note) formData.append("note", prescription.note);

  formData.append("prescription_date", prescription.prescription_date);
  prescription.prescriptables.forEach((item, idx) => {
    Object.entries(item).forEach(([key, val]) => {
      if (val) {
        formData.append(`prescriptables[${idx}][${key}]`, val);
      }
    });
  });

  const { data } = await axiosAPI.post("/patients-prescriptions", formData);
  return data;
};

export const updateDoctorPrescription = async (
  prescription: IUpdatePrescription
): Promise<IStatusMsg> => {
  const formData = new FormData();
  if (prescription.booking_id)
    formData.append("booking_id", prescription.booking_id);
  if (prescription.patient_id)
    formData.append("patient_id", prescription.patient_id);
  if (prescription.clinic_id)
    formData.append("clinic_id", prescription.clinic_id);
  if (prescription.note) formData.append("note", prescription.note);

  formData.append("prescription_date", prescription.prescription_date);
  prescription.prescriptables.forEach((item, idx) => {
    Object.entries(item).forEach(([key, val]) => {
      if (val) {
        formData.append(`prescriptables[${idx}][${key}]`, val);
      }
    });
  });
  formData.append("_method", "put");
  const { data } = await axiosAPI.post(
    `/patients-prescriptions/${prescription.id}`,
    formData
  );
  return data;
};

export const deleteDoctorPrescription = async ({
  id,
}: {
  id: string;
}): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.delete(`/patients-prescriptions/${id}`);
  return data;
};
