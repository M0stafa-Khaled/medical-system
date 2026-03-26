import axiosAPI from "@/shared/lib/axios";
import { IStatusMsg } from "@/shared/types";
import {
  ICompanyRes,
  ISubscriptionRes,
  IUpdateCompany,
} from "@/features/dashboard/settings/types";

export const getCompanyInfo = async (): Promise<ICompanyRes> =>
  (await axiosAPI.get("/company/me")).data;

export const updateCompanyInfo = async ({
  company,
}: {
  company: IUpdateCompany;
}): Promise<IStatusMsg> => {
  const formData = new FormData();

  formData.append("name_manager", company.name_manager);
  formData.append("phone_manager", company.phone_manager);
  if (company.logo) formData.append("logo", company.logo);

  const { data } = await axiosAPI.post("/company/me", formData);

  return data;
};

export const getSubscription = async (): Promise<ISubscriptionRes> =>
  (await axiosAPI.get("/subscription")).data;
