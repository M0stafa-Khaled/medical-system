import axiosAPI from "@/config/axios.config";
import type { IGetWithParams, IStatusMsg } from "@/shared/types";
import type { IExpenseCategoriesRes, IExpenseCategory } from "./types";

export const getAllExpenseCategories = async ({
  search,
}: IGetWithParams): Promise<IExpenseCategoriesRes> =>
  (
    await axiosAPI.get("/expenses-categories", {
      params: { ...(search && { q: search }) },
    })
  ).data;

export const getAllExpenseCategoryById = async ({
  id,
}: {
  id: string;
}): Promise<{ status: boolean; data: IExpenseCategory }> =>
  (await axiosAPI.get(`/expenses-categories/${id}`)).data;

export const createExpenseCategory = async ({
  name,
}: {
  name: string;
}): Promise<IStatusMsg> =>
  (await axiosAPI.post("/expenses-categories", { name: name })).data;

export const updateExpenseCategory = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}): Promise<IStatusMsg> =>
  (
    await axiosAPI.post(`/expenses-categories/${id}`, {
      name,
      _method: "put",
    })
  ).data;

export const deleteExpenseCategory = async ({
  id,
}: {
  id: string;
}): Promise<IStatusMsg> =>
  (await axiosAPI.delete(`/expenses-categories/${id}`)).data;
