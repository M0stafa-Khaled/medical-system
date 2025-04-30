import axiosInstanceAPI from "@/config/axios.config";
import { IStatusMsg } from "@/interfaces";
import { IDoctorTransactionsRes } from "@/interfaces/dashboard/doctors/doctorTransations";

export const getDoctorTransactions = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}): Promise<IDoctorTransactionsRes> => {
  const { data } = await axiosInstanceAPI.get(`/${id}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createDoctorTransaction = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}): Promise<IStatusMsg> => {
  const { data } = await axiosInstanceAPI.post(
    `/${id}/transactions/add-expense`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
