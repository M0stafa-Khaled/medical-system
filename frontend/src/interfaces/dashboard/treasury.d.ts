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
