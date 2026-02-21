import Query_Keys from "@/shared/enums/queryKeys";
import { IUpdateCompany } from "@/interfaces/dashboard/company";
import {
  getCompanyInfo,
  getSubscription,
  updateCompanyInfo,
} from "@/services/dashboard/company";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCompanyInfo = (token: string) =>
  useQuery({
    queryKey: [Query_Keys.COMPANY_INFO],
    queryFn: () => getCompanyInfo(token),
  });

export const useUpdateCompanyInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      token,
      company,
    }: {
      token: string;
      company: IUpdateCompany;
    }) => updateCompanyInfo({ token, company }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.COMPANY_INFO],
      });
    },
  });
};

export const useGetSubscription = (token: string) =>
  useQuery({
    queryKey: [Query_Keys.SUBSCRIPTION],
    queryFn: () => getSubscription(token),
  });
