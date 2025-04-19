import axiosInstanceAPI from "@/config/axios.config";
import { IGetWithParams, IStatusMsg } from "@/interfaces";
import {
  ICreatePrescription,
  IPrescription,
  IPrescriptionsRes,
  IUpdatePrescription,
} from "@/interfaces/dashboard/prescription";

export const getAllDoctorPrescriptions = async ({
  token,
  filter,
  page,
  sort,
}: IGetWithParams): Promise<IPrescriptionsRes> => {
  const { data } = await axiosInstanceAPI.get("/patients-prescriptions", {
    params: { page, ...(filter && { filter }), sort },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getDoctorPrescriptionById = async ({
  token,
  id,
}: {
  id: string;
  token: string;
}): Promise<{ status: boolean; message: string; data: IPrescription }> => {
  const { data } = await axiosInstanceAPI.get(`/patients-prescriptions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const createDoctorPrescription = async ({
  token,
  prescription,
}: ICreatePrescription): Promise<IStatusMsg> => {
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

  const { data } = await axiosInstanceAPI.post(
    "/patients-prescriptions",
    formData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

export const updateDoctorPrescription = async ({
  token,
  prescription,
  id,
}: IUpdatePrescription): Promise<IStatusMsg> => {
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
  const { data } = await axiosInstanceAPI.post(
    `/patients-prescriptions/${id}`,
    formData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

export const deleteDoctorPrescription = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}): Promise<IStatusMsg> => {
  const { data } = await axiosInstanceAPI.delete(
    `/patients-prescriptions/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};
