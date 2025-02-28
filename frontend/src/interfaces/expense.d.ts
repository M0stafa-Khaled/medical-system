import { IPaginationMeta } from ".";
import { IEmployee } from "./employee";
import { ITreasury } from "./treasury";

export interface ICreateExpense {
  name: string;
  status: string;
  price: number;
  category_id: string;
  description: string;
}

export interface IExpense {
  id: number;
  name: string;
  description: string | null;
  status: true;
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
