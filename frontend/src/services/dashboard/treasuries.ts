import axiosInstanceAPI from "@/config/axios.config";
import { IDeleteRes, IGetWithParams } from "@/interfaces";
import {
  IConvertTreasuries,
  ICreateTreasury,
  ITreasuriesRes,
  ITreasury,
} from "@/interfaces/dashboard/treasury";

export const getAllTreasuries: ({
  token,
  search,
}: IGetWithParams) => Promise<ITreasuriesRes> = async ({ token, search }) => {
  const { data } = await axiosInstanceAPI.get("/treasuries", {
    params: { ...(search && { q: search }) },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createTreasury: ({
  token,
  name,
  status,
}: ICreateTreasury) => Promise<{
  status: boolean;
  message: string;
  data: ITreasury;
}> = async ({ token, name, status }) => {
  const { data } = await axiosInstanceAPI.post(
    "/treasuries",
    {
      name,
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const updateTreasury: ({
  token,
  id,
  name,
  status,
}: ICreateTreasury) => Promise<{
  status: boolean;
  message: string;
  data: ITreasury;
}> = async ({ token, id, name, status }) => {
  const { data } = await axiosInstanceAPI.post(
    `treasuries/${id}`,
    {
      name,
      status: status ? 1 : 0,
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

export const transferTreasuries: ({
  token,
  from_treasury,
  to_treasury,
  amount,
}: IConvertTreasuries) => Promise<{
  status: boolean;
  message: string;
}> = async ({ token, from_treasury, to_treasury, amount }) => {
  const { data } = await axiosInstanceAPI.post(
    "/convert-treasuries",
    {
      from_treasury,
      to_treasury,
      amount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const deleteTreasury: ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => Promise<IDeleteRes> = async ({ token, id }) => {
  const { data } = await axiosInstanceAPI.delete(`/treasuries/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
