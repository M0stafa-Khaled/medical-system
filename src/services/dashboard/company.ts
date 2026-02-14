import axiosAPI from "@/config/axios.config";
import { IStatusMsg } from "@/shared/types";
import {
  ICompanyRes,
  ISubscriptionRes,
  IUpdateCompany,
} from "@/interfaces/dashboard/company";

export const getCompanyInfo = async (token: string): Promise<ICompanyRes> => {
  const { data } = await axiosAPI.get("/company/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateCompanyInfo = async ({
  token,
  company,
}: {
  token: string;
  company: IUpdateCompany;
}): Promise<IStatusMsg> => {
  const formData = new FormData();

  formData.append("name_manager", company.name_manager);
  formData.append("phone_manager", company.phone_manager);
  if (company.logo) formData.append("logo", company.logo);

  const { data } = await axiosAPI.post("/company/me", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getSubscription = async (
  token: string
): Promise<ISubscriptionRes> => {
  const { data } = await axiosAPI.get("/subscription", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
