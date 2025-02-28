export interface ITreasury {
  id: number;
  name: string;
  status: boolean;
  expenses_total: string;
}

export interface ITreasuriesRes {
  status: boolean;
  message: null | string;
  data: ITreasury[];
}

export interface IConvertTreasuries {
  token: string;
  from_treasury: string;
  to_treasury: string;
}

export interface ICreateTreasury {
  id?: string;
  token: string;
  name: string;
  status: boolean;
}
