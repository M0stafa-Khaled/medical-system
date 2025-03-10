import { IPaginationMeta } from "../..";
import { IEmployee } from "../employee";
import { IExpenseCategory } from "./expenseCategory";
import { ITreasury } from "../treasury";

export interface ICreateExpense {
  name: string;
  status: string;
  price: number;
  category_id: string;
}

export interface IExpense {
  id: number;
  name: string;
  cancelled_info: string | null;
  price: string;
  status: true;
  code: string;
  created_at: string;
  category: IExpenseCategory;
  treasury: ITreasury;
  employee: IEmployee;
}

export interface IExpensesResponse {
  status: boolean;
  message: string | null;
  data: {
    items: IExpense[];
    meta: IPaginationMeta;
  };
}
