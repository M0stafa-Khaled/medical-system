export interface ICompany {
  id: number;
  name: string;
  email: string;
  name_manager: string;
  phone_manager: string;
  logo: string;
}

export interface ICompanyRes {
  status: boolean;
  message: null | string;
  data: ICompany;
}

export interface IUpdateCompany {
  name_manager: string;
  phone_manager: string;
  logo?: File;
}

interface IFeature {
  name: string;
  max_value: string;
  used: number;
}

export interface ISubscription {
  plan: string;
  start_at: string;
  ends_at: string;
  features_usages: IFeature[];
}

export interface ISubscriptionRes {
  status: boolean;
  message: null | string;
  data: ISubscription;
}
