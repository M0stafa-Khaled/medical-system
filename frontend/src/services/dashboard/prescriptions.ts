import axiosAPI from "@/config/axios.config";
import { IGetWithParams, IStatusMsg } from "@/interfaces";
import {
  ICreatePrescription,
  IPrescription,
  IPrescriptionsRes,
  IUpdatePrescription,
} from "@/interfaces/dashboard/prescription";

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
  token,
  id,
}: {
  id: string;
  token: string;
}): Promise<{ status: boolean; message: string; data: IPrescription }> => {
  const { data } = await axiosAPI.get(`/prescriptions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const createPrescription = async ({
  token,
  prescription,
}: ICreatePrescription): Promise<IStatusMsg> => {
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

  const { data } = await axiosAPI.post("/prescriptions", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updatePrescription = async ({
  token,
  prescription,
  id,
}: IUpdatePrescription): Promise<IStatusMsg> => {
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
  const { data } = await axiosAPI.post(`/prescriptions/${id}`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deletePrescription = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.delete(`/prescriptions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
