export interface IExpenseCategory {
  id: number;
  name: string;
}


export interface IAddExpenseCategoryRes {
  status: boolean;
  message;
}

export interface IExpenseCategoriesRes {
  status: true;
  message: null;
  data: IExpenseCategory[];
}
