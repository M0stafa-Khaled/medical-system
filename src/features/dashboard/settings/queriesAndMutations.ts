import Query_Keys from "@/shared/enums/queryKeys";
import { IUpdateCompany } from "@/interfaces/dashboard/company";
import { getCompanyInfo, getSubscription, updateCompanyInfo } from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCompanyInfo = () =>
  useQuery({
    queryKey: [Query_Keys.COMPANY_INFO],
    queryFn: () => getCompanyInfo(),
  });

export const useUpdateCompanyInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ company }: { company: IUpdateCompany }) =>
      updateCompanyInfo({ company }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.COMPANY_INFO],
      });
    },
  });
};

export const useGetSubscription = () =>
  useQuery({
    queryKey: [Query_Keys.SUBSCRIPTION],
    queryFn: () => getSubscription(),
  });
