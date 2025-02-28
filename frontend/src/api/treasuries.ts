import axiosInstanceAPI from "@/config/axios.config";
import { IDeleteRes, IGetTokenPageSearch } from "@/interfaces";
import {
  IConvertTreasuries,
  ICreateTreasury,
  ITreasuriesRes,
  ITreasury,
} from "@/interfaces/treasury";

export const getAllTreasuries: ({
  token,
  search,
}: IGetTokenPageSearch) => Promise<ITreasuriesRes> = async ({
  token,
  search,
}) => {
  const { data } = await axiosInstanceAPI.get("/treasuries", {
    params: {
      q: search,
    },
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
}: ICreateTreasury) => Promise<{ status: boolean; data: ITreasury }> = async ({
  token,
  name,
  status,
}) => {
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
}: ICreateTreasury) => Promise<{ status: boolean; data: ITreasury }> = async ({
  token,
  id,
  name,
  status,
}) => {
  const { data } = await axiosInstanceAPI.post(
    `treasuries/${id}`,
    {
      name,
      status,
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

export const convertTreasuries: ({
  token,
  from_treasury,
  to_treasury,
}: IConvertTreasuries) => Promise<{
  status: boolean;
  message: string;
}> = async ({ token, from_treasury, to_treasury }) => {
  const { data } = await axiosInstanceAPI.post(
    "/convert-treasuries",
    {
      from_treasury,
      to_treasury,
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
