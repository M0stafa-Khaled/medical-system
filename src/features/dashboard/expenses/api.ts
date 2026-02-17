import axiosAPI from "@/config/axios.config";
import { IGetWithParams, IStatusMsg } from "@/shared/types";
import {
  ICreateExpense,
  IExpense,
  IExpensesRes,
} from "@/features/dashboard/expenses/types";

export const getAllExpenses = async ({
  page,
  filter,
  sort,
}: IGetWithParams): Promise<IExpensesRes> =>
  (
    await axiosAPI.get("/expenses", {
      params: { page, sort, ...(filter && { filter }) },
    })
  ).data;

export const getExpenseById = async ({
  id,
}: {
  id: string;
}): Promise<{ data: IExpense; message: string; status: boolean }> =>
  (await axiosAPI.get(`/expenses/${id}`)).data;

export const createExpense = async ({
  dataForm,
}: {
  dataForm: ICreateExpense;
}): Promise<IStatusMsg> => (await axiosAPI.post("/expenses", dataForm)).data;

export const cancelExpense = async ({
  cancelled_info,
  id,
}: {
  id: string;
  cancelled_info: string;
}): Promise<IStatusMsg> =>
  (
    await axiosAPI.post(`/expenses/${id}/cancel`, {
      cancelled_info,
    })
  ).data;

export const deleteExpense = async ({
  id,
}: {
  id: string;
}): Promise<IStatusMsg> => (await axiosAPI.delete(`/expenses/${id}`)).data;
