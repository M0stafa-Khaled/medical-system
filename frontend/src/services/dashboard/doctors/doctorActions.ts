import axiosInstanceAPI from "@/config/axios.config";
import { IDeleteRes } from "@/interfaces";
import {
  IDoctorActionProps,
  IResponseDoctorAction,
  IResponseDoctorActions,
} from "@/interfaces/dashboard/doctors/doctorActions";

interface IGetAction {
  doctorId: string;
  token: string;
}

export const getDoctorActions: ({
  doctorId,
  token,
}: IGetAction) => Promise<IResponseDoctorActions> = async ({
  doctorId,
  token,
}) => {
  const { data } = await axiosInstanceAPI.get(`/${doctorId}/actions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createDoctorAction: ({
  token,
  formData,
}: IDoctorActionProps) => Promise<IResponseDoctorAction> = async ({
  formData,
  token,
}) => {
  const { data } = await axiosInstanceAPI.post("actions", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateDoctorAction: ({
  formData,
  token,
  id,
}: IDoctorActionProps) => Promise<IResponseDoctorAction> = async ({
  formData,
  token,
  id,
}) => {
  const { data } = await axiosInstanceAPI.post(
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

export const deleteDoctorAction: ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => Promise<IDeleteRes> = async ({ id, token }) => {
  const { data } = await axiosInstanceAPI.delete(`/actions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
