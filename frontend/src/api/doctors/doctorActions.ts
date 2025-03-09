import axiosInstanceAPI from "@/config/axios.config";
import { IDeleteRes } from "@/interfaces";
import {
  IActionProps,
  IResponseAction,
  IResponseActions,
} from "@/interfaces/doctors/doctorActions";

interface IGetAction {
  doctorId: string;
  token: string;
}

export const getDoctorActions: ({
  doctorId,
  token,
}: IGetAction) => Promise<IResponseActions> = async ({ doctorId, token }) => {
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
}: IActionProps) => Promise<IResponseAction> = async ({ formData, token }) => {
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
}: IActionProps) => Promise<IResponseAction> = async ({
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
