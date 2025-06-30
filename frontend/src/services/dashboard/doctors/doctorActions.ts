import axiosAPI from "@/config/axios.config";
import { IStatusMsg } from "@/interfaces";
import {
  ICreateDoctorAction,
  IResponseDoctorActions,
} from "@/interfaces/dashboard/doctors/doctorActions";

export const getDoctorActions = async ({
  doctorId,
  token,
}: {
  doctorId: string;
  token: string;
}): Promise<IResponseDoctorActions> => {
  const { data } = await axiosAPI.get(`/${doctorId}/actions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createDoctorAction = async ({
  formData,
  token,
}: ICreateDoctorAction): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.post("actions", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateDoctorAction = async ({
  formData,
  token,
  id,
}: ICreateDoctorAction): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.post(
    `/actions/${id}`,
    {
      ...formData,
      _method: "put",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const deleteDoctorAction = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<IStatusMsg> => {
  const { data } = await axiosAPI.delete(`/actions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
