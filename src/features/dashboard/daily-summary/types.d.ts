import { IExpense } from "../expenses/types";
import { ITransaction } from "../transactions/types";

export interface IDailySummaryRes {
  expenses: IExpense[];
  refunds: ITransaction[];
  transactions: ITransaction[];
}

export interface ISystemTotals {
  totalExpenses: number;
  totalRevenue: number;
  totalRefunds: number;
  netRevenue: number;
  netPosition: number;
  totalDoctorCommission: number;
  totalCenterShare: number;
  transactionCount: number | undefined;
  expenseCount: number | undefined;
  refundCount: number | undefined;
  totalActionsCount: IActionCount[];
}

export interface IActionCount {
  name: string;
  count: number;
}

export interface IDoctorTotals {
  doctorId: number;
  doctorName: string;
  commission: number;
  totalRevenue: number;
  netRevenue: number;
  doctorCommission: number;
  centerShare: number;
  transactionCount: number;
  expenseCount: number;
  actionsCount: IActionCount[];
}
