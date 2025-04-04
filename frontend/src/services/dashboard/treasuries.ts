import axiosInstanceAPI from "@/config/axios.config";
import { IStatusMsg, IGetWithParams } from "@/interfaces";
import {
  IConvertTreasuries,
  ICreateTreasury,
  ITreasuriesRes,
} from "@/interfaces/dashboard/treasury";

export const getAllTreasuries = async ({
  token,
  search,
}: IGetWithParams): Promise<ITreasuriesRes> => {
  const { data } = await axiosInstanceAPI.get("/treasuries", {
    params: { ...(search && { q: search }) },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createTreasury = async ({
  token,
  name,
  status,
}: ICreateTreasury): Promise<IStatusMsg> => {
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

export const updateTreasury = async ({
  id,
  token,
  name,
  status,
}: ICreateTreasury): Promise<IStatusMsg> => {
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

export const transferTreasuries = async ({
  token,
  from_treasury,
  to_treasury,
  amount,
}: IConvertTreasuries): Promise<IStatusMsg> => {
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

export const deleteTreasury = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}): Promise<IStatusMsg> => {
  const { data } = await axiosInstanceAPI.delete(`/treasuries/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
