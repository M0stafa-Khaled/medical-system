import { type IPaginationMeta } from "@/shared/types";
import { type IEmployee } from "../employees/types";
import { type ITreasury } from "@/features/dashboard/treasuries/types";
import { type IExpenseCategory } from "../expenses-categories/types";

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

export interface IExpensesRes {
  status: boolean;
  message: string | null;
  data: {
    items: IExpense[];
    meta: IPaginationMeta;
  };
}

export interface IExpensesFilter {
  treasury: string;
  status: string;
  created_at: string | null;
  code: string;
  employee: string;
  sort: string;
}
