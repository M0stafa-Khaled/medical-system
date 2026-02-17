export interface ITreasury {
  id: number;
  name: string;
  status: boolean;
  total: string;
}

export interface ITreasuriesRes {
  status: boolean;
  message: string | null;
  data: ITreasury[];
}

export interface IConvertTreasuries {
  from_treasury: string;
  to_treasury: string;
  amount: number;
}

export interface ICreateTreasury {
  name: string;
  status: boolean;
}

export interface IUpdateTreasury extends ICreateTreasury {
  id: string;
}
