import axiosAPI from "@/shared/lib/axios";
import { IGetWithParams, IStatusMsg } from "@/shared/types";
import {
  ICreatePrescription,
  IPrescription,
  IPrescriptionsRes,
  IUpdatePrescription,
} from "@/features/dashboard/prescriptions/types";

export const getAllPrescriptions = async ({
  token,
  filter,
  page,
  sort,
}: IGetWithParams): Promise<IPrescriptionsRes> => {
  const { data } = await axiosAPI.get("/prescriptions", {
    params: { page, ...(filter && { filter }), sort },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getPrescriptionById = async ({
  id,
}: {
  id: string;
}): Promise<{ status: boolean; message: string; data: IPrescription }> =>
  (await axiosAPI.get(`/prescriptions/${id}`)).data;

export const createPrescription = async (
  prescription: ICreatePrescription
): Promise<IStatusMsg> => {
  const formData = new FormData();
  if (prescription.booking_id)
    formData.append("booking_id", prescription.booking_id);
  if (prescription.patient_id)
    formData.append("patient_id", prescription.patient_id);
  if (prescription.doctor_id)
    formData.append("doctor_id", prescription.doctor_id);
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

  const { data } = await axiosAPI.post("/prescriptions", formData);
  return data;
};

export const updatePrescription = async (
  prescription: IUpdatePrescription
): Promise<IStatusMsg> => {
  const formData = new FormData();
  if (prescription.booking_id)
    formData.append("booking_id", prescription.booking_id);
  if (prescription.patient_id)
    formData.append("patient_id", prescription.patient_id);
  if (prescription.doctor_id)
    formData.append("doctor_id", prescription.doctor_id);
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
    `/prescriptions/${prescription.id}`,
    formData
  );
  return data;
};

export const deletePrescription = async ({
  id,
}: {
  id: string;
}): Promise<IStatusMsg> => (await axiosAPI.delete(`/prescriptions/${id}`)).data;
