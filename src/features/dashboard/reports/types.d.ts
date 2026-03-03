export interface ITransfer {
  id: WeekNumberLabel;
  from_treasury: ITreasury;
  to_treasury: ITreasury;
  amount: string;
  type: string;
  payment_method: string;
  created_at: string;
}

export interface ITransfersRes {
  status: boolean;
  message: string | null;
  data: {
    items: ITransfer[];
    meta: IPaginationMeta;
  };
}

export interface ITreasuryReport {
  id: number;
  type: "transactions" | "expenses" | "transfers";
  created_at: string;
  details: {
    id: number;
    amount: string;
    code?: strings;
    status?: 1 | 0;
    refund_info?: string | null;
    contract_type?: "egyption";
    card_number: string | null;
    created_at: string;
    employee: string;
  };
}

export interface ITreasuriesReportRes {
  status: boolean;
  message: string | null;
  data: {
    items: ITreasuryReport[];
    meta: IPaginationMeta;
  };
}

export interface IBookingsReportFilter {
  doctor: string;
  clinic: string;
  patient: string;
  start_at: string | null;
  end_at: string | null;
  booking_date: string | null;
  status: string;
}

export interface ITransactionsReportFilter {
  doctor: string;
  action: string;
  treasury: string;
  status: string;
  payment_method: string;
  patient: string;
  employee: string;
  start_at: string | null;
  end_at: string | null;
}

export interface IExpensesReportFilter {
  status: string;
  employee: string;
  created_at: string | null;
  treasury: string;
}

export interface ITransfersReportFilter {
  start_at: string | null;
  end_at: string | null;
  employee: string;
  from_treasury: string;
  to_treasury: string;
}

export interface ITreasuriesReportFilter {
  start_at: string | null;
  end_at: string | null;
  type: string;
  treasury: string;
}

export interface IPrescriptionsReportFilter {
  patient: string;
  date: string | null;
  start_at: string | null;
  end_at: string | null;
  clinic: string;
  doctor: string;
}

export interface IPatientsReportFilter {
  start_at: string | null;
  end_at: string | null;
  q: string;
}

export interface IPatientBalancesReportFilter {
  start_at: string | null;
  end_at: string | null;
  payment_method: string;
}
